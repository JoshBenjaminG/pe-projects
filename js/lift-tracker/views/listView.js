import {
  listLifts,
  createLift,
  softDeleteLift,
  restoreLift,
  reorderLifts,
  listActiveSetsForLifts,
} from '../api.js';
import { dailyMaxE1RM, computeComposite } from '../math.js';
import { renderCompositeChart } from '../charts.js';
import { enableDragReorder } from '../dragReorder.js';
import { showUndoToast } from '../toast.js';
import { goToLift, goToHelp, goToWeight } from '../state.js';
import { supabase } from '../supabaseClient.js';
import { openFeedbackModal } from './feedbackModal.js';
import { weeklyKillstreak } from '../killstreak.js';
import { renderWeightSummaryCard } from './weightView.js';

export async function renderListView(root) {
  root.innerHTML = `
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-actions">
        <button type="button" class="lt-feedback-btn" data-feedback-btn>Feedback</button>
        <button type="button" class="lt-logout-btn" data-logout-btn>Log out</button>
        <button type="button" class="lt-help-btn" data-help-btn aria-label="Help">?</button>
      </div>
    </header>

    <section class="lt-killstreak" data-killstreak-section>
      <span class="lt-killstreak-icon" data-killstreak-icon>&#127919;</span>
      <span class="lt-killstreak-info">
        <span class="lt-killstreak-label" data-killstreak-label>No killstreak yet</span>
        <span class="lt-killstreak-sub" data-killstreak-sub>Log a workout to start your streak this week</span>
      </span>
    </section>

    <section class="lt-weight-card" data-weight-card></section>

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

  const helpBtn = root.querySelector('[data-help-btn]');
  helpBtn.addEventListener('click', goToHelp);

  const feedbackBtn = root.querySelector('[data-feedback-btn]');
  feedbackBtn.addEventListener('click', () => openFeedbackModal());

  const logoutBtn = root.querySelector('[data-logout-btn]');
  logoutBtn.addEventListener('click', () => supabase.auth.signOut());

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

  const killstreakIcon = root.querySelector('[data-killstreak-icon]');
  const killstreakLabel = root.querySelector('[data-killstreak-label]');
  const killstreakSub = root.querySelector('[data-killstreak-sub]');

  function renderKillstreak(sets) {
    const { days, tier } = weeklyKillstreak(sets);
    killstreakIcon.textContent = tier ? tier.icon : '\u{1F3AF}';
    killstreakLabel.textContent = tier ? tier.label : 'No killstreak yet';
    killstreakSub.textContent = tier
      ? `${days} workout ${days === 1 ? 'day' : 'days'} this week`
      : 'Log a workout to start your streak this week';
  }

  const weightCard = root.querySelector('[data-weight-card]');
  renderWeightSummaryCard(weightCard, { onExpand: goToWeight });

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
      renderKillstreak([]);
      return;
    }

    const sets = await listActiveSetsForLifts(currentLifts.map((l) => l.id));
    renderKillstreak(sets);
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
        if (!window.confirm(`Delete "${lift.name}"? You'll have a few seconds to undo it after.`)) {
          return;
        }
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
