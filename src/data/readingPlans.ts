// src/data/readingPlans.ts

export type Plan = {
  slug: string;
  title: string;
  days: number;
  blurb: string;
  type: 'bible' | 'topic';
};

export const biblePlans: Plan[] = [
  {
    slug: 'bible-in-a-year-chronological',
    title: 'Chronological Bible in a Year',
    days: 365,
    blurb: 'Follow the story as it happened, from creation to the early church.',
    type: 'bible',
  },
  {
    slug: 'bible-in-a-year-canonical',
    title: 'Canonical Bible in a Year',
    days: 365,
    blurb: 'Straight through, book by book, steady and simple.',
    type: 'bible',
  },
  {
    slug: 'mcheyne-one-year',
    title: 'M’Cheyne One-Year',
    days: 365,
    blurb: 'OT once, NT and Psalms twice, balanced daily readings.',
    type: 'bible',
  },
  {
    slug: 'nt-in-90-days',
    title: 'New Testament in 90 Days',
    days: 90,
    blurb: 'The life and teaching of Jesus and the apostles.',
    type: 'bible',
  },
];

export const topicPlans: Plan[] = [
  {
    slug: 'baptism-command-name-covenant',
    title: 'Baptism: Command, Name, Covenant',
    days: 7,
    blurb:
      'Why baptism in Jesus’ name is commanded, what it does, and how the church practiced it.',
    type: 'topic',
  },
  {
    slug: 'oneness-of-god',
    title: 'The Oneness of God',
    days: 10,
    blurb:
      'God’s identity from Old Testament revelation to Christ made manifest.',
    type: 'topic',
  },
  {
    slug: 'repentance-and-new-birth',
    title: 'Repentance and New Birth',
    days: 7,
    blurb:
      'Turning to God, water and Spirit, walking in newness of life.',
    type: 'topic',
  },
  {
    slug: 'holiness-of-heart-and-life',
    title: 'Holiness of Heart and Life',
    days: 10,
    blurb:
      'Distinction, modesty, and the beauty of obedience.',
    type: 'topic',
  },
  {
    slug: 'prayer-that-moves-heaven',
    title: 'Prayer that Moves Heaven',
    days: 7,
    blurb:
      'Patterns, promises, and persistence in prayer.',
    type: 'topic',
  },
  {
    slug: 'gifts-of-the-spirit',
    title: 'Gifts of the Spirit',
    days: 8,
    blurb:
      'Purpose, order, and operation in the body.',
    type: 'topic',
  },
];

export const allPlans: Plan[] = [...biblePlans, ...topicPlans];

export function findPlanBySlug(slug: string): Plan | undefined {
  return allPlans.find((p) => p.slug === slug);
}
