import {
  createGoal,
  createGoals,
  listLifts,
  listRecentSetsForLifts,
  listWaistEntries,
  listWeightEntries,
  softDeleteGoal,
} from '../api.js';
import { buildExportText, exportWindowStart } from '../export.js';
import { evaluateGoalContext, loadGoalContext, syncGoalEvents } from '../goalSync.js';
import { GOAL_TYPES, formatProgressPct, parseGoalImport } from '../goals.js';
import { dailyWaistSeries, dailyWeightSeries } from '../math.js';
import { goToHelp, goToList } from '../state.js';

const IMPORT_EXAMPLE = `goal_format: lift_tracker_goals_v1
goals:
  - title: Dumbbell Chest Press 35 x 10
    type: lift_set
    lift: dumbell chest press
    weight: 35
    reps: 10
    unit: lb
    timeframe_weeks: 4

  - title: Harrier Week
    type: weekly_workout_days
    target: 3
    recurring: weekly

  - title: Workout A Volume Base
    type: weekly_workout_volume
    workout: Workout A
    target: 18000
    unit: lb
    recurring: weekly`;

const LLM_PROMPT = `Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;

export async function renderGoalsView(root) {
  let context = await loadGoalContext();
  let evaluated = evaluateGoalContext(context);
  let importPreview = [];

  function render() {
    const activeGoals = evaluated.goalEvaluations.filter((item) => item.goal.status === 'active' && !item.achieved);
    const completedGoals = evaluated.goalEvaluations.filter((item) => item.goal.status === 'achieved' || item.achieved);

    root.innerHTML = `
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${activeGoals.length ? activeGoals.map(renderGoalCard).join('') : '<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
        </div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Add Goal</h2>
        ${renderGoalForm()}
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Import Goals</h2>
        <p class="lt-composite-blurb">You can have an LLM turn your recent Lift Tracker history into goals, then paste the YAML it returns here.</p>
        <ol class="lt-goal-steps">
          <li>Export your recent history from the <button type="button" class="lt-inline-link" data-help-export-link>? Help page</button>, or use the all-in-one copy button below.</li>
          <li>Paste the history, goal format, and prompt into an LLM.</li>
          <li>Ask it to return only Lift Tracker YAML using exact lift and workout names.</li>
          <li>Paste the YAML output into this box, tap Preview, then tap Import goals.</li>
        </ol>
        <div class="lt-goal-helper-actions">
          <button type="button" class="lt-goal-secondary-btn" data-copy-goal-packet>Copy 60-day history + prompt</button>
          <span class="lt-export-status" data-goal-packet-status hidden></span>
        </div>
        <textarea class="lt-goal-packet-output" data-goal-packet-output rows="10" readonly hidden></textarea>
        <details class="lt-goal-import-help">
          <summary><span>Goal format and LLM prompt</span><strong>View More -&gt;</strong></summary>
          <p class="lt-composite-blurb">Allowed types: <strong>lift_set</strong>, <strong>weekly_workout_days</strong>, <strong>weekly_workout_volume</strong>, <strong>workout_session_volume</strong>.</p>
          <pre>${escapeHtml(IMPORT_EXAMPLE)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${escapeHtml(LLM_PROMPT)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${escapeAttr(IMPORT_EXAMPLE)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${completedGoals.length ? completedGoals.map(renderGoalCard).join('') : '<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `;

    root.querySelector('[data-back]').addEventListener('click', goToList);
    root.querySelector('[data-help-export-link]').addEventListener('click', goToHelp);
    wireGoalForm();
    wireImport();
    root.querySelectorAll('[data-delete-goal]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await softDeleteGoal(btn.dataset.deleteGoal);
        await reload();
      });
    });
  }

  async function reload() {
    context = await loadGoalContext();
    evaluated = evaluateGoalContext(context);
    render();
  }

  function renderGoalForm() {
    return `
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${GOAL_TYPES.map((type) => `<option value="${type.id}">${type.label}</option>`).join('')}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${context.lifts.map((lift) => `<option value="${lift.id}">${escapeHtml(lift.name)}</option>`).join('')}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${context.workouts.map((workout) => `<option value="${workout.id}">${escapeHtml(workout.name)}</option>`).join('')}
          </select>
        </label>
        <div class="lt-goal-number-row" data-lift-set-fields>
          <label class="lt-field">
            <span>Weight</span>
            <input type="number" inputmode="decimal" step="0.5" min="0" name="target_weight" />
          </label>
          <label class="lt-field">
            <span>Reps</span>
            <input type="number" inputmode="numeric" step="1" min="1" name="target_reps" />
          </label>
        </div>
        <label class="lt-field" data-target-field hidden>
          <span>Target</span>
          <input type="number" inputmode="decimal" step="1" min="0" name="target_value" />
        </label>
        <label class="lt-field">
          <span>Timeframe weeks</span>
          <input type="number" inputmode="numeric" step="1" min="1" name="timeframe_weeks" placeholder="4" />
        </label>
        <button type="submit" class="lt-log-btn">Save goal</button>
        <p class="lt-log-feedback" data-goal-feedback hidden></p>
      </form>
    `;
  }

  function wireGoalForm() {
    const form = root.querySelector('[data-goal-form]');
    const typeSelect = root.querySelector('[data-goal-type]');
    const feedback = root.querySelector('[data-goal-feedback]');

    function syncFields() {
      const type = typeSelect.value;
      root.querySelector('[data-lift-field]').hidden = type !== 'lift_set';
      root.querySelector('[data-workout-field]').hidden = !['weekly_workout_volume', 'workout_session_volume'].includes(type);
      root.querySelector('[data-lift-set-fields]').hidden = type !== 'lift_set';
      root.querySelector('[data-target-field]').hidden = type === 'lift_set';
    }

    typeSelect.addEventListener('change', syncFields);
    syncFields();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      feedback.hidden = true;
      const type = form.type.value;
      const title = form.title.value.trim();
      const goal = {
        title,
        type,
        unit: 'lb',
        timeframe_weeks: numberOrNull(form.timeframe_weeks.value),
        recurring: type.startsWith('weekly_') ? 'weekly' : 'none',
        metadata: {},
      };
      if (type === 'lift_set') {
        goal.lift_id = form.lift_id.value;
        goal.target_weight = numberOrNull(form.target_weight.value);
        goal.target_reps = numberOrNull(form.target_reps.value);
      } else {
        goal.target_value = numberOrNull(form.target_value.value);
        if (type !== 'weekly_workout_days') goal.workout_id = form.workout_id.value;
      }

      const error = validateManualGoal(goal);
      if (error) {
        feedback.hidden = false;
        feedback.textContent = error;
        return;
      }
      await createGoal(goal);
      await syncGoalEvents();
      form.reset();
      await reload();
    });
  }

  function wireImport() {
    const textarea = root.querySelector('[data-import-text]');
    const feedback = root.querySelector('[data-import-feedback]');
    const saveBtn = root.querySelector('[data-save-import]');
    const packetBtn = root.querySelector('[data-copy-goal-packet]');
    const packetOutput = root.querySelector('[data-goal-packet-output]');
    const packetStatus = root.querySelector('[data-goal-packet-status]');

    packetBtn.addEventListener('click', async () => {
      const originalText = packetBtn.textContent;
      packetBtn.disabled = true;
      packetBtn.textContent = 'Building...';
      packetStatus.hidden = true;
      try {
        const packet = await buildGoalLlmPacket();
        packetOutput.value = packet;
        packetOutput.hidden = false;
        const copied = await copyText(packet);
        packetStatus.hidden = false;
        packetStatus.textContent = copied
          ? 'Copied. Paste this into an LLM.'
          : 'Copy from the box below.';
      } finally {
        packetBtn.disabled = false;
        packetBtn.textContent = originalText;
      }
    });

    root.querySelector('[data-preview-import]').addEventListener('click', () => {
      const parsed = parseGoalImport(textarea.value, {
        lifts: context.lifts,
        workouts: context.workouts,
      });
      importPreview = parsed.goals;
      if (parsed.errors.length) {
        saveBtn.hidden = true;
        feedback.innerHTML = `<div class="lt-goal-import-errors">${parsed.errors.map((err) => `<p>${escapeHtml(err)}</p>`).join('')}</div>`;
        return;
      }
      saveBtn.hidden = importPreview.length === 0;
      feedback.innerHTML = importPreview.length
        ? `<ul class="lt-goal-preview-list">${importPreview.map((goal) => `<li>${escapeHtml(goal.title)} <span>${escapeHtml(goal.type)}</span></li>`).join('')}</ul>`
        : '<p class="lt-empty">No goals found in that text.</p>';
    });

    saveBtn.addEventListener('click', async () => {
      if (importPreview.length === 0) return;
      await createGoals(importPreview);
      await syncGoalEvents();
      textarea.value = '';
      importPreview = [];
      await reload();
    });
  }

  render();
}

