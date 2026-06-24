import {
  listLifts,
  createLift,
  createSet,
  reorderLifts,
  listActiveSetsForLifts,
} from '../api.js';
import { dailyMaxE1RM, computeComposite, calcE1RM, isNewPR, sessionVolume, toDateKey } from '../math.js';
import { renderCompositeChart } from '../charts.js';
import { enableDragReorder } from '../dragReorder.js';
import { goToLift, goToHelp, goToWeight } from '../state.js';
import { supabase } from '../supabaseClient.js';
import { openFeedbackModal } from './feedbackModal.js';
import { weeklyKillstreak } from '../killstreak.js';
import { renderWeightSummaryCard } from './weightView.js';
import { readBoolPref, writeBoolPref } from '../prefs.js';

const COMPOSITE_EXPANDED_PREF_KEY = 'lt-composite-expanded';

export async function renderListView(root) {
  root.innerHTML = `
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-actions">
        <button type="button" class="lt-feedback-btn" data-feedback-btn>Feedback</button>
        <button type="button" class="lt-logout-btn" data-logout-btn>Log out</button>
        <button type="button" class="lt-help-btn" data-help-btn aria-label="Help">?</button>
      </div>
    </header>

    <div class="lt-toolbar">
      <button type="button" class="lt-mode-toggle" data-mode-toggle aria-pressed="false">Burst</button>

      <section class="lt-killstreak" data-killstreak-section>
        <span class="lt-killstreak-icon" data-killstreak-icon>&#127919;</span>
        <span class="lt-killstreak-info">
          <span class="lt-killstreak-label" data-killstreak-label>No killstreak yet</span>
          <span class="lt-killstreak-sub" data-killstreak-sub>Log a workout to start your streak this week</span>
        </span>
      </section>
    </div>

    <section class="lt-weight-card" data-weight-card></section>

    <section class="lt-composite" data-composite-section>
      <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
        <span>Composite progress</span>
        <span class="lt-chevron" data-chevron>&#9650;</span>
      </button>
      <div class="lt-composite-body" data-composite-body>
        <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
        <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
      </div>
    </section>

    <form class="lt-add-lift" data-add-lift-form>
      <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
      <button type="submit">+ Add Lift</button>
    </form>

    <ul class="lt-lift-list" data-lift-list></ul>
    <p class="lt-empty" data-list-empty hidden>No lifts yet — add your first one above.</p>
  `;

  const helpBtn = root.querySelector('[data-help-btn]');
  helpBtn.addEventListener('click', goToHelp);

  const feedbackBtn = root.querySelector('[data-feedback-btn]');
  feedbackBtn.addEventListener('click', () => openFeedbackModal());

  const logoutBtn = root.querySelector('[data-logout-btn]');
  logoutBtn.addEventListener('click', () => supabase.auth.signOut());

  const compositeSection = root.querySelector('[data-composite-section]');
  const compositeToggle = root.querySelector('[data-composite-toggle]');
  const compositeBody = root.querySelector('[data-composite-body]');
  const chevron = root.querySelector('[data-chevron]');

  // Defaults to expanded (matching the markup above) if nothing's been
  // saved yet -- whichever state the user leaves it in is the state it
  // opens back up in next time, same idea as the burst-mode toggle above.
  function applyCompositeToggleUI(expanded) {
    compositeToggle.setAttribute('aria-expanded', String(expanded));
    compositeBody.hidden = !expanded;
    chevron.innerHTML = expanded ? '&#9650;' : '&#9660;';
  }
  applyCompositeToggleUI(readBoolPref(COMPOSITE_EXPANDED_PREF_KEY, true));

  compositeToggle.addEventListener('click', () => {
    const expanded = compositeToggle.getAttribute('aria-expanded') === 'true';
    applyCompositeToggleUI(!expanded);
    writeBoolPref(COMPOSITE_EXPANDED_PREF_KEY, !expanded);
  });

  const killstreakIcon = root.querySelector('[data-killstreak-icon]');
  const killstreakLabel = root.querySelector('[data-killstreak-label]');
  const killstreakSub = root.querySelector('[data-killstreak-sub]');

  function renderKillstreak(sets) {
    const { days, tier } = weeklyKillstreak(sets);
    killstreakIcon.textContent = tier ? tier.icon : '\u{1F3AF}';
    killstreakLabel.textContent = tier ? tier.label : 'No killstreak yet';
    killstreakSub.textContent = tier
      ? `${days} workout ${days === 1 ? 'day' : 'days'} this week`
      : 'Log a workout to start your streak this week';
  }

  const weightCard = root.querySelector('[data-weight-card]');
  renderWeightSummaryCard(weightCard, { onExpand: goToWeight });

  const addForm = root.querySelector('[data-add-lift-form]');
  const listEl = root.querySelector('[data-lift-list]');
  const listEmptyEl = root.querySelector('[data-list-empty]');

  const BURST_MODE_STORAGE_KEY = 'lt-burst-mode';

  function readStoredBurstMode() {
    // Safari private browsing (and similar locked-down modes) can throw
    // on localStorage access -- fall back to Normal mode rather than
    // breaking the page over a preference.
    try {
      return window.localStorage.getItem(BURST_MODE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  function writeStoredBurstMode(value) {
    try {
      window.localStorage.setItem(BURST_MODE_STORAGE_KEY, String(value));
    } catch {
      // Ignore -- the toggle still works for the rest of this session,
      // it just won't be remembered next time.
    }
  }

  let currentLifts = [];
  // Persisted across reloads/closing the page -- whichever mode you left
  // the list in is the mode it opens back up in next time.
  let burstMode = readStoredBurstMode();
  // Sets per lift, kept around (not just dailySeries) so burst-mode quick
  // logging can compute PR/volume feedback and prefill weight without an
  // extra round trip per row.
  let setsByLift = new Map();
  let lastLiftsData = [];

  const modeToggleBtn = root.querySelector('[data-mode-toggle]');

  function applyModeToggleUI() {
    modeToggleBtn.textContent = burstMode ? 'Normal' : 'Burst';
    modeToggleBtn.setAttribute('aria-pressed', String(burstMode));
    modeToggleBtn.classList.toggle('lt-mode-toggle-active', burstMode);
  }
  applyModeToggleUI();

  modeToggleBtn.addEventListener('click', () => {
    burstMode = !burstMode;
    writeStoredBurstMode(burstMode);
    applyModeToggleUI();
    // Re-render from cached data -- no need to re-fetch just to switch how
    // each row behaves.
    renderLiftRows(lastLiftsData);
  });

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = addForm.querySelector('input[name="name"]');
    const name = input.value.trim();
    if (!name) return;
    input.value = '';
    input.disabled = true;
    try {
      await createLift(name, currentLifts.length);
      await load();
    } finally {
      input.disabled = false;
      input.focus();
    }
  });

  // Bound once: the list re-renders its innerHTML on every load(), but
  // listEl itself stays the same node for the life of this view, and
  // enableDragReorder reads the DOM fresh on every drag via delegation.
  enableDragReorder(listEl, {
    onReorder: async (newIds) => {
      await reorderLifts(newIds);
      currentLifts = newIds
        .map((id) => currentLifts.find((l) => l.id === id))
        .filter(Boolean);
    },
  });

  async function load() {
    currentLifts = await listLifts();
    listEmptyEl.hidden = currentLifts.length > 0;

    if (currentLifts.length === 0) {
      listEl.innerHTML = '';
      compositeSection.hidden = true;
      renderKillstreak([]);
      setsByLift = new Map();
      lastLiftsData = [];
      return;
    }

    const sets = await listActiveSetsForLifts(currentLifts.map((l) => l.id));
    renderKillstreak(sets);
    setsByLift = new Map(currentLifts.map((l) => [l.id, []]));
    for (const s of sets) {
      const bucket = setsByLift.get(s.lift_id);
      if (bucket) bucket.push(s);
    }

    const liftsData = currentLifts.map((lift) => ({
      liftId: lift.id,
      dailySeries: dailyMaxE1RM(setsByLift.get(lift.id) || []),
    }));

    renderLiftRows(liftsData);
    renderComposite(liftsData);
  }

  function renderComposite(liftsData) {
    const points = computeComposite(liftsData);
    compositeSection.hidden = false;
    const canvas = root.querySelector('[data-composite-canvas]');
    const emptyEl = root.querySelector('[data-composite-empty]');
    if (points.length === 0) {
      canvas.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    canvas.hidden = false;
    emptyEl.hidden = true;
    renderCompositeChart(canvas, points);
  }

  function lastSetLabel(liftId) {
    const series = dailyMaxE1RM(setsByLift.get(liftId) || []);
    const last = series[series.length - 1];
    return last ? `${Math.round(last.e1rm)} lb e1RM` : 'No sets yet';
  }

  function lastWeightFor(liftId) {
    const sets = setsByLift.get(liftId) || [];
    if (sets.length === 0) return '';
    return sets[sets.length - 1].weight;
  }

  function renderLiftRows(liftsData) {
    lastLiftsData = liftsData;

    listEl.innerHTML = currentLifts
      .map((lift) => {
        if (burstMode) {
          return `
            <li class="lt-lift-row lt-lift-row-burst" data-reorder-item="${lift.id}" data-lift-id="${lift.id}">
              <div class="lt-lift-row-burst-top">
                <div class="lt-lift-row-main lt-lift-row-burst-main">
                  <span class="lt-lift-name" data-name-slot></span>
                  <span class="lt-lift-last" data-last-slot>${lastSetLabel(lift.id)}</span>
                </div>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${escapeAttr(lift.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-burst-log" data-burst-log-form="${lift.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${lastWeightFor(lift.id)}" data-burst-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-burst-reps />
                <button type="submit" class="lt-burst-log-btn">Log</button>
                <span class="lt-burst-feedback" data-burst-feedback hidden></span>
              </form>
            </li>
          `;
        }
        return `
          <li class="lt-lift-row" data-reorder-item="${lift.id}" data-lift-id="${lift.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${lift.id}">
              <span class="lt-lift-name" data-name-slot></span>
              <span class="lt-lift-last">${lastSetLabel(lift.id)}</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${escapeAttr(lift.name)}">&#8942;&#8942;</button>
          </li>
        `;
      })
      .join('');

    // Names are free text from the user — set via textContent, never innerHTML.
    for (const lift of currentLifts) {
      const row = listEl.querySelector(`[data-lift-id="${lift.id}"]`);
      const nameSlot = row?.querySelector('[data-name-slot]');
      if (nameSlot) nameSlot.textContent = lift.name;
    }

    if (burstMode) {
      wireBurstForms();
    } else {
      listEl.querySelectorAll('[data-open-lift]').forEach((btn) => {
        btn.addEventListener('click', () => goToLift(btn.dataset.openLift));
      });
    }
  }

  function wireBurstForms() {
    listEl.querySelectorAll('[data-burst-log-form]').forEach((form) => {
      const liftId = form.dataset.burstLogForm;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const weightInput = form.querySelector('[data-burst-weight]');
        const repsInput = form.querySelector('[data-burst-reps]');
        const feedback = form.querySelector('[data-burst-feedback]');
        const weight = Number(weightInput.value);
        const reps = Number(repsInput.value);
        if (!(weight >= 0) || !Number.isFinite(weight) || !(reps > 0) || !Number.isInteger(reps)) {
          return;
        }

        const priorSets = setsByLift.get(liftId) || [];
        const newE1RM = calcE1RM(weight, reps);
        const isPR = isNewPR(newE1RM, priorSets);
        const now = new Date();
        const performedAt = now.toISOString();

        const newSet = await createSet(liftId, weight, reps, performedAt);

        // Patch local cache + DOM in place rather than reloading the whole
        // list -- keeps focus and rhythm intact for rapid-fire logging.
        const updatedSets = [...priorSets, newSet];
        setsByLift.set(liftId, updatedSets);

        repsInput.value = '';
        repsInput.focus();

        const liveRow = listEl.querySelector(`[data-lift-id="${liftId}"]`);
        const lastSlot = liveRow?.querySelector('[data-last-slot]');
        if (lastSlot) lastSlot.textContent = lastSetLabel(liftId);

        const todayKey = toDateKey(performedAt);
        const todaysVolume = sessionVolume(
          updatedSets.filter((s) => toDateKey(s.performed_at) === todayKey)
        );

        feedback.hidden = false;
        feedback.classList.toggle('lt-pr', isPR);
        feedback.textContent = isPR ? `PR! ${Math.round(todaysVolume)} lb today` : `Logged · ${Math.round(todaysVolume)} lb today`;
      });
    });
  }

  function escapeAttr(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  await load();
}
