"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import Verse from "@/components/Verse";

type VerseDto = { v: number; t: string };

export default function InteractiveChapter({
  bookId,
  bookLabel,
  chapter,
  verses,
}: {
  bookId: string;
  bookLabel: string;
  chapter: number;
  verses: VerseDto[];
}) {
  const [hl, setHl] = useState<Record<number, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);

  // Still local for now, we'll upgrade this next!
  function addHl(v: number) {
    setHl((m) => ({ ...m, [v]: true }));
  }
  function removeHl(v: number) {
    setHl((m) => {
      const n = { ...m };
      delete n[v];
      return n;
    });
  }

  // Track user session
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) setUserId(session?.user?.id ?? null);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (isMounted) setUserId(session?.user?.id ?? null);
      }
    );
    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const verseMap = useMemo(() => {
    const m: Record<number, string> = {};
    for (const { v, t } of verses) m[v] = t;
    return m;
  }, [verses]);

  const [notesFor, setNotesFor] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (notesFor == null) return;
    const vt = verseMap[notesFor] ?? "";
    const preface = `${bookLabel} ${chapter}:${notesFor} — `;
    setNoteText((cur) => (cur.trim().length === 0 || cur.startsWith(preface) ? `${preface}${vt}\n\n` : cur));
  }, [notesFor, bookLabel, chapter, verseMap]);


  const saveNote = useCallback(async () => {
    const text = noteText.trim();
    if (!text || !userId || notesFor == null) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from("user_notes").insert({
        user_id: userId,
        book_id: bookId,
        chapter: chapter,
        verse: notesFor,
        text: text,
      });
      if (error) throw error;
      
      setNotesFor(null);
      setNoteText('');
    } catch (err) {
      console.error("Error saving note:", err);
      // We will replace this with a beautiful modal soon
      alert("There was an error saving your note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [noteText, userId, bookId, chapter, notesFor]);
  
  const handleAddNote = (verse: number) => {
    if (!userId) {
      // We will replace this with a beautiful modal soon
      alert("Please sign in to add notes.");
      return;
    }
    setNotesFor(verse);
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
            onHighlight={addHl}
            onRemoveHighlight={removeHl}
            onAddNote={handleAddNote}
          />
        ))}
      </div>

      {/* Notes drawer */}
      {notesFor !== null && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => !isSaving && setNotesFor(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm uppercase text-white/60">
                Add Note ({bookLabel} {chapter}:{notesFor})
              </h2>
              <button className="text-white/60 hover:text-white" onClick={() => !isSaving && setNotesFor(null)}>
                Close
              </button>
            </div>
            <textarea
              className="w-full h-64 rounded-xl bg-white/5 border border-white/10 p-3"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note…"
              disabled={isSaving}
            />
            <div className="mt-3 flex gap-2">
              <button 
                onClick={saveNote} 
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
                disabled={isSaving || !noteText.trim()}
              >
                {isSaving ? "Saving..." : "Save Note"}
              </button>
              <button onClick={() => !isSaving && setNotesFor(null)} className="px-4 py-2 rounded-xl bg-white/10">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

