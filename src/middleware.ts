import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type SupabaseCookie = { name: string; value: string };

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll(): SupabaseCookie[] {
          return req.cookies
            .getAll()
            .map(cookie => ({ name: cookie.name, value: cookie.value }));
        },
        async setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          for (const { name, value, options } of cookiesToSet) {
            res.cookies.set(name, value, options as any);
          }
        },
      },
    }
  );

  // touch auth so cookies refresh
  await supabase.auth.getUser();

  return res;
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|robots.txt).*)'],
};