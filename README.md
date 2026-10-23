# UJWAL.EXE — Developer Portfolio

A cinematic, interactive portfolio for **Ujwal Manjunath**, built with React, Vite, TypeScript, Tailwind CSS, Three.js (React Three Fiber), Framer Motion and Lucide.

> **Status:** the source was written in an environment without npm registry access, so it has **not been compiled or run yet**. Run the steps below once; if `npm run build` reports any error, fix it before deploying (see "First run" below).

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

### First run checklist

1. `npm install`
2. `npm run typecheck` — fix any reported type errors.
3. `npm run dev` — open the site, check the browser console is clean.
4. Try: nav links, project filters, a case study, browser back/forward, `Ctrl/⌘ + K`, the effects toggle.
5. `npm run build` — must complete without errors.

## Add your real details (required)

Open **`src/data/site.ts`** and fill in the empty values:

```ts
contact: {
  email: '',     // e.g. 'name@example.com'
  github: '',    // full profile URL
  linkedin: '',  // full profile URL
  resume: '',    // '/resume.pdf' (place the file in /public) or a full URL
}
```

Any value left empty keeps the matching link hidden everywhere (contact section, footer, command palette). Nothing is invented.

Optional real content:
- **Repository / demo links:** add `links: { repo: '…', demo: '…' }` to a project in `src/data/projects.ts`. Buttons appear only when set.
- **Certificates / event photos:** put files in `public/certificates/` and set `image` and `imageAlt` on the entry in `src/data/achievements.ts`.

## Where content lives

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Name, headline, contact config |
| `src/data/projects.ts` | All projects + case-study content (single source of truth) |
| `src/data/achievements.ts` | Verified achievements |
| `src/data/stack.ts` | Technology map (tagged used / planned / learning) |
| `src/data/domains.ts` | About-section engineering domains |

## Review before publishing

Case-study text was written from the project briefs only. Compare each project's `status` block in `src/data/projects.ts` with the actual repository, especially:

- **SmartShelf** and **MediCore** — confirm which modules are really implemented.
- **WanderSync** — confirm implemented features and that payments are Razorpay Test Mode only.
- **Contribution** lines — confirm they match what you personally built (especially if any project was a team effort).

Rules followed throughout: no metrics, accuracy numbers, user counts, fake demo links or fake screenshots. Visuals are procedural illustrations and are captioned as such.

## Features

- Hero with a lazy-loaded WebGL core (desktop only), static SVG fallback for mobile, no WebGL, reduced motion or effects off.
- Visual-effects toggle (nav button and command palette), remembered in `localStorage`. Respects `prefers-reduced-motion`.
- Command palette: `⌘K` / `Ctrl+K`, arrow keys, Enter, Esc. Ignored while typing in other inputs.
- Project explorer: orbital view on desktop, vertical list on mobile, working filters.
- Case-study routes at `/projects/:slug` with back/forward and scroll restoration.
- Accessible: semantic HTML, skip link, visible focus, status shown by text + icon, no hover-only content.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel — the Vite preset is detected automatically.
3. Build command `npm run build`, output directory `dist` (already set in `vercel.json`).

`vercel.json` rewrites all paths to `index.html`, so direct links to case studies work. No environment variables or backend are required. Do not commit secrets.

## Project structure

```
src/
  components/   Nav, CommandPalette, HeroCore (3D), CoreFallback, ProjectVisual, ui
  sections/     Hero, About, Projects, Achievements, Stack, Contact
  pages/        Home, CaseStudy, NotFound
  hooks/        useEffects, useGoTo, useMedia, useDocumentTitle
  data/         All editable content
  styles/       Tailwind + design tokens
```
