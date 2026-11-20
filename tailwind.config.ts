import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Portfolio 2.0 tokens
        bg: 'var(--bg)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        line: { DEFAULT: 'var(--line)', strong: 'var(--line-strong)' },
        fg: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
          faint: 'var(--fg-faint)',
        },
        signal: { DEFAULT: 'var(--signal)', fg: 'var(--signal-fg)' },
        data: 'var(--data)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        // shadcn (v1 site, retired in 2C)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
