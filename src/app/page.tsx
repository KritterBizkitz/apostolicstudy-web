import Link from "next/link";
import { AnimatedFeatureCard } from "@/components/AnimatedFeatureCard";
import { RevealBox } from "@/components/RevealBox";
import FeaturedStudies from "@/components/FeaturedStudies";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-24 h-[22rem] w-[22rem] rounded-full bg-emerald-500/20 blur-[160px]" />
        <div className="absolute top-1/4 -left-32 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[180px]" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[200px]" />
      </div>

      {/* small spacer under the navbar */}
      <div className="pt-4" />

      {/* Featured strip */}
      <FeaturedStudies />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl" />
        <div
          className="absolute inset-x-10 -top-16 -z-20 h-40 rounded-full blur-3xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.28), rgba(255,255,255,0.08), rgba(99,102,241,0.28))",
          }}
        />
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr]">
          <RevealBox immediate>
            <div className="max-w-2xl">
              <p className="inline-flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                Doctrinally Apostolic
                <span className="hidden h-px w-8 bg-white/30 sm:inline-flex" />
                Trust the Word, not the world
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Study the Word.
                <span className="block bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                  Teach with clarity.
                </span>
              </h1>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                ApostolicStudy keeps context before commentary, giving you space to trace authorial intent, historical setting, and the full counsel of Scripture without the distraction of noise.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/15"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Launch the reader
                </Link>
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_60px_-20px_rgba(16,185,129,0.65)] transition hover:opacity-95"
                >
                  Join the early access
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Context first</p>
                  <p className="mt-1 text-sm text-white/70">
                    Link passages, cross references, and language insights without leaving the reader view.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Living notes</p>
                  <p className="mt-1 text-sm text-white/70">
                    Carry sermon outlines, class plans, and study trails everywhere you teach.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Teacher-ready</p>
                  <p className="mt-1 text-sm text-white/70">
                    Share preparation with ministry teams while staying anchored to Apostolic doctrine.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Built for focus</p>
                  <p className="mt-1 text-sm text-white/70">
                    Typography, spacing, and shortcuts tuned for long-form study sessions.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur">
  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    Voices we trust
  </div>
  <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/85">
    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-white/90">"The worst thing can happen is for you and I to live not knowing God not seeking to please God not satisfied serving God."</p>
      <footer className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">Bishop Clifton Jones</footer>
    </blockquote>
    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-white/90">"Nobody is Pentecostal who rejects the water baptism in Jesus name."</p>
      <footer className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">Dr. Johnny James</footer>
    </blockquote>
    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-white/90">"He should so thoroughly know what he believes that he believes his beliefs and doubts his doubts. He does not doubt his beliefs and believe his doubts."</p>
      <footer className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">Bishop Morris E. Golder</footer>
    </blockquote>
    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-white/90">"We are not Pentecostal because we shout. We are Apostolic because we believe and teach what the apostles taught. Doctrine is not a footnote. It is the headline."</p>
      <footer className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">Pastor Jack Cunningham</footer>
    </blockquote>
    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-white/90">"The Word of God is not to be lightly handled or casually quoted. It is the sword of the Spirit, and it must be studied, rightly divided, and reverently obeyed."</p>
      <footer className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">Superintendent David K. Bernard</footer>
    </blockquote>
  </div>
