# FFP Website Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 6-page Next.js site for Future Forward Partners with a modern SaaS-inspired dark aesthetic and conversion-optimized architecture.

**Architecture:** Next.js 14+ App Router with TypeScript and Tailwind CSS. Static site exported to Netlify. Content in code (case studies as MDX). Calendly embed for scheduling, Netlify Forms for contact.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS 3, @next/mdx, Geist font, Netlify deployment

---

## Task 1: Project Scaffolding

**Files:**
- Create: `FFP/package.json`
- Create: `FFP/tsconfig.json`
- Create: `FFP/next.config.ts`
- Create: `FFP/tailwind.config.ts`
- Create: `FFP/postcss.config.mjs`
- Create: `FFP/src/app/layout.tsx`
- Create: `FFP/src/app/page.tsx`
- Create: `FFP/src/app/globals.css`
- Create: `FFP/.gitignore`

**Step 1: Initialize Next.js project**

Run from `FFP/`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --no-turbopack
```

If it complains directory is not empty, run with `--yes` or create in a temp dir and move. Accept defaults.

Expected: Project scaffolded with App Router, TypeScript, Tailwind.

**Step 2: Install additional dependencies**

```bash
npm install geist
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running on localhost:3000, default Next.js page renders.

**Step 4: Commit**

```bash
git add FFP/
git commit -m "feat: scaffold Next.js project for FFP website"
```

---

## Task 2: Design System — Tailwind Config & Global Styles

**Files:**
- Modify: `FFP/tailwind.config.ts`
- Modify: `FFP/src/app/globals.css`
- Modify: `FFP/src/app/layout.tsx`

**Step 1: Configure Tailwind with custom design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          surface: "#161616",
          "surface-alt": "#0F0F0F",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1A1",
          muted: "#666666",
        },
        accent: "#EB6636",
        border: "#222222",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Set up global styles**

Replace `globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg-primary text-text-secondary antialiased;
  }

  h1, h2, h3, h4 {
    @apply text-text-primary font-bold tracking-tighter;
  }

  h1 {
    @apply text-5xl md:text-6xl lg:text-7xl;
  }

  h2 {
    @apply text-3xl md:text-4xl;
  }

  h3 {
    @apply text-xl md:text-2xl;
  }
}
```

**Step 3: Configure root layout with Geist font**

Replace `layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Future Forward Partners — Product Strategy, Management & AI",
  description:
    "Senior product strategy, management, and AI talent embedded in your team to deliver outcomes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

**Step 4: Replace default page with placeholder**

Replace `page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1>Future Forward Partners</h1>
    </main>
  );
}
```

**Step 5: Verify**

```bash
npm run dev
```

Expected: Dark background (#0A0A0A), white heading in Geist font, centered on screen.

**Step 6: Commit**

```bash
git add FFP/
git commit -m "feat: configure design system — Tailwind tokens, Geist font, global styles"
```

---

## Task 3: Shared Components — Button, Section, Card

**Files:**
- Create: `FFP/src/components/button.tsx`
- Create: `FFP/src/components/section.tsx`
- Create: `FFP/src/components/card.tsx`

**Step 1: Build Button component**

```tsx
// src/components/button.tsx
import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-medium transition-colors";
  const variants = {
    primary:
      "bg-accent text-white px-6 py-3 rounded hover:bg-accent/90",
    secondary:
      "border border-text-primary/20 text-text-primary px-6 py-3 rounded hover:border-text-primary/40",
    text: "text-accent hover:text-accent/80",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "text" && <span aria-hidden="true">&rarr;</span>}
    </Link>
  );
}
```

**Step 2: Build Section component**

```tsx
// src/components/section.tsx
type SectionProps = {
  children: React.ReactNode;
  bg?: "primary" | "surface" | "surface-alt";
  className?: string;
  id?: string;
};

