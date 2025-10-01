"use client";

import { useEffect, useState, useCallback } from "react";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type Note = {
  id: number;
  verse?: number | null;
  text: string;
  created_at: string;
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
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Track user session
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

  // 2. Fetch notes when userId or chapter changes
  const fetchNotes = useCallback(async () => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("id, verse, text, created_at")
        .eq("user_id", userId)
        .eq("book_id", bookId)
        .eq("chapter", chapter)
        .order("verse", { ascending: true, nullsFirst: true });

      if (error) throw error;
      setItems(data ?? []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, bookId, chapter]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // 3. Add realtime listener for this user's notes in this chapter
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notes-${userId}-${bookId}-${chapter}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `user_id=eq.${userId}`,
        },
        () => fetchNotes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, bookId, chapter, fetchNotes]);


  // 4. Delete a note
  const handleDelete = useCallback(async (id: number) => {
    // We can use a custom modal here later instead of confirm
    const ok = window.confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      // Realtime listener will handle the UI update
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }, []);

  if (!userId) {
    return (
       <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-center">
         <p className="text-sm text-white/70">Please sign in to view and save notes.</p>
       </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-white/60">Notes for this chapter</h2>
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
                {n.verse ? `Verse ${n.verse}` : "General Note"} ·{" "}
                {new Date(n.created_at).toLocaleDateString()}
              </div>
              <p className="whitespace-pre-wrap text-sm pr-8">{n.text}</p>
              <button
                onClick={() => handleDelete(n.id)}
                title="Delete note"
                aria-label="Delete note"
                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-sm leading-6 text-center shadow"
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

