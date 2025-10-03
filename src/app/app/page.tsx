import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import ContinueReading from "../../components/ContinueReading";
import PinnedPassages from "../../components/PinnedPassages";

export default function AppHome() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-slate-100">
  {/* soft background wash (same vibe as /notes) */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_30%_20%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(50%_35%_at_80%_10%,rgba(16,185,129,0.08),transparent_65%)]" />

      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
  <div className="grid gap-8 xl:grid-cols-12">
    {/* left/main */}
    <div className="xl:col-span-9 space-y-8">
      <ContinueReading />
      {/* your existing card grid here */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {/* ...cards... */}
      </div>
    </div>

    {/* right rail (desktop only) */}
    <aside className="hidden xl:block xl:col-span-3">
      <PinnedPassages />
    </aside>
  </div>
</main>



      {/* Hero strip */}
      <section className="border-b border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* LEFT: title + underline + subtitle */}
      <div className="min-w-0 flex-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight
                       bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          Your study hub
        </h1>
        <div className="mt-2 h-1.5 w-40 rounded-full
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
                        shadow-[0_0_24px_rgba(16,185,129,0.35)]" />
        <p className="mt-3 text-sm text-white/70 max-w-prose">
          “Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.”----2 Timothy 2:15
        </p>
      </div>

      {/* RIGHT: buttons */}
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/read/john/1"
          className="inline-flex items-center justify-center whitespace-nowrap
                     rounded-xl px-4 py-2.5 text-sm
                     border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] transition"
        >
          Open Bible
        </Link>

        <Link
          href="/account"
          className="inline-flex items-center justify-center whitespace-nowrap
                     rounded-xl px-5 py-2.5 text-sm font-medium text-black
                     bg-gradient-to-tr from-indigo-500 to-emerald-500
                     shadow hover:opacity-95 transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* Placeholder main area — we’ll fill with cards next */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Sign in promo (shows even if not wired to auth yet) */}
          <Link
            href="/account"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"
          >
            <div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />

          
            <div className="text-xs px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">
              Sync
            </div>
            <h2 className="text-lg font-semibold mt-2">Sign in to sync</h2>
            <p className="text-white/75 mt-2">
              Save notes, bookmarks, and progress across devices.
            </p>
          </Link>

          <Link
            href="/read/john/1"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"
          

          >
            <div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />

            <h2 className="text-lg font-semibold">Open the Bible</h2>
            <p className="text-white/75 mt-2">Reader · Book → chapter → verse</p>
            <div className="mt-4 text-sm text-white/70">Go to John 1 →</div>
          </Link>

          <Link
            href="/notes"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />

            <h2 className="text-lg font-semibold">Study Notes</h2>
            <p className="text-white/75 mt-2">Access to study notes from Apostolic Ministers and Pastors.</p>
          </Link>

          <Link
            href="/sermons"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />

            <h2 className="text-lg font-semibold">Sermon Notes</h2>
            <p className="text-white/75 mt-2">Outlines and manuscripts.</p>
          </Link>

          <Link
            href="/app" // placeholder for future commentary section
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />
            <div className="text-xs px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">
              Coming Soon
            </div>
            <h2 className="text-lg font-semibold">Teaching Guides</h2>
            <p className="text-white/75 mt-2">Lesson plans & walkthroughs.</p>
          </Link>

          <Link
            href="/app"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />
            <div className="text-xs px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">
              Coming Soon
            </div>
            <h2 className="text-lg font-semibold">Bookmarks & Highlights</h2>
            <p className="text-white/75 mt-2">Quickly return to key passages.</p>
          </Link>

          <Link
            href="/reading-plans"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />
            <div className="text-xs px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">
              BETA
            </div>
            <h2 className="text-lg font-semibold">Reading Plans</h2>
            <p className="text-white/75 mt-2">Gospels in 60 days · Bible in a year.</p>
          </Link>

          <Link
            href="/app"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur
           hover:border-white/25 hover:bg-white/[0.04] transition"

          ><div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />
            <div className="text-xs px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">
              Coming Soon
            </div>
            <h2 className="text-lg font-semibold">Downloads</h2>
            <p className="text-white/75 mt-2">Reference sheets & printables.</p>
          </Link>

          {/* add more cards as needed */}
        </div>
        {/* CTA */}
      <section id="cta" className="relative border-t border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent_75%)]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-emerald-400/30 p-10 shadow-[0_60px_140px_-70px_rgba(6,182,212,0.8)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.22), rgba(15,23,42,0.9) 45%, rgba(99,102,241,0.22))",
            }}
          >
            <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-6 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-100/80">CALLED TO BUILD SOMETHING THAT LASTS?</p>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Share your wisdom, strengthen the Body, and help equip future generations with truth.
                </h3>
                <p className="mt-4 text-sm text-white/80 sm:text-base">
                  Join a growing network of Apostolic teachers by contributing your outlines, Bible studies, sermon notes, or doctrinal writings to help fill this hub with deep, Spirit-led content.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/20"
                >
                  Open the app
                </Link>
                <Link
                  href="/early-access"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Join The Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    </div>
    
  );
}