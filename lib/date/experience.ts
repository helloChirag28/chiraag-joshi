import type { Month } from "@/types/content";

function monthsBetween(start: Month, now: Date): number {
  const [y, m] = start.split("-").map(Number);
  return (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
}

/** "3 yrs 10 mos" from a start month up to `now` (inclusive of the start month's offset). */
export function experienceDuration(start: Month, now: Date = new Date()): string {
  const total = Math.max(0, monthsBetween(start, now));
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months || !years) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

/** Rounded career label: "Nearly four years" just before a full year, "4+ years" after. */
export function careerLabel(start: Month, now: Date = new Date()): string {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const total = Math.max(0, monthsBetween(start, now));
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (months >= 9) return `Nearly ${words[years + 1] ?? years + 1} years`;
  return years < 1 ? "Less than a year" : `${years}+ years`;
}
