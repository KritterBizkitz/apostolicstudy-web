"use client";
import { useEffect, useMemo, useState } from "react";
import Verse from "@/components/Verse";

// Safe ID generator that works in all environments
function genId() {
  try {
    if (typeof self !== 'undefined' && (self as any).crypto?.randomUUID) {
      return (self as any).crypto.randomUUID();
    }
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

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

function writeNotesLocal(bookId: string, chapter: number, list: GuestNote[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(notesKey(bookId, chapter), JSON.stringify(list));
}

function addNoteLocal(bookId: string, chapter: number, input: { text: string; verse?: number | null }) {
  const now = new Date().toISOString();
  const note: GuestNote = {
    id: genId(),
    text: input.text.trim(),
    verse: input.verse ?? null,
    created_at: now,
    updated_at: now,
  };
  const list = readNotesLocal(bookId, chapter);
  list.unshift(note);
  writeNotesLocal(bookId, chapter, list);
  return note;
}
// --- end guest helpers ---

type VerseDto = { v: number; t: string };

export default function InteractiveChapter({
  bookId,
  bookLabel,            // <- pass this from the server page
  chapter,
  verses,
}: {
  bookId: string;
  bookLabel: string;
  chapter: number;
  verses: VerseDto[];
}) {
  const [hl, setHl] = useState<Record<number, boolean>>({});

  function addHl(v: number) {
    setHl((m) => ({ ...m, [v]: true }));
    // TODO: persist highlight via local storage similar to notes
  }
  function removeHl(v: number) {
    setHl((m) => {
      const n = { ...m };
      delete n[v];
      return n;
    });
    // TODO: remove highlight via local storage
  }

  // quick lookup table: verse number -> text
  const verseMap = useMemo(() => {
    const m: Record<number, string> = {};
    for (const { v, t } of verses) m[v] = t;
    return m;
  }, [verses]);

  const [notesFor, setNotesFor] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  // When opening the notes drawer, prefill with reference + verse text
  useEffect(() => {
    if (notesFor == null) return;
    const vt = verseMap[notesFor] ?? "";
    const preface = `${bookLabel} ${chapter}:${notesFor} — `;
    // Only prefill if the box is empty or was auto-filled previously
    setNoteText((cur) => (cur.trim().length === 0 || cur.startsWith(preface) ? `${preface}${vt}\n\n` : cur));
  }, [notesFor, bookLabel, chapter, verseMap]);

  async function saveNote() {
    const text = noteText.trim();
    if (!text) return;

    addNoteLocal(bookId, chapter, { text, verse: notesFor });

    // notify other components (e.g., NotesPanel) to reload
    window.dispatchEvent(new Event('as:notes:changed'));

    setNotesFor(null);
    setNoteText('');
  }


  return (
    <>
      <div className="mt-6 space-y-3 max-w-3xl mx-auto">
        {verses.map(({ v, t }) => (
          <Verse
            key={v}
            v={v}
            text={t}
            isHighlighted={!!hl[v]}
            onHighlight={(vv) => addHl(vv)}
            onRemoveHighlight={(vv) => removeHl(vv)}
            onAddNote={(vv) => setNotesFor(vv)}
          />
        ))}
      </div>

      {/* Notes drawer */}
      {notesFor !== null && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setNotesFor(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm uppercase text-white/60">
                Add Note ({bookLabel} {chapter}:{notesFor})
              </h2>
              <button className="text-white/60 hover:text-white" onClick={() => setNotesFor(null)}>
                Close
              </button>
            </div>
            <textarea
              className="w-full h-64 rounded-xl bg-white/5 border border-white/10 p-3"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note…"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={saveNote} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">
                Save
              </button>
              <button onClick={() => setNotesFor(null)} className="px-4 py-2 rounded-xl bg-white/10">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
