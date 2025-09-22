// src/lib/normalize.ts
export type NormalizedBook = {
  book: string;
  chapters: string[][]; // chapters[c-1][v-1] => verse text
};

export type VerseRow = { v: number; t: string };

function looksLikeChapterMap(obj: any): boolean {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  const keys = Object.keys(obj);
  if (keys.length === 0) return false;
  // If most keys are numeric strings (1..N), call it a chapter map
  const numericish = keys.filter(k => /^\d+$/.test(k)).length;
  return numericish / keys.length >= 0.5;
}

export function normalizeBibleJson(input: any, fallbackBookName = "Book"): NormalizedBook {
  let bookName = fallbackBookName;
  let payload = input;

  // Case A: already { book, chapters }
  if (input?.book && Array.isArray(input?.chapters)) {
    return {
      book: String(input.book || fallbackBookName),
      chapters: (input.chapters as any[]).map(ch =>
        Array.isArray(ch)
          ? ch.map(v => (typeof v === "string" ? v : v?.t ?? v?.text ?? String(v ?? "")))
          : Array.isArray(ch?.verses)
          ? ch.verses.map((v: any) => (typeof v === "string" ? v : v?.t ?? v?.text ?? String(v ?? "")))
          : []
      ),
    };
  }

  // Case B: unwrap top-level that contains a likely book key
  if (input && typeof input === "object" && !Array.isArray(input)) {
    const keys = Object.keys(input);

    // First try exact-single-key unwrap
    if (keys.length === 1 && looksLikeChapterMap(input[keys[0]])) {
      bookName = keys[0];
      payload = input[keys[0]];
    } else {
      // Otherwise, pick the first key that looks like a chapter map
      const candidate = keys.find(k => looksLikeChapterMap(input[k]));
      if (candidate) {
        bookName = candidate;
        payload = input[candidate];
      }
    }
  }

  // If payload is { chapters: {...} } or { chapters: [...] }
  if (payload?.chapters) {
    const ch = payload.chapters;
    if (Array.isArray(ch)) {
      return {
        book: bookName,
        chapters: ch.map((row: any) =>
          Array.isArray(row)
            ? row.map((v: any) => (typeof v === "string" ? v : v?.t ?? v?.text ?? String(v ?? "")))
            : Array.isArray(row?.verses)
            ? row.verses.map((v: any) => (typeof v === "string" ? v : v?.t ?? v?.text ?? String(v ?? "")))
            : []
        ),
      };
    }
    if (typeof ch === "object") {
      payload = ch; // fall through to object-of-chapters normalization
    }
  }

  // Case C: object-of-objects { "1": { "1": "text", ... }, "2": {...} }
  const chapterNums = Object.keys(payload ?? {})
    .filter(k => /^\d+$/.test(k))
    .map(n => Number(n))
    .sort((a, b) => a - b);

  const chapters: string[][] = chapterNums.map(ch => {
    const chObj = payload[String(ch)] ?? {};
    if (Array.isArray(chObj?.verses)) {
      return chObj.verses.map((v: any) => (typeof v === "string" ? v : v?.t ?? v?.text ?? String(v ?? "")));
    }
    const verseNums = Object.keys(chObj)
      .filter(k => /^\d+$/.test(k))
      .map(n => Number(n))
      .sort((a, b) => a - b);
    return verseNums.map(v => String(chObj[String(v)] ?? ""));
  });

  return { book: bookName, chapters };
}

export function versesOf(book: NormalizedBook, chapterNumber: number): VerseRow[] {
  const ch = book.chapters[chapterNumber - 1] ?? [];
  return ch.map((t, i) => ({ v: i + 1, t }));
}

export function chaptersIn(book: NormalizedBook): number {
  return book.chapters.length;
}
