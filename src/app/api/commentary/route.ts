import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { bookLabelFromSlug } from "@/lib/books";

const ADMIN_ID = (process.env.COMMENTARY_ADMIN_ID ?? process.env.NEXT_PUBLIC_COMMENTARY_ADMIN_ID ?? "").trim();

export async function POST(req: NextRequest) {
  if (!ADMIN_ID) {
    return NextResponse.json(
      {
        error: "COMMENTARY_ADMIN_ID env var not set. Add it to .env.local and restart the dev server.",
      },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const { bookId, chapter, verse, content } = (payload ?? {}) as Record<string, unknown>;

  if (typeof bookId !== "string" || bookId.trim().length === 0) {
    return NextResponse.json({ error: "Missing bookId." }, { status: 400 });
  }

  const chapterNum = Number(chapter);
  const verseNum = Number(verse);
  const text = typeof content === "string" ? content.trim() : "";

  if (!Number.isFinite(chapterNum) || chapterNum <= 0) {
    return NextResponse.json({ error: "Chapter must be a positive number." }, { status: 400 });
  }

  if (!Number.isFinite(verseNum) || verseNum <= 0) {
    return NextResponse.json({ error: "Verse must be a positive number." }, { status: 400 });
  }

  if (!text) {
    return NextResponse.json({ error: "Content cannot be empty." }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
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
    },
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  if (user.id !== ADMIN_ID) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const reference = `${bookLabelFromSlug(bookId)} ${chapterNum}:${verseNum}`;

  const { error } = await supabase
    .from("commentary")
    .upsert(
      {
        reference,
        content: text,
        author_id: user.id,
      },
      { onConflict: "reference" },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reference });
}
