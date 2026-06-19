// Supabase connection details for the Lift Tracker feature.
//
// The publishable key below is safe to ship in client-side JS — it's the
// public, rate-limited key Supabase expects to be embedded in browser code.
// It only grants what this project's Row Level Security policies allow,
// which for this app is open anon read/write on `lifts` and `sets` (there is
// no auth — see the project spec for the accepted tradeoff).
export const SUPABASE_URL = 'https://mqfsgammpsumpltfutwl.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5';
