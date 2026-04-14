# Kinetic Brand Partners — Marketing Website

The official marketing website for Kinetic Brand Partners, built with Next.js and deployed via Netlify.

**Live site**: [kineticbrandpartners.com](https://kineticbrandpartners.com)
**Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`

---

## Tech Stack

- **Framework**: Next.js (static export)
- **Language**: TypeScript
- **Styling**: Custom CSS design system
- **Deployment**: Netlify

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # Production build
npm run lint      # Linter
npx tsc --noEmit  # Type check
```

---

## Repository Structure

```
├── src/
│   ├── app/                  # Pages and routes
│   │   ├── page.tsx          # Home (/)
│   │   ├── about/            # /about
│   │   ├── work/             # /work
│   │   ├── resume/           # /resume
│   │   ├── locumtenens/      # /locumtenens (candidate page)
│   │   ├── earnix/           # /earnix (candidate page)
│   │   └── ups/              # /ups (candidate page)
│   ├── components/           # Shared components
│   └── styles/               # Global styles and design system
├── public/                   # Static assets
│   ├── images/               # Photos and illustrations
│   ├── Videos/               # Campaign videos
│   ├── logos/                # Brand logos
│   └── locumtenens/          # LT-specific assets
├── package.json
├── next.config.js
├── tsconfig.json
└── netlify.toml
```

---

## Deployment

Pushes to `main` auto-deploy to Netlify.

**Netlify settings:**
| Setting | Value |
|---|---|
| Base directory | *(blank — repo root)* |
| Build command | `npm run build` |
| Publish directory | `out` |
| Node version | 20 |

---

## Notes

- `FFP/` and `impeccable/` are separate projects nested here for local convenience. They are excluded from the TypeScript build and should not be modified as part of marketing-site work.
- Large video originals (`public/Videos/originals-backup/`) and `.mov`/`.mpg` files are gitignored — keep them local only.

---

**Last Updated**: April 2026
