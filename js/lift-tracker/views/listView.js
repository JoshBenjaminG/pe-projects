import {
  listLifts,
  createLift,
  createSet,
  reorderLifts,
  listActiveSetsForLifts,
  listWorkouts,
  reorderWorkouts,
} from '../api.js';
import { dailyMaxE1RM, computeComposite, calcE1RM, isNewPR, sessionVolume, toDateKey, formatPct } from '../math.js';
import { renderCompositeChart } from '../charts.js';
import { enableDragReorder } from '../dragReorder.js';
import { goToLift, goToHelp, goToWeight, goToHistory, goToWorkoutNew, goToWorkoutEdit } from '../state.js';
import { supabase } from '../supabaseClient.js';
import { openFeedbackModal } from './feedbackModal.js';
import { weeklyKillstreak } from '../killstreak.js';
import { renderWeightSummaryCard } from './weightView.js';
import { renderHistorySummaryCard } from './historyView.js';
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
      <button type="button" class="lt-mode-toggle" data-mode-toggle aria-pressed="false">Fast</button>

      <section class="lt-killstreak" data-killstreak-section>
        <span class="lt-killstreak-icon" data-killstreak-icon>&#127919;</span>
        <span class="lt-killstreak-info">
          <span class="lt-killstreak-label" data-killstreak-label>No killstreak yet</span>
          <span class="lt-killstreak-sub" data-killstreak-sub>Log a workout to start your streak this week</span>
        </span>
      </section>
    </div>

    <div class="lt-stats-row" data-stats-row>
      <section class="lt-weight-card" data-weight-card></section>

      <section class="lt-composite" data-composite-section>
        <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
          <span class="lt-composite-toggle-label">
            <span>Composite</span>
            <span class="lt-composite-summary" data-composite-summary></span>
          </span>
          <span class="lt-chevron" data-chevron>&#9650;</span>
        </button>
        <div class="lt-composite-body" data-composite-body>
          <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
          <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
          <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
        </div>
      </section>
    </div>

    <section class="lt-history-card" data-history-card></section>

    <form class="lt-add-lift" data-add-lift-form>
      <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
      <button type="submit">+ Add Lift</button>
    </form>

    <div class="lt-workout-bar" data-workout-bar>
      <button type="button" class="lt-create-workout-btn" data-create-workout-btn>+ Create Workout</button>
      <div class="lt-workout-pills" data-workout-pills></div>
    </div>
    <p class="lt-empty lt-workout-empty-hint" data-workout-empty-hint hidden>
      Group your lifts into a workout (like "Push Day") to filter the list down to just those.
    </p>

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
  const compositeSummary = root.querySelector('[data-composite-summary]');

  // Defaults to expanded (matching the markup above) if nothing's been
  // saved yet -- whichever state the user leaves it in is the state it
  // opens back up in next time, same idea as the fast-mode toggle above.
  function applyCompositeToggleUI(expanded) {
    compositeToggle.setAttribute('aria-expanded', String(expanded));
    compositeBody.hidden = !expanded;
    chevron.innerHTML = expanded ? '&#9650;' : '&#9660;';
    // Collapsed, this card shares a row with the weight card to save
    // vertical space; expanded, it needs the full row to itself for the
    // chart, so the sibling wraps below automatically (see .lt-stats-row).
    compositeSection.classList.toggle('lt-stats-row-expanded', expanded);
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

  const historyCard = root.querySelector('[data-history-card]');
  renderHistorySummaryCard(historyCard, { onExpand: goToHistory });

  const addForm = root.querySelector('[data-add-lift-form]');
  const listEl = root.querySelector('[data-lift-list]');
  const listEmptyEl = root.querySelector('[data-list-empty]');

  root.querySelector('[data-create-workout-btn]').addEventListener('click', goToWorkoutNew);

  const workoutPillsEl = root.querySelector('[data-workout-pills]');
  const workoutEmptyHintEl = root.querySelector('[data-workout-empty-hint]');
  // Which saved workout (if any) currently filters the lift list down to
  // just its member lifts. null means unfiltered (show everything) --
  // tapping the active pill again clears it back to null rather than
  // requiring a separate "All" pill, since with only one filter active at
  // a time the active pill itself is the obvious thing to tap to undo it.
  // Declared up front (not just hoisted as a function) because the very
  // next line calls readStoredActiveWorkoutId() immediately -- that function
  // is hoisted fine, but it closes over this const, and reading a const
  // before its own declaration line executes throws (temporal dead zone),
  // which a naive try/catch around localStorage access will silently turn
  // into "always returns null".
  const ACTIVE_WORKOUT_STORAGE_KEY = 'lt-active-workout';

  let workouts = [];
  // Persisted across reloads/closing the app, same as fast mode below --
  // whichever workout filter you left active is the one you land back on.
  let activeWorkoutId = readStoredActiveWorkoutId();

  function visibleLifts() {
    if (!activeWorkoutId) return currentLifts;
    const workout = workouts.find((w) => w.id === activeWorkoutId);
    if (!workout) return currentLifts;
    const memberIds = new Set(workout.liftIds);
    return currentLifts.filter((l) => memberIds.has(l.id));
  }

  function renderWorkoutPills() {
    // Nudge new users toward grouping lifts into a workout, but only until
    // they've made their first one -- once any workout exists, the pills
    // row speaks for itself.
    workoutEmptyHintEl.hidden = workouts.length > 0;

    workoutPillsEl.innerHTML = workouts
      .map((w) => {
        const isActive = w.id === activeWorkoutId;
        return `
          <div class="lt-workout-pill-wrap${isActive ? ' lt-workout-pill-wrap-active' : ''}" data-reorder-item="${w.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${w.id}" aria-pressed="${isActive}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${w.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `;
      })
      .join('');

    // Names are free text from the user -- set via textContent, never innerHTML.
    for (const w of workouts) {
      const nameSlot = workoutPillsEl.querySelector(`[data-workout-pill="${w.id}"] [data-workout-pill-name]`);
      if (nameSlot) nameSlot.textContent = w.name;
    }

    workoutPillsEl.querySelectorAll('[data-workout-pill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.workoutPill;
        activeWorkoutId = activeWorkoutId === id ? null : id;
        writeStoredActiveWorkoutId(activeWorkoutId);
        renderWorkoutPills();
        renderLiftRows(lastLiftsData);
      });
    });

    workoutPillsEl.querySelectorAll('[data-workout-edit]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToWorkoutEdit(btn.dataset.workoutEdit);
      });
    });
  }

  function readStoredActiveWorkoutId() {
    // Same Safari-private-browsing safety net as fast mode below -- a
    // missing preference should never break the page.
    try {
      return window.localStorage.getItem(ACTIVE_WORKOUT_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }

  function writeStoredActiveWorkoutId(id) {
    try {
      if (id) {
        window.localStorage.setItem(ACTIVE_WORKOUT_STORAGE_KEY, id);
      } else {
        window.localStorage.removeItem(ACTIVE_WORKOUT_STORAGE_KEY);
      }
    } catch {
      // Ignore -- the filter still works for the rest of this session, it
      // just won't be remembered next time.
    }
  }

  const FAST_MODE_STORAGE_KEY = 'lt-fast-mode';
  // This mode used to be called "Burst" -- kept only so a one-time read
  // can carry over anyone's existing on/off preference under the old key
  // name, instead of silently resetting everyone back to Normal mode.
  const LEGACY_BURST_MODE_STORAGE_KEY = 'lt-burst-mode';

  function readStoredFastMode() {
    // Safari private browsing (and similar locked-down modes) can throw
    // on localStorage access -- fall back to Normal mode rather than
    // breaking the page over a preference.
    try {
      const current = window.localStorage.getItem(FAST_MODE_STORAGE_KEY);
      if (current !== null) return current === 'true';

      // One-time migration from the old key name.
      const legacy = window.localStorage.getItem(LEGACY_BURST_MODE_STORAGE_KEY);
      if (legacy !== null) {
        window.localStorage.setItem(FAST_MODE_STORAGE_KEY, legacy);
        window.localStorage.removeItem(LEGACY_BURST_MODE_STORAGE_KEY);
        return legacy === 'true';
      }

      return false;
    } catch {
      return false;
    }
  }

  function writeStoredFastMode(value) {
    try {
      window.localStorage.setItem(FAST_MODE_STORAGE_KEY, String(value));
    } catch {
      // Ignore -- the toggle still works for the rest of this session,
      // it just won't be remembered next time.
    }
  }

  let currentLifts = [];
  // Persisted across reloads/closing the page -- whichever mode you left
  // the list in is the mode it opens back up in next time.
  let fastMode = readStoredFastMode();
  // Sets per lift, kept around (not just dailySeries) so fast-mode quick
  // logging can compute PR/volume feedback and prefill weight without an
  // extra round trip per row.
  let setsByLift = new Map();
  let lastLiftsData = [];

  const modeToggleBtn = root.querySelector('[data-mode-toggle]');

  function applyModeToggleUI() {
    modeToggleBtn.textContent = fastMode ? 'Normal' : 'Fast';
    modeToggleBtn.setAttribute('aria-pressed', String(fastMode));
    modeToggleBtn.classList.toggle('lt-mode-toggle-active', fastMode);
  }
  applyModeToggleUI();

  modeToggleBtn.addEventListener('click', () => {
    fastMode = !fastMode;
    writeStoredFastMode(fastMode);
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
      // While a workout filter is active, newIds is only the reordered
      // *visible* subset (the rest of the list isn't even in the DOM to
      // drag). Splice that subset's new relative order back into the full
      // list -- walk the existing full order and, at each spot a visible
      // lift used to sit, pull the next id off the reordered queue instead;
      // hidden lifts are left untouched at their existing positions. That
      // keeps every lift's sort_order globally consistent either way.
      const visibleQueue = [...newIds];
      const visibleSet = new Set(newIds);
      const fullOrder = currentLifts.map((l) =>
        visibleSet.has(l.id) ? visibleQueue.shift() : l.id
      );

      await reorderLifts(fullOrder);
      currentLifts = fullOrder
        .map((id) => currentLifts.find((l) => l.id === id))
        .filter(Boolean);
    },
  });

  // Workout pills are always fully in the DOM regardless of any active
  // filter (unlike the lift list above), so newIds here is already the
  // complete order -- no subset-merging needed. The DOM itself is already
  // physically reordered by dragReorder.js at this point; only the
  // in-memory `workouts` array needs to catch up so the next
  // renderWorkoutPills() call doesn't revert it.
  enableDragReorder(workoutPillsEl, {
    axis: 'x',
    onReorder: async (newIds) => {
      await reorderWorkouts(newIds);
      workouts = newIds.map((id) => workouts.find((w) => w.id === id)).filter(Boolean);
    },
  });

  async function load() {
    workouts = await listWorkouts();
    if (activeWorkoutId && !workouts.some((w) => w.id === activeWorkoutId)) {
      activeWorkoutId = null;
      writeStoredActiveWorkoutId(null);
    }
    renderWorkoutPills();

    currentLifts = await listLifts();

    if (currentLifts.length === 0) {
      listEl.innerHTML = '';
      listEmptyEl.hidden = false;
      listEmptyEl.textContent = 'No lifts yet — add your first one above.';
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
      compositeSummary.textContent = '';
      return;
    }
    canvas.hidden = false;
    emptyEl.hidden = true;
    compositeSummary.textContent = formatPct(points[points.length - 1].pct);
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

    const rows = visibleLifts();
    listEmptyEl.hidden = rows.length > 0;
    listEmptyEl.textContent = activeWorkoutId
      ? 'No lifts in this workout yet — tap the pencil above to add some.'
      : 'No lifts yet — add your first one above.';

    listEl.innerHTML = rows
      .map((lift) => {
        if (fastMode) {
          return `
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${lift.id}" data-lift-id="${lift.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${lift.id}">
                  <span class="lt-lift-name" data-name-slot></span>
                  <span class="lt-lift-last" data-last-slot>${lastSetLabel(lift.id)}</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${escapeAttr(lift.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${lift.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${lastWeightFor(lift.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
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

    listEl.querySelectorAll('[data-open-lift]').forEach((btn) => {
      btn.addEventListener('click', () => goToLift(btn.dataset.openLift));
    });

    if (fastMode) {
      wireFastForms();
    }
  }

  function wireFastForms() {
    listEl.querySelectorAll('[data-fast-log-form]').forEach((form) => {
      const liftId = form.dataset.fastLogForm;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const weightInput = form.querySelector('[data-fast-weight]');
        const repsInput = form.querySelector('[data-fast-reps]');
        const feedback = form.querySelector('[data-fast-feedback]');
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
