import { createServerSupabase } from '@/lib/supabaseServer';
import ClientBlock from './ClientBlock';
import WriteRowButton from "./WriteRowButton";

export default async function DebugAuthPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();



  return (
    <main className="mx-auto max-w-xl px-6 py-10 space-y-6">
      <h1 className="text-xl font-semibold">Auth Debug</h1>

      <section className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
        <h2 className="text-sm font-semibold">Server session</h2>
        <pre className="mt-2 text-xs whitespace-pre-wrap">
{JSON.stringify({ user: user?.id ?? null }, null, 2)}
        </pre>
      </section>

      <ClientBlock />
       <WriteRowButton />
    </main>
  );
}
