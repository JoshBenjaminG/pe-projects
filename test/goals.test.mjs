import { evaluateGoal, parseGoalImport } from '../js/lift-tracker/goals.js';

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

function iso(y, m, d, h = 12) {
  return new Date(y, m - 1, d, h).toISOString();
}

const lifts = [
  { id: 'lift-a', name: 'dumbell chest press' },
  { id: 'lift-b', name: 'dumbell row' },
];
const workouts = [
  { id: 'workout-a', name: 'Workout A', liftIds: ['lift-a', 'lift-b'] },
];
const context = {
  lifts,
  workouts,
  liftsById: new Map(lifts.map((lift) => [lift.id, lift])),
  workoutsById: new Map(workouts.map((workout) => [workout.id, workout])),
  activeSets: [
    { lift_id: 'lift-a', weight: 30, reps: 18, performed_at: iso(2026, 7, 1) },
    { lift_id: 'lift-b', weight: 40, reps: 17, performed_at: iso(2026, 7, 1) },
  ],
  workoutHistorySets: [
    { lift_id: 'lift-a', weight: 30, reps: 10, performed_at: iso(2026, 6, 29) },
    { lift_id: 'lift-a', weight: 30, reps: 10, performed_at: iso(2026, 6, 30) },
    { lift_id: 'lift-a', weight: 30, reps: 10, performed_at: iso(2026, 7, 1) },
  ],
};

test('evaluateGoal: lift_set uses concrete set for completion', () => {
  const goal = {
    id: 'goal-1',
    title: 'Chest Press 35 x 10',
    type: 'lift_set',
    lift_id: 'lift-a',
    target_weight: 35,
    target_reps: 10,
  };
  const result = evaluateGoal(goal, context);
  if (result.achieved !== false) throw new Error('expected not achieved without 35 x 10');
  if (result.progress <= 0.8) throw new Error(`expected close progress, got ${result.progress}`);
});

test('evaluateGoal: lift_set completes when weight and reps both meet target', () => {
  const goal = {
    id: 'goal-1',
    title: 'Chest Press 30 x 18',
    type: 'lift_set',
    lift_id: 'lift-a',
    target_weight: 30,
    target_reps: 18,
  };
  const result = evaluateGoal(goal, context);
  if (result.achieved !== true) throw new Error('expected achieved');
  if (result.progress !== 1) throw new Error(`expected 1 got ${result.progress}`);
});

test('parseGoalImport: parses LLM-friendly YAML into normalized rows', () => {
  const text = `
goal_format: lift_tracker_goals_v1
goals:
  - title: Dumbbell Chest Press 35 x 10
    type: lift_set
    lift: dumbell chest press
    weight: 35
    reps: 10
    unit: lb
    timeframe_weeks: 4

  - title: Harrier Week
    type: weekly_workout_days
    target: 3
    recurring: weekly

  - title: Workout A Volume Base
    type: weekly_workout_volume
    workout: Workout A
    target: 18000
`;
  const parsed = parseGoalImport(text, { lifts, workouts });
  if (parsed.errors.length) throw new Error(`unexpected errors ${parsed.errors.join(', ')}`);
  if (parsed.goals.length !== 3) throw new Error(`expected 3 goals got ${parsed.goals.length}`);
  if (parsed.goals[0].lift_id !== 'lift-a') throw new Error('expected lift match');
  if (parsed.goals[2].workout_id !== 'workout-a') throw new Error('expected workout match');
});

test('parseGoalImport: reports missing lift names', () => {
  const parsed = parseGoalImport(`
goals:
  - title: Bench 135 x 5
    type: lift_set
    lift: bench press
    weight: 135
    reps: 5
`, { lifts, workouts });
  if (!parsed.errors.some((err) => err.includes('could not find lift'))) {
    throw new Error(`expected missing lift error got ${parsed.errors.join(', ')}`);
  }
});

console.log(`\n${passed} tests passed`);
