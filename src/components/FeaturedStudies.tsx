import Link from "next/link";

type Study = {
  title: string;
  blurb: string;
  href: string;
  tag?: string;
};

const featured: Study[] = [
  {
    title: "Oneness – Part 1",
    blurb: "Discover how eternal life is tied to knowing who Jesus truly is. This study explores the prayer of John 17, the dual nature of Christ, and the foundation of the Church built on the revelation that Jesus is the fullness of the Godhead.",
    href: "https://tfaewswhsinfnqpfgtch.supabase.co/storage/v1/object/public/notes-public/study/Oneness%20Part%201.pdf",
    tag: "Featured"
  },
  {
    title: "Oneness – Part 2",
    blurb: "A deep look at Peter’s confession, “Thou art the Christ, the Son of the living God,” and how the Church is founded not on tradition, but on the revelation of who Jesus is. Learn why the Old Testament pattern proves the oneness of God and exposes the roots of Trinitarian doctrine.",
    href: "https://tfaewswhsinfnqpfgtch.supabase.co/storage/v1/object/public/notes-public/study/Oneness%20Part%202.pdf",
    tag: "Featured"
  },
  {
    title: "Oneness – Part 3",
    blurb: "Understand the dual nature of Jesus—fully God and fully man. This study explains why He prayed, hungered, and suffered as a man, yet forgave sins, raised the dead, and revealed the Father as God. The revelation of Christ’s identity is the cornerstone of true faith.",
    href: "https://tfaewswhsinfnqpfgtch.supabase.co/storage/v1/object/public/notes-public/study/Oneness%20Part%203.pdf",
    tag: "Featured"
  },
  {
    title: "Oneness – Part 4",
    blurb: "From John 3:16 to Isaiah 53, this lesson shows how God Himself became our Redeemer. Jesus was both the sacrifice and the high priest, taking His own blood into heaven. Explore the five works of the Sonship—redemption, mediation, kingship, victory over death, and judgment.",
    href: "https://tfaewswhsinfnqpfgtch.supabase.co/storage/v1/object/public/notes-public/study/Oneness%20Part%204.pdf",
    tag: "Featured"
  },
];

export default function FeaturedStudies({
  studies = featured,
}: {
  studies?: Study[];
}) {
  return (
    <section
      aria-label="Featured studies"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        Featured Studies
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {studies.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            {/* glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20" />
            {/* gradient edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {s.tag && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
                {s.tag}
              </div>
            )}

            <h3 className="text-base font-semibold text-white/95">
              {s.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
              {s.blurb}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300/90">
              Read now
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.293 4.293a1 1 0 011.414 0l4 4a.997.997 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 10H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
