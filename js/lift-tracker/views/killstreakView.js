// Standalone full-page view explaining the weekly killstreak badge and
// showing lifetime stats -- this is where the homepage killstreak banner
// (see listView.js) now links to, since there wasn't room in that banner
// for more than a couple words without text getting clipped.
import { listLifts, listActiveSetsForLifts } from '../api.js';
import { weeklyKillstreak, killstreakHistory, KILLSTREAK_TIERS, achievementProgress } from '../killstreak.js';
import { goToList } from '../state.js';

const ACHIEVEMENT_TRACK_LABELS = {
  rank: 'Rank',
  mastery: 'Killstreak Mastery',
  streak: 'Consistency',
  capstone: 'Capstone',
};
const ACHIEVEMENT_TRACK_ORDER = ['rank', 'mastery', 'streak', 'capstone'];

export async function renderKillstreakView(root) {
  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Killstreak</h1>
    </header>

    <p class="lt-composite-blurb">Log a workout on more distinct days within a Sunday-Saturday week to climb the tiers below. It resets on its own every Sunday.</p>

    <section class="lt-killstreak-current" data-killstreak-current>
      <span class="lt-killstreak-current-icon" data-killstreak-current-icon>&#127919;</span>
      <span class="lt-killstreak-info">
        <span class="lt-killstreak-label" data-killstreak-current-label>No Killstreak</span>
        <span class="lt-killstreak-sub" data-killstreak-current-sub>0 Day streak</span>
      </span>
    </section>

    <ul class="lt-killstreak-tier-list" data-killstreak-tier-list></ul>

    <h2 class="lt-killstreak-achievements-heading">Achievements</h2>
    <p class="lt-composite-blurb" data-achievements-summary></p>
    <div data-achievements></div>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  const lifts = await listLifts();
  const sets = lifts.length ? await listActiveSetsForLifts(lifts.map((l) => l.id)) : [];

  const { days, tier: currentTier } = weeklyKillstreak(sets);
  root.querySelector('[data-killstreak-current-icon]').textContent = currentTier ? currentTier.icon : '\u{1F3AF}';
  root.querySelector('[data-killstreak-current-label]').textContent = currentTier ? `${currentTier.label} Killstreak` : 'No Killstreak';
  root.querySelector('[data-killstreak-current-sub]').textContent = `${days} Day streak`;

  const counts = killstreakHistory(sets);
  const listEl = root.querySelector('[data-killstreak-tier-list]');
  listEl.innerHTML = KILLSTREAK_TIERS.map((tier) => {
    const count = counts[tier.key];
    const isCurrent = currentTier?.key === tier.key;
    return `
      <li class="lt-killstreak-tier-row${isCurrent ? ' lt-killstreak-tier-row-current' : ''}">
        <span class="lt-killstreak-tier-icon">${tier.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${tier.label}</span>
          <span class="lt-killstreak-tier-req">${tier.days}+ day${tier.days === 1 ? '' : 's'} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${count} earned</span>
      </li>
    `;
  }).join('');

  const progress = achievementProgress(sets);
  const unlockedCount = progress.filter((a) => a.unlocked).length;
  root.querySelector('[data-achievements-summary]').textContent =
    `${unlockedCount} / ${progress.length} unlocked. Each badge stays unlocked for good once you've earned it.`;

  const achievementsEl = root.querySelector('[data-achievements]');
  achievementsEl.innerHTML = ACHIEVEMENT_TRACK_ORDER.map((track) => {
    const inTrack = progress
      .filter((a) => a.track === track)
      // Stable sort: unlocked badges float to the top of their track,
      // locked ones stay in the original pacing order underneath.
      .sort((a, b) => Number(b.unlocked) - Number(a.unlocked));

    const cards = inTrack.map((a) => `
      <li class="lt-achievement-card${a.unlocked ? ' lt-achievement-card-unlocked' : ' lt-achievement-card-locked'}">
        <span class="lt-achievement-card-icon">${a.unlocked ? '🎖️' : '🔒'}</span>
        <span class="lt-achievement-card-info">
          <span class="lt-achievement-card-name">${a.name}</span>
          <span class="lt-achievement-card-desc">${a.description}</span>
        </span>
      </li>
    `).join('');

    return `
      <section class="lt-achievement-track">
        <h3 class="lt-achievement-track-heading">${ACHIEVEMENT_TRACK_LABELS[track]}</h3>
        <ul class="lt-achievement-list">${cards}</ul>
      </section>
    `;
  }).join('');
}
