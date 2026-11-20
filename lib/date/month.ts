import type { Month } from "@/types/content";

const NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Months since year 0, for arithmetic. */
export function monthIndex(m: Month): number {
  const [y, mm] = m.split("-").map(Number);
  return y * 12 + (mm - 1);
}

export function currentMonth(now: Date = new Date()): Month {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}` as Month;
}

export function formatMonth(m: Month | "present"): string {
  if (m === "present") return "Present";
  const [y, mm] = m.split("-").map(Number);
  return `${NAMES[mm - 1]} ${y}`;
}
