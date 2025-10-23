# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# From marketing-site/ directory
npm run dev      # Start dev server on port 3000
npm run build    # Build static export to out/
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # Check TypeScript errors
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Custom CSS with dynamic gradients, glassmorphism effects, and animations
- **Language**: TypeScript with strict mode
- **Deployment**: Netlify (static export via `output: 'export'`)

### Build Configuration
- **Static Export**: `next.config.js` configured with `output: 'export'` for Netlify deployment
- **Images**: Unoptimized for static export compatibility
- **Path Aliases**: `@/*` maps to `./src/*` (configured in tsconfig.json)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (client component)
│   └── globals.css         # Global styles with custom CSS
├── components/
│   └── PersonalSite.tsx    # Main site component
public/
└── images/                 # Professional photography
    ├── about-workspace.jpg
    ├── service-strategy.jpg
    ├── service-brand.jpg
    ├── service-growth.jpg
    └── service-digital.jpg
```

### Key Patterns
- **Client Components**: Main application uses `"use client"` directive in page.tsx
- **Metadata**: Defined in layout.tsx for SEO
- **Component Architecture**: Single main component (PersonalSite) renders all sections
- **Hydration**: `suppressHydrationWarning={true}` in layout to handle client-side rendering
- **Image Assets**: Professional photography in `/public/images/` directory
- **Scroll Animations**: Intersection Observer for active section tracking

## Site Structure

### Sections
1. **Hero** - Animated gradient background with value proposition
2. **Services** - Four service cards with top-banner images (240px height)
3. **About** - Workspace image + narrative text layout
4. **Contact** - Single centered box with dual CTAs

### Navigation
- Fixed header with glassmorphism effect
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Four main sections: Home, Services, About, Contact

## Content Guidelines

### Brand Voice
- Focus on **capabilities** not achievements
- No specific metrics, company names, or campaign references
- Professional, consultative tone
- Emphasis on strategic value delivery

### Image Management
- All images in `/public/images/` directory
- Service cards use 240px height top-banner style
- About section uses horizontal layout (image left, text right)
- Images from Unsplash should be professionally curated

## Deployment

Netlify configuration in `netlify.toml`:
- Base directory: `marketing-site` (set in Netlify dashboard)
- Build command: `npm run build`
- Publish directory: `marketing-site/out`
- Node version: 20

Static export generates files in `out/` directory.
