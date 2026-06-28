import { weekStart, workoutDaysThisWeek, killstreakForDays, weeklyKillstreak, killstreakHistory, totalWorkoutDays, longestConsecutiveWeekStreak, ACHIEVEMENTS, achievementProgress } from '../js/lift-tracker/killstreak.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

function iso(y, m, d, h = 12) {
  return new Date(y, m - 1, d, h).toISOString();
}

// June 18 2026 is a Thursday; the Sun–Sat week containing it runs
// June 14 2026 (Sun) through June 20 2026 (Sat).
const THURSDAY = new Date(2026, 5, 18, 9);
const SUNDAY_THAT_WEEK = new Date(2026, 5, 14);

test('weekStart: Thursday resolves to that week\'s Sunday', () => {
  const start = weekStart(THURSDAY);
  if (start.getTime() !== SUNDAY_THAT_WEEK.getTime()) {
    throw new Error(`expected ${SUNDAY_THAT_WEEK} got ${start}`);
  }
});

test('weekStart: a Sunday resolves to itself', () => {
  const sunday = new Date(2026, 5, 14, 23, 59);
  const start = weekStart(sunday);
  if (start.getTime() !== SUNDAY_THAT_WEEK.getTime()) {
    throw new Error(`expected ${SUNDAY_THAT_WEEK} got ${start}`);
  }
});

test('weekStart: a Saturday resolves to the Sunday 6 days earlier', () => {
  const saturday = new Date(2026, 5, 20, 8); // June 20 2026 is the Saturday ending that week
  const start = weekStart(saturday);
  if (start.getTime() !== SUNDAY_THAT_WEEK.getTime()) {
    throw new Error(`expected ${SUNDAY_THAT_WEEK} got ${start}`);
  }
});

test('workoutDaysThisWeek: counts distinct calendar dates, not sets', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 15, 18) }, // same day as above — should not double count
    { performed_at: iso(2026, 6, 17, 7) },
  ];
  const days = workoutDaysThisWeek(sets, THURSDAY);
  if (days !== 2) throw new Error(`expected 2 got ${days}`);
});

test('workoutDaysThisWeek: ignores sets from a previous week', () => {
  const sets = [
    { performed_at: iso(2026, 6, 8, 9) }, // the Monday before this week (prior Sun–Sat week)
    { performed_at: iso(2026, 6, 17, 7) },
  ];
  const days = workoutDaysThisWeek(sets, THURSDAY);
  if (days !== 1) throw new Error(`expected 1 got ${days}`);
});

test('workoutDaysThisWeek: ignores sets from the upcoming week', () => {
  const sets = [
    { performed_at: iso(2026, 6, 17, 7) },
    { performed_at: iso(2026, 6, 21, 7) }, // next Sunday — outside this week
  ];
  const days = workoutDaysThisWeek(sets, THURSDAY);
  if (days !== 1) throw new Error(`expected 1 got ${days}`);
});

test('workoutDaysThisWeek: empty sets is 0 days', () => {
  const days = workoutDaysThisWeek([], THURSDAY);
  if (days !== 0) throw new Error(`expected 0 got ${days}`);
});

test('killstreakForDays: 0 days is no tier', () => {
  if (killstreakForDays(0) !== null) throw new Error('expected null');
});

test('killstreakForDays: 1 day is UAV', () => {
  const tier = killstreakForDays(1);
  if (tier?.key !== 'uav') throw new Error(`expected uav got ${tier?.key}`);
});

test('killstreakForDays: 2 days is Predator Missile', () => {
  const tier = killstreakForDays(2);
  if (tier?.key !== 'predator') throw new Error(`expected predator got ${tier?.key}`);
});

test('killstreakForDays: 3 days is Harrier Strike', () => {
  const tier = killstreakForDays(3);
  if (tier?.key !== 'harrier') throw new Error(`expected harrier got ${tier?.key}`);
});

test('killstreakForDays: 4 days is Chopper Gunner', () => {
  const tier = killstreakForDays(4);
  if (tier?.key !== 'chopper') throw new Error(`expected chopper got ${tier?.key}`);
});

