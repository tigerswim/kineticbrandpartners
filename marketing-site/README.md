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

This project is part of the kineticbrandpartners monorepo.

1. **Navigate to the project**
   ```bash
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

1. Connected to GitHub repository: `https://github.com/tigerswim/kineticbrandpartners.git`
2. Build command: `npm run build`
3. Publish directory: `out/`
4. Automatic deployment on push to main branch

## Repository

- **Git Remote**: `https://github.com/tigerswim/kineticbrandpartners.git`
- **Part of**: kineticbrandpartners monorepo

## License

This project is private and proprietary. All rights reserved.
