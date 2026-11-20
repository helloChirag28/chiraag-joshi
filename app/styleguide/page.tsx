import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container, Grid } from "@/components/primitives/container";
import { GridLines } from "@/components/primitives/grid-lines";
import { Heading, Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { StatusChip } from "@/components/primitives/status-chip";
import { TagList } from "@/components/primitives/tag";
import { TextLink } from "@/components/primitives/text-link";
import { Arrow } from "@/components/primitives/arrow";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { careerStart } from "@/content/experience";
import { careerLabel, experienceDuration } from "@/lib/date/experience";

// Development-only design-system preview. Production builds render a 404.
export const metadata: Metadata = { title: "Style guide", robots: { index: false } };

const colours = [
  ["bg", "bg-bg"],
  ["surface-1", "bg-surface-1"],
  ["surface-2", "bg-surface-2"],
  ["line", "bg-line"],
  ["line-strong", "bg-line-strong"],
  ["fg", "bg-fg"],
  ["fg-muted", "bg-fg-muted"],
  ["fg-faint", "bg-fg-faint"],
  ["signal", "bg-signal"],
  ["data", "bg-data"],
  ["success", "bg-success"],
  ["danger", "bg-danger"],
] as const;

const typeScale = [
  ["display-xl", "text-display-xl font-semibold", "Chirag Joshi"],
  ["display", "text-display font-semibold", "Engineering, in production"],
  ["h1", "text-h1 font-semibold", "Workforce & Operations"],
  ["h2", "text-h2 font-medium", "Selected work"],
  ["h3", "text-h3 font-medium", "Neighboura"],
  ["lead", "text-lead text-fg-muted", "I build scalable web applications, enterprise software and AI-powered products."],
  ["body", "text-body text-fg-muted", "From backend architecture and databases to the interfaces people use every day."],
  ["small", "text-small text-fg-muted", "Remote · IST (UTC+5:30)"],
] as const;

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-screen bg-bg pt-16 font-geist text-fg">
      <header className="relative overflow-hidden border-b border-line">
        <GridLines />
        <Container className="relative py-section">
          <MonoLabel as="p">Design system · Portfolio 2.0</MonoLabel>
          <h1 className="mt-6 text-display-xl font-semibold">
            <SplitText text="Engineering drawing," onLoad />
            <br />
            <span className="font-serif font-normal italic tracking-normal text-fg-muted">
              <SplitText text="edited like a magazine." onLoad delay={0.2} />
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button variant="signal" size="cta">
                View work <Arrow />
              </Button>
            </Magnetic>
            <Button variant="line" size="cta">
              Get in touch
            </Button>
          </div>
          <MonoLabel as="p" className="mt-10">
            Full Stack Engineer · Since 2023 · {experienceDuration(careerStart)} ·{" "}
            {careerLabel(careerStart)}
          </MonoLabel>
        </Container>
      </header>

      <Section id="colour" index="01" label="Colour">
        <SectionHeader
          title={<>One accent, <Serif>used once</Serif></>}
          intro="Toggle the theme to check both palettes. Signal orange marks the single most important action on screen."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colours.map(([name, cls]) => (
            <li key={name}>
              <div className={`h-20 rounded-lg border border-line ${cls}`} />
              <MonoLabel as="p" className="mt-2">--{name}</MonoLabel>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" index="02" label="Typography">
        <SectionHeader title={<>Type, <Serif>with intent</Serif></>} />
        <div className="mt-12 space-y-8">
          {typeScale.map(([name, cls, sample]) => (
            <Reveal key={name}>
              <Grid className="items-baseline gap-y-2 border-t border-line pt-4">
                <MonoLabel className="col-span-4 md:col-span-2">{name}</MonoLabel>
                <p className={`col-span-4 md:col-span-10 ${cls}`}>{sample}</p>
              </Grid>
            </Reveal>
          ))}
          <Grid className="items-baseline gap-y-2 border-t border-line pt-4">
            <MonoLabel className="col-span-4 md:col-span-2">mono-label</MonoLabel>
            <MonoLabel className="col-span-4 md:col-span-10">Jan 2023 — Present · 2 roles · Remote since 2025</MonoLabel>
          </Grid>
        </div>
      </Section>

      <Section id="components" index="03" label="Components">
        <SectionHeader title={<>Primitives, <Serif>not decoration</Serif></>} />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <MonoLabel as="p">Status</MonoLabel>
            <div className="flex flex-wrap gap-2">
              <StatusChip status="live" />
              <StatusChip status="demo" label="Demo · In active development" />
              <StatusChip status="in-progress" />
            </div>
          </div>
          <div className="space-y-4">
            <MonoLabel as="p">Tags</MonoLabel>
            <TagList items={["Next.js", "TypeScript", "NestJS", "PostgreSQL"]} />
          </div>
          <div className="space-y-4">
            <MonoLabel as="p">Links</MonoLabel>
            <p className="max-w-measure text-body text-fg-muted">
              A <TextLink href="#type">text link</TextLink> in the foreground colour, a{" "}
              <TextLink href="#colour" tone="data">data link</TextLink> inside long copy, and an{" "}
              <TextLink href="https://github.com/helloChirag28" external>external link</TextLink>.
            </p>
          </div>
          <div className="space-y-4">
            <MonoLabel as="p">Card</MonoLabel>
            <a
              href="#components"
              className="group block rounded-xl border border-line bg-surface-1 p-5 transition-colors duration-fast hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <div className="aspect-[16/10] rounded-lg border border-line bg-bg" />
              <MonoLabel as="p" className="mt-4">2026 · Full stack · Next.js</MonoLabel>
              <p className="mt-2 text-h3 font-medium">Project title</p>
              <p className="mt-1 text-small text-fg-muted">One-line outcome, no invented metrics.</p>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