</div>


          </RevealBox>

          <RevealBox delay={0.05} immediate>
            <div className="relative mx-auto w-full max-w-xl space-y-10 group">
              <div className="relative group">
                <div
                  className="pointer-events-none absolute -inset-[2px] rounded-3xl opacity-70 blur-[1.5px]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--tw-gradient-from,#6366f1), #06b6d4, var(--tw-gradient-to,#10b981), var(--tw-gradient-from,#6366f1))",
                  }}
                />

                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-white/0 via-white/12 to-white/0 transition-transform duration-1000 ease-out group-hover:translate-x-[250%]" />
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-xs text-white/60">Acts 2:37-41</span>
                  </div>

                  <div className="p-5">
                    <div className="space-y-1 leading-relaxed">
                      <p>
                        <span className="mr-2 text-white/60">37</span>
                        Now when they heard this, they were pricked in their heart, and said unto Peter and to the rest of the apostles, Men and brethren, what shall we do?
                      </p>
                      <p>
                        <span className="mr-2 text-white/60">38</span>
                        Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.
                      </p>
                      <p>
                        <span className="mr-2 text-white/60">39</span>
                        For the promise is unto you, and to your children, and to all that are afar off, even as many as the Lord our God shall call.
                      </p>
                      <p>
                        <span className="mr-2 text-white/60">40</span>
                        And with many other words did he testify and exhort, saying, Save yourselves from this untoward generation.
                      </p>
                      <p>
                        <span className="mr-2 text-white/60">41</span>
                        Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute -z-30 -top-12 -left-12 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -z-30 -bottom-8 right-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
              </div>


              <div className="relative group">
                <div
                  className="pointer-events-none absolute -inset-[2px] rounded-3xl opacity-60 blur-[1px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(16,185,129,0.28))",
                  }}
                />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-black/25 px-4 py-2">
                    <span className="h-3 w-3 rounded-full bg-[#38bdf8]" />
                    <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                    <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                    <span className="ml-2 text-xs text-white/60">Apostolic Commentary</span>
                  </div>
                  <div className="space-y-3 p-5 text-sm leading-relaxed text-white/85">
                    <p>
                      The gospel cuts to the heart. Peter's message of Jesus crucified brings conviction that demands a response. The people cry out, "What shall we do?"--the same question every honest heart must ask when confronted with truth.
                    </p>
                    <p>
                      Verse 38 gives God's answer. Repentance turns us from sin, baptism in Jesus' name washes those sins away, and the gift of the Holy Ghost fills us with God's Spirit. This is not optional or symbolic--it is the pattern of salvation given by the apostles themselves.
                    </p>
                    <p>
                      The promise is generational. Peter declares it is for "you, your children, and all that are afar off." That means this new birth experience stretches across time and culture. What was poured out on Pentecost is still available today.
                    </p>
                    <p>
                      The result is transformation. Three thousand souls were added in one day because they obeyed the Word. The same obedience brings the same results now--repentance, baptism in Jesus' name, and the infilling of the Holy Ghost remain the foundation of the Apostolic church.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute -z-30 -top-8 right-6 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
              </div>
              {/* Apostolic Truth Timeline */}
