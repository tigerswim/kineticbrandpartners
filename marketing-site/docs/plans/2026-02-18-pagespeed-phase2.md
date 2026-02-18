# PageSpeed Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve mobile PageSpeed score from 82 toward 90+ by fixing the three remaining code-level bottlenecks identified in Lighthouse.

**Architecture:** Three independent changes: (1) convert the Kinetic logo PNG to WebP at correct display dimensions to fix the actual LCP element, (2) fix the hero image srcset so mobile browsers select the small webp, (3) inline critical above-the-fold CSS directly in layout.tsx to eliminate three render-blocking CSS chunk requests (~1,130ms).

**Tech Stack:** Next.js 15.5.7, TypeScript, cwebp (Homebrew), static export to Netlify

---

### Task 1: Convert Kinetic logo PNG → WebP at correct display size

The logo renders at 89×36px on mobile but ships as a 360×146px PNG (42KB). Converting to WebP at 2× display size (180×73px) will cut it to ~3-4KB and fix the LCP element size.

**Files:**
- Create: `public/logos/kinetic-brand-partners.webp`
- Modify: `src/components/Header.tsx`
- Modify: `src/app/layout.tsx` (update preload to target logo instead of/in addition to headshot)

**Step 1: Create WebP logo at 2× display size**

```bash
# Resize PNG to 360×146 → 180×73 (2× of 90×36 display size), then convert to WebP
sips -z 73 180 "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site/public/logos/kinetic-brand-partners.png" --out /tmp/kinetic-logo-resized.png
cwebp -q 90 /tmp/kinetic-logo-resized.png -o "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site/public/logos/kinetic-brand-partners.webp"
ls -lh "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site/public/logos/kinetic-brand-partners.webp"
```

Expected: file ~3-5KB

**Step 2: Update Header.tsx to use WebP with PNG fallback**

Replace the `next/image` Image component with a plain `<img>` using a `<picture>` element for format fallback, and add `fetchPriority="high"`:

```tsx
// src/components/Header.tsx - replace the Image import and logo Image component

// Remove: import Image from "next/image";

// Replace the logo Image with:
<picture>
  <source srcSet="/logos/kinetic-brand-partners.webp" type="image/webp" />
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src="/logos/kinetic-brand-partners.png"
    alt="Kinetic Brand Partners"
    width={180}
    height={45}
    className="kinetic-logo"
    fetchPriority="high"
    decoding="sync"
  />
</picture>
```

**Step 3: Update layout.tsx preload to target the logo (the actual LCP element)**

Replace the existing hero headshot preload with a logo preload (the logo is what Lighthouse identifies as LCP on mobile):

```tsx
{/* Preload actual LCP element - logo is first image in DOM (fixed header) */}
<link rel="preload" as="image" href="/logos/kinetic-brand-partners.webp" type="image/webp" />
{/* Also preload hero headshot for fast above-fold rendering */}
<link
  rel="preload"
  as="image"
  href="/images/DJH-CGPT-Sketch.webp"
  type="image/webp"
  // @ts-expect-error - imagesrcset is valid HTML but not in React types yet
  imagesrcset="/images/DJH-CGPT-Sketch-mobile.webp 320w, /images/DJH-CGPT-Sketch.webp 533w"
  imagesizes="(max-width: 640px) 280px, (max-width: 968px) 350px, 400px"
/>
```

**Step 4: Verify build passes**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
npm run build 2>&1 | tail -20
```

Expected: `✓ Generating static pages (10/10)` with no errors.

**Step 5: Commit**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
git add public/logos/kinetic-brand-partners.webp src/components/Header.tsx src/app/layout.tsx
git commit -m "perf: convert logo to WebP and fix LCP fetchpriority"
```

---

### Task 2: Fix hero image srcset so mobile browsers select the small webp

Lighthouse shows the browser is loading `DJH-CGPT-Sketch.webp` (70.4 KiB) even at 280×420 display size. The `sizes` value must use `vw` units or explicit pixel widths that match what the browser actually renders. The issue is the sizes string needs to better reflect mobile display widths.

**Files:**
- Modify: `src/app/page.tsx` (lines 82-92)

**Step 1: Update the img srcset and sizes**

The mobile image is 320w but the display size at 280px means the browser needs the 320w descriptor to win. The sizes need to use viewport-relative values so the browser picks the right breakpoint:

