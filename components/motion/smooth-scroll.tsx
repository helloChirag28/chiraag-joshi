"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

/** Lenis smooth scrolling. Disabled entirely when the user prefers reduced motion. */
export function SmoothScroll() {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.12 });
    return () => lenis.destroy();
  }, [reduced]);

  return null;
}
