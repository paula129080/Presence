# How to Deploy the Complete Application RIGHT NOW

## Step-by-Step Deployment Guide

### Step 1: Deploy Supabase Backend Functions

Open your terminal and run:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to your Supabase account
supabase login

# Link to your project (find project ref in Supabase dashboard)
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the updated daily-create-room function
supabase functions deploy daily-create-room

# Deploy other functions
supabase functions deploy stripe-create-checkout
supabase functions deploy stripe-webhook
```

**This will activate screen sharing and other backend features.**

### Step 2: Verify Storage Bucket Configuration

1. Go to Supabase Dashboard → Storage
2. Find bucket: `member-photos`
3. Verify it's set to **Public**
4. Check policies allow:
   - INSERT for authenticated users
   - SELECT for public

### Step 3: Build with PWA Enabled

In your project root, run:

```bash
# Clean previous builds
rm -rf dist

# Build with PWA
npm run build

# Verify service worker was generated
ls dist/sw.js
ls dist/manifest.json
```

If `sw.js` exists, PWA is working.

### Step 4: Deploy to Your Hosting Platform

#### If using Netlify:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### If using Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### If using Famous.ai:
1. Push code to your repository
2. Click "Publish" or "Deploy" in Famous.ai dashboard
3. Wait for build to complete
4. Verify deployment URL

### Step 5: Configure Domain Routing

#### Option A: Platform-Level (Recommended)
Configure your hosting platform to:
- Point `presencejoin.co` → your deployment
- Point `presencegroup.net` → same deployment
- Let the app handle routing internally

#### Option B: DNS-Level
If you need separate deployments:
1. Deploy to two different URLs
2. Point each domain via DNS
3. Set environment variable `VITE_DOMAIN` differently for each

### Step 6: Set Environment Variables

In your hosting platform dashboard, set:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_DAILY_API_KEY=your-daily-key
```

**Then redeploy after setting these.**

### Step 7: Clear CDN Cache

In your hosting platform:
- Find "Clear Cache" or "Purge CDN"
- Click it
- Wait 2-5 minutes

### Step 8: Test Everything

Visit both domains and test:

1. **Domain Routing**
   - Go to `presencejoin.co/admin` → should redirect
   - Go to `presencegroup.net/admin` → should work

2. **PWA**
   - Open DevTools → Application → Service Workers
   - Should see registered worker
   - Should see "Install App" prompt

3. **Photo Upload**
   - Go to member onboarding
   - Upload a photo
   - Check Supabase Storage → should see file

4. **Screen Sharing**
   - Start a video session
   - Look for screen share button
   - Should be enabled

## Troubleshooting

### "Service Worker Not Registering"
- Check HTTPS (required for PWA)
- Verify `sw.js` is in `dist/` folder
- Check browser console for errors
- Try incognito mode

### "Photo Upload Returns 200 But No File"
- Check Supabase environment variables are set
- Verify storage bucket exists and is public
- Check browser network tab for actual request
- Verify Supabase client is initialized

### "Screen Sharing Button Missing"
- Verify backend function deployed: `supabase functions list`
- Check function logs: `supabase functions logs daily-create-room`
- Verify Daily.co API key is set
- Test room creation directly

### "Domain Routing Not Working"
- Check both domains point to same deployment
- Verify no CDN caching issues
- Check browser console for routing errors
- Try hard refresh (Ctrl+Shift+R)

## Quick Verification Commands

```bash
# Check if backend functions are deployed
supabase functions list

# Check function logs
supabase functions logs daily-create-room --tail

# Test local build
npm run build && npm run preview

# Check service worker locally
open http://localhost:4173
# Then: DevTools → Application → Service Workers
```

## Summary

All code is ready. You just need to:
1. Deploy backend functions via Supabase CLI
2. Build with PWA enabled
3. Deploy to hosting platform with env vars set
4. Clear CDN cache
5. Test

**This should take 10-15 minutes total.**
