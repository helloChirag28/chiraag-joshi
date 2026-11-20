"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";
import { fadeUp, withDelay } from "@/lib/motion/variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  onLoad?: boolean;
  as?: "div" | "section" | "li" | "span" | "p";
}

/** Fades/raises its children into place when they enter the viewport. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount,
  onLoad,
  as = "div",
}: RevealProps) {
  const { ref, controls } = useReveal<HTMLElement>({ amount, onLoad });
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={false}
      animate={controls}
      variants={withDelay(variants, delay)}
    >
      {children}
    </Comp>
  );
}
