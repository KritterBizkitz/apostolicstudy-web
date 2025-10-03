'use client';

import { useEffect } from 'react';

export default function StudyNotesDialog({
  open,
  onClose,
  title,
  markdown,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  markdown: string;
}) {
  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl sm:rounded-2xl bg-neutral-900 border border-white/10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-base font-semibold text-white/95">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-2 py-1 text-white/70 hover:bg-white/10"
          >
            ✕
          </button>
        </header>

        {/* Simple markdown renderer (very small subset) */}
        <div className="px-4 py-4 prose prose-invert max-w-none">
          {markdown.split('\n').map((line, i) => {
            // headings
            if (line.startsWith('### ')) {
              return (
                <h3 key={i} className="text-white/95 mt-4">
                  {line.replace(/^###\s+/, '')}
                </h3>
              );
            }
            // bullet list
            if (line.startsWith('- ')) {
              // collect contiguous bullets into one <ul>
              const bullets: string[] = [];
              let idx = i;
              while (idx < markdown.split('\n').length && markdown.split('\n')[idx].startsWith('- ')) {
                bullets.push(markdown.split('\n')[idx].replace(/^- /, ''));
                idx++;
              }
              // skip rendering extra items here; they will be handled when map reaches them
              if (i > 0 && markdown.split('\n')[i - 1].startsWith('- ')) return null;
              return (
                <ul key={i} className="list-disc pl-6">
                  {bullets.map((b, j) => (
                    <li key={j} className="text-white/85">{b}</li>
                  ))}
                </ul>
              );
            }
            // bold-ish emphasis via **text**
            const withBold = line.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
              chunk.startsWith('**') && chunk.endsWith('**') ? (
                <strong key={j}>{chunk.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{chunk}</span>
              )
            );

            // paragraph
            return line.trim().length ? (
              <p key={i} className="text-white/85">{withBold}</p>
            ) : (
              <div key={i} className="h-2" />
            );
          })}
        </div>
      </div>
    </div>
  );
}