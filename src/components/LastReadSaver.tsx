"use client";

import { useEffect } from "react";

export default function LastReadSaver({
  bookId,
  chapter,
  verse,
}: { bookId: string; chapter: number; verse?: number }) {
  useEffect(() => {
    try {
      const payload = { bookId: bookId.toLowerCase(), chapter, ...(verse ? { verse } : {}) };
      localStorage.setItem("reader:last", JSON.stringify(payload));
    } catch {}
  }, [bookId, chapter, verse]);

  return null;
}
