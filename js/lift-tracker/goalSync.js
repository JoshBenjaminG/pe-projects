import {
  createGoalEvents,
  getCurrentUserId,
  hasSubmittedFeedback,
  listActiveSetsForLifts,
  listGoalEvents,
  listGoals,
  listLifts,
  listWeightEntries,
  listWorkoutHistorySets,
  listWorkouts,
  updateGoal,
} from './api.js';
import {
  achievementMomentumItems,
  buildMomentum,
  evaluateGoals,
  eventsForEvaluations,
} from './goals.js';
import { showNoticeToast } from './toast.js';

export async function loadGoalContext() {
  const [lifts, workouts, workoutHistorySets, goals, events, bodyWeightEntries, userId, feedbackGiven] =
    await Promise.all([
      listLifts(),
      listWorkouts(),
      listWorkoutHistorySets(),
      listGoals(),
      listGoalEvents(),
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
    goals,
    events,
    bodyWeightEntries,
    userId,
    feedbackGiven,
    liftsById: new Map(lifts.map((lift) => [lift.id, lift])),
    workoutsById: new Map(workouts.map((workout) => [workout.id, workout])),
  };
}

export function evaluateGoalContext(context) {
  const goalEvaluations = evaluateGoals(context.goals, context);
  const achievementItems = achievementMomentumItems(context.workoutHistorySets, context.userId, {
    bodyWeightEntries: context.bodyWeightEntries,
    hasSubmittedFeedback: context.feedbackGiven,
  });
  const momentum = buildMomentum({
    goalEvaluations,
    achievementItems,
    events: context.events,
  });
  return { goalEvaluations, achievementItems, momentum };
}

export async function syncGoalEvents({ showToasts = false } = {}) {
  const context = await loadGoalContext();
  const evaluated = evaluateGoalContext(context);
  const newEvents = eventsForEvaluations(
    [...evaluated.goalEvaluations, ...evaluated.achievementItems],
    context.events
  );
  const created = await createGoalEvents(newEvents);

  await Promise.all(
    evaluated.goalEvaluations
      .filter((item) =>
        item.achieved &&
        item.goal.status === 'active' &&
        item.goal.recurring !== 'weekly'
      )
      .map((item) => updateGoal(item.goal.id, {
        status: 'achieved',
        achieved_at: new Date().toISOString(),
      }))
  );

  if (showToasts && created.length > 0) {
    const achieved = created.find((event) => event.event_type === 'achieved');
    const close = created.find((event) => event.event_type === 'close');
    const event = achieved || close;
    if (event) showNoticeToast(event.message || event.title);
  }

  return { context, ...evaluated, createdEvents: created };
}
