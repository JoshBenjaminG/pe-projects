<?php
/**
 * Lift Tracker page shell.
 *
 * This file ONLY serves markup — it never touches the database. All data
 * access happens client-side via the Supabase JS client (see
 * js/lift-tracker/), per the project spec.
 *
 * Gated behind a session password check — see lift-tracker-auth.php. This
 * must run before any HTML is emitted, since it may send its own page and
 * exit().
 */
require __DIR__ . '/lift-tracker-auth.php';
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

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/lift-tracker.css">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

  <!-- Chart.js, global UMD build (charts.js reads window.Chart) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
</head>
<body class="lt-body">
  <main id="lift-tracker-app" class="lt-app">
    <p class="lt-loading">Loading…</p>
  </main>

  <!-- Supabase JS client + app logic, ES modules (CDN-loaded supabase-js) -->
  <script type="module" src="js/lift-tracker/main.js"></script>
</body>
</html>
