// src/app/reading-plans/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPlanBySlug } from "@/data/readingPlans";
import { getScheduleBySlug, type Day } from "@/data/planSchedules";
import { getNotesDays } from "@/lib/planNotes";
import StudyNotesButton from "@/components/StudyNotesButton";
import { createServerSupabase } from "@/lib/supabaseServer";
import MarkCompleteButton from "./MarkCompleteButton";
import ProgressRing from "@/components/ProgressRing";
import PlanProgressClient from '@/components/PlanProgressClient';


export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';



type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) return { title: "Plan not found" };
  return {
    title: `${plan.title} · Reading Plan`,
    description: plan.blurb,
  };
}

// Keep adapter route simple: /read?ref=Acts%202:38 → our adapter will redirect.
function toReaderHref(ref: string) {
  return `/read?ref=${encodeURIComponent(ref)}`;
}

export default async function PlanPage({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) notFound();

  const days: Day[] = (await getScheduleBySlug(plan.slug)) ?? [];

  const notesDays = await getNotesDays(plan.slug);

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  let completedDays = new Set<number>();
  if (user) {
    const { data } = await supabase
      .from("user_progress")
      .select("day")
      .eq("user_id", user.id)
      .eq("plan_slug", plan.slug);

    completedDays = new Set((data ?? []).map((r: { day: number }) => r.day));
  }
  const completedCount = completedDays.size;
const totalDays = days.length;
const pct = totalDays ? completedCount / totalDays : 0;


  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 bg-slate-950 text-slate-100">
      <nav className="mb-6 text-sm text-white/70">
        <Link href="/reading-plans" className="hover:underline">
          ← Reading Plans
        </Link>
      </nav>

      <header className="mb-6">
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        {plan.type === "bible" ? "Bible plan" : "Topic plan"}
      </div>
      <h1 className="mt-2 text-2xl font-semibold text-white/95">{plan.title}</h1>
      <p className="mt-2 text-white/80">{plan.blurb}</p>
    </div>

    {/* Progress ring */}
    <div className="shrink-0 text-right">
      <PlanProgressClient planSlug={plan.slug} totalDays={7} className="ml-2" />

      <div className="mt-1 text-xs text-white/70">
        {completedCount}/{totalDays} days
      </div>
    </div>
  </div>

        <div className="mt-4 inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            {plan.days} days
          </span>
          <span className="text-white/50">•</span>
          <span className="text-xs text-white/70">Average 20-30 min/day</span>
        </div>
      </header>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
        <h2 className="text-sm font-semibold text-white/90">Schedule</h2>

        {days.length === 0 ? (
          <p className="mt-2 text-sm text-white/75">
            No schedule is defined yet for this plan.
          </p>
        ) : (
          <ol className="mt-4 space-y-4">
            {days.map((d: Day) => (
              <li
  id={`day-${d.day}`}
  key={d.day}
  className="group rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 shadow-[0_30px_90px_-60px_rgba(10,10,20,0.85)] hover:bg-white/[0.05] transition"
>
  {/* Header: single column for readability, actions on the right */}
  <div className="flex items-start justify-between gap-4">
    <div className="max-w-2xl">
      <div className="text-[11px] uppercase tracking-[0.26em] text-white/60">
        Day {d.day}
      </div>
      <h3 className="mt-1 text-lg sm:text-xl font-semibold text-gradient-brand drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
  {d.title ?? `Day ${d.day}`}
</h3>

      {d.summary ? (
        <p className="mt-1 text-sm leading-relaxed text-white/80">
          {d.summary}
        </p>
      ) : null}
    </div>

    <div className="flex items-center gap-2 shrink-0">
  {notesDays.has(d.day) ? (
    <StudyNotesButton
      title={`Study notes — Day ${d.day}`}
      planSlug={plan.slug}
      day={d.day}
      // no markdown prop; the button will load /content/plan-notes/<slug>/day-XX.md
    />
  ) : null}

  <MarkCompleteButton
    planSlug={plan.slug}
    day={d.day}
    completed={completedDays.has(d.day)}
  />
</div>

  </div>

  {/* Divider then reading entries */}
  <div className="mt-4 border-t border-white/10 pt-3">
    <ul className="grid gap-3 sm:grid-cols-2">
      {d.entries.map((e, i) => (
        <li
          key={i}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-3 flex items-center justify-between gap-3 hover:bg-white/[0.06] transition"
        >
          <div className="min-w-0">
            <div className="text-sm font-medium text-white/90 truncate">
              {e.ref}
            </div>
            {e.label ? (
              <div className="mt-0.5 text-xs text-white/70 leading-relaxed">
                {e.label}
              </div>
            ) : null}
          </div>

          <Link
            href={toReaderHref(e.ref)}
            className="shrink-0 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20"
          >
            Open in reader
          </Link>
        </li>
      ))}
    </ul>
  </div>
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
