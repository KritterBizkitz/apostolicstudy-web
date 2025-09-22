"use client";

import { BOOKS, getBookById } from "@/lib/books";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookChapterPicker({ book, chapter }:{book:string; chapter:number}) {
  const router = useRouter();
  const [b, setB] = useState(book);
  const selected = getBookById(b) ?? getBookById("john")!;
  const [c, setC] = useState<number>(chapter);

  const go = () => router.push(`/read/${b}/${c}`);

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-xs uppercase text-white/60 mb-1">Book</label>
        <select value={b} onChange={e => setB(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-2">
          {BOOKS.map(bk => <option key={bk.id} value={bk.id}>{bk.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase text-white/60 mb-1">Chapter</label>
        <select value={c} onChange={e => setC(Number(e.target.value))}
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-2">
          {Array.from({length: selected.chapters}, (_,i)=>i+1).map(n =>
            <option key={n} value={n}>{n}</option>
          )}
        </select>
      </div>
      <button onClick={go}
              className="h-10 px-4 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500">
        Go
      </button>
    </div>
  );
}
