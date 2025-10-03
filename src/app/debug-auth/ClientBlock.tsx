'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabaseClient';

export default function ClientBlock() {
  const supabase = createBrowserSupabase();
  const [client, setClient] = useState<{ user: string | null; expires_at: number | null } | null>(null);


  useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setClient({ user: data.user?.id ?? null, expires_at: null as any });
  });
}, [supabase]);


  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
      <h2 className="text-sm font-semibold">Client session</h2>
      <pre className="mt-2 text-xs whitespace-pre-wrap">
        {JSON.stringify(client, null, 2)}
      </pre>
    </section>
  );
}
