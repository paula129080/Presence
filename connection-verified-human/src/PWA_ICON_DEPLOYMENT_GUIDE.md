# PWA Icon Deployment Guide

## Current Issue
The PWA manifest.json is configured correctly, but the actual PNG icon files don't exist on the server at:
- `/public/icons/icon-192.png`
- `/public/icons/icon-512.png`

This causes the "NoSuchKey" error and prevents iOS/Android from detecting the PWA.

## Technical Limitation
The development tools cannot write binary PNG files directly to the filesystem. PNG files must be manually downloaded, converted, and uploaded.

## Solution: Manual Icon Upload

### Step 1: Download Generated Icons
Download these generated app icons:
- Icon 1: https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763014709275_b1f02681.webp
- Icon 2: https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763014711284_dca656ec.webp

### Step 2: Convert WebP to PNG
Use one of these methods:

**Option A: Online Converter**
1. Go to https://cloudconvert.com/webp-to-png
2. Upload both WebP files
3. Convert to PNG format
4. Download the PNG files

**Option B: Command Line (ImageMagick)**
```bash
convert icon-1.webp -resize 192x192 icon-192.png
convert icon-2.webp -resize 512x512 icon-512.png
```

**Option C: Photoshop/GIMP**
1. Open WebP files
2. Resize to 192x192 and 512x512
3. Export as PNG

### Step 3: Upload to Server
Upload the converted PNG files to your hosting provider:
- `icon-192.png` → `/public/icons/icon-192.png`
- `icon-512.png` → `/public/icons/icon-512.png`

### Step 4: Rebuild and Deploy
After uploading the icons:
```bash
npm run build
# Deploy the build folder to presencegroup.net
```

### Step 5: Verify Installation
1. Visit https://presencegroup.net on mobile
2. Check manifest: https://presencegroup.net/manifest.json
3. Verify icons load: https://presencegroup.net/icons/icon-192.png
4. Look for "Add to Home Screen" prompt

## Alternative: Use SVG Icons (Temporary)
If you need immediate functionality, the SVG icons in `/public/icons/` can work for some browsers:
- `icon-192.svg`
- `icon-512.svg`

Update manifest.json to use `.svg` instead of `.png` (note: iOS Safari may not support this).

## Verification Checklist
- [ ] PNG files exist at `/public/icons/icon-192.png` and `/public/icons/icon-512.png`
- [ ] manifest.json is accessible at `/manifest.json`
- [ ] Icons load without 404 errors
- [ ] PWA installability detected on iOS Safari and Chrome Android
- [ ] "Add to Home Screen" prompt appears
