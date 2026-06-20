import {
  listLifts,
  createLift,
  softDeleteLift,
  restoreLift,
  reorderLifts,
  listActiveSetsForLifts,
  listRecentSetsForLifts,
} from '../api.js';
import { dailyMaxE1RM, computeComposite } from '../math.js';
import { renderCompositeChart } from '../charts.js';
import { enableDragReorder } from '../dragReorder.js';
import { showUndoToast } from '../toast.js';
import { goToLift } from '../state.js';
import { buildExportText, exportWindowStart } from '../export.js';

export async function renderListView(root) {
  root.innerHTML = `
    <header class="lt-header">
      <h1>Lift Tracker</h1>
    </header>

    <section class="lt-export-section" data-export-section>
      <button type="button" class="lt-export-toggle" data-export-toggle aria-expanded="false">
        <span>Export progress (last 30 days)</span>
        <span class="lt-chevron" data-export-chevron>&#9660;</span>
      </button>
      <div class="lt-export-body" data-export-body hidden>
        <textarea class="lt-export-textarea" data-export-textarea readonly></textarea>
        <div class="lt-export-actions">
          <button type="button" class="lt-export-copy" data-export-copy>Copy to clipboard</button>
          <span class="lt-export-status" data-export-status hidden></span>
        </div>
      </div>
    </section>

    <section class="lt-composite" data-composite-section>
      <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
        <span>Composite progress</span>
        <span class="lt-chevron" data-chevron>&#9650;</span>
      </button>
      <div class="lt-composite-body" data-composite-body>
        <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
        <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
      </div>
    </section>

    <form class="lt-add-lift" data-add-lift-form>
      <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
      <button type="submit">+ Add Lift</button>
    </form>

    <ul class="lt-lift-list" data-lift-list></ul>
    <p class="lt-empty" data-list-empty hidden>No lifts yet — add your first one above.</p>
  `;

  const compositeSection = root.querySelector('[data-composite-section]');
  const compositeToggle = root.querySelector('[data-composite-toggle]');
  const compositeBody = root.querySelector('[data-composite-body]');
  const chevron = root.querySelector('[data-chevron]');

  compositeToggle.addEventListener('click', () => {
    const expanded = compositeToggle.getAttribute('aria-expanded') === 'true';
    compositeToggle.setAttribute('aria-expanded', String(!expanded));
    compositeBody.hidden = expanded;
    chevron.innerHTML = expanded ? '&#9660;' : '&#9650;';
  });

  const exportToggle = root.querySelector('[data-export-toggle]');
  const exportBody = root.querySelector('[data-export-body]');
  const exportChevron = root.querySelector('[data-export-chevron]');
  const exportTextarea = root.querySelector('[data-export-textarea]');
  const exportCopyBtn = root.querySelector('[data-export-copy]');
  const exportStatus = root.querySelector('[data-export-status]');

  exportToggle.addEventListener('click', async () => {
    const wasExpanded = exportToggle.getAttribute('aria-expanded') === 'true';
    const nowExpanded = !wasExpanded;
    exportToggle.setAttribute('aria-expanded', String(nowExpanded));
    exportBody.hidden = !nowExpanded;
    exportChevron.innerHTML = nowExpanded ? '&#9650;' : '&#9660;';

    if (!nowExpanded) return; // just collapsed — nothing else to do

    exportToggle.disabled = true;
    try {
      const liftIds = currentLifts.map((l) => l.id);
      const since = exportWindowStart().toISOString();
      const recentSets = await listRecentSetsForLifts(liftIds, since);
      const setsByLift = new Map(currentLifts.map((l) => [l.id, []]));
      for (const s of recentSets) {
        const bucket = setsByLift.get(s.lift_id);
        if (bucket) bucket.push(s);
      }
      exportTextarea.value = buildExportText(currentLifts, setsByLift);
      exportStatus.hidden = true;
    } finally {
      exportToggle.disabled = false;
    }
  });

  exportCopyBtn.addEventListener('click', async () => {
    exportTextarea.select();
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(exportTextarea.value);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied) {
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
    }
    exportStatus.hidden = false;
    exportStatus.textContent = copied ? 'Copied!' : 'Select all (Cmd/Ctrl+A) and copy manually.';
  });

  const addForm = root.querySelector('[data-add-lift-form]');
  const listEl = root.querySelector('[data-lift-list]');
  const listEmptyEl = root.querySelector('[data-list-empty]');

  let currentLifts = [];

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = addForm.querySelector('input[name="name"]');
    const name = input.value.trim();
    if (!name) return;
    input.value = '';
    input.disabled = true;
    try {
      await createLift(name, currentLifts.length);
      await load();
    } finally {
      input.disabled = false;
      input.focus();
    }
  });

  // Bound once: the list re-renders its innerHTML on every load(), but
  // listEl itself stays the same node for the life of this view, and
  // enableDragReorder reads the DOM fresh on every drag via delegation.
  enableDragReorder(listEl, {
    onReorder: async (newIds) => {
      await reorderLifts(newIds);
      currentLifts = newIds
        .map((id) => currentLifts.find((l) => l.id === id))
        .filter(Boolean);
    },
  });

  async function load() {
    currentLifts = await listLifts();
    listEmptyEl.hidden = currentLifts.length > 0;

    if (currentLifts.length === 0) {
      listEl.innerHTML = '';
      compositeSection.hidden = true;
      return;
    }

    const sets = await listActiveSetsForLifts(currentLifts.map((l) => l.id));
    const setsByLift = new Map(currentLifts.map((l) => [l.id, []]));
    for (const s of sets) {
      const bucket = setsByLift.get(s.lift_id);
      if (bucket) bucket.push(s);
    }

    const liftsData = currentLifts.map((lift) => ({
      liftId: lift.id,
      dailySeries: dailyMaxE1RM(setsByLift.get(lift.id) || []),
    }));

    renderLiftRows(liftsData);
    renderComposite(liftsData);
  }

  function renderComposite(liftsData) {
    const points = computeComposite(liftsData);
    compositeSection.hidden = false;
    const canvas = root.querySelector('[data-composite-canvas]');
    const emptyEl = root.querySelector('[data-composite-empty]');
    if (points.length === 0) {
      canvas.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    canvas.hidden = false;
    emptyEl.hidden = true;
    renderCompositeChart(canvas, points);
  }

  function renderLiftRows(liftsData) {
    const seriesByLift = new Map(liftsData.map((l) => [l.liftId, l.dailySeries]));

    listEl.innerHTML = currentLifts
      .map((lift) => {
        const series = seriesByLift.get(lift.id) || [];
        const last = series[series.length - 1];
        const lastLabel = last ? `${Math.round(last.e1rm)} lb e1RM` : 'No sets yet';
        return `
          <li class="lt-lift-row" data-reorder-item="${lift.id}" data-lift-id="${lift.id}">
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${escapeAttr(lift.name)}">&#8942;&#8942;</button>
            <button type="button" class="lt-lift-row-main" data-open-lift="${lift.id}">
              <span class="lt-lift-name" data-name-slot></span>
              <span class="lt-lift-last">${lastLabel}</span>
            </button>
            <button type="button" class="lt-lift-delete" data-delete-lift="${lift.id}" aria-label="Delete ${escapeAttr(lift.name)}">&times;</button>
          </li>
        `;
      })
      .join('');

    // Names are free text from the user — set via textContent, never innerHTML.
    for (const lift of currentLifts) {
      const row = listEl.querySelector(`[data-lift-id="${lift.id}"]`);
      const nameSlot = row?.querySelector('[data-name-slot]');
      if (nameSlot) nameSlot.textContent = lift.name;
    }

    listEl.querySelectorAll('[data-open-lift]').forEach((btn) => {
      btn.addEventListener('click', () => goToLift(btn.dataset.openLift));
    });

    listEl.querySelectorAll('[data-delete-lift]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.deleteLift;
        const lift = currentLifts.find((l) => l.id === id);
        await softDeleteLift(id);
        await load();
        showUndoToast(`Deleted "${lift.name}"`, {
          onUndo: async () => {
            await restoreLift(id);
            await load();
          },
        });
      });
    });
  }

  function escapeAttr(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  await load();
}
