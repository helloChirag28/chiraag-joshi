"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const isDark = hydrated ? resolvedTheme !== "light" : true;
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={hydrated ? `Switch to ${next} theme` : "Toggle theme"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors duration-fast hover:border-line-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
        className,
      )}
    >
      {hydrated ? (
        isDark ? <Sun aria-hidden className="h-4 w-4" /> : <Moon aria-hidden className="h-4 w-4" />
      ) : (
        <span aria-hidden className="h-4 w-4" />
      )}
    </button>
  );
}
