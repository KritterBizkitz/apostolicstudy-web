import { createClient } from "@supabase/supabase-js";

export async function getUserIdFromRequest(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    console.error("[auth] no Authorization: Bearer header");
    return null;
  }
  const token = m[1];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !service) {
    console.error("[auth] missing env: ",
      { hasUrl: !!url, hasServiceKey: !!service });
    throw new Error("Server misconfigured: SUPABASE_SERVICE_ROLE_KEY or URL missing");
  }

  // admin client; no persistence on the server
  const supabase = createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error("[auth] getUser error:", error.message);
    return null;
  }
  return data.user?.id ?? null;
}
