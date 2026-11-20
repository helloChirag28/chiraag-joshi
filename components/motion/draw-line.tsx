"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks/use-reveal";
import { drawX, drawY, withDelay } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface DrawLineProps {
  axis?: "x" | "y";
  className?: string;
  delay?: number;
}

/** A 1px rule that draws itself in when it enters the viewport. Decorative. */
export function DrawLine({ axis = "x", className, delay = 0 }: DrawLineProps) {
  const { ref, controls } = useReveal<HTMLDivElement>({ amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={false}
      animate={controls}
      variants={withDelay(axis === "x" ? drawX : drawY, delay)}
      className={cn(
        "bg-line",
        axis === "x" ? "h-px w-full origin-left" : "h-full w-px origin-top",
        className,
      )}
    />
  );
}
