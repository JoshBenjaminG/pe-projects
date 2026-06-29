// Standalone full-page view for the composite progress chart. Mirrors the
// inline composite section on the list view (same blurb, same chart, same
// empty state) but as its own route -- used as the destination for the
// composite toggle on narrow screens, where there isn't room to expand the
// chart inline without the page layout jumping around (see listView.js's
// composite toggle click handler).
import { listLifts, listActiveSetsForLifts, listWorkouts } from '../api.js';
import { dailyMaxE1RM, computeComposite } from '../math.js';
import { renderCompositeChart } from '../charts.js';
import { goToList } from '../state.js';
import { findStoredActiveWorkout } from '../workoutPrefs.js';
import { DISCOVERY_FEATURES, markDiscoverySeen } from '../discovery.js';

export async function renderCompositeView(root) {
  markDiscoverySeen(DISCOVERY_FEATURES.composite);

  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  const [allLifts, workouts] = await Promise.all([listLifts(), listWorkouts()]);
  const activeWorkout = findStoredActiveWorkout(workouts);
  const lifts = activeWorkout
    ? allLifts.filter((lift) => activeWorkout.liftIds.includes(lift.id))
    : allLifts;
  const sets = lifts.length ? await listActiveSetsForLifts(lifts.map((l) => l.id)) : [];

  const setsByLift = new Map(lifts.map((l) => [l.id, []]));
  for (const s of sets) {
    const bucket = setsByLift.get(s.lift_id);
    if (bucket) bucket.push(s);
  }

  const liftsData = lifts.map((lift) => ({
    liftId: lift.id,
    dailySeries: dailyMaxE1RM(setsByLift.get(lift.id) || []),
  }));

  const points = computeComposite(liftsData);
  const canvas = root.querySelector('[data-composite-canvas]');
  const emptyEl = root.querySelector('[data-composite-empty]');
  const scopeEl = root.querySelector('[data-composite-scope]');
  const blurbEl = root.querySelector('[data-composite-blurb]');

  scopeEl.textContent = activeWorkout
    ? `Measuring ${activeWorkout.name}`
    : 'Measuring all lifts';
  blurbEl.textContent = activeWorkout
    ? 'Your average strength gain across the lifts in this workout, relative to where each one started.'
    : 'Your average strength gain across all lifts, relative to where each one started.';
  emptyEl.textContent = activeWorkout
    ? `Log a few sets for lifts in ${activeWorkout.name} to see this workout's composite progress.`
    : 'Log a few workouts to see your composite progress.';

  if (points.length === 0) {
    canvas.hidden = true;
    emptyEl.hidden = false;
    return;
  }
  canvas.hidden = false;
  emptyEl.hidden = true;
  renderCompositeChart(canvas, points);
}
