// Pure text-building logic for the "export progress" feature. Kept separate
// from the DOM/network (like math.js) so it can be unit tested on its own.
import { calcE1RM, sessionVolume, toDateKey } from './math.js';

export const EXPORT_WINDOW_DAYS = 60;

/** Start of the export window, as a Date. `now` is injectable for tests. */
export function exportWindowStart(now = new Date()) {
  const start = new Date(now);
  start.setDate(start.getDate() - EXPORT_WINDOW_DAYS);
  return start;
}

/** Trims to at most one decimal place, dropping a trailing ".0" -- same
 * rounding convention as the weight/waist card/history (see weightView.js).
 * Shared by both the weight and waist sections below -- the unit (lb/in) is
 * appended separately by each caller. */
function formatMeasurement(n) {
  const rounded = Math.round(n * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1);
}

/**
 * Builds the plain-text progress summary for the export panel.
 *
 * @param {{id:string, name:string}[]} lifts - in display order
 * @param {Map<string, Array>} setsByLift - lift id -> recent sets (any order)
 * @param {Date} now - injected for testability; defaults to current time
 * @param {string} windowLabel - shown in the header line, e.g. "last 60
 *   days" or "all-time" -- purely cosmetic, doesn't affect which sets are
 *   included (that's controlled by what's already in setsByLift).
 * @param {{date:string, weight:number}[]} weightSeries - one entry per day
 *   (already deduped/sorted ascending, e.g. via math.js's dailyWeightSeries),
 *   already filtered to whatever window applies -- omitted entirely from the
 *   output when empty, so callers with no weight data don't need a special
 *   case.
 * @param {{date:string, waist:number}[]} waistSeries - same shape/rules as
 *   weightSeries above (e.g. via math.js's dailyWaistSeries), just for waist
 *   circumference -- also omitted entirely when empty.
 */
export function buildExportText(
  lifts,
  setsByLift,
  now = new Date(),
  windowLabel = `last ${EXPORT_WINDOW_DAYS} days`,
  weightSeries = [],
  waistSeries = []
) {
  const todayLabel = toDateKey(now.toISOString());
  const lines = [`Lift Tracker — ${windowLabel} (as of ${todayLabel})`, ''];

  const activeLifts = lifts.filter((lift) => (setsByLift.get(lift.id) || []).length > 0);

  if (activeLifts.length === 0) {
    lines.push('No sets logged in this period.');
    lines.push('');
  } else {
    for (const lift of activeLifts) {
      const sets = (setsByLift.get(lift.id) || [])
        .slice()
        .sort((a, b) => new Date(a.performed_at) - new Date(b.performed_at));

      const vol = sessionVolume(sets);
      const bestE1RM = Math.max(...sets.map((s) => calcE1RM(Number(s.weight), Number(s.reps))));

      lines.push(lift.name);
      for (const s of sets) {
        const e1rm = Math.round(calcE1RM(Number(s.weight), Number(s.reps)));
        lines.push(`  ${toDateKey(s.performed_at)}: ${s.weight} lb x ${s.reps} (e1RM ${e1rm})`);
      }
      lines.push(`  Sets: ${sets.length} | Volume: ${Math.round(vol)} lb | Best e1RM: ${Math.round(bestE1RM)}`);
      lines.push('');
    }

    const skipped = lifts.length - activeLifts.length;
    if (skipped > 0) {
      lines.push(`(${skipped} lift${skipped === 1 ? '' : 's'} with no sets in this period omitted)`);
      lines.push('');
    }
  }

  if (weightSeries.length > 0) {
    lines.push('Body weight');
    for (const entry of weightSeries) {
      lines.push(`  ${entry.date}: ${formatMeasurement(entry.weight)} lb`);
    }
    const start = weightSeries[0].weight;
    const current = weightSeries[weightSeries.length - 1].weight;
    const change = current - start;
    const sign = change > 0 ? '+' : '';
    lines.push(
      `  Start: ${formatMeasurement(start)} lb | Current: ${formatMeasurement(current)} lb | Change: ${sign}${formatMeasurement(change)} lb`
    );
    lines.push('');
  }

  if (waistSeries.length > 0) {
    lines.push('Waist');
    for (const entry of waistSeries) {
      lines.push(`  ${entry.date}: ${formatMeasurement(entry.waist)} in`);
    }
    const start = waistSeries[0].waist;
    const current = waistSeries[waistSeries.length - 1].waist;
    const change = current - start;
    const sign = change > 0 ? '+' : '';
    lines.push(
      `  Start: ${formatMeasurement(start)} in | Current: ${formatMeasurement(current)} in | Change: ${sign}${formatMeasurement(change)} in`
    );
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}