test('killstreakForDays: 5+ days stays capped at Chopper Gunner', () => {
  const tier = killstreakForDays(7);
  if (tier?.key !== 'chopper') throw new Error(`expected chopper got ${tier?.key}`);
});

test('weeklyKillstreak: combines day count and tier', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 16, 9) },
    { performed_at: iso(2026, 6, 17, 9) },
  ];
  const result = weeklyKillstreak(sets, THURSDAY);
  if (result.days !== 3) throw new Error(`expected 3 days got ${result.days}`);
  if (result.tier?.key !== 'harrier') throw new Error(`expected harrier got ${result.tier?.key}`);
});

test('killstreakHistory: empty history is all zeros', () => {
  const counts = killstreakHistory([]);
  if (counts.uav !== 0 || counts.predator !== 0 || counts.harrier !== 0 || counts.chopper !== 0) {
    throw new Error(`expected all zeros got ${JSON.stringify(counts)}`);
  }
});

test('killstreakHistory: a week counts toward its single highest tier only', () => {
  // Same Sun-Sat week (June 14-20 2026) as THURSDAY's week, 3 distinct
  // workout days -- should tally one Harrier Strike, not also a UAV and
  // a Predator Missile along the way.
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 16, 9) },
    { performed_at: iso(2026, 6, 17, 9) },
  ];
  const counts = killstreakHistory(sets);
  if (counts.harrier !== 1) throw new Error(`expected 1 harrier got ${counts.harrier}`);
  if (counts.uav !== 0) throw new Error(`expected 0 uav got ${counts.uav}`);
  if (counts.predator !== 0) throw new Error(`expected 0 predator got ${counts.predator}`);
});

test('killstreakHistory: tallies separately across multiple distinct weeks', () => {
  const sets = [
    // Week of June 14 2026: 1 workout day -> UAV
    { performed_at: iso(2026, 6, 15, 9) },
    // Week of June 21 2026: 4 workout days -> Chopper Gunner
    { performed_at: iso(2026, 6, 22, 9) },
    { performed_at: iso(2026, 6, 23, 9) },
    { performed_at: iso(2026, 6, 24, 9) },
    { performed_at: iso(2026, 6, 25, 9) },
    // Week of June 28 2026: 2 workout days -> Predator Missile
    { performed_at: iso(2026, 6, 29, 9) },
    { performed_at: iso(2026, 6, 30, 9) },
  ];
  const counts = killstreakHistory(sets);
  if (counts.uav !== 1) throw new Error(`expected 1 uav got ${counts.uav}`);
  if (counts.predator !== 1) throw new Error(`expected 1 predator got ${counts.predator}`);
  if (counts.chopper !== 1) throw new Error(`expected 1 chopper got ${counts.chopper}`);
  if (counts.harrier !== 0) throw new Error(`expected 0 harrier got ${counts.harrier}`);
});

test('killstreakHistory: multiple sets on the same day in a week still count as one day toward that week\'s tier', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 15, 18) }, // same day as above
  ];
  const counts = killstreakHistory(sets);
  if (counts.uav !== 1) throw new Error(`expected 1 uav got ${counts.uav}`);
  if (counts.predator !== 0) throw new Error(`expected 0 predator got ${counts.predator}`);
});


test('totalWorkoutDays: empty sets is 0', () => {
  if (totalWorkoutDays([]) !== 0) throw new Error('expected 0');
});

test('totalWorkoutDays: counts distinct lifetime calendar dates, not sets, across multiple weeks', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 15, 18) }, // same day as above -- should not double count
    { performed_at: iso(2026, 6, 22, 9) }, // a different week entirely
  ];
  const total = totalWorkoutDays(sets);
  if (total !== 2) throw new Error(`expected 2 got ${total}`);
});

test('longestConsecutiveWeekStreak: empty sets is 0', () => {
  if (longestConsecutiveWeekStreak([]) !== 0) throw new Error('expected 0');
});

test('longestConsecutiveWeekStreak: a single workout week is a streak of 1', () => {
  const sets = [{ performed_at: iso(2026, 6, 15, 9) }];
  const streak = longestConsecutiveWeekStreak(sets);
  if (streak !== 1) throw new Error(`expected 1 got ${streak}`);
});

