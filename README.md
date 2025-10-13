# Kinetic Brand Partners - Development Workspace

This directory contains multiple projects for Kinetic Brand Partners and related applications.

## 📁 Projects

### [job-tracker/](job-tracker/)
**Job Application & Contact Management System**

A comprehensive job tracking and professional networking application built with Next.js, TypeScript, and Supabase.

- **Repository**: Part of this monorepo (`https://github.com/tigerswim/kineticbrandpartners.git`)
- **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Supabase
- **Deployment**: Netlify
- **Port**: 3001 (development)

**Key Features:**
- Job application tracking with status management
- Contact relationship management
- Interaction logging and communication history
- Smart reminder system with email notifications
- Analytics and reporting dashboard

[→ View job-tracker README](job-tracker/README.md)

---

### [marketing-site/](marketing-site/)
**Kinetic Brand Partners Marketing Website**

The official marketing website showcasing services, team, and brand development approach.

- **Repository**: Part of this monorepo (`https://github.com/tigerswim/kineticbrandpartners.git`)
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS
- **Deployment**: Netlify
- **Port**: 3000 (development)

**Key Features:**
- Modern responsive design
- Service portfolio showcase
- Team profiles and company information
- Optimized for performance and SEO

[→ View marketing-site README](marketing-site/README.md)

---

### [RacePrep/](RacePrep/)
**Triathlon Training & Race Analytics**

Mobile-first triathlon tracking application for beginner to intermediate triathletes.

- **Repository**: Standalone (`https://github.com/tigerswim/raceprep.git`)
- **Tech Stack**: React Native, Expo, TypeScript, Supabase
- **Platform**: iOS & Android
- **Status**: Active development (Phase 2 complete, Phase 3 in progress)

**Key Features:**
- Comprehensive race analysis with transition tracking
- Strava integration for training data
- Race discovery and planning tools
- Performance analytics and predictions
- Beautiful mobile experience with dark theme

[→ View RacePrep README](RacePrep/README.md)

---

### [sagenet-website/](sagenet-website/)
**SageNet Corporate Website**

Corporate website project for SageNet network infrastructure services.

- **Repository**: Standalone (`https://github.com/tigerswim/sagenet-website.git`)
- **Status**: Build files only (source in separate repository)

---

## 🚀 Quick Start

### Clone the Monorepo
```bash
git clone https://github.com/tigerswim/kineticbrandpartners.git
cd kineticbrandpartners
```

### Install Dependencies (per project)
```bash
# Job Tracker
cd job-tracker && npm install

# Marketing Site
cd ../marketing-site && npm install

# RacePrep (separate repo)
cd ../RacePrep && npm install
```

### Development Servers
```bash
# Job Tracker (port 3001)
cd job-tracker && npm run dev

# Marketing Site (port 3000)
cd marketing-site && npm run dev

# RacePrep (Expo)
cd RacePrep && npx expo start
```

## 🗂️ Repository Structure

```
kineticbrandpartners/
├── job-tracker/           # Job tracking app (monorepo)
│   ├── src/              # Source code
│   ├── docs/             # Documentation
│   ├── public/           # Static assets
│   └── supabase/         # Supabase functions
│
├── marketing-site/        # Marketing website (monorepo)
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── cypress/          # E2E tests
│
├── RacePrep/             # Triathlon app (standalone repo)
│   ├── app/              # React Native app
│   ├── components/       # Reusable components
│   └── src/              # Additional source
│
├── sagenet-website/       # SageNet site (standalone repo)
│   ├── build/            # Production build
│   └── src/              # Source (minimal)
│
└── README.md             # This file
```

## 🔗 Git Repositories

| Project | Repository URL | Type |
|---------|---------------|------|
| job-tracker | `https://github.com/tigerswim/kineticbrandpartners.git` | Monorepo |
| marketing-site | `https://github.com/tigerswim/kineticbrandpartners.git` | Monorepo |
| RacePrep | `https://github.com/tigerswim/raceprep.git` | Standalone |
| sagenet-website | `https://github.com/tigerswim/sagenet-website.git` | Standalone |

## 📝 Development Notes

### Monorepo Projects (job-tracker, marketing-site)
- Share the same git repository
- Deployed separately via Netlify
- Independent package.json and dependencies
- Commit changes affect both projects

### Standalone Projects (RacePrep, sagenet-website)
- Have their own git repositories
- Managed independently
- Located in this workspace for convenience
- Push/pull from their respective remotes

## 🛠️ Technology Stack Overview

### Frontend Frameworks
- **Next.js 15** (job-tracker, marketing-site)
- **React Native / Expo** (RacePrep)

### Styling
- **Tailwind CSS 4** (job-tracker, marketing-site)
- **React Native StyleSheet** (RacePrep)

### Database & Backend
- **Supabase** (PostgreSQL, Auth, Real-time)
- **Netlify Functions** (serverless)

### Deployment
- **Netlify** (job-tracker, marketing-site)
- **Expo EAS** (RacePrep mobile apps)

## 📚 Additional Resources

- **job-tracker Documentation**: [job-tracker/docs/](job-tracker/docs/)
- **RacePrep Documentation**: [RacePrep/DOCUMENTATION_INDEX.md](RacePrep/DOCUMENTATION_INDEX.md)
- **Development Plans**: See individual project READMEs

## 🤝 Contributing

Each project has its own contribution guidelines. See individual README files for details.

## 📄 License

All projects are private and proprietary. All rights reserved.

---

**Last Updated**: October 2025
