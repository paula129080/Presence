# PWA Icon Installation Guide

## ✅ Icons Generated Successfully

Two app icons have been generated for the Presence PWA:

### Icon URLs (Generated):
1. **192×192 icon**: https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763010401763_2401e39e.webp
2. **512×512 icon**: https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763010403631_827c9d26.webp

---

## 📋 Installation Steps

### Step 1: Create Icons Directory
```bash
mkdir -p public/icons
```

### Step 2: Download & Convert Icons

**Option A: Using Online Converter**
1. Download each icon from the URLs above
2. Convert from WebP to PNG using: https://cloudconvert.com/webp-to-png
3. Rename files:
   - First icon → `icon-192.png`
   - Second icon → `icon-512.png`

**Option B: Using Command Line (if you have ImageMagick)**
```bash
curl -o public/icons/icon-192.webp "https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763010401763_2401e39e.webp"
curl -o public/icons/icon-512.webp "https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763010403631_827c9d26.webp"

convert public/icons/icon-192.webp public/icons/icon-192.png
convert public/icons/icon-512.webp public/icons/icon-512.png
```

### Step 3: Verify File Structure
```
public/
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## ✅ Manifest Updated

The `manifest.json` has been updated to reference:
- `/icons/icon-192.png`
- `/icons/icon-512.png`

---

## 🧪 Testing Installation

### After uploading icons:

1. **Rebuild & Publish**
   - Commit and push changes
   - Rebuild on your hosting platform

2. **Clear Cache**
   - Clear browser cache
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Test on Mobile**

   **Android (Chrome/Edge):**
   - Visit https://presencegroup.net
   - Look for "Install app" banner at bottom
   - Or tap menu (⋮) → "Install app" or "Add to Home screen"

   **iOS (Safari):**
   - Visit https://presencegroup.net
   - Tap Share button (square with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Tap "Add"

4. **Verify PWA Installability**
   - Open Chrome DevTools
   - Go to Application tab → Manifest
   - Check for errors
   - Go to Application tab → Service Workers
   - Verify service worker is registered

---

## 🔍 Troubleshooting

**Install prompt not showing?**
- Ensure HTTPS is working on presencegroup.net
- Check manifest.json loads: https://presencegroup.net/manifest.json
- Verify icons load: https://presencegroup.net/icons/icon-192.png
- Check service worker: DevTools → Application → Service Workers
- Try incognito/private browsing mode

**Icons not loading?**
- Verify files are in `/public/icons/` directory
- Check file names match exactly: `icon-192.png` and `icon-512.png`
- Ensure PNG format (not WebP)
- Clear cache and hard refresh

---

## 📱 Expected Behavior

Once icons are uploaded and deployed:

✅ **Android**: Automatic install banner + manual "Install app" option in menu  
✅ **iOS**: Manual "Add to Home Screen" via Share menu  
✅ **Desktop**: Install icon in address bar (Chrome/Edge)

The PWA will launch in standalone mode without browser UI.
