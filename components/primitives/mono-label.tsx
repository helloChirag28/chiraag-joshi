import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The "engineering annotation" voice: Geist Mono, 12px, uppercase, tracked. */
export function MonoLabel({
  children,
  className,
  style,
  as: Comp = "span",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "p" | "div" | "dt" | "dd" | "h3";
}) {
  return (
    <Comp className={cn("font-mono text-mono-label uppercase text-fg-muted", className)} style={style}>
      {children}
    </Comp>
  );
}
