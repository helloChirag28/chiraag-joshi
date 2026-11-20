# Chirag Joshi — Portfolio

Personal portfolio of **Chirag Joshi**, Full Stack Engineer.
Canonical domain: https://chiraagjoshi.com · Current deployment: https://chiraag-joshi.vercel.app

## Stack

- Next.js 16 (App Router, statically prerendered, revalidated daily) · React 19 · TypeScript
- Tailwind CSS with design tokens (`app/globals.css`) · Geist Sans/Mono + Instrument Serif
- Framer Motion + Lenis (smooth scroll), both off for `prefers-reduced-motion`
- Three.js / React Three Fiber: one lazy-loaded hero scene (desktop only, SVG fallback elsewhere)
- EmailJS (contact form)

Planning documents are kept locally in `docs/` (git-ignored, not part of the repository).

## Structure

| Path | Contents |
|---|---|
| `content/` | All copy and data: site config, experience, projects, expertise |
| `types/content.ts` | Content types |
| `components/sections/` | Page sections (hero, experience, work, expertise, about, contact) |
| `components/primitives/` | Design-system building blocks |
| `components/motion/` | Reveal, split text, draw line, magnetic, smooth scroll |
| `components/illustrations/` | Inline SVG project drawings |
| `components/three/` | The single WebGL scene |
| `app/styleguide` | Design-system preview, available in `npm run dev` only |

## Getting started

Requirements: Node.js 20.9+ (required by Next.js 16).

```bash
npm install
cp .env.example .env.local   # then fill in the EmailJS values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next/core-web-vitals`) |

## Environment variables

See [`.env.example`](./.env.example). All three are `NEXT_PUBLIC_*` EmailJS identifiers. They are exposed to the browser by design. Set them in Vercel → Project → Settings → Environment Variables for deployments.

## Notes

- `/.private/`, `/docs/` and `CLAUDE.md` are git-ignored and stay on the local machine only.
- Rollback point before Phase 2A: git tag `v1-legacy`.
