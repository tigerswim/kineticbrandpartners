# Netlify Setup Instructions

## 🎯 What You Need to Do

After the recent workspace restructuring, you need to configure **base directories** in your Netlify dashboard for both sites.

---

## ✅ Step-by-Step Instructions

### 1. job-tracker Site Configuration

1. **Go to Netlify Dashboard** → Select your **job-tracker** site
2. Navigate to: **Site Settings** → **Build & Deploy** → **Continuous Deployment** → **Build settings**
3. Click **Edit settings**
4. Configure:
   - **Base directory**: `job-tracker`
   - **Build command**: `npm run build`
   - **Publish directory**: `job-tracker/.next`
   - **Node version**: 18 (under Environment)
5. **Save** changes

### 2. marketing-site (kineticbrandpartners.com) Configuration

1. **Go to Netlify Dashboard** → Select your **marketing-site** site (kineticbrandpartners.com)
2. Navigate to: **Site Settings** → **Build & Deploy** → **Continuous Deployment** → **Build settings**
3. Click **Edit settings**
4. Configure:
   - **Base directory**: `marketing-site`
   - **Build command**: `npm run build`
   - **Publish directory**: `marketing-site/out`
   - **Node version**: 18 (under Environment)
5. **Save** changes

### 3. Verify Environment Variables (job-tracker only)

1. **Go to Netlify Dashboard** → job-tracker site
2. Navigate to: **Site Settings** → **Environment variables**
3. Verify these exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. If missing, add them

### 4. Trigger Deployments

After configuration:
1. Both sites should auto-deploy when you push to `main` branch
2. Or manually trigger deploy: **Deploys** → **Trigger deploy** → **Deploy site**

---

## 📋 What Changed

### Before
- Configuration files were at repository root
- Base directory was unclear/misconfigured

### After
- Each project has its own `netlify.toml` inside its directory:
  - `job-tracker/netlify.toml`
  - `marketing-site/netlify.toml`
- Base directory **must be set in Netlify dashboard** for each site
- Repository structure is now clear and organized

---

## 🏗️ Repository Structure

```
kineticbrandpartners/ (repo root)
├── job-tracker/               ← Netlify Site 1 base directory
│   ├── netlify.toml
│   ├── package.json
│   ├── src/
│   └── ...
├── marketing-site/            ← Netlify Site 2 base directory
│   ├── netlify.toml
│   ├── src/
│   └── ...
├── DEPLOYMENT.md              ← Complete deployment guide
└── README.md
```

---

## ❓ Troubleshooting

### "Base directory does not exist" Error
- **Solution**: Make sure base directory is set in Netlify dashboard (not just netlify.toml)
- Verify spelling: `job-tracker` or `marketing-site` (no leading slash)

### Both Sites Build the Same Project
- **Problem**: You may have only configured one Netlify site
- **Solution**: You need **TWO separate Netlify sites**, each pointing to the same repository but with different base directories

### Build Fails with "Cannot find package.json"
- **Solution**: Verify base directory is set correctly in Netlify dashboard

---

## 📞 Need Help?

See `DEPLOYMENT.md` for comprehensive deployment documentation.

---

**Last Updated**: October 13, 2025
**Action Required**: Configure base directories in Netlify dashboard ✅
