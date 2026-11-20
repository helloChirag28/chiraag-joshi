import { IllustrationFrame, T } from "./frame";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function WorkforceIllustration({ label, caption }: { label: string; caption: string }) {
  const x0 = 70, w = 32;
  return (
    <IllustrationFrame label={label} caption={caption}>
      {/* week header */}
      {days.map((d, i) => (
        <T key={d} x={x0 + i * w + 4} y={22}>{d}</T>
      ))}
      <line x1={x0} y1={28} x2={x0 + 7 * w} y2={28} />
      {/* rows */}
      <T x={12} y={44}>WP-01</T>
      <T x={20} y={62}>WO-11</T>
      <T x={28} y={80}>TASK</T>
      <T x={28} y={98}>TASK</T>
      <T x={20} y={116}>WO-12</T>
      <rect x={x0 + 2} y={36} width={w * 6 - 4} height={11} rx={1.5} fill="var(--surface-2)" />
      <rect x={x0 + 2} y={54} width={w * 3 - 4} height={11} rx={1.5} stroke="var(--data)" />
      <rect x={x0 + 2} y={72} width={w * 2 - 4} height={11} rx={1.5} fill="var(--data)" fillOpacity={0.25} stroke="var(--data)" />
      <rect
        className="ill-hl transition-transform duration-base ease-out group-hover:translate-x-[32px] group-focus-within:translate-x-[32px]"
        x={x0 + w * 2 + 2} y={90} width={w - 4} height={11} rx={1.5} fill="var(--data)" fillOpacity={0.25} stroke="var(--data)"
      />
      <rect x={x0 + w * 3 + 2} y={108} width={w * 3 - 4} height={11} rx={1.5} stroke="var(--data)" />
      {/* dependency */}
      <path d={`M${x0 + w * 2 - 2} 77.5h6v18h4`} strokeDasharray="2 2" />
      {/* capacity strip */}
      <line x1={12} y1={132} x2={308} y2={132} />
      <T x={12} y={146}>CAPACITY</T>
      {[0.6, 0.8, 1.25, 0.7, 0.9, 0.3, 0.2].map((v, i) => {
        const h = Math.min(v, 1.3) * 24;
        const over = v > 1;
        return (
          <rect
            key={i}
            x={x0 + i * w + 8}
            y={172 - h}
            width={w - 16}
            height={h}
            fill={over ? "var(--signal)" : "var(--surface-2)"}
            stroke={over ? "var(--signal)" : "var(--line-strong)"}
          />
        );
      })}
      <line x1={x0} y1={148} x2={x0 + 7 * w} y2={148} strokeDasharray="3 3" stroke="var(--fg-faint)" />
      <T x={x0 + 7 * w + 4} y={150}>100%</T>
    </IllustrationFrame>
  );
}
