import assert from 'node:assert/strict';
import { buildExportText, exportWindowStart, EXPORT_WINDOW_DAYS } from '../js/lift-tracker/export.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`ok - ${name}`);
}

test('exportWindowStart: subtracts EXPORT_WINDOW_DAYS days', () => {
  const now = new Date('2026-06-19T12:00:00Z');
  const start = exportWindowStart(now);
  const diffDays = (now - start) / (1000 * 60 * 60 * 24);
  assert.equal(EXPORT_WINDOW_DAYS, 60);
  assert.equal(diffDays, 60);
});

test('buildExportText: no lifts -> empty-period message', () => {
  const text = buildExportText([], new Map(), new Date('2026-06-19T12:00:00Z'));
  assert.equal(text, 'Lift Tracker — last 60 days (as of 2026-06-19)\n\nNo sets logged in this period.');
});

test('buildExportText: lifts present but none have sets -> empty-period message', () => {
  const lifts = [{ id: 'a', name: 'Bench' }, { id: 'b', name: 'Squat' }];
  const setsByLift = new Map([['a', []], ['b', []]]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  assert.ok(text.endsWith('No sets logged in this period.'));
});

test('buildExportText: single lift, single set — exact math check', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  // e1RM = 100 * (1 + 5/30) = 116.666... -> rounds to 117
  // volume = 100*5 = 500
  const expected = [
    'Lift Tracker — last 60 days (as of 2026-06-19)',
    '',
    'Bench',
    '  2026-06-10: 100 lb x 5 (e1RM 117)',
    '  Sets: 1 | Volume: 500 lb | Best e1RM: 117',
  ].join('\n');
  assert.equal(text, expected);
});

test('buildExportText: multiple sets out of order get sorted ascending by date, volume and best e1RM correct', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [
      { weight: 110, reps: 3, performed_at: '2026-06-15T12:00:00Z' }, // e1RM = 110*1.1 = 121
      { weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }, // e1RM = 116.667 -> 117
    ]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  const lines = text.split('\n');
  // earliest set should appear first despite being second in the input array
  assert.equal(lines[3], '  2026-06-10: 100 lb x 5 (e1RM 117)');
  assert.equal(lines[4], '  2026-06-15: 110 lb x 3 (e1RM 121)');
  // volume = 500 + 330 = 830; best e1RM = max(117 unrounded 116.67, 121) = 121
  assert.equal(lines[5], '  Sets: 2 | Volume: 830 lb | Best e1RM: 121');
});

test('buildExportText: lift with no recent sets is omitted, with a trailing note', () => {
  const lifts = [{ id: 'a', name: 'Bench' }, { id: 'b', name: 'Squat' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
    ['b', []],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  assert.ok(!text.includes('Squat'));
  assert.ok(text.endsWith('(1 lift with no sets in this period omitted)'));
});

test('buildExportText: multiple omitted lifts use plural wording', () => {
  const lifts = [{ id: 'a', name: 'Bench' }, { id: 'b', name: 'Squat' }, { id: 'c', name: 'Deadlift' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
    ['b', []],
    ['c', []],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  assert.ok(text.endsWith('(2 lifts with no sets in this period omitted)'));
});

test('buildExportText: windowLabel overrides the default "last N days" header', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), 'all-time');
  assert.ok(text.startsWith('Lift Tracker — all-time (as of 2026-06-19)'));
});

test('buildExportText: no weightSeries passed -> no "Body weight" section at all', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  assert.ok(!text.includes('Body weight'));
});

test('buildExportText: empty weightSeries array -> no "Body weight" section', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, []);
  assert.ok(!text.includes('Body weight'));
});

test('buildExportText: weightSeries appends a "Body weight" section after the lift blocks', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const weightSeries = [
    { date: '2026-05-01', weight: 180 },
    { date: '2026-06-01', weight: 175.5 },
  ];
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, weightSeries);
  const expected = [
    'Lift Tracker — last 60 days (as of 2026-06-19)',
    '',
    'Bench',
    '  2026-06-10: 100 lb x 5 (e1RM 117)',
    '  Sets: 1 | Volume: 500 lb | Best e1RM: 117',
    '',
    'Body weight',
    '  2026-05-01: 180 lb',
    '  2026-06-01: 175.5 lb',
    '  Start: 180 lb | Current: 175.5 lb | Change: -4.5 lb',
  ].join('\n');
  assert.equal(text, expected);
});

