import type {
  CapabilityMarker,
  ExperienceRole,
  Month,
  StackLane,
} from "@/types/content";

// Facts come from the confirmed profile (docs/CONTENT.md §3).
// No employer or client names: the repo is public.

export const careerStart: Month = "2023-01";

export const roles: ExperienceRole[] = [
  {
    id: "shipbuilding-fullstack",
    title: "Full Stack Engineer",
    start: "2025-02",
    end: "present",
    location: "Remote · South Korean shipbuilding industry",
    employer: { visibility: "private" },
    additionalResponsibilities: ["Frontend leadership"],
    framing: "Enterprise platforms for shipyard operations, with AI integration",
    summary:
      "Building enterprise software for shipyard operations: workforce management, work orders and work packages, interactive Gantt scheduling, progress management, load analysis, performance reporting and data-driven dashboards, with AI-powered capabilities and workflows.",
    stack: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "NestJS",
      "REST APIs",
      "SQL",
      "Supabase",
    ],
    domain: [
      "Workforce management",
      "Work orders and work packages",
      "Interactive Gantt scheduling",
      "Progress management",
      "Load analysis",
      "Performance reporting",
      "Data-driven dashboards",
      "AI-powered capabilities and workflows",
    ],
    responsibilities: [
      "Leading frontend development and feature implementation",
      "Building complex, data-heavy enterprise interfaces",
      "Integrating backend APIs",
      "Developing reusable, maintainable frontend architecture",
      "Collaborating remotely with an international engineering team",
      "Contributing to AI-related product capabilities",
    ],
  },
  {
    id: "enterprise-fullstack",
    title: "Full Stack Engineer",
    start: "2023-01",
    end: "2025-01",
    location: "Jaipur, India",
    employer: { visibility: "private" },
    framing: "Foundation in enterprise full stack development",
    stack: ["ASP.NET / .NET", "Angular", "Microsoft SQL Server"],
    responsibilities: [
      "Full stack application development",
      "Backend API development and business logic",
      "Angular frontend development",
      "Database operations and SQL development",
      "Integration across frontend, backend and database layers",
    ],
  },
];

/** Timeline lanes, derived from role stacks: each technology spans every role that used it. */
export const stackLanes: StackLane[] = (() => {
  const lanes = new Map<string, StackLane>();
  const chronological = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  for (const role of chronological) {
    for (const label of role.stack) {
      const lane = lanes.get(label);
      if (lane) lane.end = role.end;
      else lanes.set(label, { label, start: role.start, end: role.end });
    }
  }
  return Array.from(lanes.values());
})();

export const capabilityMarkers: CapabilityMarker[] = [
  { label: "Frontend leadership", at: "2025-02", emphasis: "accent" },
];
