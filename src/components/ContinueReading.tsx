"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LastRef = {
  bookId: string;
  chapter: number;
  verse?: number;
};

function titleFromSlug(slug: string) {
  // best-effort prettifier, avoids importing server data on the client
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ContinueReading() {
  const [last, setLast] = useState<LastRef | null>(null);

  useEffect(() => {
    // Try a few likely keys; we won't throw if none exist
    const keys = ["reader:last", "lastPassage", "lastReading"];
    for (const k of keys) {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) continue;

        // JSON shape: { bookId, chapter, verse? }
        if (raw.trim().startsWith("{")) {
          const j = JSON.parse(raw) as Partial<LastRef>;
          if (j.bookId && j.chapter) {
            setLast({
              bookId: String(j.bookId).toLowerCase(),
              chapter: Number(j.chapter),
              verse: j.verse ? Number(j.verse) : undefined,
            });
            return;
          }
        }

        // String shape: "john/1/5" or "john/1"
        const m = raw.match(/^([a-z0-9-]+)\/(\d+)(?:\/(\d+))?$/i);
        if (m) {
          setLast({
            bookId: m[1].toLowerCase(),
            chapter: Number(m[2]),
            verse: m[3] ? Number(m[3]) : undefined,
          });
          return;
        }
      } catch {
        // ignore and try next key
      }
    }
  }, []);

  // If we have nothing yet, show helpful quick-starts
  if (!last) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Continue reading</h3>
            <p className="text-white/75">No recent passage yet. Jump in:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/read/john/1" className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">
              John 1
            </Link>
            <Link href="/read/romans/8" className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">
              Romans 8
            </Link>
            <Link href="/read/psalms/23" className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">
              Psalm 23
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const label = `${titleFromSlug(last.bookId)} ${last.chapter}${last.verse ? ":" + last.verse : ""}`;
  const href = `/read/${last.bookId}/${last.chapter}${last.verse ? `#v-${last.verse}` : ""}`;

  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">
            Continue reading
          </div>
          <h3 className="text-lg font-semibold mt-2">{label}</h3>
        </div>
        <Link
          href={href}
          className="px-4 py-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black font-medium shadow hover:shadow-indigo-500/25"
        >
          Open
        </Link>
      </div>
    </div>
  );
}