export function Section({
  children,
  bg = "primary",
  className = "",
  id,
}: SectionProps) {
  const bgMap = {
    primary: "bg-bg-primary",
    surface: "bg-bg-surface",
    "surface-alt": "bg-bg-surface-alt",
  };

  return (
    <section id={id} className={`${bgMap[bg]} py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-content px-6">{children}</div>
    </section>
  );
}
```

**Step 3: Build Card component**

```tsx
// src/components/card.tsx
type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-bg-surface border border-border rounded p-6 ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 4: Verify — import all three into page.tsx and render**

Temporarily update `page.tsx`:

```tsx
import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { Card } from "@/components/card";

export default function Home() {
  return (
    <main>
      <Section>
        <h1>Future Forward Partners</h1>
        <div className="mt-8 flex gap-4">
          <Button href="/contact">Book a Call</Button>
          <Button href="/case-studies" variant="secondary">Case Studies</Button>
        </div>
      </Section>
      <Section bg="surface-alt">
        <Card>
          <h3>Test Card</h3>
          <p className="mt-2">Card content renders correctly.</p>
          <Button href="/services" variant="text" className="mt-4">Learn more</Button>
        </Card>
      </Section>
    </main>
  );
}
```

Expected: Two sections with different backgrounds, orange primary button, outline secondary button, card with surface background and border, text link with arrow.

**Step 5: Commit**

```bash
git add FFP/src/components/
git commit -m "feat: add Button, Section, Card shared components"
```

---

## Task 4: Header & Footer Components

**Files:**
- Create: `FFP/src/components/header.tsx`
- Create: `FFP/src/components/footer.tsx`
- Modify: `FFP/src/app/layout.tsx`

**Step 1: Build Header**

```tsx
// src/components/header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/talent", label: "Talent" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-bg-primary/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-content px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-text-primary font-bold text-lg">
          FFP
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="text-sm">
            Book a Call
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-bg-primary border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="w-fit">
            Book a Call
          </Button>
        </nav>
      )}
    </header>
  );
}
```

**Step 2: Build Footer**

```tsx
// src/components/footer.tsx
import Link from "next/link";
import { Button } from "./button";

const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/talent", label: "Talent" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#strategic-assessments", label: "Strategic Assessments" },
  { href: "/services#product-market-fit", label: "Product Market Fit & GTM" },
  { href: "/services#product-delivery", label: "Product Delivery" },
  { href: "/services#project-rollouts", label: "Project Rollouts" },
  { href: "/services#ai-implementation", label: "AI & Modernization" },
];

