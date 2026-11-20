import { Hero } from "@/components/sections/hero/hero";
import { Experience } from "@/components/sections/experience/experience";
import { SelectedWork } from "@/components/sections/work/selected-work";
import { Expertise } from "@/components/sections/expertise/expertise";
import { About } from "@/components/sections/about/about";
import { Contact } from "@/components/sections/contact/contact";
import { personJsonLd } from "@/lib/seo/json-ld";

// Static, re-generated daily so computed durations ("3 yrs 10 mos", NOW marker) stay current.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Experience />
      <SelectedWork />
      <Expertise />
      <About />
      <Contact />
    </>
  );
}
