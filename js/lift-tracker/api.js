// Thin wrapper around the Supabase JS client. Every function here is the
// single source of truth for one DB operation — views never call
// `supabase.from(...)` directly.
import { supabase } from './supabaseClient.js';

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
