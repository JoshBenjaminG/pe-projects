import {
  getLift,
  renameLift,
  listSetsForLift,
  createSet,
  updateSet,
  softDeleteSet,
  restoreSet,
} from '../api.js';
import { calcE1RM, dailyMaxE1RM, isNewPR, sessionVolume, toDateKey } from '../math.js';
import { renderLiftChart, destroyLiftChart } from '../charts.js';
import { showUndoToast } from '../toast.js';
import { goToList } from '../state.js';

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

  let activeSets = [];

  async function loadSets() {
    activeSets = await listSetsForLift(liftId);
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

    await createSet(liftId, weight, reps, now.toISOString());
    weightInput.value = '';
    repsInput.value = '';
    weightInput.focus();

    await loadSets();
    renderHistoryTab();
    if (!panels.details.hidden) renderDetailsTab();

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
    panel.innerHTML = `
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;
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
  renderHistoryTab();
}
