'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { biblePlans, topicPlans, type Plan } from '@/data/readingPlans';
// If the @ alias isn't set, use: import { biblePlans, topicPlans, type Plan } from '../../data/readingPlans';

type Mode = 'bible' | 'topic';

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

export default function ReadingPlansToggle() {
  const [mode, setMode] = useState<Mode>('bible');

  // Scroll helpers for the Bible row
  const bibleRef = useRef<HTMLDivElement>(null);
  function scrollBibleLeft() {
    bibleRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
  }
  function scrollBibleRight() {
    bibleRef.current?.scrollBy({ left: 360, behavior: 'smooth' });
  }
  // Scroll helpers for the Topic row
  const topicRef = useRef<HTMLDivElement>(null);
  function scrollTopicLeft() {
    topicRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
  }
  function scrollTopicRight() {
    topicRef.current?.scrollBy({ left: 360, behavior: 'smooth' });
  }

  return (
    <section>
      {/* Segmented toggle */}
      <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => setMode('bible')}
          aria-pressed={mode === 'bible'}
          className={`px-3 py-2 text-sm rounded-xl transition ${
            mode === 'bible'
              ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/40'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          Read the Bible
        </button>
        <button
          type="button"
          onClick={() => setMode('topic')}
          aria-pressed={mode === 'topic'}
          className={`px-3 py-2 text-sm rounded-xl transition ${
            mode === 'topic'
              ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/40'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          Learn a Topic
        </button>
      </div>

      {/* Mode content */}
      <div className="mt-6">
        {mode === 'bible' ? (
          <div>
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Featured plans
            </h2>

            <div className="relative">
              {/* Left arrow */}
              <button
                type="button"
                aria-label="Scroll left"
                onClick={scrollBibleLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 m-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur hover:bg-black/55"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Right arrow */}
              <button
                type="button"
                aria-label="Scroll right"
                onClick={scrollBibleRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 m-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur hover:bg-black/55"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
                  <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/70 to-transparent rounded-l-3xl" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/70 to-transparent rounded-r-3xl" />

              {/* Scroll container */}
              <div ref={bibleRef} className="mt-4 overflow-x-auto scroll-smooth scrollbar-hide">
                <ul className="flex flex-nowrap gap-4 min-w-full pr-8">
                  {biblePlans.map((p: Plan) => (
                    <li key={p.slug} className="w-[320px] shrink-0">
                      <PlanCard plan={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Topic plans
            </h2>

            <div className="relative min-h-[220px]">
              {/* Left arrow */}
              <button
                type="button"
                aria-label="Scroll left"
                onClick={scrollTopicLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 m-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur hover:bg-black/55"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Right arrow */}
              <button
                type="button"
                aria-label="Scroll right"
                onClick={scrollTopicRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 m-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur hover:bg-black/55"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/80">
                  <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/70 to-transparent rounded-l-3xl" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/70 to-transparent rounded-r-3xl" />

              {/* Scroll container */}
              <div ref={topicRef} className="mt-4 overflow-x-auto scroll-smooth scrollbar-hide">
                <ul className="flex flex-nowrap gap-4 min-w-full pr-8">
                  {topicPlans.map((p: Plan) => (
                    <li key={p.slug} className="w-[320px] shrink-0">
                      <PlanCard plan={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
