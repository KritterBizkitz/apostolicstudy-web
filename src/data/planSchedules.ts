// src/data/planSchedules.ts

export type Reference = { ref: string; label?: string };
export type Day = {
  day: number;
  title?: string;
  summary?: string;
  entries: Reference[];
  /** Optional study notes in Markdown */
  notes?: string;
};
export type PlanSchedule = { planSlug: string; days: Day[] };

/**
 * Schedules are simple: a planSlug ties to an array of days.
 * Each day has 1..N references in human-readable "Book chap:verses" form.
 * We'll wire these to your reader route later.
 */
export const planSchedules: PlanSchedule[] = [
  {
    planSlug: "baptism-command-name-covenant",
    days: [
      {
        day: 1,
        title: "The Commission",
        summary: "Jesus’ charge and the promise of power.",
        entries: [
          { ref: "Matthew 28:18–20", label: "Make disciples, baptize" },
          { ref: "Mark 16:15–18", label: "Preach, believe, be baptized" },
          { ref: "Luke 24:45–49", label: "Remission and promise" },
          { ref: "Acts 1:1–8", label: "Power to witness" },
        ],
        notes: `### Why these passages?

- **Matthew 28:18–20** — Jesus grounds the mission in **His authority** and commands *making disciples* with **baptism** as part of the process.
- **Mark 16:15–18** — Faith, proclamation, and **baptism** are tied to salvation; signs follow those who believe.
- **Luke 24:45–49** — The risen Christ opens the Scriptures and foretells that **remission of sins** will be preached **in His name** beginning at Jerusalem.
- **Acts 1:1–8** — The promise of **power** by the Holy Ghost explains *how* the commission is carried out.

**Thread to notice:** the Commission looks forward to **Acts 2**, where repentance, baptism **in Jesus’ name**, and the gift of the Spirit are preached and received.`,
      },
      {
        day: 2,
        title: "Pentecost Pattern",
        summary: "The first sermon and response.",
        entries: [{ ref: "Acts 2:1–47", label: "Repent, be baptized in Jesus’ name" }],
        notes: `### Pentecost pattern

- **Acts 2** is the first full sermon to sinners after the resurrection.
- The response pattern is clear: **Repent** → **be baptized in the name of Jesus Christ** → **receive the gift of the Holy Ghost** (2:38–39).
- About **3,000** were added that day (2:41), and the church continued steadfastly (2:42).`,
      },
      {
        day: 3,
        title: "Samaria & the Eunuch",
        summary: "The gospel in Samaria and on the road.",
        entries: [
          { ref: "Acts 8:4–17", label: "Believed and baptized" },
          { ref: "Acts 8:26–39", label: "See, here is water" },
        ],
      },
      {
        day: 4,
        title: "Saul’s Conversion",
        summary: "From persecutor to preacher.",
        entries: [
          { ref: "Acts 9:1–19", label: "Rise and be baptized" },
          { ref: "Acts 22:16", label: "Wash away your sins, calling on His name" },
        ],
      },
      {
        day: 5,
        title: "Gentiles Receive the Word",
        summary: "Cornelius’ household.",
        entries: [
          { ref: "Acts 10:1–48", label: "Baptized in the name of Jesus Christ" },
          { ref: "Acts 11:15–18", label: "God granted repentance to life" },
        ],
      },
      {
        day: 6,
        title: "The Name and the Work",
        summary: "What baptism does; why the name matters.",
        entries: [
          { ref: "Acts 4:10–12", label: "No other name" },
          { ref: "Acts 19:1–7", label: "Re-baptized into Jesus’ name" },
          { ref: "Romans 6:3–5", label: "Buried with Him in baptism" },
          { ref: "Galatians 3:26–27", label: "Put on Christ" },
          { ref: "Colossians 2:11–13", label: "Circumcision of Christ" },
        ],
      },
      {
        day: 7,
        title: "Appeal and Unity",
        summary: "Baptism’s meaning and the one faith.",
        entries: [
          { ref: "1 Peter 3:20–21", label: "Baptism now saves you" },
          { ref: "Titus 3:4–7", label: "Washing of regeneration" },
          { ref: "Ephesians 4:4–6", label: "One Lord, one faith, one baptism" },
          { ref: "1 Corinthians 6:9–11", label: "Washed, sanctified, justified" },
          { ref: "Hebrews 10:22", label: "Hearts sprinkled, bodies washed" },
        ],
      },
    ],
  },
];

/** Helper: get a plan's days by slug */
export function getScheduleBySlug(slug: string): Day[] | undefined {
  return planSchedules.find((p) => p.planSlug === slug)?.days;
}