import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { planSlug: string; day: string } }
) {
  const dayNum = Number(params.day);
  if (!Number.isFinite(dayNum) || dayNum < 1) {
    return NextResponse.json({ error: "Invalid day" }, { status: 400 });
  }

  const file = path.join(
    process.cwd(),
    "src",
    "content",
    "plan-notes",
    params.planSlug,
    `day-${String(dayNum).padStart(2, "0")}.md`
  );

  try {
    const markdown = await fs.readFile(file, "utf8");
    return new NextResponse(JSON.stringify({ markdown }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=60, stale-while-revalidate=600",
      },
    });
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
