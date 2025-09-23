"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

function initialsFromEmail(email?: string) {
  if (!email) return "U";
  const name = email.split("@")[0].replace(/[^\w]+/g, " ");
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0]?.toUpperCase() ?? email[0].toUpperCase();
  const second = parts[1]?.[0]?.toUpperCase() ?? "";
  return `${first}${second}`;
}

export default function UserMenu() {
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setEmail(session?.user?.email ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!email) {
    return (
      <Link
        href="/account"
        className="rounded-xl px-3 py-2 bg-white/10 border border-white/10 hover:bg-white/15"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10"
      >
        <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black font-semibold">
          {initialsFromEmail(email)}
        </span>
        <span className="hidden sm:block text-sm text-white/80">{email}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-48 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur p-2 shadow-lg z-50">
          <Link
            href="/account"
            className="block rounded-lg px-3 py-2 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            My account
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setOpen(false);
            }}
            className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
