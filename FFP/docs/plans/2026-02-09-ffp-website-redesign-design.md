# Future Forward Partners — Website Redesign Design Document

**Date:** 2026-02-09
**Status:** Approved
**Based on:** website-audit-recommendations.md

---

## Project Summary

Full redesign of futureforwardpartners.com as a standalone Next.js site in `FFP/`. The new site replaces the existing WordPress site with a modern, conversion-optimized experience designed to drive consulting engagement bookings.

**Pages:** 6 (Homepage, Services, Talent, Case Studies, About, Contact)
**Style:** Modern SaaS-inspired (Linear/Vercel/Stripe aesthetic)
**Primary conversion:** Book a call (Calendly/Cal.com)
**Secondary conversion:** Contact form

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Netlify
- **Fonts:** Inter or Geist (body), geometric sans for headings
- **Scheduling:** Calendly or Cal.com embed
- **No CMS** — content in code/MDX for case studies

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0A0A0A` | Page background |
| `bg-surface` | `#161616` | Cards, elevated surfaces |
| `bg-surface-alt` | `#0F0F0F` | Alternating section backgrounds |
| `text-primary` | `#FFFFFF` | Headings, primary text |
| `text-secondary` | `#A1A1A1` | Body text, descriptions |
| `text-muted` | `#666666` | Labels, metadata |
| `accent` | `#EB6636` | CTAs, highlights, key metrics |
| `border` | `#222222` | Subtle borders, dividers |

### Typography

- **Headings:** Tight letter-spacing, geometric sans, bold weight
- **Body:** Inter/Geist, regular weight, generous line-height (1.6-1.7)
- **Accent text:** Metrics and callouts in large type with orange accent color
- **No emoji anywhere**

### Design Principles

- No blue-purple gradients or generic AI aesthetics
- No rounded-everything pill shapes — sharp or subtly rounded corners (4-6px max)
- No generic stock illustrations — rely on typography, whitespace, and real content
- No decorative icons — pure type hierarchy
- Gradients only if extremely subtle and functional (e.g., faint dark-to-darker)
- Color used sparingly — orange accent only where it earns attention
- Generous whitespace between sections
- Subtle micro-animations on scroll (fade-in, not bounce/slide)

### Shared Components

- `Header` — Sticky nav, transparent on top, dark backdrop on scroll. Logo left, nav center-right, "Book a Call" orange button far right. Hamburger menu at mobile breakpoint only.
- `Footer` — 4 columns: Company links, Service links, Contact info, mini-CTA. Copyright at bottom.
- `Section` — Reusable full-width section wrapper with configurable background tone.
- `Button` — Primary (solid orange), secondary (ghost/outline white), text link with arrow.
- `Card` — Surface-colored container with subtle border, used for services, talent roles, case studies.

---

## Page Designs

### 1. Homepage (`/`)

**8 sections, top to bottom:**

#### 1.1 Sticky Header
Shared component. Transparent at scroll-top, gains dark backdrop on scroll. Nav links: Services, Talent, Case Studies, About. Far-right: "Book a Call" button (orange, solid).

#### 1.2 Hero Section
- Full-width, ~80vh height
- Large headline, tight-tracked geometric sans, 8-10 words max:
  > "Launch faster. Build smarter. Scale with confidence."
- Subheadline, lighter weight:
  > "Senior product strategy, management, and AI talent — embedded in your team to deliver outcomes, not decks."
- Two buttons: **"Book a Strategy Call"** (primary/orange) + **"View Case Studies"** (ghost/outline)
- Below buttons, subtle proof line: *"Trusted by product leaders at KMS Technologies, Elemica, and more."*
- No hero image — typography is the visual

#### 1.3 Services Preview
- Section heading: *"What we do"* — understated, left-aligned
- Three cards in a row (desktop), each with:
  - Short title (e.g., "Product Strategy", "Product Delivery", "AI Implementation")
  - 2-line description
  - *"Learn more →"* text link
- Cards use `bg-surface` against `bg-primary`

#### 1.4 Social Proof Bar
- Horizontal strip with client logos in grayscale/white treatment
- KMS Technologies, Elemica, others as available
- If fewer than 4 logos: use a single powerful testimonial quote instead, with name and title attribution

#### 1.5 Case Study Highlight
- One featured case study as a wide card
- Left: result metric in large type (e.g., *"MVP launched in 90 days"*), client name, 1-line summary
- Right: client quote in contrasting serif italic
- *"Read the full story →"* link below

