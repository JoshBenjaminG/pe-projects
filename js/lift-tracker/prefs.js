// Tiny helpers for persisting simple boolean UI preferences (expand/collapse
// state, etc.) via cookies, so they're remembered across browser sessions.
// Mirrors the safe try/catch fallback used for localStorage elsewhere (see
// the fast-mode toggle in listView.js) -- a preference failing to persist
// should never break the page, it should just not be remembered next time.

const COOKIE_MAX_AGE_DAYS = 365;

export function readBoolPref(key, defaultValue) {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    if (!match) return defaultValue;
    return decodeURIComponent(match[1]) === 'true';
  } catch {
    return defaultValue;
  }
}

export function writeBoolPref(key, value) {
  try {
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${key}=${encodeURIComponent(String(value))}; max-age=${maxAge}; path=/; samesite=lax`;
  } catch {
    // Ignore -- the toggle still works for the rest of this session, it
    // just won't be remembered next time.
  }
}

// String-valued counterparts to the bool helpers above, used for prefs that
// aren't a simple on/off (the selected theme id, the JSON-encoded list of
// achievement ids the user has already seen, etc). Kept separate from
// readBoolPref/writeBoolPref rather than merged so neither has to guess at
// the other's value format.

export function readStringPref(key, defaultValue) {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
    if (!match) return defaultValue;
    return decodeURIComponent(match[1]);
  } catch {
    return defaultValue;
  }
}

export function writeStringPref(key, value) {
  try {
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${key}=${encodeURIComponent(String(value))}; max-age=${maxAge}; path=/; samesite=lax`;
  } catch {
    // Ignore -- still works for the rest of this session, it just won't be
    // remembered next time.
  }
}
