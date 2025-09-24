"use client";

import { useEffect, useState } from "react";
import { getAnonId } from "@/lib/anon";

type Note = {
  id: string;
  chapter: number;
  verse: number | null;
  text: string;
  createdAt: string;
};

export default function NotesPanel({
  bookId,
  chapter,
}: {
  bookId: string;
  chapter: number;
}) {
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // --- load notes for this chapter ---
  async function load() {
    const userId = getAnonId();
    if (!userId) return;
    setLoading(true);
    const res = await fetch(
      `/api/open/notes?userId=${userId}&bookId=${bookId}&chapter=${chapter}`,
      { cache: "no-store" }
    );
    const data = (await res.json()) as Note[];
    setItems(data);
    setLoading(false);
  }

  // --- delete a single note by id ---
  async function handleDelete(id: string) {
    const userId = getAnonId();
    if (!userId) return;
    // optional safety
    const ok = window.confirm("Delete this note?");
    if (!ok) return;

    const res = await fetch(`/api/open/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      console.error("Delete failed:", res.status, await res.text().catch(() => ""));
      alert("Could not delete note.");
      return;
    }

    // refresh list + notify any listeners (e.g., other panels)
    await load();
    window.dispatchEvent(new Event("as:notes:changed"));
  }

  // load when bookId/chapter changes
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter]);

  // reload when someone elsewhere saves/changes notes
  useEffect(() => {
    const onChanged = () => load();
    window.addEventListener("as:notes:changed", onChanged);
    return () => window.removeEventListener("as:notes:changed", onChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-white/60">Notes</h2>
        <button
          onClick={load}
          className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-white/70 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-white/70 text-sm">No notes for this chapter yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div
              key={n.id}
              className="relative rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="text-xs text-white/60 mb-1">
                {n.verse ? `v${n.verse}` : "General"} ·{" "}
                {new Date(n.createdAt).toLocaleString()}
              </div>

              {/* Add padding-right so text doesn't sit under the X button */}
              <p className="whitespace-pre-wrap text-sm pr-8">{n.text}</p>

              {/* tiny delete button, bottom-right of the card */}
              <button
                onClick={() => handleDelete(n.id)}
                title="Delete note"
                aria-label="Delete note"
                className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-sm leading-7 text-center shadow"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
