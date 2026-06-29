// Thin wrapper around the Supabase JS client. Every function here is the
// single source of truth for one DB operation — views never call
// `supabase.from(...)` directly.
import { supabase } from './supabaseClient.js';

// ---------- Auth ----------

export async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data?.user?.id ?? null;
}

// ---------- Feedback ----------

// Records that the signed-in account submitted feedback through
// feedbackModal.js. Deliberately stores no message content -- the actual
// feedback text still only ever goes out via the mailto: link, never
// touches the database. This row's sole purpose is letting the
// secret-one-wish-willow achievement check "has this account ever sent
// feedback" without storing what they said.
export async function recordFeedbackSubmission() {
  const { error } = await supabase.from('feedback_submissions').insert({});
  if (error) throw error;
}

export async function hasSubmittedFeedback() {
  const { count, error } = await supabase
    .from('feedback_submissions')
    .select('id', { count: 'exact', head: true });
  if (error) throw error;
  return (count ?? 0) > 0;
}

// ---------- Lifts ----------

export async function listLifts() {
  const { data, error } = await supabase
    .from('lifts')
    .select('*')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getLift(id) {
  const { data, error } = await supabase.from('lifts').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createLift(name, sortOrder) {
  const { data, error } = await supabase
    .from('lifts')
    .insert({ name, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function renameLift(id, name) {
  const { data, error } = await supabase
    .from('lifts')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** orderedIds: lift ids in the new top-to-bottom display order. */
export async function reorderLifts(orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('lifts').update({ sort_order: index }).eq('id', id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

export async function softDeleteLift(id) {
  const { error } = await supabase
    .from('lifts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreLift(id) {
  const { error } = await supabase.from('lifts').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}

// ---------- Sets ----------

export async function listSetsForLift(liftId) {
  const { data, error } = await supabase
    .from('sets')
    .select('*')
    .eq('lift_id', liftId)
    .is('deleted_at', null)
    .order('performed_at', { ascending: true });
  if (error) throw error;
  return data;
}

/** Active (non-deleted) sets across several lifts, e.g. for the composite chart. */
export async function listActiveSetsForLifts(liftIds) {
  if (!liftIds || liftIds.length === 0) return [];
  const { data, error } = await supabase
    .from('sets')
    .select('*')
    .in('lift_id', liftIds)
    .is('deleted_at', null)
    .order('performed_at', { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Active (non-deleted) sets across several lifts, restricted to a date
 * window — used by the export feature so the query stays bounded no matter
 * how much total history has accumulated, instead of pulling everything.
 */
export async function listRecentSetsForLifts(liftIds, sinceISO) {
  if (!liftIds || liftIds.length === 0) return [];
  const { data, error } = await supabase
    .from('sets')
    .select('*')
    .in('lift_id', liftIds)
    .is('deleted_at', null)
    .gte('performed_at', sinceISO)
    .order('performed_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createSet(liftId, weight, reps, performedAt) {
  const { data, error } = await supabase
    .from('sets')
    .insert({
      lift_id: liftId,
      weight,
      reps,
      performed_at: performedAt || new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSet(id, fields) {
  const { data, error } = await supabase.from('sets').update(fields).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function softDeleteSet(id) {
  const { error } = await supabase
    .from('sets')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreSet(id) {
  const { error } = await supabase.from('sets').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}

// ---------- Workouts ----------
// A workout is a saved set of lift memberships (see workout_lifts) used to
// filter the homepage list down to just those lifts. Order is never stored
// per membership -- the filtered list falls back to each lift's own
// sort_order, same order it shows in unfiltered.

export async function listWorkouts() {
  const { data, error } = await supabase
    .from('workouts')
    .select('*, workout_lifts(lift_id)')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data.map((w) => ({ ...w, liftIds: (w.workout_lifts || []).map((wl) => wl.lift_id) }));
}

/**
 * Persists a new top-to-bottom (or in this case left-to-right) order for
 * the workout filter pills -- same shape as reorderLifts above, just a
 * different table.
 */
export async function reorderWorkouts(orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('workouts').update({ sort_order: index }).eq('id', id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

export async function getWorkout(id) {
  const { data, error } = await supabase
    .from('workouts')
    .select('*, workout_lifts(lift_id)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { ...data, liftIds: (data.workout_lifts || []).map((wl) => wl.lift_id) };
}

/** liftIds: lift ids selected (dragged above the line) when the workout was saved. */
export async function createWorkout(name, liftIds, sortOrder) {
  const { data, error } = await supabase
    .from('workouts')
    .insert({ name, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw error;
  if (liftIds.length > 0) {
    const { error: linkError } = await supabase
      .from('workout_lifts')
      .insert(liftIds.map((liftId) => ({ workout_id: data.id, lift_id: liftId })));
    if (linkError) throw linkError;
  }
  return data;
}

/**
 * Renames the workout and replaces its lift membership wholesale. Simpler
 * and just as correct as diffing old vs. new membership, since the only
 * editor is a single drag-divider UI that always produces a full
 * above-the-line set rather than incremental adds/removes.
 */
export async function updateWorkout(id, name, liftIds) {
  const { error } = await supabase.from('workouts').update({ name }).eq('id', id);
  if (error) throw error;

  const { error: delError } = await supabase.from('workout_lifts').delete().eq('workout_id', id);
  if (delError) throw delError;

  if (liftIds.length > 0) {
    const { error: insError } = await supabase
      .from('workout_lifts')
      .insert(liftIds.map((liftId) => ({ workout_id: id, lift_id: liftId })));
    if (insError) throw insError;
  }
}

export async function softDeleteWorkout(id) {
  const { error } = await supabase
    .from('workouts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreWorkout(id) {
  const { error } = await supabase.from('workouts').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}

// ---------- Body weight ----------

export async function listWeightEntries() {
  const { data, error } = await supabase
    .from('body_weight')
    .select('*')
    .is('deleted_at', null)
    .order('logged_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createWeightEntry(weight, loggedAt) {
  const { data, error } = await supabase
    .from('body_weight')
    .insert({ weight, logged_at: loggedAt || new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateWeightEntry(id, fields) {
  const { data, error } = await supabase
    .from('body_weight')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function softDeleteWeightEntry(id) {
  const { error } = await supabase
    .from('body_weight')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreWeightEntry(id) {
  const { error } = await supabase.from('body_weight').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}

// ---------- Waist circumference ----------
// Independent of body weight -- its own table, its own soft-delete, same
// shape/RLS pattern as body_weight above. Logging one never requires the
// other.

export async function listWaistEntries() {
  const { data, error } = await supabase
    .from('waist_measurements')
    .select('*')
    .is('deleted_at', null)
    .order('logged_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createWaistEntry(waistCircumference, loggedAt) {
  const { data, error } = await supabase
    .from('waist_measurements')
    .insert({ waist_circumference: waistCircumference, logged_at: loggedAt || new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateWaistEntry(id, fields) {
  const { data, error } = await supabase
    .from('waist_measurements')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function softDeleteWaistEntry(id) {
  const { error } = await supabase
    .from('waist_measurements')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreWaistEntry(id) {
  const { error } = await supabase.from('waist_measurements').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}
