// Tiny hash-based router. The whole feature is one PHP page (workout.php);
// "list" vs "lift detail" is just two render functions swapped based on
// location.hash, so PHP never has to route or touch the database.

export function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash.startsWith('lift/')) {
    return { name: 'detail', liftId: hash.slice('lift/'.length) };
  }
  return { name: 'list' };
}

export function goToList() {
  window.location.hash = '#/';
}

export function goToLift(liftId) {
  window.location.hash = `#/lift/${liftId}`;
}
