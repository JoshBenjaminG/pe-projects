// Cross-lift workout history: a small homepage teaser card (just a day
// count, no inline expansion -- unlike Weight/Composite there's no compact
// "expanded but still on the homepage" state that makes sense here, since
// a full history can run to dozens of day-groups) plus a full page (its
// own route, see state.js's goToHistory/parseRoute) listing every day a
// set was logged, across every lift, most recent first.
//
// Unlike the per-lift History tab (detailView.js), which only ever shows
// one lift's sets, this pulls active sets for *all* lifts and groups by
// date first, then by lift within each date -- a single day can easily
// have sets from more than one lift.
import { listLifts, listActiveSetsForLifts } from '../api.js';
import { calcE1RM, groupSetsByDate, countWorkoutDays } from '../math.js';
import { goToList } from '../state.js';
import { DISCOVERY_FEATURES, markDiscoverySeen } from '../discovery.js';

/** "YYYY-MM-DD" -> "Mon, Jun 22", matching the per-lift History tab and the
 * Weight/Waist pages' history lists. */
function formatDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** Fetches every active set across every lift, each annotated with its
 * lift's name (sets only carry `lift_id` on their own) -- shared by both
 * the homepage card and the full page below so they can't drift out of
 * sync on what counts as "logged". */
async function loadAllSets() {
  const lifts = await listLifts();
  const nameById = new Map(lifts.map((l) => [l.id, l.name]));
  const sets = await listActiveSetsForLifts(lifts.map((l) => l.id));
  return sets.map((s) => ({ ...s, liftName: nameById.get(s.lift_id) || 'Unknown lift' }));
}

/**
 * Renders the compact homepage card: just a label, a day count so there's
 * something to see without navigating away, and an arrow to the full page.
 */
export async function renderHistorySummaryCard(container, { onExpand } = {}) {
  const sets = await loadAllSets();
  const days = countWorkoutDays(sets);

  container.innerHTML = `
    <div class="lt-history-card-row">
      <span class="lt-history-card-label">History</span>
      <span class="lt-history-card-summary">${days === 0 ? 'No workouts logged yet' : `${days} day${days === 1 ? '' : 's'} logged`}</span>
      <button type="button" class="lt-history-expand" data-history-expand aria-label="Open workout history">&#8250;</button>
    </div>
  `;

  container.querySelector('[data-history-expand]').addEventListener('click', () => {
    if (onExpand) onExpand();
  });
}

/** Renders one date group: the date/lift-count header, then each lift that
 * had sets that day with its own sub-list of weight x reps rows. */
function renderDayGroup(dateKey, sets) {
  const liftGroups = new Map();
  for (const s of sets) {
    if (!liftGroups.has(s.liftName)) liftGroups.set(s.liftName, []);
    liftGroups.get(s.liftName).push(s);
  }

  const liftSections = Array.from(liftGroups.entries())
    .map(([liftName, liftSets]) => {
      const sorted = liftSets.slice().sort((a, b) => new Date(a.performed_at) - new Date(b.performed_at));
      const rows = sorted
        .map((s) => {
          const e1rm = Math.round(calcE1RM(Number(s.weight), Number(s.reps)));
          return `
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${e1rm} e1RM</span>
              </div>
            </li>
          `;
        })
        .join('');
      return `
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${liftName}</div>
          <ul class="lt-history-list">${rows}</ul>
        </div>
      `;
    })
    .join('');

  const liftCount = liftGroups.size;
  return `
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${formatDate(dateKey)}</span>
        <span class="lt-history-volume">${liftCount} lift${liftCount === 1 ? '' : 's'} &middot; ${sets.length} set${sets.length === 1 ? '' : 's'}</span>
      </div>
      ${liftSections}
    </div>
  `;
}

export async function renderHistoryView(root) {
  markDiscoverySeen(DISCOVERY_FEATURES.history);

  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  const content = root.querySelector('[data-history-content]');
  const sets = await loadAllSets();

  if (sets.length === 0) {
    content.innerHTML = `<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;
    return;
  }

  const groups = groupSetsByDate(sets);
  content.innerHTML = groups.map(([dateKey, daySets]) => renderDayGroup(dateKey, daySets)).join('');
}
