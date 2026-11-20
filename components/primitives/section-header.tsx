import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "./container";
import { Heading } from "./heading";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeaderProps {
  title: ReactNode;
  /** Supporting text, offset to the right on desktop (cols 8–12). */
  intro?: ReactNode;
  className?: string;
}

/** Display heading on the left (cols 1–7), intro offset to the right. */
export function SectionHeader({ title, intro, className }: SectionHeaderProps) {
  return (
    <Grid className={cn("items-end gap-y-6", className)}>
      <Reveal className="col-span-4 md:col-span-7">
        <Heading size="display">{title}</Heading>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1} className="col-span-4 md:col-span-5 md:col-start-8">
          <p className="max-w-measure text-lead text-fg-muted">{intro}</p>
        </Reveal>
      ) : null}
    </Grid>
  );
}
