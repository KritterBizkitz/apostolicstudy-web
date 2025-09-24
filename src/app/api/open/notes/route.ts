export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/open/notes?userId=...&bookId=romans&chapter=4
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = String(url.searchParams.get("userId") ?? "");
    const bookId = String(url.searchParams.get("bookId") ?? "");
    const chapter = Number(url.searchParams.get("chapter") ?? "0");

    if (!userId || !bookId || !Number.isFinite(chapter)) {
      return NextResponse.json([], { status: 200 });
    }

    const notes = await prisma.note.findMany({
      where: { userId, bookId, chapter },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (e: any) {
    console.error("notes.GET crash:", e);
    return NextResponse.json({ error: "server_error", message: String(e?.message ?? e) }, { status: 500 });
  }
}

// POST /api/open/notes  { userId, bookId, chapter, verse?, text }
export async function POST(req: Request) {
  try {
    const { userId, bookId, chapter, verse, text } = await req.json();
    if (!userId) return NextResponse.json({ error: "missing_userId" }, { status: 400 });

    const note = await prisma.note.create({
      data: {
        userId: String(userId),
        bookId: String(bookId),
        chapter: Number(chapter),
        verse: typeof verse === "number" ? verse : verse ? Number(verse) : null,
        text: String(text ?? ""),
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (e: any) {
    console.error("notes.POST crash:", e);
    return NextResponse.json({ error: "server_error", message: String(e?.message ?? e) }, { status: 500 });
  }
}
