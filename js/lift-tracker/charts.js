// Thin wrappers around Chart.js (loaded globally via a CDN <script> tag in
// workout.php — see SKILL/spec notes for why it's a global vs. an ESM import).
// Both render functions destroy any previous instance bound to the canvas
// before creating a new one, since the SPA re-renders whole view containers
// (and therefore creates fresh <canvas> elements) rather than patching DOM.
//
// Colors match the dark/red theme in css/lift-tracker.css. Chart.js draws
// its own canvas content rather than styleable DOM, so these can't just be
// CSS variables — they're kept here as the JS-side equivalents of
// --lt-accent / --lt-gold / --lt-text-muted from that file.

let compositeChart = null;
let liftChart = null;

const POINT_HIT_RADIUS = 14; // generous tap target for mobile

const COLOR_ACCENT = '#e8242c'; // --lt-accent
const COLOR_ACCENT_SOFT = 'rgba(232, 36, 44, 0.18)'; // --lt-accent-soft, slightly stronger for fill-on-dark
const COLOR_GOLD = '#f2b134'; // --lt-gold
const COLOR_GOLD_SOFT = 'rgba(242, 177, 52, 0.16)';
const COLOR_TEXT_MUTED = '#9a9ca6'; // --lt-text-muted
const COLOR_GRID = 'rgba(255, 255, 255, 0.08)';

export function renderCompositeChart(canvas, points, { onPointClick } = {}) {
  if (compositeChart) {
    compositeChart.destroy();
    compositeChart = null;
  }

  const labels = points.map((p) => p.date);
  const data = points.map((p) => Math.round(p.pct * 10) / 10);

  compositeChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Composite progress',
          data,
          borderColor: COLOR_ACCENT,
          backgroundColor: COLOR_ACCENT_SOFT,
          fill: true,
          tension: 0.25,
          pointRadius: 3,
          pointBackgroundColor: COLOR_ACCENT,
          pointHitRadius: POINT_HIT_RADIUS,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: {
          ticks: { color: COLOR_TEXT_MUTED },
          grid: { color: COLOR_GRID },
        },
        y: {
          ticks: {
            color: COLOR_TEXT_MUTED,
            callback: (v) => `${v > 0 ? '+' : ''}${v}%`,
          },
          grid: { color: COLOR_GRID },
        },
      },
      plugins: { legend: { display: false } },
      onClick: (evt, elements) => {
        if (elements.length && onPointClick) onPointClick(points[elements[0].index]);
      },
    },
  });
  return compositeChart;
}

export function renderLiftChart(canvas, points, { onPointClick } = {}) {
  if (liftChart) {
    liftChart.destroy();
    liftChart = null;
  }

  const labels = points.map((p) => p.date);
  const data = points.map((p) => Math.round(p.e1rm * 10) / 10);

  liftChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Estimated 1RM',
          data,
          borderColor: COLOR_GOLD,
          backgroundColor: COLOR_GOLD_SOFT,
          fill: true,
          tension: 0.25,
          pointRadius: 4,
          pointBackgroundColor: COLOR_GOLD,
          pointHitRadius: POINT_HIT_RADIUS,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: {
          ticks: { color: COLOR_TEXT_MUTED },
          grid: { color: COLOR_GRID },
        },
        y: {
          ticks: { color: COLOR_TEXT_MUTED },
          grid: { color: COLOR_GRID },
        },
      },
      plugins: { legend: { display: false } },
      onClick: (evt, elements) => {
        if (elements.length && onPointClick) onPointClick(points[elements[0].index]);
      },
    },
  });
  return liftChart;
}

export function destroyLiftChart() {
  if (liftChart) {
    liftChart.destroy();
    liftChart = null;
  }
}
