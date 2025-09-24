// app/read/page.tsx
import { notFound } from "next/navigation";

export default function ReadPage({
  searchParams,
}: { searchParams: { url?: string; title?: string } }) {
  const url = searchParams?.url;
  const title = searchParams?.title ?? "Document";
  if (!url) return notFound();

  const proxied = `/api/open?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(`${title}.pdf`)}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-lg font-medium mb-3">{title}</h1>
      <div className="rounded-xl border border-white/10 overflow-hidden bg-black/30" style={{ height: "80vh" }}>
        <iframe src={proxied} title={title} className="w-full h-full" />
      </div>
    </div>
  );
}
