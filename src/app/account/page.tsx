"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [me, setMe] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMe(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setMe(session?.user?.email ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithPassword() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setMsg(error ? error.message : "Signed in.");
  }

  async function signUpWithPassword() {
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password: pw });
    setMsg(error ? error.message : "Check your email to confirm your account.");
  }

  async function sendMagicLink() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setMsg(error ? error.message : "Magic link sent. Check your inbox.");
  }

  async function signInWithProvider(p: "google" | "facebook") {
    setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: p,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setMsg(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMsg("Signed out.");
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold">My Account</h1>

      {me ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <div className="text-white/80">Signed in as <strong>{me}</strong></div>
          <button
            onClick={signOut}
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 space-y-3">
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none"
              placeholder="you@example.com"
            />
            <label className="block text-sm mt-2">Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none"
              placeholder="••••••••"
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <button onClick={signInWithPassword}
                className="rounded-xl px-4 py-2 bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black">
                Sign in
              </button>
              <button onClick={signUpWithPassword}
                className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15">
                Create account
              </button>
              <button onClick={sendMagicLink}
                className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15">
                Email me a magic link
              </button>
              <button onClick={() => signInWithProvider("google")}
                className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15">
                Continue with Google
              </button>
              <button onClick={() => signInWithProvider("facebook")}
                className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15">
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      )}

      {msg && <p className="mt-4 text-white/75">{msg}</p>}
    </main>
  );
}
