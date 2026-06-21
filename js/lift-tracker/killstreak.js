// Pure logic for the weekly "killstreak" badge — gamifies workout
// consistency using Call of Duty killstreak rewards. No DOM, no network —
// kept pure and separate so it can be unit tested on its own, same pattern
// as math.js and export.js.
import { toDateKey } from './math.js';

// Tiers in ascending order. Earning N days means you've earned every tier
// up to and including the highest one whose `days` threshold is met — 4+
// workout days in a week caps out at Chopper Gunner (no higher tier).
export const KILLSTREAK_TIERS = [
  { days: 1, key: 'uav', label: 'UAV', icon: String.fromCodePoint(0x1f4e1) },
  { days: 2, key: 'predator', label: 'Predator Missile', icon: String.fromCodePoint(0x1f680) },
  { days: 3, key: 'harrier', label: 'Harrier Strike', icon: String.fromCodePoint(0x2708, 0xfe0f) },
  { days: 4, key: 'chopper', label: 'Chopper Gunner', icon: String.fromCodePoint(0x1f681) },
];

/**
 * Local-midnight Sunday that starts the calendar week containing `now`.
 * Weeks run Sunday–Saturday; `now` is injectable for tests.
 */
export function weekStart(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dow = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  d.setDate(d.getDate() - dow); // Sun -> 0 days back, Sat -> 6 days back
  return d;
}

/**
 * Count of distinct local calendar dates with at least one set in the
 * Sunday–Saturday week containing `now`. Pass in whatever sets you have
 * (e.g. all active sets across every lift) — the week boundary does the
 * filtering, so this naturally "resets" once a new week starts without
 * needing any stored state.
 *
 * @param {{performed_at:string}[]} sets
 * @param {Date} now
 */
export function workoutDaysThisWeek(sets, now = new Date()) {
  const start = weekStart(now);
  const end = new Date(start);
  end.setDate(end.getDate() + 7); // exclusive upper bound: next Sunday

  const days = new Set();
  for (const s of sets) {
    const performed = new Date(s.performed_at);
    if (performed >= start && performed < end) {
      days.add(toDateKey(s.performed_at));
    }
  }
  return days.size;
}

/** Highest killstreak tier earned for a given day count, or null if 0. */
export function killstreakForDays(days) {
  let earned = null;
  for (const tier of KILLSTREAK_TIERS) {
    if (days >= tier.days) earned = tier;
  }
  return earned;
}

/**
 * Convenience wrapper: given sets and the current time, returns both the
 * raw day count and the tier earned this week.
 */
export function weeklyKillstreak(sets, now = new Date()) {
  const days = workoutDaysThisWeek(sets, now);
  return { days, tier: killstreakForDays(days) };
}
