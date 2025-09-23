import Link from "next/link";
import AppHeader from "../../components/AppHeader";

export default function AppHome() {
  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100">
      <AppHeader />

      {/* Hero strip */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Your study hub
              </h1>
              <p className="mt-2 text-white/80 max-w-prose">
                Open the Word, continue where you left off, or start notes and sermons—all in one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/read/john/1"
                className="rounded-xl px-5 py-2.5 bg-white/10 border border-white/10 hover:bg-white/15"
              >
                Open Bible
              </Link>
              <Link
                href="/account"
                className="rounded-xl px-5 py-2.5 bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black font-medium shadow hover:shadow-indigo-500/25"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder main area — we’ll fill with cards next */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/read/john/1" className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 hover:bg-white/[0.07] transition">
            <h2 className="text-lg font-semibold">Open the Bible</h2>
            <p className="text-white/75 mt-2">Reader • Book → chapter → verse</p>
          </Link>

          <Link href="/notes" className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 hover:bg-white/[0.07] transition">
            <h2 className="text-lg font-semibold">Study Notes</h2>
            <p className="text-white/75 mt-2">Capture insights as you read.</p>
          </Link>

          <Link href="/sermons" className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 hover:bg-white/[0.07] transition">
            <h2 className="text-lg font-semibold">Sermon Notes</h2>
            <p className="text-white/75 mt-2">Outlines and manuscripts.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
