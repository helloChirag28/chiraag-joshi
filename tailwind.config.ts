import type { Config } from 'tailwindcss';

// Hex tokens with Tailwind opacity modifiers (e.g. bg-bg/80) via color-mix.
const c = (v: string) => `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        display: ['clamp(2.5rem, 5.5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        h1: ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        h3: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        'mono-label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        section: 'var(--section-y)',
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        page: '1440px',
        measure: '65ch',
      },
      boxShadow: {
        overlay: 'var(--shadow-overlay)',
      },
      transitionDuration: {
        instant: '120ms',
        fast: '220ms',
        base: '450ms',
        slow: '800ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      colors: {
        // Portfolio 2.0 tokens
        bg: c('--bg'),
        'surface-1': c('--surface-1'),
        'surface-2': c('--surface-2'),
        line: { DEFAULT: c('--line'), strong: c('--line-strong') },
        fg: {
          DEFAULT: c('--fg'),
          muted: c('--fg-muted'),
          faint: c('--fg-faint'),
        },
        signal: { DEFAULT: c('--signal'), fg: c('--signal-fg') },
        data: c('--data'),
        success: c('--success'),
        danger: c('--danger'),
      },
    },
  },
  plugins: [],
};
export default config;
