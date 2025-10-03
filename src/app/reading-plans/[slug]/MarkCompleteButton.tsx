"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeDay } from "./completeDay";

export default function MarkCompleteButton({
  planSlug,
  day,
  completed,
}: {
  planSlug: string;
  day: number;
  completed: boolean;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  if (completed) {
    return (
      <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
        Completed
      </span>
    );
  }

  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await completeDay(planSlug, day);
          if (res.ok) router.refresh(); // Reloads the page so server can show it as completed
          else alert(res.error ?? "Failed to mark complete");
        })
      }
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 disabled:opacity-50"
    >
      Mark complete
    </button>
  );
}
