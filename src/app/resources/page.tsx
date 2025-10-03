import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Resources",
  description:
    "Curated tools, trustworthy references, and books by James Ashley.",
};

type Book = {
  title: string;
  cover: string;     // /public path
  url: string;       // Amazon product link
  blurb: string;
};

const books: Book[] = [
  {
    title: "Men and Brethren",
    cover: "/books/men-and-brethren.jpg",
    url: "https://www.amazon.com/dp/B0CPW7YF24",
    blurb:
      "Biblical salvation made plain, from repentance to baptism in Jesus’ name.",
  },
  {
    title: "Living Waters",
    cover: "/books/living-waters.jpg",
    url: "https://www.amazon.com/dp/B0D9T7HRLZ",
    blurb:
      "Spirit baptism explained with scripture, why tongues still flow, and how to receive.",
  },
  {
    title: "None Other Name Under Heaven",
    cover: "/books/none-other-name.jpg",
    url: "https://www.amazon.com/dp/B0F4LV573F",
    blurb:
      "The authority, power, and necessity of the name of Jesus from Genesis to Revelation.",
  },
];

type Resource = { name: string; url: string; note?: string };

const outsideLinks: Resource[] = [
  { name: "Pentecostal Assemblies of the World", url: "https://pawinc.org/" },
  { name: "United Pentecostal Church", url: "https://upci.org/" },
  { name: "Revival Church", url: "https://www.cadizrevival.com" },
  { name: "First Apostolic Council", url: "https://www.firstapostoliccouncil.com/" },
  { name: "Pentecostal Publishing House", url: "https://pentecostalpublishing.com/" },
  { name: "Apostolic World Christian Fellowship", url: "https://www.awcf.org/" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      {children}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
        <Image
          src={book.cover}
          alt={`${book.title} book cover`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
          priority={false}
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white/95">{book.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{book.blurb}</p>

      <div className="mt-4">
        <Link
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
        >
          Buy on Amazon
        </Link>
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-white/95">Resources</h1>
        <p className="mt-2 text-white/80">
          Useful tools for study and research, plus books I have written.
        </p>
      </header>

      {/* Outside links */}
      <section className="mb-12">
        <SectionTitle>Trusted links</SectionTitle>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outsideLinks.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.07]"
            >
              <div className="text-base font-medium text-white/90">{r.name}</div>
              {r.note ? (
                <div className="mt-1 text-sm text-white/70">{r.note}</div>
              ) : null}
            </a>
          ))}
        </div>
      </section>

      {/* Books */}
      <section>
        <SectionTitle>Books</SectionTitle>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b.title} book={b} />
          ))}
        </div>
      </section>
    </main>
  );
}
