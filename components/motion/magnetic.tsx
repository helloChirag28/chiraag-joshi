"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { spring } from "@/lib/motion/tokens";

interface MagneticProps {
  children: ReactNode;
  /** How far the element follows the pointer, as a fraction of the offset. */
  strength?: number;
  className?: string;
}

/**
 * Pulls its child slightly toward the pointer. Primary CTAs only.
 * Off for touch pointers and reduced motion. Values live in MotionValues,
 * so pointer moves never re-render React.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();
  const x = useSpring(useMotionValue(0), spring.snap);
  const y = useSpring(useMotionValue(0), spring.snap);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
