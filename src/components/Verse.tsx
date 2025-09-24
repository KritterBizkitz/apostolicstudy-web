"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  v: number;
  text: string;

  // optional UI/data hooks from the parent:
  isHighlighted?: boolean;                           // parent tells us if this verse is highlighted
  onHighlight?: (v: number, color?: string) => void; // parent persists highlight
  onRemoveHighlight?: (v: number) => void;
  onAddNote?: (v: number) => void;                   // parent opens notes drawer for this verse
};

export default function Verse({
  v,
  text,
  isHighlighted,
  onHighlight,
  onRemoveHighlight,
  onAddNote,
}: Props) {
  const id = `v${v}`;

  const [selected, setSelected] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu on outside click / Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuPos && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuPos(null);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuPos(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuPos]);

  // Base + dynamic styles
  const rowClasses =
    "leading-relaxed text-lg scroll-mt-24 rounded-lg px-3 py-2 hover:bg-white/5";
  const selectedClasses = selected ? " ring-1 ring-emerald-400/30 bg-emerald-500/10" : "";
  const highlightedClasses = isHighlighted ? " bg-yellow-500/10" : "";

  return (
    <div
      id={id}
      className={rowClasses + selectedClasses + highlightedClasses}
      onClick={() => setSelected((s) => !s)}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelected(true);
        setMenuPos({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* verse number keeps your anchor behavior */}
      <a href={`#${id}`} className="align-top text-white/60 mr-2 text-sm select-none">
        {v}
      </a>

      <span className="font-serif">{text}</span>

      {/* Custom context menu */}
      {menuPos && (
        <div
          ref={menuRef}
          style={{ position: "fixed", left: menuPos.x, top: menuPos.y }}
          className="z-50 w-60 rounded-xl border border-white/10 bg-black/90 backdrop-blur p-1 shadow-2xl"
        >
          {!isHighlighted ? (
            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
              onClick={() => {
                setMenuPos(null);
                onHighlight?.(v, "yellow");
              }}
            >
              Highlight verse
            </button>
          ) : (
            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
              onClick={() => {
                setMenuPos(null);
                onRemoveHighlight?.(v);
              }}
            >
              Remove highlight
            </button>
          )}

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onClick={() => {
              setMenuPos(null);
              onAddNote?.(v);
            }}
          >
            Add to notes
          </button>

          <div className="h-px my-1 bg-white/10" />
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuPos(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
