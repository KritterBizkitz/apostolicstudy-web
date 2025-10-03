// src/app/reading-plans/page.tsx
import type { Metadata } from "next";
import ReadingPlansToggle from "@/components/ReadingPlansToggle";
import { useState } from "react";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Reading Plans",
  description: "Read through the Bible, or learn a doctrine step by step.",
};

type Plan = { slug: string; title: string; days: number; blurb: string };

const biblePlans: Plan[] = [
  {
    slug: "bible-in-a-year-chronological",
    title: "Chronological Bible in a Year",
    days: 365,
    blurb: "Follow the story as it happened, from creation to the early church.",
  },
  {
    slug: "bible-in-a-year-canonical",
    title: "Canonical Bible in a Year",
    days: 365,
    blurb: "Straight through, book by book, steady and simple.",
  },
  {
    slug: "mcheyne-one-year",
    title: "M’Cheyne One-Year",
    days: 365,
    blurb: "OT once, NT and Psalms twice, balanced daily readings.",
  },
  {
    slug: "nt-in-90-days",
    title: "New Testament in 90 Days",
    days: 90,
    blurb: "The life and teaching of Jesus and the apostles.",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur">
      <h3 className="text-base font-semibold text-white/95">{plan.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{plan.blurb}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          {plan.days} days
        </span>
        <Link
          href={`/reading-plans/${plan.slug}`}
          className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
        >
          View plan
        </Link>
      </div>
    </article>
  );
}


export default function ReadingPlansPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-white/95">Reading Plans</h1>
        <p className="mt-2 text-white/80">
          Read through the Bible, or learn a doctrine step by step.
        </p>
      </header>

      {/* render the toggle */}
      <ReadingPlansToggle />
    </main>
  );
}