test('longestConsecutiveWeekStreak: 3 back-to-back Sun-Sat weeks is a streak of 3', () => {
  // June 14, 21, and 28 2026 are consecutive Sundays (confirmed via
  // datetime.date(...).strftime('%A')), so one workout day in each of
  // those weeks' Mondays is 3 unbroken consecutive weeks.
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) }, // week of June 14
    { performed_at: iso(2026, 6, 22, 9) }, // week of June 21
    { performed_at: iso(2026, 6, 29, 9) }, // week of June 28
  ];
  const streak = longestConsecutiveWeekStreak(sets);
  if (streak !== 3) throw new Error(`expected 3 got ${streak}`);
});

test('longestConsecutiveWeekStreak: a skipped week breaks the streak, and the longest run wins', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) }, // week of June 14 -- streak start
    { performed_at: iso(2026, 6, 22, 9) }, // week of June 21
    { performed_at: iso(2026, 6, 29, 9) }, // week of June 28 -- streak of 3 ends here
    // week of July 5 has no set -- gap
    { performed_at: iso(2026, 7, 13, 9) }, // week of July 12 -- isolated, streak of 1
  ];
  const streak = longestConsecutiveWeekStreak(sets);
  if (streak !== 3) throw new Error(`expected 3 (the earlier run, not extended by the isolated week) got ${streak}`);
});

// --- Achievement catalog: every threshold re-derived independently here
// (not copy-pasted from killstreak.js) so a transcription mistake in the
// catalog gets caught rather than just re-confirmed. ---

function makeStats({ totalDays = 0, tierCounts = {}, longestStreak = 0 } = {}) {
  return {
    totalDays,
    tierCounts: { uav: 0, predator: 0, harrier: 0, chopper: 0, ...tierCounts },
    longestStreak,
  };
}

function findAchievement(id) {
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  if (!a) throw new Error(`no achievement with id ${id}`);
  return a;
}

const RANK_THRESHOLDS = {
  'rank-private': 1,
  'rank-pfc': 3,
  'rank-corporal': 6,
  'rank-sergeant': 10,
  'rank-staff-sergeant': 15,
  'rank-master-sergeant': 21,
  'rank-warrant-officer': 28,
  'rank-lieutenant': 36,
  'rank-captain': 45,
  'rank-major': 55,
  'rank-colonel': 67,
  'rank-general': 80,
  'rank-prestige': 100,
  'rank-prestige-master': 150,
};

for (const [id, threshold] of Object.entries(RANK_THRESHOLDS)) {
  test(`achievement ${id}: locked at ${threshold - 1} days, unlocked at ${threshold} days`, () => {
    const a = findAchievement(id);
    if (a.isUnlocked(makeStats({ totalDays: threshold - 1 })) !== false) {
      throw new Error(`expected locked at ${threshold - 1} days`);
    }
    if (a.isUnlocked(makeStats({ totalDays: threshold })) !== true) {
      throw new Error(`expected unlocked at ${threshold} days`);
    }
  });
}

const MASTERY_THRESHOLDS = {
  'mastery-uav-1': ['uav', 3],
  'mastery-uav-2': ['uav', 10],
  'mastery-predator-1': ['predator', 3],
  'mastery-predator-2': ['predator', 10],
  'mastery-harrier-1': ['harrier', 5],
  'mastery-harrier-2': ['harrier', 15],
  'mastery-chopper-1': ['chopper', 1],
  'mastery-chopper-2': ['chopper', 5],
};

for (const [id, [tierKey, threshold]] of Object.entries(MASTERY_THRESHOLDS)) {
  test(`achievement ${id}: locked at ${threshold - 1}x ${tierKey}, unlocked at ${threshold}x`, () => {
    const a = findAchievement(id);
    const lockedStats = makeStats({ tierCounts: { [tierKey]: threshold - 1 } });
    const unlockedStats = makeStats({ tierCounts: { [tierKey]: threshold } });
    if (a.isUnlocked(lockedStats) !== false) {
      throw new Error(`expected locked at ${threshold - 1}x ${tierKey}`);
    }
    if (a.isUnlocked(unlockedStats) !== true) {
      throw new Error(`expected unlocked at ${threshold}x ${tierKey}`);
    }
  });
}

