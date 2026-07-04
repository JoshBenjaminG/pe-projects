import { achievementProgress, achievementStats } from './killstreak.js';
import { calcE1RM, sessionVolume, toDateKey } from './math.js';

export const GOAL_TYPES = [
  { id: 'lift_set', label: 'Lift set' },
  { id: 'weekly_workout_days', label: 'Weekly workout days' },
  { id: 'weekly_workout_volume', label: 'Weekly workout volume' },
  { id: 'workout_session_volume', label: 'Workout session volume' },
];

const CLOSE_THRESHOLDS = [0.8, 0.9, 0.95];

function num(value) {
  if (value == null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function dateKeyFromParts(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function weekStartKey(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - d.getDay());
  return toDateKey(d.toISOString());
}

function isThisWeek(isoString, now = new Date()) {
  const start = dateKeyFromParts(weekStartKey(now));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const performed = new Date(isoString);
  return performed >= start && performed < end;
}

function clampProgress(value) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 1);
}

function formatNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);
}

export function formatProgressPct(progress) {
  return `${Math.round(clampProgress(progress) * 100)}%`;
}

export function goalTargetLabel(goal, lookup = {}) {
  if (goal.type === 'lift_set') {
    return `${formatNumber(goal.target_weight)} x ${goal.target_reps}`;
  }
  if (goal.type === 'weekly_workout_days') {
    return `${formatNumber(goal.target_value)} days`;
  }
  if (goal.type === 'weekly_workout_volume' || goal.type === 'workout_session_volume') {
    return `${formatNumber(goal.target_value)} ${goal.unit || 'lb'}`;
  }
  return '';
}

function dailyVolumeByWorkout(sets, workout) {
  const liftIds = new Set(workout?.liftIds || []);
  const byDate = new Map();
  for (const set of sets) {
    if (!liftIds.has(set.lift_id)) continue;
    const date = toDateKey(set.performed_at);
    byDate.set(date, (byDate.get(date) || 0) + Number(set.weight) * Number(set.reps));
  }
  return byDate;
}

