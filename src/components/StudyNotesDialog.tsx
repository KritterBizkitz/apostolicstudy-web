'use client';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  markdown: string;
};

export default function StudyNotesDialog({ open, onClose, title, markdown }: Props) {
  // Optional: lock background scroll while open
  useEffect(() => {
    if (open) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  if (!open) return null;

  return (
    // No overflow here; we handle scroll inside the panel
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-notes-title"
    >
      {/* Backdrop (z-0) */}
      <div
        className="fixed inset-0 z-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel (z-10). Explicit height + overflow-hidden */}
      <div
        className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/10 bg-black/90 shadow-xl flex flex-col overflow-hidden h-[min(85vh,calc(100vh-2rem))]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Header (not scrolling) */}
        <div className="shrink-0 -mx-4 mb-0 flex items-center justify-between border-b border-white/10 bg-black/90 px-4 py-3">
          <h3 id="study-notes-title" className="text-lg font-semibold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Close
          </button>
        </div>

        {/* Scrollable content: flex-1 + min-h-0 is the key */}
        <div className="prose prose-invert max-w-none px-4 pb-4 overflow-y-auto flex-1 min-h-0 pr-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
