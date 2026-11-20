import { cn } from "@/lib/utils";

/**
 * The faint blueprint grid: 1px verticals on the 12-column grid (4 on mobile).
 * Decorative, absolutely positioned; put it inside a `relative` parent.
 */
export function GridLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="mx-auto grid h-full w-full max-w-page grid-cols-4 gap-x-gutter px-5 md:grid-cols-12 md:px-10 xl:px-16">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-full border-l border-line/70",
              // close the grid on the last visible column
              i === 3 && "border-r md:border-r-0",
              i === 11 && "border-r",
              i >= 4 && "hidden md:block",
            )}
          />
        ))}
      </div>
    </div>
  );
}
