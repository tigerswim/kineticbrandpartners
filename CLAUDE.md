# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this workspace.

## Workspace Overview

This workspace contains multiple projects with different structures and purposes:

- **job-tracker/** - Next.js job tracking app (monorepo project)
- **marketing-site/** - Next.js marketing website (monorepo project)
- **RacePrep/** - React Native triathlon app (standalone repository)
- **sagenet-website/** - Static website (standalone repository)

## Repository Structure

### Monorepo Projects
**job-tracker** and **marketing-site** share the same git repository:
- Remote: `https://github.com/tigerswim/kineticbrandpartners.git`
- Branch: `main`
- Commits affect both projects
- Deployed separately via Netlify

### Standalone Projects
**RacePrep** and **sagenet-website** have their own repositories:
- RacePrep: `https://github.com/tigerswim/raceprep.git`
- sagenet-website: `https://github.com/tigerswim/sagenet-website.git`

## Working with Projects

### Before Starting Work
1. **Verify current directory** - Use `pwd` to confirm location
2. **Check git remote** - Run `git remote -v` to confirm correct repository
3. **Read project-specific CLAUDE.md** - Each project may have additional guidance

### Project-Specific Commands

#### job-tracker
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners/job-tracker
npm run dev      # Port 3001
npm run build
npm run lint
```
- See [job-tracker/CLAUDE.md](job-tracker/CLAUDE.md) for detailed guidance
- Tech: Next.js 15, TypeScript, Tailwind CSS 4, Supabase

#### marketing-site
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners/marketing-site
npm run dev      # Port 3000
npm run build
npm run lint
```
- Tech: Next.js, TypeScript, Tailwind CSS

#### RacePrep
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners/RacePrep
npx expo start
npm run ios
npm run android
```
- See [RacePrep/CONTEXT.md](RacePrep/CONTEXT.md) and [RacePrep/QUICKSTART.md](RacePrep/QUICKSTART.md)
- Tech: React Native, Expo, TypeScript, Supabase

## Important Paths

### job-tracker
- Source: `job-tracker/src/`
- Config: `job-tracker/` (root level - next.config.js, tsconfig.json, etc.)
- Docs: `job-tracker/docs/`
- API: `job-tracker/src/app/api/`

### marketing-site
- Source: `marketing-site/src/`
- Tests: `marketing-site/cypress/`
- Public: `marketing-site/public/`

### RacePrep
- Source: `RacePrep/app/`, `RacePrep/components/`, `RacePrep/src/`
- Config: `RacePrep/app.json`, `RacePrep/package.json`

## Git Workflow

### For Monorepo Changes (job-tracker, marketing-site)
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners
git status
git add job-tracker/  # or marketing-site/
git commit -m "Description"
git push origin main
```

### For Standalone Projects (RacePrep)
```bash
cd /Users/danhoeller/Website Development/kineticbrandpartners/RacePrep
git status
git add .
git commit -m "Description"
git push origin main  # Pushes to raceprep.git
```

## Deployment

### job-tracker
- **Platform**: Netlify
- **Config**: `job-tracker/netlify.toml`
- **Trigger**: Push to main branch
- **Environment Variables**: Set in Netlify dashboard
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NETLIFY_DATABASE_URL` (optional)

### marketing-site
- **Platform**: Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `out/`
- **Trigger**: Push to main branch

### RacePrep
- **Platform**: Expo EAS
- **iOS/Android**: Separate build configurations
- **See**: RacePrep documentation for mobile deployment

## Common Tasks

### Adding a new npm package
```bash
# For job-tracker
cd job-tracker && npm install <package>

# For marketing-site
cd marketing-site && npm install <package>

# For RacePrep
cd RacePrep && npm install <package>
```

### Running tests
```bash
# job-tracker (if tests exist)
cd job-tracker && npm test

# marketing-site (Cypress)
cd marketing-site && npm run cypress:open
```

### Checking TypeScript errors
```bash
cd job-tracker && npx tsc --noEmit
cd marketing-site && npx tsc --noEmit
cd RacePrep && npx tsc --noEmit
```

## File Organization Rules

### ✅ Correct Structure
- All job-tracker files in `job-tracker/` directory
- All marketing-site files in `marketing-site/` directory
- All RacePrep files in `RacePrep/` directory
- Root level only contains: README.md, CLAUDE.md, .git/, project directories

### ❌ Avoid
- Placing project-specific files at workspace root
- Mixing files between projects
- Creating duplicate directories

## Environment Variables

Each project has its own `.env.local` file:

```
job-tracker/.env.local
marketing-site/.env.local
RacePrep/.env
```

**Never commit .env files to git!**

## Documentation

### Key Documentation Files
- **Workspace**: `/README.md` (this workspace overview)
- **job-tracker**: `job-tracker/README.md`, `job-tracker/CLAUDE.md`, `job-tracker/docs/`
- **marketing-site**: `marketing-site/README.md`
- **RacePrep**: `RacePrep/README.md`, `RacePrep/DOCUMENTATION_INDEX.md`, `RacePrep/CONTEXT.md`

### When to Read Documentation
- **Before starting work** - Understand project context
- **When encountering errors** - Check troubleshooting guides
- **For API changes** - Review API documentation
- **For deployment** - Check deployment guides

## Best Practices

1. **Always verify you're in the correct directory** before running commands
2. **Check git remote** before committing to avoid pushing to wrong repository
3. **Read project-specific CLAUDE.md** for detailed project guidance
4. **Use project-specific npm scripts** as defined in each package.json
5. **Keep dependencies separate** between projects
6. **Test locally** before committing changes
7. **Follow existing code patterns** within each project

## Getting Help

- **job-tracker**: See `job-tracker/docs/` for comprehensive documentation
- **RacePrep**: See `RacePrep/DOCUMENTATION_INDEX.md` for complete documentation catalog
- **Issues**: Create issues in respective GitHub repositories
- **Questions**: Refer to project-specific README files

## Quick Reference

| Task | Command | Directory |
|------|---------|-----------|
| Start job-tracker dev server | `npm run dev` | job-tracker/ |
| Start marketing-site dev server | `npm run dev` | marketing-site/ |
| Start RacePrep | `npx expo start` | RacePrep/ |
| Build job-tracker | `npm run build` | job-tracker/ |
| Run job-tracker lint | `npm run lint` | job-tracker/ |
| Check git repo | `git remote -v` | Any directory |

---

**Last Updated**: October 2025
**Workspace Root**: `/Users/danhoeller/Website Development/kineticbrandpartners/`