<div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)]">
  <div className="relative overflow-hidden rounded-3xl p-6">
    {/* soft gradient wash to differentiate from other cards */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-indigo-400/10" />

    {/* header */}
    <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/70">
      <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400" />
      Apostolic Truth Timeline
    </div>

    {/* subhead */}
    <p className="relative z-10 mt-2 text-sm text-white/80">
      From Pentecost to the present, one message continues unchanged.
    </p>

    {/* timeline */}
    <div className="relative z-10 mt-6">
      <ol className="relative space-y-5">
  {/* vertical line */}
  <span className="absolute left-3 top-0 h-full w-px bg-white/10" aria-hidden="true" />

  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
    <h4 className="text-white/90 text-sm font-medium">AD 33 — The Day of Pentecost</h4>
    <p className="mt-1 text-sm leading-relaxed text-white/80">
      The Church is born in Jerusalem as the Spirit is poured out and three thousand are baptized in Jesus’ name.
    </p>
  </li>

  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
    <h4 className="text-white/90 text-sm font-medium">1st Century — The Apostles’ Doctrine</h4>
    <p className="mt-1 text-sm leading-relaxed text-white/80">
      The gospel spreads through preaching, signs, and letters that become our New Testament.
    </p>
  </li>

  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
    <h4 className="text-white/90 text-sm font-medium">4th Century — The Rise of Creeds</h4>
    <p className="mt-1 text-sm leading-relaxed text-white/80">
      Human tradition begins to overshadow the simplicity of One God and baptism in Jesus’ name.
    </p>
  </li>

  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
    <h4 className="text-white/90 text-sm font-medium">Early 1900s — Apostolic Restoration</h4>
    <p className="mt-1 text-sm leading-relaxed text-white/80">
      The Holy Ghost is poured out worldwide, confirming the same Acts 2 message with tongues and Jesus-name baptism.
    </p>
  </li>

  <li className="relative pl-6">
    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
    <h4 className="text-white/90 text-sm font-medium">Today — The Same Truth</h4>
    <p className="mt-1 text-sm leading-relaxed text-white/80">
      Repentance, baptism in Jesus’ name, and the infilling of the Holy Ghost continue to transform lives across the world.
    </p>
  </li>
</ol>

    </div>

    {/* optional footer link */}
    <div className="relative z-10 mt-6">
      <a
        href="/timeline"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/85 hover:bg-white/[0.06] hover:border-white/15 transition"
      >
        View full timeline
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M12.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L14 6.414V16a1 1 0 1 1-2 0V6.414l-2.293 2.293A1 1 0 0 1 8.293 7.293l4-4z" />
        </svg>
      </a>
    </div>
  </div>
</div>

            </div>
          </RevealBox>
        </div>
      </section>

      {/* SUPPORT CALL OUT */}
      <section id="support" className="relative border-t border-white/10 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RevealBox immediate>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-[1.5px] shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)]">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-80 blur-md"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(6,182,212,0.35), rgba(16,185,129,0.35))",
                }}
              />
              <div className="relative rounded-[calc(1.5rem-1.5px)] border border-white/10 bg-black/70 px-8 py-10 backdrop-blur">
                <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 left-8 h-60 w-60 rounded-full bg-indigo-500/25 blur-[120px]" />
                <h2 className="text-xl font-semibold text-white">Keep ApostolicStudy Free</h2>
                <p className="mt-3 text-white/75">
                  It is our sincere desire to make sure every resource here is completely free and open for everyone. Please consider donating to help us maintain that.
                </p>
                <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_top"
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <input type="hidden" name="hosted_button_id" value="DWYX85RH9PJKW" />
                  <button
                    type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_60px_-20px_rgba(16,185,129,0.65)] transition hover:opacity-95"
                >
                  Donate with PayPal
                  </button>
                  <p className="text-xs text-white/50">Secure checkout handled by PayPal.</p>
                </form>
              </div>
            </div>
          </RevealBox>
        </div>
      </section>
      {/* VALUE CARDS / FEATURES */}
      <section id="features" className="relative py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_65%)]" />
          <div className="absolute left-[12%] top-0 hidden h-32 w-px bg-gradient-to-b from-white/30 to-transparent md:block" />
          <div className="absolute right-[15%] bottom-0 hidden h-32 w-px bg-gradient-to-t from-white/30 to-transparent md:block" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              <span className="heading-swipe swipe-indigo-emerald">Built for real study</span>
            </h2>
            <p className="max-w-xl text-sm text-white/70 sm:text-base">
              A curated workspace that keeps Apostolic doctrine at the center while meeting the needs of pastors, teachers, and students.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <AnimatedFeatureCard>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-500 text-base font-semibold text-slate-900">
                01
              </div>
              <h3 className="text-lg font-semibold">Fast reader</h3>
              <p className="mt-2 text-white/75">
                Jump by book, chapter, or verse with a reader tuned for sustained meditation and teaching prep.
              </p>
            </AnimatedFeatureCard>

            {/* Card 2 */}
            <AnimatedFeatureCard>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 text-base font-semibold text-slate-900">
                02
              </div>
              <h3 className="text-lg font-semibold">Distraction-free</h3>
              <p className="mt-2 text-white/75">
                A focused canvas so the Word&mdash;not the interface&mdash;keeps your attention.
              </p>
            </AnimatedFeatureCard>

            {/* Card 3 */}
            <AnimatedFeatureCard>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-base font-semibold text-slate-900">
                03
              </div>
              <h3 className="text-lg font-semibold">Notes that grow</h3>
              <p className="mt-2 text-white/75">
                Keep living study notes and sermon drafts organized, searchable, and synced across devices.
              </p>
            </AnimatedFeatureCard>

            {/* Card 4 */}
            <AnimatedFeatureCard>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-pink-500 text-base font-semibold text-slate-900">
                04
              </div>
              <h3 className="text-lg font-semibold">Grounded in doctrine</h3>
              <p className="mt-2 text-white/75">
                Tools that help you teach the oneness of God with clarity and confidence.
              </p>
            </AnimatedFeatureCard>
          


