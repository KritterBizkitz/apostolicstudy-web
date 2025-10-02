import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const selectFields = "id, book_id, chapter, verse, content, created_at";

async function createSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

async function requireUser() {
  const supabase = await createSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return { supabase, user: null, response: NextResponse.json({ error: error.message }, { status: 500 }) };
  }
  if (!user) {
    return { supabase, user: null, response: NextResponse.json({ error: "Not authenticated." }, { status: 401 }) };
  }
  return { supabase, user, response: null };
}

export async function GET(req: NextRequest) {
  const { supabase, user, response } = await requireUser();
  if (!user) return response;

  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("bookId");
  const chapterParam = searchParams.get("chapter");

  if (!bookId) {
    return NextResponse.json({ error: "Missing bookId." }, { status: 400 });
  }

  const chapterNum = chapterParam ? Number(chapterParam) : null;
  if (chapterParam && (!Number.isFinite(chapterNum) || chapterNum <= 0)) {
    return NextResponse.json({ error: "Chapter must be a positive number." }, { status: 400 });
  }

  const query = supabase
    .from("notes")
    .select(selectFields)
    .eq("author_id", user.id)
    .eq("book_id", bookId)
    .order("created_at", { ascending: false });

  if (chapterNum) {
    query.eq("chapter", chapterNum);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notes: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { supabase, user, response } = await requireUser();
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

  const verseNum = verse == null ? null : Number(verse);
  if (verse != null && (!Number.isFinite(verseNum) || verseNum <= 0)) {
    return NextResponse.json({ error: "Verse must be a positive number." }, { status: 400 });
  }

  const body = typeof text === "string" ? text.trim() : "";
  if (!body) {
    return NextResponse.json({ error: "Content cannot be empty." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      book_id: bookId,
      chapter: chapterNum,
      verse: verseNum,
      content: body,
      author_id: user.id,
    })
    .select(selectFields)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: data });
}
