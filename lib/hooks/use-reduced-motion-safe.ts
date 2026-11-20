"use client";

import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe reduced-motion flag. On the server and before hydration it returns
 * `false`, but every motion component renders its *final* state in server HTML,
 * so content is never hidden for users who prefer reduced motion.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
