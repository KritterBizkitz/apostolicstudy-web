'use client';

import { useEffect, useState, type ReactElement } from 'react';
import ProgressRing from './ProgressRing';
import { createBrowserSupabase } from '@/lib/supabaseClient';

type Props = {
  planSlug: string;
  totalDays: number;
  className?: string;
};

export default function PlanProgressClient(
  { planSlug, totalDays, className }: Props
): ReactElement {
  const [value, setValue] = useState(0);      // 0..1
  const [caption, setCaption] = useState('0%');

  useEffect(() => {
    let alive = true;
    const supabase = createBrowserSupabase();

    async function load() {
      // get current browser session
      const { data: { session } } = await supabase.auth.getSession();

      // no session -> 0%
      if (!session) {
        if (!alive) return;
        setValue(0);
        setCaption('0%');
        return;
      }

      // call our API with a Bearer token so RLS can identify the user
      const res = await fetch(
        `/api/progress?plan=${encodeURIComponent(planSlug)}`,
        { cache: 'no-store', headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      const { count = 0 } = await res.json();

      if (!alive) return;

      const v = totalDays > 0 ? Number(count) / totalDays : 0;
      setValue(v);
      setCaption(`${Math.round(v * 100)}%`);
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [planSlug, totalDays]);

  return <ProgressRing value={value} caption={caption} className={className} />;
}
