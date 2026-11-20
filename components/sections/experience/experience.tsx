import { capabilityMarkers, careerStart, roles, stackLanes } from "@/content/experience";
import { copy } from "@/content/site";
import { experienceDuration } from "@/lib/date/experience";
import { currentMonth, formatMonth } from "@/lib/date/month";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Timeline } from "./timeline";

export function Experience() {
  const now = currentMonth();
  const remoteSince = roles.find((r) => r.location.startsWith("Remote"))?.start.slice(0, 4);
  const summary = [
    `${formatMonth(careerStart)} — Present`,
    `~${experienceDuration(careerStart)}`,
    `${roles.length} roles`,
    remoteSince ? `Remote since ${remoteSince}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Section id="experience" index="02" label="Experience">
      <SectionHeader
        title={
          <>
            {copy.experience.title} <Serif>{copy.experience.accent}</Serif>
          </>
        }
        intro={copy.experience.intro}
      />
      <div className="mt-16 md:mt-24">
        <Timeline roles={roles} lanes={stackLanes} markers={capabilityMarkers} now={now} start={careerStart} />
      </div>
      <MonoLabel as="p" className="mt-12 border-t border-line pt-4">
        {summary}
      </MonoLabel>
    </Section>
  );
}
