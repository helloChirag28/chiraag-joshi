import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { copy, site } from "@/content/site";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});
const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`;

const title = `${site.name} · ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: title, template: `%s · ${site.name}` },
  description: copy.metaDescription,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: copy.metaDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: copy.metaDescription,
    creator: "@chiraag414",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-bg font-geist text-fg antialiased selection:bg-signal selection:text-signal-fg">
        <Providers>
          <SkipLink />
          <Navbar />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
