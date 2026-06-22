// Body-weight tracking: a compact summary card (rendered into the main list
// view) plus a full expanded view (its own route, see state.js's
// goToWeight/parseRoute) for logging, editing, and deleting entries. Mirrors
// the same patterns used for lifts/sets (soft delete + undo toast, inline
// edit-in-place in a history list) but for a single weight+date pair instead
// of weight+reps.
import {
  listWeightEntries,
  createWeightEntry,
  updateWeightEntry,
  softDeleteWeightEntry,
  restoreWeightEntry,
} from '../api.js';
import { dailyWeightSeries, weightSummary, toDateKey } from '../math.js';
import { renderWeightChart, destroyWeightChart } from '../charts.js';
import { showUndoToast } from '../toast.js';
import { goToList } from '../state.js';

/** Trims to at most one decimal place, dropping a trailing ".0". */
function formatWeight(n) {
  const rounded = Math.round(n * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1);
}

/** "YYYY-MM-DD" -> "M/D", e.g. for the compact summary card. */
function formatShortDate(dateKey) {
  const [, m, d] = dateKey.split('-');
  return `${Number(m)}/${Number(d)}`;
}

/** "YYYY-MM-DD" -> "Mon, Jun 22", e.g. for the full history list. */
function formatLongDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Renders the compact card shown on the main list view. Starts collapsed —
 * showing just Current + Change — and expands in place (via the chevron
 * toggle) to show Start / Current / Change plus the all-time chart.
 * Separately, the arrow button (onExpand) navigates to the full weight
 * view for logging/editing/deleting entries.
 */
export async function renderWeightSummaryCard(container, { onExpand } = {}) {
  const entries = await listWeightEntries();
  const series = dailyWeightSeries(entries);
  const summary = weightSummary(series);

  if (!summary) {
    container.innerHTML = `
      <div class="lt-weight-card-header">
        <h2>Weight</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `;
    container.querySelector('[data-weight-expand]').addEventListener('click', () => {
      if (onExpand) onExpand();
    });
    return;
  }

  const arrow = summary.change < 0 ? '↘' : summary.change > 0 ? '↗' : '→';
  let expanded = false;

  // Collapsed and expanded states use different layouts (one tight single
  // row vs. a header row plus a full-width body row for the chart), so the
  // whole card markup is rebuilt on toggle rather than just swapping a body
  // div's contents in place.
  function draw() {
    if (!expanded) {
      container.innerHTML = `
        <div class="lt-weight-card-row-collapsed">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="false">
            <span>Weight</span>
            <span class="lt-chevron" data-weight-chevron>&#9660;</span>
          </button>
          <div class="lt-weight-stats lt-weight-stats-collapsed">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${formatShortDate(summary.currentDate)})</span>
              <span class="lt-weight-stat-value">${formatWeight(summary.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${arrow} ${formatWeight(Math.abs(summary.change))} lbs</span>
            </div>
          </div>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-row">
            <div class="lt-weight-stats">
              <div class="lt-weight-stat">
                <span class="lt-weight-stat-label">Start</span>
                <span class="lt-weight-stat-value">${formatWeight(summary.start)} lbs</span>
              </div>
              <div class="lt-weight-stat">
                <span class="lt-weight-stat-label">Current (${formatShortDate(summary.currentDate)})</span>
                <span class="lt-weight-stat-value">${formatWeight(summary.current)} lbs</span>
              </div>
              <div class="lt-weight-stat">
                <span class="lt-weight-stat-label">Change</span>
                <span class="lt-weight-stat-value">${arrow} ${formatWeight(Math.abs(summary.change))} lbs</span>
              </div>
            </div>
            <div class="lt-chart-wrap lt-weight-chart-wrap"><canvas data-weight-canvas></canvas></div>
          </div>
        </div>
      `;
      // Mini chart on this card: drop the year from x-axis labels/tooltips
      // (e.g. "6/22" not "2026-06-22") since it's a compact "glance" view —
      // the full weight page's chart keeps the year for clarity over a
      // longer history.
      const shortLabelSeries = series.map((p) => ({ ...p, date: formatShortDate(p.date) }));
      renderWeightChart(container.querySelector('[data-weight-canvas]'), shortLabelSeries);
    }

    container.querySelector('[data-weight-expand]').addEventListener('click', () => {
      if (onExpand) onExpand();
    });
    container.querySelector('[data-weight-toggle]').addEventListener('click', () => {
      expanded = !expanded;
      if (!expanded) destroyWeightChart();
      draw();
    });
  }

  draw();
}

