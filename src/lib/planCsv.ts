// src/lib/planCsv.ts
import fs from "node:fs/promises";
import path from "node:path";

export type Reference = { ref: string; label?: string };
export type Day = { day: number; title?: string; summary?: string; entries: Reference[] };

function parseLine(line: string): Day | null {
  // format: day,title,summary,refs
  // refs separated by ';' (e.g.  "Genesis 1–3; Matthew 1")
  // title/summary are optional; blank allowed
  const parts = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { parts.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  parts.push(cur.trim());

  if (parts.length < 1 || !parts[0]) return null;
  const day = Number(parts[0]);
  if (!Number.isFinite(day)) return null;

  const title = parts[1] || undefined;
  const summary = parts[2] || undefined;
  const refsRaw = parts[3] || "";
  const entries = refsRaw
    .split(";")
    .map(s => s.trim())
    .filter(Boolean)
    .map(ref => ({ ref }));

  return { day, title, summary, entries };
}

export async function loadCsvSchedule(slug: string): Promise<Day[] | undefined> {
  const file = path.join(process.cwd(), "src", "content", "plan-schedules", `${slug}.csv`);
  try {
    const txt = await fs.readFile(file, "utf8");
    const lines = txt
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith("#")); // allow comments with #

    const days: Day[] = [];
    for (const line of lines) {
      const parsed = parseLine(line);
      if (parsed) days.push(parsed);
    }
    // sort by day just in case
    days.sort((a,b) => a.day - b.day);
    return days;
  } catch {
    return undefined; // file not found or bad read → fallback to hardcoded
  }
}
