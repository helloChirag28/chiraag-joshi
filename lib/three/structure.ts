// "Structure field" geometry (DESIGN_DIRECTION §6): a sparse wireframe frame,
// like a hull section, built from ribs (cross-sections) joined by stringers.
// Pure math, no three.js import, so the server-rendered SVG fallback can share it.

export type Vec3 = [number, number, number];

export const RIBS = 11;
export const POINTS_PER_RIB = 9;
const LENGTH = 7.2; // along z
const HALF_BEAM = 1.9; // x
const DEPTH = 1.9; // y

/** Points, row-major: rib r, point i → index r * POINTS_PER_RIB + i. */
export function structurePoints(): Vec3[] {
  const pts: Vec3[] = [];
  for (let r = 0; r < RIBS; r++) {
    const u = r / (RIBS - 1); // 0..1 along the length
    const z = (u - 0.5) * LENGTH;
    // Ends taper (bow/stern), the middle is full.
    const fullness = 1 - Math.pow(Math.abs(u - 0.5) * 2, 2.2) * 0.62;
    for (let i = 0; i < POINTS_PER_RIB; i++) {
      const t = i / (POINTS_PER_RIB - 1); // 0..1 around the section
      const theta = (t - 0.5) * Math.PI * 0.94;
      const x = Math.sin(theta) * HALF_BEAM * fullness;
      const y = DEPTH * 0.45 - Math.cos(theta) * DEPTH * (0.55 + 0.45 * fullness);
      pts.push([x, y, z]);
    }
  }
  return pts;
}

/** Line segments as index pairs: rib curves, deck beams and stringers. */
export function structureSegments(): [number, number][] {
  const seg: [number, number][] = [];
  const id = (r: number, i: number) => r * POINTS_PER_RIB + i;
  for (let r = 0; r < RIBS; r++) {
    for (let i = 0; i < POINTS_PER_RIB - 1; i++) seg.push([id(r, i), id(r, i + 1)]);
    seg.push([id(r, 0), id(r, POINTS_PER_RIB - 1)]); // deck beam
  }
  for (let r = 0; r < RIBS - 1; r++) {
    for (let i = 0; i < POINTS_PER_RIB; i += 2) seg.push([id(r, i), id(r + 1, i)]); // stringers
  }
  return seg;
}

/** A few nodes picked out in signal orange. */
export const ACCENT_NODES: number[] = [
  2 * POINTS_PER_RIB + 1,
  5 * POINTS_PER_RIB + 6,
  8 * POINTS_PER_RIB + 3,
];

/** Deterministic pseudo-random in [0,1) so server and client agree. */
export function seeded(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Simple orthographic projection used by the SVG fallback. */
export function project([x, y, z]: Vec3, yaw = -0.6, pitch = 0.5): [number, number] {
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const y1 = y * cp - z1 * sp;
  return [x1, -y1];
}
