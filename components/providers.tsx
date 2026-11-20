"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
