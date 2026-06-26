// Lets people who arrive via the case study's "Try it" link play with a
// real, private copy of the app without creating an account.
//
// Visiting workout.php?demo=1 with no existing session silently creates a
// one-off anonymous Supabase user (Supabase Auth's anonymous sign-in)
// instead of showing the normal email/password gate. RLS on every table
// is already scoped to auth.uid(), so this guest's data is fully isolated
// from every other guest and from real accounts -- no schema or policy
// changes needed.
//
// The anonymous session persists in this browser's storage like any other
// session, so reloading or coming back later keeps the same guest account
// and whatever they've changed. Visiting workout.php normally (no
// ?demo=1) is completely unaffected -- this code path never runs for it.
import { supabase } from './supabaseClient.js';
import { createLift, createSet, createWorkout } from './api.js';

export function isDemoLink() {
  return new URLSearchParams(window.location.search).get('demo') === '1';
}

/**
 * Signs the visitor in anonymously and seeds a few example lifts/sets/a
 * workout so the app isn't a blank slate on first look. This is only ever
 * called when there's no session yet (see main.js), so every call here is
 * a brand-new guest account -- safe to seed unconditionally, no risk of
 * re-seeding a returning guest's edited data.
 */
export async function startGuestSession() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  await seedExampleData();
  return data;
}

async function seedExampleData() {
  const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

  const [bench, squat, deadlift] = await Promise.all([
    createLift('Bench Press', 0),
    createLift('Squat', 1),
    createLift('Deadlift', 2),
  ]);

  await Promise.all([
    createSet(bench.id, 135, 8, daysAgo(6)),
    createSet(bench.id, 145, 6, daysAgo(2)),
    createSet(squat.id, 185, 5, daysAgo(5)),
    createSet(squat.id, 195, 5, daysAgo(1)),
    createSet(deadlift.id, 225, 5, daysAgo(3)),
  ]);

  await createWorkout('Full Body', [bench.id, squat.id, deadlift.id], 0);
}
