import { site } from "@/content/site";
import { Container } from "@/components/primitives/container";
import { MonoLabel } from "@/components/primitives/mono-label";
import { SocialLinks } from "./social-links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-geist text-small font-medium text-fg">
            © {year} {site.name}
          </p>
          <MonoLabel as="p">
            {site.title} · {site.timezone}
          </MonoLabel>
        </div>
        <div className="flex items-center gap-6">
          <SocialLinks />
          <a
            href="#top"
            className="rounded-sm font-mono text-mono-label uppercase text-fg-muted transition-colors duration-fast hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
