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
│   │   └── globals.css   # Global styles
│   └── components/       # React components
│       └── PersonalSite.tsx  # Main site component
├── public/
│   └── images/           # Professional photography
│       ├── about-workspace.jpg
│       ├── service-strategy.jpg
│       ├── service-brand.jpg
│       ├── service-growth.jpg
│       └── service-digital.jpg
└── out/                  # Build output (static export)
```

## Site Sections

1. **Hero** - Dynamic gradient background with core value proposition
2. **Services** - Four service categories with top-banner image cards:
   - Strategic Planning & GTM Strategy
   - Brand Development
   - Growth & Performance
   - Digital Transformation & MarTech
3. **About** - Professional workspace imagery with leadership philosophy
4. **Contact** - Comprehensive marketing assessment CTA and direct contact

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

The site focuses on **capabilities over achievements**:
- No specific metrics, company names, or campaign references
- Emphasis on strategic consulting services
- Professional, consultative tone
- Clear service categorization aligned with core competencies

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
