import { weekStart, workoutDaysThisWeek, killstreakForDays, weeklyKillstreak, killstreakHistory } from '../js/lift-tracker/killstreak.js';

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

console.log(`\n${passed} tests passed`);