export function evaluateGoal(goal, context) {
  const liftsById = context.liftsById || new Map();
  const workoutsById = context.workoutsById || new Map();
  const activeSets = context.activeSets || [];
  const workoutHistorySets = context.workoutHistorySets || activeSets;
  const lift = goal.lift_id ? liftsById.get(goal.lift_id) : null;
  const workout = goal.workout_id ? workoutsById.get(goal.workout_id) : null;

  if (goal.type === 'lift_set') {
    const sets = activeSets.filter((set) => set.lift_id === goal.lift_id);
    const targetWeight = Number(goal.target_weight);
    const targetReps = Number(goal.target_reps);
    const targetE1RM = calcE1RM(targetWeight, targetReps);
    let best = null;
    let bestE1RM = 0;
    let achievedSet = null;
    for (const set of sets) {
      const weight = Number(set.weight);
      const reps = Number(set.reps);
      const e1rm = calcE1RM(weight, reps);
      if (e1rm > bestE1RM) {
        bestE1RM = e1rm;
        best = set;
      }
      if (weight >= targetWeight && reps >= targetReps) achievedSet = set;
    }
    const achieved = Boolean(achievedSet);
    const progress = achieved ? 1 : clampProgress(bestE1RM / targetE1RM);
    return {
      goal,
      kind: 'goal',
      key: `goal:${goal.id}`,
      title: goal.title,
      subtitle: lift?.name || 'Lift goal',
      progress,
      achieved,
      currentLabel: best ? `Best: ${formatNumber(best.weight)} x ${best.reps}` : 'No sets yet',
      targetLabel: `Goal: ${formatNumber(targetWeight)} x ${targetReps}`,
      detail: achievedSet
        ? `Hit with ${formatNumber(achievedSet.weight)} x ${achievedSet.reps}.`
        : `${formatProgressPct(progress)} there.`,
    };
  }

  if (goal.type === 'weekly_workout_days') {
    const days = new Set();
    for (const set of workoutHistorySets) {
      if (isThisWeek(set.performed_at)) days.add(toDateKey(set.performed_at));
    }
    const target = Number(goal.target_value);
    const current = days.size;
    const achieved = current >= target;
    const progress = target > 0 ? clampProgress(current / target) : 0;
    return {
      goal,
      kind: 'goal',
      key: `goal:${goal.id}`,
      title: goal.title,
      subtitle: 'This week',
      progress,
      achieved,
      currentLabel: `${current} / ${formatNumber(target)} days`,
      targetLabel: current + 1 === target ? 'One more workout gets it.' : `Goal: ${formatNumber(target)} days`,
      detail: achieved ? 'Weekly goal hit.' : `${formatProgressPct(progress)} there.`,
    };
  }

  if (goal.type === 'weekly_workout_volume') {
    const volumes = dailyVolumeByWorkout(activeSets.filter((set) => isThisWeek(set.performed_at)), workout);
    const current = Array.from(volumes.values()).reduce((sum, value) => sum + value, 0);
    const target = Number(goal.target_value);
    const achieved = current >= target;
    const progress = target > 0 ? clampProgress(current / target) : 0;
    return {
      goal,
      kind: 'goal',
      key: `goal:${goal.id}`,
      title: goal.title,
      subtitle: workout?.name || 'Workout volume',
      progress,
      achieved,
      currentLabel: `${Math.round(current)} / ${Math.round(target)} ${goal.unit || 'lb'}`,
      targetLabel: 'This week',
      detail: achieved ? 'Weekly volume goal hit.' : `${formatProgressPct(progress)} there.`,
    };
  }

  if (goal.type === 'workout_session_volume') {
    const volumes = dailyVolumeByWorkout(activeSets, workout);
    const current = Math.max(0, ...Array.from(volumes.values()));
    const target = Number(goal.target_value);
    const achieved = current >= target;
    const progress = target > 0 ? clampProgress(current / target) : 0;
    return {
      goal,
      kind: 'goal',
      key: `goal:${goal.id}`,
      title: goal.title,
      subtitle: workout?.name || 'Workout session',
      progress,
      achieved,
      currentLabel: `Best: ${Math.round(current)} ${goal.unit || 'lb'}`,
      targetLabel: `Goal: ${Math.round(target)} ${goal.unit || 'lb'}`,
      detail: achieved ? 'Session volume goal hit.' : `${formatProgressPct(progress)} there.`,
    };
  }

  return {
    goal,
    kind: 'goal',
    key: `goal:${goal.id}`,
    title: goal.title,
    subtitle: 'Unsupported goal',
    progress: 0,
    achieved: false,
    currentLabel: '',
    targetLabel: '',
    detail: '',
  };
}

export function evaluateGoals(goals, context) {
  return goals
    .filter((goal) => goal.deleted_at == null)
    .map((goal) => evaluateGoal(goal, context));
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
    currentLabel: metrics.map((m) => m.currentLabel).join(' · '),
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

export function buildMomentum({ goalEvaluations = [], achievementItems = [], events = [] } = {}) {
  const latest = events.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;
  const candidates = [...goalEvaluations, ...achievementItems]
    .filter((item) => !item.achieved && item.progress >= 0.6)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);
  return { latest, closest: candidates };
}

export function eventsForEvaluations(evaluations, existingEvents = []) {
  const existing = new Set(existingEvents.map((event) => eventKey(event)));
  const events = [];
  for (const item of evaluations) {
    if (item.kind !== 'goal') continue;

    for (const threshold of CLOSE_THRESHOLDS) {
      if (item.progress >= threshold && !item.achieved) {
        const event = {
          goal_id: item.goal.id,
          source_type: 'goal',
          source_key: `goal:${item.goal.id}`,
          event_type: 'close',
          threshold,
          title: item.title,
          message: `${item.title} is ${formatProgressPct(item.progress)} there.`,
          metadata: { progress: item.progress },
        };
        if (!existing.has(eventKey(event))) events.push(event);
      }
    }
    if (item.achieved) {
      const event = {
        goal_id: item.goal.id,
        source_type: 'goal',
        source_key: `goal:${item.goal.id}`,
        event_type: 'achieved',
        threshold: 1,
        title: item.title,
        message: `Goal hit: ${item.title}.`,
        metadata: { progress: 1 },
      };
      if (!existing.has(eventKey(event))) events.push(event);
    }
  }
  return events;
}

