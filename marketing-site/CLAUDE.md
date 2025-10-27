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
│   ├── page.tsx            # Home/landing page
│   ├── consumer/
│   │   ├── layout.tsx      # Consumer Brands metadata
│   │   └── page.tsx        # Consumer Brands page
│   ├── b2b/
│   │   ├── layout.tsx      # B2B Brands metadata
│   │   └── page.tsx        # B2B Brands page
│   └── globals.css         # Global styles with custom CSS
├── components/
│   ├── Header.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   ├── ProcessTimeline.tsx # 3-step timeline visual
│   ├── ContactCTA.tsx      # Contact section with dual emails
│   ├── ServiceCard.tsx     # Landing page service cards
│   └── GridCard.tsx        # 2x2 grid cards with hover effects
```

### Key Patterns
- **Client Components**: All pages use `"use client"` directive
- **Metadata**: Defined in separate layout.tsx files (server components) for each route
- **Multi-Page Architecture**: Landing page with separate Consumer Brands and B2B Brands pages
- **Reusable Components**: Shared Header, Footer, ContactCTA, ProcessTimeline, GridCard
- **Glassmorphism Design**: Subtle borders, backdrop blur, hover effects
- **Brand Colors**: Blue (#3b82f6), Orange (#f97316), Red (#ef4444)

## Site Structure

### Pages
1. **Home (/)** - Landing page with hero, value props, service split, contact
2. **Consumer Brands (/consumer)** - Consumer brand services and expertise
3. **B2B Brands (/b2b)** - B2B brand services and expertise

### Navigation
- Fixed header with glassmorphism effect
- Three main pages: Home, Consumer Brands, B2B Brands
- Mobile-responsive hamburger menu
- Active page state tracking

### Contact Information
- **Scheduling diagnostics**: assessment@kineticbrandpartners.com
- **General inquiries**: letstalk@kineticbrandpartners.com
- ContactCTA component handles both emails automatically

## Content Guidelines

### Brand Voice
- Focus on **capabilities** not achievements
- No specific metrics, company names, or campaign references
- Professional, consultative tone
- Emphasis on strategic value delivery

### Component Guidelines
- **GridCard**: Used for 2x2 grid sections with title and description props
- **ProcessTimeline**: 3-step visual with variant prop ('consumer' | 'b2b')
- **ContactCTA**: Dual email support - emailAddress for CTA button, directEmailAddress for general contact
- **ServiceCard**: Landing page cards with colorScheme prop ('consumer' | 'b2b')

## Deployment

Netlify configuration in `netlify.toml`:
- Base directory: `marketing-site` (set in Netlify dashboard)
- Build command: `npm run build`
- Publish directory: `marketing-site/out`
- Node version: 20

Static export generates files in `out/` directory.
