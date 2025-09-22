// components/Verse.tsx
type Props = { v: number; text: string };

export default function Verse({ v, text }: Props) {
  const id = `v${v}`;
  return (
    <p id={id} className="leading-relaxed text-lg scroll-mt-24">
      <a href={`#${id}`} className="align-top text-white/60 mr-2 text-sm">{v}</a>
      <span className="font-serif">{text}</span>
    </p>
  );
}
