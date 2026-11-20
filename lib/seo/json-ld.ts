import { copy, site } from "@/content/site";

/** schema.org Person. Deliberately no `worksFor`: employers stay private. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: copy.shortBio,
    url: site.domain,
    email: `mailto:${site.email}`,
    image: `${site.domain}/opengraph-image`,
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: [".NET", "Angular", "React", "Next.js", "NestJS", "TypeScript", "SQL"],
  };
}
