"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useSupabaseUser } from "@/hooks/useSupabaseUser";

type GuestNote = {
  id: string;
  verse?: number | null;
  text: string;
  created_at: string;
  updated_at: string;
};

type NoteItem = {
  id: string;
  verse: number | null;
  text: string;
  created_at: string;
  source: "local" | "cloud";
};

type CloudNote = {
  id: string;
  book_id: string;
  chapter: number;
  verse: number | null;
  content: string;
  created_at: string;
};

const notesKey = (bookId: string, chapter: number) => `notes:v1:${bookId}:${chapter}`;

const safeParseNotes = (raw: string | null): GuestNote[] => {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as GuestNote[];
  } catch {
    return [];
  }
};

function readNotesLocal(bookId: string, chapter: number): GuestNote[] {
  if (typeof window === "undefined") return [];
  return safeParseNotes(localStorage.getItem(notesKey(bookId, chapter)));
}

function writeNotesLocal(bookId: string, chapter: number, notes: GuestNote[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(notesKey(bookId, chapter), JSON.stringify(notes));
}

function deleteNoteLocal(bookId: string, chapter: number, id: string) {
  const next = readNotesLocal(bookId, chapter).filter((note) => note.id !== id);
  writeNotesLocal(bookId, chapter, next);
  return next;
}

type Props = {
  bookId: string;
  chapter: number;
};

export default function NotesPanel({ bookId, chapter }: Props) {
  const user = useSupabaseUser();

  const [items, setItems] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isCloud = !!user;

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isCloud) {
        const params = new URLSearchParams({ bookId, chapter: String(chapter) });
        const res = await fetch(`/api/notes?${params.toString()}`);
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.error ?? "Unable to load notes.");
        }
        const payload = (await res.json()) as { notes: CloudNote[] };
        const mapped: NoteItem[] = (payload.notes ?? []).map((note) => ({
          id: note.id,
          verse: note.verse ?? null,
          text: note.content,
          created_at: note.created_at,
          source: "cloud" as const,
        }));
        setItems(mapped);
      } else {
        const mapped = readNotesLocal(bookId, chapter).map<NoteItem>((note) => ({
          id: note.id,
          verse: note.verse ?? null,
          text: note.text,
          created_at: note.created_at,
          source: "local",
        }));
        setItems(mapped);
      }
    } catch (err) {
      console.error("[notes] load", err);
      setError(err instanceof Error ? err.message : "Unable to load notes.");
    } finally {
      setLoading(false);
    }
  }, [bookId, chapter, isCloud]);

    useEffect(() => {
    const onChanged = () => loadNotes();
    window.addEventListener("as:notes:changed", onChanged);
    return () => window.removeEventListener("as:notes:changed", onChanged);
  }, [loadNotes]);

  const handleDelete = useCallback(
    async (note: NoteItem) => {
      const ok = window.confirm("Delete this note?");
      if (!ok) return;

      if (note.source === "cloud") {
        try {
          const res = await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
          if (!res.ok) {
            const payload = await res.json().catch(() => ({}));
            throw new Error(payload?.error ?? "Unable to delete note.");
          }
          await loadNotes();
          window.dispatchEvent(new Event("as:notes:changed"));
        } catch (err) {
          console.error("[notes] delete", err);
          setError(err instanceof Error ? err.message : "Unable to delete note.");
        }
      } else {
        const next = deleteNoteLocal(bookId, chapter, note.id).map<NoteItem>((n) => ({
          id: n.id,
          verse: n.verse ?? null,
          text: n.text,
          created_at: n.created_at,
          source: "local",
        }));
        setItems(next);
        window.dispatchEvent(new Event("as:notes:changed"));
      }
    },
    [bookId, chapter, loadNotes]
  );

  const helperText = useMemo(() => {
    if (loading) return "Loading...";
    if (error) return error;
    if (items.length === 0) {
      return isCloud
        ? "No notes saved for this chapter yet."
        : "No notes saved locally for this chapter yet.";
    }
    return null;
  }, [loading, error, items.length, isCloud]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-white/60">Notes</h2>
        <button
          onClick={loadNotes}
          className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {helperText ? (
        <p className="text-white/70 text-sm">{helperText}</p>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div
              key={n.id}
              className="relative rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="text-xs text-white/60 mb-1">
                {n.verse ? `v${n.verse}` : "General"} - {new Date(n.created_at).toLocaleString()}
                {isCloud ? "" : " (local)"}
              </div>

              <p className="whitespace-pre-wrap text-sm pr-8">{n.text}</p>

              <button
                onClick={() => handleDelete(n)}
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