export function Footer() {
  return (
    <footer className="bg-bg-surface-alt border-t border-border">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="mailto:jeff@futureforwardpartners.com"
                  className="hover:text-text-secondary transition-colors"
                >
                  jeff@futureforwardpartners.com
                </a>
              </li>
              <li>Atlanta, Georgia</li>
              <li>
                <a
                  href="https://www.linkedin.com/company/future-forward-partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-secondary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-bold mb-4">Ready to move forward?</h4>
            <p className="text-text-muted text-sm mb-4">
              Book a free strategy session.
            </p>
            <Button href="/contact" variant="text">
              Let&apos;s talk
            </Button>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border text-text-muted text-xs">
          &copy; {new Date().getFullYear()} Future Forward Partners. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Add Header and Footer to root layout**

Update `layout.tsx` — wrap `{children}` with Header above and Footer below. Add `pt-16` to a `<main>` wrapper to offset the fixed header.

```tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// ... existing imports and metadata ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: Sticky header transparent at top, gains backdrop on scroll. Nav links visible on desktop, hamburger on mobile. Footer with 4 columns. All links present.

**Step 5: Commit**

```bash
git add FFP/src/components/header.tsx FFP/src/components/footer.tsx FFP/src/app/layout.tsx
git commit -m "feat: add Header and Footer with responsive nav"
```

---

## Task 5: Homepage — All Sections

**Files:**
- Modify: `FFP/src/app/page.tsx`
- Create: `FFP/src/components/cta-section.tsx`

**Step 1: Build reusable CTA section**

This is used at the bottom of every page, so make it a component.

```tsx
// src/components/cta-section.tsx
import { Section } from "./section";
import { Button } from "./button";

export function CtaSection() {
  return (
    <Section bg="surface-alt">
      <div className="text-center">
        <h2>Ready to move forward?</h2>
        <p className="mt-4 text-lg">
          Book a free 30-minute strategy session.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button href="/contact">Book a Call</Button>
          <Button href="/contact#form" variant="secondary">
            Send a Message
          </Button>
        </div>
      </div>
    </Section>
  );
}
```

**Step 2: Build complete homepage**

Replace `page.tsx` with the full homepage implementing all 8 sections from the design doc:

1. Hero (80vh, headline, subhead, 2 buttons, proof line)
2. Services Preview (3 cards in a row)
3. Social Proof Bar (testimonial quote — use quote until logos are provided)
4. Case Study Highlight (wide card, metric + quote)
5. Why FFP / Differentiators (3 value props, vertical stack)
6. CTA Section (shared component)

Header and Footer come from layout.

The homepage should contain all content inline — no data fetching needed. Use the exact copy from the design document. Services preview cards link to `/services`. Case study highlight links to `/case-studies/kms-technologies` (or first slug). "Book a Strategy Call" links to `/contact`. "View Case Studies" links to `/case-studies`.

**Step 3: Verify**

```bash
npm run dev
```

Expected: Full homepage with all sections rendering. Dark background, orange CTAs, proper typography hierarchy, responsive layout. Scroll through all sections.

**Step 4: Commit**

```bash
git add FFP/src/app/page.tsx FFP/src/components/cta-section.tsx
git commit -m "feat: build complete homepage with all sections"
```

---

## Task 6: Services Page

**Files:**
- Create: `FFP/src/app/services/page.tsx`

**Step 1: Build Services page**

Implement the services page with:
- Page hero (title + subhead)
- 5 service sections stacked vertically, alternating `bg-primary` / `bg-surface-alt`
- Each section: title, "Who it's for", bullet points, result callout, CTA link to `/contact?service=<name>`
- Engagement process flow at bottom (Discovery → Strategy → Execution → Handoff)
- CtaSection at bottom

Add `id` attributes to each service section for anchor links from the footer (e.g., `id="strategic-assessments"`).

Use the exact service descriptions from the design document.

**Step 2: Add metadata**

```tsx
export const metadata = {
  title: "Services — Future Forward Partners",
  description: "Product strategy, delivery, and AI implementation services for your business.",
};
```

**Step 3: Verify**

```bash
npm run dev
```

Navigate to `/services`. Expected: All 5 service sections render with correct content, alternating backgrounds, engagement process flow, CTA at bottom.

**Step 4: Commit**

```bash
git add FFP/src/app/services/
git commit -m "feat: build Services page with 5 service categories"
```

---

## Task 7: Talent Page

**Files:**
- Create: `FFP/src/app/talent/page.tsx`

**Step 1: Build Talent page**

Implement:
- Page hero (title + subhead)
- Engagement Models section (3 columns: Fractional, Project-Based, Staff Augmentation)
- Roles grid (2-column, 8 role cards with title, pitch, capabilities, anonymized profile)
- Comparison section (FFP Talent vs. Full-Time Hire table)
- CtaSection with custom text: "Tell us what role you need"

Use the exact role descriptions and comparison data from the design document.

**Step 2: Add metadata**

```tsx
export const metadata = {
  title: "Talent — Future Forward Partners",
  description: "Senior product and technology professionals ready to embed with your team.",
};
```

**Step 3: Verify**

Navigate to `/talent`. Expected: Engagement models in 3 columns, 8 role cards in 2-column grid, comparison table, CTA.

**Step 4: Commit**

```bash
git add FFP/src/app/talent/
git commit -m "feat: build Talent page with roles and engagement models"
```

---

## Task 8: Case Studies — Data & Listing Page

**Files:**
- Create: `FFP/src/data/case-studies.ts`
- Create: `FFP/src/app/case-studies/page.tsx`

**Step 1: Create case study data**

```typescript
// src/data/case-studies.ts
export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  metric: string;
  summary: string;
  quote: string;
  quoteAuthor: string;
  quoteTitle: string;
  challenge: string;
  approach: string;
  results: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kms-technologies",
    title: "MVP to Market in 90 Days",
    client: "KMS Technologies",
    industry: "Healthcare",
    metric: "90 days",
    summary: "Built and launched a minimum viable product in under three months.",
    quote: "Future Forward's product and project management experience enabled us to quickly build a minimum viable product.",
    quoteAuthor: "Chief Delivery Officer",
    quoteTitle: "KMS Technologies",
    challenge: "KMS Technologies needed to rapidly validate a new product concept in the healthcare space. Internal teams were stretched across existing commitments, and the window to enter the market was closing.",
    approach: "Future Forward embedded a senior product manager and project lead with the KMS team. We defined the MVP scope, established sprint cadence, and drove execution from concept to launch.",
    results: "The MVP launched in under 90 days, enabling KMS to validate market fit and begin customer acquisition ahead of their projected timeline.",
  },
  {
    slug: "elemica",
    title: "AI Platform Go-to-Market Strategy",
    client: "Elemica",
    industry: "Supply Chain",
    metric: "New market entry",
    summary: "Defined and executed a go-to-market strategy for an AI-driven supply chain platform.",
    quote: "The team brought clarity to a complex market entry and helped us position our AI capabilities effectively.",
    quoteAuthor: "Chief Innovation Officer",
    quoteTitle: "Elemica",
    challenge: "Elemica had built significant AI capabilities for supply chain optimization but lacked a clear go-to-market strategy to position and sell these new offerings.",
    approach: "Future Forward conducted competitive analysis, defined target segments, and built a GTM playbook covering positioning, pricing, and sales enablement.",
    results: "Elemica entered the AI supply chain market with a differentiated position and a clear path to revenue from their new platform capabilities.",
  },
  {
    slug: "global-transportation",
    title: "Enterprise Platform Modernization",
    client: "Global Transportation Company",
    industry: "Logistics",
    metric: "Platform modernized",
    summary: "Led the modernization of a legacy transportation management platform.",
    quote: "They understood our technical challenges and delivered a modernization roadmap we could actually execute.",
    quoteAuthor: "VP of Technology",
    quoteTitle: "Global Transportation Company",
    challenge: "A major transportation company was running critical operations on aging technology that couldn't scale with demand or integrate with modern partner systems.",
    approach: "Future Forward assessed the existing platform, identified modernization priorities, and led the phased migration to a modern architecture while maintaining business continuity.",
    results: "The company modernized its core platform without operational disruption, enabling new partner integrations and improved scalability.",
  },
  {
    slug: "project-appe",
    title: "AI-Driven Product Management",
    client: "Project Appe",
    industry: "AI / Blockchain",
    metric: "0 to 1 launch",
    summary: "Took an AI-driven product from concept to initial launch.",
    quote: "Future Forward brought the product discipline we needed to turn our AI vision into a shippable product.",
    quoteAuthor: "Founder",
    quoteTitle: "Project Appe",
    challenge: "Project Appe had a compelling AI and blockchain vision but needed structured product management to turn research into a launchable product.",
    approach: "Future Forward provided fractional product leadership, defined the product roadmap, established development processes, and guided the team through their first product launch.",
    results: "Project Appe went from concept to launched product with a clear roadmap for subsequent iterations.",
  },
];
```

**Step 2: Build listing page**

```tsx
// src/app/case-studies/page.tsx
import { Section } from "@/components/section";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { CtaSection } from "@/components/cta-section";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Future Forward Partners",
  description: "Real outcomes for real companies.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Section>
        <h1>Case Studies</h1>
        <p className="mt-4 text-lg">Real outcomes for real companies.</p>
      </Section>
      <Section bg="surface-alt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <Card key={study.slug}>
              <span className="text-xs text-accent font-medium uppercase tracking-wide">
                {study.industry}
              </span>
              <h3 className="mt-3">{study.title}</h3>
              <p className="mt-2 text-sm">{study.summary}</p>
              <p className="mt-4 text-2xl font-bold text-accent">
                {study.metric}
              </p>
              <p className="mt-2 text-xs text-text-muted">
                {study.quoteAuthor}, {study.quoteTitle}
              </p>
              <Button
                href={`/case-studies/${study.slug}`}
                variant="text"
                className="mt-4"
              >
                Read more
              </Button>
            </Card>
          ))}
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
```

**Step 3: Verify**

Navigate to `/case-studies`. Expected: 4 case study cards in 2x2 grid with industry tags, metrics in orange, read more links.

**Step 4: Commit**

```bash
git add FFP/src/data/case-studies.ts FFP/src/app/case-studies/
git commit -m "feat: add case study data and listing page"
```

---

## Task 9: Case Studies — Detail Pages

**Files:**
- Create: `FFP/src/app/case-studies/[slug]/page.tsx`

**Step 1: Build dynamic detail page**

Implement `/case-studies/[slug]` using `generateStaticParams` to pre-render all 4 case studies. The page follows the Problem → Approach → Result framework from the design doc:

1. Header with title, client, industry tag
2. "The Challenge" section
3. "Our Approach" section
4. "The Results" section with metric callout
5. Client quote in styled blockquote
6. CTA: "Facing a similar challenge?"
7. Prev/Next navigation links

Use `generateStaticParams` to return all slugs from the data file. Use `notFound()` from `next/navigation` if slug doesn't match.

Generate dynamic metadata using `generateMetadata`.

**Step 2: Verify**

Navigate to `/case-studies/kms-technologies`. Expected: Full case study detail page with all sections. Click prev/next to navigate between studies.

**Step 3: Commit**

```bash
git add FFP/src/app/case-studies/\[slug\]/
git commit -m "feat: add case study detail pages with prev/next nav"
```

---

## Task 10: About Page

**Files:**
- Create: `FFP/src/app/about/page.tsx`

**Step 1: Build About page**

Implement all sections from design doc:
1. Opening statement (large type, 2-3 sentences)
2. Jeff Gantt section (name, title, bio reframed as credibility argument, career highlights, LinkedIn link — placeholder for photo)
3. How We Work (4-step process: Understand → Strategize → Execute → Transition)
4. Network statement paragraph
5. CtaSection

Use the exact copy from the design document. For Jeff's photo, use a placeholder `<div>` with initials "JG" styled as a circle — to be replaced with actual photo later.

**Step 2: Add metadata**

```tsx
export const metadata: Metadata = {
  title: "About — Future Forward Partners",
  description: "25+ years of product leadership. Operators, not advisors.",
};
```

**Step 3: Verify**

Navigate to `/about`. Expected: All sections render, How We Work shows 4 steps in a row on desktop, photo placeholder visible.

**Step 4: Commit**

```bash
git add FFP/src/app/about/
git commit -m "feat: build About page with bio, methodology, and network"
```

---

## Task 11: Contact Page

**Files:**
- Create: `FFP/src/app/contact/page.tsx`
- Create: `FFP/src/components/contact-form.tsx`

**Step 1: Build contact form component**

```tsx
// src/components/contact-form.tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3>Message sent.</h3>
        <p className="mt-2">We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={() => setSubmitted(true)}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-text-muted mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="block text-sm text-text-muted mb-1"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm text-text-muted mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-accent text-white px-6 py-3 rounded font-medium hover:bg-accent/90 transition-colors w-full"
      >
        Send Message
      </button>
    </form>
  );
}
```

**Step 2: Build Contact page**

Split layout — Calendly on left (placeholder iframe/div until account is set up), contact form on right.

```tsx
// src/app/contact/page.tsx
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Future Forward Partners",
  description: "Book a strategy session or send us a message.",
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Book a Call */}
        <div>
          <h1 className="text-4xl md:text-5xl">Book a Strategy Session</h1>
          <p className="mt-4 text-lg">
            30 minutes. No pitch. Just a conversation about your product
            challenges.
          </p>
          <div className="mt-8 bg-bg-surface border border-border rounded p-8 min-h-[400px] flex items-center justify-center">
            {/* Replace with Calendly embed: */}
            {/* <iframe src="https://calendly.com/YOURLINK" ... /> */}
            <p className="text-text-muted text-sm">
              Calendly scheduling widget will be embedded here.
            </p>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div id="form">
          <h2 className="text-3xl md:text-4xl">Prefer email?</h2>
          <div className="mt-8">
            <ContactForm />
          </div>
          <div className="mt-8 text-sm text-text-muted space-y-1">
            <p>
              <a
                href="mailto:jeff@futureforwardpartners.com"
                className="hover:text-text-secondary transition-colors"
              >
                jeff@futureforwardpartners.com
              </a>
            </p>
            <p>Atlanta, Georgia</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

