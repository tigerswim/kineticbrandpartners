# Kinetic Brand Partners - Marketing Site

The official marketing website for Kinetic Brand Partners, showcasing our services, team, and approach to brand development and marketing strategy.

## Overview

This is a Next.js-based marketing website featuring modern design, responsive layouts, and optimized performance for fast load times and excellent user experience.

## Technology Stack

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Testing**: Cypress (E2E testing configured)
- **Deployment**: Netlify

## Project Structure

```
marketing-site/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   └── __tests__/        # Test files
├── cypress/              # E2E tests
├── public/               # Static assets
└── out/                  # Build output
```

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run cypress:open` - Open Cypress test runner

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
