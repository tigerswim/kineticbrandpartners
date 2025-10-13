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

---

## Deployment Checklist

### Before Deploying marketing-site:
- [ ] Base directory set to `marketing-site` in Netlify dashboard
- [ ] Node version set to 20 in Netlify dashboard
- [ ] Build succeeds locally: `cd marketing-site && npm run build`
- [ ] All assets are committed to repository
- [ ] Custom domain configured (if applicable)

### After Deployment:
- [ ] Site loads correctly at production URL
- [ ] No console errors in browser
- [ ] Test all pages and links
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags

---

## Questions?

- **Development guidance**: See `CLAUDE.md` for repository overview
- **marketing-site specific**: See `marketing-site/README.md`
- **Other projects**: Visit their respective GitHub repositories

---

**Last Updated**: October 2025
