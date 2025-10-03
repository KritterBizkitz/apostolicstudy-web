import fs from "node:fs/promises";
import path from "node:path";

/** Returns a set of day numbers that have a markdown file. */
export async function getNotesDays(planSlug: string): Promise<Set<number>> {
  const dir = path.join(process.cwd(), "src", "content", "plan-notes", planSlug);
  try {
    const files = await fs.readdir(dir);
    const set = new Set<number>();
    for (const f of files) {
      const m = f.match(/^day-(\d+)\.md$/);
      if (m) set.add(Number(m[1]));
    }
    return set;
  } catch {
    return new Set(); // directory doesn’t exist yet → no notes
  }
}
