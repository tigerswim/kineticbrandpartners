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
- **Framework**: Next.js 15.5.6 with App Router
- **Styling**: Custom CSS with dynamic gradients, glassmorphism effects, and animations
- **Language**: TypeScript with strict mode
- **Deployment**: Netlify (static export via `output: 'export'`)

### Build Configuration
- **Static Export**: `next.config.js` configured with `output: 'export'` for Netlify deployment
- **Images**: Unoptimized for static export compatibility
- **Path Aliases**: `@/*` maps to `./src/*` (configured in tsconfig.json)
- **Webpack**: Optimized file watching for macOS (native watching, not polling)
- **TypeScript**: Incremental compilation disabled for better memory efficiency

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and GTM
│   ├── page.tsx            # Home/portfolio page
│   ├── work/
│   │   └── page.tsx        # Marketing campaign portfolio
│   ├── resume/
│   │   └── page.tsx        # Full resume page
│   └── globals.css         # Global styles (clean, single design system)
public/
├── logos/                  # Company and education logos (PNG/JPG only)
│   ├── kinetic-brand-partners.png
│   ├── manhattan-associates.jpg
│   ├── uva-darden.png
│   └── clemson.png
├── images/                 # Portfolio images
├── Videos/                 # Marketing campaign videos (~88MB)
└── Dan-Hoeller-Resume.pdf
```

**Note**: Components directory removed (2026-01) - all layouts built inline for simplicity.

### Key Patterns
- **Multi-Page Portfolio**: Personal marketing site for Dan Hoeller
- **Clean Editorial Design**: Minimal styling with focus on typography and whitespace
- **Inline Layouts**: All page structures built inline (no shared component abstractions)
- **Logo Integration**: Company and education logos displayed with consistent treatment
- **Brand Colors**: Navy (#1a365d) to Teal (#0d9488) gradient from logo

## Site Structure

### Pages

#### Home Page (/)
1. **Hero** - Name, location, professional summary with dual CTAs
2. **What I Bring** - 2x3 grid of capability cards
3. **Background** - Work experience with company logos
   - Central Garden & Pet (11 years)
   - Johnson & Johnson (7 years)
   - Manhattan Associates (5 years)
4. **Education** - MBA and undergrad with university logos
5. **Contact** - Simple contact section

#### Work Page (/work)
- Marketing campaign portfolio with videos and case studies
- Featured campaigns: Thanks Mom, Green Frog, Flea & Tick Terminator
- Video embeds with poster images (~88MB total)

#### Resume Page (/resume)
- Full professional resume
- Downloadable PDF version available

### Navigation
- Minimal header with logo, Work link, Resume link, LinkedIn, Contact anchor
- Mobile-responsive layout
- Consistent navigation across all pages

### Contact Information
- **Primary**: letstalk@kineticbrandpartners.com
- **LinkedIn**: linkedin.com/in/danhoeller
- **Resume**: PDF download available in header

## Content Guidelines

### Brand Voice
- Professional but approachable
- Focus on experience and capabilities
- Quantitative achievements included (team size, P&L scale, results)
- Clear value proposition for consulting/fractional leadership

## Deployment

Netlify configuration in `netlify.toml`:
- Base directory: `marketing-site` (set in Netlify dashboard)
- Build command: `npm run build`
- Publish directory: `marketing-site/out`
- Node version: 20

Static export generates files in `out/` directory.

## Performance Optimizations (2025-11)

The following optimizations have been implemented to reduce CPU and memory usage during development:
- **Native file watching**: Optimized webpack watchOptions for macOS (ignores node_modules, .git, .next, out)
- **Disabled incremental compilation**: Prevents TypeScript memory accumulation during development
- **Next.js 15.5.6**: Latest version with memory leak fixes and performance improvements

**Expected dev server performance:**
- CPU: 5-10% idle, 20-30% during file edits
- Memory: 200-400 MB (significantly reduced from previous versions)

## Code Cleanup & Refactoring (2026-01)

**Major refactoring completed** to eliminate unused code and optimize repository size:

**Removed:**
- 8 unused component files (~66KB): Header, Footer, PersonalSite, ContactCTA, GridCard, ServiceCard, ProcessTimeline
- 6 CSS variant files (~74KB): Historical design iterations
- 11 unused images (~24MB): Service category images, sketches, workspace photos
- 4 duplicate/unused logos: SVG duplicates, square variants
- 1 orphaned test file with no corresponding utility
- Untracked /Ignore/ folder

**Impact:**
- Reduced repository size by ~24.4MB
- Removed 140KB of unused source code
- Simplified maintenance with zero dead code
- All builds verified successful post-cleanup

**Current state:** Clean, minimal codebase with only actively used files.
