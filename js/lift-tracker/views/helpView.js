// Static "how to use this" page. No Supabase calls, no state beyond the
// back button — same single-PHP-page hash-routing pattern as the other
// views (see state.js), just with nothing to fetch.
import { goToList } from '../state.js';
import { listLifts, listActiveSetsForLifts } from '../api.js';
import { buildExportText } from '../export.js';

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
    body: `Tap "Export progress (last 60 days)" on the main screen to expand
      a plain-text summary of every set you've logged in the last 60 days,
      grouped by lift, with volume and estimated 1-rep max. Tap "Copy to
      clipboard" to grab it — useful for pasting into Claude or anywhere
      else you want feedback on your progress. Need older data? Use "Export
      full history" below instead, on this Help page.`,
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
        `
      ).join('')}

      <section class="lt-export-section" data-full-export-section>
        <button type="button" class="lt-export-toggle" data-full-export-toggle aria-expanded="false">
          <span>Export full history</span>
          <span class="lt-chevron" data-full-export-chevron>&#9660;</span>
        </button>
        <div class="lt-export-body" data-full-export-body hidden>
          <p class="lt-help-export-note">Every set you've ever logged, with
            no date cutoff — for when the regular 60-day export on the main
            screen isn't enough history.</p>
          <textarea class="lt-export-textarea" data-full-export-textarea readonly></textarea>
          <div class="lt-export-actions">
            <button type="button" class="lt-export-copy" data-full-export-copy>Copy to clipboard</button>
            <span class="lt-export-status" data-full-export-status hidden></span>
          </div>
        </div>
      </section>
    </div>
  `;

  root.querySelector('[data-back]').addEventListener('click', goToList);

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