#### 1.6 Why FFP / Differentiators
- Three value propositions, vertical stack or staggered layout:
  - *"Operators, not advisors"* — We embed with your team, not observe from the side.
  - *"25+ years of product leadership"* — Fortune 500 to startup exits.
  - *"Strategy through execution"* — From roadmap to shipped product.
- Each: bold statement + one sentence of support
- No cards, no boxes — clean type against background
- Orange accent underlines or highlights the bold statements

#### 1.7 Final CTA Section
- Full-width, slightly different background tone
- Large headline: *"Ready to move forward?"*
- Subtext: *"Book a free 30-minute strategy session."*
- Two buttons: **"Book a Call"** (primary) + **"Send a Message"** (ghost)

#### 1.8 Footer
Shared component.

---

### 2. Services Page (`/services`)

#### Hero
- Title: *"Services"*
- Subhead: *"From strategy to execution — we deliver across the full product lifecycle."*

#### Service Sections
5 full-width sections, stacked vertically. Each follows the same structure:

**[Service Title]** — large heading

For each:
- **Who it's for** — one sentence identifying the buyer
- **What we deliver** — 3-4 outcome-focused bullet points
- **Result callout** — single metric or mini case study inline
- **CTA** — *"Discuss this for your team →"* (links to /contact with pre-filled subject)

**The 5 service categories:**

1. **Strategic Assessments**
   - Who: Companies needing clarity on product direction, team structure, or technology choices
   - Delivers: Product evaluation, technology roadmaps, team structure recommendations, competitive positioning

2. **Product Market Fit & GTM**
   - Who: Companies entering new markets or pivoting existing products
   - Delivers: Go-to-market strategy, competitive analysis, pricing strategy, product-led growth planning

3. **Product Delivery**
   - Who: Companies building new products or overhauling existing ones
   - Delivers: Requirements management, UX design oversight, sprint execution, MVP development

4. **Project Rollouts**
   - Who: Companies launching products or managing large-scale implementations
   - Delivers: Program management, change management, stakeholder communication, support planning

5. **AI Implementation & Modernization**
   - Who: Companies adopting AI or modernizing legacy platforms
   - Delivers: ML modeling strategy, platform modernization, agentic AI solutions, blockchain enablement

Sections separated by generous whitespace. Alternating `bg-primary` / `bg-surface-alt` for visual rhythm.

#### Engagement Process
Horizontal flow at bottom of page:
**Discovery → Strategy → Execution → Handoff**
One line under each step explaining what happens.

#### Bottom CTA
Standard: *"Ready to move forward?"*

---

### 3. Talent Page (`/talent`)

#### Hero
- Title: *"Talent"*
- Subhead: *"Senior product and technology professionals, ready to embed with your team."*

#### Engagement Models
Three columns (desktop):

| Model | Description |
|---|---|
| **Fractional** | Part-time senior leadership (CPO, VP Product). Ongoing retainer. *"Strategic oversight without the full-time cost."* |
| **Project-Based** | Dedicated team for defined engagement. Fixed scope/timeline. *"Ship a product, then hand off."* |
| **Staff Augmentation** | Fill a specific role gap. Flexible duration. *"Extend your team with proven talent."* |

#### Roles Grid
2-column grid (desktop). 8 role cards, each containing:
- **Role title** (bold)
- **One-line pitch** — what this person brings
- **Key capabilities** — 3 bullet points
- **Anonymized profile** — *"Typical background: 15+ years, Fortune 500 and startup experience, 4+ products launched from 0→1"*

**The 8 roles:**
1. Business Analyst
2. Product Owner
3. Product Manager
4. Fractional Chief Product Officer
5. UI/UX Designer
6. Project Manager
7. Product Marketing Manager
8. Solutions Architect

Cards use `bg-surface` treatment.

#### Comparison Section
Two-column comparison: *"FFP Talent vs. Full-Time Hire"*

| Factor | Full-Time Hire | FFP Talent |
|---|---|---|
| Ramp-up time | 3-6 months | Days |
| Cost | Salary + benefits + equity | Engagement fee only |
| Flexibility | Fixed commitment | Scale up or down |
| Experience breadth | One company's perspective | Cross-industry, multi-company |

Not a pricing table — a value argument.

