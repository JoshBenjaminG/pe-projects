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

/**
 * Lifetime tally of how many distinct Sun-Sat weeks earned each tier,
 * across a user's full set history (not just the current week). Each
 * week counts toward its single highest tier only -- a 3-workout-day week
 * counts as one Harrier Strike, not also a UAV and a Predator Missile --
 * matching how the weekly badge itself only ever shows the top tier
 * earned, never every tier passed through on the way there.
 *
 * Returns a plain object keyed by tier `key` (see KILLSTREAK_TIERS), e.g.
 * `{ uav: 3, predator: 1, harrier: 0, chopper: 2 }`, always including
 * every tier even at 0 so callers don't need an existence check per tier.
 *
 * @param {{performed_at:string}[]} sets
 */
export function killstreakHistory(sets) {
  const dayKeysByWeek = new Map(); // week-start epoch ms -> Set of date keys

  for (const s of sets) {
    const start = weekStart(new Date(s.performed_at));
    const weekKey = start.getTime();
    if (!dayKeysByWeek.has(weekKey)) dayKeysByWeek.set(weekKey, new Set());
    dayKeysByWeek.get(weekKey).add(toDateKey(s.performed_at));
  }

  const counts = {};
  for (const tier of KILLSTREAK_TIERS) counts[tier.key] = 0;

  for (const dayKeys of dayKeysByWeek.values()) {
    const tier = killstreakForDays(dayKeys.size);
    if (tier) counts[tier.key] += 1;
  }

  return counts;
}

/**
 * Lifetime count of distinct local calendar dates with at least one set,
 * across a user's full history (not bounded to any single week). This is
 * the backbone stat for the achievement "rank" track below -- it's the
 * one number that scales predictably with elapsed time regardless of
 * which exact tier any given week landed on.
 *
 * @param {{performed_at:string}[]} sets
 */
export function totalWorkoutDays(sets) {
  const days = new Set();
  for (const s of sets) {
    days.add(toDateKey(s.performed_at));
  }
  return days.size;
}

/**
 * Longest run of consecutive Sun-Sat weeks in which at least one workout
 * day was logged (i.e. at least a UAV was earned each of those weeks).
 * This is a lifetime maximum, not "is a streak currently active" -- once
 * reached, the achievements built on it stay unlocked even if the streak
 * later breaks.
 *
 * @param {{performed_at:string}[]} sets
 */
export function longestConsecutiveWeekStreak(sets) {
  const weekKeys = new Set();
  for (const s of sets) {
    weekKeys.add(weekStart(new Date(s.performed_at)).getTime());
  }
  const sorted = Array.from(weekKeys).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;

  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const expectedNext = new Date(sorted[i - 1]);
    expectedNext.setDate(expectedNext.getDate() + 7);
    current = expectedNext.getTime() === sorted[i] ? current + 1 : 1;
    if (current > longest) longest = current;
  }
  return longest;
}

/**
 * Stats every achievement's `isUnlocked()` check reads. Computed once per
 * page view and threaded through rather than having each achievement
 * re-walk the full set history itself.
 *
 * @param {{performed_at:string}[]} sets
 */
export function achievementStats(sets) {
  return {
    totalDays: totalWorkoutDays(sets),
    tierCounts: killstreakHistory(sets),
    longestStreak: longestConsecutiveWeekStreak(sets),
  };
}

