# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this workspace.

## Repository Overview

This repository contains the **Kinetic Brand Partners marketing website**.

**Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
**Local path**: `/Volumes/Mac Mini 2TB SSD/Dan/Kinetic Brand Partners/Projects/marketing-site`

**Related Standalone Repositories** (separate repos, not in this directory):
- **job-tracker** - `https://github.com/tigerswim/job-tracker.git`
- **RacePrep** - `https://github.com/tigerswim/raceprep.git`
- **sagenet-website** - `https://github.com/tigerswim/sagenet-website.git`

## Repository Structure

All project files live at the **repository root** (no subdirectory nesting):

```
kineticbrandpartners/ (repo root)
├── src/               # Next.js source code
│   ├── app/           # Pages and routes
│   ├── components/    # Shared components
│   └── styles/        # Global styles
├── public/            # Static assets (images, videos, logos)
├── package.json       # Dependencies
├── next.config.js     # Next.js config
├── tsconfig.json      # TypeScript config
├── netlify.toml       # Netlify deploy config
├── FFP/               # Separate project (excluded from TS build)
├── impeccable/        # Separate project (excluded from TS build)
└── CLAUDE.md          # This file
```

> **Note**: `FFP/` and `impeccable/` are separate projects nested here for convenience. They are excluded from the TypeScript build via `tsconfig.json`. Do not modify files in those directories as part of marketing-site work.

## Project Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run lint     # Run linter
npx tsc --noEmit # Check TypeScript errors
```

## Git Workflow

```bash
git status
git add src/ public/ <other-files>
git commit -m "Description"
git push origin main
```

**Do not stage**: `.playwright-mcp/`, `lt-*.png` screenshot files, `public/Videos/originals-backup/`, `.mov`/`.mpg` files — all covered by `.gitignore`.

## Deployment

- **Platform**: Netlify
- **Base Directory**: *(repo root — leave blank in Netlify dashboard)*
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 20 (Active LTS)
- **Trigger**: Push to `main` branch automatically deploys to `kineticbrandpartners.com`

## Important Paths

- **Source**: `src/`
- **Pages**: `src/app/`
- **Components**: `src/components/`
- **Styles**: `src/styles/`
- **Public assets**: `public/`
- **Candidate pages**: `src/app/locumtenens/`, `src/app/earnix/`, `src/app/ups/`

## Environment Variables

Uses `.env.local` if needed (never commit this file):
```
.env.local
```

## Tech Stack

- **Framework**: Next.js 15 (static export)
- **Language**: TypeScript
- **Fonts**: Bricolage Grotesque (display) + Manrope (text), loaded via `next/font/google`
- **Styling**: Plain CSS — `src/app/globals.css` (legacy candidate-page styles) + `src/app/kbp-main.css` (main-site refresh, scoped under `.kbp-main`)
- **Deployment**: Netlify

## Design System

Two parallel design surfaces live in this repo:

1. **Main site** — `/`, `/about`, `/work`, `/resume`. Uses the **KBP refresh** (Bricolage + Manrope, navy/teal palette pulled from the logo). Each main-site page imports `kbp-main.css` and adds `kbp-main` to its root `<div>`. All refresh tokens, component overrides, and motion are scoped under `.kbp-main` so they cannot leak to candidate pages.

2. **Candidate pages** — `/sbd`, `/gc`, `/ups`, `/ws`, `/keh`, `/locumtenens`, `/finsync`, `/earnix`, `/ashley`. These keep the **legacy Kinetic Flow** styles in `globals.css` plus per-page brand overrides in `src/app/<page>/page.css`. Do not edit `kbp-main.css` for candidate-page changes.

   **Every new candidate page requires:**
   - **Hamburger menu** — create a `<Company>MobileMenu` client component (pattern: `src/components/AshleyMobileMenu.tsx`). The desktop nav hides at `max-width: 768px`; the hamburger shows. The overlay uses the page's brand colors (light pages: white background, dark text, brand-color accent; dark pages: dark background, white text). Place `<CompanyMobileMenu />` in the header alongside the desktop `<ul>`.
   - **Thanks Mom video height matching** — the two Thanks Mom videos (Cullen: 352×240, Debbie: 320×240) have different aspect ratios. Set `style={{ aspectRatio: "352/240" }}` on **both** `.media-wrapper` divs, and `style={{ height: "100%", objectFit: "contain" }}` on both `<video>` elements. This makes them render at the same height with minimal letterboxing.

**Brand color tokens** (in `kbp-main.css`, under `.kbp-main`):
- `--ink`: navy from the "Kinetic" wordmark
- `--accent`: bright cyan from the "netic" highlight (used for backgrounds, dots, hover bgs)
- `--accent-deep`: deeper teal from the wordmark's right edge (used for **all** accent text — eyebrows, italic emphasis, role labels)
- Neutrals are tinted toward hue 250 (the logo's blue-violet axis) for cohesion

**Motion**: `ScrollReveal` (IntersectionObserver-driven) toggles `is-revealed` on `[data-reveal]` elements. `HeroHeadline` animates the homepage hero word-by-word on load. Both honor `prefers-reduced-motion`.

## Best Practices

1. Run `npm run build` locally before pushing — Netlify will fail if the build breaks
2. Keep large video files out of git (use `.gitignore`; originals stay local only)
3. `FFP/` and `impeccable/` are excluded from builds — don't edit them for marketing-site work
4. Candidate pages each have their own `page.css` for brand-specific overrides — make changes there, not in `kbp-main.css` or `globals.css`
5. When adding a new main-site page, import `@/app/kbp-main.css` and put `kbp-main` on the root `<div>` alongside `kinetic-page`

---

**Last Updated**: May 2026