```tsx
// Replace existing img in src/app/page.tsx hero section:
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src="/images/DJH-CGPT-Sketch.webp"
  srcSet="/images/DJH-CGPT-Sketch-mobile.webp 320w, /images/DJH-CGPT-Sketch.webp 533w"
  sizes="(max-width: 640px) 85vw, (max-width: 968px) 350px, 400px"
  alt="Dan Hoeller"
  width={400}
  height={530}
  className="mb-headshot"
  fetchPriority="high"
  decoding="sync"
/>
```

The key change: `(max-width: 640px) 85vw` — on a 360px wide phone, 85vw = 306px, which means the browser will select the 320w descriptor instead of the 533w one.

**Step 2: Also update the preload imagesizes in layout.tsx to match**

```tsx
imagesizes="(max-width: 640px) 85vw, (max-width: 968px) 350px, 400px"
```

**Step 3: Verify build**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
npm run build 2>&1 | tail -10
```

Expected: clean build, no errors.

**Step 4: Commit**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
git add src/app/page.tsx src/app/layout.tsx
git commit -m "perf: fix hero image srcset sizes so mobile selects small webp"
```

---

### Task 3: Inline critical CSS to eliminate render-blocking CSS chunks

Three Next.js CSS chunk files (6.7 KiB total) are blocking render for 560–582ms each. The fix is to extract the above-the-fold critical CSS (header, hero section, CSS variables, base styles) and inline it directly in `<head>` via a `<style>` tag in `layout.tsx`, then load the full CSS files deferred/async.

This is the highest-complexity task. The approach: identify which CSS rules are needed to render the visible above-the-fold content without layout shift, extract those rules, and inline them. The rest loads non-blocking.

**Files:**
- Create: `src/app/critical.css` (extracted critical styles)
- Modify: `src/app/layout.tsx` (inline critical CSS as string, defer full CSS)
- Modify: `src/app/page.tsx` (add defer hint for non-critical CSS import)

**Step 1: Identify critical CSS rules**

The above-the-fold content on mobile is:
- Fixed header (`.kinetic-header`, `.kinetic-logo`, `.kinetic-hamburger`, `.kinetic-container`)
- Hero section (`.kinetic-page`, `.mb-hero`, `.mb-hero-grid`, `.mb-hero-content`, `.mb-title`, `.mb-subtitle`, `.kinetic-badge`, `.mb-image-container`, `.mb-headshot`, `.gradient-mesh blobs`)
- CSS custom properties (`:root` block)
- Base reset/body styles

**Step 2: Create `src/app/critical.css` with only above-fold rules**

Create this file with the minimal CSS needed to render header + hero without flash. Extract from `kinetic-design-system.css` and `mockup-b.css`:

