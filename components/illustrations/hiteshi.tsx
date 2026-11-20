import { IllustrationFrame, T } from "./frame";

export function HiteshiIllustration({ label, caption }: { label: string; caption: string }) {
  const spines = [9, 6, 11, 7, 8, 12, 6, 9, 7, 10];
  const shelves = [40, 82, 124];
  return (
    <IllustrationFrame label={label} caption={caption}>
      {/* bookshelf elevation */}
      <rect x={14} y={18} width={110} height={150} />
      {shelves.map((y, si) => {
        let x = 20;
        return (
          <g key={y}>
            {spines.map((w, i) => {
              const h = 26 + ((i * 7 + si * 3) % 9);
              const el = <rect key={i} x={x} y={y + 38 - h} width={w} height={h} fill={i % 3 === 0 ? "var(--surface-2)" : "var(--surface-1)"} />;
              x += w + 1;
              return x < 120 ? el : null;
            })}
            <line x1={14} y1={y + 38} x2={124} y2={y + 38} />
          </g>
        );
      })}
      {/* filter chips */}
      <T x={142} y={26}>FILTER</T>
      {[
        { x: 142, w: 46, t: "CATEGORY", on: true },
        { x: 192, w: 50, t: "PUBLISHER" },
        { x: 246, w: 34, t: "HINDI" },
      ].map((c) => (
        <g key={c.t} className={c.on ? "ill-hl" : undefined}>
          <rect x={c.x} y={32} width={c.w} height={12} rx={6} fill={c.on ? "var(--signal)" : "none"} stroke={c.on ? "var(--signal)" : "var(--line-strong)"} />
          <T x={c.x + c.w / 2} y={40.5} anchor="middle" fill={c.on ? "var(--signal-fg)" : "var(--fg-muted)"}>{c.t}</T>
        </g>
      ))}
      {/* catalog grid */}
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => {
          const x = 142 + col * 56, y = 56 + row * 58;
          return (
            <g key={`${col}${row}`}>
              <rect x={x} y={y} width={48} height={50} fill="var(--surface-1)" />
              <rect x={x + 14} y={y + 6} width={20} height={26} fill="var(--surface-2)" />
              <line x1={x + 6} y1={y + 39} x2={x + 42} y2={y + 39} stroke="var(--fg-faint)" />
              <line x1={x + 6} y1={y + 44} x2={x + 28} y2={y + 44} stroke="var(--data)" />
            </g>
          );
        }),
      )}
    </IllustrationFrame>
  );
}
