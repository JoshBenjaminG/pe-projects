import {
  findLiftDictionaryEntry,
  normalizeLiftText,
  searchLiftDictionary,
} from '../js/lift-tracker/liftDictionary.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

test('normalizeLiftText: handles dumbell typo', () => {
  if (normalizeLiftText('dumbell row') !== 'dumbbell row') {
    throw new Error('expected dumbell to normalize to dumbbell');
  }
});

test('findLiftDictionaryEntry: matches existing Supabase lift aliases', () => {
  const row = findLiftDictionaryEntry('Rows');
  const warmup = findLiftDictionaryEntry('Squat Warmup');
  if (row?.key !== 'row') throw new Error(`expected row, got ${row?.key}`);
  if (warmup?.key !== 'squat') throw new Error(`expected squat, got ${warmup?.key}`);
});

test('searchLiftDictionary: returns close autocomplete matches', () => {
  const matches = searchLiftDictionary('lat raise');
  if (matches[0]?.key !== 'dumbbell-lateral-raise') {
    throw new Error(`expected lateral raise first, got ${matches[0]?.key}`);
  }
});

console.log(`\n${passed} tests passed`);

