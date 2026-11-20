import type { LucideIcon } from "lucide-react";

/** Calendar month as `YYYY-MM`. */
export type Month = `${number}-${
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12"}`;

export interface SocialLink {
  label: "GitHub" | "LinkedIn" | "X";
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  domain: string;
  email: string;
  timezone: string;
  careerStart: Month;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceRole {
  id: string;
  /** Primary title. Never a leadership title. */
  title: "Full Stack Engineer";
  start: Month;
  end: Month | "present";
  location: string;
  /** The employer name is intentionally absent: the repo is public. */
  employer: { visibility: "private" };
  additionalResponsibilities?: string[];
  framing: string;
  summary?: string;
  stack: string[];
  domain?: string[];
  responsibilities: string[];
}

export interface StackLane {
  label: string;
  start: Month;
  end: Month | "present";
}

export interface CapabilityMarker {
  label: string;
  at: Month;
  emphasis?: "accent";
}

export type ProjectStatus = "live" | "demo" | "in-progress";

export interface Project {
  slug: string;
  title: string;
  tier: "selected" | "lab";
  kind: "professional" | "personal" | "client";
  /** true → no links are rendered, only the illustration. */
  confidential?: boolean;
  summary: string;
  problem?: string;
  built: string[];
  role: string;
  stack: string[];
  status: ProjectStatus;
  statusNote?: string;
  links?: { live?: string; code?: string };
  illustration: "workforce" | "neighboura" | "hiteshi" | "formforge";
  illustrationLabel: string;
  statusLabel?: string;
  context?: string;
}

export interface ExpertiseArea {
  area: string;
  description: string;
  tools: string[];
}

/* ------------------------------------------------------------------ */
/* Legacy shapes: the v1 site's data, rendered unchanged until A5.     */
/* ------------------------------------------------------------------ */

export interface LegacyProject {
  title: string;
  description: string;
  longDescription: string;
  summaryOfProject: {
    features: (string | { title: string; children: string[] })[];
    status: string;
  };
  image: string;
  screenshots: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  icon: LucideIcon;
}

export interface LegacySkillGroup {
  category: string;
  icon: LucideIcon;
  skills: string[];
}
