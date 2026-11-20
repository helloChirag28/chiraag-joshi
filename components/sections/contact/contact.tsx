import { copy, site } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { Grid } from "@/components/primitives/container";
import { Heading, Serif } from "@/components/primitives/heading";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinks } from "@/components/layout/social-links";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";

export function Contact() {
  return (
    <Section id="contact" index="06" label="Contact">
      <Grid className="gap-y-14">
        <div className="col-span-4 md:col-span-5">
          <Reveal>
            <Heading size="display">
              {copy.contact.title} <Serif>{copy.contact.accent}</Serif>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-measure text-lead text-fg-muted">{copy.contact.intro}</p>
            <dl className="mt-10 space-y-6 border-t border-line pt-6">
              <div>
                <MonoLabel as="dt">Email</MonoLabel>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-sm font-geist text-h3 font-medium text-fg underline decoration-line-strong underline-offset-[6px] transition-colors duration-fast hover:decoration-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                  >
                    {site.email}
                  </a>
                  <CopyEmail email={site.email} />
                </dd>
              </div>
              <div>
                <MonoLabel as="dt">Elsewhere</MonoLabel>
                <dd className="mt-2">
                  <SocialLinks />
                </dd>
              </div>
              <div>
                <MonoLabel as="dt">Timezone</MonoLabel>
                <dd className="mt-2 text-body text-fg-muted">{site.timezone} · Remote</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="col-span-4 md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </Grid>
    </Section>
  );
}
