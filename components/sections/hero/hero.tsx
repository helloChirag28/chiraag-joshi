import { copy, site } from "@/content/site";
import { careerStart } from "@/content/experience";
import { careerLabel } from "@/lib/date/experience";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { GridLines } from "@/components/primitives/grid-lines";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Arrow } from "@/components/primitives/arrow";
import { Magnetic } from "@/components/motion/magnetic";
import type { CSSProperties } from "react";
import { HeroScene } from "./hero-scene";
import { HeroSceneFallback } from "./hero-scene-fallback";

const rise = (delayMs: number, from = 18) =>
  ({ "--rise-delay": `${delayMs}ms`, "--rise-from": `${from}px` }) as CSSProperties;

export function Hero() {
  const since = careerStart.slice(0, 4);
  const detail = copy.hero.detail.replace("{career}", careerLabel(careerStart));

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line pt-16">
      <GridLines />
      {/* the one permitted gradient: a faint vignette behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,color-mix(in_oklab,var(--fg)_6%,transparent),transparent_70%)]"
      />

      <Container className="relative grid min-h-[calc(100svh-4rem)] grid-cols-4 content-center gap-x-gutter gap-y-10 py-16 md:grid-cols-12 md:py-24">
        <div className="col-span-4 md:col-span-12">
          <MonoLabel as="p" className="animate-rise" style={rise(0)}>
            {site.title} · Since {since} · Remote · {site.timezone}
          </MonoLabel>
        </div>

        <div className="relative z-10 col-span-4 md:col-span-7">
          <h1
            id="hero-title"
            className="animate-rise font-geist text-display-xl font-semibold text-fg"
            style={rise(60, 32)}
          >
            {site.name}
          </h1>
          <p className="animate-rise mt-4 font-geist text-h2 font-medium text-fg" style={rise(160)}>
            {site.title}
          </p>
          <div className="animate-rise" style={rise(240)}>
            <p className="mt-8 max-w-measure text-lead text-fg-muted">{copy.hero.intro}</p>
            <p className="mt-4 max-w-measure text-body text-fg-muted">{detail}</p>
          </div>
          <div className="animate-rise" style={rise(320)}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild variant="signal" size="cta">
                  <a href="#work">
                    {copy.hero.primaryCta} <Arrow />
                  </a>
                </Button>
              </Magnetic>
              <Button asChild variant="line" size="cta">
                <a href="#contact">{copy.hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-4 -mx-5 h-[min(70vw,22rem)] md:col-span-5 md:mx-0 md:h-[min(42vw,34rem)]">
          <HeroScene fallback={<HeroSceneFallback className="h-full w-full" />} />
        </div>
      </Container>
    </section>
  );
}
