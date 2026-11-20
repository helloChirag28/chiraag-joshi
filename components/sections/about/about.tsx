import Image from "next/image";
import { copy } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { Grid } from "@/components/primitives/container";
import { Heading, Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/motion/reveal";
import portrait from "@/public/about/portrait.webp";

export function About() {
  return (
    <Section id="about" index="05" label="About">
      <Grid className="gap-y-12">
        <Reveal className="col-span-4 md:col-span-4">
          <figure>
            <div className="overflow-hidden rounded-xl border border-line">
              <Image
                src={portrait}
                alt={copy.about.portraitAlt}
                sizes="(max-width: 768px) 100vw, 30vw"
                placeholder="blur"
                className="aspect-[4/5] h-auto w-full object-cover object-[50%_20%]"
              />
            </div>
            <MonoLabel as="p" className="mt-3 text-fg-faint">Fig. 05 — Portrait</MonoLabel>
          </figure>
        </Reveal>
        <div className="col-span-4 md:col-span-7 md:col-start-6">
          <Reveal>
            <Heading size="display">
              {copy.about.title} <Serif>{copy.about.accent}</Serif>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-measure text-lead text-fg-muted">{copy.about.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <MonoLabel as="h3" className="mt-12">{copy.about.principlesTitle}</MonoLabel>
            <ol className="mt-4 border-t border-line">
              {copy.about.principles.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-line py-4">
                  <MonoLabel className="text-fg-faint">{String(i + 1).padStart(2, "0")}</MonoLabel>
                  <span className="text-body text-fg">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Grid>
    </Section>
  );
}
