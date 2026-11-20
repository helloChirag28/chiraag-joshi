import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** `data` = blue, for links inside long copy. */
  tone?: "fg" | "data";
  external?: boolean;
}

/** Text link whose 1px underline draws in on hover/focus. */
export function TextLink({ children, className, tone = "fg", external, ...props }: TextLinkProps) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/link relative inline-flex items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        tone === "data" ? "text-data" : "text-fg",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-fast ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
        />
      </span>
      {external ? (
        <>
          <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}
