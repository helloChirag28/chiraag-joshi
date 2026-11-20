import type { NavItem, SiteConfig } from "@/types/content";

export const site: SiteConfig = {
  name: "Chirag Joshi",
  title: "Full Stack Engineer",
  domain: "https://chiraagjoshi.com",
  email: "hello.chirag28@gmail.com",
  timezone: "IST (UTC+5:30)",
  careerStart: "2023-01",
  socials: [
    { label: "GitHub", href: "https://github.com/helloChirag28" },
    { label: "LinkedIn", href: "https://in.linkedin.com/in/chirag-joshi-b76153173" },
    { label: "X", href: "https://x.com/chiraag414" },
  ],
};

export const nav: NavItem[] = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Copy: docs/CONTENT.md (Revision 3). `{career}` is replaced with the computed
// career label ("Nearly four years" → "4+ years"), so the copy never goes stale.
export const copy = {
  metaDescription:
    "Chirag Joshi, Full Stack Engineer. Enterprise web applications and AI-powered products with .NET, Angular, React, Next.js and NestJS.",
  shortBio:
    "Full Stack Engineer building enterprise web applications and AI-powered products with .NET, Angular, React, Next.js and NestJS. Currently leading frontend development on a shipyard operations platform, remotely, for the South Korean shipbuilding industry.",
  hero: {
    intro:
      "I build scalable web applications, enterprise software and AI-powered products, from backend architecture and databases to the interfaces people use every day.",
    detail:
      "{career} across .NET, Angular, React, Next.js and NestJS. Today I lead frontend development on an enterprise platform for the shipbuilding industry, working remotely with an international team.",
    primaryCta: "View work",
    secondaryCta: "Get in touch",
  },
  experience: {
    title: "Engineering,",
    accent: "in production",
    intro:
      "Two roles, one direction: from enterprise .NET and Angular foundations to leading the frontend of an industrial platform.",
  },
  work: {
    title: "Selected",
    accent: "work",
    intro:
      "Each project links to the live site, and every status says exactly what works today.",
    labTitle: "Experiments",
  },
  expertise: {
    title: "What I",
    accent: "work with",
  },
  about: {
    title: "About &",
    accent: "approach",
    body: "I'm a Full Stack Engineer based in India, working remotely since 2025. I started in enterprise .NET and Angular, building APIs, business logic and SQL-backed applications. Today I lead frontend development on a shipyard operations platform: scheduling, workforce and reporting tools where clarity under complex data matters.",
    principlesTitle: "How I work",
    principles: [
      "Clear written communication across timezones",
      "Small, reviewable increments over big-bang releases",
      "Architecture that the next engineer can maintain",
      "Accessible, fast interfaces by default",
    ],
    portraitAlt: "Black-and-white portrait of Chirag Joshi in a dark suit, smiling.",
  },
  contact: {
    title: "Let's build",
    accent: "something.",
    intro: "Have a product, platform or feature in mind? Tell me about it.",
  },
};
