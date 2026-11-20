import './globals.css';
import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';
import { legacyCopy, site } from '@/content/site';

const inter = Inter({ subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});
const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`;

export const metadata: Metadata = {
  title: site.name,
  description: legacyCopy.metaDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}