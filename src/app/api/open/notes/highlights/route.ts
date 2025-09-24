import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/highlights?bookId=ROM&chapter=3
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 200 });

  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId")!;
  const chapter = Number(url.searchParams.get("chapter")!);

  const items = await prisma.highlight.findMany({
    where: { userId: session.user.id, bookId, chapter },
  });
  return NextResponse.json(items);
}

// POST /api/highlights  { bookId, chapter, verse, color }
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { bookId, chapter, verse, color } = await req.json();
  const item = await prisma.highlight.upsert({
    where: {
      userId_bookId_chapter_verse: {
        userId: session.user.id, bookId, chapter: Number(chapter), verse: Number(verse),
      },
    },
    update: { color: String(color || "yellow") },
    create: {
      userId: session.user.id, bookId, chapter: Number(chapter), verse: Number(verse),
      color: String(color || "yellow"),
    },
  });
  return NextResponse.json(item, { status: 201 });
}

// DELETE /api/highlights  { bookId, chapter, verse }
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { bookId, chapter, verse } = await req.json();
  await prisma.highlight.delete({
    where: {
      userId_bookId_chapter_verse: {
        userId: session.user.id, bookId, chapter: Number(chapter), verse: Number(verse),
      },
    },
  });
  return NextResponse.json({ ok: true });
}
