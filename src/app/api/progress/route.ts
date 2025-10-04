// src/app/api/progress/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planSlug = searchParams.get('plan');
  if (!planSlug) return NextResponse.json({ count: 0 }, { status: 400 });

  const cookieStore = await cookies();

// NEW: read bearer token if the client sends one
const authHeader = req.headers.get('authorization') ?? '';

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    // pass token through to Supabase so RLS can identify the user
    global: { headers: { Authorization: authHeader } },

    // minimal cookie adapter (we don't set cookies in this GET)
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value ?? null;
      },
      set() {},
      remove() {},
    },
  }
);



  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ count: 0 });

  const { count, error } = await supabase
    .from('user_progress')
    .select('day', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('plan_slug', planSlug);

  if (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
