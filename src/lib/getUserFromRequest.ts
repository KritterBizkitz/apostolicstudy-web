import { createClient } from "@supabase/supabase-js";

// Reads the Bearer token from the request and validates it with Supabase
export async function getUserIdFromRequest(req: Request): Promise<string | null> {
  const m = (req.headers.get("authorization") || "").match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const token = m[1];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
  );
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return user?.id ?? null;
}
