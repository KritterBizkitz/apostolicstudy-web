// app/read/[book]/[chapter]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";

import Verse from "@/components/Verse";
import BookChapterPicker from "@/components/BookChapterPicker";
import ChapterNav from "@/components/ChapterNav";
import { getBookById } from "@/lib/books";
import { normalizeBibleJson, versesOf, chaptersIn } from "@/lib/normalize";

type RouteParams = { book: string; chapter: string };

export default async function ReaderPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  // ---- route params (must await in App Router) ----
  const { book, chapter } = await params;
  const bookId = book.toLowerCase();
  const rawChapter = Number(chapter);

  if (!Number.isFinite(rawChapter) || rawChapter < 1) {
    return redirect(`/read/${bookId}/1`);
  }

  // ---- book metadata + file path ----
  const meta = getBookById(bookId);
  if (!meta) return <p className="mt-10">Unknown book: {bookId}</p>;

  const file = path.join(process.cwd(), "src", "lib", "bible-data", meta.file);
  const raw = await fs.readFile(file, "utf8");

  // ---- normalize to { book, chapters: string[][] } ----
  const normalized = normalizeBibleJson(JSON.parse(raw), meta.name ?? meta.id);

  // ---- clamp chapter and canonicalize URL if needed ----
  const total = Math.max(1, chaptersIn(normalized));
  const ch = Math.min(Math.max(1, rawChapter), total);
  if (ch !== rawChapter) {
    return redirect(`/read/${bookId}/${ch}`);
  }

  const verses = versesOf(normalized, ch);

  // ---- LAYOUT (all JSX only inside the return) ----
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* optional left gutter / future toc */}
        <aside className="hidden xl:block xl:col-span-2" />

        {/* MAIN READER — centered */}
        <main className="col-span-12 lg:col-span-8 xl:col-span-7">
          {/* Title (non-sticky) */}
<h1 className="text-2xl font-semibold mb-2">
  {normalized.book} {ch}
</h1>

{/* Single sticky NAV — use your nicer “bottom” controls here */}
<div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-black/70 backdrop-blur">
  <div className="flex flex-wrap items-end gap-3">
    {/* keep these as you had in the bottom bar */}
    <BookChapterPicker book={bookId} chapter={ch} />
    <ChapterNav book={bookId} chapter={ch} total={total} />
    {/* if you had a separate Jump input, include it here too */}
  </div>
</div>


          {/* scripture body */}
          {verses.length === 0 ? (
            <p className="text-white/70 mt-6">No verses found in this chapter.</p>
          ) : (
            <div className="mt-6 space-y-3 max-w-3xl mx-auto">
              {verses.map(({ v, t }) => (
                <Verse key={v} v={v} text={t} />
              ))}
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR — ready for notes/commentary */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-16 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow">
              <h2 className="text-xs uppercase text-white/60 mb-2">Notes</h2>
              <p className="text-white/70 text-sm">Coming soon.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow">
              <h2 className="text-xs uppercase text-white/60 mb-2">Commentary</h2>
              <p className="text-white/70 text-sm">Coming soon.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
