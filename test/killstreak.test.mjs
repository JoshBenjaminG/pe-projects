import { weekStart, workoutDaysThisWeek, killstreakForDays, weeklyKillstreak, killstreakHistory, totalWorkoutDays, totalWorkoutWeeks, longestConsecutiveWeekStreak, longestConsecutiveDayStreak, compositeMaxPct, bodyWeightChangeStats, MIN_SECRET_SETS, ACHIEVEMENTS, achievementProgress, achievementStats, newlyUnlockedIds } from '../js/lift-tracker/killstreak.js';

// Real Supabase auth user id grandfathered onto secret-one-wish-willow
// (see killstreak.js: FEEDBACK_GRANDFATHERED_USER_IDS) because he gave his
// feedback in person rather than through the in-app feedback modal. Any
// other id, or no id at all, must rely on the real hasSubmittedFeedback
// flag like everyone else.
const JOSHUA_USER_ID = '19bf3140-6738-496f-ac0c-20e316c4c3c0';
const MASON_USER_ID = '1445e5d7-276a-4fca-bb91-1c0a7ff44b65';

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

test('killstreakHistory: a week credits every tier reached', () => {
  // Same Sun-Sat week (June 14-20 2026) as THURSDAY's week, 3 distinct
  // workout days -- should tally one UAV, one Predator Missile, and one
  // Harrier Strike.
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 16, 9) },
    { performed_at: iso(2026, 6, 17, 9) },
  ];
  const counts = killstreakHistory(sets);
  if (counts.harrier !== 1) throw new Error(`expected 1 harrier got ${counts.harrier}`);
  if (counts.uav !== 1) throw new Error(`expected 1 uav got ${counts.uav}`);
  if (counts.predator !== 1) throw new Error(`expected 1 predator got ${counts.predator}`);
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
  if (counts.uav !== 3) throw new Error(`expected 3 uav got ${counts.uav}`);
  if (counts.predator !== 2) throw new Error(`expected 2 predator got ${counts.predator}`);
  if (counts.chopper !== 1) throw new Error(`expected 1 chopper got ${counts.chopper}`);
  if (counts.harrier !== 1) throw new Error(`expected 1 harrier got ${counts.harrier}`);
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


test('killstreakHistory: userId does not alter computed tier counts', () => {
  const sets = [{ performed_at: iso(2026, 6, 15, 9) }];
  const counts = killstreakHistory(sets, 'some-other-random-uuid');
  if (counts.uav !== 1 || counts.harrier !== 0) {
    throw new Error(`expected uav 1 / harrier 0 got ${JSON.stringify(counts)}`);
  }
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

test('totalWorkoutWeeks: counts distinct lifetime weeks, not sets or days', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 16, 9) }, // same Sun-Sat week as above
    { performed_at: iso(2026, 6, 22, 9) },
    { performed_at: iso(2026, 7, 13, 9) },
  ];
  const weeks = totalWorkoutWeeks(sets);
  if (weeks !== 3) throw new Error(`expected 3 got ${weeks}`);
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

test('longestConsecutiveDayStreak: empty sets is 0', () => {
  if (longestConsecutiveDayStreak([]) !== 0) throw new Error('expected 0');
});

test('longestConsecutiveDayStreak: a single workout day is a streak of 1', () => {
  const sets = [{ performed_at: iso(2026, 6, 15, 9) }];
  if (longestConsecutiveDayStreak(sets) !== 1) throw new Error('expected 1');
});

test('longestConsecutiveDayStreak: multiple sets on the same day still count as one day', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 15, 20) },
  ];
  if (longestConsecutiveDayStreak(sets) !== 1) throw new Error('expected 1');
});

test('longestConsecutiveDayStreak: 5 back-to-back calendar days is a streak of 5', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) },
    { performed_at: iso(2026, 6, 16, 9) },
    { performed_at: iso(2026, 6, 17, 9) },
    { performed_at: iso(2026, 6, 18, 9) },
    { performed_at: iso(2026, 6, 19, 9) },
  ];
  const streak = longestConsecutiveDayStreak(sets);
  if (streak !== 5) throw new Error(`expected 5 got ${streak}`);
});

