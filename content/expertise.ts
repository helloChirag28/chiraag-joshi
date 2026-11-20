import type { ExpertiseArea } from "@/types/content";

/** Expertise areas (docs/CONTENT.md §5). */
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
    tools: ["Claude", "AI agents", "RAG"],
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
