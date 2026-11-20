import { Code2, Database, Globe, Layers } from "lucide-react";
import type { ExpertiseArea, LegacySkillGroup } from "@/types/content";

/** Final expertise areas (docs/CONTENT.md §5). Rendered from A5 / 2C on. */
export const expertise: ExpertiseArea[] = [
  {
    area: "Frontend engineering",
    description: "Complex, data-dense enterprise interfaces: scheduling, Gantt, dashboards",
    tools: ["React", "Next.js", "Angular", "TypeScript", "JavaScript"],
  },
  {
    area: "Backend development",
    description: "APIs, business logic and service integration",
    tools: ["ASP.NET / .NET", "C#", "NestJS", "Node.js", "Express", "REST"],
  },
  {
    area: "Database engineering",
    description: "SQL development and data layers",
    tools: ["Microsoft SQL Server", "PostgreSQL", "MySQL", "Supabase", "Prisma"],
  },
  {
    area: "Enterprise applications & architecture",
    description:
      "Reusable frontend architecture and frontend–backend–database integration",
    tools: [],
  },
  {
    area: "AI integration",
    description: "AI-powered capabilities and workflows in products, including local LLMs",
    tools: ["Ollama", "LLM APIs"],
  },
  {
    area: "UI/UX implementation",
    description: "Accessible, responsive interfaces from design",
    tools: ["Tailwind CSS", "Framer Motion", "Three.js / R3F", "Figma"],
  },
  {
    area: "Frontend leadership",
    description: "Leading frontend development in a remote international team",
    tools: [],
  },
  {
    area: "Tooling & delivery",
    description: "Version control, containers, deployment",
    tools: ["Git", "Docker", "Vercel"],
  },
];

/** The v1 skills list, moved here unchanged (A4). A5 switches the UI to `expertise`. */
export const legacySkills: LegacySkillGroup[] = [
  {
    category: "Frontend Development",
    icon: Globe,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Angular"],
  },
  {
    category: "Backend Development",
    icon: Database,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "C#"],
  },
  {
    category: "Programming Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", ".NET", "SQL", "HTML", "CSS", "C++"],
  },
  {
    category: "Tools & Technologies",
    icon: Layers,
    skills: ["Git", "Docker", "AWS", "Firebase", "Vercel", "Figma"],
  },
];
