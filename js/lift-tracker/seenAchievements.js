// Tracks which rank achievements the user has already seen unlocked, so
// the "new unlock" affordances (the homepage killstreak "!" badge in
// listView.js, and the gold highlight on the achievements page in
// killstreakView.js) only show up once per newly-earned rank.
import { readStringPref, writeStringPref } from './prefs.js';

const SEEN_RANK_IDS_PREF_KEY = 'lt-seen-rank-achievements';

export function readSeenRankIds() {
  const raw = readStringPref(SEEN_RANK_IDS_PREF_KEY, '');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function writeSeenRankIds(ids) {
  writeStringPref(SEEN_RANK_IDS_PREF_KEY, JSON.stringify(ids));
}
