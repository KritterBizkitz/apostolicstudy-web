"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";

type State = {
  user: User | null;
  loading: boolean;
};

export function useSupabaseUser() {
  const [state, setState] = useState<State>({ user: null, loading: true });

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        console.error("[auth] getUser", error.message);
      }
      setState({ user: data?.user ?? null, loading: false });
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setState({ user: session?.user ?? null, loading: false });
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return state;
}