const STREAK_THRESHOLDS = {
  'streak-2': 2,
  'streak-3': 3,
  'streak-4': 4,
  'streak-5': 5,
  'streak-6': 6,
  'streak-8': 8,
};

for (const [id, threshold] of Object.entries(STREAK_THRESHOLDS)) {
  test(`achievement ${id}: locked at a ${threshold - 1}-week streak, unlocked at ${threshold}`, () => {
    const a = findAchievement(id);
    if (a.isUnlocked(makeStats({ longestStreak: threshold - 1 })) !== false) {
      throw new Error(`expected locked at streak ${threshold - 1}`);
    }
    if (a.isUnlocked(makeStats({ longestStreak: threshold })) !== true) {
      throw new Error(`expected unlocked at streak ${threshold}`);
    }
  });
}

test('achievement capstone-tactical-nuke: requires BOTH 80 days AND 5x chopper, not either alone', () => {
  const a = findAchievement('capstone-tactical-nuke');
  if (a.isUnlocked(makeStats({ totalDays: 80, tierCounts: { chopper: 4 } })) !== false) {
    throw new Error('expected locked with days met but chopper short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 79, tierCounts: { chopper: 5 } })) !== false) {
    throw new Error('expected locked with chopper met but days short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 80, tierCounts: { chopper: 5 } })) !== true) {
    throw new Error('expected unlocked when both conditions met');
  }
});

test('achievement capstone-moab: requires BOTH an 8-week streak AND 15x harrier', () => {
  const a = findAchievement('capstone-moab');
  if (a.isUnlocked(makeStats({ longestStreak: 8, tierCounts: { harrier: 14 } })) !== false) {
    throw new Error('expected locked with streak met but harrier short');
  }
  if (a.isUnlocked(makeStats({ longestStreak: 7, tierCounts: { harrier: 15 } })) !== false) {
    throw new Error('expected locked with harrier met but streak short');
  }
  if (a.isUnlocked(makeStats({ longestStreak: 8, tierCounts: { harrier: 15 } })) !== true) {
    throw new Error('expected unlocked when both conditions met');
  }
});

test('achievement capstone-dark-matter: requires BOTH 150 days AND 5x chopper', () => {
  const a = findAchievement('capstone-dark-matter');
  if (a.isUnlocked(makeStats({ totalDays: 150, tierCounts: { chopper: 4 } })) !== false) {
    throw new Error('expected locked with days met but chopper short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 149, tierCounts: { chopper: 5 } })) !== false) {
    throw new Error('expected locked with chopper met but days short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 150, tierCounts: { chopper: 5 } })) !== true) {
    throw new Error('expected unlocked when both conditions met');
  }
});

test('ACHIEVEMENTS: exactly 31 entries with unique ids across 4 tracks', () => {
  if (ACHIEVEMENTS.length !== 31) throw new Error(`expected 31 got ${ACHIEVEMENTS.length}`);
  const ids = ACHIEVEMENTS.map((a) => a.id);
  if (new Set(ids).size !== ids.length) throw new Error('duplicate id found');
  const tracks = new Set(ACHIEVEMENTS.map((a) => a.track));
  for (const t of ['rank', 'mastery', 'streak', 'capstone']) {
    if (!tracks.has(t)) throw new Error(`missing track ${t}`);
  }
});

test('achievementProgress: returns unlocked booleans (not functions) keyed by stats from the given sets', () => {
  const sets = [{ performed_at: iso(2026, 6, 15, 9) }]; // 1 workout day, 1-week streak, 1x uav
  const progress = achievementProgress(sets);
  if (progress.length !== ACHIEVEMENTS.length) throw new Error('expected one entry per achievement');
  const first = progress.find((p) => p.id === 'rank-private');
  if (first.unlocked !== true) throw new Error('expected rank-private unlocked with 1 workout day');
  const next = progress.find((p) => p.id === 'rank-pfc');
  if (next.unlocked !== false) throw new Error('expected rank-pfc locked with only 1 workout day');
});

console.log(`\n${passed} tests passed`);
