# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional marketing consultant website for Kinetic Brand Partners. The project uses a hybrid Next.js architecture with both App Router (`marketing-site/src/app/`) and Pages Router (`marketing-site/src/pages/`) patterns. The main application is built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Project Structure

```
marketing-site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Homepage
│   │   └── success.tsx         # Success page
│   ├── components/             # React components
│   │   └── PersonalSite.tsx    # Main site component
│   ├── pages/                  # Next.js Pages Router
│   │   ├── _app.tsx            # Custom App component
│   │   ├── about.tsx           # About page
│   │   ├── contact.tsx         # Contact page
│   │   ├── leadership.tsx      # Leadership page
│   │   └── portfolio.tsx       # Portfolio page
│   └── styles/
│       └── globals.css         # Global styles with Tailwind
tests/                          # Test files (root level)
cypress/                        # E2E tests
```

## Development Commands

### Core Development
```bash
cd marketing-site
npm run dev          # Start development server with Turbopack
npm run build        # Build for production (static export)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing Commands
```bash
# Unit Tests
npm run test              # Run Jest tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run with coverage (70% threshold)

# E2E Tests
npm run test:e2e          # Run Cypress tests headless
npm run test:e2e:open     # Open Cypress UI
npm run test:playwright   # Run Playwright tests
npm run test:playwright:ui # Open Playwright UI

# All Tests
npm run test:all          # Run all test suites
npm run test:ci           # CI/CD test suite with coverage
```

## Architecture & Patterns

### Next.js Configuration
- **Static Export**: Configured with `output: 'export'` for static site generation
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility
- **Trailing Slash**: Enabled for consistent routing
- **Turbopack**: Used in development for faster builds

### Routing Strategy
The project uses a **hybrid routing approach**:
- **App Router** (`src/app/`): Used for main pages with enhanced SEO metadata
- **Pages Router** (`src/pages/`): Used for additional pages and existing components

### Component Architecture
- **Main Component**: `PersonalSite.tsx` handles the core site functionality
- **Intersection Observer**: Used for scroll-based section highlighting
- **Mobile Navigation**: Responsive design with mobile menu toggle
- **Font Loading**: Optimized with Next.js `next/font` for Inter and Merriweather

### Styling Approach
- **Tailwind CSS 4**: Latest version with PostCSS integration
- **CSS Modules**: Supported through Next.js
- **Global Styles**: Located in `src/styles/globals.css`
- **Font Variables**: CSS custom properties for consistent typography

### SEO & Performance
- **Comprehensive Metadata**: OpenGraph, Twitter Cards, and structured data
- **Font Optimization**: `display: 'swap'` for performance
- **Accessibility**: WCAG 2.1 AA compliance requirements
- **Performance**: Target Lighthouse scores of 95+ across all categories

## Testing Strategy

### Coverage Requirements
- All test suites require **70% coverage** across:
  - Branches: 70%
  - Functions: 70%
  - Lines: 70%
  - Statements: 70%

### Testing Stack
- **Jest + React Testing Library**: Unit and component tests
- **Cypress**: Visual E2E testing with interactive UI
- **Playwright**: Cross-browser E2E testing
- **Coverage**: Comprehensive reporting with HTML output

### Test File Locations
- **Unit Tests**: `src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}`
- **Component Tests**: Co-located with components
- **E2E Tests**: `tests/e2e/` (Playwright) and `cypress/e2e/` (Cypress)

## Code Standards

### TypeScript Configuration
- Strict mode enabled
- Latest TypeScript version (5.x)
- Path aliases: `@/` maps to `src/`

### Code Style (from .cursorrules)
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Pages**: kebab-case (e.g., `about-us.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **CSS Modules**: camelCase (e.g., `heroSection.module.css`)

### Marketing-Specific Requirements
- **Conversion-focused**: Clear CTAs and lead capture forms
- **SEO optimized**: Semantic HTML, proper heading hierarchy, meta tags
- **Performance**: Fast loading times (<3 seconds)
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile-first**: Responsive design approach
- **Analytics ready**: GA4 and conversion tracking setup

## Dependencies & Tech Stack

### Core Dependencies
- **Next.js 15.3.4**: React framework with App/Pages Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type safety and developer experience
- **Tailwind CSS 4**: Utility-first styling framework
- **Lucide React**: Icon library

### Development Tools
- **ESLint**: Code linting with Next.js config
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Cypress**: E2E testing with visual feedback
- **Playwright**: Cross-browser E2E testing

## Professional Marketing Context

This website serves a **B2B marketing consultant** and must reflect:
- **Trust and Credibility**: Professional design and content
- **Conversion Optimization**: Lead capture and user journey optimization  
- **SEO Performance**: Search visibility and content marketing
- **Performance**: Fast loading for user experience and search rankings
- **Accessibility**: Inclusive design for all users
- **Analytics**: Data-driven optimization capabilities

## Pre-deployment Checklist

Before any deployment or major changes:
1. Run full test suite: `npm run test:ci`
2. Verify build success: `npm run build`
3. Check accessibility compliance
4. Validate SEO meta tags and structured data
5. Test cross-browser compatibility
6. Verify mobile responsiveness
7. Check performance metrics (Lighthouse audit)