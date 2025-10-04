// src/lib/supabaseClient.ts
// Keep the same exports you already use elsewhere,
// but make them return the ONE shared browser client.

import { getBrowserSupabase } from './supabaseBrowser';

export function createBrowserSupabase() {
  // Old callers that used createBrowserSupabase() will now
  // receive the singleton instead of creating a new client.
  return getBrowserSupabase();
}

export const supabase = getBrowserSupabase(); // Back-compat singleton
