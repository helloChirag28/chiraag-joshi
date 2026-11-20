"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks/use-reveal";
import { duration, ease, stagger } from "@/lib/motion/tokens";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the first word, in seconds. */
  delay?: number;
  onLoad?: boolean;
}

/**
 * Word-by-word mask reveal. The full sentence stays in the DOM for screen
 * readers and search engines; the animated copy is aria-hidden.
 */
export function SplitText({ text, className, delay = 0, onLoad }: SplitTextProps) {
  const { ref, controls } = useReveal<HTMLSpanElement>({ onLoad });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden initial={false} animate={controls} className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: {
                    duration: duration.slow,
                    ease: ease.out,
                    delay: delay + Math.min(i, 12) * stagger.item,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
