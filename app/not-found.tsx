import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { GridLines } from "@/components/primitives/grid-lines";
import { MonoLabel } from "@/components/primitives/mono-label";
import { Arrow } from "@/components/primitives/arrow";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden border-b border-line pt-16">
      <GridLines />
      <Container className="relative py-section">
        <MonoLabel as="p">Error 404 · Off the drawing</MonoLabel>
        <h1 className="mt-6 font-geist text-display-xl font-semibold text-fg">
          Not <em className="font-serif font-normal italic tracking-normal text-fg-muted">found.</em>
        </h1>
        <p className="mt-6 max-w-measure text-lead text-fg-muted">
          This page doesn&apos;t exist. The rest of the site is one scroll away.
        </p>
        <div className="mt-10">
          <Button asChild variant="signal" size="cta">
            <Link href="/">
              Back to home <Arrow />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
