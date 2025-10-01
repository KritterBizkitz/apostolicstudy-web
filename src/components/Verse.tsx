"use client";

import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";

type Props = {
  v: number;
  text: string;

  // optional UI/data hooks from the parent:
  isHighlighted?: boolean;                           // parent tells us if this verse is highlighted
  isActive?: boolean;                                // parent indicates the currently active verse
  onHighlight?: (v: number, color?: string) => void; // parent persists highlight
  onRemoveHighlight?: (v: number) => void;
  onAddNote?: (v: number) => void;                   // parent instantly adds verse to notes
  onComposeNote?: (v: number) => void;               // parent opens compose drawer for this verse
  onOpenCommentary?: (v: number) => void;            // parent opens commentary tab for this verse
  onActivate?: (v: number) => void;                  // parent marks this verse as the active selection
};

export default function Verse({
  v,
  text,
  isHighlighted,
  isActive,
  onHighlight,
  onRemoveHighlight,
  onAddNote,
  onComposeNote,
  onOpenCommentary,
  onActivate,
}: Props) {
  const id = `v${v}`;

  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function runMenuAction(handler?: () => void) {
    return (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuPos(null);
      handler?.();
    };
  }

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
    "leading-relaxed text-lg scroll-mt-24 rounded-lg px-3 py-2 transition-all duration-150 ease-out cursor-pointer hover:bg-white/5 active:scale-[0.99]";
  const hoverClasses = hovered ? " bg-emerald-500/5" : "";
  const activeClasses = isActive ? " ring-1 ring-emerald-400/60 bg-emerald-500/15 shadow-lg" : "";
  const highlightedClasses = isHighlighted ? " bg-yellow-500/10" : "";

  return (
    <div
      id={id}
      className={rowClasses + hoverClasses + activeClasses + highlightedClasses}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        onActivate?.(v);
        onOpenCommentary?.(v);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onActivate?.(v);
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
              onMouseDown={runMenuAction(() => onHighlight?.(v, "yellow"))}
            >
              Highlight verse
            </button>
          ) : (
            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
              onMouseDown={runMenuAction(() => onRemoveHighlight?.(v))}
            >
              Remove highlight
            </button>
          )}

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onMouseDown={runMenuAction(() => onAddNote?.(v))}
          >
            Add to notes
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onMouseDown={runMenuAction(() => onComposeNote?.(v))}
          >
            Write note…
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onMouseDown={runMenuAction(() => {
              onActivate?.(v);
              onOpenCommentary?.(v);
            })}
          >
            Open commentary
          </button>

          <div className="h-px my-1 bg-white/10" />
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
            onMouseDown={runMenuAction()}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
