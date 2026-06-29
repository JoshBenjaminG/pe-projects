// Local "feature has been tried" flags for lightweight discovery nudges.
// These are UI hints only, not user data, so localStorage is the right
// level of persistence: per browser, safe to ignore if unavailable.

const DISCOVERY_STORAGE_PREFIX = 'lt-discovery-seen-';

export const DISCOVERY_FEATURES = {
  weight: 'weight',
  history: 'history',
  composite: 'composite',
};

export function hasSeenDiscovery(feature) {
  try {
    return window.localStorage.getItem(`${DISCOVERY_STORAGE_PREFIX}${feature}`) === 'true';
  } catch {
    return false;
  }
}

export function markDiscoverySeen(feature) {
  try {
    window.localStorage.setItem(`${DISCOVERY_STORAGE_PREFIX}${feature}`, 'true');
  } catch {
    // Ignore -- the badge can reappear in locked-down browsers, but the app
    // interaction itself should never fail because a hint could not persist.
  }
}
