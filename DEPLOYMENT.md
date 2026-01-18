# Deployment Guide

This document provides deployment configuration for the kineticbrandpartners repository.

## Repository Structure

This repository contains only the **marketing-site** project:

**Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
- **marketing-site/** - Next.js marketing website deployed to Netlify

### Related Standalone Repositories
- **job-tracker** - `https://github.com/tigerswim/job-tracker.git` (deployed to Netlify)
- **RacePrep** - `https://github.com/tigerswim/raceprep.git` (deployed via Expo EAS)
- **sagenet-website** - `https://github.com/tigerswim/sagenet-website.git` (deployed to Netlify)

---

## Netlify Deployment Configuration

### marketing-site (Kinetic Brand Partners Website)

**Netlify Site Settings:**
1. **Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
2. **Base directory**: `marketing-site`
3. **Build command**: `npm run build`
4. **Publish directory**: `marketing-site/out`
5. **Node version**: 20 (Active LTS)

**Configuration File**: `marketing-site/netlify.toml` (within project directory)

**Branch**: `main`

**Environment Variables**: None required (static site)

---

## Related Project Deployments

For deployment instructions for other projects, see their respective repositories:

- **job-tracker**: See `https://github.com/tigerswim/job-tracker` (deployed to Netlify)
- **RacePrep**: See `https://github.com/tigerswim/raceprep` (deployed via Expo EAS)
- **sagenet-website**: See `https://github.com/tigerswim/sagenet-website` (deployed to Netlify)

---

## Setting Up Netlify Site

### Step 1: Create Netlify Site

Create a Netlify site for the marketing website:

**Site Configuration:**
- Name: `kineticbrandpartners` (or your custom domain)
- Connected to: `tigerswim/kineticbrandpartners` repository

### Step 2: Configure Base Directory

In Netlify dashboard, go to:

```
Site Settings → Build & Deploy → Continuous Deployment → Build settings
```

**Settings:**
- Base directory: `marketing-site`
- Build command: `npm run build`
- Publish directory: `marketing-site/out`

### Step 3: Set Node Version

Under **Dependency management**, set:
- Node version: `20` (Active LTS)

### Step 4: Trigger Deployment

Push to `main` branch triggers automatic deployment.

---

## SEO & Indexing Configuration

### Domain & SSL Setup (Cloudflare + Netlify)

**Cloudflare DNS Configuration:**
1. **Primary domain** (A or CNAME record):
   - Name: `@` or `kineticbrandpartners.com`
   - Target: Netlify site URL or IP
   - **Proxy status**: ON (orange cloud) ✅

2. **WWW subdomain** (CNAME record):
   - Name: `www`
   - Target: `kineticbrandpartners.netlify.app` or primary domain
   - **Proxy status**: ON (orange cloud) ✅

3. **SSL/TLS Mode**: Set to **Full** or **Full (strict)**

**Why orange cloud matters**: Ensures Cloudflare handles SSL for both domains, preventing certificate errors when Netlify redirects www → non-www.

### Netlify Redirects

The `marketing-site/netlify.toml` file includes critical redirects:

```toml
# Force HTTPS - redirect all HTTP to HTTPS
[[redirects]]
  from = "http://kineticbrandpartners.com/*"
  to = "https://kineticbrandpartners.com/:splat"
  status = 301
  force = true

# Redirect www to non-www (canonical domain)
[[redirects]]
  from = "https://www.kineticbrandpartners.com/*"
  to = "https://kineticbrandpartners.com/:splat"
  status = 301
  force = true

# SPA fallback (must be last)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Canonical domain**: `https://kineticbrandpartners.com` (non-www, HTTPS)

### Sitemap Management

**Location**: `marketing-site/public/sitemap.xml`

**Current pages** (must match actual site structure):
- `/` (home)
- `/about`
- `/work`
- `/resume`

**When to update**:
- When adding new pages to the site
- When removing pages from the site
- Update `<lastmod>` dates when pages are significantly modified

### Google Search Console Setup

1. **Verify domain ownership** in Google Search Console
2. **Submit sitemap**: `https://kineticbrandpartners.com/sitemap.xml`
3. **Request indexing** for all pages:
   - `https://kineticbrandpartners.com`
   - `https://kineticbrandpartners.com/about`
   - `https://kineticbrandpartners.com/work`
   - `https://kineticbrandpartners.com/resume`

**Testing redirects**:
```bash
# Test HTTPS redirect
curl -I http://kineticbrandpartners.com
# Should return: 301 → https://kineticbrandpartners.com

# Test www redirect
curl -I https://www.kineticbrandpartners.com
# Should return: 301 → https://kineticbrandpartners.com
```

---

## Troubleshooting

### "Base directory does not exist" Error

**Problem**: Netlify can't find the base directory.

**Solution**:
1. Check base directory is set in Netlify dashboard (not just netlify.toml)
2. Verify `marketing-site/` directory exists in your repository
3. Ensure the path is relative to repository root (`marketing-site`, not `/marketing-site`)

### Build Fails with "Cannot find package.json"

**Problem**: Build is running from wrong directory.

**Solution**:
1. Set base directory to `marketing-site` in Netlify dashboard
2. Verify netlify.toml exists in `marketing-site/netlify.toml`
3. Check that `marketing-site/package.json` exists
4. Ensure build command doesn't include `cd` commands

### Google Indexing Fails

**Problem**: Google can't index `http://` or `https://www.` URLs.

**Solution**:
1. **Check Netlify redirects**: Verify `marketing-site/netlify.toml` includes HTTPS and www redirect rules (see SEO Configuration section)
2. **Check Cloudflare DNS**: Ensure both `@` and `www` records have **Proxy status: ON** (orange cloud)
3. **Check SSL/TLS mode**: Must be "Full" or "Full (strict)" in Cloudflare
4. **Test redirects**: Use `curl -I` commands from SEO Configuration section
5. **Update sitemap**: Ensure all pages are listed in `marketing-site/public/sitemap.xml`
6. **Resubmit to Google**: After fixes, resubmit sitemap and request indexing

### SSL Certificate Errors on www Subdomain

**Problem**: `curl: (60) SSL certificate problem` when accessing www subdomain.

**Solution**:
1. **Enable Cloudflare proxy**: In Cloudflare DNS, click the gray cloud icon next to the `www` CNAME record to toggle to orange
2. **Wait for propagation**: Allow 30-60 seconds for DNS changes
3. **Verify**: Test with `curl -I https://www.kineticbrandpartners.com`

---

## Deployment Checklist

### Before Deploying marketing-site:
- [ ] Base directory set to `marketing-site` in Netlify dashboard
- [ ] Node version set to 20 in Netlify dashboard
- [ ] Build succeeds locally: `cd marketing-site && npm run build`
- [ ] All assets are committed to repository
- [ ] Custom domain configured (if applicable)
- [ ] Sitemap updated with all current pages

### After Deployment:
- [ ] Site loads correctly at production URL
- [ ] No console errors in browser
- [ ] Test all pages and links
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags

### SEO Configuration (One-Time Setup):
- [ ] Cloudflare DNS: Primary domain with orange cloud proxy
- [ ] Cloudflare DNS: WWW subdomain with orange cloud proxy
- [ ] Cloudflare SSL/TLS mode set to "Full" or "Full (strict)"
- [ ] Test HTTP → HTTPS redirect: `curl -I http://kineticbrandpartners.com`
- [ ] Test www → non-www redirect: `curl -I https://www.kineticbrandpartners.com`
- [ ] Verify sitemap accessible: `https://kineticbrandpartners.com/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all pages in Google Search Console

---

## Questions?

- **Development guidance**: See `CLAUDE.md` for repository overview
- **marketing-site specific**: See `marketing-site/README.md`
- **Other projects**: Visit their respective GitHub repositories

---

**Last Updated**: January 2026
