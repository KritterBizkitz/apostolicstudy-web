// lib/bible.ts
export type BookNormalized = {
  book: string;
  chapters: string[][]; // chapters[c-1][v-1] => verse text
};

export async function loadBook(bookId: string): Promise<BookNormalized> {
  // Map your route id to a filename. Keep this in sync with BOOKS.
  const fileName = idToFileName(bookId); // e.g., "Deuteronomy.json"
  const res = await fetch(`/bible/kjv/${fileName}`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load ${fileName}`);
  const raw = await res.json();

  // If top-level key is the book name (your current files), unwrap it.
  const maybeNameKey = Object.keys(raw)[0];
  const payload =
    typeof raw[maybeNameKey] === "object" && !Array.isArray(raw[maybeNameKey])
      ? raw[maybeNameKey]
      : raw;

  const bookName =
    typeof maybeNameKey === "string" && maybeNameKey.length > 0
      ? maybeNameKey
      : inferBookNameFromId(bookId);

  return normalize(payload, bookName);
}

function normalize(payload: any, bookName: string): BookNormalized {
  // Case A: already in { book, chapters: string[][] }
  if (Array.isArray(payload?.chapters)) {
    // Accept either {book,chapters} or bare {chapters}
    return {
      book: payload.book ?? bookName,
      chapters: payload.chapters as string[][],
    };
  }

  // Case B: your current shape → { "1": { "1": "text", "2": "text", ... }, "2": {...} }
  const chapterNums = Object.keys(payload)
    .map(n => Number(n))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  const chapters: string[][] = chapterNums.map(ch => {
    const versesObj = payload[String(ch)] ?? {};
    const verseNums = Object.keys(versesObj)
      .map(n => Number(n))
      .filter(Number.isFinite)
      .sort((a, b) => a - b);
    return verseNums.map(v => String(versesObj[String(v)] ?? ""));
  });

  return { book: bookName, chapters };
}

// Utilities you control:
function idToFileName(id: string): string {
  // Adjust to your filenames exactly (case-sensitive on some hosts)
  // Example:
  const map: Record<string, string> = {
    deuteronomy: "Deuteronomy.json",
    john: "John.json",
    "1-chronicles": "1_Chronicles.json",
    // ...all others
  };
  return map[id] ?? `${id}.json`;
}

function inferBookNameFromId(id: string) {
  // Fallback label; optional
  return id
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}
