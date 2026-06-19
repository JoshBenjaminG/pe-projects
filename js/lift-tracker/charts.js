// Thin wrappers around Chart.js (loaded globally via a CDN <script> tag in
// workout.php — see SKILL/spec notes for why it's a global vs. an ESM import).
// Both render functions destroy any previous instance bound to the canvas
// before creating a new one, since the SPA re-renders whole view containers
// (and therefore creates fresh <canvas> elements) rather than patching DOM.

let compositeChart = null;
let liftChart = null;

const POINT_HIT_RADIUS = 14; // generous tap target for mobile

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
          borderColor: '#2c7be5',
          backgroundColor: 'rgba(44,123,229,0.12)',
          fill: true,
          tension: 0.25,
          pointRadius: 3,
          pointHitRadius: POINT_HIT_RADIUS,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        y: { ticks: { callback: (v) => `${v > 0 ? '+' : ''}${v}%` } },
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
          borderColor: '#e8590c',
          backgroundColor: 'rgba(232,89,12,0.12)',
          fill: true,
          tension: 0.25,
          pointRadius: 4,
          pointHitRadius: POINT_HIT_RADIUS,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
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
