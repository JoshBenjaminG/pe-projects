<?php
/**
 * Minimal session-based password gate for the Lift Tracker page.
 *
 * Reads the password from the LIFT_TRACKER_PASSWORD environment variable —
 * it is never hardcoded in this file or committed to the repo. Set it on
 * Heroku with:
 *
 *   heroku config:set LIFT_TRACKER_PASSWORD="your-password-here" -a your-app-name
 *
 * If the env var isn't set, the gate fails closed (denies access) rather
 * than silently letting everyone in.
 *
 * Include this at the very top of any page you want protected, before any
 * output is sent (it calls session_start() and may send a redirect/exit).
 */

session_start();

const LT_SESSION_KEY = 'lift_tracker_authed';
const LT_MAX_ATTEMPTS_PER_SESSION = 20; // light brute-force throttle

function lt_check_password(): bool {
    if (!empty($_SESSION[LT_SESSION_KEY])) {
        return true;
    }

    $expected = getenv('LIFT_TRACKER_PASSWORD');

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['lt_password'])) {
        $_SESSION['lt_attempts'] = ($_SESSION['lt_attempts'] ?? 0) + 1;

        if ($_SESSION['lt_attempts'] > LT_MAX_ATTEMPTS_PER_SESSION) {
            http_response_code(429);
            echo 'Too many attempts. Close this tab and try again later.';
            exit;
        }

        if ($expected !== false && $expected !== '' && hash_equals($expected, $_POST['lt_password'])) {
            $_SESSION[LT_SESSION_KEY] = true;
            unset($_SESSION['lt_attempts']);
            return true;
        }

        return false;
    }

    return false;
}

function lt_render_gate(bool $showError): void {
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Lift Tracker</title>
  <link rel="stylesheet" href="css/lift-tracker.css">
</head>
<body class="lt-body">
  <main class="lt-app lt-gate">
    <form method="post" class="lt-gate-form">
      <label for="lt_password">Password</label>
      <input type="password" id="lt_password" name="lt_password" autofocus required>
      <button type="submit">Unlock</button>
      <?php if ($showError): ?>
        <p class="lt-gate-error">Incorrect password.</p>
      <?php endif; ?>
    </form>
  </main>
</body>
</html>
    <?php
}

if (!lt_check_password()) {
    $hadAttempt = $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['lt_password']);
    lt_render_gate($hadAttempt);
    exit;
}
