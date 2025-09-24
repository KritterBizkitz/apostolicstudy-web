// app/api/open/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("url");
  const filename = (searchParams.get("filename") || "document.pdf").replace(/[^\w.\- ]+/g, "");
  if (!raw) return NextResponse.json({ error: "missing url" }, { status: 400 });

  // strip any forced-download params from the upstream URL
  const upstreamUrl = new URL(raw);
  upstreamUrl.searchParams.delete("download");
  upstreamUrl.search = ""; // safest: drop all query params

  const resp = await fetch(upstreamUrl.toString(), { cache: "no-store" });
  if (!resp.ok) return NextResponse.json({ error: "fetch failed" }, { status: 502 });

  const buf = Buffer.from(await resp.arrayBuffer());
  return new NextResponse(buf, {
    headers: {
      // force inline rendering
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=300",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
