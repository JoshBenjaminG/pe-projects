// Body-weight tracking: a compact summary card (rendered into the main list
// view) plus a full expanded view (its own route, see state.js's
// goToWeight/parseRoute) for logging, editing, and deleting entries. Mirrors
// the same patterns used for lifts/sets (soft delete + undo toast, inline
// edit-in-place in a history list) but for a single weight+date pair instead
// of weight+reps.
//
// Weight and waist circumference are deliberately independent: separate
// tables (body_weight / waist_measurements, see api.js), separate log
// forms, separate history lists and charts on the Weight/Waist tabs below.
// Logging one never requires the other, and a tab never shows a value for
// a date where that specific measurement wasn't actually logged.
import {
  listWeightEntries,
  createWeightEntry,
  updateWeightEntry,
  softDeleteWeightEntry,
  restoreWeightEntry,
  listWaistEntries,
  createWaistEntry,
  updateWaistEntry,
  softDeleteWaistEntry,
  restoreWaistEntry,
} from '../api.js';
import { dailyWeightSeries, dailyWaistSeries, weightSummary, toDateKey } from '../math.js';
import { renderWeightChart, destroyWeightChart, renderWaistChart, destroyWaistChart } from '../charts.js';
import { showUndoToast } from '../toast.js';
import { goToList } from '../state.js';
import { readBoolPref, writeBoolPref } from '../prefs.js';
import { DISCOVERY_FEATURES, markDiscoverySeen } from '../discovery.js';

const WEIGHT_CARD_EXPANDED_PREF_KEY = 'lt-weight-card-expanded';

/** Trims to at most one decimal place, dropping a trailing ".0". Shared by
 * both weight (lb) and waist (in) display -- same rounding rule, the unit
 * label is added separately at each call site. */
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
 * Renders the compact card shown on the main list view. Defaults to
 * collapsed (showing just Current + Change) the first time, then remembers
 * whichever state the chevron toggle was last left in (via a cookie) across
 * sessions. Expanded shows Start / Current / Change. No chart here -- this
 * is a glance card; charts live on the full weight page's tabs instead.
 * Separately, the arrow button (onExpand) navigates to the full weight
 * view for logging/editing/deleting entries.
 */
