import type { Project } from "@/types/content";
import { ProjectIllustration } from "@/components/illustrations";
import { StatusChip } from "@/components/primitives/status-chip";
import { TagList } from "@/components/primitives/tag";
import { TextLink } from "@/components/primitives/text-link";

/** Compact "Experiments" entry under Selected Work. */
export function LabCard({ project }: { project: Project }) {
  const headingId = `lab-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="group grid grid-cols-4 gap-x-gutter gap-y-6 rounded-xl border border-line bg-surface-1 p-5 transition-colors duration-fast hover:border-line-strong md:grid-cols-12 md:p-6"
    >
      <div className="col-span-4 overflow-hidden rounded-lg border border-line md:col-span-4">
        <ProjectIllustration project={project} />
      </div>
      <div className="col-span-4 md:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id={headingId} className="font-geist text-h2 font-medium text-fg">{project.title}</h3>
          <StatusChip status={project.status} label={project.statusLabel} />
        </div>
        <p className="mt-3 max-w-measure text-body text-fg-muted">{project.summary}</p>
        {project.statusNote ? (
          <p className="mt-3 max-w-measure border-l border-signal/60 pl-3 text-small text-fg-muted">{project.statusNote}</p>
        ) : null}
        <TagList items={project.stack} className="mt-5" />
        <div className="mt-5 flex flex-wrap gap-6">
          {project.links?.live ? (
            <TextLink href={project.links.live} external>
              Live demo
            </TextLink>
          ) : null}
          {project.links?.code ? (
            <TextLink href={project.links.code} external>
              Source code
            </TextLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
