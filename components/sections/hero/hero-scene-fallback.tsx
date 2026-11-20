import {
  ACCENT_NODES,
  project,
  structurePoints,
  structureSegments,
} from "@/lib/three/structure";

const pts = structurePoints().map((p) => project(p));
const segments = structureSegments();
const xs = pts.map((p) => p[0]);
const ys = pts.map((p) => p[1]);
const pad = 0.4;
const minX = Math.min(...xs) - pad;
const minY = Math.min(...ys) - pad;
const w = Math.max(...xs) - minX + pad;
const h = Math.max(...ys) - minY + pad;
const r = (n: number) => Math.round(n * 1000) / 1000;
const path = segments
  .map(([a, b]) => `M${r(pts[a][0])} ${r(pts[a][1])}L${r(pts[b][0])} ${r(pts[b][1])}`)
  .join("");

/**
 * Static drawing of the structure field. Server-rendered: shown first, and kept
 * for reduced motion, no WebGL, small screens, or if the 3D scene fails.
 */
export function HeroSceneFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`${r(minX)} ${r(minY)} ${r(w)} ${r(h)}`}
      className={className}
      aria-hidden
      focusable="false"
    >
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
