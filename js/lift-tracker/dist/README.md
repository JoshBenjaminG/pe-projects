# Lift Tracker production bundle

`bundle.js` in this folder is a generated build artifact, not source —
the real code lives one level up in `js/lift-tracker/*.js` and is what
should be edited. `workout.php` loads this bundle instead of `main.js`
directly, for performance (one minified request instead of ~17 separate
module fetches).

Regenerate it after any change to `js/lift-tracker/**/*.js`:

```
npx esbuild js/lift-tracker/main.js \
  --bundle --minify --format=esm --charset=utf8 \
  --external:https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm \
  --outfile=js/lift-tracker/dist/bundle.js
```

The `--external` flag keeps the Supabase JS client as a real runtime
import resolved by the browser (same CDN URL `supabaseClient.js` already
used before bundling existed) rather than trying to inline a third-party
library that esbuild can't fetch over HTTP anyway.

After regenerating, bump the `?v=` query string on the `<script>` tag in
`workout.php` so the long cache lifetime set in this folder's `.htaccess`
doesn't serve a stale build to returning visitors.
