"use server";

import { createServerSupabase } from "@/lib/supabaseServer";

export async function completeDay(planSlug: string, day: number) {
  const supabase = await createServerSupabase();

  // Who’s logged in?
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr) return { ok: false, error: userErr.message };
  if (!user) return { ok: false, error: "Please sign in to track progress." };

  // Upsert one row per (user, plan, day)
  const { error } = await supabase
    .from("user_progress")
    .upsert({ user_id: user.id, plan_slug: planSlug, day });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
