/** Arrow glyph that slides 4px on hover of the parent `group/btn` or `group/link`. */
export function Arrow({ direction = "right" }: { direction?: "right" | "up-right" | "down" }) {
  const glyph = direction === "right" ? "→" : direction === "down" ? "↓" : "↗";
  const move =
    direction === "right"
      ? "group-hover/btn:translate-x-1"
      : direction === "down"
        ? "group-hover/btn:translate-y-1"
        : "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5";
  return (
    <span aria-hidden className={`inline-block transition-transform duration-instant ease-out ${move}`}>
      {glyph}
    </span>
  );
}
