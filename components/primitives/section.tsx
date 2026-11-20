import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { MonoLabel } from "./mono-label";
import { DrawLine } from "@/components/motion/draw-line";

interface SectionProps {
  id: string;
  /** Two-digit section index, e.g. "02". */
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Section anatomy: a top rule with a mono index + label ("02 / EXPERIENCE"),
 * then content. Vertical rhythm comes from `--section-y`.
 */
export function Section({ id, index, label, children, className }: SectionProps) {
  const labelId = `${id}-label`;
  return (
    <section id={id} aria-labelledby={labelId} className={cn("relative scroll-mt-16 py-section", className)}>
      <Container>
        <DrawLine />
        <div className="flex items-baseline justify-between pt-4">
          <MonoLabel as="p">
            <span className="text-fg">{index}</span> / <span id={labelId}>{label}</span>
          </MonoLabel>
        </div>
        <div className="mt-10 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