test('buildExportText: weight gain shows a "+" sign on the change line', () => {
  const lifts = [];
  const setsByLift = new Map();
  const weightSeries = [
    { date: '2026-05-01', weight: 170 },
    { date: '2026-06-01', weight: 172.25 },
  ];
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, weightSeries);
  assert.ok(text.endsWith('Start: 170 lb | Current: 172.3 lb | Change: +2.3 lb'));
});

test('buildExportText: single weight entry -> change is exactly 0, no sign', () => {
  const weightSeries = [{ date: '2026-06-01', weight: 175 }];
  const text = buildExportText([], new Map(), new Date('2026-06-19T12:00:00Z'), undefined, weightSeries);
  assert.ok(text.endsWith('Start: 175 lb | Current: 175 lb | Change: 0 lb'));
});

test('buildExportText: no active lifts but weight data present -> both the empty-period note and the weight section appear', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([['a', []]]);
  const weightSeries = [{ date: '2026-06-01', weight: 175 }];
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, weightSeries);
  const expected = [
    'Lift Tracker — last 60 days (as of 2026-06-19)',
    '',
    'No sets logged in this period.',
    '',
    'Body weight',
    '  2026-06-01: 175 lb',
    '  Start: 175 lb | Current: 175 lb | Change: 0 lb',
  ].join('\n');
  assert.equal(text, expected);
});

test('buildExportText: no waistSeries passed -> no "Waist" section at all', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'));
  assert.ok(!text.includes('Waist'));
});

test('buildExportText: empty waistSeries array -> no "Waist" section', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, [], []);
  assert.ok(!text.includes('Waist'));
});

test('buildExportText: waistSeries appends a "Waist" section after the Body weight section', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const weightSeries = [
    { date: '2026-05-01', weight: 180 },
    { date: '2026-06-01', weight: 175.5 },
  ];
  const waistSeries = [
    { date: '2026-05-01', waist: 36 },
    { date: '2026-06-01', waist: 34.5 },
  ];
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, weightSeries, waistSeries);
  const expected = [
    'Lift Tracker — last 60 days (as of 2026-06-19)',
    '',
    'Bench',
    '  2026-06-10: 100 lb x 5 (e1RM 117)',
    '  Sets: 1 | Volume: 500 lb | Best e1RM: 117',
    '',
    'Body weight',
    '  2026-05-01: 180 lb',
    '  2026-06-01: 175.5 lb',
    '  Start: 180 lb | Current: 175.5 lb | Change: -4.5 lb',
    '',
    'Waist',
    '  2026-05-01: 36 in',
    '  2026-06-01: 34.5 in',
    '  Start: 36 in | Current: 34.5 in | Change: -1.5 in',
  ].join('\n');
  assert.equal(text, expected);
});

test('buildExportText: waistSeries works with no weightSeries -> "Waist" section directly after lift blocks', () => {
  const lifts = [{ id: 'a', name: 'Bench' }];
  const setsByLift = new Map([
    ['a', [{ weight: 100, reps: 5, performed_at: '2026-06-10T12:00:00Z' }]],
  ]);
  const waistSeries = [{ date: '2026-06-01', waist: 35 }];
  const text = buildExportText(lifts, setsByLift, new Date('2026-06-19T12:00:00Z'), undefined, [], waistSeries);
  const expected = [
    'Lift Tracker — last 60 days (as of 2026-06-19)',
    '',
    'Bench',
    '  2026-06-10: 100 lb x 5 (e1RM 117)',
    '  Sets: 1 | Volume: 500 lb | Best e1RM: 117',
    '',
    'Waist',
    '  2026-06-01: 35 in',
    '  Start: 35 in | Current: 35 in | Change: 0 in',
  ].join('\n');
  assert.equal(text, expected);
});

test('buildExportText: waist gain shows a "+" sign on the change line', () => {
  const waistSeries = [
    { date: '2026-05-01', waist: 32 },
    { date: '2026-06-01', waist: 33.25 },
  ];
  const text = buildExportText([], new Map(), new Date('2026-06-19T12:00:00Z'), undefined, [], waistSeries);
  assert.ok(text.endsWith('Start: 32 in | Current: 33.3 in | Change: +1.3 in'));
});

test('buildExportText: single waist entry -> change is exactly 0, no sign', () => {
  const waistSeries = [{ date: '2026-06-01', waist: 35 }];
  const text = buildExportText([], new Map(), new Date('2026-06-19T12:00:00Z'), undefined, [], waistSeries);
  assert.ok(text.endsWith('Start: 35 in | Current: 35 in | Change: 0 in'));
});

console.log(`\n${passed} tests passed`);