async function buildGoalLlmPacket() {
  const lifts = await listLifts();
  const liftIds = lifts.map((lift) => lift.id);
  const since = exportWindowStart().toISOString();
  const recentSets = await listRecentSetsForLifts(liftIds, since);
  const setsByLift = new Map(lifts.map((lift) => [lift.id, []]));
  for (const set of recentSets) {
    const bucket = setsByLift.get(set.lift_id);
    if (bucket) bucket.push(set);
  }
  const weightEntries = await listWeightEntries();
  const recentWeightEntries = weightEntries.filter((entry) => new Date(entry.logged_at) >= new Date(since));
  const waistEntries = await listWaistEntries();
  const recentWaistEntries = waistEntries.filter((entry) => new Date(entry.logged_at) >= new Date(since));
  const history = buildExportText(
    lifts,
    setsByLift,
    new Date(),
    undefined,
    dailyWeightSeries(recentWeightEntries),
    dailyWaistSeries(recentWaistEntries)
  );

  return [
    'Use the Lift Tracker export below to create goals.',
    '',
    LLM_PROMPT,
    '',
    'Return only YAML in this exact format. Do not wrap it in markdown fences.',
    '',
    IMPORT_EXAMPLE,
    '',
    'Lift Tracker export:',
    '',
    history,
  ].join('\n');
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to execCommand below.
    }
  }
  try {
    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.left = '-9999px';
    document.body.appendChild(scratch);
    scratch.select();
    const copied = document.execCommand('copy');
    scratch.remove();
    return copied;
  } catch {
    return false;
  }
}

