'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createBrowserSupabase } from '@/lib/supabaseClient';

/** Returns the current Supabase user (or null). Keeps itself in sync. */
export function useSupabaseUser() {
  const supabase = createBrowserSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;

    // Authoritative fetch of the user
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        console.error('[auth] getUser', error.message);
        return;
      }
      setUser(data.user ?? null);
    });

    // Stay in sync with auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  return user;
}
