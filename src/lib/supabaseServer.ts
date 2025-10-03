// src/lib/supabaseServer.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client bound to Next.js cookies (Next 15: cookies() is async).
 */
export async function createServerSupabase() {
  const cookieStore = await cookies(); // <-- important in Next 15

  return createServerClient(URL, ANON, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
}

/** Back-compat alias for older imports */
export const getServerSupabase = createServerSupabase;
