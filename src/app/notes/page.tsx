// app/notes/page.tsx
import { getServerSupabase } from "@/lib/supabaseServer";
import Link from "next/link";

// Simple type for our query result
type Note = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  published_at: string | null;
  type: "study" | "sermon";
};

export const revalidate = 60; // ISR: re-fetch every 60s so new notes appear without redeploys

export default async function StudyNotesPage() {
  const supabase = getServerSupabase();

  const { data, error } = await supabase
    .from("notes")
    .select("id,title,description,file_url,published_at,type")
    .eq("type", "study")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    // basic fallback
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Study Notes</h1>
        <p className="text-red-500">Failed to load notes. {error.message}</p>
      </div>
    );
  }

  const notes = (data ?? []) as Note[];

  return (
  <div className="relative">
    {/* soft background wash */}
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_30%_20%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(50%_35%_at_80%_10%,rgba(16,185,129,0.08),transparent_65%)]" />

    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-10">
  <div className="relative">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight
                   bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
      Study Notes
    </h1>

    {/* gradient underline */}
    <div className="mt-2 h-1.5 w-40 rounded-full
                    bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
                    shadow-[0_0_24px_rgba(16,185,129,0.35)]" />
  </div>

  {/* subtitle row with a small badge */}
  {/* subtitle with free-to-use note and scripture */}
<div className="mt-3 space-y-2 text-sm text-white/70">
  <div className="flex items-center gap-3">
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-2 py-1 text-xs text-white/80">
      📚 {notes.length} available
    </span>
    <span>Freely given resources for teaching, preaching, and personal study.</span>

  </div>

  <p className="text-white/65 italic">
    Matthew 10:8 “Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give.”
  </p>
</div>

</header>


      {notes.length === 0 ? (
        <p className="text-white/70">No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {notes.map((n) => (
            <article
              key={n.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur
                         hover:border-white/25 hover:bg-white/[0.04] transition"
            >
              {/* tiny accent bar */}
              <div className="mb-3 h-1 rounded-full bg-gradient-to-r from-indigo-500/50 via-sky-500/40 to-emerald-500/50" />

              <h2 className="text-base font-semibold tracking-tight">{n.title}</h2>
              {n.description ? (
                <p className="mt-1 text-sm text-white/70 line-clamp-3">{n.description}</p>
              ) : (
                <p className="mt-1 text-sm text-white/50 italic">No description</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/read?url=${encodeURIComponent(n.file_url)}&title=${encodeURIComponent(n.title)}`}
                  className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm
                             bg-gradient-to-r from-indigo-600/20 to-emerald-600/20
                             hover:from-indigo-600/30 hover:to-emerald-600/30"
                >
                  Open
                </Link>

                <a
                  href={n.file_url}
                  download
                  className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm
                             hover:border-white/30"
                >
                  Download
                </a>
              </div>

              {n.published_at && (
                <p className="mt-3 text-xs text-white/45">
                  Published {new Date(n.published_at).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
