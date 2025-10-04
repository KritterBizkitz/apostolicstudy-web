import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

async function createSupabase(req: NextRequest) {
  const cookieStore = await cookies();
  const authHeader = req.headers.get('authorization') ?? '';

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // pass through the Bearer token so RLS identifies the user
      global: { headers: { Authorization: authHeader } },

      // minimal cookie adapter (we don't set cookies here)
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? null;
        },
        set() {},
        remove() {},
      },
    }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabase(req);

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const noteId = params?.id;
  if (!noteId) {
    return NextResponse.json({ error: 'Missing note id.' }, { status: 400 });
  }

  // Delete from the correct table; RLS ensures only own rows can be deleted
  const { error: delError } = await supabase
    .from('user_notes')
    .delete()
    .eq('id', noteId)
    .eq('user_id', user.id);

  if (delError) {
    return NextResponse.json({ error: delError.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
