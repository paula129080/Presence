# 🌐 HOSTING PLATFORM SETUP GUIDE

## Current Situation

Your application is deployed, but experiencing **partial deployment** where only frontend React components are live, while backend functions, PWA, and domain routing are not active.

---

## 🏗️ Architecture Overview

Your application requires **three deployment layers**:

### 1. Frontend (React/Vite)
- **What:** React components, CSS, JavaScript bundles
- **Status:** ✅ Deploying successfully
- **Evidence:** UI changes (onboarding form, hero section) are live

### 2. Backend (Supabase Edge Functions)
- **What:** Serverless functions for Daily.co, Stripe, etc.
- **Status:** ❌ Not deploying
- **Evidence:** Screen sharing not working, photo upload failing

### 3. PWA Layer (Service Worker)
- **What:** Progressive Web App features
- **Status:** ❌ Not deploying
- **Evidence:** No service worker registration, no install prompt

---

## 🔍 Diagnosis: Why Partial Deployment?

### Scenario A: Famous.ai Deployment Limitation
Famous.ai may be configured to deploy **frontend code only**, not backend functions or build-time assets.

**Solution:** Backend functions may need separate deployment via Supabase CLI.

### Scenario B: Build Configuration
The deployment may be running **dev mode** instead of **production build**.

**Solution:** Ensure `npm run build` runs before deployment.

### Scenario C: Domain Configuration
Both domains may be pointing to the **same deployment**, making domain routing impossible.

**Solution:** Configure platform-level routing or separate deployments.

---

## 🛠️ Setup Instructions by Platform

### If Using Vercel

1. **Frontend Deployment**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Domain Configuration**
   - Add both domains in Vercel dashboard
   - Configure DNS for both domains
   - No special routing needed (code handles it)

4. **Backend Functions**
   Deploy separately via Supabase CLI:
   ```bash
   supabase functions deploy daily-create-room
   ```

### If Using Netlify

1. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**
   Add in Netlify dashboard under Site Settings → Environment Variables

3. **Domain Setup**
   - Add both domains in Netlify
   - Configure DNS
   - Code handles routing automatically

4. **Backend Functions**
   Deploy via Supabase (Netlify functions not used)

### If Using AWS Amplify

1. **Build Configuration**
   Create `amplify.yml`:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

2. **Environment Variables**
   Add in Amplify Console → Environment Variables

3. **Backend Functions**
   Deploy via Supabase CLI

---

## 🔧 Backend Function Deployment

Your backend functions are in Supabase, not your hosting platform.

### Deploy via Supabase CLI

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login**
   ```bash
   supabase login
   ```

3. **Link Project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Deploy Functions**
   ```bash
   supabase functions deploy daily-create-room
   ```

### Deploy via Supabase Dashboard

1. Go to your Supabase project
2. Navigate to Edge Functions
3. Create or update `daily-create-room` function
4. Paste function code
5. Set environment variables (DAILY_API_KEY)
6. Deploy

---

## 🌍 Domain Configuration

### DNS Setup

Both domains should point to your hosting platform:

**For presencejoin.co:**
```
Type: A or CNAME
Name: @
Value: [Your hosting platform IP/domain]
```

**For presencegroup.net:**
```
Type: A or CNAME
Name: @
Value: [Your hosting platform IP/domain]
```

### Platform Configuration

**Important:** Both domains should point to the **same deployment**. The code will handle routing based on `window.location.hostname`.

No need for separate builds or platform-level routing rules.

---

## ✅ Verification Checklist

After setup, verify each layer:

### Frontend Deployment
- [ ] Visit presencejoin.co → Site loads
- [ ] Visit presencegroup.net → Site loads
- [ ] UI changes are visible on both domains

### Backend Functions
- [ ] Test video session creation
- [ ] Check Supabase logs for function invocations
- [ ] Verify screen sharing appears in video UI

### PWA
- [ ] Open DevTools → Application → Service Workers
- [ ] Should see registered worker
- [ ] Check Network tab for manifest.json request

### Domain Routing
- [ ] presencejoin.co → "Become a Host" hidden
- [ ] presencegroup.net → Host features visible
- [ ] Try /admin-dashboard on .co → Should redirect to .net

---

## 🚨 Common Issues

### Issue: Service Worker Not Registering
**Cause:** Build not running VitePWA plugin
**Fix:** Ensure `npm run build` runs, not dev mode

### Issue: Backend Functions Failing
**Cause:** Functions not deployed or env vars missing
**Fix:** Deploy via Supabase CLI, verify env vars

### Issue: Domain Routing Not Working
**Cause:** Both domains serving cached content
**Fix:** Purge CDN cache, wait for DNS propagation

### Issue: Photo Upload 404
**Cause:** Storage bucket not public or wrong env vars
**Fix:** Check Supabase storage policies, verify env vars

---

## 📞 Next Steps

1. **Identify your hosting platform** (Vercel, Netlify, AWS, etc.)
2. **Follow platform-specific setup** above
3. **Deploy backend functions** via Supabase CLI
4. **Test each feature** using verification checklist
5. **Purge CDN cache** if issues persist

All code is ready. The issue is deployment configuration, not code quality.
