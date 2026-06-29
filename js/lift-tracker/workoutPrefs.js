// Shared persistence for the currently selected workout filter. The list
// view writes it when a workout pill is toggled; other views read it so
// they can reflect the same app-wide workout context.

export const ACTIVE_WORKOUT_STORAGE_KEY = 'lt-active-workout';

export function readStoredActiveWorkoutId() {
  // Safari private browsing (and similar locked-down modes) can throw on
  // localStorage access -- a missing preference should never break a view.
  try {
    return window.localStorage.getItem(ACTIVE_WORKOUT_STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function writeStoredActiveWorkoutId(id) {
  try {
    if (id) {
      window.localStorage.setItem(ACTIVE_WORKOUT_STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(ACTIVE_WORKOUT_STORAGE_KEY);
    }
  } catch {
    // Ignore -- the filter still works for the rest of this session, it
    // just won't be remembered next time.
  }
}

export function findStoredActiveWorkout(workouts) {
  const id = readStoredActiveWorkoutId();
  if (!id) return null;
  return workouts.find((workout) => workout.id === id) || null;
}
