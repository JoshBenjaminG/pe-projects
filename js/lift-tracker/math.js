// Pure math helpers for the Lift Tracker. No DOM, no network — kept pure and
// separate from everything else so it can be unit tested on its own.

/**
 * Estimated 1-rep max via the Epley formula.
 * e1RM = weight * (1 + reps / 30)
 */
export function calcE1RM(weight, reps) {
  return weight * (1 + reps / 30);
}

/**
 * Converts an ISO timestamp into a local calendar-date key (YYYY-MM-DD).
 * "Workout date" is always the lifter's local day, not the UTC day.
 */
export function toDateKey(isoString) {
  const d = new Date(isoString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Collapses a flat list of sets (any order) into one point per workout date,
 * where the point's e1RM is the MAX e1RM among that date's sets. Returned
 * ascending by date — this is the series used for both the per-lift chart
 * and as input to computeComposite.
 *
 * @param {{weight:number|string, reps:number|string, performed_at:string, id?:string}[]} sets
 */
export function dailyMaxE1RM(sets) {
  const byDate = new Map();
  for (const s of sets) {
    const dateKey = toDateKey(s.performed_at);
    const e1rm = calcE1RM(Number(s.weight), Number(s.reps));
    const existing = byDate.get(dateKey);
    if (!existing || e1rm > existing.e1rm) {
      byDate.set(dateKey, {
        date: dateKey,
        e1rm,
        weight: Number(s.weight),
        reps: Number(s.reps),
        setId: s.id,
      });
    }
  }
  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Composite normalized progress score.
 *
 * For each lift L (with at least one workout date):
 *   baseline_L      = e1RM on L's first workout date
 *   current_L_at(t)  = e1RM on L's most recent workout date <= t
 *   composite(t)     = mean of (current_L_at(t) / baseline_L) over every L
 *                       that has a workout date <= t
 *
 * Produces one point per unique workout date across ALL lifts. Baselines are
 * derived fresh from whatever `dailySeries` is passed in, so if the caller
 * recomputes dailySeries from the current set of non-deleted sets each time,
 * editing/deleting a lift's earliest session naturally shifts its baseline —
 * no separate recompute step needed.
 *
 * @param {{liftId:string, dailySeries:{date:string,e1rm:number}[]}[]} liftsData
 *   dailySeries must be sorted ascending by date (dailyMaxE1RM already does this).
 */
export function computeComposite(liftsData) {
  const activeLifts = liftsData.filter((l) => l.dailySeries.length > 0);
  if (activeLifts.length === 0) return [];

  const baselineByLift = new Map();
  for (const lift of activeLifts) {
    baselineByLift.set(lift.liftId, lift.dailySeries[0].e1rm);
  }

  const allDates = new Set();
  for (const lift of activeLifts) {
    for (const point of lift.dailySeries) allDates.add(point.date);
  }
  const sortedDates = Array.from(allDates).sort();

  const result = [];
  for (const t of sortedDates) {
    let sum = 0;
    let count = 0;
    for (const lift of activeLifts) {
      let current = null;
      for (const point of lift.dailySeries) {
        if (point.date <= t) current = point;
        else break; // dailySeries is ascending, so nothing further can qualify
      }
      if (current) {
        sum += current.e1rm / baselineByLift.get(lift.liftId);
        count += 1;
      }
    }
    if (count > 0) {
      const ratio = sum / count;
      result.push({ date: t, ratio, pct: (ratio - 1) * 100 });
    }
  }
  return result;
}

/** True if newE1RM beats every prior (non-deleted) set's e1RM for the lift. */
export function isNewPR(newE1RM, priorSets) {
  if (!priorSets || priorSets.length === 0) return false;
  const priorMax = Math.max(...priorSets.map((s) => calcE1RM(Number(s.weight), Number(s.reps))));
  return newE1RM > priorMax;
}

/** Total volume (weight * reps, summed) for a set of sets — e.g. one session. */
export function sessionVolume(sets) {
  return sets.reduce((sum, s) => sum + Number(s.weight) * Number(s.reps), 0);
}

/** Formats a ratio-based percent as the spec's "+15%" / "−5%" / "0%". */
export function formatPct(pct) {
  const rounded = Math.round(pct);
  if (rounded === 0) return '0%';
  return rounded > 0 ? `+${rounded}%` : `−${Math.abs(rounded)}%`;
}

/**
 * Collapses a flat list of body-weight entries (any order) into one point
 * per calendar date. If multiple entries land on the same date (e.g. a
 * same-day correction), the most recently CREATED entry for that date wins
 * — unlike dailyMaxE1RM, this isn't "the best value", it's "the latest
 * known-correct value" for that day. Returned ascending by date.
 *
 * @param {{weight:number|string, logged_at:string, created_at?:string, id?:string}[]} entries
 */
export function dailyWeightSeries(entries) {
  const byDate = new Map();
  for (const e of entries) {
    const dateKey = toDateKey(e.logged_at);
    const existing = byDate.get(dateKey);
    if (!existing || new Date(e.created_at || 0) >= new Date(existing.createdAt || 0)) {
      byDate.set(dateKey, {
        date: dateKey,
        weight: Number(e.weight),
        entryId: e.id,
        createdAt: e.created_at,
      });
    }
  }
  return Array.from(byDate.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(({ date, weight, entryId }) => ({ date, weight, entryId }));
}

/**
 * Summarizes a weight series (ascending by date, as returned by
 * dailyWeightSeries) into the start value, current value, and the signed
 * change between them. Returns null if there's no data yet.
 *
 * @param {{date:string, weight:number}[]} series
 */
export function weightSummary(series) {
  if (series.length === 0) return null;
  const start = series[0];
  const current = series[series.length - 1];
  return {
    start: start.weight,
    current: current.weight,
    currentDate: current.date,
    change: current.weight - start.weight,
  };
}
