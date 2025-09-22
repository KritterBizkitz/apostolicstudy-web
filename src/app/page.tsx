// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-semibold">ApostolicStudy</h1>
        <p className="text-white/70">
          A clean, focused study space for Scripture, notes, and sermons.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/app"
            className="rounded-xl px-5 py-3 bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Launch Bible App
          </Link>
          <Link
            href="/read/john/1"
            className="rounded-xl px-5 py-3 border border-white/10 hover:bg-white/10"
          >
            Jump to John 1
          </Link>
        </div>
      </div>
    </main>
  );
}
