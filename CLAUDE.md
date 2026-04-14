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

- **Framework**: Next.js (static export)
- **Language**: TypeScript
- **Styling**: CSS modules + custom design system (`src/styles/kinetic-design-system.css`)
- **Deployment**: Netlify

## Best Practices

1. Run `npm run build` locally before pushing — Netlify will fail if the build breaks
2. Keep large video files out of git (use `.gitignore`; originals stay local only)
3. `FFP/` and `impeccable/` are excluded from builds — don't edit them for marketing-site work
4. Candidate pages (`/locumtenens`, `/earnix`, `/ups`) each have their own `page.css` for brand-specific overrides

---

**Last Updated**: April 2026
