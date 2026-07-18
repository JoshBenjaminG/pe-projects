import { listActiveSetsForLifts, listLifts } from '../api.js';
import { recentPRs } from '../math.js';
import { goToLift, goToList } from '../state.js';

export async function renderPRsView(root) {
  const lifts = await listLifts();
  const sets = lifts.length ? await listActiveSetsForLifts(lifts.map((lift) => lift.id)) : [];
  const liftsById = new Map(lifts.map((lift) => [lift.id, lift]));
  const prs = recentPRs(sets).slice(0, 40);

  root.innerHTML = `
    <header class="lt-weight-view-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Recent PRs</h1>
    </header>

    <section class="lt-prs-section">
      <h2 class="lt-prs-heading">Personal Records</h2>
      <p class="lt-composite-blurb">
        These are sets that beat that lift's previous best estimated 1RM. Your first set on a lift starts the baseline; later jumps show here.
      </p>
      ${prs.length ? `
        <div class="lt-pr-list">
          ${prs.map((pr) => renderPRCard(pr, liftsById.get(pr.liftId))).join('')}
        </div>
      ` : `
        <p class="lt-empty">No PRs yet. Log a few sessions for the same lift and new records will collect here.</p>
      `}
    </section>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);
  root.querySelectorAll('[data-open-lift]').forEach((btn) => {
    btn.addEventListener('click', () => goToLift(btn.dataset.openLift));
  });
}

export function renderPRCard(pr, lift) {
  const liftName = lift?.name || 'Lift';
  return `
    <article class="lt-pr-card">
      <button type="button" class="lt-pr-card-main" data-open-lift="${escapeAttr(pr.liftId)}">
        <span class="lt-pr-card-title">${escapeHtml(liftName)}</span>
        <span class="lt-pr-card-sub">${formatDate(pr.performed_at)} · ${formatSet(pr)} · ${Math.round(pr.e1rm)} e1RM</span>
      </button>
      <span class="lt-pr-card-side">+${Math.max(1, Math.round(pr.improvement))}</span>
    </article>
  `;
}

export function renderLiftPRRows(prs) {
  if (prs.length === 0) {
    return '<p class="lt-lift-prs-empty">No PRs yet. Keep logging this lift to build a record trail.</p>';
  }
  return prs.map((pr) => `
    <article class="lt-lift-pr-row">
      <span>
        <strong>${formatSet(pr)}</strong>
        <small>${formatDate(pr.performed_at)} · ${Math.round(pr.e1rm)} e1RM</small>
      </span>
      <em>+${Math.max(1, Math.round(pr.improvement))}</em>
    </article>
  `).join('');
}

function formatSet(pr) {
  return `${formatNumber(pr.weight)} lb x ${formatNumber(pr.reps)}`;
}

function formatNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function escapeAttr(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function escapeHtml(str) {
  return escapeAttr(str);
}
