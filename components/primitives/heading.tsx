import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  "display-xl": "text-display-xl font-semibold",
  display: "text-display font-semibold",
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-medium",
  h3: "text-h3 font-medium",
} as const;

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: keyof typeof sizes;
  className?: string;
  id?: string;
}

/** Display/heading type. The visual size is independent of the semantic level. */
export function Heading({ children, level = 2, size = "display", className, id }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag id={id} className={cn("font-geist text-fg text-balance", sizes[size], className)}>
      {children}
    </Tag>
  );
}

/** The editorial accent: Instrument Serif italic, for one or two words per heading. */
export function Serif({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-normal">{children}</em>;
}
