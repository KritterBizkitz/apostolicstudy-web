import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reader",
  description: "Open a passage to read.",
};

function norm(s: string) {
  return s.toLowerCase().replace(/\./g, "").trim().replace(/\s+/g, " ");
}

const bookSlugMap: Record<string, string> = {
  matthew: "matthew",
  mark: "mark",
  luke: "luke",
  acts: "acts",
  romans: "romans",
  galatians: "galatians",
  ephesians: "ephesians",
  philippians: "philippians",
  colossians: "colossians",
  hebrews: "hebrews",
  titus: "titus",
  "1 peter": "1-peter",
  "1peter": "1-peter",
  "first peter": "1-peter",
  "1 corinthians": "1-corinthians",
  "1corinthians": "1-corinthians",
  "first corinthians": "1-corinthians",
};

function parseRefToSlugChapter(ref: string): { slug: string; chapter: number } | null {
  const m = ref.trim().match(/^\s*([1-3]?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+)/);
  if (!m) return null;
  const book = norm(m[1]);
  const chapter = Number(m[2]);
  const slug = bookSlugMap[book] ?? bookSlugMap[book.replace(/\s+/g, "")];
  return slug && Number.isFinite(chapter) && chapter > 0 ? { slug, chapter } : null;
}

export default function ReadAdapter({
  searchParams,
}: { searchParams: { ref?: string } }) {
  const ref = searchParams?.ref?.toString().trim() || "";
  const parsed = ref ? parseRefToSlugChapter(ref) : null;
  if (parsed) redirect(`/read/${parsed.slug}/${parsed.chapter}`);

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-xl font-semibold text-white/95">Reader</h1>
      {ref ? (
        <p className="mt-2 text-white/80">
          Couldn’t parse reference: <span className="font-semibold">{ref}</span>
        </p>
      ) : (
        <p className="mt-2 text-white/80">No reference provided. Try opening from a plan.</p>
      )}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm text-white/80">
        This route adapts <code>?ref=Acts 2:38</code> to your reader at
        <code> /read/[book]/[chapter]</code>.
      </div>
    </main>
  );
}