function eventKey(event) {
  if (event.goal_id) return `goal:${event.goal_id}:${event.event_type}:${Number(event.threshold) || 0}`;
  return `achievement:${event.source_key}:${event.event_type}`;
}

function normalizeName(value) {
  return String(value || '').trim().toLowerCase();
}

function stripQuotes(value) {
  const s = String(value || '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parseScalar(value) {
  const stripped = stripQuotes(value);
  if (/^-?\d+(\.\d+)?$/.test(stripped)) return Number(stripped);
  if (stripped === 'true') return true;
  if (stripped === 'false') return false;
  return stripped;
}

export function parseGoalImport(text, { lifts = [], workouts = [] } = {}) {
  const rawGoals = [];
  let current = null;
  for (const line of String(text || '').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed === 'goals:' || trimmed.startsWith('goal_format:')) continue;
    if (trimmed.startsWith('- ')) {
      if (current) rawGoals.push(current);
      current = {};
      const rest = trimmed.slice(2).trim();
      if (rest) {
        const match = rest.match(/^([^:]+):\s*(.*)$/);
        if (match) current[match[1].trim()] = parseScalar(match[2]);
      }
      continue;
    }
    const match = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (match && current) current[match[1].trim()] = parseScalar(match[2]);
  }
  if (current) rawGoals.push(current);

  const liftByName = new Map(lifts.map((lift) => [normalizeName(lift.name), lift]));
  const workoutByName = new Map(workouts.map((workout) => [normalizeName(workout.name), workout]));
  const parsed = [];
  const errors = [];

  rawGoals.forEach((raw, index) => {
    const row = index + 1;
    const type = String(raw.type || '').trim();
    const goal = {
      title: String(raw.title || '').trim(),
      type,
      unit: String(raw.unit || 'lb').trim() || 'lb',
      timeframe_weeks: num(raw.timeframe_weeks),
      recurring: raw.recurring === true ? 'weekly' : (raw.recurring || 'none'),
      metadata: { imported: true },
    };

    if (!goal.title) errors.push(`Goal ${row}: missing title.`);
    if (!GOAL_TYPES.some((t) => t.id === type)) errors.push(`Goal ${row}: unsupported type "${type}".`);

    if (type === 'lift_set') {
      const lift = liftByName.get(normalizeName(raw.lift));
      if (!lift) errors.push(`Goal ${row}: could not find lift "${raw.lift || ''}".`);
      goal.lift_id = lift?.id;
      goal.target_weight = num(raw.weight);
      goal.target_reps = num(raw.reps);
      if (goal.target_weight == null) errors.push(`Goal ${row}: missing weight.`);
      if (goal.target_reps == null) errors.push(`Goal ${row}: missing reps.`);
    }

    if (type === 'weekly_workout_days') {
      goal.target_value = num(raw.target);
      goal.recurring = 'weekly';
      if (goal.target_value == null) errors.push(`Goal ${row}: missing target.`);
    }

    if (type === 'weekly_workout_volume' || type === 'workout_session_volume') {
      const workout = workoutByName.get(normalizeName(raw.workout));
      if (!workout) errors.push(`Goal ${row}: could not find workout "${raw.workout || ''}".`);
      goal.workout_id = workout?.id;
      goal.target_value = num(raw.target);
      if (type === 'weekly_workout_volume') goal.recurring = 'weekly';
      if (goal.target_value == null) errors.push(`Goal ${row}: missing target.`);
    }

    parsed.push(goal);
  });

  return { goals: errors.length ? [] : parsed, errors, rawGoals };
}
