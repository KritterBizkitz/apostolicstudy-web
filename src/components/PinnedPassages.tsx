"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Pin = { bookId: string; chapter: number; verse?: number };
const STORAGE_KEY = "reader:pins";

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pins)); } catch {}
}

export default function PinnedPassages() {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    setPins(loadPins());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPins(loadPins());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (pins.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
        <h3 className="text-lg font-semibold">Pinned passages</h3>
        <p className="text-white/75 mt-2">Pin from any passage in the reader.</p>
      </div>
    );
  }

  const remove = (idx: number) => {
    const next = pins.slice();
    next.splice(idx, 1);
    setPins(next);
    savePins(next);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
      <h3 className="text-lg font-semibold">Pinned passages</h3>
      <ul className="mt-3 space-y-2">
        {pins.map((p, i) => {
          const label = `${toTitle(p.bookId)} ${p.chapter}${p.verse ? ":" + p.verse : ""}`;
          const href = `/read/${p.bookId}/${p.chapter}${p.verse ? `#v-${p.verse}` : ""}`;
          return (
            <li key={`${p.bookId}-${p.chapter}-${p.verse ?? 0}-${i}`} className="flex items-center justify-between gap-2">
              <Link
                href={href}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm"
              >
                {label}
              </Link>
              <button
                onClick={() => remove(i)}
                className="text-xs text-white/60 hover:text-white/90"
                title="Remove"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
