import { buildProgressionOptions } from '../js/lift-tracker/progression.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

function iso(y, m, d, h = 12) {
  return new Date(y, m - 1, d, h).toISOString();
}

test('buildProgressionOptions: no sets returns no options', () => {
  const result = buildProgressionOptions([]);
  if (result.baseline !== null) throw new Error('expected null baseline');
  if (result.options.length !== 0) throw new Error('expected no options');
});

test('buildProgressionOptions: uses best set from latest workout day', () => {
  const result = buildProgressionOptions([
    { weight: 40, reps: 12, performed_at: iso(2026, 7, 1, 10) },
    { weight: 35, reps: 12, performed_at: iso(2026, 7, 3, 10) },
    { weight: 45, reps: 8, performed_at: iso(2026, 7, 3, 10, 30) },
    { weight: 25, reps: 20, performed_at: iso(2026, 7, 3, 11) },
  ]);
  if (result.baseline.weight !== 45) throw new Error(`expected 45 got ${result.baseline.weight}`);
  if (result.baseline.reps !== 8) throw new Error(`expected 8 got ${result.baseline.reps}`);
});

test('buildProgressionOptions: creates reps weight and volume paths', () => {
  const result = buildProgressionOptions([
    { weight: 40, reps: 10, performed_at: iso(2026, 7, 3) },
  ]);
  const reps = result.options.find((option) => option.id === 'reps');
  const weight = result.options.find((option) => option.id === 'weight');
  const volume = result.options.find((option) => option.id === 'volume');
  if (reps.weight !== 40 || reps.reps !== 11) throw new Error('bad reps option');
  if (weight.weight !== 42.5 || weight.reps !== 8) throw new Error('bad weight option');
  if (volume.weight !== 40 || volume.reps !== 10) throw new Error('bad volume option');
});

console.log(`\n${passed} tests passed`);

