"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Container } from "@/components/primitives/container";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group flex items-baseline gap-3 rounded-sm font-geist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <span className="text-[0.9375rem] font-semibold tracking-tight text-fg">{site.name}</span>
          <span className="hidden font-mono text-mono-label uppercase text-fg-muted lg:inline">
            {site.title}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 font-mono text-mono-label uppercase text-fg-muted transition-colors duration-fast hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="h-4 w-4" /> : <Menu aria-hidden className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className={cn("border-t border-line bg-bg md:hidden")}
      >
        <Container>
          <ul className="py-2">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-geist text-h3 font-medium text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  {item.label}
                  <span className="font-mono text-mono-label text-fg-muted">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
