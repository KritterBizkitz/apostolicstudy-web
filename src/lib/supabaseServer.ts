// src/lib/supabaseServer.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type SupabaseCookie = { name: string; value: string };

export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Next may expose cookies() as async. Await it to keep TS happy.
        async getAll(): Promise<SupabaseCookie[]> {
          const store = await cookies();
          return store.getAll().map(c => ({ name: c.name, value: c.value }));
        },
        async setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ): Promise<void> {
          try {
            const store = await cookies();
            for (const { name, value, options } of cookiesToSet) {
              // Cast quiets tiny type differences between Next and Supabase
              store.set(name, value, options as any);
            }
          } catch {
            // Called from a Server Component where writes are not allowed
          }
        },
      },
    }
  );
}
