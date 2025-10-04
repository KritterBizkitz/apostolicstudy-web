// app/read/[book]/[chapter]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import Link from "next/link";

import LastReadSaver from "@/components/LastReadSaver";
import PinCurrent from "@/components/PinCurrent";
import BookChapterPicker from "@/components/BookChapterPicker";
import ChapterNav from "@/components/ChapterNav";
import InteractiveChapter from "@/components/InteractiveChapter";
import NotesPanel from "@/components/NotesPanel";
import NotesDrawerClient from "@/components/NotesDrawerClient";

import { bookLabelFromSlug, getBookById } from "@/lib/books";
import { normalizeBibleJson, versesOf, chaptersIn } from "@/lib/normalize";

type Params = { book: string; chapter: string };

export default async function ReaderPage(
  { params }: { params: Promise<Params> }
) {
  // ---- route params (await once) ----
  const { book, chapter } = await params;
  const bookId = book;
  const rawChapter = Number(chapter);
  const bookLabel = bookLabelFromSlug(bookId);

  if (!Number.isFinite(rawChapter) || rawChapter < 1) {
    return redirect(`/read/${bookId}/1`);
  }

  // ---- book metadata + file path ----
  const meta = getBookById(bookId);
  if (!meta) return <p className="mt-10">Unknown book: {bookId}</p>;

  const file = path.join(process.cwd(), "src", "lib", "bible-data", meta.file);
  const raw = await fs.readFile(file, "utf8");

  // ---- normalize to { book, chapters } ----
  const normalized = normalizeBibleJson(JSON.parse(raw), meta.name ?? meta.id);

  // ---- clamp + canonicalize ----
  const total = Math.max(1, chaptersIn(normalized));
  const ch = Math.min(Math.max(1, rawChapter), total);
  if (ch !== rawChapter) return redirect(`/read/${bookId}/${ch}`);

  const verses = versesOf(normalized, ch);

  // ---- render ----
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">
          {bookLabel} {ch}
        </h1>
        <Link href="/app" className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">
          ← Back to Hub
        </Link>
      </div>

      {/* Save last read location (client component) */}
      <LastReadSaver bookId={bookId} chapter={ch} />

      <div className="grid grid-cols-12 gap-6">
        {/* MAIN */}
        <main className="col-span-12 lg:col-span-8 xl:col-span-9">
          {/* sticky nav */}
          <div className="sticky top-0 z-10 -mx-4 px-4 py-3 border-b border-slate-900/10 dark:border-slate-50/10 bg-white/70 dark:bg-black/70 backdrop-blur">
            <div className="flex flex-wrap items-end gap-3">
              <PinCurrent bookId={bookId} chapter={ch} />
              <BookChapterPicker book={bookId} chapter={ch} />
              <ChapterNav book={bookId} chapter={ch} total={total} />
            </div>
          </div>

          {/* scripture body */}
          {verses.length === 0 ? (
            <p className="text-white/70 mt-6">No verses found in this chapter.</p>
          ) : (
            <InteractiveChapter
              bookId={bookId}
              bookLabel={bookLabel}
              chapter={ch}
              verses={verses}
            />
          )}
        </main>

        {/* DESKTOP NOTES + COMMENTARY SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20 space-y-6">
            <NotesPanel bookId={bookId} chapter={ch} />
            <div id="commentary-sidebar-anchor" className="space-y-4" />
          </div>
        </aside>
      </div>

      {/* MOBILE NOTES DRAWER BUTTON */}
      <NotesDrawerClient bookId={bookId} chapter={ch} />
    </div>
  );
}
