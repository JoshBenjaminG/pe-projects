// Static "how to use this" page. No Supabase calls, no state beyond the
// back button — same single-PHP-page hash-routing pattern as the other
// views (see state.js), just with nothing to fetch.
import { goToList } from '../state.js';
import { listLifts, listActiveSetsForLifts, listRecentSetsForLifts } from '../api.js';
import { buildExportText, exportWindowStart } from '../export.js';

const SECTIONS = [
  {
    title: 'Weekly killstreak',
    body: `The banner at the top of the list shows a Call of Duty–style
      killstreak based on how many different days you've logged a workout
      this week (Sunday through Saturday). 1 day earns a UAV, 2 days a
      Predator Missile, 3 days a Harrier Strike, and 4 or more days a
      Chopper Gunner. It resets on its own every Sunday — nothing to do.`,
  },
  {
    title: 'Export progress',
    body: `Tap "Export progress (last 60 days)" below to expand a plain-text
      summary of every set you've logged in the last 60 days, grouped by
      lift, with volume and estimated 1-rep max. Tap "Copy to clipboard" to
      grab it — useful for pasting into Claude or anywhere else you want
      feedback on your progress. Need older data? Use "Export full history"
      right below instead.`,
  },
  {
    title: 'Composite progress',
    body: `A chart combining every lift's estimated 1-rep max into one
      normalized trend line, so you can see overall strength progress at
      a glance instead of checking each lift one at a time.`,
  },
  {
    title: 'Adding a lift',
    body: `Type a name into "New lift name" near the bottom of the list
      and tap "+ Add Lift".`,
  },
  {
    title: 'Reordering lifts',
    body: `Press and drag the handle on the left side of a lift row to
      move it up or down the list.`,
  },
  {
    title: 'Deleting a lift',
    body: `Tap the × on the right side of a lift row. You'll have a few
      seconds to tap "Undo" before it's gone for good.`,
  },
  {
    title: 'Logging a set',
    body: `Tap a lift to open it. The weight field automatically fills in
      with the last weight you logged for that lift — enter your reps and
      tap "Log set" (change the weight first if you're lifting something
      different). You'll see a note if the set is a new estimated 1-rep
      max PR.`,
  },
  {
    title: 'History tab',
    body: `Shows every set you've logged for this lift, grouped by date,
      with that day's total volume. Tap any set to edit its weight, reps,
      or date, or to delete it (with the same undo safety net).`,
  },
  {
    title: 'Details tab',
    body: `A chart of this lift's estimated 1-rep max over time. Tap a
      point on the chart to see the exact weight and reps behind it.`,
  },
  {
    title: 'Renaming a lift',
    body: `On a lift's page, tap its name at the top and type a new one.
      It saves automatically when you tap away or press Enter.`,
  },
];

// The "Export progress" section gets both export panels inserted right
// after its description, in place — same position it would occupy if it
// were just another static SECTIONS entry. The 60-day panel used to live on
// the main list view; the full-history panel used to sit at the very bottom
// of this page, after every other unrelated section. Both now live together
// here, since they're the same feature at two different time windows.
const WINDOWED_EXPORT_MARKUP = `
  <section class="lt-export-section" data-export-section>
    <button type="button" class="lt-export-toggle" data-export-toggle aria-expanded="false">
      <span>Export progress (last 60 days)</span>
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

  <section class="lt-export-section" data-full-export-section>
    <button type="button" class="lt-export-toggle" data-full-export-toggle aria-expanded="false">
      <span>Export full history</span>
      <span class="lt-chevron" data-full-export-chevron>&#9660;</span>
    </button>
    <div class="lt-export-body" data-full-export-body hidden>
      <p class="lt-help-export-note">Every set you've ever logged, with
        no date cutoff — for when the 60-day export above isn't enough
        history.</p>
      <textarea class="lt-export-textarea" data-full-export-textarea readonly></textarea>
      <div class="lt-export-actions">
        <button type="button" class="lt-export-copy" data-full-export-copy>Copy to clipboard</button>
        <span class="lt-export-status" data-full-export-status hidden></span>
      </div>
    </div>
  </section>
`;

export async function renderHelpView(root) {
  root.innerHTML = `
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${SECTIONS.map(
        (s) => `
          <section class="lt-help-section">
            <h2>${s.title}</h2>
            <p>${s.body}</p>
          </section>
          ${s.title === 'Export progress' ? WINDOWED_EXPORT_MARKUP : ''}
        `
      ).join('')}
    </div>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

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
      const lifts = await listLifts();
      const liftIds = lifts.map((l) => l.id);
      const since = exportWindowStart().toISOString();
      const recentSets = await listRecentSetsForLifts(liftIds, since);
      const setsByLift = new Map(lifts.map((l) => [l.id, []]));
      for (const s of recentSets) {
        const bucket = setsByLift.get(s.lift_id);
        if (bucket) bucket.push(s);
      }
      exportTextarea.value = buildExportText(lifts, setsByLift);
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

  const fullExportToggle = root.querySelector('[data-full-export-toggle]');
  const fullExportBody = root.querySelector('[data-full-export-body]');
  const fullExportChevron = root.querySelector('[data-full-export-chevron]');
  const fullExportTextarea = root.querySelector('[data-full-export-textarea]');
  const fullExportCopyBtn = root.querySelector('[data-full-export-copy]');
  const fullExportStatus = root.querySelector('[data-full-export-status]');

  fullExportToggle.addEventListener('click', async () => {
    const wasExpanded = fullExportToggle.getAttribute('aria-expanded') === 'true';
    const nowExpanded = !wasExpanded;
    fullExportToggle.setAttribute('aria-expanded', String(nowExpanded));
    fullExportBody.hidden = !nowExpanded;
    fullExportChevron.innerHTML = nowExpanded ? '&#9650;' : '&#9660;';

    if (!nowExpanded) return; // just collapsed — nothing else to fetch

    fullExportToggle.disabled = true;
    try {
      const lifts = await listLifts();
      const liftIds = lifts.map((l) => l.id);
      const allSets = await listActiveSetsForLifts(liftIds);
      const setsByLift = new Map(lifts.map((l) => [l.id, []]));
      for (const s of allSets) {
        const bucket = setsByLift.get(s.lift_id);
        if (bucket) bucket.push(s);
      }
      fullExportTextarea.value = buildExportText(lifts, setsByLift, new Date(), 'all-time');
      fullExportStatus.hidden = true;
    } finally {
      fullExportToggle.disabled = false;
    }
  });

  fullExportCopyBtn.addEventListener('click', async () => {
    fullExportTextarea.select();
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(fullExportTextarea.value);
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
    fullExportStatus.hidden = false;
    fullExportStatus.textContent = copied ? 'Copied!' : 'Select all (Cmd/Ctrl+A) and copy manually.';
  });
}
