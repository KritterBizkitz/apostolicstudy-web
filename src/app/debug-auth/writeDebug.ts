"use server";

import { createServerSupabase } from "@/lib/supabaseServer";

export async function writeDebug() {
  const supabase = await createServerSupabase();

  // Who is logged in?
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr) return { ok: false, error: userErr.message };
  if (!user) return { ok: false, error: "No user" };

  // Try an upsert to our test row
  const { error } = await supabase
    .from("user_progress")
    .upsert({ user_id: user.id, plan_slug: "debug", day: 0 });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
