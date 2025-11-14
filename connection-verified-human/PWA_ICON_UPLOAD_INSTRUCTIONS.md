# PWA Icon Upload Instructions

## Problem
The PWA manifest.json is configured correctly, but the actual icon files are missing from the `/public/icons/` directory, causing the "NoSuchKey" error and preventing PWA installation.

## Solution: Download and Upload Icons

### Step 1: Download the Generated Icons

**Icon 192x192:**
```
https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763014346264_cb5ba011.webp
```

**Icon 512x512:**
```
https://d64gsuwffb70l.cloudfront.net/691101a50d8aec5ba01757ab_1763014347164_2bbe2f6e.webp
```

### Step 2: Convert WebP to PNG

The generated icons are in WebP format. Convert them to PNG:

**Option A: Using Online Converter**
1. Go to https://cloudconvert.com/webp-to-png
2. Upload each WebP file
3. Convert to PNG
4. Download the PNG files

**Option B: Using Command Line (ImageMagick)**
```bash
# Install ImageMagick if needed
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Convert
magick icon-192.webp icon-192.png
magick icon-512.webp icon-512.png
```

### Step 3: Create Directory and Upload

In your project root:

```bash
# Create icons directory
mkdir -p public/icons

# Place the converted PNG files
# - public/icons/icon-192.png
# - public/icons/icon-512.png
```

### Step 4: Verify File Structure

Your `/public/` directory should look like:
```
public/
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── manifest.json
├── placeholder.svg
└── robots.txt
```

### Step 5: Rebuild and Deploy

```bash
npm run build
# Deploy to your hosting provider
```

## Verification

After deployment, test these URLs:
- https://presencegroup.net/manifest.json ✓
- https://presencegroup.net/icons/icon-192.png ✓
- https://presencegroup.net/icons/icon-512.png ✓

## Testing PWA Installation

**Android (Chrome):**
1. Visit https://presencegroup.net
2. Look for "Add to Home Screen" prompt
3. Or: Menu → "Install app"

**iOS (Safari):**
1. Visit https://presencegroup.net
2. Tap Share button
3. Scroll down to "Add to Home Screen"

## Troubleshooting

If icons still don't load:
- Clear browser cache
- Check file permissions (644 for files, 755 for directories)
- Verify PNG format (not WebP)
- Check file sizes are reasonable (< 1MB each)
