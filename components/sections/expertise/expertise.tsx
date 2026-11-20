import { expertise } from "@/content/expertise";
import { copy } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { TagList } from "@/components/primitives/tag";
import { Reveal } from "@/components/motion/reveal";
import { cappedDelay } from "@/lib/motion/variants";

export function Expertise() {
  return (
    <Section id="expertise" index="04" label="Expertise">
      <SectionHeader
        title={
          <>
            {copy.expertise.title} <Serif>{copy.expertise.accent}</Serif>
          </>
        }
      />
      <ul className="mt-16 grid grid-cols-1 border-t border-line md:mt-24 md:grid-cols-2">
        {expertise.map((item, i) => (
          <li key={item.area} className="border-b border-line md:odd:border-r md:odd:pr-8 md:even:pl-8">
            <Reveal delay={cappedDelay(i % 2)} className="flex h-full flex-col gap-4 py-8">
              <div className="flex items-baseline gap-4">
                <MonoLabel>{String(i + 1).padStart(2, "0")}</MonoLabel>
                <h3 className="font-geist text-h3 font-medium text-fg">{item.area}</h3>
              </div>
              <p className="max-w-measure text-body text-fg-muted md:pl-9">{item.description}</p>
              {item.tools.length ? <TagList items={item.tools} className="md:pl-9" /> : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
