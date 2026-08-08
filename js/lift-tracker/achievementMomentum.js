import { achievementProgress, achievementStats } from './killstreak.js';

function clampProgress(value) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 1);
}

export function formatProgressPct(progress) {
  return `${Math.round(clampProgress(progress) * 100)}%`;
}

const ACHIEVEMENT_PROGRESS_RULES = {
  'rank-private': (s) => metric(s.totalDays, 1, 'workout day'),
  'rank-pfc': (s) => metric(s.totalDays, 2, 'workout days'),
  'rank-corporal': (s) => metric(s.totalDays, 3, 'workout days'),
  'rank-sergeant': (s) => metric(s.totalDays, 5, 'workout days'),
  'rank-staff-sergeant': (s) => metric(s.totalDays, 7, 'workout days'),
  'rank-master-sergeant': (s) => metric(s.totalDays, 9, 'workout days'),
  'rank-warrant-officer': (s) => metric(s.totalDays, 11, 'workout days'),
  'rank-lieutenant': (s) => metric(s.totalDays, 13, 'workout days'),
  'rank-captain': (s) => metric(s.totalDays, 15, 'workout days'),
  'rank-major': (s) => metric(s.totalDays, 18, 'workout days'),
  'rank-colonel': (s) => metric(s.totalDays, 22, 'workout days'),
  'rank-general': (s) => metric(s.totalDays, 27, 'workout days'),
  'rank-prestige': (s) => metric(s.totalDays, 33, 'workout days'),
  'rank-prestige-master': (s) => metric(s.totalDays, 40, 'workout days'),
  'rank-prestige-grandmaster': (s) => metric(s.totalDays, 45, 'workout days'),
  'rank-prestige-legend': (s) => metric(s.totalDays, 50, 'workout days'),
  'mastery-uav-1': (s) => metric(s.tierCounts.uav, 3, 'UAVs'),
  'mastery-uav-2': (s) => metric(s.tierCounts.uav, 10, 'UAVs'),
  'mastery-predator-1': (s) => metric(s.tierCounts.predator, 3, 'Predators'),
  'mastery-predator-2': (s) => metric(s.tierCounts.predator, 10, 'Predators'),
  'mastery-harrier-1': (s) => metric(s.tierCounts.harrier, 5, 'Harriers'),
  'mastery-harrier-2': (s) => metric(s.tierCounts.harrier, 15, 'Harriers'),
  'mastery-chopper-1': (s) => metric(s.tierCounts.chopper, 1, 'Choppers'),
  'mastery-chopper-2': (s) => metric(s.tierCounts.chopper, 3, 'Choppers'),
  'streak-2': (s) => metric(s.longestStreak, 2, 'weeks'),
  'streak-3': (s) => metric(s.longestStreak, 3, 'weeks'),
  'streak-4': (s) => metric(s.longestStreak, 4, 'weeks'),
  'streak-5': (s) => metric(s.longestStreak, 5, 'weeks'),
  'streak-6': (s) => metric(s.longestStreak, 6, 'weeks'),
  'streak-8': (s) => metric(s.longestStreak, 8, 'weeks'),
  'capstone-tactical-nuke': (s) => combinedMetric([
    metric(s.totalDays, 27, 'workout days'),
    metric(s.tierCounts.chopper, 3, 'Choppers'),
  ]),
  'capstone-moab': (s) => combinedMetric([
    metric(s.longestStreak, 8, 'week streak'),
    metric(s.tierCounts.harrier, 15, 'Harriers'),
  ]),
  'capstone-dark-matter': (s) => combinedMetric([
    metric(s.totalDays, 40, 'workout days'),
    metric(s.tierCounts.chopper, 3, 'Choppers'),
  ]),
};

function metric(current, target, noun) {
  const safeCurrent = Number(current) || 0;
  const safeTarget = Number(target) || 1;
  return {
    current: safeCurrent,
    target: safeTarget,
    progress: clampProgress(safeCurrent / safeTarget),
    currentLabel: `${safeCurrent} / ${safeTarget} ${noun}`,
  };
}

function combinedMetric(metrics) {
  const weakest = metrics.slice().sort((a, b) => a.progress - b.progress)[0];
  return {
    ...weakest,
    progress: Math.min(...metrics.map((m) => m.progress)),
    currentLabel: metrics.map((m) => m.currentLabel).join(' - '),
  };
}

export function achievementMomentumItems(sets, userId = null, options = {}) {
  const stats = achievementStats(sets, userId, options);
  const progress = achievementProgress(sets, userId, options);
  return progress
    .filter((achievement) => achievement.track !== 'secret')
    .map((achievement) => {
      const rule = ACHIEVEMENT_PROGRESS_RULES[achievement.id];
      const m = rule ? rule(stats) : { progress: achievement.unlocked ? 1 : 0, currentLabel: achievement.description };
      return {
        kind: 'achievement',
        key: `achievement:${achievement.id}`,
        sourceKey: achievement.id,
        title: achievement.name,
        subtitle: achievement.track,
        progress: achievement.unlocked ? 1 : m.progress,
        achieved: achievement.unlocked,
        currentLabel: m.currentLabel,
        targetLabel: achievement.description,
        detail: achievement.unlocked ? 'Achievement unlocked.' : `${formatProgressPct(m.progress)} there.`,
      };
    });
}

export function buildMomentum({ achievementItems = [], events = [] } = {}) {
  const latest = events.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;
  const closest = achievementItems
    .filter((item) => !item.achieved && item.progress >= 0.6)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);
  return { latest, closest };
}
