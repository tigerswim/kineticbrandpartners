# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this workspace.

## Repository Overview

This repository contains the **marketing-site** project for Kinetic Brand Partners.

**This Repository**: `https://github.com/tigerswim/kineticbrandpartners.git`
- **marketing-site/** - Next.js marketing website (primary content of this repo)

**Related Standalone Repositories** (not in this repo):
- **job-tracker** - `https://github.com/tigerswim/job-tracker.git`
- **RacePrep** - `https://github.com/tigerswim/raceprep.git`
- **sagenet-website** - `https://github.com/tigerswim/sagenet-website.git`

## Repository Structure

This repository contains only the **marketing-site** project:
- Remote: `https://github.com/tigerswim/kineticbrandpartners.git`
- Branch: `main`
- Deployed via Netlify with base directory `marketing-site`

**Other projects** are in separate repositories and may exist in your local workspace for convenience.

## Working with Projects

### Before Starting Work
1. **Verify current directory** - Use `pwd` to confirm location
2. **Check git remote** - Run `git remote -v` to confirm correct repository
3. **Read project-specific CLAUDE.md** - Each project may have additional guidance

### Project Commands

#### marketing-site (this repository)
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners/marketing-site
npm run dev      # Port 3000
npm run build
npm run lint
```
- Tech: Next.js, TypeScript, Tailwind CSS

#### Other Projects (if in workspace)
If job-tracker, RacePrep, or sagenet-website are cloned in your workspace:
- **job-tracker**: `cd ../job-tracker` (separate repo)
- **RacePrep**: `cd ../RacePrep` (separate repo)
- **sagenet-website**: `cd ../sagenet-website` (separate repo)

Each has its own git repository and documentation.

## Important Paths

### marketing-site
- Source: `marketing-site/src/`
- Tests: `marketing-site/cypress/`
- Public: `marketing-site/public/`


## Git Workflow

### For This Repository (marketing-site)
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners
git status
git add marketing-site/
git commit -m "Description"
git push origin main
```

### For Other Projects (if in workspace)
Each project (job-tracker, RacePrep, sagenet-website) has its own git repository.
Navigate to that directory and use standard git commands.

## Deployment

### marketing-site (this repository)
- **Platform**: Netlify
- **Base Directory**: `marketing-site`
- **Build Command**: `npm run build`
- **Publish Directory**: `marketing-site/out`
- **Node Version**: 20 (Active LTS)
- **Trigger**: Push to main branch

## Common Tasks

### Adding a new npm package
```bash
# For marketing-site
cd marketing-site && npm install <package>
```

### Running tests
```bash
# marketing-site (Cypress)
cd marketing-site && npm run cypress:open
```

### Checking TypeScript errors
```bash
cd marketing-site && npx tsc --noEmit
```

## File Organization Rules

### ✅ Correct Structure
- All marketing-site files in `marketing-site/` directory
- Root level contains: README.md, CLAUDE.md, DEPLOYMENT.md, netlify.toml, .git/, marketing-site/

### ❌ Avoid
- Placing project-specific files at repository root
- Creating duplicate directories

## Environment Variables

marketing-site uses `.env.local` (if needed):

```
marketing-site/.env.local
```

**Never commit .env files to git!**

## Documentation

### Key Documentation Files
- **Repository**: `/README.md` (repository overview)
- **This file**: `/CLAUDE.md` (AI assistant guidance)
- **Deployment**: `/DEPLOYMENT.md` (deployment configuration)
- **marketing-site**: `marketing-site/README.md`

### When to Read Documentation
- **Before starting work** - Read CLAUDE.md and marketing-site/README.md
- **For deployment** - Check DEPLOYMENT.md
- **For other projects** - Navigate to their respective repositories

## Best Practices

1. **Always verify you're in the correct directory** before running commands
2. **Check git remote** before committing to avoid pushing to wrong repository
3. **Read project-specific CLAUDE.md** for detailed project guidance
4. **Use project-specific npm scripts** as defined in each package.json
5. **Keep dependencies separate** between projects
6. **Test locally** before committing changes
7. **Follow existing code patterns** within each project

## Getting Help

- **marketing-site**: See `marketing-site/README.md`
- **Other projects**: Visit their respective GitHub repositories
- **Issues**: Create issues in the appropriate GitHub repository

## Quick Reference

| Task | Command | Directory |
|------|---------|-----------|
| Start marketing-site dev server | `npm run dev` | marketing-site/ |
| Build marketing-site | `npm run build` | marketing-site/ |
| Run marketing-site lint | `npm run lint` | marketing-site/ |
| Check git repo | `git remote -v` | Any directory |

---

**Last Updated**: October 2025
**Workspace Root**: `/Users/danhoeller/Website Development/kineticbrandpartners/`
