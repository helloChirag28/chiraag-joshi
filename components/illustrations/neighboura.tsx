import { IllustrationFrame, T } from "./frame";

// Isometric helpers: x → right-down, y → left-down, z → up.
const ox = 112, oy = 128;
const iso = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * 18, oy + (x + y) * 9 - z * 18];
const pt = (p: [number, number]) => `${p[0]} ${p[1]}`;

function Unit({ x, y, z }: { x: number; y: number; z: number }) {
  const top = [iso(x, y, z + 1), iso(x + 1, y, z + 1), iso(x + 1, y + 1, z + 1), iso(x, y + 1, z + 1)];
  const left = [iso(x, y + 1, z + 1), iso(x + 1, y + 1, z + 1), iso(x + 1, y + 1, z), iso(x, y + 1, z)];
  const right = [iso(x + 1, y, z + 1), iso(x + 1, y + 1, z + 1), iso(x + 1, y + 1, z), iso(x + 1, y, z)];
  return (
    <>
      <path d={`M${top.map(pt).join("L")}Z`} fill="var(--surface-1)" />
      <path d={`M${left.map(pt).join("L")}Z`} fill="var(--surface-2)" />
      <path d={`M${right.map(pt).join("L")}Z`} fill="var(--bg)" />
    </>
  );
}

export function NeighbouraIllustration({ label, caption }: { label: string; caption: string }) {
  const units: [number, number, number][] = [];
  for (let z = 0; z < 4; z++) for (let y = 0; y < 2; y++) for (let x = 0; x < 3; x++) units.push([x, y, z]);
  units.sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]));
  const anchor = iso(3, 1, 2.5);
  const nodes = [
    { label: "RESIDENT", at: [262, 40] as [number, number] },
    { label: "ADMIN", at: [276, 100] as [number, number] },
    { label: "GATE", at: [250, 158] as [number, number], accent: true },
  ];
  return (
    <IllustrationFrame label={label} caption={caption}>
      {units.map(([x, y, z]) => (
        <Unit key={`${x}${y}${z}`} x={x} y={y} z={z} />
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <path
            d={`M${anchor[0]} ${anchor[1]}L${n.at[0] - 8} ${n.at[1]}`}
            strokeDasharray={n.accent ? undefined : "2 2"}
            stroke={n.accent ? "var(--signal)" : "var(--line-strong)"}
          />
          <circle
            cx={n.at[0]}
            cy={n.at[1]}
            r={n.accent ? 7 : 6}
            fill={n.accent ? "var(--signal)" : "var(--surface-1)"}
            stroke={n.accent ? "var(--signal)" : "var(--line-strong)"}
            className={n.accent ? "ill-hl origin-center transition-transform duration-base ease-out [transform-box:fill-box] group-hover:scale-125 group-focus-within:scale-125" : undefined}
          />
          <T x={n.at[0]} y={n.at[1] + 16} anchor="middle" fill={n.accent ? "var(--fg)" : "var(--fg-muted)"}>
            {n.label}
          </T>
        </g>
      ))}
      {/* QR pass glyph next to the gate */}
      <g transform="translate(274 150)" stroke="var(--fg-muted)">
        <rect width="14" height="14" />
        <rect x="2" y="2" width="4" height="4" fill="var(--fg-muted)" />
        <rect x="8" y="8" width="4" height="4" fill="var(--fg-muted)" />
      </g>
    </IllustrationFrame>
  );
}
