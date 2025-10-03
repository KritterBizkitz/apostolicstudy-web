"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

export default function AppHeader() {
  const pathname = usePathname();

  // Hide the global header on reader pages
  if (pathname?.startsWith("/read")) return null;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-500" />
          <span className="font-medium">ApostolicStudy</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <label className="sr-only" htmlFor="app-search">Search</label>
            <input
              id="app-search"
              placeholder="Go to book, reference, or search…"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm placeholder-white/50 outline-none focus:border-emerald-400/40"
            />
          </div>
        </div>

        {/* Right side */}
        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/resources"
            className="rounded-xl px-3 py-2 text-sm bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Resources
          </Link>
          <Link
            href="/settings"
            className="rounded-xl px-3 py-2 text-sm bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Settings
          </Link>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
