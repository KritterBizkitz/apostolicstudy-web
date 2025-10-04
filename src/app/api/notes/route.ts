import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const selectFields = "id, book_id, chapter, verse, content, created_at";

/** Build a Supabase server client that accepts a Bearer token from the client */
async function createSupabase(req: NextRequest) {
  const cookieStore = await cookies();
  const authHeader = req.headers.get("authorization") ?? "";

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // pass the Authorization header through so RLS identifies the user
      global: { headers: { Authorization: authHeader } },
      // minimal cookie adapter (we don't set cookies in this route)
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

async function requireUser(req: NextRequest) {
  const supabase = await createSupabase(req);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return { supabase, user: null, response: NextResponse.json({ error: error.message }, { status: 500 }) };
  }
  if (!user) {
    return { supabase, user: null, response: NextResponse.json({ error: "Not authenticated." }, { status: 401 }) };
  }
  return { supabase, user, response: null };
}

/* ------------------------------- GET /api/notes ------------------------------ */
export async function GET(req: NextRequest) {
  const { supabase, user, response } = await requireUser(req);
  if (!user) return response;

  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("bookId");
  const chapterParam = searchParams.get("chapter");
  const chapterNum = chapterParam == null ? undefined : Number(chapterParam);

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId." }, { status: 400 });
  }
  if (chapterNum !== undefined && (!Number.isFinite(chapterNum) || chapterNum <= 0)) {
    return NextResponse.json({ error: "Chapter must be a positive number." }, { status: 400 });
  }

  let query = supabase
    .from("user_notes")
    .select(selectFields)
    .eq("user_id", user.id)
    .eq("book_id", bookId)
    .order("created_at", { ascending: false });

  if (chapterNum !== undefined) {
    query = query.eq("chapter", chapterNum);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notes: data ?? [] });
}

/* ------------------------------- POST /api/notes ----------------------------- */
export async function POST(req: NextRequest) {
  const { supabase, user, response } = await requireUser(req);
  if (!user) return response;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { bookId, chapter, verse, text } = (payload ?? {}) as Record<string, unknown>;

  if (typeof bookId !== "string" || bookId.trim().length === 0) {
    return NextResponse.json({ error: "Missing bookId." }, { status: 400 });
  }

  const chapterNum = Number(chapter);
  if (!Number.isFinite(chapterNum) || chapterNum <= 0) {
    return NextResponse.json({ error: "Chapter must be a positive number." }, { status: 400 });
  }

  const verseNum = verse === null || verse === undefined ? undefined : Number(verse);
  if (verseNum !== undefined && (!Number.isFinite(verseNum) || verseNum <= 0)) {
    return NextResponse.json({ error: "Verse must be a positive number." }, { status: 400 });
  }

  const body = typeof text === "string" ? text.trim() : "";
  if (!body) {
    return NextResponse.json({ error: "Content cannot be empty." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("user_notes")
    .insert({
      user_id: user.id,
      book_id: bookId,
      chapter: chapterNum,
      verse: verseNum ?? null,
      content: body,
    })
    .select(selectFields)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: data });
}
