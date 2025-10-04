// app/sermons/page.tsx
import { getServerSupabase } from "@/lib/supabaseServer";
import { createServerSupabase } from "@/lib/supabaseServer";
type Note = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  published_at: string | null;
  type: "study" | "sermon";
};

export const revalidate = 60;

export default async function SermonNotesPage() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("notes")
    .select("id,title,description,file_url,published_at,type")
    .eq("type", "sermon")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Sermon Notes</h1>
        <p className="text-red-500">Failed to load notes. {error.message}</p>
      </div>
    );
  }

  const notes = (data ?? []) as Note[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Sermon Notes</h1>
        <p className="text-sm text-white/60">
          Public sermon notes. Open or download without signing in.
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="text-white/70">No notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((n) => (
            <article
              key={n.id}
              className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur hover:border-white/20 transition"
            >
              <h2 className="text-base font-medium">{n.title}</h2>
              {n.description ? (
                <p className="mt-1 text-sm text-white/70 line-clamp-3">{n.description}</p>
              ) : (
                <p className="mt-1 text-sm text-white/50 italic">No description</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={n.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:border-white/30"
                >
                  Open
                </a>
                <a
                  href={n.file_url}
                  download
                  className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:border-white/30"
                >
                  Download
                </a>
              </div>

              {n.published_at && (
                <p className="mt-3 text-xs text-white/40">
                  Published {new Date(n.published_at).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
