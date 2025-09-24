// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js';

export function getServerSupabase() {
  // Safe to use anon key here because RLS only allows public SELECT of published rows.
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
