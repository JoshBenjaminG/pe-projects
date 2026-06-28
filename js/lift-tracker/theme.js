// Applies/persists the user's selected color theme (see the
// `:root[data-lt-theme="..."]` blocks in lift-tracker.css). Themes are
// unlocked by reaching ranks in the achievements catalog (killstreak.js)
// and selected by tapping an unlocked rank card on the achievements page
// (views/killstreakView.js). This module just knows how to read/write the
// pref and flip the `data-lt-theme` attribute -- it has no opinion on
// where theme choices come from.

import { readStringPref, writeStringPref } from './prefs.js';

const THEME_PREF_KEY = 'lt-theme';
const DEFAULT_THEME_ID = 'default';

export function getStoredThemeId() {
  return readStringPref(THEME_PREF_KEY, DEFAULT_THEME_ID);
}

// "default" (the Private rank's "Lift Tracker" theme) has no
// :root[data-lt-theme="default"] block -- it IS the plain :root, so we
// remove the attribute entirely rather than pointing it at a block that
// doesn't exist.
export function applyTheme(themeId) {
  if (!themeId || themeId === DEFAULT_THEME_ID) {
    delete document.documentElement.dataset.ltTheme;
  } else {
    document.documentElement.dataset.ltTheme = themeId;
  }
}

export function setTheme(themeId) {
  applyTheme(themeId);
  writeStringPref(THEME_PREF_KEY, themeId || DEFAULT_THEME_ID);
}

export function applyStoredTheme() {
  applyTheme(getStoredThemeId());
}
