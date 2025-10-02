"use client";

import { FormEvent, useMemo, useState } from "react";

type BookOption = {
  id: string;
  label: string;
  chapters: number;
};

type Props = {
  books: BookOption[];
};

type SaveState = "idle" | "saving" | "success" | "error";

const optionStyle = { backgroundColor: "#0f172a", color: "#f8fafc" } as const;

export default function CommentaryAdminForm({ books }: Props) {
  const [bookId, setBookId] = useState(books[0]?.id ?? "");
  const [chapter, setChapter] = useState<string>("1");
  const [verse, setVerse] = useState<string>("1");
  const [content, setContent] = useState("");
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [lastReference, setLastReference] = useState<string | null>(null);

  const activeBook = useMemo(
    () => books.find((book) => book.id === bookId) ?? books[0] ?? null,
    [books, bookId]
  );

  const referencePreview = useMemo(() => {
    if (!activeBook) return "Select a book";
    const chap = chapter.trim() || "?";
    const vs = verse.trim() || "?";
    return `${activeBook.label} ${chap}:${vs}`;
  }, [activeBook, chapter, verse]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    setMessage(null);

    const chapterNum = Number(chapter);
    const verseNum = Number(verse);
    const trimmed = content.trim();

    if (!bookId) {
      setState("error");
      setMessage("Select a book.");
      return;
    }

    if (!Number.isFinite(chapterNum) || chapterNum <= 0) {
      setState("error");
      setMessage("Chapter must be a positive number.");
      return;
    }

    if (!Number.isFinite(verseNum) || verseNum <= 0) {
      setState("error");
      setMessage("Verse must be a positive number.");
      return;
    }

    if (!trimmed) {
      setState("error");
      setMessage("Write some commentary before saving.");
      return;
    }

    try {
      const response = await fetch("/api/commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          chapter: chapterNum,
          verse: verseNum,
          content: trimmed,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error((data as any)?.error ?? "Unable to save commentary.");
      }

      const savedRef = (data as any)?.reference ?? referencePreview;
      setState("success");
      setMessage(`Saved ${savedRef}.`);
      setLastReference(savedRef);
      setContent("");
      setVerse((prev) => {
        const n = Number(prev);
        return Number.isFinite(n) ? String(n + 1) : prev;
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to save commentary.";
      setState("error");
      setMessage(msg);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm text-white/80">
          <span>Book</span>
          <select
            value={bookId}
            onChange={(event) => {
              setBookId(event.target.value);
              setChapter("1");
              setVerse("1");
            }}
            className="w-full rounded-xl border border-emerald-400/40 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-emerald-400"
          >
            {books.map((book) => (
              <option
                key={book.id}
                value={book.id}
                style={optionStyle}
              >
                {book.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/80">
          <span>Chapter</span>
          <input
            type="number"
            min={1}
            max={activeBook?.chapters ?? undefined}
            value={chapter}
            onChange={(event) => setChapter(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/80"
          />
          {activeBook && (
            <p className="text-xs text-white/50">{activeBook.chapters} chapters</p>
          )}
        </label>

        <label className="space-y-2 text-sm text-white/80">
          <span>Verse</span>
          <input
            type="number"
            min={1}
            value={verse}
            onChange={(event) => setVerse(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/80"
          />
          {lastReference && (
            <p className="text-xs text-white/50">Last: {lastReference}</p>
          )}
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>Reference preview</span>
          <span className="font-medium text-white">{referencePreview}</span>
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/80"
          placeholder="Paste or write the commentary for this verse."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 px-5 py-2 font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
          disabled={state === "saving"}
        >
          {state === "saving" ? "Saving…" : "Save commentary"}
        </button>
        <button
          type="button"
          onClick={() => {
            setContent("");
            setState("idle");
            setMessage(null);
          }}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          Clear text
        </button>
      </div>

      {message && (
        <p
          className={`text-sm ${state === "error" ? "text-red-300" : "text-emerald-300"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