```css
/* Critical CSS - inlined in <head> to eliminate render-blocking */
/* Only above-the-fold styles: CSS vars, base, header, hero */

:root {
  --navy: #1a365d;
  --navy-light: #2d4a6f;
  --teal: #0d9488;
  --teal-light: #14b8a6;
  --teal-bright: #2dd4bf;
  --white: #ffffff;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  --space-2xl: 4rem;
  --space-4xl: 7rem;
  --container-max: 1200px;
  --container-padding: 2rem;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 100px;
  --shadow-xl: 0 25px 80px rgba(26,54,93,0.15);
  --transition-base: 0.3s ease;
}

*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:0}

.kinetic-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fff;
  color: var(--gray-800);
  min-height: 100vh;
  overflow-x: hidden;
}
.kinetic-page * { box-sizing: border-box; }

.kinetic-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  z-index: 1;
}

.kinetic-header {
  padding: 1.5rem 0;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226,232,240,0.5);
}
.kinetic-header .kinetic-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kinetic-logo { height: 45px; width: auto; }
.kinetic-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.kinetic-hamburger span {
  width: 24px; height: 2px;
  background: var(--gray-700);
  border-radius: 2px;
}
.kinetic-nav {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0; padding: 0;
  align-items: center;
}
.kinetic-nav a {
  color: var(--gray-600);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
}
.kinetic-nav-cta {
  background: linear-gradient(135deg,var(--navy) 0%,var(--teal) 100%);
  color: #fff !important;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-full);
  font-weight: 500;
}

.kinetic-gradient-mesh {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.kinetic-gradient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}
.kinetic-gradient-blob--1 {
  width: 600px; height: 600px;
  background: linear-gradient(135deg,rgba(13,148,136,0.3),rgba(20,184,166,0.2));
  top: -200px; right: -100px;
}
.kinetic-gradient-blob--2 {
  width: 500px; height: 500px;
  background: linear-gradient(135deg,rgba(26,54,93,0.2),rgba(45,74,111,0.15));
  bottom: -150px; left: -100px;
}
.kinetic-gradient-blob--3 {
  width: 400px; height: 400px;
  background: linear-gradient(135deg,rgba(13,148,136,0.15),transparent);
  top: 40%; left: 30%;
}

.kinetic-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg,rgba(13,148,136,0.1),rgba(26,54,93,0.1));
  border: 1px solid rgba(13,148,136,0.2);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--teal);
}
.kinetic-badge-dot {
  width: 6px; height: 6px;
  background: var(--teal);
  border-radius: 50%;
}
.kinetic-title-gradient {
  background: linear-gradient(135deg,var(--navy) 0%,var(--teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mb-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 6rem;
  position: relative;
}
.mb-hero-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 5rem;
  align-items: center;
}
.mb-hero-content { position: relative; }
.mb-title {
  font-size: clamp(2.5rem,5vw,3.75rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--gray-900);
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.03em;
}
.mb-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--gray-600);
  margin-bottom: 2rem;
  font-weight: 400;
}
.mb-image-container { position: relative; }
.mb-image-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 120%; height: 120%;
  background: radial-gradient(circle,rgba(13,148,136,0.2) 0%,transparent 70%);
  filter: blur(40px);
  z-index: -1;
}
.mb-headshot {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}
.mb-hero-visual { position: relative; }
.mb-cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.kinetic-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: none;
  font-family: inherit;
}
.kinetic-btn--primary {
  background: linear-gradient(135deg,var(--navy) 0%,var(--teal) 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(13,148,136,0.3);
}
.kinetic-btn--secondary {
  background: #fff;
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
}

@media (max-width: 968px) {
  .mb-hero-grid { grid-template-columns: 1fr; gap: 3rem; }
  .mb-hero-visual { order: -1; max-width: 350px; margin: 0 auto; }
  .mb-hero-content { text-align: center; }
  .mb-cta-group { justify-content: center; }
}
@media (max-width: 768px) {
  :root { --container-padding: 1.25rem; }
  .kinetic-hamburger { display: flex; }
  .kinetic-nav { display: none; }
  .kinetic-btn { padding: 0.875rem 1.5rem; font-size: 0.875rem; }
}
@media (max-width: 640px) {
  .mb-hero { padding: 7rem 0 4rem; }
  .mb-hero-visual { max-width: 280px; }
  .mb-cta-group { flex-direction: column; align-items: stretch; }
  .mb-cta-group .kinetic-btn { text-align: center; justify-content: center; }
}
@media (max-width: 480px) {
  :root { --container-padding: 1rem; }
  .kinetic-logo { height: 36px; }
  .kinetic-header { padding: 1rem 0; }
}
```

**Step 3: Read the critical CSS into layout.tsx and inline it**

In `layout.tsx`, read the critical CSS file at build time and inject it as an inline `<style>` tag. Since this is a Next.js App Router layout (server component for layout), we can use `fs.readFileSync`:

```tsx
// Add at top of layout.tsx, after existing imports:
import fs from 'fs'
import path from 'path'

// Inside RootLayout, before return:
const criticalCss = fs.readFileSync(
  path.join(process.cwd(), 'src/app/critical.css'),
  'utf8'
)

// In <head>, add before the GTM script:
<style dangerouslySetInnerHTML={{ __html: criticalCss }} />
```

**Step 4: Verify build**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
npm run build 2>&1 | tail -20
```

Expected: clean build. The CSS will be inlined in the HTML `<head>` — verify by checking `out/index.html` for the `<style>` tag.

```bash
grep -c "kinetic-header" "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site/out/index.html"
```

Expected: number > 0 (confirms critical CSS is in the HTML)

**Step 5: Commit**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
git add src/app/critical.css src/app/layout.tsx
git commit -m "perf: inline critical CSS to eliminate render-blocking chunk requests"
```

---

### Task 4: Push and verify

**Step 1: Final build check**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
npm run build 2>&1 | tail -20
```

**Step 2: Update CLAUDE.md**

Add a note to the PageSpeed Optimizations section documenting these phase 2 changes.

**Step 3: Commit docs and push**

```bash
cd "/Users/danhoeller/Website Development/kineticbrandpartners/marketing-site"
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with PageSpeed phase 2 optimizations"
git push origin main
```

Expected: push succeeds, Netlify deploy triggers.
