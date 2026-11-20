import { IllustrationFrame, T } from "./frame";

export function FormForgeIllustration({ label, caption }: { label: string; caption: string }) {
  const fields = [
    { t: "FULL NAME", w: 150 },
    { t: "EMAIL", w: 150 },
    { t: "COMPANY SIZE", w: 96 },
    { t: "MESSAGE", w: 150, h: 26 },
  ];
  let y = 70;
  return (
    <IllustrationFrame label={label} caption={caption}>
      {/* prompt line */}
      <rect x={40} y={20} width={240} height={22} rx={4} fill="var(--surface-2)" />
      <T x={50} y={34} fill="var(--fg)">&gt; CONTACT FORM FOR A B2B SITE</T>
      <rect x={196} y={26} width={2} height={11} fill="var(--signal)" stroke="none" className="animate-pulse" />
      {/* expansion lines */}
      <path d="M160 42V60" strokeDasharray="2 2" />
      <path d="M100 60H220" />
      {fields.map((f) => {
        const h = f.h ?? 14;
        const el = (
          <g key={f.t}>
            <T x={100} y={y - 3}>{f.t}</T>
            <rect x={100} y={y} width={f.w} height={h} rx={2} fill="var(--surface-1)" />
            <path d={`M${100 + f.w + 8} ${y + 7}l3 3l5 -6`} stroke="var(--data)" />
          </g>
        );
        y += h + 15;
        return el;
      })}
    </IllustrationFrame>
  );
}
