import {
  getLift,
  renameLift,
  softDeleteLift,
  restoreLift,
  listSetsForLift,
  createSet,
  updateSet,
  softDeleteSet,
  restoreSet,
} from '../api.js';
import { calcE1RM, dailyMaxE1RM, isNewPR, recentPRs, sessionVolume, toDateKey } from '../math.js';
import { renderLiftChart, destroyLiftChart } from '../charts.js';
import { showUndoToast } from '../toast.js';
import { goToList, refreshView } from '../state.js';
import { renderLiftPRRows } from './prsView.js';
import { findLiftDictionaryEntry } from '../liftDictionary.js';
import { buildProgressionOptions } from '../progression.js';
import {
  getDefaultRestSeconds,
  getLiftRestSeconds,
  isRestTimerEnabled,
  primeRestTimerSound,
  restSecondsForLift,
  setDefaultRestSeconds,
  setLiftRestSeconds,
  setRestTimerEnabled,
  startRestTimer,
} from '../restTimer.js';

export async function renderDetailView(root, liftId) {
  const lift = await getLift(liftId);
  if (!lift || lift.deleted_at) {
    root.innerHTML = `<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>`;
    return;
  }

  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input type="text" class="lt-lift-name-input" data-name-input maxlength="60" autocomplete="off" />
      <button type="button" class="lt-detail-delete" data-delete-lift aria-label="Delete lift">&times;</button>
    </header>

    <form class="lt-quick-log" data-log-form>
      <div class="lt-quick-log-fields">
        <label class="lt-field">
          <span>Weight (lb)</span>
          <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" required data-weight-input />
        </label>
        <label class="lt-field">
          <span>Reps</span>
          <input type="number" inputmode="numeric" step="1" min="1" name="reps" required data-reps-input />
        </label>
      </div>
      <button type="submit" class="lt-log-btn">Log set</button>
      <p class="lt-log-feedback" data-log-feedback hidden></p>
    </form>

    <section class="lt-rest-settings" aria-label="Rest timer settings">
      <label class="lt-rest-setting-toggle">
        <span data-rest-enabled-label>Rest timer: Off</span>
        <input type="checkbox" data-rest-enabled-input />
      </label>
      <label class="lt-rest-setting-field" data-default-rest-field>
        <span>Default rest</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" data-default-rest-input />
        <small>sec</small>
      </label>
      <label class="lt-rest-setting-field" data-lift-rest-field>
        <span>This lift</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" placeholder="Default" data-lift-rest-input />
        <small>sec</small>
      </label>
    </section>

    <section class="lt-lift-prs" data-lift-prs></section>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  // ---- Editable name (inline rename, overwrite-no-history per spec) ----
  const nameInput = root.querySelector('[data-name-input]');
  nameInput.value = lift.name;
  let lastSavedName = lift.name;
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') nameInput.blur();
  });
  nameInput.addEventListener('blur', async () => {
    const value = nameInput.value.trim();
    if (!value || value === lastSavedName) {
      nameInput.value = lastSavedName;
      return;
    }
    lastSavedName = value;
    await renameLift(liftId, value);
  });

  root.querySelector('[data-delete-lift]').addEventListener('click', async () => {
    if (!window.confirm(`Delete "${lastSavedName}"? You'll have a few seconds to undo it after.`)) {
      return;
    }
    await softDeleteLift(liftId);
    goToList();
    showUndoToast(`Deleted "${lastSavedName}"`, {
      onUndo: async () => {
        await restoreLift(liftId);
        refreshView();
      },
    });
  });

  // ---- Tabs ----
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = {
    history: root.querySelector('[data-tab-panel="history"]'),
    details: root.querySelector('[data-tab-panel="details"]'),
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      Object.entries(panels).forEach(([key, panel]) => {
        panel.hidden = key !== tab.dataset.tab;
      });
      if (tab.dataset.tab === 'details') renderDetailsTab();
    });
  });

  // ---- Quick log ----
  const logForm = root.querySelector('[data-log-form]');
  const weightInput = root.querySelector('[data-weight-input]');
  const repsInput = root.querySelector('[data-reps-input]');
  const feedback = root.querySelector('[data-log-feedback]');
  const defaultRestInput = root.querySelector('[data-default-rest-input]');
  const liftRestInput = root.querySelector('[data-lift-rest-input]');
  const restEnabledInput = root.querySelector('[data-rest-enabled-input]');
  const restEnabledLabel = root.querySelector('[data-rest-enabled-label]');
  const defaultRestField = root.querySelector('[data-default-rest-field]');
  const liftRestField = root.querySelector('[data-lift-rest-field]');
  const liftPRsEl = root.querySelector('[data-lift-prs]');

  let activeSets = [];

  function syncRestInputs() {
    defaultRestInput.value = getDefaultRestSeconds();
    liftRestInput.value = getLiftRestSeconds(liftId) || '';
    const enabled = isRestTimerEnabled();
    restEnabledInput.checked = enabled;
    restEnabledLabel.textContent = enabled ? 'Rest timer: On' : 'Rest timer: Off';
    defaultRestInput.disabled = !enabled;
    liftRestInput.disabled = !enabled;
    defaultRestField.classList.toggle('lt-rest-setting-field-disabled', !enabled);
    liftRestField.classList.toggle('lt-rest-setting-field-disabled', !enabled);
  }

  function normalizeRestInput(input) {
    const value = Number(input.value);
    if (input.value === '') return null;
    if (!Number.isFinite(value) || value < 15) return 15;
    if (value > 600) return 600;
    return Math.round(value);
  }

  defaultRestInput.addEventListener('change', () => {
    const seconds = normalizeRestInput(defaultRestInput) || 120;
    setDefaultRestSeconds(seconds);
    syncRestInputs();
  });

  liftRestInput.addEventListener('change', () => {
    const seconds = normalizeRestInput(liftRestInput);
    setLiftRestSeconds(liftId, seconds);
    syncRestInputs();
  });

  restEnabledInput.addEventListener('change', () => {
    setRestTimerEnabled(restEnabledInput.checked);
    syncRestInputs();
  });

  async function loadSets() {
    activeSets = await listSetsForLift(liftId);
  }

  function prefillWeightFromLastSet() {
    if (activeSets.length === 0) return;
    const lastSet = activeSets[activeSets.length - 1]; // ascending order; last = most recent
    weightInput.value = lastSet.weight;
  }

  logForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weight = Number(weightInput.value);
    const reps = Number(repsInput.value);
    if (!(weight >= 0) || !Number.isFinite(weight) || !(reps > 0) || !Number.isInteger(reps)) return;

    const newE1RM = calcE1RM(weight, reps);
    const priorSets = activeSets; // snapshot before insert, for correct PR comparison
    const isPR = isNewPR(newE1RM, priorSets);
    const now = new Date();
    if (isRestTimerEnabled()) primeRestTimerSound();

    await createSet(liftId, weight, reps, now.toISOString());
    if (isRestTimerEnabled()) {
      startRestTimer({ seconds: restSecondsForLift(liftId), liftName: lastSavedName });
    }
    repsInput.value = '';
    repsInput.focus();

    await loadSets();
    renderHistoryTab();
    if (!panels.details.hidden) renderDetailsTab();
    renderLiftPRs();

    const todayKey = toDateKey(now.toISOString());
    const todaysVolume = sessionVolume(activeSets.filter((s) => toDateKey(s.performed_at) === todayKey));

    feedback.hidden = false;
    feedback.classList.toggle('lt-pr', isPR);
    feedback.textContent = isPR
      ? `New PR! Today's volume: ${Math.round(todaysVolume)} lb`
      : `Logged. Today's volume: ${Math.round(todaysVolume)} lb`;
  });

  // ---- History tab ----
  function groupByDate(sets) {
    const groups = new Map();
    for (const s of sets) {
      const key = toDateKey(s.performed_at);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(s);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }

  function formatDate(dateKey) {
    const [y, m, d] = dateKey.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  function renderHistoryTab() {
    const panel = panels.history;
    if (activeSets.length === 0) {
      panel.innerHTML = `<p class="lt-empty">No sets logged yet.</p>`;
      return;
    }

    const groups = groupByDate(activeSets);
    panel.innerHTML = groups
      .map(([date, sets]) => {
        const vol = sessionVolume(sets);
        const sortedSets = sets.slice().sort((a, b) => new Date(b.performed_at) - new Date(a.performed_at));
        const rows = sortedSets
          .map((s) => {
            const e1rm = Math.round(calcE1RM(Number(s.weight), Number(s.reps)));
            return `
              <li class="lt-history-row" data-set-id="${s.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${s.id}">
                  <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                  <span class="lt-history-e1rm">${e1rm} e1RM</span>
                </button>
              </li>
            `;
          })
          .join('');
        return `
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${formatDate(date)}</span>
              <span class="lt-history-volume">${Math.round(vol)} lb volume</span>
            </div>
            <ul class="lt-history-list">${rows}</ul>
          </div>
        `;
      })
      .join('');

    panel.querySelectorAll('[data-edit-trigger]').forEach((el) => {
      el.addEventListener('click', () => openSetEditor(el.dataset.editTrigger));
    });
  }

  function findHistoryRow(setId) {
    return panels.history.querySelector(`[data-set-id="${setId}"]`);
  }

  function openSetEditor(setId) {
    const row = findHistoryRow(setId);
    const set = activeSets.find((s) => s.id === setId);
    if (!row || !set) return;

    row.innerHTML = `
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${set.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${set.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${toDateKey(set.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `;

    row.querySelector('[data-edit-cancel]').addEventListener('click', renderHistoryTab);

    row.querySelector('[data-edit-delete]').addEventListener('click', async () => {
      await softDeleteSet(setId);
      await loadSets();
      renderHistoryTab();
      if (!panels.details.hidden) renderDetailsTab();
      showUndoToast('Set deleted', {
        onUndo: async () => {
          await restoreSet(setId);
          await loadSets();
          renderHistoryTab();
          if (!panels.details.hidden) renderDetailsTab();
        },
      });
    });

    row.querySelector('[data-edit-form]').addEventListener('submit', async (e) => {
      e.preventDefault();
      const weight = Number(row.querySelector('[data-edit-weight]').value);
      const reps = Number(row.querySelector('[data-edit-reps]').value);
      const dateVal = row.querySelector('[data-edit-date]').value;
      if (!(weight >= 0) || !(reps > 0) || !dateVal) return;

      // Keep original time-of-day; only the calendar date changes.
      const existing = new Date(set.performed_at);
      const [y, m, d] = dateVal.split('-').map(Number);
      existing.setFullYear(y, m - 1, d);

      await updateSet(setId, { weight, reps, performed_at: existing.toISOString() });
      await loadSets();
      renderHistoryTab();
      if (!panels.details.hidden) renderDetailsTab();
    });
  }

  // ---- Details tab ----
  function renderDetailsTab() {
    const panel = panels.details;
    const series = dailyMaxE1RM(activeSets);
    if (series.length === 0) {
      panel.innerHTML = `<p class="lt-empty">No sets logged yet.</p>`;
      destroyLiftChart();
      return;
    }
    const progression = buildProgressionOptions(activeSets);
    const dictionaryEntry = findLiftDictionaryEntry(lift.dictionary_key || lastSavedName);
    panel.innerHTML = `
      ${renderLiftInfoCard(dictionaryEntry)}
      ${renderProgressionCard(progression)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;
    panel.querySelectorAll('[data-progression-option]').forEach((button) => {
      button.addEventListener('click', () => {
        const option = progression.options.find((item) => item.id === button.dataset.progressionOption);
        if (!option) return;
        weightInput.value = option.weight;
        repsInput.value = option.reps;
        feedback.hidden = true;
        logForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        repsInput.focus();
      });
    });
    const canvas = panel.querySelector('[data-lift-canvas]');
    const detailEl = panel.querySelector('[data-point-detail]');
    renderLiftChart(canvas, series, {
      onPointClick: (point) => {
        detailEl.hidden = false;
        detailEl.textContent = `${formatDate(point.date)}: ${point.weight} lb × ${point.reps} (${Math.round(point.e1rm)} e1RM)`;
      },
    });
  }

  await loadSets();
  syncRestInputs();
  prefillWeightFromLastSet();
  renderHistoryTab();
  renderLiftPRs();

  function renderLiftPRs() {
    const liftPRs = recentPRs(activeSets).slice(0, 3);
    liftPRsEl.innerHTML = `
      <div class="lt-lift-prs-header">
        <span>Recent PRs</span>
      </div>
      ${renderLiftPRRows(liftPRs)}
    `;
  }
}

function renderLiftInfoCard(entry) {
  if (!entry) return '';
  const primaryTags = entry.primaryMuscles.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const secondaryTags = entry.secondaryMuscles.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const equipmentTags = entry.equipment.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const patternTags = entry.movementPatterns.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  return `
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${escapeHtml(entry.name)}</strong>
      </div>
      <div class="lt-lift-info-group">
        <h3>Primary</h3>
        <div class="lt-lift-info-tags">${primaryTags || '<span>Not tagged</span>'}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Secondary</h3>
        <div class="lt-lift-info-tags">${secondaryTags || '<span>None listed</span>'}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Equipment</h3>
        <div class="lt-lift-info-tags">${equipmentTags || '<span>Not listed</span>'}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Pattern</h3>
        <div class="lt-lift-info-tags">${patternTags || '<span>Not listed</span>'}</div>
      </div>
      ${entry.cues?.length ? `
        <ul class="lt-lift-info-cues">
          ${entry.cues.map((cue) => `<li>${escapeHtml(cue)}</li>`).join('')}
        </ul>
      ` : ''}
      ${entry.tutorialUrl
        ? `<a class="lt-lift-info-link" href="${escapeHtml(entry.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`
        : '<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `;
}

function renderProgressionCard(progression) {
  if (!progression.baseline) return '';
  const volumeText = progression.context.previousVolume == null
    ? `${Math.round(progression.context.latestVolume)} lb last session`
    : `${Math.round(progression.context.latestVolume)} lb last session · ${Math.round(progression.context.previousVolume)} lb previous`;
  return `
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${escapeHtml(progression.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${escapeHtml(volumeText)}</p>
      <div class="lt-progression-options">
        ${progression.options.map((option) => `
          <button type="button" class="lt-progression-option" data-progression-option="${escapeHtml(option.id)}">
            <span>${escapeHtml(option.label)}</span>
            <strong>${escapeHtml(option.title)}</strong>
            <small>${escapeHtml(option.description)}</small>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
