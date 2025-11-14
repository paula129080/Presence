# DEPLOYMENT INSTRUCTIONS FOR PRESENCE

## ⚠️ IMPORTANT: What This System Can and Cannot Do

### ✅ What Has Been Done (Code-Level Configuration)
- ✅ Domain routing logic implemented in code
- ✅ PWA configuration in vite.config.ts
- ✅ Service worker setup complete
- ✅ Storage bucket created in Supabase
- ✅ Photo upload code implemented
- ✅ Domain-specific UI hiding (host features, revenue splits)

### ❌ What MUST Be Done on Your Hosting Platform
- ❌ Deploy the code to production (rebuild required)
- ❌ Configure DNS/domain routing at hosting level
- ❌ Set up HTTPS certificates for both domains
- ❌ Configure CDN and cache purging
- ❌ Set environment variables on hosting platform

---

## STEP 1: Deploy Code to Production

### If Using Vercel:
```bash
# In your project directory
git add .
git commit -m "Domain routing and PWA configuration"
git push origin main

# Or manual deploy
vercel --prod
```

### If Using Netlify:
```bash
# Push to git
git add .
git commit -m "Domain routing and PWA configuration"
git push origin main

# Or use Netlify CLI
netlify deploy --prod
```

---

## STEP 2: Configure Domain Routing on Hosting Platform

### For Vercel:
1. Go to Project Settings → Domains
2. Add both domains:
   - `presencejoin.co`
   - `presencegroup.net`
3. Both should point to the SAME project
4. The code will handle routing internally

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add both domains:
   - `presencejoin.co`
   - `presencegroup.net`
3. Both should point to the SAME site
4. The code will handle routing internally

### DNS Configuration (Already Done):
- Both domains should have A/CNAME records pointing to your hosting provider
- Verify with: `dig presencejoin.co` and `dig presencegroup.net`

---

## STEP 3: Verify PWA Deployment

### Check Service Worker:
1. Visit `https://presencejoin.co` in Chrome
2. Open DevTools → Application → Service Workers
3. Should see "Service Worker: Activated and running"

### Check Manifest:
1. DevTools → Application → Manifest
2. Should show "Presence - Real Human Connection"
3. Icons should load from CDN

### Test on iPhone:
1. Open Safari
2. Visit `https://presencejoin.co`
3. Tap Share → Add to Home Screen
4. Should show Presence icon and name

---

## STEP 4: Verify Photo Upload

### Test Upload Flow:
1. Go to member onboarding
2. Upload a photo (< 5MB)
3. Check Supabase dashboard → Storage → member-photos
4. Photo should appear with public URL

### If Upload Fails:
Check Supabase Storage Policies:
```sql
-- Run in Supabase SQL Editor
SELECT * FROM storage.objects WHERE bucket_id = 'member-photos';
SELECT * FROM storage.buckets WHERE name = 'member-photos';
```

Bucket should be public and have these policies:
- INSERT: authenticated users can upload
- SELECT: public can view

---

## STEP 5: Test Domain Routing

### Test Public Domain (presencejoin.co):
- ✅ Should show: Home, Plans, How It Works, etc.
- ❌ Should NOT show: "Become a Host" button
- ❌ Should NOT show: Revenue split on pricing
- ❌ Should redirect admin routes to presencegroup.net

### Test Admin Domain (presencegroup.net):
- ✅ Should show: Host Dashboard, Admin Dashboard, etc.
- ✅ Should show: "Become a Host" option
- ❌ Should redirect public routes to presencejoin.co

### Test Redirects:
```bash
# Should redirect to presencegroup.net
curl -I https://presencejoin.co/admin-dashboard

# Should redirect to presencejoin.co
curl -I https://presencegroup.net/plans
```

---

## STEP 6: Clear Cache

### Vercel:
- Automatic cache invalidation on deploy
- Or manually: Project Settings → Deployments → Redeploy

### Netlify:
```bash
netlify deploy --prod --clear-cache
```

### CloudFlare (if using):
1. Go to Caching → Configuration
2. Click "Purge Everything"

---

## VERIFICATION CHECKLIST

### Domain Routing:
- [ ] presencejoin.co loads public site
- [ ] presencegroup.net loads admin site
- [ ] Admin routes on .co redirect to .net
- [ ] Public routes on .net redirect to .co
- [ ] "Become a Host" hidden on .co
- [ ] Revenue split hidden on .co pricing

### PWA:
- [ ] Service worker registers on both domains
- [ ] Manifest loads correctly
- [ ] "Add to Home Screen" works on iPhone
- [ ] Icons display correctly

### Photo Upload:
- [ ] Upload completes without errors
- [ ] Photo appears in UI after upload
- [ ] Photo stored in member-photos bucket
- [ ] Public URL accessible

---

## TROUBLESHOOTING

### "Old site still showing":
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+F5)
- Check deployment status on hosting platform
- Verify latest commit is deployed
- Purge CDN cache

### "Service worker not registering":
- Must be served over HTTPS
- Check console for errors
- Verify vite-plugin-pwa is in package.json
- Check manifest.json is accessible

### "Photo upload fails":
- Check Supabase storage bucket exists
- Verify bucket is public
- Check CORS settings in Supabase
- Verify file size < 5MB

### "Domain routing not working":
- Check both domains point to same deployment
- Verify DNS propagation (can take 24-48 hours)
- Check browser console for redirect errors
- Test in incognito mode

---

## CONTACT

If deployment fails after following these steps, provide:
1. Hosting platform (Vercel/Netlify/Other)
2. Error messages from browser console
3. Deployment logs from hosting platform
4. Screenshot of domain configuration
