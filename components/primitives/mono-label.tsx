import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The "engineering annotation" voice: Geist Mono, 12px, uppercase, tracked. */
export function MonoLabel({
  children,
  className,
  as: Comp = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "dt" | "dd";
}) {
  return <Comp className={cn("font-mono text-mono-label uppercase text-fg-muted", className)}>{children}</Comp>;
}
