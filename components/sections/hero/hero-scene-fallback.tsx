import {
  ACCENT_NODES,
  VIEW,
  project,
  structurePoints,
  structureSegments,
  structureViewBox,
} from "@/lib/three/structure";

const pts = structurePoints().map((p) => project(p, VIEW.yaw, VIEW.pitch));
const segments = structureSegments();
const r = (n: number) => Math.round(n * 1000) / 1000;
const viewBox = structureViewBox().map(r).join(" ");
const path = segments
  .map(([a, b]) => `M${r(pts[a][0])} ${r(pts[a][1])}L${r(pts[b][0])} ${r(pts[b][1])}`)
  .join("");

/**
 * Static drawing of the structure field. Server-rendered: shown first, and kept
 * for reduced motion, or if the animated versions can't run.
 */
export function HeroSceneFallback({ className }: { className?: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden focusable="false">
      <path d={path} fill="none" stroke="var(--line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {pts.map(([x, y], i) =>
        ACCENT_NODES.includes(i) ? (
          <circle key={i} cx={r(x)} cy={r(y)} r={0.06} fill="var(--signal)" />
        ) : (
          <circle key={i} cx={r(x)} cy={r(y)} r={0.022} fill="var(--fg-faint)" />
        ),
      )}
    </svg>
  );
}
