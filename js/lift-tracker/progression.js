import { calcE1RM, sessionVolume, toDateKey } from './math.js';

const DEFAULT_WEIGHT_STEP = 2.5;

function formatWeight(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);
}

function roundToHalf(value) {
  return Math.round(Number(value) * 2) / 2;
}

function sortByPerformedAt(sets) {
  return sets.slice().sort((a, b) => new Date(a.performed_at) - new Date(b.performed_at));
}

function bestSetByE1RM(sets) {
  return sets.reduce((best, set) => {
    if (!best) return set;
    const bestE1RM = calcE1RM(Number(best.weight), Number(best.reps));
    const setE1RM = calcE1RM(Number(set.weight), Number(set.reps));
    return setE1RM > bestE1RM ? set : best;
  }, null);
}

function sessionGroups(sets) {
  const groups = new Map();
  for (const set of sortByPerformedAt(sets)) {
    const key = toDateKey(set.performed_at);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(set);
  }
  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export function buildProgressionOptions(sets, { weightStep = DEFAULT_WEIGHT_STEP } = {}) {
  const sessions = sessionGroups(sets || []);
  const latestSession = sessions[sessions.length - 1];
  if (!latestSession) {
    return {
      baseline: null,
      context: null,
      options: [],
    };
  }

  const [date, latestSets] = latestSession;
  const previousSession = sessions[sessions.length - 2] || null;
  const baseline = bestSetByE1RM(latestSets);
  const weight = Number(baseline.weight);
  const reps = Number(baseline.reps);
  const nextWeight = roundToHalf(weight + weightStep);
  const weightReps = Math.max(1, reps - 2);

  const context = {
    date,
    latestVolume: sessionVolume(latestSets),
    previousVolume: previousSession ? sessionVolume(previousSession[1]) : null,
    sessionSetCount: latestSets.length,
  };

  return {
    baseline: {
      weight,
      reps,
      e1rm: calcE1RM(weight, reps),
      label: `${formatWeight(weight)} lb x ${reps}`,
      date,
    },
    context,
    options: [
      {
        id: 'reps',
        label: 'Add reps',
        title: `${formatWeight(weight)} lb x ${reps + 1}`,
        description: 'Same weight, one more rep.',
        weight,
        reps: reps + 1,
      },
      {
        id: 'weight',
        label: 'Add weight',
        title: `${formatWeight(nextWeight)} lb x ${weightReps}`,
        description: 'A heavier set with a small rep drop.',
        weight: nextWeight,
        reps: weightReps,
      },
      {
        id: 'volume',
        label: 'Add volume',
        title: `Extra set: ${formatWeight(weight)} lb x ${reps}`,
        description: 'Repeat your best recent set to raise session volume.',
        weight,
        reps,
      },
    ],
  };
}

