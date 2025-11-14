# 🚨 Production Rebuild Required

## Summary
The frontend code is **ready and updated**, but the production deployment has **not been rebuilt** with the latest changes.

---

## What I've Done (Code Updates)

### ✅ Domain Routing
- Updated `DomainGuard.tsx` to route admin features to presencegroup.net
- Modified `HeroSection.tsx` to hide "Become a Host" on presencejoin.co
- Modified `PricingSection.tsx` to hide revenue split on presencejoin.co
- Modified `HostSignupSection.tsx` to only show on presencegroup.net

### ✅ Supabase Backend
- Created `member-photos` storage bucket (public)
- Updated `MemberProfilePhotoStep.tsx` to upload to Supabase storage
- Added error handling and file size validation

### ✅ PWA Configuration
- PWA plugin configured in `vite.config.ts`
- Manifest ready at `public/manifest.json`
- Service worker will generate on build

---

## What You Need To Do

### 1️⃣ Rebuild the Application
```bash
npm install  # Ensure dependencies are current
npm run build  # Generate production build
```

This creates the `dist/` folder with:
- Updated React components
- Service worker (`sw.js`)
- PWA manifest
- All static assets

### 2️⃣ Deploy to Production
Upload the `dist/` folder to your hosting platform:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **Manual**: Upload `dist/` contents to server

### 3️⃣ Configure Platform-Level Domain Routing

**IMPORTANT**: The code handles domain detection, but your hosting platform must route domains correctly.

**Hosting Platform Configuration Needed:**

#### Option A: Separate Deployments (Recommended)
Deploy to two separate projects:
- **presencejoin.co** → Deploy with environment variable `DOMAIN=public`
- **presencegroup.net** → Deploy with environment variable `DOMAIN=admin`

#### Option B: Single Deployment with Redirects
Configure your hosting platform to redirect:
- Admin routes on `.co` → `.net`
- Public routes on `.net` → `.co`

Example Vercel `vercel.json`:
```json
{
  "routes": [
    {
      "src": "/admin-dashboard",
      "headers": { "Location": "https://presencegroup.net/admin-dashboard" },
      "status": 308,
      "has": [{ "type": "host", "value": "presencejoin.co" }]
    }
  ]
}
```

### 4️⃣ Clear CDN/Cache
After deployment, purge all caches:
- Cloudflare: Purge everything
- Vercel: Automatic on deployment
- Netlify: Clear cache in dashboard

### 5️⃣ Verify Deployment
Check these URLs:
- ✅ https://presencejoin.co (should show public site)
- ✅ https://presencejoin.co/manifest.json (should load)
- ✅ https://presencejoin.co/sw.js (should load)
- ✅ https://presencegroup.net/admin-dashboard (should load)

---

## Why This Happened

**I can modify code, but I cannot:**
- Deploy to production servers
- Configure hosting platform settings
- Clear CDN caches
- Trigger production builds

**You need to:**
- Run the build command
- Deploy the built files
- Configure domain routing on your hosting platform

---

## Quick Start Commands

```bash
# 1. Build
npm run build

# 2. Deploy (choose your platform)
vercel --prod
# OR
netlify deploy --prod
# OR
# Upload dist/ folder manually

# 3. Test
open https://presencejoin.co
open https://presencegroup.net/admin-dashboard
```

---

## Need Help?

If deployment fails:
1. Check build logs for errors
2. Verify environment variables are set
3. Confirm DNS is pointing to hosting platform
4. Check hosting platform documentation for domain routing
