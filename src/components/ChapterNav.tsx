// components/ChapterNav.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChapterNav({
  book, chapter, total,
}: { book: string; chapter: number; total: number }) {
  const r = useRouter();
  const prev = Math.max(1, chapter - 1);
  const next = Math.min(total, chapter + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => r.push(`/read/${book}/${prev}`)}
        disabled={chapter === 1}
        className="h-10 px-3 rounded-lg border border-white/10 disabled:opacity-40"
      >← Prev</button>

      <button
        onClick={() => r.push(`/read/${book}/${next}`)}
        disabled={chapter === total}
        className="h-10 px-3 rounded-lg border border-white/10 disabled:opacity-40"
      >Next →</button>

      <JumpToVerse />
    </div>
  );
}

function JumpToVerse() {
  const [v, setV] = useState<string>("");
  const go = () => {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 1) return;
    const el = document.getElementById(`v${n}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        min={1}
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="v#"
        className="h-10 w-20 bg-black/30 border border-white/10 rounded-lg px-2"
      />
      <button onClick={go} className="h-10 px-3 rounded-lg bg-white/10">Jump</button>
    </div>
  );
}
