// src/app/reading-plans/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPlanBySlug, type Plan } from "@/data/readingPlans";
// If the '@' alias errors, use: import { findPlanBySlug, type Plan } from "../../../data/readingPlans";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) return { title: "Plan not found" };
  return {
    title: `${plan.title} · Reading Plan`,
    description: plan.blurb,
  };
}

export default function PlanPage({ params }: { params: Params }) {
  const plan = findPlanBySlug(params.slug);
  if (!plan) notFound();

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
        <p className="mt-2 text-sm text-white/75">
          Day-by-day readings will appear here. For now this is a placeholder so routing works.
        </p>

        <div className="mt-4">
          <button
            className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
          >
            Start plan
          </button>
        </div>
      </section>
    </main>
  );
}
