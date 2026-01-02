# Kinetic Brand Partners - Marketing Site

The official marketing website for Kinetic Brand Partners, showcasing strategic marketing consulting services with a focus on brand development, growth acceleration, and digital transformation.

## Overview

This is a Next.js-based marketing website featuring modern design, responsive layouts, professional photography, and optimized performance for fast load times and excellent user experience.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Custom CSS with dynamic gradients and glassmorphism effects
- **Language**: TypeScript with strict mode
- **Deployment**: Netlify (static export)

## Project Structure

```
marketing-site/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Home page
│   │   ├── work/
│   │   │   └── page.tsx  # Work/portfolio page
│   │   └── globals.css   # Global styles (includes campaign styles)
│   └── components/       # React components
├── public/
│   ├── images/           # Campaign assets & photography
│   │   ├── Gold-shampoo.jpg
│   │   ├── Pink-lotion.jpg
│   │   └── [other assets]
│   ├── Videos/           # Campaign video assets
│   │   ├── FTT-banned-ad.mp4
│   │   ├── FTT-summary-video.mp4
│   │   ├── GFANA_Hero30_MP4.mp4
│   │   ├── GFANA_GARDEN15.mp4
│   │   ├── Thanks-Mom-Cullen.2.mp4
│   │   ├── Thanks-Mom-Debbie.mp4
│   │   └── [poster images]
│   └── logos/            # Brand logos
└── out/                  # Build output (static export)
```

## Site Sections

### Home Page (/)
1. **Hero** - Fractional CMO positioning with dual CTAs
2. **What I Bring** - 2x3 grid of core capabilities
3. **Background** - Work experience with company logos (Central Garden & Pet, Johnson & Johnson, Manhattan Associates)
4. **Education** - MBA and undergraduate credentials with university logos
5. **Contact** - Call-to-action section with email contact

### Work/Portfolio Page (/work)
Showcases award-winning marketing campaigns with problem/solution/results framework:
1. **#FlipTheTurf** - Central Garden & Pet anti-turf campaign (2 videos, results slide)
2. **Grow From a New Angle** - Pennington brand platform campaign (2 videos with custom posters)
3. **Johnson's Baby** - Multi-asset campaign (2 videos stacked vertically, 2 print assets)

## Installation

This project is the primary content of the kineticbrandpartners repository.

1. **Clone the repository**
   ```bash
   git clone https://github.com/tigerswim/kineticbrandpartners.git
   cd kineticbrandpartners/marketing-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (requires configuration)
- `npx tsc --noEmit` - Check TypeScript errors

## Content Strategy

**Home page** focuses on capabilities and experience:
- Professional CMO positioning and background
- Core competencies in brand strategy, leadership, and digital transformation
- Educational credentials and company affiliations

**Work page** showcases measurable campaign impact:
- Award-winning campaigns with concrete results (3.95B+ impressions, Clio awards)
- Problem/Solution/Results narrative framework for each campaign
- Mix of video (with custom poster frames) and static assets
- Demonstrates strategic thinking, creative excellence, and data-driven results

## Deployment

### Netlify (Current Setup)

The site is deployed via Netlify:

1. **Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
2. **Base directory**: `marketing-site`
3. **Build command**: `npm run build`
4. **Publish directory**: `marketing-site/out`
5. **Node version**: 20 (Active LTS)
6. **Automatic deployment** on push to main branch

## Repository

- **Git Remote**: `https://github.com/tigerswim/kineticbrandpartners.git`
- **Structure**: Primary project in repository (marketing-site subdirectory)
- **Related Projects**: job-tracker, RacePrep, sagenet-website are in separate repositories

## License

This project is private and proprietary. All rights reserved.
