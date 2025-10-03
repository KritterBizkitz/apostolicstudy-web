// src/app/reading-plans/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPlanBySlug, type Plan } from "@/data/readingPlans";
import { getScheduleBySlug, type Day } from "@/data/planSchedules";
import dynamic from "next/dynamic";
import * as React from "react";

const StudyNotesDialog = dynamic(() => import("@/components/StudyNotesDialog"), { ssr: false });

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) return { title: "Plan not found" };
  return {
    title: `${plan.title} · Reading Plan`,
    description: plan.blurb,
  };
}
function toReaderHref(ref: string) {
  return `/read?ref=${encodeURIComponent(ref)}`;
}
export default function PlanPage({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) notFound();

  const days: Day[] = getScheduleBySlug(plan.slug) ?? [];
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="mb-6 text-sm text-white/70">
        <Link href="/reading-plans" className="hover:underline">
          ← Reading Plans
        </Link>
      </nav>

      <header className="mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          {plan.type === "bible" ? "Bible plan" : "Topic plan"}
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-white/95">{plan.title}</h1>
        <p className="mt-2 text-white/80">{plan.blurb}</p>

        <div className="mt-4 inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            {plan.days} days
          </span>
          <span className="text-white/50">•</span>
          <span className="text-xs text-white/70">Average 10–20 min/day</span>
        </div>
      </header>

      {/* Placeholder schedule — we’ll wire real passages later */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
  <h2 className="text-sm font-semibold text-white/90">Schedule</h2>

  {days.length === 0 ? (
    <p className="mt-2 text-sm text-white/75">
      No schedule is defined yet for this plan.
    </p>
  ) : (
    <ol className="mt-4 space-y-4">
      {days.map((d) => (
        <li id={`day-${d.day}`} key={d.day} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          {/* Actions */}
<div className="flex items-start justify-between gap-4">
  <div>
    <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">
      Day {d.day}
    </div>
    <h3 className="mt-1 text-white/95 font-semibold">
      {d.title ?? `Day ${d.day}`}
    </h3>
    {d.summary ? <p className="mt-1 text-sm text-white/80">{d.summary}</p> : null}
  </div>

  <div className="flex items-center gap-2">
    {d.notes ? (
      <NotesButton title={`Study notes — Day ${d.day}`} markdown={d.notes} />
    ) : null}
    <button className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
      Mark complete
    </button>
  </div>
</div>

          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {d.entries.map((e, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
  <div className="min-w-0">
    <span className="font-medium text-white/90">{e.ref}</span>
    {e.label ? <span className="text-white/70"> — {e.label}</span> : null}
  </div>

  <Link
    href={toReaderHref(e.ref)}
    className="shrink-0 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20"
  >
    Open in reader
  </Link>
</div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )}

  <div className="mt-6">
    <a
      href="#day-1"
      className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
    >
      Start plan
    </a>
  </div>
</section>
    </main>
  );
}

function NotesButton({ title, markdown }: { title: string; markdown: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20"
      >
        Study notes
      </button>
      <StudyNotesDialog open={open} onClose={() => setOpen(false)} title={title} markdown={markdown} />
    </>
  );
}