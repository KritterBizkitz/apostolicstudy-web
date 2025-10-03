// src/data/planSchedules.ts
import { loadCsvSchedule } from "@/lib/planCsv";

export type Reference = { ref: string; label?: string };
export type Day = { day: number; title?: string; summary?: string; entries: Reference[] };
export type PlanSchedule = { planSlug: string; days: Day[] };

/**
 * Inline schedules live here. We’ll keep topic plans (like Baptism) inline for now.
 * Bible plans will load from CSV if present in src/content/plan-schedules/<slug>.csv
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
  },
  {
    day: 2,
    title: "The First Message",
    summary: "Peter obeys the Lord’s command at Pentecost.",
    entries: [
      { ref: "Acts 2:1–4", label: "Spirit poured out" },
      { ref: "Acts 2:14–36", label: "Jesus preached" },
      { ref: "Acts 2:37–41", label: "Repent and be baptized in Jesus’ name" },
    ],
  },
  {
    day: 3,
    title: "The Pattern Spreads",
    summary: "Samaritans and the Ethiopian respond to the gospel.",
    entries: [
      { ref: "Acts 8:4–17", label: "Believed and baptized" },
      { ref: "Acts 8:26–39", label: "See, here is water" },
    ],
  },
  {
    day: 4,
    title: "The Testimony of Saul",
    summary: "Even the persecutor was baptized in Jesus’ name.",
    entries: [
      { ref: "Acts 9:1–19", label: "He arose and was baptized" },
      { ref: "Acts 22:6–16", label: "Wash away your sins, calling on His name" },
    ],
  },
  {
    day: 5,
    title: "The Gentiles Enter In",
    summary: "Cornelius and his house are baptized in Jesus’ name.",
    entries: [
      { ref: "Acts 10:1–48", label: "Spirit falls, baptism follows" },
      { ref: "Acts 11:15–18", label: "God also gave them repentance unto life" },
    ],
  },
  {
    day: 6,
    title: "The Name and the Covenant",
    summary: "Baptism is done in the name that saves, and it brings us into covenant.",
    entries: [
      { ref: "Acts 4:10–12", label: "No other name under heaven" },
      { ref: "Acts 19:1–7", label: "Re-baptized in the name of Jesus" },
      { ref: "Romans 6:3–5", label: "Buried with Him by baptism" },
      { ref: "Galatians 3:26–27", label: "Baptized into Christ, put on Christ" },
      { ref: "Colossians 2:11–13", label: "Spiritual circumcision in baptism" },
    ],
  },
  {
    day: 7,
    title: "The Saving Work",
    summary: "Baptism is not a symbol. It is where salvation and cleansing are applied.",
    entries: [
      { ref: "1 Peter 3:20–21", label: "Baptism doth also now save us" },
      { ref: "Titus 3:4–7", label: "Washing of regeneration" },
      { ref: "Ephesians 4:4–6", label: "One Lord, one faith, one baptism" },
      { ref: "1 Corinthians 6:9–11", label: "Washed, sanctified, justified" },
      { ref: "Hebrews 10:22", label: "Hearts sprinkled, bodies washed" },
    ],
 
  
      },
    ],
  },
];



/** Try CSV first; fall back to inline schedules. */
export async function getScheduleBySlug(slug: string): Promise<Day[] | undefined> {
  const csv = await loadCsvSchedule(slug);
  if (csv?.length) return csv as Day[];
  return planSchedules.find((p) => p.planSlug === slug)?.days;
}
