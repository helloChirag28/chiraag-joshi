import type { Project } from "@/types/content";

// Final selection and copy: docs/CONTENT.md §4. Stacks confirmed by Chirag (2026-11-20).
// Honest statuses only. No employer or client names.

export const projects: Project[] = [
  {
    slug: "workforce-operations",
    title: "Workforce & Operations Management Platform",
    tier: "selected",
    kind: "personal",
    summary:
      "A guided demo of an operations-planning platform: work packages, work orders and tasks on one schedule, crew capacity, and progress reporting.",
    context:
      "An independent demonstration, built with fictional sample data, of the kind of planning and workforce software I work on professionally. It is not the production system and not a customer record.",
    built: [
      "A three-level work structure (work package → work order → task) on a timeline and calendar; a sample task can be moved to see where it lands.",
      "A capacity view comparing scheduled hours with available hours per crew, flagging over- and under-allocation.",
      "Reporting with progress, a printable schedule, and weekly, discipline and long-range views.",
      "Planner, manager and contractor perspectives on the same programme.",
    ],
    statusNote: "AI-assisted risk assessment is in progress and not yet functional.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS"],
    status: "demo",
    statusLabel: "Demo · In active development",
    links: { live: "https://workforce-operations.vercel.app/" },
    illustration: "workforce",
    illustrationLabel:
      "Schematic of a schedule: work package, work order and task bars over a week grid, with a crew capacity strip below where one crew is over-allocated.",
    figure: "Fig. 01 — Schedule",
  },
  {
    slug: "neighboura",
    title: "Neighboura",
    tier: "selected",
    summary:
      "A community management platform for residential societies that connects residents, society admins and security guards in one app.",
    built: [
      "Residents: notices, complaints with photos plus a status workflow and chat with the admin, visitor passes (QR code + passcode), approval of walk-in visitors, parcel collection, car pooling and a neighbour marketplace.",
      "Admins: set up buildings, floors and units; approve members with a join code; send notices targeted to a community, building, floor or unit; manage complaints, gates, guards and the household-worker registry.",
      "Guards: start duty at a gate, verify passes, register walk-ins with resident approval, record worker attendance, release parcels with a collection OTP.",
      "Role-specific sign-in: OTP or password for residents, phone + PIN for guards.",
    ],
    stack: ["React Native", "Next.js", "NestJS", "PostgreSQL", "AWS"],
    status: "in-progress",
    links: { live: "https://www.neighboura.com/" },
    illustration: "neighboura",
    illustrationLabel:
      "Isometric block of residential units connected by thin lines to three role nodes: resident, admin and gate.",
    figure: "Fig. 02 — Community",
  },
  {
    slug: "hiteshi-pustak-bhandar",
    title: "Hiteshi Pustak Bhandar",
    tier: "selected",
    summary:
      "A bilingual (Hindi/English) website and product catalog for a religious bookstore in Udaipur.",
    built: [
      "A catalog of books and worship essentials, filterable by category and publisher.",
      "Featured items grouped by category, plus store location, hours, directions and contact.",
      "SEO-ready: canonical URLs, Open Graph/Twitter metadata, optimized images.",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Cloudinary", "AWS"],
    status: "live",
    links: { live: "https://www.hiteshipustakbhandar.com" },
    illustration: "hiteshi",
    illustrationLabel:
      "A bookshelf elevation next to a catalog grid with category and publisher filter chips, one filter active.",
    figure: "Fig. 03 — Catalog",
  },
  {
    slug: "formforge",
    title: "FormForge",
    tier: "lab",
    kind: "personal",
    summary:
      "Generate a complete form (fields, types, validation, sections) from a one-line prompt, then edit it and export it as JSON or HTML.",
    built: [
      "Prompt-to-form generation with field types, validation and sections.",
      "An editor for the generated form, with JSON and HTML export.",
    ],
    statusNote:
      "AI generation runs through a local LLM (Ollama, Llama 3.2 3B). The hosted demo can't reach a local model, so it falls back to rule-based templates.",
    stack: ["Next.js", "TypeScript", "Ollama", "Zod", "Framer Motion"],
    status: "demo",
    links: {
      live: "https://form-forge-six.vercel.app/",
      code: "https://github.com/helloChirag28/FormForge",
    },
    illustration: "formforge",
    illustrationLabel:
      "A one-line prompt expanding into a stack of form fields with validation ticks.",
    figure: "Fig. 04 — Prompt → form",
  },
];

export const selectedProjects = projects.filter((p) => p.tier === "selected");
export const labProjects = projects.filter((p) => p.tier === "lab");

// Confidentiality guard: a confidential project must never carry links.
for (const p of projects) {
  if (p.confidential && p.links) {
    throw new Error(`Confidential project "${p.slug}" must not have links.`);
  }
}
