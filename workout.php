<?php
/**
 * Lift Tracker page shell.
 *
 * This file ONLY serves markup — it never touches the database. All data
 * access happens client-side via the Supabase JS client (see
 * js/lift-tracker/).
 *
 * No PHP-level password gate anymore — access is per-account via Supabase
 * Auth (see js/lift-tracker/views/authView.js) and enforced by the
 * database's Row Level Security policies, not by this page. The page shell
 * itself is just an empty container with no data in it either way.
 */
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lift Tracker — Joshua G</title>
  <meta name="description" content="Personal lift tracker and strength progress dashboard.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="/images/favicon3.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="/images/lifttracker.png">

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/lift-tracker.css?v=<?php echo substr(md5_file(__DIR__ . '/css/lift-tracker.css'), 0, 8); ?>">

  <!-- Chart.js, global UMD build (charts.js reads window.Chart). `defer` so
       this doesn't block first paint -- nothing needs a chart until well
       after the page is visible, and it was previously fetched/executed
       synchronously before any markup could render. -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js" defer></script>
</head>
<body class="lt-body">
  <main id="lift-tracker-app" class="lt-app">
    <p class="lt-loading">Loading…</p>
  </main>

  <!-- Bundled + minified build of js/lift-tracker/*.js (entry: main.js),
       generated via esbuild -- see js/lift-tracker/dist/README.md. This
       collapses what used to be ~17 separate module requests (discovered
       one at a time as the browser parsed each import) into a single
       request, and ships ~55% fewer bytes. The supabase-js CDN import
       stays external/unbundled, resolved by the browser same as before.

       ?v= is now an md5_file() hash instead of a hand-typed date string --
       a manually-bumped version is exactly the kind of thing that's easy
       to forget on a quick follow-up edit (which is what happened: two
       CSS patches landed after ?v=2026-06-28 was set, and the immutable
       cache header meant iOS kept serving the pre-fix stylesheet no
       matter how many times the underlying bug got fixed). Hashing the
       file content means the URL changes automatically whenever the file
       does, with no step to remember. -->
  <script type="module" src="js/lift-tracker/dist/bundle.js?v=<?php echo substr(md5_file(__DIR__ . '/js/lift-tracker/dist/bundle.js'), 0, 8); ?>"></script>
</body>
</html>