function renderGoalCard(item) {
  const achieved = item.achieved || item.goal.status === 'achieved';
  return `
    <article class="lt-goal-card${achieved ? ' lt-goal-card-achieved' : ''}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${escapeHtml(item.title)}</span>
        <span class="lt-goal-card-sub">${escapeHtml(item.currentLabel)} · ${escapeHtml(item.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${formatProgressPct(item.progress)} complete">
          <span style="width: ${Math.round(Math.min(item.progress, 1) * 100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${achieved ? 'Hit' : formatProgressPct(item.progress)}</span>
        <button type="button" data-delete-goal="${item.goal.id}" aria-label="Delete ${escapeAttr(item.title)}">&times;</button>
      </div>
    </article>
  `;
}

function validateManualGoal(goal) {
  if (!goal.title) return 'Add a title.';
  if (goal.type === 'lift_set') {
    if (!goal.lift_id) return 'Choose a lift.';
    if (goal.target_weight == null) return 'Add a target weight.';
    if (goal.target_reps == null) return 'Add target reps.';
  } else if (goal.target_value == null) {
    return 'Add a target.';
  }
  if ((goal.type === 'weekly_workout_volume' || goal.type === 'workout_session_volume') && !goal.workout_id) {
    return 'Choose a workout.';
  }
  return null;
}

function numberOrNull(value) {
  if (value == null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function escapeAttr(str) {
  return escapeHtml(str);
}
