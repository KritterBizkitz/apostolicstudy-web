// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * New API — make a fresh client in client components when needed.
 */
export function createBrowserSupabase() {
  return createClient(URL, ANON);
}

/**
 * Back-compat — some files still import { supabase } from '@/lib/supabaseClient'.
 * This singleton is fine for client-side usage (UserMenu, account page, etc.).
 */
export const supabase = createBrowserSupabase();
