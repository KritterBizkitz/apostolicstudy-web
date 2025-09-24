"use client";

import { useState } from "react";
import NotesPanel from "./NotesPanel";

export default function NotesDrawerClient({ bookId, chapter }: { bookId: string; chapter: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button on small screens */}
      <button
        className="lg:hidden fixed right-4 bottom-4 z-40 rounded-full bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/20"
        onClick={() => setOpen(true)}
      >
        Notes
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-[92%] sm:w-[420px] bg-zinc-900 border-l border-white/10 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm text-white/70">Notes</h2>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">Close</button>
            </div>
            <NotesPanel bookId={bookId} chapter={chapter} />
          </div>
        </div>
      )}
    </>
  );
}
