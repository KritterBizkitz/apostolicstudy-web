import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/getUserFromRequest";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { bookId, chapter, verse, text } = await req.json();
    const note = await prisma.note.create({
      data: {
        userId,
        bookId: String(bookId),
        chapter: Number(chapter),
        verse: typeof verse === "number" ? verse : verse ? Number(verse) : null,
        text: String(text ?? ""),
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (err: any) {
    console.error("notes.POST error:", err);
    return NextResponse.json({ error: "server_error", message: String(err?.message ?? err) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const bookId = String(url.searchParams.get("bookId") ?? "");
    const chapter = Number(url.searchParams.get("chapter") ?? "0");

    const userId = await getUserIdFromRequest(req);
    if (!userId || !bookId || !Number.isFinite(chapter)) return NextResponse.json([], { status: 200 });

    const notes = await prisma.note.findMany({
      where: { userId, bookId, chapter },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (err: any) {
    console.error("notes.GET error:", err);
    return NextResponse.json({ error: "server_error", message: String(err?.message ?? err) }, { status: 500 });
  }
}
