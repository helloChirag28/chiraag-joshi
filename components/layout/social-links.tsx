import { Github, Linkedin, Twitter } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const icons = { GitHub: Github, LinkedIn: Linkedin, X: Twitter } as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {site.socials.map(({ label, href }) => {
        const Icon = icons[label];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors duration-fast hover:border-line-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <Icon aria-hidden className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
