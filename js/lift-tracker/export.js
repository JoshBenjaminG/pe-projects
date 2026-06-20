// Pure text-building logic for the "export progress" feature. Kept separate
// from the DOM/network (like math.js) so it can be unit tested on its own.
import { calcE1RM, sessionVolume, toDateKey } from './math.js';

export const EXPORT_WINDOW_DAYS = 30;

/** Start of the export window, as a Date. `now` is injectable for tests. */
export function exportWindowStart(now = new Date()) {
  const start = new Date(now);
  start.setDate(start.getDate() - EXPORT_WINDOW_DAYS);
  return start;
}

/**
 * Builds the plain-text progress summary for the export panel.
 *
 * @param {{id:string, name:string}[]} lifts - in display order
 * @param {Map<string, Array>} setsByLift - lift id -> recent sets (any order)
 * @param {Date} now - injected for testability; defaults to current time
 */
export function buildExportText(lifts, setsByLift, now = new Date()) {
  const todayLabel = toDateKey(now.toISOString());
  const lines = [`Lift Tracker — last ${EXPORT_WINDOW_DAYS} days (as of ${todayLabel})`, ''];

  const activeLifts = lifts.filter((lift) => (setsByLift.get(lift.id) || []).length > 0);

  if (activeLifts.length === 0) {
    lines.push('No sets logged in this period.');
    return lines.join('\n');
  }

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
  }

  return lines.join('\n').trimEnd();
}
