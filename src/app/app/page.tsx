// src/app/app/page.tsx
import Link from "next/link";

export const metadata = { title: "ApostolicStudy • App" };

export default function AppStart() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="text-white/70 mt-1">
          Choose where to begin. More sections coming soon.
        </p>
      </header>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Open the Bible"
          desc="Read and navigate by book, chapter, and verse."
          href="/read/john/1"
          accent="from-emerald-500/20"
          badge="Ready"
        />
        <Card
          title="Bible Study Notes"
          desc="A growing library of study notes."
          href="/notes"
          accent="from-indigo-500/20"
          badge="New"
        />
        <Card
          title="Sermon Notes"
          desc="Drafts, outlines, and manuscripts."
          href="/sermons"
          accent="from-amber-500/25"
        />
        <Card
          title="Commentary"
          desc="Apostolic commentary (in progress)."
          href={undefined} // disabled for now
          accent="from-cyan-500/20"
          badge="Coming soon"
        />
        <Card
          title="My Account"
          desc="Sign in and manage preferences."
          href="/account"
          accent="from-fuchsia-500/20"
        />
        <Card
          title="Settings"
          desc="Theme, font size, reading width."
          href="/settings"
          accent="from-sky-500/20"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  href,
  accent,
  badge,
}: {
  title: string;
  desc: string;
  href?: string;
  accent: string; // tailwind gradient, e.g. "from-emerald-500/20"
  badge?: string;
}) {
  const Inner = (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 p-5",
        "bg-gradient-to-br",
        accent,
        "to-white/[0.02] hover:border-white/20 transition hover:-translate-y-0.5",
        href ? "cursor-pointer" : "opacity-60 cursor-not-allowed",
      ].join(" ")}
    >
      {badge ? (
        <span className="absolute right-3 top-3 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
          {badge}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/70">{desc}</p>
    </div>
  );

  return href ? <Link href={href}>{Inner}</Link> : Inner;
}
