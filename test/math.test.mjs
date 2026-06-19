import assert from 'node:assert/strict';
import {
  calcE1RM,
  toDateKey,
  dailyMaxE1RM,
  computeComposite,
  isNewPR,
  sessionVolume,
  formatPct,
} from '../js/lift-tracker/math.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`ok - ${name}`);
}

// --- calcE1RM ---
test('calcE1RM: 100x1 -> 103.33 (Epley with reps=1 still adds 1/30)', () => {
  assert.ok(Math.abs(calcE1RM(100, 1) - 103.333333) < 1e-4);
});
test('calcE1RM: 110x3 -> 121 (within float tolerance)', () => {
  assert.ok(Math.abs(calcE1RM(110, 3) - 121) < 1e-9);
});
test('calcE1RM: 60x8 -> 76 (within float tolerance)', () => {
  assert.ok(Math.abs(calcE1RM(60, 8) - 76) < 1e-9);
});
test('calcE1RM: 90x10 -> 120 (within float tolerance)', () => {
  assert.ok(Math.abs(calcE1RM(90, 10) - 120) < 1e-9);
});

// --- toDateKey ---
test('toDateKey: ISO UTC midnight -> local calendar date', () => {
  // sandbox runs UTC, so this also pins down the UTC behavior explicitly
  assert.equal(toDateKey('2026-01-01T08:00:00Z'), '2026-01-01');
});

// --- dailyMaxE1RM ---
test('dailyMaxE1RM: groups by date, keeps max e1RM per date, sorted ascending', () => {
  const sets = [
    { id: 'a', weight: 100, reps: 5, performed_at: '2026-01-01T08:00:00Z' }, // e1RM 116.67
    { id: 'b', weight: 110, reps: 3, performed_at: '2026-01-01T09:00:00Z' }, // e1RM 121 (max for the day)
    { id: 'c', weight: 90, reps: 10, performed_at: '2026-01-02T08:00:00Z' }, // e1RM 120
  ];
  const series = dailyMaxE1RM(sets);
  assert.equal(series.length, 2);
  assert.equal(series[0].date, '2026-01-01');
  assert.ok(Math.abs(series[0].e1rm - 121) < 1e-9);
  assert.equal(series[0].setId, 'b');
  assert.equal(series[1].date, '2026-01-02');
  assert.ok(Math.abs(series[1].e1rm - 120) < 1e-9);
});
test('dailyMaxE1RM: empty input -> empty output', () => {
  assert.deepEqual(dailyMaxE1RM([]), []);
});

// --- computeComposite ---
test('computeComposite: two lifts, hand-verified ratios at each date', () => {
  // Lift A: baseline 100 (01-01), then 110 (01-08) -> ratio 1.1 from 01-08
  // Lift B: baseline 200 (01-03), then 190 (01-08) -> ratio 0.95 from 01-08
  const liftsData = [
    { liftId: 'A', dailySeries: [
      { date: '2026-01-01', e1rm: 100 },
      { date: '2026-01-08', e1rm: 110 },
    ]},
    { liftId: 'B', dailySeries: [
      { date: '2026-01-03', e1rm: 200 },
      { date: '2026-01-08', e1rm: 190 },
    ]},
  ];
  const points = computeComposite(liftsData);
  assert.equal(points.length, 3);

  // 01-01: only A has a qualifying date -> ratio 100/100 = 1.0
  assert.equal(points[0].date, '2026-01-01');
  assert.ok(Math.abs(points[0].ratio - 1.0) < 1e-9);
  assert.ok(Math.abs(points[0].pct - 0) < 1e-9);

  // 01-03: A still at its 01-01 value (100/100=1.0), B at its 01-03 value (200/200=1.0) -> avg 1.0
  assert.equal(points[1].date, '2026-01-03');
  assert.ok(Math.abs(points[1].ratio - 1.0) < 1e-9);

  // 01-08: A=110/100=1.1, B=190/200=0.95 -> avg 1.025 -> +2.5%
  assert.equal(points[2].date, '2026-01-08');
  assert.ok(Math.abs(points[2].ratio - 1.025) < 1e-9);
  assert.ok(Math.abs(points[2].pct - 2.5) < 1e-9);
});

test('computeComposite: lift with a single entry contributes ratio 1.0 (neutral)', () => {
  const liftsData = [{ liftId: 'C', dailySeries: [{ date: '2026-02-01', e1rm: 50 }] }];
  const points = computeComposite(liftsData);
  assert.equal(points.length, 1);
  assert.equal(points[0].ratio, 1.0);
  assert.equal(points[0].pct, 0);
});

test('computeComposite: all lifts with one entry each -> flat 0% line', () => {
  const liftsData = [
    { liftId: 'C', dailySeries: [{ date: '2026-02-01', e1rm: 50 }] },
    { liftId: 'D', dailySeries: [{ date: '2026-02-05', e1rm: 80 }] },
  ];
  const points = computeComposite(liftsData);
  assert.equal(points.length, 2);
  for (const p of points) {
    assert.ok(Math.abs(p.pct - 0) < 1e-9);
  }
});

test('computeComposite: new lift only enters the average from its first workout date', () => {
  const liftsData = [
    { liftId: 'A', dailySeries: [{ date: '2026-01-01', e1rm: 100 }] },
    { liftId: 'E', dailySeries: [{ date: '2026-03-01', e1rm: 40 }] },
  ];
  const points = computeComposite(liftsData);
  // before E exists, only A counts
  const jan1 = points.find((p) => p.date === '2026-01-01');
  assert.equal(jan1.ratio, 1.0);
  // both lifts present from 03-01 onward
  const mar1 = points.find((p) => p.date === '2026-03-01');
  assert.ok(Math.abs(mar1.ratio - 1.0) < 1e-9); // both still at their own baseline = 1.0 each
});

test('computeComposite: no lifts -> empty array (caller hides the chart)', () => {
  assert.deepEqual(computeComposite([]), []);
});

// --- isNewPR ---
test('isNewPR: no prior sets -> not a PR (nothing to beat yet)', () => {
  assert.equal(isNewPR(120, []), false);
});
test('isNewPR: beats prior max -> true', () => {
  const prior = [{ weight: 100, reps: 5 }]; // e1RM 116.67
  assert.equal(isNewPR(120, prior), true);
});
test('isNewPR: does not beat prior max -> false', () => {
  const prior = [{ weight: 110, reps: 5 }]; // e1RM 128.33
  assert.equal(isNewPR(120, prior), false);
});

// --- sessionVolume ---
test('sessionVolume: sums weight*reps across sets', () => {
  const sets = [{ weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 110, reps: 3 }];
  assert.equal(sessionVolume(sets), 100 * 5 + 100 * 5 + 110 * 3);
});

// --- formatPct ---
test('formatPct: 0 -> "0%"', () => assert.equal(formatPct(0), '0%'));
test('formatPct: 15 -> "+15%"', () => assert.equal(formatPct(15), '+15%'));
test('formatPct: -5 -> "−5%" (minus sign, not hyphen)', () => assert.equal(formatPct(-5), '−5%'));

console.log(`\n${passed} tests passed`);