**Step 3: Verify**

Navigate to `/contact`. Expected: Two-column layout on desktop (Calendly placeholder left, form right), stacked on mobile. Form fields render with dark styling, submit button in orange.

**Step 4: Commit**

```bash
git add FFP/src/app/contact/ FFP/src/components/contact-form.tsx
git commit -m "feat: build Contact page with form and Calendly placeholder"
```

---

## Task 12: SEO & Metadata

**Files:**
- Modify: `FFP/src/app/layout.tsx`
- Create: `FFP/src/app/sitemap.ts`
- Create: `FFP/src/app/robots.ts`
- Create: `FFP/public/favicon.ico` (placeholder)

**Step 1: Add Open Graph and structured metadata to root layout**

Update the root layout `metadata` export with:
- `metadataBase: new URL("https://futureforwardpartners.com")`
- `openGraph` with site name, type, locale
- `twitter` card config

**Step 2: Create sitemap.ts**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://futureforwardpartners.com";

  const staticPages = [
    "", "/services", "/talent", "/case-studies", "/about", "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...caseStudyPages];
}
```

**Step 3: Create robots.ts**

```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://futureforwardpartners.com/sitemap.xml",
  };
}
```

**Step 4: Verify**

```bash
npm run build
```

Expected: Build succeeds. Check that sitemap.xml and robots.txt are in the output.

**Step 5: Commit**

```bash
git add FFP/src/app/sitemap.ts FFP/src/app/robots.ts FFP/src/app/layout.tsx
git commit -m "feat: add SEO — sitemap, robots, Open Graph metadata"
```

---

## Task 13: Netlify Deployment Config

**Files:**
- Create: `FFP/netlify.toml`

**Step 1: Create Netlify config**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Step 2: Verify build**

```bash
cd FFP && npm run build
```

Expected: Build succeeds with no errors. All pages pre-rendered.

**Step 3: Commit**

```bash
git add FFP/netlify.toml
git commit -m "feat: add Netlify deployment configuration"
```

---

## Task 14: Polish & Responsive Verification

**Files:**
- Potentially modify: any component or page files as needed

**Step 1: Run dev server and check every page at 3 breakpoints**

```bash
npm run dev
```

Check in browser at:
- **Desktop (1280px):** All multi-column layouts work, header nav visible, footer 4-column
- **Tablet (768px):** Grids collapse appropriately, spacing adjusts
- **Mobile (375px):** Single column, hamburger menu, stacked contact page, readable text sizes

**Step 2: Fix any layout issues found**

Common things to check:
- Hero text doesn't overflow on mobile
- Cards stack properly
- Footer columns collapse to single column
- Button tap targets are 44px+ on mobile
- No horizontal scroll on any page

**Step 3: Run production build check**

```bash
npm run build && npm run lint
```

Expected: No build errors, no lint errors.

**Step 4: Commit any fixes**

```bash
git add FFP/
git commit -m "fix: responsive layout adjustments and polish"
```

---

## Task 15: Final Build Verification

**Step 1: Clean build**

```bash
cd FFP && rm -rf .next && npm run build
```

Expected: All pages build successfully.

**Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors.

**Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

**Step 4: Tag release**

```bash
git add FFP/
git commit -m "chore: final build verification — all pages complete"
```

---

## Summary

| Task | Description | Estimated Size |
|------|-------------|---------------|
| 1 | Project scaffolding | Small |
| 2 | Design system (Tailwind + fonts) | Small |
| 3 | Button, Section, Card components | Small |
| 4 | Header & Footer | Medium |
| 5 | Homepage (all sections) | Large |
| 6 | Services page | Medium |
| 7 | Talent page | Medium |
| 8 | Case studies data + listing | Medium |
| 9 | Case study detail pages | Medium |
| 10 | About page | Medium |
| 11 | Contact page + form | Medium |
| 12 | SEO & metadata | Small |
| 13 | Netlify config | Small |
| 14 | Responsive polish | Medium |
| 15 | Final verification | Small |

**Total: 15 tasks**
