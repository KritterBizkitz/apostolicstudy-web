'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabaseClient';

export default function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onClick = async () => {
    if (pending) return;
    setErr(null);
    setPending(true);
    try {
      const supabase = createBrowserSupabase();
      await supabase.auth.signOut();                  // clear session
      window.dispatchEvent(new Event('as:notes:changed')); // let NotesPanel update

      // Navigate away and force a server refresh so UI re-renders logged-out
      router.replace('/app');                         // use '/' if that’s your landing page
      router.refresh();
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to sign out');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className={className}
      >
        {pending ? 'Signing out…' : 'Sign out'}
      </button>
      {err ? <p className="mt-2 text-sm text-red-300">{err}</p> : null}
    </>
  );
}
