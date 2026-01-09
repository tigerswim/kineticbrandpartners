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
- **Styling**: Kinetic Design System - Custom CSS with dynamic gradients, glassmorphism effects, and animations
- **Icons**: React Feather (lightweight icon library)
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
│   ├── page.tsx            # Home/portfolio page (Kinetic Design System)
│   ├── work/
│   │   └── page.tsx        # Marketing campaign portfolio
│   ├── resume/
│   │   └── page.tsx        # Full resume page
│   └── globals.css         # Global base styles
├── styles/                 # Kinetic Design System
│   ├── kinetic-design-system.css  # Core: variables, animations, components
│   ├── mockup-b.css        # Homepage-specific styles
│   ├── work.css            # Work page styles
│   └── resume.css          # Resume page styles
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
- **Kinetic Design System**: Unified design language with glassmorphism effects, animated gradient mesh backgrounds, and consistent components
- **Inline Layouts**: All page structures built inline (no shared component abstractions)
- **Logo Integration**: Company and education logos displayed with consistent treatment (180x45px)
- **Brand Colors**: Navy (#1a365d) to Teal (#0d9488) gradient from logo
- **Standardized Navigation**: All pages use identical header structure (Work, Resume, LinkedIn, Contact)

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

## Design System

### Kinetic Design System (2026-01)

**Architecture:**
- **Core System** (`kinetic-design-system.css` - 12KB): CSS variables, animations, base components, glassmorphism effects
- **Page-Specific Styles**: Homepage (`mockup-b.css` - 6.4KB), Work (`work.css` - 5KB), Resume (`resume.css` - 6KB)

**Key Features:**
- **Animated Gradient Mesh**: Background with three animated gradient blobs (navy, teal, purple)
- **Glassmorphism**: Frosted glass effects on header, footer, cards, and CTAs
- **Typography**: System font stack optimized for readability
- **Responsive Grid**: Flexible layouts that adapt from mobile to desktop
- **Icon Integration**: React Feather icons for visual hierarchy and clarity
- **Consistent Components**: Standardized buttons, cards, sections across all pages

**Design Tokens:**
- Colors: Navy (#1a365d), Teal (#0d9488), Purple (#7c3aed), Gray scale
- Spacing: 8px base unit (0.5rem to 8rem scale)
- Border Radius: 16px standard, 24px for large cards
- Shadows: Layered shadows for depth (sm, md, lg, xl)
- Transitions: 200-400ms cubic-bezier easing

**Component Classes:**
- `.kinetic-header` - Glassmorphic navigation header
- `.kinetic-footer` - Minimal footer with links
- `.kinetic-hero` - Hero sections with gradient titles
- `.kinetic-section` - Content sections with consistent padding
- `.kinetic-card` - Glassmorphic cards with hover effects
- `.kinetic-btn-*` - Primary, secondary, and outline buttons
- `.gradient-mesh` - Animated background gradient

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

## Design System Implementation (2026-01)

**New Kinetic Design System launched** with unified visual language across all pages:

**Added:**
- Kinetic Design System CSS architecture (`src/styles/` - 29.4KB total)
  - `kinetic-design-system.css` - Core system with variables, animations, components
  - `mockup-b.css` - Homepage-specific styles
  - `work.css` - Work page styles
  - `resume.css` - Resume page styles
- React Feather icon library dependency
- Animated gradient mesh backgrounds
- Glassmorphism UI components

**Updated:**
- All three production pages (`page.tsx`, `work/page.tsx`, `resume/page.tsx`)
- Standardized headers across all pages (180x45px logo, consistent navigation)
- Tightened section spacing on resume page for better readability

**Impact:**
- Professional, modern design system with consistent branding
- Improved visual hierarchy and user experience
- Mobile-responsive layouts across all pages
- Reduced need for custom CSS with reusable component classes
