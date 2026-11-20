"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationControls, useInView } from "framer-motion";
import { useReducedMotionSafe } from "./use-reduced-motion-safe";

interface Options {
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
  once?: boolean;
  /** Animate even if the element is already on screen at load (hero entrances). */
  onLoad?: boolean;
}

/**
 * Server HTML always shows the final state (rule: SSR state = final state).
 * After hydration, elements that are still below the fold are hidden and then
 * revealed when they scroll in. Elements already on screen stay put, unless
 * `onLoad` asks for an entrance. Reduced motion: never hidden, never animated.
 */
export function useReveal<T extends Element>({ amount = 0.3, once = true, onLoad = false }: Options = {}) {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();
  const reduced = useReducedMotionSafe();
  const inView = useInView(ref, { amount, once });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const visibleNow = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visibleNow || onLoad) {
      controls.set("hidden");
      setArmed(true);
    }
  }, [controls, reduced, onLoad]);

  useEffect(() => {
    if (!armed) return;
    if (inView) controls.start("visible");
    else if (!once) controls.start("hidden");
  }, [armed, inView, once, controls]);

  return { ref, controls };
}