export async function renderWeightSummaryCard(container, { onExpand, showDiscovery = false } = {}) {
  container.classList.remove('lt-stats-row-expanded');
  container.innerHTML = `
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `;
  container.querySelector('[data-weight-expand]').addEventListener('click', () => {
    if (onExpand) onExpand();
  });

  const entries = await listWeightEntries();
  const series = dailyWeightSeries(entries);
  const summary = weightSummary(series);
  const discoveryBadge = showDiscovery && entries.length === 0
    ? '<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>'
    : '';

  if (!summary) {
    container.innerHTML = `
      <div class="lt-weight-card-header">
        <h2>Weight ${discoveryBadge}</h2>
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
  // Defaults to collapsed if nothing's been saved yet (matching the
  // previous fixed behavior) -- whichever state the user leaves it in is
  // the state it opens back up in next time, same idea as the composite
  // progress toggle on the list view.
  let expanded = readBoolPref(WEIGHT_CARD_EXPANDED_PREF_KEY, false);

  // Collapsed and expanded states use different layouts (one tight single
  // row vs. a header row plus a stats row below), so the whole card markup
  // is rebuilt on toggle rather than just swapping a body div's contents.
  function draw() {
    container.classList.toggle('lt-stats-row-expanded', expanded);
    if (!expanded) {
      // Shares a row with the composite card, so just the bare current
      // weight shows here -- Start/Change still live in the expanded view
      // below and on the full weight page.
      // No separate "open full page" arrow here -- at half the row's
      // width there isn't room for toggle + value + a second button, so
      // tapping this row only expands inline; the arrow comes back once
      // expanded below.
      // The value sits inside the same <button> as the "Weight" label
      // (rather than as a separate sibling) so the whole row is one tap
      // target -- previously only the label half responded to taps, and
      // the value half (where a thumb naturally lands) did nothing.
      container.innerHTML = `
        <div class="lt-weight-card-row-collapsed">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="false">
            <span class="lt-weight-toggle-label">
              <span>Weight</span>
              ${discoveryBadge}
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${formatWeight(summary.current)} lbs</span>
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            ${discoveryBadge}
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
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
          <div class="lt-chart-wrap">
            <canvas data-home-weight-canvas></canvas>
          </div>
        </div>
      `;
    }

    // Only present in the expanded markup now (see comment above) --
    // optional chaining since the collapsed row no longer has one.
    container.querySelector('[data-weight-expand]')?.addEventListener('click', () => {
      if (onExpand) onExpand();
    });
    container.querySelector('[data-weight-toggle]').addEventListener('click', () => {
      // Below 360px there isn't room to expand inline without the page
      // layout jumping around -- send those screens straight to the full
      // weight page instead (same threshold as the composite toggle).
      if (window.matchMedia('(max-width: 359px)').matches) {
        if (onExpand) onExpand();
        return;
      }
      expanded = !expanded;
      writeBoolPref(WEIGHT_CARD_EXPANDED_PREF_KEY, expanded);
      draw();
    });

    // The chart only exists in the expanded markup above -- render it into
    // the freshly-created canvas now that it's actually in the DOM (Chart.js
    // needs a real, visible canvas to size itself against), and tear down
    // any previous instance otherwise so it's not left attached to a canvas
    // that just got thrown away by the collapsed markup.
    if (expanded) {
      renderWeightChart(container.querySelector('[data-home-weight-canvas]'), series);
    } else {
      destroyWeightChart();
    }
  }

  draw();
}

/**
 * Full expanded view: a Weight tab and a Waist tab, each fully
 * self-contained -- its own log form, its own chart, its own history list
 * with its own inline edit/delete. They don't share a form or a table, so
 * neither measurement ever requires or implies the other.
 */
export async function renderWeightView(root) {
  markDiscoverySeen(DISCOVERY_FEATURES.weight);

  root.innerHTML = `
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Weight</h1>
    </header>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="weight" role="tab" aria-selected="true">Weight</button>
      <button type="button" class="lt-tab" data-tab="waist" role="tab" aria-selected="false">Waist</button>
    </div>

    <section data-tab-panel="weight">
      <form class="lt-quick-log" data-weight-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Date</span>
            <input type="date" name="date" required data-weight-date-input />
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
    </section>

    <section data-tab-panel="waist" hidden>
      <form class="lt-quick-log" data-waist-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Date</span>
            <input type="date" name="date" required data-waist-date-input />
          </label>
          <label class="lt-field">
            <span>Waist (in)</span>
            <input type="number" inputmode="decimal" step="0.1" min="0" name="waist" required data-waist-input />
          </label>
        </div>
        <button type="submit" class="lt-log-btn">Log waist</button>
      </form>

      <div class="lt-chart-wrap" data-waist-chart-section>
        <canvas data-waist-canvas></canvas>
      </div>
      <p class="lt-empty" data-waist-empty hidden>No waist measurements yet — add your first one above.</p>

      <ul class="lt-history-list" data-waist-history></ul>
    </section>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

  // ---- Tabs ----
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = {
    weight: root.querySelector('[data-tab-panel="weight"]'),
    waist: root.querySelector('[data-tab-panel="waist"]'),
  };
  let activeTab = 'weight';

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === activeTab) return;
      activeTab = tab.dataset.tab;
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      Object.entries(panels).forEach(([key, panel]) => {
        panel.hidden = key !== activeTab;
      });
      // Chart.js needs its canvas to actually be visible (non-zero size)
      // at creation time or it sizes itself wrong -- so each tab's chart
      // is (re-)rendered here, the moment that tab becomes visible, same
      // lazy-render-on-switch approach as the lift detail page's Details
      // tab.
      if (activeTab === 'weight') renderWeightChartIfVisible();
      else ensureWaistLoaded().catch((err) => console.error('[lift-tracker]', err));
    });
  });

  // ============================================================
  // Weight tab
  // ============================================================
  const weightForm = root.querySelector('[data-weight-form]');
  const weightDateInput = root.querySelector('[data-weight-date-input]');
  const weightInput = root.querySelector('[data-weight-input]');
  const weightChartSection = root.querySelector('[data-weight-chart-section]');
  const weightCanvas = root.querySelector('[data-weight-canvas]');
  const weightEmptyEl = root.querySelector('[data-weight-empty]');
  const weightHistoryEl = root.querySelector('[data-weight-history]');

  // Defaults to today; the user can edit it to backfill a past weigh-in.
  weightDateInput.value = toDateKey(new Date().toISOString());

  let weightEntries = [];

  async function loadWeight() {
    weightEntries = await listWeightEntries();
    renderWeightHistory();
    renderWeightChartIfVisible();
  }

  function renderWeightChartIfVisible() {
    const series = dailyWeightSeries(weightEntries);
    if (series.length === 0) {
      weightChartSection.hidden = true;
      weightEmptyEl.hidden = false;
      destroyWeightChart();
      return;
    }
    weightChartSection.hidden = false;
    weightEmptyEl.hidden = true;
    if (!panels.weight.hidden) renderWeightChart(weightCanvas, series);
  }

  function renderWeightHistory() {
    if (weightEntries.length === 0) {
      weightHistoryEl.innerHTML = '';
      return;
    }
    const sorted = weightEntries.slice().sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at));
    weightHistoryEl.innerHTML = sorted
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

    weightHistoryEl.querySelectorAll('[data-edit-trigger]').forEach((el) => {
      el.addEventListener('click', () => openWeightEntryEditor(el.dataset.editTrigger));
    });
  }

  function openWeightEntryEditor(entryId) {
    const row = weightHistoryEl.querySelector(`[data-entry-id="${entryId}"]`);
    const entry = weightEntries.find((e) => e.id === entryId);
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

    row.querySelector('[data-edit-cancel]').addEventListener('click', renderWeightHistory);

    row.querySelector('[data-edit-delete]').addEventListener('click', async () => {
      if (!window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")) {
        return;
      }
      await softDeleteWeightEntry(entryId);
      await loadWeight();
      showUndoToast('Weight entry deleted', {
        onUndo: async () => {
          await restoreWeightEntry(entryId);
          await loadWeight();
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
      await loadWeight();
    });
  }

  weightForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const weight = Number(weightInput.value);
    const dateVal = weightDateInput.value;
    if (!(weight >= 0) || !Number.isFinite(weight) || !dateVal) return;

    const [y, m, d] = dateVal.split('-').map(Number);
    const loggedAt = new Date();
    loggedAt.setFullYear(y, m - 1, d);

    await createWeightEntry(weight, loggedAt.toISOString());
    weightInput.value = '';
    weightInput.focus();
    weightDateInput.value = toDateKey(new Date().toISOString());

    await loadWeight();
  });

  // ============================================================
  // Waist tab
  // ============================================================
  const waistForm = root.querySelector('[data-waist-form]');
  const waistDateInput = root.querySelector('[data-waist-date-input]');
  const waistInput = root.querySelector('[data-waist-input]');
  const waistChartSection = root.querySelector('[data-waist-chart-section]');
  const waistCanvas = root.querySelector('[data-waist-canvas]');
  const waistEmptyEl = root.querySelector('[data-waist-empty]');
  const waistHistoryEl = root.querySelector('[data-waist-history]');

  waistDateInput.value = toDateKey(new Date().toISOString());

  let waistEntries = [];
  let waistLoaded = false;
  let waistLoadPromise = null;

  async function loadWaist() {
    waistEntries = await listWaistEntries();
    waistLoaded = true;
    renderWaistHistory();
    renderWaistChartIfVisible();
  }

  async function ensureWaistLoaded() {
    if (waistLoaded) {
      renderWaistChartIfVisible();
      return;
    }
    if (!waistLoadPromise) {
      waistEmptyEl.hidden = false;
      waistEmptyEl.textContent = 'Loading waist...';
      waistChartSection.hidden = true;
      waistLoadPromise = loadWaist().finally(() => {
        waistLoadPromise = null;
      });
    }
    await waistLoadPromise;
  }

  function renderWaistChartIfVisible() {
    const series = dailyWaistSeries(waistEntries);
    if (series.length === 0) {
      waistChartSection.hidden = true;
      waistEmptyEl.hidden = false;
      waistEmptyEl.textContent = 'No waist measurements yet — add your first one above.';
      destroyWaistChart();
      return;
    }
    waistChartSection.hidden = false;
    waistEmptyEl.hidden = true;
    if (!panels.waist.hidden) renderWaistChart(waistCanvas, series);
  }

  function renderWaistHistory() {
    if (waistEntries.length === 0) {
      waistHistoryEl.innerHTML = '';
      return;
    }
    const sorted = waistEntries.slice().sort((a, b) => new Date(b.logged_at) - new Date(a.logged_at));
    waistHistoryEl.innerHTML = sorted
      .map(
        (e) => `
          <li class="lt-history-row" data-entry-id="${e.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${e.id}">
              <span class="lt-history-weight">${formatWeight(Number(e.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${formatLongDate(toDateKey(e.logged_at))}</span>
            </button>
          </li>
        `
      )
      .join('');

    waistHistoryEl.querySelectorAll('[data-edit-trigger]').forEach((el) => {
      el.addEventListener('click', () => openWaistEntryEditor(el.dataset.editTrigger));
    });
  }

  function openWaistEntryEditor(entryId) {
    const row = waistHistoryEl.querySelector(`[data-entry-id="${entryId}"]`);
    const entry = waistEntries.find((e) => e.id === entryId);
    if (!row || !entry) return;

    row.innerHTML = `
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${entry.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${toDateKey(entry.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `;

    row.querySelector('[data-edit-cancel]').addEventListener('click', renderWaistHistory);

    row.querySelector('[data-edit-delete]').addEventListener('click', async () => {
      if (!window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")) {
        return;
      }
      await softDeleteWaistEntry(entryId);
      await loadWaist();
      showUndoToast('Waist measurement deleted', {
        onUndo: async () => {
          await restoreWaistEntry(entryId);
          await loadWaist();
        },
      });
    });

    row.querySelector('[data-edit-form]').addEventListener('submit', async (e) => {
      e.preventDefault();
      const waistCircumference = Number(row.querySelector('[data-edit-waist]').value);
      const dateVal = row.querySelector('[data-edit-date]').value;
      if (!(waistCircumference >= 0) || !dateVal) return;

      // Keep original time-of-day; only the calendar date changes.
      const existing = new Date(entry.logged_at);
      const [y, m, d] = dateVal.split('-').map(Number);
      existing.setFullYear(y, m - 1, d);

      await updateWaistEntry(entryId, { waist_circumference: waistCircumference, logged_at: existing.toISOString() });
      await loadWaist();
    });
  }

  waistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const waistCircumference = Number(waistInput.value);
    const dateVal = waistDateInput.value;
    if (!(waistCircumference >= 0) || !Number.isFinite(waistCircumference) || !dateVal) return;

    const [y, m, d] = dateVal.split('-').map(Number);
    const loggedAt = new Date();
    loggedAt.setFullYear(y, m - 1, d);

    await createWaistEntry(waistCircumference, loggedAt.toISOString());
    waistInput.value = '';
    waistInput.focus();
    waistDateInput.value = toDateKey(new Date().toISOString());

    await loadWaist();
  });

  await loadWeight();
}