// Achievement catalog, Call of Duty-themed. Four tracks:
//
// - "rank" -- military rank ladder gated on lifetime total workout days.
//   Thresholds are front-loaded on purpose: new users should see a quick
//   run of unlocks (themes included) instead of a long dry spell, so all
//   14 tiers are reachable within roughly the first one to two months for
//   someone training a few times a week, with the back half (Major
//   onward) just stretched enough to still feel earned. Once the catalog
//   here feels too easy to exhaust, add more named theme blocks + ranks
//   above Prestige Master rather than re-spacing the existing ladder.
//   Each rank also carries a `theme` -- earning that rank unlocks the
//   matching `:root[data-lt-theme="..."]` color theme from
//   lift-tracker.css for the rest of the app (see views/killstreakView.js,
//   where unlocked rank cards become clickable to apply their theme).
//   Private (the very first rank) comes with the app's original look,
//   named "Lift Tracker" here so it has an identity alongside the rest.
//   There are 13 named theme blocks in the stylesheet plus that default,
//   lining up exactly with these 14 rank tiers.
// - "mastery" -- lifetime count of each weekly killstreak tier earned.
//   Less predictable than the rank track (it depends on workout-pattern
//   mix, not just elapsed time) so thresholds are kept modest.
// - "streak" -- longest run of consecutive Sun-Sat weeks with at least a
//   UAV, named after real Call of Duty killstreak rewards in roughly
//   ascending in-game kill-cost order.
// - "capstone" -- combines a hard rank/mastery/streak achievement from
//   two different tracks, rewarding different play styles (volume vs.
//   steady consistency) with one shared finish line.
export const ACHIEVEMENTS = [
  // --- Rank: lifetime total workout days ---
  { id: 'rank-private', name: 'Private', track: 'rank', description: 'Log 1 workout day.', theme: { id: 'default', label: 'Lift Tracker' }, isUnlocked: (s) => s.totalDays >= 1 },
  { id: 'rank-pfc', name: 'Private First Class', track: 'rank', description: 'Log 2 workout days.', theme: { id: 'agile', label: 'Agile' }, isUnlocked: (s) => s.totalDays >= 2 },
  { id: 'rank-corporal', name: 'Corporal', track: 'rank', description: 'Log 3 workout days.', theme: { id: 'agriculture', label: 'Agriculture' }, isUnlocked: (s) => s.totalDays >= 3 },
  { id: 'rank-sergeant', name: 'Sergeant', track: 'rank', description: 'Log 5 workout days.', theme: { id: 'bluelift', label: 'Blue Lift' }, isUnlocked: (s) => s.totalDays >= 5 },
  { id: 'rank-staff-sergeant', name: 'Staff Sergeant', track: 'rank', description: 'Log 7 workout days.', theme: { id: 'army', label: 'Army' }, isUnlocked: (s) => s.totalDays >= 7 },
  { id: 'rank-master-sergeant', name: 'Master Sergeant', track: 'rank', description: 'Log 9 workout days.', theme: { id: 'brown', label: 'Brown' }, isUnlocked: (s) => s.totalDays >= 9 },
  { id: 'rank-warrant-officer', name: 'Warrant Officer', track: 'rank', description: 'Log 11 workout days.', theme: { id: 'neon', label: 'Neon' }, isUnlocked: (s) => s.totalDays >= 11 },
  { id: 'rank-lieutenant', name: 'Lieutenant', track: 'rank', description: 'Log 13 workout days.', theme: { id: 'white', label: 'White' }, isUnlocked: (s) => s.totalDays >= 13 },
  { id: 'rank-captain', name: 'Captain', track: 'rank', description: 'Log 15 workout days.', theme: { id: 'apple', label: 'Apple' }, isUnlocked: (s) => s.totalDays >= 15 },
  { id: 'rank-major', name: 'Major', track: 'rank', description: 'Log 18 workout days.', theme: { id: 'candy', label: 'Candy' }, isUnlocked: (s) => s.totalDays >= 18 },
  { id: 'rank-colonel', name: 'Colonel', track: 'rank', description: 'Log 22 workout days.', theme: { id: 'dim', label: 'Dim' }, isUnlocked: (s) => s.totalDays >= 22 },
  { id: 'rank-general', name: 'General', track: 'rank', description: 'Log 27 workout days.', theme: { id: 'evolution', label: 'Evolution' }, isUnlocked: (s) => s.totalDays >= 27 },
  { id: 'rank-prestige', name: 'Prestige', track: 'rank', description: 'Log 33 workout days.', theme: { id: 'gwen', label: 'Gwen' }, isUnlocked: (s) => s.totalDays >= 33 },
  { id: 'rank-prestige-master', name: 'Prestige Master', track: 'rank', description: 'Log 40 workout days.', theme: { id: 'questionable', label: 'Questionable' }, isUnlocked: (s) => s.totalDays >= 40 },

  // --- Mastery: lifetime count of each weekly tier earned ---
  { id: 'mastery-uav-1', name: 'UAV Specialist', track: 'mastery', description: 'Earn the UAV tier 3 times.', isUnlocked: (s) => s.tierCounts.uav >= 3 },
  { id: 'mastery-uav-2', name: 'UAV Veteran', track: 'mastery', description: 'Earn the UAV tier 10 times.', isUnlocked: (s) => s.tierCounts.uav >= 10 },
  { id: 'mastery-predator-1', name: 'Predator Specialist', track: 'mastery', description: 'Earn Predator Missile 3 times.', isUnlocked: (s) => s.tierCounts.predator >= 3 },
  { id: 'mastery-predator-2', name: 'Predator Veteran', track: 'mastery', description: 'Earn Predator Missile 10 times.', isUnlocked: (s) => s.tierCounts.predator >= 10 },
  { id: 'mastery-harrier-1', name: 'Harrier Specialist', track: 'mastery', description: 'Earn Harrier Strike 5 times.', isUnlocked: (s) => s.tierCounts.harrier >= 5 },
  { id: 'mastery-harrier-2', name: 'Harrier Veteran', track: 'mastery', description: 'Earn Harrier Strike 15 times.', isUnlocked: (s) => s.tierCounts.harrier >= 15 },
  { id: 'mastery-chopper-1', name: 'Chopper Gunner', track: 'mastery', description: 'Earn Chopper Gunner for the first time.', isUnlocked: (s) => s.tierCounts.chopper >= 1 },
  { id: 'mastery-chopper-2', name: 'Gunship', track: 'mastery', description: 'Earn Chopper Gunner 5 times.', isUnlocked: (s) => s.tierCounts.chopper >= 5 },

  // --- Streak: longest consecutive Sun-Sat weeks with at least a UAV ---
  { id: 'streak-2', name: 'Counter-UAV', track: 'streak', description: '2 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 2 },
  { id: 'streak-3', name: 'Care Package', track: 'streak', description: '3 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 3 },
  { id: 'streak-4', name: 'Sentry Gun', track: 'streak', description: '4 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 4 },
  { id: 'streak-5', name: 'Attack Helicopter', track: 'streak', description: '5 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 5 },
  { id: 'streak-6', name: 'Stealth Bomber', track: 'streak', description: '6 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 6 },
  { id: 'streak-8', name: 'Juggernaut', track: 'streak', description: '8 consecutive weeks with at least a UAV.', isUnlocked: (s) => s.longestStreak >= 8 },

  // --- Capstone: combine a hard achievement from two different tracks ---
  { id: 'capstone-tactical-nuke', name: 'Tactical Nuke', track: 'capstone', description: 'Reach General (27 days) and earn Gunship (Chopper Gunner x5).', isUnlocked: (s) => s.totalDays >= 27 && s.tierCounts.chopper >= 5 },
  { id: 'capstone-moab', name: 'MOAB', track: 'capstone', description: 'Reach Juggernaut (8-week streak) and Harrier Veteran (x15).', isUnlocked: (s) => s.longestStreak >= 8 && s.tierCounts.harrier >= 15 },
  { id: 'capstone-dark-matter', name: 'Dark Matter', track: 'capstone', description: 'Reach Prestige Master (40 days) and earn Gunship (x5).', isUnlocked: (s) => s.totalDays >= 40 && s.tierCounts.chopper >= 5 },
];

/**
 * ACHIEVEMENTS annotated with each one's unlocked state for these sets.
 * Stats are computed once and reused across every achievement check.
 *
 * @param {{performed_at:string}[]} sets
 */
export function achievementProgress(sets) {
  const stats = achievementStats(sets);
  return ACHIEVEMENTS.map((a) => ({
    id: a.id,
    name: a.name,
    track: a.track,
    description: a.description,
    theme: a.theme ?? null,
    unlocked: a.isUnlocked(stats),
  }));
}

/**
 * Given a list of `{ id, unlocked }` items (e.g. the output of
 * achievementProgress) and a list of ids the caller already knows about
 * ("seen" -- read from wherever that gets persisted), returns the ids
 * that are unlocked now but weren't in the seen list. Used to detect
 * "you just unlocked something new" without this module knowing anything
 * about cookies, storage, or the DOM -- the caller persists `seenIds`
 * and passes it back in on the next check.
 *
 * @param {{id:string, unlocked:boolean}[]} progress
 * @param {string[]} seenIds
 */
export function newlyUnlockedIds(progress, seenIds) {
  const seen = new Set(seenIds);
  return progress.filter((a) => a.unlocked && !seen.has(a.id)).map((a) => a.id);
}
