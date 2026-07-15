// Static "how to use this" page. No Supabase calls, no state beyond the
// back button — same single-PHP-page hash-routing pattern as the other
// views (see state.js), just with nothing to fetch.
import { goToList } from '../state.js';
import {
  listFoodLogEntriesForWindow,
  listLifts,
  listActiveSetsForLifts,
  listRecentSetsForLifts,
  listWeightEntries,
  listWaistEntries,
} from '../api.js';
import { buildExportText, exportWindowStart } from '../export.js';
import { dailyCaloriesSeries, dailyWeightSeries } from '../math.js';

const SECTIONS = [
  {
    title: 'Weekly killstreak',
    body: `The banner at the top of the list shows a Call of Duty–style
      killstreak based on how many different days you've logged a workout
      this week (Sunday through Saturday). 1 day earns a UAV, 2 days a
      Predator Missile, 3 days a Harrier Strike, and 4 or more days a
      Chopper Gunner. It resets on its own every Sunday — nothing to do.
      Tap the banner to see a full breakdown and how many of each tier
      you've earned over time.`,
  },
  {
    title: 'Fast mode',
    body: `Tap the "Fast" button near the top of the list to switch every
      lift row into a quick-log form right there on the list, with weight
      and reps fields and a "Log" button. Useful for supersets or circuits,
      where you're moving between several lifts and don't want to open
      each one's page to log a set. The weight field prefills with your
      last weight for that lift, and the "Log" button shows a PR note and
      that lift's volume for the day after each set. Tap the button again
      (now labeled "Normal") to switch back to the regular list.`,
  },
  {
    title: 'Export progress',
    body: `Tap "Export progress (last 60 days)" below to expand a plain-text
      summary of every set you've logged in the last 60 days, grouped by
      lift, with volume and estimated 1-rep max, plus your body weight,
      waist, and calorie history over the same window. Tap "Copy to clipboard" to grab it —
      useful for pasting into Claude or anywhere else you want feedback on
      your progress. Need older data? Use "Export full history" right below
      instead.`,
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
    title: 'Workouts',
    body: `A workout is a saved filter over your lift list, for when you
      only want to see the lifts for "Push day" or "Leg day" instead of
      everything. Tap "+ Create Workout" below the Add Lift form, name it,
      then drag the lifts you want into it above the yellow line and tap
      "Save workout" -- everything else stays below the line and out of
      the workout. The workout then shows up as a button in the row below
      Add Lift; tap it to filter the list down to just those lifts, and
      tap it again to clear the filter. Tap the pencil next to a workout's
      button to rename it, change which lifts are in it, or delete it.`,
  },
  {
    title: 'Reordering lifts',
    body: `Press and hold the dots on the right side of a lift row, then
      drag to move it up or down the list.`,
  },
  {
    title: 'Deleting a lift',
    body: `Open the lift's page and tap the × next to its name at the
      top. You'll have a few seconds to tap "Undo" before it's gone for
      good.`,
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
      const weightEntries = await listWeightEntries();
      const recentWeightEntries = weightEntries.filter((e) => new Date(e.logged_at) >= new Date(since));
      const weightSeries = dailyWeightSeries(recentWeightEntries);
      const waistEntries = await listWaistEntries();
      const recentWaistEntries = waistEntries.filter((e) => new Date(e.logged_at) >= new Date(since));
      const now = new Date();
      const foodEntries = await listFoodLogEntriesForWindow(since, now.toISOString());
      const calorieSeries = dailyCaloriesSeries(foodEntries);
      exportTextarea.value = buildExportText(lifts, setsByLift, now, undefined, weightSeries, recentWaistEntries, calorieSeries);
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
      const weightEntries = await listWeightEntries();
      const weightSeries = dailyWeightSeries(weightEntries);
      const waistEntries = await listWaistEntries();
      const foodEntries = await listFoodLogEntriesForWindow('1970-01-01T00:00:00.000Z', new Date().toISOString());
      const calorieSeries = dailyCaloriesSeries(foodEntries);
      fullExportTextarea.value = buildExportText(lifts, setsByLift, new Date(), 'all-time', weightSeries, waistEntries, calorieSeries);
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
