export const LIFT_DICTIONARY = [
  {
    key: 'bench-press',
    name: 'Bench Press',
    aliases: ['bench', 'barbell bench press', 'bench press warmup', 'bench press 2', 'bench press 3'],
    equipment: ['barbell', 'bench'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'front delts'],
    movementPatterns: ['push', 'horizontal press'],
    tutorialUrl: '',
    cues: ['Keep shoulder blades set.', 'Touch the same point on the chest each rep.', 'Drive the bar up and slightly back.'],
  },
  {
    key: 'bicep-curl',
    name: 'Bicep Curl',
    aliases: ['bicep curls', 'curl'],
    equipment: ['dumbbell', 'barbell', 'cable'],
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    movementPatterns: ['curl', 'elbow flexion'],
    tutorialUrl: '',
    cues: ['Keep elbows close to your sides.', 'Avoid swinging the torso.', 'Control the lower.'],
  },
  {
    key: 'calf-raise',
    name: 'Calf Raise',
    aliases: ['calf raises', 'standing calf raise'],
    equipment: ['bodyweight', 'machine', 'dumbbell'],
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    movementPatterns: ['ankle extension'],
    tutorialUrl: '',
    cues: ['Pause briefly at the top.', 'Use a full stretch at the bottom.', 'Keep reps controlled.'],
  },
  {
    key: 'dumbbell-chest-press',
    name: 'Dumbbell Chest Press',
    aliases: ['dumbell chest press', 'db chest press', 'dumbbell bench press', 'db bench press'],
    equipment: ['dumbbell', 'bench'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'front delts'],
    movementPatterns: ['push', 'horizontal press'],
    tutorialUrl: '',
    cues: ['Keep wrists stacked over elbows.', 'Lower with control.', 'Press up without letting shoulders roll forward.'],
  },
  {
    key: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    aliases: ['dumbell curl', 'db curl'],
    equipment: ['dumbbell'],
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    movementPatterns: ['curl', 'elbow flexion'],
    tutorialUrl: '',
    cues: ['Keep upper arms still.', 'Rotate naturally through the curl if comfortable.', 'Avoid using momentum.'],
  },
  {
    key: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    aliases: ['dumbell lateral raise', 'lateral raise', 'db lateral raise'],
    equipment: ['dumbbell'],
    primaryMuscles: ['side delts'],
    secondaryMuscles: ['traps'],
    movementPatterns: ['shoulder abduction'],
    tutorialUrl: '',
    cues: ['Lead with elbows.', 'Stop around shoulder height.', 'Use light enough weight to stay smooth.'],
  },
  {
    key: 'dumbbell-row',
    name: 'Dumbbell Row',
    aliases: ['dumbell row', 'db row', 'one arm dumbbell row', 'one-arm dumbbell row'],
    equipment: ['dumbbell'],
    primaryMuscles: ['back', 'lats'],
    secondaryMuscles: ['rear delts', 'biceps', 'traps'],
    movementPatterns: ['pull', 'horizontal pull'],
    tutorialUrl: '',
    cues: ['Pull elbow toward the hip.', 'Keep the torso steady.', 'Reach long at the bottom without losing control.'],
  },
  {
    key: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    aliases: ['dumbell shoulder press', 'db shoulder press', 'dumbbell overhead press'],
    equipment: ['dumbbell'],
    primaryMuscles: ['shoulders', 'front delts'],
    secondaryMuscles: ['triceps', 'upper chest'],
    movementPatterns: ['push', 'vertical press'],
    tutorialUrl: '',
    cues: ['Keep ribs down.', 'Press slightly back over the shoulders.', 'Control the bottom position.'],
  },
  {
    key: 'forearm-twist',
    name: 'Forearm Twist',
    aliases: ['forearm twists', 'wrist twist', 'pronation supination'],
    equipment: ['dumbbell'],
    primaryMuscles: ['forearms'],
    secondaryMuscles: ['grip'],
    movementPatterns: ['forearm rotation'],
    tutorialUrl: '',
    cues: ['Move slowly through rotation.', 'Keep the elbow supported if needed.', 'Use a light load.'],
  },
  {
    key: 'hammer-curl',
    name: 'Hammer Curl',
    aliases: ['hammer curls'],
    equipment: ['dumbbell'],
    primaryMuscles: ['biceps', 'brachialis'],
    secondaryMuscles: ['forearms'],
    movementPatterns: ['curl', 'elbow flexion'],
    tutorialUrl: '',
    cues: ['Keep palms facing each other.', 'Control the lower.', 'Avoid shoulder swing.'],
  },
  {
    key: 'hip-thrust',
    name: 'Hip Thrust',
    aliases: ['hip thrusts', 'barbell hip thrust'],
    equipment: ['barbell', 'bench'],
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'quads'],
    movementPatterns: ['hinge', 'hip extension'],
    tutorialUrl: '',
    cues: ['Tuck ribs down.', 'Drive through the heels.', 'Pause with hips fully extended.'],
  },
  {
    key: 'lunge',
    name: 'Lunge',
    aliases: ['lunges', 'db lunge', 'dumbbell lunge'],
    equipment: ['bodyweight', 'dumbbell'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    movementPatterns: ['squat', 'single-leg'],
    tutorialUrl: '',
    cues: ['Step far enough to stay balanced.', 'Keep front knee tracking over toes.', 'Control the descent.'],
  },
  {
    key: 'overhead-tricep-extension',
    name: 'Overhead Tricep Extension',
    aliases: ['overhead tricep extensions', 'tricep extension', 'overhead triceps extension'],
    equipment: ['dumbbell', 'cable'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    movementPatterns: ['elbow extension'],
    tutorialUrl: '',
    cues: ['Keep elbows pointed forward.', 'Lower behind the head with control.', 'Extend without flaring hard.'],
  },
  {
    key: 'rear-delt-fly',
    name: 'Rear Delt Fly',
    aliases: ['rear delt fly', 'rear delt raise', 'reverse fly'],
    equipment: ['dumbbell', 'machine', 'cable'],
    primaryMuscles: ['rear delts'],
    secondaryMuscles: ['upper back', 'traps'],
    movementPatterns: ['pull', 'shoulder horizontal abduction'],
    tutorialUrl: '',
    cues: ['Keep a slight elbow bend.', 'Move from the shoulders.', 'Avoid shrugging through the rep.'],
  },
  {
    key: 'row',
    name: 'Row',
    aliases: ['rows', 'cable row', 'machine row', 'seated row'],
    equipment: ['cable', 'machine', 'barbell', 'dumbbell'],
    primaryMuscles: ['back', 'lats'],
    secondaryMuscles: ['rear delts', 'biceps', 'traps'],
    movementPatterns: ['pull', 'horizontal pull'],
    tutorialUrl: '',
    cues: ['Pull elbows back.', 'Keep chest tall.', 'Control the reach forward.'],
  },
  {
    key: 'shrug',
    name: 'Shrug',
    aliases: ['shrugs', 'dumbbell shrug', 'barbell shrug'],
    equipment: ['dumbbell', 'barbell'],
    primaryMuscles: ['traps'],
    secondaryMuscles: ['forearms'],
    movementPatterns: ['scapular elevation'],
    tutorialUrl: '',
    cues: ['Lift shoulders straight up.', 'Pause briefly at the top.', 'Avoid rolling the shoulders.'],
  },
  {
    key: 'squat',
    name: 'Squat',
    aliases: ['barbell squat', 'squat warmup', 'squat 2', 'squat 3'],
    equipment: ['barbell'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    movementPatterns: ['squat'],
    tutorialUrl: '',
    cues: ['Brace before descending.', 'Keep knees tracking over toes.', 'Drive through the whole foot.'],
  },
  {
    key: 'tricep-curl',
    name: 'Tricep Curl',
    aliases: ['tricep curls', 'triceps curl'],
    equipment: ['dumbbell', 'cable'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    movementPatterns: ['elbow extension'],
    tutorialUrl: '',
    cues: ['Keep upper arms steady.', 'Fully extend with control.', 'Avoid using shoulder momentum.'],
  },
  {
    key: 'weighted-sit-up',
    name: 'Weighted Sit-Up',
    aliases: ['weighted sit ups', 'weighted sit ups 2', 'weighted situp', 'weighted sit-up'],
    equipment: ['plate', 'dumbbell'],
    primaryMuscles: ['abs'],
    secondaryMuscles: ['hip flexors'],
    movementPatterns: ['trunk flexion'],
    tutorialUrl: '',
    cues: ['Keep the weight secure.', 'Curl the torso up under control.', 'Avoid yanking with the neck.'],
  },
];

export function normalizeLiftText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/dumbell/g, 'dumbbell')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function searchableNames(entry) {
  return [entry.name, entry.key, ...(entry.aliases || [])];
}

function scoreEntry(entry, query) {
  const normalizedQuery = normalizeLiftText(query);
  if (normalizedQuery.length < 2) return null;
  let best = null;
  for (const name of searchableNames(entry)) {
    const normalizedName = normalizeLiftText(name);
    let score = null;
    if (normalizedName === normalizedQuery) score = 0;
    else if (normalizedName.startsWith(normalizedQuery)) score = 1;
    else if (normalizedName.includes(normalizedQuery)) score = 2;
    else {
      const tokens = normalizedQuery.split(' ');
      if (tokens.every((token) => normalizedName.includes(token))) score = 3;
    }
    if (score != null && (best == null || score < best)) best = score;
  }
  return best;
}

export function searchLiftDictionary(query, { limit = 5 } = {}) {
  return LIFT_DICTIONARY
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((item) => item.score != null)
    .sort((a, b) => a.score - b.score || a.entry.name.localeCompare(b.entry.name))
    .slice(0, limit)
    .map((item) => item.entry);
}

export function findLiftDictionaryEntry(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const normalized = normalizeLiftText(raw);
  return LIFT_DICTIONARY.find((entry) =>
    entry.key === raw ||
    entry.key === normalized.replace(/\s+/g, '-') ||
    searchableNames(entry).some((name) => normalizeLiftText(name) === normalized)
  ) || null;
}

