import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // if you’re using NextAuth

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 200 });

  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId")!;
  const chapter = Number(url.searchParams.get("chapter"));

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id, bookId, chapter },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { bookId, chapter, verse, text } = await req.json();

  const note = await prisma.note.create({
    data: {
      userId: session.user.id,
      bookId,
      chapter: Number(chapter),
      verse: verse ? Number(verse) : null,
      text: String(text ?? ""),
    },
  });

  return NextResponse.json(note, { status: 201 });
}
