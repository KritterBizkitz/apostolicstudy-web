"use client";

import { useCallback } from "react";

type Pin = { bookId: string; chapter: number; verse?: number };
const STORAGE_KEY = "reader:pins";

function loadPins(): Pin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function savePins(pins: Pin[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  } catch {}
}

export default function PinCurrent({
  bookId,
  chapter,
  verse,
}: { bookId: string; chapter: number; verse?: number }) {
  const onPin = useCallback(() => {
    const pins = loadPins();
    const exists = pins.find(
      p => p.bookId === bookId && p.chapter === chapter && (p.verse ?? 0) === (verse ?? 0)
    );
    if (!exists) {
      pins.unshift({ bookId, chapter, ...(verse ? { verse } : {}) });
      savePins(pins.slice(0, 30)); // cap list
    }
  }, [bookId, chapter, verse]);

  return (
    <button
      onClick={onPin}
      className="rounded-xl px-3 py-1.5 text-sm bg-white/10 border border-white/10 hover:bg-white/15"
      title="Pin this passage"
    >
      Pin passage
    </button>
  );
}
