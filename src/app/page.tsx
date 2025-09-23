// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-100 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: headline + pitch + buttons */}
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 bg-white/10 border border-white/10 rounded-full px-3 py-1">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Doctrinally Apostolic • Trust the Word, not the world
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold leading-tight">
              Study the Word.{" "}
              <span className="bg-gradient-to-tr from-indigo-400 to-emerald-300 bg-clip-text text-transparent">
                Teach with clarity.
              </span>
            </h1>

            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Built for proper exegesis—historical context, authorial intent,
              and the whole counsel of Scripture—putting context before commentary 
              and Scripture interpreting Scripture, without the noise.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="px-6 py-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black font-medium shadow-lg hover:shadow-indigo-500/25"
              >
                Launch Bible App
              </Link>

              <Link
                href="/read/john/1"
                className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/15"
              >
                Jump to John 1
              </Link>
            </div>

            <div className="mt-6 text-sm text-white/70 flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                No sign-in required to read
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400 inline-block" />
                Distraction-free
              </span>
            </div>
          </div>

          {/* Right: decorative reader preview */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 shadow-2xl">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                  <span>John 1</span>
                  <div className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-rose-400" />
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <p>
                    <span className="text-white/60 mr-2">1</span>
                    <span className="font-serif">
                      In the beginning was the Word, and the Word was with God, and the Word was God.
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60 mr-2">2</span>
                    <span className="font-serif">The same was in the beginning with God.</span>
                  </p>
                  <p>
                    <span className="text-white/60 mr-2">3</span>
                    <span className="font-serif">
                      All things were made by him; and without him was not any thing made that was made.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* soft ambient glow behind the card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -z-10 inset-0 blur-3xl bg-gradient-to-tr from-indigo-500/20 via-emerald-400/10 to-transparent"
            />
          </div>
        </div>
      </section>
      {/* VALUE CARDS / FEATURES */}
<section id="features" className="py-16 border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
  <span className="heading-swipe swipe-indigo-emerald">Built for real study</span>
</h2>


    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1 */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-500 mb-4" />
        <h3 className="text-lg font-semibold">Fast reader</h3>
        <p className="mt-2 text-white/80">
          Book → chapter → verse. Clean typography and instant navigation.
        </p>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 mb-4" />
        <h3 className="text-lg font-semibold">Distraction-free</h3>
        <p className="mt-2 text-white/80">
          A focused canvas so the Word—not the UI—gets your attention.
        </p>
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 mb-4" />
        <h3 className="text-lg font-semibold">Notes that grow</h3>
        <p className="mt-2 text-white/80">
          Keep living study notes and sermon drafts—organized, searchable.
        </p>
      </div>

      {/* Card 4 */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-amber-500 to-pink-500 mb-4" />
        <h3 className="text-lg font-semibold">Grounded in Doctrine</h3>
        <p className="mt-2 text-white/80">
          Designed around Apostolic doctrine—tools that help you study, teach, and stay anchored to the Word.
        </p>
      </div>
    </div>
  </div>
</section>
{/* COMPARE THE LENSES */}
<section id="compare" className="py-16 border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">
  <span className="heading-swipe swipe-emerald-cyan">Compare the lenses</span>
</h2>

        <p className="mt-2 text-white/80 max-w-2xl">
          Many classic commentaries read key texts through a Trinitarian lens.
          ApostolicStudy is built for <em>context before commentary</em> and
          <em> Scripture interpreting Scripture</em>, confessing that God is one and fully revealed in Jesus.
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</span>
        <span className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-400/30">ApostolicStudy Exegesis</span>
      </div>
    </div>

    <div className="space-y-8">
      {/* Item: John 1:1–3 */}
      <article className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">John 1:1–3</h3>
          <Link href="/read/john/1" className="text-sm text-white/70 hover:text-white/90">Open in reader →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</div>
            <p className="text-white/85">
              “The Word” is the eternal second Person, personally distinct from the Father yet fully divine.
              Creation is through the Son as a co-eternal person.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">ApostolicStudy Exegesis</div>
            <p className="text-white/90">
              “Word” (Logos) is God’s own self-expression—God Himself in self-revelation. The one God later became flesh as Jesus Christ.
              Distinction is functional/relational, not a second divine person.
            </p>
          </div>
        </div>
      </article>

      {/* Item: Matthew 28:19 */}
      <article className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Matthew 28:19</h3>
          <Link href="/read/matthew/28" className="text-sm text-white/70 hover:text-white/90">Open in reader →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</div>
            <p className="text-white/85">
              Baptism “in the name of the Father, and of the Son, and of the Holy Spirit” affirms three co-equal, co-eternal persons.
              Acts baptisms in Jesus’ name are treated as shorthand, not the formula.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">ApostolicStudy Exegesis</div>
            <p className="text-white/90">
              “Name” is singular and fulfilled in Jesus. The apostles consistently baptize <em>in the name of Jesus</em>
              (Acts 2:38; 8:16; 10:48; 19:5) as the intended application of Christ’s words.
            </p>
          </div>
        </div>
      </article>

      {/* Item: John 17:5 */}
      <article className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">John 17:5</h3>
          <Link href="/read/john/17" className="text-sm text-white/70 hover:text-white/90">Open in reader →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</div>
            <p className="text-white/85">
              The Son, as a distinct person, shared personal pre-existence and glory alongside the Father before creation.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">ApostolicStudy Exegesis</div>
            <p className="text-white/90">
              The glory belongs to God alone and is manifested/planned “with” God. Jesus speaks from the incarnational role about the
              glory that existed in God (the Logos) and is now revealed in the man Christ Jesus.
            </p>
          </div>
        </div>
      </article>

      {/* Item: Colossians 2:9 */}
      <article className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Colossians 2:9</h3>
          <Link href="/read/colossians/2" className="text-sm text-white/70 hover:text-white/90">Open in reader →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</div>
            <p className="text-white/85">
              The fullness of deity dwells bodily in Christ, the second person incarnate; the Father remains a distinct person.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">ApostolicStudy Exegesis</div>
            <p className="text-white/90">
              <strong>All</strong> the fullness of the Godhead dwells in Jesus bodily—God is fully and uniquely revealed in Christ,
              not divided among multiple divine persons.
            </p>
          </div>
        </div>
      </article>

      {/* Item: Deut 6:4 / Mark 12:29 */}
      <article className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Deuteronomy 6:4 / Mark 12:29</h3>
          <div className="flex items-center gap-3">
            <Link href="/read/deuteronomy/6" className="text-sm text-white/70 hover:text-white/90">Open Deut →</Link>
            <Link href="/read/mark/12" className="text-sm text-white/70 hover:text-white/90">Open Mark →</Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-white/10 border border-white/10">Popular Commentary (Trinitarian)</div>
            <p className="text-white/85">
              “One” means unity of essence shared by three persons.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <div className="text-xs mb-2 px-2 py-0.5 inline-block rounded bg-emerald-500/20 border border-emerald-400/30">ApostolicStudy Exegesis</div>
            <p className="text-white/90">
              “One” is numerically one—<strong>a single, indivisible God</strong> who has now made Himself known in the man Christ Jesus and by His Spirit.
            </p>
          </div>
        </div>
      </article>
    </div>

    <p className="mt-8 text-xs text-white/60">
      Notes: “Popular Commentary (Trinitarian)” summaries are paraphrased general viewpoints, not quotations.
          </p>
  </div>
</section>

{/* WHY / DOCTRINE */}
<section id="doctrine" className="py-20 border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-2 items-start">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">
  <span className="heading-swipe swipe-indigo-emerald">Why ApostolicStudy?</span>
</h2>

        <p className="mt-4 text-white/85 max-w-prose">
          Tools shape habits. We’re building for long-form reading, careful study, and doctrine that stays centered on Scripture.
        </p>
        <ul className="mt-6 space-y-3 text-white/85">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-500/80" />
            <span><strong>Scripture first.</strong> Everything serves the text, not trends.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-indigo-500/80" />
            <span><strong>Oneness Apostolic convictions.</strong> Grounded in Apostolic doctrine and practice.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-cyan-500/80" />
            <span><strong>Clarity over clutter.</strong> A reader that helps you keep going.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-amber-500/80" />
            <span><strong>Built for teaching.</strong> Notes, sermon prep, and study that travel with you.</span>
          </li>
        </ul>

        <div className="mt-8">
          <Link
            href="/app"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-500 text-black font-medium shadow-lg hover:shadow-indigo-500/25"
          >
            Launch Bible App
          </Link>
        </div>
      </div>

      {/* supporting card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6">
        <h3 className="text-lg font-semibold">Designed for depth</h3>
        <p className="mt-2 text-white/80">
          Whether you’re preparing a sermon or leading a study, the experience stays simple and steady—so doctrine and discipleship get your focus.
        </p>
        <div className="mt-6 space-y-3 leading-relaxed">
          <p><span className="text-white/60 mr-2">Acts 2:42</span><span className="font-serif">And they continued steadfastly in the apostles’ doctrine and fellowship…</span></p>
          <p><span className="text-white/60 mr-2">2 Tim 2:15</span><span className="font-serif">Study to shew thyself approved unto God…</span></p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* RESOURCES */}
<section id="resources" className="py-16 border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
  <span className="heading-swipe swipe-indigo-emerald">Resources</span>
</h2>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/app" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors block">
        <h3 className="text-lg font-semibold">Study Notes</h3>
        <p className="mt-2 text-white/80">Living notes that grow with your study.</p>
      </Link>

      <Link href="/app" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors block">
        <h3 className="text-lg font-semibold">Sermon Notes</h3>
        <p className="mt-2 text-white/80">Drafts, outlines, and manuscripts in one place.</p>
      </Link>

      <Link href="/app" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors block">
        <h3 className="text-lg font-semibold">Teaching Guides</h3>
        <p className="mt-2 text-white/80">Lesson plans and walkthroughs for classes.</p>
      </Link>

      <Link href="/app" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors block">
        <h3 className="text-lg font-semibold">Downloads</h3>
        <p className="mt-2 text-white/80">Reference sheets and printables you can share.</p>
      </Link>
    </div>
  </div>
</section>
{/* FAQ */}
<section id="faq" className="py-16 border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
  <span className="heading-swipe swipe-indigo-emerald">FAQ</span>
</h2>

    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h3 className="font-semibold">Is the KJV text free to use?</h3>
        <p className="mt-2 text-white/80">
          Yes. The King James Version is public domain. We present it with careful, readable formatting.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h3 className="font-semibold">Do I need an account?</h3>
        <p className="mt-2 text-white/80">
          You can read without signing in. Notes and highlights can sync across devices when you create an account.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h3 className="font-semibold">Will this replace my paper Bible?</h3>
        <p className="mt-2 text-white/80">
          No. This is a tool for study and teaching. Keep bringing your paper Bible to church and devotions.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h3 className="font-semibold">Can I suggest features?</h3>
        <p className="mt-2 text-white/80">
          Absolutely. Thoughtful ideas that keep us anchored to Scripture and Apostolic doctrine are welcome.
        </p>
      </div>
    </div>
  </div>
</section>
{/* FOOTER */}
<footer className="border-t border-white/10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-500">
          <img
            src="/images/logo-mark.svg"
            alt="ApostolicStudy logo"
            className="h-7 w-7 object-contain"
          />
        </span>
        <div>
          <div className="font-semibold">ApostolicStudy</div>
          <p className="text-white/70 text-sm">Bible study you can trust.</p>
        </div>
      </div>

      {/* Quick links */}
      <nav className="text-sm text-white/70 flex flex-wrap items-center gap-4 md:gap-6">
        <Link href="#features" className="hover:text-white">Features</Link>
        <Link href="#why" className="hover:text-white">Why</Link>
        <Link href="#resources" className="hover:text-white">Resources</Link>
        <Link href="#faq" className="hover:text-white">FAQ</Link>
        <Link href="/app" className="text-white hover:underline">Launch App</Link>
      </nav>

      {/* Copyright */}
      <div className="text-white/60 text-sm">
        &copy; {new Date().getFullYear()} ApostolicStudy
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}
