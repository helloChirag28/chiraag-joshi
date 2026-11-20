import type { Project } from "@/types/content";
import { ProjectIllustration } from "@/components/illustrations";
import { Heading } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { StatusChip } from "@/components/primitives/status-chip";
import { TagList } from "@/components/primitives/tag";
import { Arrow } from "@/components/primitives/arrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** One Selected Work entry: drawing on one side, a spec sheet on the other. */
export function ProjectRow({ project, index, total }: { project: Project; index: number; total: number }) {
  const flip = index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");
  const headingId = `project-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className="group grid grid-cols-4 gap-x-gutter gap-y-8 border-t border-line pt-10 md:grid-cols-12 md:pt-14">
      <Reveal className={cn("col-span-4 md:sticky md:top-24 md:col-span-7 md:self-start", flip && "md:order-2 md:col-start-6")}>
        <div className="overflow-hidden rounded-xl border border-line transition-colors duration-fast group-hover:border-line-strong">
          <div className="transition-transform duration-base ease-out group-hover:scale-[1.015]">
            <ProjectIllustration project={project} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className={cn("col-span-4 md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
        <div className="flex items-center justify-between gap-4">
          <MonoLabel>{n} / {String(total).padStart(2, "0")}</MonoLabel>
          <StatusChip status={project.status} label={project.statusLabel} />
        </div>
        <Heading level={3} size="h1" id={headingId} className="mt-5">
          {project.title}
        </Heading>
        <p className="mt-4 text-lead text-fg-muted">{project.summary}</p>
        {project.context ? <p className="mt-4 text-small text-fg-muted">{project.context}</p> : null}

        <MonoLabel as="p" className="mt-8">What it does</MonoLabel>
        <ul className="mt-3 space-y-2.5">
          {project.built.map((item) => (
            <li key={item} className="flex gap-3 text-small text-fg-muted">
              <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-fg-faint" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {project.statusNote ? (
          <p className="mt-4 border-l border-signal/60 pl-3 text-small text-fg-muted">{project.statusNote}</p>
        ) : null}

        <TagList items={project.stack} className="mt-8" />

        {project.links?.live ? (
          <div className="mt-8">
            <Button asChild variant="line" size="cta">
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                Visit website <Arrow direction="up-right" />
                <span className="sr-only">: {project.title} (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        ) : null}
      </Reveal>
    </article>
  );
}
