import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// TEMP: sanity check in dev
if (process.env.NODE_ENV !== "production") {
  console.log("[supabase] url:", url);
  console.log("[supabase] anon length:", anon ? anon.length : 0);
}

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
});
