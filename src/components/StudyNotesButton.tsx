'use client';

import { useState } from "react";
import StudyNotesDialog from "@/components/StudyNotesDialog";

export default function StudyNotesButton({
  title,
  planSlug,
  day,
  markdown, // optional inline fallback (supports your current days 1–2)
}: {
  title: string;
  planSlug: string;
  day: number;
  markdown?: string;
}) {
  const [open, setOpen] = useState(false);
  const [md, setMd] = useState<string | null>(markdown ?? null);
  const [loading, setLoading] = useState(false);

  async function openDialog() {
    if (md == null) {
      setLoading(true);
      try {
        const res = await fetch(`/api/plan-notes/${encodeURIComponent(planSlug)}/${day}`);
        const json = await res.json();
        setMd(res.ok ? json.markdown ?? "" : `Notes not found for Day ${day}.`);
      } catch {
        setMd("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    }
    setOpen(true);
  }

  return (
    <>
      <button
        onClick={openDialog}
        className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20"
      >
        Study notes
      </button>
      <StudyNotesDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        markdown={md ?? (loading ? "Loading…" : "No notes available.")}
      />
    </>
  );
}
