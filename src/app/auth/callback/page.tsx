"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    (async () => {
      try {
        // Requires NEXT_PUBLIC_SUPABASE_URL + ANON set and the redirect URL allowed in Supabase
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          setMsg(error.message);
          return;
        }
        setMsg("Signed in. Redirecting…");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMsg(error.message);
        } else {
          setMsg("There was a problem signing you in.");
        }
      } finally {
        setTimeout(() => router.replace("/app"), 600);
      }
    })();
  }, [router]);

  return (
    <main className="min-h-[60vh] grid place-items-center">
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4">
        {msg}
      </div>
    </main>
  );
}
