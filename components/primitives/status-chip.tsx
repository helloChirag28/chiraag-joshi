import type { ProjectStatus } from "@/types/content";
import { cn } from "@/lib/utils";

const defaults: Record<ProjectStatus, string> = {
  live: "Live",
  demo: "Demo",
  "in-progress": "In progress",
};

/**
 * Honest project status. Live gets the success dot; demo and in-progress are
 * neutral (the single orange accent is reserved for the primary action).
 */
export function StatusChip({
  status,
  label,
  className,
}: {
  status: ProjectStatus;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-line px-2 py-1 font-mono text-mono-label uppercase text-fg-muted",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "live" ? "bg-success" : status === "demo" ? "bg-data" : "bg-fg-faint",
        )}
      />
      {label ?? defaults[status]}
    </span>
  );
}
