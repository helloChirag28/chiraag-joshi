import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Outer page width: 1440 px max, responsive side padding. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-page px-5 md:px-10 xl:px-16", className)}>{children}</div>;
}

/** The 12-column grid (4 on mobile) used inside a Container. */
export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-4 gap-x-gutter md:grid-cols-12", className)}>{children}</div>;
}
