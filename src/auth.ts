// src/auth.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type SessionLike =
  | { user: { id: string; email?: string | null } }
  | null;

/**
 * Server-side: read the current Supabase user.
 * Works in Route Handlers. Avoids TS errors by (1) awaiting cookies(),
 * and (2) using permissive 'any' for cookie write options.
 */
export async function auth(): Promise<SessionLike> {
  // IMPORTANT: await this, or 'cookieStore' will be a Promise
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // read current cookie value
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Route Handlers can set cookies; call cookies() again to get a writable instance.
        set(name: string, value: string, options?: any) {
          try {
            (cookies() as any).set(name, value, options);
          } catch {
            /* no-op on non-writable contexts */
          }
        },
        remove(name: string, options?: any) {
          try {
            (cookies() as any).set(name, "", { ...(options || {}), maxAge: 0 });
          } catch {
            /* no-op */
          }
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return { user: { id: user.id, email: user.email } };
}

export async function currentUser() {
  const s = await auth();
  return s?.user ?? null;
}
