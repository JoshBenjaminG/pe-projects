// Tiny hash-based router. The whole feature is one PHP page (workout.php);
// "list" vs "lift detail" is just two render functions swapped based on
// location.hash, so PHP never has to route or touch the database.

export function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash.startsWith('lift/')) {
    return { name: 'detail', liftId: hash.slice('lift/'.length) };
  }
  if (hash === 'workout/new') {
    return { name: 'workout-new' };
  }
  const workoutEditMatch = hash.match(/^workout\/([^/]+)\/edit$/);
  if (workoutEditMatch) {
    return { name: 'workout-edit', workoutId: workoutEditMatch[1] };
  }
  if (hash === 'help') {
    return { name: 'help' };
  }
  if (hash === 'weight') {
    return { name: 'weight', tab: 'weight' };
  }
  if (hash === 'weight/food') {
    return { name: 'weight', tab: 'food' };
  }
  if (hash === 'composite') {
    return { name: 'composite' };
  }
  if (hash === 'history') {
    return { name: 'history' };
  }
  if (hash === 'killstreak') {
    return { name: 'killstreak' };
  }
  if (hash === 'prs' || hash === 'goals') {
    return { name: 'prs' };
  }
  return { name: 'list' };
}

export function goToList() {
  window.location.hash = '#/';
}

export function goToLift(liftId) {
  window.location.hash = `#/lift/${liftId}`;
}

export function goToWorkoutNew() {
  window.location.hash = '#/workout/new';
}

export function goToWorkoutEdit(workoutId) {
  window.location.hash = `#/workout/${workoutId}/edit`;
}

export function goToHelp() {
  window.location.hash = '#/help';
}

export function goToWeight() {
  window.location.hash = '#/weight';
}

export function goToCalories() {
  window.location.hash = '#/weight/food';
}

export function goToComposite() {
  window.location.hash = '#/composite';
}

export function goToHistory() {
  window.location.hash = '#/history';
}

export function goToKillstreak() {
  window.location.hash = '#/killstreak';
}

export function goToPRs() {
  window.location.hash = '#/prs';
}

// Forces whatever view is currently mounted to re-fetch and re-render,
// without changing the route. Used after an undo that happens on a
// different page than the one the original action was taken on (e.g.
// deleting a lift from its detail page navigates back to the list before
// the undo toast's timer expires -- if Undo is tapped there, the list
// needs to pick up the restored lift even though the hash never changed).
export function refreshView() {
  window.dispatchEvent(new Event('hashchange'));
}
