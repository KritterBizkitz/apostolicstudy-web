"use client";

import { useEffect, useState } from "react";

// --- Guest Notes (localStorage) helpers ---
type GuestNote = {
  id: string;
  verse?: number | null;
  text: string;
  created_at: string; // ISO
  updated_at: string; // ISO
};

const notesKey = (bookId: string, chapter: number) => `notes:v1:${bookId}:${chapter}`;

const safeParse = (raw: string | null): GuestNote[] => {
  if (!raw) return [];
  try { return JSON.parse(raw) as GuestNote[]; } catch { return []; }
};

function readNotesLocal(bookId: string, chapter: number): GuestNote[] {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(notesKey(bookId, chapter)));
}

function writeNotesLocal(bookId: string, chapter: number, arr: GuestNote[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(notesKey(bookId, chapter), JSON.stringify(arr));
}

function addNoteLocal(bookId: string, chapter: number, input: { text: string; verse?: number | null }): GuestNote {
  const now = new Date().toISOString();
  const note: GuestNote = {
    id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}`,
    text: input.text,
    verse: input.verse ?? null,
    created_at: now,
    updated_at: now,
  };
  const list = readNotesLocal(bookId, chapter);
  list.unshift(note);
  writeNotesLocal(bookId, chapter, list);
  return note;
}

function deleteNoteLocal(bookId: string, chapter: number, id: string) {
  const next = readNotesLocal(bookId, chapter).filter(n => n.id !== id);
  writeNotesLocal(bookId, chapter, next);
  return next;
}
// --- end helpers ---


export default function NotesPanel({
  bookId,
  chapter,
}: {
  bookId: string;
  chapter: number;
}) {
  const [items, setItems] = useState<GuestNote[]>([]);
  const [loading, setLoading] = useState(true);

  // --- load notes for this chapter ---
  async function load() {
    setLoading(true);
    try {
      setItems(readNotesLocal(bookId, chapter));
    } finally {
      setLoading(false);
    }
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

  // --- delete a single note by id ---
  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this note?");
    if (!ok) return;
    const next = deleteNoteLocal(bookId, chapter, id);
    setItems(next);
    window.dispatchEvent(new Event("as:notes:changed"));
  }

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
                {new Date(n.created_at).toLocaleString()}
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
