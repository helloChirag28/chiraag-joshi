import type { ReactNode } from "react";

/**
 * Shared 16:10 drawing frame: faint grid, hairline border and a mono caption.
 * Colours are CSS variables, so drawings follow the theme.
 * The `group` class on a parent enables the hover/focus highlight (`.ill-hl`).
 */
export function IllustrationFrame({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: ReactNode;
}) {
  const gridId = `ill-grid-${caption.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <pattern id={gridId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="var(--line)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <g aria-hidden>
        <rect width="320" height="200" fill="var(--surface-1)" />
        <rect width="320" height="200" fill={`url(#${gridId})`} />
        <g fill="none" stroke="var(--line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {children}
        </g>
        <text
          x="12"
          y="190"
          fill="var(--fg-faint)"
          stroke="none"
          style={{ font: "500 7px var(--font-geist-mono), monospace", letterSpacing: "0.08em" }}
        >
          {caption.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

/** Mono label inside a drawing. */
export function T({ x, y, children, fill = "var(--fg-muted)", anchor }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      stroke="none"
      textAnchor={anchor}
      style={{ font: "500 6px var(--font-geist-mono), monospace", letterSpacing: "0.06em" }}
    >
      {children}
    </text>
  );
}
