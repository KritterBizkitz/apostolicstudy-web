// src/components/ProgressRing.tsx
type Props = {
  /** 0..1 */
  value: number;
  /** px */
  size?: number;
  /** px */
  stroke?: number;
  /** Optional text in the center, e.g. "42%" */
  caption?: string;
  className?: string;
};

export default function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  caption,
  className,
}: Props) {
  const v = Math.max(0, Math.min(1, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v);

  return (
    <div
      className={`relative inline-grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-label="Progress"
      role="img"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-white/12"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-emerald-400"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>

      {caption ? (
        <div className="absolute text-[10px] font-semibold text-white/90">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
