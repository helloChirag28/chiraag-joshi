export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-signal px-4 py-2 font-geist text-small font-medium text-signal-fg focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3 focus-visible:z-[60] focus-visible:outline-none"
    >
      Skip to content
    </a>
  );
}
