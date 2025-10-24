# Canvas Video Configuration

This document explains how canvas videos work in development vs. production.

## Overview

Canvas videos are **not stored in the git repository** due to file size. Instead:
- **Local Development**: Videos served from `public/assets/canvases/`
- **Production**: Videos hosted on Cloudflare R2 CDN

## Environment Configuration

### `.env.development`
```bash
VITE_USE_LOCAL_ASSETS=true
```
Uses local videos from `public/assets/canvases/` directory

### `.env.production`
```bash
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```
Uses Cloudflare R2 CDN URLs

## How It Works

### 1. Data Layer (`src/data/projects.ts`)
```typescript
import { getCanvasUrl } from '@/utils/assetHelpers';

canvas: getCanvasUrl('beer-fridge.mp4')
```

### 2. URL Resolution (`src/utils/assetHelpers.ts`)
The `getCanvasUrl()` function automatically returns:
- **Dev**: `/assets/canvases/beer-fridge.mp4` → Vite serves from `public/`
- **Production**: `https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4` → CDN

### 3. Component (`src/components/ProjectCanvas.tsx`)
Receives resolved URL and handles loading/fallback chain:
- Video → Album Art → Animated Gradient

## Adding New Canvas Videos

### 1. Local Development
```bash
# Copy video to public directory
cp my-new-video.mp4 public/assets/canvases/
```

### 2. Use in Project Data
```typescript
{
  id: 'my-project',
  canvas: getCanvasUrl('my-new-video.mp4'),
  // ... other fields
}
```

### 3. Upload to Cloudflare R2
```bash
# Use Wrangler CLI or Cloudflare dashboard to upload to the 'joshify-canvas' bucket.
wrangler r2 object put joshify-canvas/assets/canvases/my-new-video.mp4 --file=public/assets/canvases/my-new-video.mp4
```

## Why Videos Don't Show Locally (Before This Fix)

**Before**: All canvas URLs hardcoded to the CDN
```typescript
canvas: 'https://github.com/.../video.mp4'
```

**Problem**: CORS errors in local dev, videos don't load

**After**: Environment-based URL resolution
```typescript
canvas: getCanvasUrl('video.mp4')
```

**Solution**: Returns local path in dev, CDN in production

## Testing

### Local Development
```bash
# Start dev server
npm run dev

# Canvas videos should load from public/assets/canvases/
# Check browser console - no CORS errors
```

### Production Build
```bash
# Build with production env
npm run build

# Preview built app
npm run preview

# Videos should load from Cloudflare R2 CDN
```

## Fallback Chain

If canvas video fails to load:
1. **Video** (from local or CDN)
2. **Album Art** (square aspect ratio, from `public/assets/images/album-art/`)
3. **Animated Gradient** (generated based on project ID)

## File Structure

```
joshify/
├── public/
│   └── assets/
│       ├── canvases/           # Local videos (gitignored)
│       │   ├── beer-fridge.mp4
│       │   ├── did-kansas-win.mp4
│       │   └── ...
│       ├── music/              # Local music (gitignored)
│       └── images/
│           ├── album-art/      # Album art (committed)
│           └── posters/        # Canvas posters (committed)
├── src/
│   ├── utils/
│   │   └── assetHelpers.ts     # URL resolution logic
│   ├── data/
│   │   └── projects.ts         # Uses getCanvasUrl()
│   └── components/
│       └── ProjectCanvas.tsx   # Renders video/fallback
├── .env.development            # VITE_USE_LOCAL_ASSETS=true
└── .env.production             # VITE_USE_LOCAL_ASSETS=false
```

## Notes

- **Environment files** (`.env.development`, `.env.production`) are committed to repo
- **Canvas videos** (`public/assets/canvases/*.mp4`) are NOT committed (gitignored)
- **Music files** (`public/assets/music/*.mp3`) are NOT committed (gitignored)
- **Album art** (`public/assets/images/album-art/*.png`) IS committed (small file size)
- **Canvas posters** (`public/assets/images/posters/*.webp`) IS committed (small file size)
