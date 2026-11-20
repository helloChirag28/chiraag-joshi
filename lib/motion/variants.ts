import type { Variants } from "framer-motion";
import { distance, duration, ease, spring, stagger } from "./tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

/** Text line rising out of a clipping mask. */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: duration.slow, ease: ease.out } },
};

/** A rule drawing left → right. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: duration.slow, ease: ease.out } },
};

/** A rule drawing top → bottom. */
export const drawY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const pop: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: spring.snap },
};

/** Parent that staggers its children, capped at `stagger.maxItems`. */
export function staggerChildren(delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger.item, delayChildren: delay } },
  };
}

/** Per-item delay that stops growing after `stagger.maxItems`. */
export function cappedDelay(index: number, base = 0) {
  return base + Math.min(index, stagger.maxItems) * stagger.item;
}

/** Returns a copy of `variants` whose `visible` transition starts after `delay` seconds. */
export function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (!visible || typeof visible === "function") return variants;
  return {
    ...variants,
    visible: { ...visible, transition: { ...(visible.transition ?? {}), delay } },
  };
}