</div>
        </div>
      </section>
      {/* COMPARE THE LENSES */}
      <section id="compare" className="relative border-t border-white/10 py-20 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.2),_transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                <span className="heading-swipe swipe-emerald-cyan">Compare the lenses</span>
              </h2>

              <p className="mt-3 max-w-2xl text-white/80">
                Many classic commentaries read key texts through a Trinitarian lens. ApostolicStudy puts <em>context before commentary</em> and <em>Scripture interpreting Scripture</em>, confessing that God is one and fully revealed in Jesus.
              </p>
            </div>
            <div className="hidden items-center gap-2 text-xs sm:flex">
              <span className="rounded bg-white/10 px-2 py-1">Popular Commentary (Trinitarian)</span>
              <span className="rounded bg-emerald-500/15 px-2 py-1 text-emerald-200">ApostolicStudy Exegesis</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Item: John 1:1-3 */}
            <article className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">John 1:1-3</h3>
                <Link href="/read/john/1" className="text-sm text-white/70 transition hover:text-white">
                  Open in reader &rarr;
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevealBox>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-2 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">Popular Commentary (Trinitarian)</div>
                    <p className="text-white/85">
                      "The Word" is the eternal second Person, personally distinct from the Father yet fully divine. Creation is through the Son as a co-eternal person.
                    </p>
                  </div>
          </RevealBox>
                <RevealBox delay={0.06}>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                    <div className="mb-2 inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-100">ApostolicStudy Exegesis</div>
                    <p className="text-white/90">
                      "Word" (Logos) is God's own self-expression&mdash;God Himself in revelation. The one God later became flesh as Jesus Christ. Distinction is functional, not a second divine person.
                    </p>
                  </div>
          </RevealBox>
              </div>
            </article>

            {/* Item: Matthew 28:19 */}
            <article className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Matthew 28:19</h3>
                <Link href="/read/matthew/28" className="text-sm text-white/70 transition hover:text-white">
                  Open in reader &rarr;
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevealBox>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-2 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">Popular Commentary (Trinitarian)</div>
                    <p className="text-white/85">
                      Baptism "in the name of the Father, and of the Son, and of the Holy Spirit" affirms three co-equal, co-eternal persons. Acts baptisms in Jesus' name are treated as shorthand.
                    </p>
                  </div>
          </RevealBox>
                <RevealBox delay={0.06}>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                    <div className="mb-2 inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-100">ApostolicStudy Exegesis</div>
                    <p className="text-white/90">
                      "Name" is singular and fulfilled in Jesus. The apostles consistently baptize in the name of Jesus (Acts 2:38; 8:16; 10:48; 19:5) as the faithful application of Christ's words.
                    </p>
                  </div>
          </RevealBox>
              </div>
            </article>

            {/* Item: John 17:5 */}
            <article className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">John 17:5</h3>
                <Link href="/read/john/17" className="text-sm text-white/70 transition hover:text-white">
                  Open in reader &rarr;
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevealBox>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-2 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">Popular Commentary (Trinitarian)</div>
                    <p className="text-white/85">
                      The Son, as a distinct person, shared personal pre-existence and glory alongside the Father before creation.
                    </p>
                  </div>
          </RevealBox>
                <RevealBox delay={0.06}>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                    <div className="mb-2 inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-100">ApostolicStudy Exegesis</div>
                    <p className="text-white/90">
                      The glory belongs to God alone and was purposed "with" God. Jesus prays from the incarnational role about the glory that existed in God and is now revealed in the man Christ Jesus.
                    </p>
                  </div>
          </RevealBox>
              </div>
            </article>

            {/* Item: Colossians 2:9 */}
            <article className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Colossians 2:9</h3>
                <Link href="/read/colossians/2" className="text-sm text-white/70 transition hover:text-white">
                  Open in reader &rarr;
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevealBox>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-2 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">Popular Commentary (Trinitarian)</div>
                    <p className="text-white/85">
                      The fullness of deity dwells bodily in Christ, the second person incarnate, while the Father remains a distinct person.
                    </p>
                  </div>
          </RevealBox>
                <RevealBox delay={0.06}>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                    <div className="mb-2 inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-100">ApostolicStudy Exegesis</div>
                    <p className="text-white/90">
                      All the fullness of the Godhead dwells in Jesus bodily. God is fully and uniquely revealed in Christ, not divided among multiple divine persons.
                    </p>
                  </div>
          </RevealBox>
              </div>
            </article>

            {/* Item: Deut 6:4 / Mark 12:29 */}
            <article className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold">Deuteronomy 6:4 / Mark 12:29</h3>
                <div className="flex items-center gap-3">
                  <Link href="/read/deuteronomy/6" className="text-sm text-white/70 transition hover:text-white">
                    Open Deut &rarr;
                  </Link>
                  <Link href="/read/mark/12" className="text-sm text-white/70 transition hover:text-white">
                    Open Mark &rarr;
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevealBox>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-2 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">Popular Commentary (Trinitarian)</div>
                    <p className="text-white/85">"One" means unity of essence shared by three persons.</p>
                  </div>
          </RevealBox>
                <RevealBox delay={0.06}>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                    <div className="mb-2 inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-100">ApostolicStudy Exegesis</div>
                    <p className="text-white/90">
                      "One" is numerically one&mdash;a single, indivisible God who has now made Himself known in the man Christ Jesus and by His Spirit.
                    </p>
                  </div>
          </RevealBox>
              </div>
            </article>
          </div>

          <p className="mt-8 text-xs text-white/60">
            Notes: "Popular Commentary (Trinitarian)" summaries are paraphrased general viewpoints, not quotations.
          </p>
        </div>
      </section>
      {/* PROOF / IMPACT */}
      <section id="impact" className="relative py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <RevealBox>
              <blockquote className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)]">
                <div className="absolute -top-10 left-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Minister insight</p>
                <p className="mt-4 text-xl leading-relaxed text-white/90">
                  "To study Scripture rightly, you must let the Bible interpret itself, comparing line upon line, precept upon precept, and always keeping the context before the commentary."
                </p>
                <footer className="mt-6 flex items-center gap-4 text-sm text-white/70">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 text-xs font-semibold text-slate-900">
                    AP
                  </span>
                  <div>
                    <div className="font-semibold text-white">Assistant Pastor</div>
                    <div>Revival Church</div>
                  </div>
                </footer>
              </blockquote>
            </RevealBox>
            <RevealBox delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="text-sm uppercase tracking-[0.35em] text-white/60">Thy word is truth</div>
                  <p className="mt-2 text-sm text-white/70">Ground every lesson and sermon in the unchanging Word of God.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="text-sm uppercase tracking-[0.35em] text-white/60">Line upon line</div>
                  <p className="mt-2 text-sm text-white/70">Organized notes and resources to help build understanding step by step.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/60">Focus tip</p>
                      <h3 className="text-lg font-semibold text-white">Rightly dividing the word of truth</h3>
                    </div>
                    <Link
                      href="#resources"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/80 transition hover:border-white/35 hover:text-white"
                    >
                      See how we help
                    </Link>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    ApostolicStudy helps you handle the Scriptures faithfully, keeping every lesson in context.
                  </p>
                </div>
              </div>
          </RevealBox>
          </div>
        </div>
      </section>
      {/* WHY / DOCTRINE */}
      <section id="doctrine" className="relative border-t border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                <span className="heading-swipe swipe-indigo-emerald">Why ApostolicStudy?</span>
              </h2>

              <p className="mt-4 max-w-prose text-white/85">
                Tools shape habits. We are building for long-form reading, careful study, and doctrine that stays centered on Scripture.
              </p>
              <ul className="mt-6 space-y-3 text-white/85">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span>
                    <strong>Scripture first.</strong> Everything serves the text, not trends.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-indigo-500/80" />
                  <span>
                    <strong>Oneness Apostolic convictions.</strong> Grounded in Apostolic doctrine and practice.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-cyan-500/80" />
                  <span>
                    <strong>Clarity over clutter.</strong> A reader that helps you keep going.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-amber-500/80" />
                  <span>
                    <strong>Built for teaching.</strong> Notes, sermon prep, and study that travel with you.
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/app"
                  className="inline-flex items-center rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-500 px-6 py-3 text-sm font-medium text-black shadow-[0_30px_80px_-40px_rgba(55,48,163,0.8)] transition hover:opacity-95"
                >
                  Launch Bible App
                </Link>
              </div>
            </div>

            {/* supporting card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">Designed for depth</h3>
              <p className="mt-2 text-white/80">
                Whether you are preparing a sermon or leading a study, the experience stays simple and steady so doctrine and discipleship get your focus.
              </p>
              <div className="mt-6 space-y-3 leading-relaxed">
                <p>
                  <span className="mr-2 text-white/60">Acts 2:42</span>
                  <span className="font-serif">And they continued steadfastly in the apostles' doctrine and fellowship...</span>
                </p>
                <p>
                  <span className="mr-2 text-white/60">2 Tim 2:15</span>
                  <span className="font-serif">Study to shew thyself approved unto God...</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RESOURCES */}
      <section id="resources" className="relative border-t border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            <span className="heading-swipe swipe-indigo-emerald">Resources</span>
          </h2>
          <p className="mb-10 max-w-2xl text-sm text-white/70 sm:text-base">
            Built-in tools that keep your study rhythm moving and make it easy to share with those you lead.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/app" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold">Study notes</h3>
              <p className="mt-2 text-white/80">Living notes that grow with your study.</p>
            </Link>

            <Link href="/app" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold">Sermon notes</h3>
              <p className="mt-2 text-white/80">Drafts, outlines, and manuscripts in one place.</p>
            </Link>

            <Link href="/app" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold">Teaching guides</h3>
              <p className="mt-2 text-white/80">Lesson plans and walkthroughs for classes.</p>
            </Link>

            <Link href="/app" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold">Downloads</h3>
              <p className="mt-2 text-white/80">Reference sheets and printables you can share.</p>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="relative border-t border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            <span className="heading-swipe swipe-indigo-emerald">FAQ</span>
          </h2>
          <p className="mb-10 max-w-2xl text-sm text-white/70 sm:text-base">
            Quick answers to the most common questions from leaders and teachers exploring the beta.
          </p>

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
      {/* CTA */}
      <section id="cta" className="relative border-t border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent_75%)]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-emerald-400/30 p-10 shadow-[0_60px_140px_-70px_rgba(6,182,212,0.8)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.22), rgba(15,23,42,0.9) 45%, rgba(99,102,241,0.22))",
            }}
          >
            <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-6 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-100/80">Ready to lead deeper studies?</p>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Equip your team with a study environment that keeps every insight anchored to Scripture.
                </h3>
                <p className="mt-4 text-sm text-white/80 sm:text-base">
                  Launch the reader today, then invite your teaching team to build outlines and lesson plans alongside you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/20"
                >
                  Open the app
                </Link>
                <Link
                  href="/signin"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
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
                <p className="text-sm text-white/70">Bible study you can trust.</p>
              </div>
            </div>

            {/* Quick links */}
            <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70 md:gap-6">
              <Link href="#features" className="transition hover:text-white">
                Features
              </Link>
              <Link href="#compare" className="transition hover:text-white">
                Compare
              </Link>
              <Link href="#impact" className="transition hover:text-white">
                Impact
              </Link>
              <Link href="#resources" className="transition hover:text-white">
                Resources
              </Link>
              <Link href="#faq" className="transition hover:text-white">
                FAQ
              </Link>
              <Link href="/app" className="text-white transition hover:underline">
                Launch App
              </Link>
            </nav>

            {/* Copyright */}
            <div className="text-sm text-white/60">&copy; {new Date().getFullYear()} ApostolicStudy</div>
          </div>
        </div>
      </footer>
    </main>
  );
}












