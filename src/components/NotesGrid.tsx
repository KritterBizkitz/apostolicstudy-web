"use client";

import { useMemo, useState } from "react";

export type Note = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  published_at: string | null;
  type: "study" | "sermon";
};

export default function NotesGrid({ notes, heading }: { notes: Note[]; heading: string }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter(n =>
      [n.title, n.description ?? ""].some(v => v.toLowerCase().includes(term))
    );
  }, [q, notes]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{heading}</h1>
          <p className="text-sm text-white/60">Search and open any note. All files are public.</p>
        </div>
        <div className="w-full max-w-xs">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes…"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="text-white/70">No notes match “{q}”.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((n) => (
            <article
              key={n.id}
              className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur hover:border-white/20 transition"
            >
              <h2 className="text-base font-medium">{n.title}</h2>
              {n.description ? (
                <p className="mt-1 text-sm text-white/70">{n.description}</p>
              ) : (
                <p className="mt-1 text-sm text-white/50 italic">No description</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={`/read?url=${encodeURIComponent(n.file_url)}&title=${encodeURIComponent(n.title)}`}
                  className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:border-white/30"
                >
                  Open
                </a>
                <a
                  href={n.file_url}
                  download
                  className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:border-white/30"
                >
                  Download
                </a>
              </div>

              {n.published_at && (
                <p className="mt-3 text-xs text-white/40">
                  Published {new Date(n.published_at).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
