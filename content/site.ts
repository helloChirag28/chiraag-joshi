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

export function socialHref(label: SiteConfig["socials"][number]["label"]) {
  const link = site.socials.find((s) => s.label === label);
  if (!link) throw new Error(`Missing social link: ${label}`);
  return link.href;
}

/**
 * Copy the v1 site renders today, moved here unchanged (A4).
 * A5 replaces it with the approved copy from docs/CONTENT.md.
 */
export const legacyCopy = {
  metaDescription:
    "Portfolio website of Chirag Joshi, a software developer and freelancer specializing in web development and 3D animations.",
  heroSubtitle: "Full Stack Engineer & Freelancer",
  heroIntro:
    "I'm currently focused on expanding my experience designing and developing high performing websites with cutting-edge 3D technology.",
  contactTitle: "Get in Touch",
  contactIntro:
    "Have a project in mind? Let's work together to bring your ideas to life.",
  contactTalkTitle: "Let's Talk",
  contactTalkBody:
    "I'm always open for new opportunities and interesting projects.",
};

export const legacyNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
