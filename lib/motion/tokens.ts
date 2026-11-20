// Single source of truth for motion (docs/DESIGN_DIRECTION.md §7).
// Numbers only: no React here. Seconds, because Framer Motion uses seconds.

export const duration = {
  instant: 0.12,
  fast: 0.22,
  base: 0.45,
  slow: 0.8,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  snap: { type: "spring", stiffness: 400, damping: 30 },
} as const;

export const stagger = {
  item: 0.05,
  /** Never stagger more than this many items; the rest appear together. */
  maxItems: 6,
} as const;

/** Maximum travel distance for entrances, in px. */
export const distance = 24;
