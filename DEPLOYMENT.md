# Deployment Guide

This document provides deployment configuration for all projects in the kineticbrandpartners workspace.

## Repository Structure

This workspace uses a **monorepo** for related projects and **standalone repositories** for independent projects:

### Monorepo Projects
- **job-tracker/** - Deployed to Netlify
- **marketing-site/** - Deployed to Netlify

**Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`

### Standalone Projects
- **RacePrep/** - Deployed via Expo EAS (repo: `https://github.com/tigerswim/raceprep.git`)
- **sagenet-website/** - Deployed to Netlify (repo: `https://github.com/tigerswim/sagenet-website.git`)

---

## Netlify Deployment Configuration

### job-tracker (Job Application Tracker)

**Netlify Site Settings:**
1. **Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
2. **Base directory**: `job-tracker`
3. **Build command**: `npm run build`
4. **Publish directory**: `job-tracker/.next`
5. **Node version**: 18

**Environment Variables (Netlify Dashboard):**
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

**Configuration File**: `job-tracker/netlify.toml` (within project directory)

**Branch**: `main`

---

### marketing-site (Kinetic Brand Partners Website)

**Netlify Site Settings:**
1. **Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
2. **Base directory**: `marketing-site`
3. **Build command**: `npm run build`
4. **Publish directory**: `marketing-site/out`
5. **Node version**: 18

**Configuration File**: `marketing-site/netlify.toml` (within project directory)

**Branch**: `main`

---

### sagenet-website (SageNet Corporate Site)

**Netlify Site Settings:**
1. **Repository**: `https://github.com/tigerswim/sagenet-website.git`
2. **Base directory**: (root)
3. **Build command**: `npm run build`
4. **Publish directory**: `build`
5. **Node version**: 18

**Branch**: `main`

---

## RacePrep Deployment (Mobile App)

**Platform**: Expo Application Services (EAS)

**Repositories**: `https://github.com/tigerswim/raceprep.git`

See `RacePrep/DEPLOYMENT_GUIDE.md` for complete mobile deployment instructions.

---

## Setting Up Netlify Sites

### Step 1: Create Separate Netlify Sites

You need **TWO separate Netlify sites** for the monorepo projects:

1. **Site 1**: job-tracker
   - Name: `job-tracker` (or your custom domain)
   - Connected to: `tigerswim/kineticbrandpartners` repo

2. **Site 2**: marketing-site (kineticbrandpartners.com)
   - Name: `kineticbrandpartners` (or your custom domain)
   - Connected to: `tigerswim/kineticbrandpartners` repo

### Step 2: Configure Base Directory (Critical!)

For **each Netlify site**, go to:

```
Site Settings → Build & Deploy → Continuous Deployment → Build settings
```

**job-tracker site:**
- Base directory: `job-tracker`
- Build command: `npm run build`
- Publish directory: `job-tracker/.next`

**marketing-site site:**
- Base directory: `marketing-site`
- Build command: `npm run build`
- Publish directory: `marketing-site/out`

### Step 3: Configure Environment Variables

For **job-tracker site** only, add environment variables:

```
Site Settings → Build & Deploy → Environment → Environment variables
```

Add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Trigger Deployment

Push to `main` branch triggers deployment for both sites automatically.

---

## Troubleshooting

### "Base directory does not exist" Error

**Problem**: Netlify can't find the base directory.

**Solution**:
1. Check base directory is set in Netlify dashboard (not just netlify.toml)
2. Verify the directory exists in your repository
3. Ensure the path is relative to repository root (e.g., `job-tracker`, not `/job-tracker`)

### Build Fails with "Cannot find package.json"

**Problem**: Build is running from wrong directory.

**Solution**:
1. Set base directory in Netlify dashboard
2. Verify netlify.toml is inside the project directory
3. Check that build command doesn't include `cd` commands

### Both Sites Building the Same Project

**Problem**: Base directory not configured per-site.

**Solution**:
1. Create two separate Netlify sites (not two deploy contexts)
2. Configure base directory for EACH site individually
3. Each site should point to its own project directory

---

## Deployment Checklist

### Before Deploying job-tracker:
- [ ] Base directory set to `job-tracker` in Netlify dashboard
- [ ] Environment variables configured in Netlify
- [ ] Supabase credentials are valid
- [ ] Database migrations applied
- [ ] Build succeeds locally: `cd job-tracker && npm run build`

### Before Deploying marketing-site:
- [ ] Base directory set to `marketing-site` in Netlify dashboard
- [ ] Build succeeds locally: `cd marketing-site && npm run build`
- [ ] All assets are committed to repository
- [ ] Custom domain configured (if applicable)

### After Deployment:
- [ ] Site loads correctly
- [ ] Environment variables work (for job-tracker)
- [ ] No console errors
- [ ] Test key user flows
- [ ] Check mobile responsiveness

---

## Questions?

- **Monorepo best practices**: See `CLAUDE.md` for development guidance
- **job-tracker specific**: See `job-tracker/docs/DEPLOYMENT.md`
- **RacePrep deployment**: See `RacePrep/DEPLOYMENT_GUIDE.md`

---

**Last Updated**: October 2025
