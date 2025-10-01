"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Verse from "@/components/Verse";
import { supabase } from "@/lib/supabaseClient";

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

type CommentaryTab = {
  verse: number;
  content: string | null;
  loading: boolean;
  error: string | null;
};

type CommentaryPanelProps = {
  bookLabel: string;
  chapter: number;
  tabs: CommentaryTab[];
  activeVerse: number | null;
  onSelect: (verse: number) => void;
  onClose: (verse: number) => void;
  verseMap: Record<number, string>;
};

function CommentaryPanel({
  bookLabel,
  chapter,
  tabs,
  activeVerse,
  onSelect,
  onClose,
  verseMap,
}: CommentaryPanelProps) {
  const activeTab =
    activeVerse != null ? tabs.find((tab) => tab.verse === activeVerse) ?? null : null;
  const verseText = activeVerse != null ? verseMap[activeVerse] ?? "" : "";
  const commentaryText = activeTab?.content ?? null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-xs uppercase tracking-wide text-white/60">Commentary</h2>
      </div>

      {tabs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
          {tabs.map(({ verse }) => {
            const isActive = verse === activeVerse;
            return (
              <div
                key={verse}
                className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm ${
                  isActive
                    ? "border-emerald-400/60 bg-emerald-500/10"
                    : "border-white/10 bg-black/40"
                }`}
              >
                <button
                  onClick={() => onSelect(verse)}
                  className="text-white hover:text-emerald-200"
                >
                  {bookLabel} {chapter}:{verse}
                </button>
                <button
                  onClick={() => onClose(verse)}
                  className="text-white/60 hover:text-white"
                  aria-label={`Close commentary tab for verse ${verse}`}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="px-4 py-5 max-h-[55vh] overflow-y-auto">
        {tabs.length === 0 ? (
          <p className="text-white/60 text-sm leading-relaxed">
            Click any verse in the chapter to open a commentary tab. Your notes will stay pinned here while you scroll.
          </p>
        ) : activeTab == null ? (
          <p className="text-white/60 text-sm leading-relaxed">
            Select a verse tab above to view its commentary.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-white/50">
              Commentary Preview
            </p>
            <h3 className="text-lg font-semibold text-white">
              {bookLabel} {chapter}:{activeVerse}
            </h3>
            <blockquote className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
              {verseText}
            </blockquote>
            {activeTab.loading ? (
              <p className="text-white/70 text-sm">Loading commentary...</p>
            ) : activeTab.error ? (
              <p className="text-sm text-red-300">{activeTab.error}</p>
            ) : commentaryText ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                {commentaryText}
              </div>
            ) : (
              <p className="text-white/70 text-sm leading-relaxed">
                Commentary for this verse has not been written yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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
  const noteInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [commentaryTabs, setCommentaryTabs] = useState<CommentaryTab[]>([]);
  const [activeCommentary, setActiveCommentary] = useState<number | null>(null);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [commentaryHost, setCommentaryHost] = useState<HTMLElement | null>(null);

  // When opening the notes drawer, prefill with reference + verse text
  useEffect(() => {
    if (notesFor == null) return;
    const vt = verseMap[notesFor] ?? "";
    const preface = `${bookLabel} ${chapter}:${notesFor} — `;
    // Only prefill if the box is empty or was auto-filled previously
    setNoteText((cur) => (cur.trim().length === 0 || cur.startsWith(preface) ? `${preface}${vt}\n\n` : cur));
  }, [notesFor, bookLabel, chapter, verseMap]);

  useEffect(() => {
    if (notesFor == null) return;
    const frame = window.requestAnimationFrame(() => {
      noteInputRef.current?.focus();
      noteInputRef.current?.setSelectionRange(noteInputRef.current.value.length, noteInputRef.current.value.length);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [notesFor]);

  async function saveNote() {
    const text = noteText.trim();
    if (!text) return;

    addNoteLocal(bookId, chapter, { text, verse: notesFor });

    // notify other components (e.g., NotesPanel) to reload
    window.dispatchEvent(new Event('as:notes:changed'));

    setNotesFor(null);
    setNoteText('');
  }

  const formatReference = useCallback(
    (verse: number) => `${bookLabel} ${chapter}:${verse}`,
    [bookLabel, chapter]
  );

  const fetchCommentary = useCallback(async (verse: number) => {
    const reference = formatReference(verse);

    try {
      const { data, error } = await supabase
        .from("commentary")
        .select("content")
        .eq("reference", reference)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setCommentaryTabs((prev) =>
        prev.map((tab) =>
          tab.verse === verse
            ? { ...tab, loading: false, content: data?.content ?? null, error: null }
            : tab
        )
      );
    } catch (err) {
      console.error("[commentary] fetch failed", err);
      const message =
        err instanceof Error ? err.message : "Unable to load commentary.";
      setCommentaryTabs((prev) =>
        prev.map((tab) =>
          tab.verse === verse
            ? { ...tab, loading: false, error: message }
            : tab
        )
      );
    }
  }, [formatReference]);

  const openCommentary = useCallback((verse: number) => {
    setCommentaryTabs((prev) => {
      const exists = prev.some((tab) => tab.verse === verse);
      if (exists) {
        return prev.map((tab) =>
          tab.verse === verse ? { ...tab, loading: true, error: null } : tab
        );
      }
      return [...prev, { verse, content: null, loading: true, error: null }];
    });
    setActiveCommentary(verse);
    setActiveVerse(verse);
    fetchCommentary(verse);
  }, [fetchCommentary]);

  const closeCommentary = useCallback((verse: number) => {
    setCommentaryTabs((prev) => {
      const idx = prev.findIndex((tab) => tab.verse === verse);
      if (idx === -1) return prev;
      const next = prev.filter((tab) => tab.verse !== verse);
      setActiveCommentary((current) => {
        if (current !== verse) return current;
        if (next.length === 0) return null;
        const fallback = next[Math.min(idx, next.length - 1)];
        return fallback.verse;
      });
      setActiveVerse((current) => {
        if (current !== verse) return current;
        if (next.length === 0) return null;
        const fallback = next[Math.min(idx, next.length - 1)];
        return fallback.verse;
      });
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    setCommentaryHost(document.getElementById('commentary-sidebar-anchor'));
  }, [bookId, chapter]);

  useEffect(() => {
    // Reset commentary tabs when navigating to a different chapter or book
    setCommentaryTabs([]);
    setActiveCommentary(null);
    setActiveVerse(null);
  }, [bookId, chapter]);

  const handleAddNote = useCallback((verse: number) => {
    setActiveVerse(verse);
    const verseText = verseMap[verse] ?? "";
    const prefilled = `${bookLabel} ${chapter}:${verse}${verseText ? ` — ${verseText}` : ""}`;
    addNoteLocal(bookId, chapter, { text: prefilled, verse });
    window.dispatchEvent(new Event('as:notes:changed'));
  }, [bookId, chapter, bookLabel, verseMap]);

  const handleComposeNote = useCallback((verse: number) => {
    setActiveVerse(verse);
    setNotesFor(verse);
  }, []);


  return (
    <>
      <div className="mt-6 space-y-3 max-w-3xl mx-auto">
        {verses.map(({ v, t }) => (
          <Verse
            key={v}
            v={v}
            text={t}
            isHighlighted={!!hl[v]}
            isActive={activeVerse === v}
            onHighlight={(vv) => addHl(vv)}
            onRemoveHighlight={(vv) => removeHl(vv)}
            onAddNote={handleAddNote}
            onComposeNote={handleComposeNote}
            onOpenCommentary={openCommentary}
            onActivate={(vv) => setActiveVerse(vv)}
          />
        ))}
      </div>

      {commentaryHost
        ? createPortal(
            <CommentaryPanel
              bookLabel={bookLabel}
              chapter={chapter}
              tabs={commentaryTabs}
              activeVerse={activeVerse ?? activeCommentary}
              onSelect={(verse) => {
                setActiveCommentary(verse);
                setActiveVerse(verse);
              }}
              onClose={closeCommentary}
              verseMap={verseMap}
            />,
            commentaryHost
          )
        : (
            <div className="mt-10 lg:hidden">
              <CommentaryPanel
                bookLabel={bookLabel}
                chapter={chapter}
                tabs={commentaryTabs}
                activeVerse={activeVerse ?? activeCommentary}
                onSelect={(verse) => {
                  setActiveCommentary(verse);
                  setActiveVerse(verse);
                }}
                onClose={closeCommentary}
                verseMap={verseMap}
              />
            </div>
          )}

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
              ref={noteInputRef}
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
