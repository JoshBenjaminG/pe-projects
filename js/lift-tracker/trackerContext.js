import {
  getCurrentUserId,
  hasSubmittedFeedback,
  listActiveSetsForLifts,
  listLifts,
  listWeightEntries,
  listWorkoutHistorySets,
  listWorkouts,
} from './api.js';
import {
  achievementMomentumItems,
  buildMomentum,
} from './achievementMomentum.js';

export async function loadTrackerContext() {
  const [lifts, workouts, workoutHistorySets, bodyWeightEntries, userId, feedbackGiven] =
    await Promise.all([
      listLifts(),
      listWorkouts(),
      listWorkoutHistorySets(),
      listWeightEntries(),
      getCurrentUserId(),
      hasSubmittedFeedback(),
    ]);

  const activeSets = lifts.length ? await listActiveSetsForLifts(lifts.map((lift) => lift.id)) : [];
  return {
    lifts,
    workouts,
    workoutHistorySets,
    activeSets,
    events: [],
    bodyWeightEntries,
    userId,
    feedbackGiven,
    liftsById: new Map(lifts.map((lift) => [lift.id, lift])),
    workoutsById: new Map(workouts.map((workout) => [workout.id, workout])),
  };
}

export function evaluateTrackerContext(context) {
  const achievementItems = achievementMomentumItems(context.workoutHistorySets, context.userId, {
    bodyWeightEntries: context.bodyWeightEntries,
    hasSubmittedFeedback: context.feedbackGiven,
  });
  const momentum = buildMomentum({
    achievementItems,
    events: context.events,
  });
  return { achievementItems, momentum };
}
