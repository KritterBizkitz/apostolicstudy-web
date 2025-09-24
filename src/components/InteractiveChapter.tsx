"use client";
const NOTES_API = "/api/open/notes";
import { useEffect, useMemo, useState } from "react";
import Verse from "@/components/Verse";
import { createClient } from "@supabase/supabase-js";


function getAnonId() {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem("as:anon");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("as:anon", id);
  }
  return id;
}


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
    // TODO: persist highlight via /api/highlights
  }
  function removeHl(v: number) {
    setHl((m) => {
      const n = { ...m };
      delete n[v];
      return n;
    });
    // TODO: remove highlight via /api/highlights
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

  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
 async function saveNote() {
  const anonId = getAnonId();
// after a 201 response:

  const res = await fetch("/api/open/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: anonId,           // <-- NEW
      bookId,
      chapter,
      verse: notesFor,
      text: noteText,
    }),
    
  });
  window.dispatchEvent(new Event("as:notes:changed"));

  if (!res.ok) {
    console.error("Failed to save note:", res.status, await res.text().catch(() => ""));
    alert(`Save failed (${res.status}). Check server logs.`);
    return;
  }
  setNotesFor(null);
  setNoteText("");
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