test('longestConsecutiveDayStreak: a single skipped day breaks the streak, and the longest run wins', () => {
  const sets = [
    { performed_at: iso(2026, 6, 15, 9) }, // streak of 3 starts
    { performed_at: iso(2026, 6, 16, 9) },
    { performed_at: iso(2026, 6, 17, 9) }, // streak of 3 ends here
    // June 18 has no set -- gap
    { performed_at: iso(2026, 6, 19, 9) },
    { performed_at: iso(2026, 6, 20, 9) }, // isolated run of 2
  ];
  const streak = longestConsecutiveDayStreak(sets);
  if (streak !== 3) throw new Error(`expected 3 (the earlier run, not extended by the later one) got ${streak}`);
});

// --- Achievement catalog: every threshold re-derived independently here
// (not copy-pasted from killstreak.js) so a transcription mistake in the
// catalog gets caught rather than just re-confirmed. ---

function makeStats({ totalDays = 0, totalWeeks = 0, tierCounts = {}, longestStreak = 0, totalSets = 0, longestDayStreak = 0, compositeMaxPct = 0, bodyWeightGain = 0, bodyWeightLoss = 0, hasSubmittedFeedback = false } = {}) {
  return {
    totalDays,
    totalWeeks,
    tierCounts: { uav: 0, predator: 0, harrier: 0, chopper: 0, ...tierCounts },
    longestStreak,
    totalSets,
    longestDayStreak,
    compositeMaxPct,
    bodyWeightGain,
    bodyWeightLoss,
    hasSubmittedFeedback,
  };
}

function findAchievement(id) {
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  if (!a) throw new Error(`no achievement with id ${id}`);
  return a;
}