/** Full expanded view: add/edit/delete entries, all-time chart, history list. */
export async function renderWeightView(root) {
  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Weight</h1>
    </header>

    <form class="lt-quick-log" data-weight-form>
      <div class="lt-quick-log-fields">
        <label class="lt-field">
          <span>Date</span>
          <input type="date" name="date" required data-date-input />
        </label>
        <label class="lt-field">
          <span>Weight (lb)</span>
          <input type="number" inputmode="decimal" step="0.1" min="0" name="weight" required data-weight-input />
        </label>
      </div>
      <button type="submit" class="lt-log-btn">Log weight</button>
    </form>

    <div class="lt-chart-wrap" data-weight-chart-section>
      <canvas data-weight-canvas></canvas>
    </div>
    <p class="lt-empty" data-weight-empty hidden>No weight entries yet — add your first one above.</p>

    <ul class="lt-history-list" data-weight-history></ul>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  const form = root.querySelector('[data-weight-form]');
  const dateInput = root.querySelector('[data-date-input]');
  const weightInput = root.querySelector('[data-weight-input]');
  const chartSection = root.querySelector('[data-weight-chart-section]');
  const canvas = root.querySelector('[data-weight-canvas]');
  const emptyEl = root.querySelector('[data-weight-empty]');
  const historyEl = root.querySelector('[data-weight-history]');

  // Defaults to today; the user can edit it to backfill a past weigh-in.
  dateInput.value = toDateKey(new Date().toISOString());

  let entries = [];

  async function load() {
    entries = await listWeightEntries();
    renderChart();
    renderHistory();
  }

  function renderChart() {
    const series = dailyWeightSeries(entries);
    if (series.length === 0) {
      chartSection.hidden = true;
      emptyEl.hidden = false;
      destroyWeightChart();
      return;
    }
    chartSection.hidden = false;
    emptyEl.hidden = true;
    renderWeightChart(canvas, series);
  }

  function renderHistory() {
    if (entries.length === 0) {
      historyEl.innerHTML = '';
      return;
    }
    const sorted = entries.slice().sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at));
    historyEl.innerHTML = sorted
      .map(
        (e) => `
          <li class="lt-history-row" data-entry-id="${e.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${e.id}">
              <span class="lt-history-weight">${formatWeight(Number(e.weight))} lb</span>
              <span class="lt-history-e1rm">${formatLongDate(toDateKey(e.logged_at))}</span>
            </button>
          </li>
        `
      )
      .join('');

    historyEl.querySelectorAll('[data-edit-trigger]').forEach((el) => {
      el.addEventListener('click', () => openEntryEditor(el.dataset.editTrigger));
    });
  }

  function findHistoryRow(entryId) {
    return historyEl.querySelector(`[data-entry-id="${entryId}"]`);
  }

  function openEntryEditor(entryId) {
    const row = findHistoryRow(entryId);
    const entry = entries.find((e) => e.id === entryId);
    if (!row || !entry) return;

    row.innerHTML = `
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${entry.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${toDateKey(entry.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `;

    row.querySelector('[data-edit-cancel]').addEventListener('click', renderHistory);

    row.querySelector('[data-edit-delete]').addEventListener('click', async () => {
      if (!window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")) {
        return;
      }
      await softDeleteWeightEntry(entryId);
      await load();
      showUndoToast('Weight entry deleted', {
        onUndo: async () => {
          await restoreWeightEntry(entryId);
          await load();
        },
      });
    });

    row.querySelector('[data-edit-form]').addEventListener('submit', async (e) => {
      e.preventDefault();
      const weight = Number(row.querySelector('[data-edit-weight]').value);
      const dateVal = row.querySelector('[data-edit-date]').value;
      if (!(weight >= 0) || !dateVal) return;

      // Keep original time-of-day; only the calendar date changes.
      const existing = new Date(entry.logged_at);
      const [y, m, d] = dateVal.split('-').map(Number);
      existing.setFullYear(y, m - 1, d);

      await updateWeightEntry(entryId, { weight, logged_at: existing.toISOString() });
      await load();
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weight = Number(weightInput.value);
    const dateVal = dateInput.value;
    if (!(weight >= 0) || !Number.isFinite(weight) || !dateVal) return;

    const [y, m, d] = dateVal.split('-').map(Number);
    const loggedAt = new Date();
    loggedAt.setFullYear(y, m - 1, d);

    await createWeightEntry(weight, loggedAt.toISOString());
    weightInput.value = '';
    weightInput.focus();
    dateInput.value = toDateKey(new Date().toISOString());

    await load();
  });

  await load();
}
