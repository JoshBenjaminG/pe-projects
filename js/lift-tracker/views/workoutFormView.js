// Create/edit a workout: a named, saved subset of lifts used to filter the
// homepage list (see listView.js's workout pills). One view handles both
// modes -- create starts with every lift unselected (below the line),
// edit pre-populates the selection from the workout's existing membership
// -- since the only real difference is what's pre-selected and which API
// call Save makes.
//
// The "drag lifts above a yellow line to select them" interaction reuses
// dragReorder.js as-is rather than building a parallel drag system: the
// yellow line is modeled as just another item in the same reorderable
// list (data-reorder-item="__divider__"), it just has no .lt-drag-handle
// inside it, so dragReorder's onPointerDown (which only arms a drag when
// the pointer lands on a handle) never picks it up as something to drag --
// it only ever gets moved around as the *target* other rows land above or
// below, same as any row would.
import {
  listLifts,
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  softDeleteWorkout,
  restoreWorkout,
} from '../api.js';
import { enableDragReorder } from '../dragReorder.js';
import { goToList, refreshView } from '../state.js';
import { showUndoToast } from '../toast.js';

const DIVIDER_ID = '__divider__';

export async function renderWorkoutFormView(root, { mode, workoutId } = {}) {
  const isEdit = mode === 'edit';

  const [lifts, workout] = await Promise.all([
    listLifts(),
    isEdit ? getWorkout(workoutId) : Promise.resolve(null),
  ]);

  if (isEdit && !workout) {
    root.innerHTML = `<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>`;
    return;
  }

  const selectedIds = new Set(isEdit ? workout.liftIds : []);

  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${isEdit ? escapeAttr(workout.name) : ''}"
      />
      ${isEdit ? `<button type="button" class="lt-detail-delete" data-delete-workout aria-label="Delete workout">&times;</button>` : ''}
    </header>

    <p class="lt-workout-instructions">
      Drag the lifts you want in this workout above the yellow line, then save.
    </p>

    <ul class="lt-lift-list lt-workout-lift-list" data-workout-lift-list></ul>
    <p class="lt-empty" data-workout-lifts-empty hidden>Add a lift on the homepage first.</p>

    <button type="button" class="lt-save-workout-btn" data-save-workout>Save workout</button>
    <p class="lt-workout-save-feedback" data-workout-save-feedback hidden></p>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  const nameInput = root.querySelector('[data-workout-name-input]');
  const listEl = root.querySelector('[data-workout-lift-list]');
  const emptyEl = root.querySelector('[data-workout-lifts-empty]');
  const saveBtn = root.querySelector('[data-save-workout]');
  const feedback = root.querySelector('[data-workout-save-feedback]');

  emptyEl.hidden = lifts.length > 0;

  // Selected lifts above the line (in their existing homepage order),
  // divider, then the rest below (also in homepage order) -- create mode
  // has nothing selected yet, so every lift starts below the line.
  const above = lifts.filter((l) => selectedIds.has(l.id));
  const below = lifts.filter((l) => !selectedIds.has(l.id));

  listEl.innerHTML = [
    ...above.map(liftRowHtml),
    dividerHtml(),
    ...below.map(liftRowHtml),
  ].join('');

  // Names are free text from the user -- set via textContent, never innerHTML.
  for (const lift of lifts) {
    const row = listEl.querySelector(`[data-lift-id="${lift.id}"]`);
    const nameSlot = row?.querySelector('[data-name-slot]');
    if (nameSlot) nameSlot.textContent = lift.name;
  }

  enableDragReorder(listEl, { onReorder: () => {} });

  if (isEdit) {
    root.querySelector('[data-delete-workout]').addEventListener('click', async () => {
      if (!window.confirm(`Delete "${workout.name}"? You'll have a few seconds to undo it after.`)) {
        return;
      }
      await softDeleteWorkout(workoutId);
      goToList();
      showUndoToast(`Deleted "${workout.name}"`, {
        onUndo: async () => {
          await restoreWorkout(workoutId);
          refreshView();
        },
      });
    });
  }

  saveBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      return;
    }

    const items = Array.from(listEl.querySelectorAll('[data-reorder-item]'));
    const dividerIndex = items.findIndex((item) => item.dataset.reorderItem === DIVIDER_ID);
    const chosenIds = items.slice(0, dividerIndex).map((item) => item.dataset.reorderItem);

    saveBtn.disabled = true;
    feedback.hidden = true;
    try {
      if (isEdit) {
        await updateWorkout(workoutId, name, chosenIds);
      } else {
        const existing = await listWorkouts();
        await createWorkout(name, chosenIds, existing.length);
      }
      goToList();
    } catch (err) {
      console.error('[lift-tracker]', err);
      feedback.hidden = false;
      feedback.textContent = 'Something went wrong saving the workout.';
      saveBtn.disabled = false;
    }
  });

  function liftRowHtml(lift) {
    return `
      <li class="lt-lift-row" data-reorder-item="${lift.id}" data-lift-id="${lift.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${escapeAttr(lift.name)}">&#8942;&#8942;</button>
      </li>
    `;
  }

  function dividerHtml() {
    return `
      <li class="lt-workout-divider" data-reorder-item="${DIVIDER_ID}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `;
  }
}

function escapeAttr(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
