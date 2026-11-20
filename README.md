# Chirag Joshi — Portfolio

Personal portfolio of **Chirag Joshi**, Full Stack Engineer.
Canonical domain: https://chiraagjoshi.com · Current deployment: https://chiraag-joshi.vercel.app

## Stack

- Next.js 16 (App Router, static export) · React 19 · TypeScript
- Tailwind CSS · shadcn/ui · Framer Motion
- Three.js / React Three Fiber (hero scene)
- EmailJS (contact form)

Portfolio 2.0 is being built in phases. Planning documents are kept locally in `docs/` (git-ignored, not part of the repository).

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
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Not used with static export; serve `out/` instead |
| `npm run lint` | ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next/core-web-vitals`) |

## Environment variables

See [`.env.example`](./.env.example). All three are `NEXT_PUBLIC_*` EmailJS identifiers. They are exposed to the browser by design. Set them in Vercel → Project → Settings → Environment Variables for deployments.

## Notes

- `/.private/`, `/docs/` and `CLAUDE.md` are git-ignored and stay on the local machine only.
- Rollback point before Phase 2A: git tag `v1-legacy`.