const RANK_THRESHOLDS = {
  'rank-private': 1,
  'rank-pfc': 2,
  'rank-corporal': 3,
  'rank-sergeant': 5,
  'rank-staff-sergeant': 7,
  'rank-master-sergeant': 9,
  'rank-warrant-officer': 11,
  'rank-lieutenant': 13,
  'rank-captain': 15,
  'rank-major': 18,
  'rank-colonel': 22,
  'rank-general': 27,
  'rank-prestige': 33,
  'rank-prestige-master': 40,
  'rank-prestige-grandmaster': 45,
  'rank-prestige-legend': 50,
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
  'mastery-chopper-2': ['chopper', 3],
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

test('achievement capstone-tactical-nuke: requires BOTH 27 days AND 3x chopper, not either alone', () => {
  const a = findAchievement('capstone-tactical-nuke');
  if (a.isUnlocked(makeStats({ totalDays: 27, tierCounts: { chopper: 2 } })) !== false) {
    throw new Error('expected locked with days met but chopper short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 26, tierCounts: { chopper: 3 } })) !== false) {
    throw new Error('expected locked with chopper met but days short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 27, tierCounts: { chopper: 3 } })) !== true) {
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

test('achievement capstone-dark-matter: requires BOTH 40 days AND 3x chopper', () => {
  const a = findAchievement('capstone-dark-matter');
  if (a.isUnlocked(makeStats({ totalDays: 40, tierCounts: { chopper: 2 } })) !== false) {
    throw new Error('expected locked with days met but chopper short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 39, tierCounts: { chopper: 3 } })) !== false) {
    throw new Error('expected locked with chopper met but days short');
  }
  if (a.isUnlocked(makeStats({ totalDays: 40, tierCounts: { chopper: 3 } })) !== true) {
    throw new Error('expected unlocked when both conditions met');
  }
});

test('achievement secret-clear-pill: locked below 12 workout weeks, unlocked at 12', () => {
  const a = findAchievement('secret-clear-pill');
  if (a.name !== 'Clear Pill') throw new Error(`expected Clear Pill, got ${a.name}`);
  if (a.description !== 'Log workouts in 12 different weeks.') {
    throw new Error(`unexpected condition text: ${a.description}`);
  }
  if (!a.flavor.includes('There is a quiet at the top of the Bridge')) {
    throw new Error('expected Clear Pill flavor text');
  }
  if (a.isUnlocked(makeStats({ totalWeeks: 11 })) !== false) {
    throw new Error('expected locked below 12 workout weeks');
  }
  if (a.isUnlocked(makeStats({ totalWeeks: 12 })) !== true) {
    throw new Error('expected unlocked at 12 workout weeks');
  }
});

test('compositeMaxPct: measures the highest all-lifts composite percentage', () => {
  const sets = [
    { lift_id: 'bench', weight: 100, reps: 10, performed_at: iso(2026, 6, 1, 9) },
    { lift_id: 'bench', weight: 120, reps: 10, performed_at: iso(2026, 6, 8, 9) },
    { lift_id: 'row', weight: 80, reps: 10, performed_at: iso(2026, 6, 1, 9) },
    { lift_id: 'row', weight: 96, reps: 10, performed_at: iso(2026, 6, 8, 9) },
  ];
  const pct = compositeMaxPct(sets);
  if (Math.abs(pct - 20) > 0.0001) {
    throw new Error(`expected max composite +20%, got ${pct}`);
  }
});

test('bodyWeightChangeStats: measures max gain and loss from the first logged body weight', () => {
  const entries = [
    { weight: 180, logged_at: iso(2026, 6, 1, 9), created_at: iso(2026, 6, 1, 9) },
    { weight: 171, logged_at: iso(2026, 6, 8, 9), created_at: iso(2026, 6, 8, 9) },
    { weight: 190, logged_at: iso(2026, 6, 15, 9), created_at: iso(2026, 6, 15, 9) },
  ];
  const stats = bodyWeightChangeStats(entries);
  if (stats.loss !== 9) throw new Error(`expected 9 lb loss, got ${stats.loss}`);
  if (stats.gain !== 10) throw new Error(`expected 10 lb gain, got ${stats.gain}`);
});

test('achievement secret-enlightenment: locked below 9 lb lost, unlocked at 9 lb lost', () => {
  const a = findAchievement('secret-enlightenment');
  if (a.name !== 'Enlightenment') throw new Error(`expected Enlightenment, got ${a.name}`);
  if (a.description !== 'Lose 9 pounds.') throw new Error(`unexpected condition text: ${a.description}`);
  if (!a.flavor.includes('bare flesh of the one who is free')) {
    throw new Error('expected Enlightenment flavor text');
  }
  if (a.isUnlocked(makeStats({ bodyWeightLoss: 8.99 })) !== false) {
    throw new Error('expected locked below 9 lb lost');
  }
  if (a.isUnlocked(makeStats({ bodyWeightLoss: 9 })) !== true) {
    throw new Error('expected unlocked at 9 lb lost');
  }
});

test('achievement secret-gamma-radiation: locked below 9 lb gained, unlocked at 9 lb gained', () => {
  const a = findAchievement('secret-gamma-radiation');
  if (a.name !== 'Gamma Radiation') throw new Error(`expected Gamma Radiation, got ${a.name}`);
  if (a.description !== 'Gain 9 pounds.') throw new Error(`unexpected condition text: ${a.description}`);
  if (!a.flavor.includes('I’m always angry')) {
    throw new Error('expected Gamma Radiation flavor text');
  }
  if (a.isUnlocked(makeStats({ bodyWeightGain: 8.99 })) !== false) {
    throw new Error('expected locked below 9 lb gained');
  }
  if (a.isUnlocked(makeStats({ bodyWeightGain: 9 })) !== true) {
    throw new Error('expected unlocked at 9 lb gained');
  }
});

test('achievementStats: body-weight entries feed gain/loss secret achievement stats', () => {
  const stats = achievementStats([], null, {
    bodyWeightEntries: [
      { weight: 180, logged_at: iso(2026, 6, 1, 9), created_at: iso(2026, 6, 1, 9) },
      { weight: 171, logged_at: iso(2026, 6, 8, 9), created_at: iso(2026, 6, 8, 9) },
      { weight: 190, logged_at: iso(2026, 6, 15, 9), created_at: iso(2026, 6, 15, 9) },
    ],
  });
  if (stats.bodyWeightLoss !== 9) throw new Error(`expected bodyWeightLoss 9, got ${stats.bodyWeightLoss}`);
  if (stats.bodyWeightGain !== 10) throw new Error(`expected bodyWeightGain 10, got ${stats.bodyWeightGain}`);
});

test('achievement secret-human-instrumentality: locked below 70 workout days, unlocked at 70 -- but only with enough total sets logged', () => {
  const a = findAchievement('secret-human-instrumentality');
  if (a.isUnlocked(makeStats({ totalDays: 69, totalSets: 200 })) !== false) {
    throw new Error('expected locked at 69 days');
  }
  if (a.isUnlocked(makeStats({ totalDays: 70, totalSets: 200 })) !== true) {
    throw new Error('expected unlocked at 70 days with plenty of total sets');
  }
  // 70 distinct days could in principle come from a single set per day --
  // the MIN_SECRET_SETS floor exists specifically to block that case.
  if (a.isUnlocked(makeStats({ totalDays: 70, totalSets: MIN_SECRET_SETS - 1 })) !== false) {
    throw new Error('expected locked when total sets is below the MIN_SECRET_SETS floor, even with 70 days met');
  }
});

test('achievement secret-one-wish-willow: locked without feedback, unlocked once feedback is submitted -- no MIN_SECRET_SETS floor', () => {
  const a = findAchievement('secret-one-wish-willow');
  if (a.isUnlocked(makeStats()) !== false) {
    throw new Error('expected locked with all-zero stats and no feedback');
  }
  if (a.isUnlocked(makeStats({ hasSubmittedFeedback: true })) !== true) {
    throw new Error('expected unlocked once feedback has been submitted');
  }
  // Unlike the rest of the secret track, this condition is a discrete
  // action rather than logged volume, so it must NOT require
  // MIN_SECRET_SETS -- a brand-new account with 0 sets that gives
  // feedback should still unlock it.
  if (a.isUnlocked(makeStats({ hasSubmittedFeedback: true, totalSets: 0 })) !== true) {
    throw new Error('expected unlocked with feedback submitted even at 0 total sets');
  }
  // Conversely, piling up unrelated stats must never substitute for
  // actually submitting feedback.
  if (a.isUnlocked(makeStats({ totalDays: 999, totalSets: 999, longestDayStreak: 999, longestStreak: 999 })) !== false) {
    throw new Error('expected locked regardless of other stats when feedback has not been submitted');
  }
});

test('achievementStats: hasSubmittedFeedback flag threads through from the options argument', () => {
  const sets = [];
  const withoutFeedback = achievementStats(sets);
  if (withoutFeedback.hasSubmittedFeedback !== false) {
    throw new Error('expected hasSubmittedFeedback false by default');
  }
  const withFeedback = achievementStats(sets, null, { hasSubmittedFeedback: true });
  if (withFeedback.hasSubmittedFeedback !== true) {
    throw new Error('expected hasSubmittedFeedback true when passed in options');
  }
});

test('achievementStats: an unrecognized userId does not grant feedback credit on its own', () => {
  const stats = achievementStats([], 'some-other-random-user-id');
  if (stats.hasSubmittedFeedback !== false) {
    throw new Error('expected hasSubmittedFeedback false for a non-grandfathered, non-feedback-submitting account');
  }
});

test('achievementStats: Joshua and Mason are grandfathered onto the feedback credit regardless of the real flag or other stats', () => {
  for (const userId of [JOSHUA_USER_ID, MASON_USER_ID]) {
    const stats = achievementStats([], userId);
    if (stats.hasSubmittedFeedback !== true) {
      throw new Error(`expected hasSubmittedFeedback true for grandfathered userId ${userId}`);
    }
  }
});

test('achievementProgress: threads the feedback option through the same way as achievementStats', () => {
  const sets = [];
  const withoutFeedback = achievementProgress(sets).find((a) => a.id === 'secret-one-wish-willow');
  const withFeedback = achievementProgress(sets, null, { hasSubmittedFeedback: true }).find((a) => a.id === 'secret-one-wish-willow');
  const withMason = achievementProgress(sets, MASON_USER_ID).find((a) => a.id === 'secret-one-wish-willow');
  if (withoutFeedback.unlocked !== false) throw new Error('expected locked with no feedback and no grandfathered userId');
  if (withFeedback.unlocked !== true) throw new Error('expected unlocked when hasSubmittedFeedback option is true');
  if (withMason.unlocked !== true) throw new Error("expected unlocked for Mason's grandfathered account");
});

test('every secret achievement defines non-empty flavor text; no achievement outside the secret track does', () => {
  const secrets = ACHIEVEMENTS.filter((a) => a.track === 'secret');
  if (secrets.length === 0) throw new Error('expected at least one secret achievement');
  for (const a of secrets) {
    if (typeof a.flavor !== 'string' || a.flavor.length === 0) {
      throw new Error(`expected ${a.id} to define non-empty flavor text`);
    }
  }
  const nonSecrets = ACHIEVEMENTS.filter((a) => a.track !== 'secret');
  if (nonSecrets.some((a) => a.flavor !== undefined)) {
    throw new Error('expected only secret-track achievements to define flavor');
  }
  const progress = achievementProgress([]);
  const willowCatalog = secrets.find((a) => a.id === 'secret-one-wish-willow');
  const willowProgress = progress.find((a) => a.id === 'secret-one-wish-willow');
  if (willowProgress.flavor !== willowCatalog.flavor) {
    throw new Error('expected achievementProgress to pass flavor text through unchanged');
  }
  const rankEntry = progress.find((a) => a.id === 'rank-pfc');
  if (rankEntry.flavor !== null) {
    throw new Error(`expected non-secret achievements to expose flavor: null, got ${JSON.stringify(rankEntry.flavor)}`);
  }
});

test('achievement secret-blue-pill: always unlocked, regardless of stats', () => {
  const a = findAchievement('secret-blue-pill');
  if (a.isUnlocked(makeStats()) !== true) {
    throw new Error('expected unlocked even with all-zero stats');
  }
  if (a.isUnlocked(makeStats({ totalDays: 999, totalSets: 999, longestDayStreak: 999, longestStreak: 999 })) !== true) {
    throw new Error('expected unlocked regardless of stats');
  }
});

test('achievement secret-red-pill: not awarded yet, locked regardless of stats', () => {
  const a = findAchievement('secret-red-pill');
  if (a.isUnlocked(makeStats()) !== false) {
    throw new Error('expected locked with all-zero stats');
  }
  if (a.isUnlocked(makeStats({ totalDays: 999, totalSets: 999, longestDayStreak: 999, longestStreak: 999 })) !== false) {
    throw new Error('expected locked regardless of stats -- not wired up to award anyone yet');
  }
});

test('secret achievements carry no theme, same as mastery/streak/capstone', () => {
  const secrets = ACHIEVEMENTS.filter((a) => a.track === 'secret');
  if (secrets.length === 0) throw new Error('expected at least one secret achievement');
  if (secrets.some((a) => a.theme !== undefined)) {
    throw new Error('expected secret achievements to define no theme');
  }
});

test('ACHIEVEMENTS: exactly 40 entries with unique ids across 5 tracks', () => {
  if (ACHIEVEMENTS.length !== 40) throw new Error(`expected 40 got ${ACHIEVEMENTS.length}`);
  const ids = ACHIEVEMENTS.map((a) => a.id);
  if (new Set(ids).size !== ids.length) throw new Error('duplicate id found');
  const tracks = new Set(ACHIEVEMENTS.map((a) => a.track));
  for (const t of ['rank', 'mastery', 'streak', 'capstone', 'secret']) {
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

// --- Rank themes: every rank carries a theme, lining up with the 15
// named CSS theme blocks plus the original "Lift Tracker" default ---

test('every rank achievement has a theme with a non-empty id and label', () => {
  const ranks = ACHIEVEMENTS.filter((a) => a.track === 'rank');
  for (const r of ranks) {
    if (!r.theme || typeof r.theme.id !== 'string' || r.theme.id.length === 0) {
      throw new Error(`rank ${r.id} is missing a theme id`);
    }
    if (typeof r.theme.label !== 'string' || r.theme.label.length === 0) {
      throw new Error(`rank ${r.id} is missing a theme label`);
    }
  }
});

test('rank theme ids are unique across the rank track (no two ranks share a theme)', () => {
  const ranks = ACHIEVEMENTS.filter((a) => a.track === 'rank');
  const themeIds = ranks.map((r) => r.theme.id);
  if (new Set(themeIds).size !== themeIds.length) {
    throw new Error('duplicate theme id found across rank achievements');
  }
});

test('rank-private is the only rank with the "default" theme, named Lift Tracker', () => {
  const private_ = ACHIEVEMENTS.find((a) => a.id === 'rank-private');
  if (private_.theme.id !== 'default' || private_.theme.label !== 'Lift Tracker') {
    throw new Error(`expected rank-private theme {default, Lift Tracker}, got ${JSON.stringify(private_.theme)}`);
  }
  const others = ACHIEVEMENTS.filter((a) => a.track === 'rank' && a.id !== 'rank-private');
  if (others.some((a) => a.theme.id === 'default')) {
    throw new Error('expected only rank-private to use the default theme');
  }
});

test('non-rank achievements (mastery/streak/capstone) carry no theme', () => {
  const nonRanks = ACHIEVEMENTS.filter((a) => a.track !== 'rank');
  if (nonRanks.some((a) => a.theme !== undefined)) {
    throw new Error('expected only rank achievements to define a theme');
  }
});

test('achievementProgress: rank entries expose their theme, non-rank entries expose null', () => {
  const progress = achievementProgress([]);
  const rankEntry = progress.find((p) => p.id === 'rank-pfc');
  if (!rankEntry.theme || rankEntry.theme.id !== 'agile') {
    throw new Error(`expected rank-pfc theme id "agile", got ${JSON.stringify(rankEntry.theme)}`);
  }
  const nonRankEntry = progress.find((p) => p.id === 'mastery-uav-1');
  if (nonRankEntry.theme !== null) {
    throw new Error(`expected non-rank theme to be null, got ${JSON.stringify(nonRankEntry.theme)}`);
  }
});

// --- newlyUnlockedIds ---

test('newlyUnlockedIds: returns unlocked ids not present in seenIds', () => {
  const progress = [
    { id: 'a', unlocked: true },
    { id: 'b', unlocked: false },
    { id: 'c', unlocked: true },
  ];
  const result = newlyUnlockedIds(progress, ['a']);
  if (result.length !== 1 || result[0] !== 'c') {
    throw new Error(`expected ["c"], got ${JSON.stringify(result)}`);
  }
});

test('newlyUnlockedIds: returns empty array when everything unlocked has already been seen', () => {
  const progress = [
    { id: 'a', unlocked: true },
    { id: 'b', unlocked: true },
  ];
  const result = newlyUnlockedIds(progress, ['a', 'b']);
  if (result.length !== 0) throw new Error(`expected [], got ${JSON.stringify(result)}`);
});

test('newlyUnlockedIds: never returns a locked id, even if it is absent from seenIds', () => {
  const progress = [{ id: 'a', unlocked: false }];
  const result = newlyUnlockedIds(progress, []);
  if (result.length !== 0) throw new Error(`expected [], got ${JSON.stringify(result)}`);
});

test('newlyUnlockedIds: empty seenIds treats every unlocked id as new', () => {
  const progress = [
    { id: 'a', unlocked: true },
    { id: 'b', unlocked: true },
  ];
  const result = newlyUnlockedIds(progress, []);
  if (result.length !== 2 || !result.includes('a') || !result.includes('b')) {
    throw new Error(`expected ["a","b"] in some order, got ${JSON.stringify(result)}`);
  }
});

console.log(`\n${passed} tests passed`);
