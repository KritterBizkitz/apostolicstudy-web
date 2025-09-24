export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: { id: string } };

export async function DELETE(req: Request, { params }: Ctx) {
  try {
    const id = params.id;
    if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

    // For anon users we send userId in the body; with real auth later, read from session instead.
    const { userId } = await req.json().catch(() => ({ userId: null }));
    if (!userId) return NextResponse.json({ error: "missing_userId" }, { status: 400 });

    // Delete only if the note belongs to this user
    const result = await prisma.note.deleteMany({
      where: { id, userId: String(userId) },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("notes.DELETE:", e);
    return NextResponse.json(
      { error: "server_error", message: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