#### Bottom CTA
*"Tell us what role you need →"* links to /contact.

---

### 4. Case Studies

#### Listing Page (`/case-studies`)

**Hero:** Title *"Case Studies"*, subhead *"Real outcomes for real companies."*

**Cards:** 2x2 grid, each card contains:
- Industry tag (e.g., *Healthcare*, *Supply Chain*, *AI/Blockchain*)
- Outcome-led headline (e.g., *"MVP to Market in 90 Days"*)
- One-line summary of what was delivered
- Key metric highlighted in orange accent type
- Client attribution (company + person's title)
- *"Read more →"* link

**The 4 initial case studies:**
1. KMS Technologies — Chief Delivery Officer quoted
2. Elemica — Chief Innovation Officer quoted
3. Global Transportation Company — anonymized
4. Project Appe — AI-driven product management

#### Detail Pages (`/case-studies/[slug]`)

**Problem → Approach → Result framework:**

1. **Header** — Title, client name, industry tag
2. **The Challenge** — 2-3 paragraphs on what the client faced
3. **Our Approach** — What FFP did, services used, team structure
4. **The Results** — Metrics in large callout type, supported by narrative
5. **Client Quote** — Full testimonial, styled blockquote
6. **CTA** — *"Facing a similar challenge? Let's talk."*
7. **Prev/Next navigation** — Simple links to adjacent case studies

Content stored as MDX files for easy editing. Site built with a flexible template that works for any case study.

---

### 5. About Page (`/about`)

#### Opening Statement
Large type, 2-3 sentences: *"Future Forward Partners was founded on a simple belief: companies don't need more consultants. They need experienced operators who can step in and deliver."*

#### Jeff Gantt Section
- Name, title (President), professional photo
- Bio in third person, reframed as credibility argument — not a resume
- Lead with impact: *"Jeff has spent 25+ years building and scaling software products across supply chain, healthcare, mobile, and AI — at companies like Manhattan Associates, AirWatch, and Elemica."*
- 3-4 career highlights as short callouts
- LinkedIn link

#### How We Work
4-step process, horizontal or vertical flow:
1. **Understand** — Deep dive into your business, product, and challenges
2. **Strategize** — Define the approach, roadmap, and success metrics
3. **Execute** — Embed with your team and deliver
4. **Transition** — Hand off with documentation and ongoing support options

Each step: bold title + one sentence. No icons.

#### Network Statement
One paragraph: *"Beyond Jeff's direct engagement, FFP draws on a network of senior product managers, designers, architects, and engineers — each vetted for Fortune 500 and startup experience."*

#### Bottom CTA
*"Let's talk about your next product challenge."*

---

### 6. Contact Page (`/contact`)

#### Split Layout
Two columns (desktop), stacked (mobile).

**Left Column — Book a Call (Primary):**
- Heading: *"Book a Strategy Session"*
- Subtext: *"30 minutes. No pitch. Just a conversation about your product challenges."*
- Embedded Calendly/Cal.com widget

**Right Column — Send a Message (Secondary):**
- Heading: *"Prefer email?"*
- Form fields: Name, Email, Company, Message (4 fields only)
- Submit button (orange)
- Below form: jeff@futureforwardpartners.com, *"Atlanta, Georgia"*

No map, no social media grid. Two clear conversion paths.

---

## Responsive Behavior

- **Desktop (1024px+):** Full multi-column layouts, horizontal flows
- **Tablet (768-1023px):** 2-column grids reduce to single column, nav remains visible
- **Mobile (<768px):** Single column, hamburger nav, stacked contact page, larger tap targets, floating "Book a Call" sticky button at bottom of viewport

---

## Content Requirements (Not Code)

The following content needs to be written/rewritten by the client:
- Hero headline and subhead (drafts provided above)
- Service descriptions rewritten with outcomes focus
- Case studies rewritten in Problem → Approach → Result format with metrics
- Jeff's bio reframed as credibility argument
- Anonymized talent profiles for each role
- Client logos (files needed)
- Professional photo of Jeff

---

## Implementation Notes

- Case studies stored as MDX for easy content editing
- Contact form needs a backend (Netlify Forms, or a simple API route)
- Calendly/Cal.com requires an account and scheduling link
- SEO: each page gets proper meta tags, Open Graph, and structured data
- Analytics: add Google Analytics or Plausible from day one
- Performance target: Lighthouse 95+ on all pages
