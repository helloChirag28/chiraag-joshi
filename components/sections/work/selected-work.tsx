import { labProjects, selectedProjects } from "@/content/projects";
import { copy } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRow } from "./project-row";
import { LabCard } from "./lab-card";

export function SelectedWork() {
  return (
    <Section id="work" index="03" label="Selected work">
      <SectionHeader
        title={
          <>
            {copy.work.title} <Serif>{copy.work.accent}</Serif>
          </>
        }
        intro={copy.work.intro}
      />
      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {selectedProjects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} total={selectedProjects.length} />
        ))}
      </div>

      {labProjects.length ? (
        <div id="lab" className="mt-24 scroll-mt-24 md:mt-32">
          <Reveal>
            <MonoLabel as="h3" className="mb-6">
              {copy.work.labTitle}
            </MonoLabel>
          </Reveal>
          <div className="space-y-6">
            {labProjects.map((p) => (
              <Reveal key={p.slug}>
                <LabCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
