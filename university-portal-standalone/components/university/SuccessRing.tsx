"use client";
interface SuccessRingProps { score: number; size?: number; strokeWidth?: number; }
export default function SuccessRing({ score, size = 64, strokeWidth = 6 }: SuccessRingProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
  const bgColor = score >= 70 ? "#dcfce7" : score >= 40 ? "#fef3c7" : "#fee2e2";
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={circ - fill} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <span className="absolute text-xs font-black" style={{ color }}>{score}%</span>
    </div>
  );
}
