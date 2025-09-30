# Canvas Video Configuration

This document explains how canvas videos work in development vs. production.

## Overview

Canvas videos are **not stored in the git repository** due to file size. Instead:
- **Local Development**: Videos served from `public/canvases/`
- **Production**: Videos hosted on GitHub Releases CDN

## Environment Configuration

### `.env.development`
```bash
VITE_USE_LOCAL_CANVAS=true
```
Uses local videos from `public/canvases/` directory

### `.env.production`
```bash
VITE_USE_LOCAL_CANVAS=false
```
Uses GitHub Releases CDN URLs

## How It Works

### 1. Data Layer (`src/data/projects.ts`)
```typescript
import { getCanvasUrl } from '@/utils/canvas';

canvas: getCanvasUrl('beer-fridge.mp4')
```

### 2. URL Resolution (`src/utils/canvas.ts`)
The `getCanvasUrl()` function automatically returns:
- **Dev**: `/canvases/beer-fridge.mp4` → Vite serves from `public/`
- **Production**: `https://github.com/.../beer-fridge.mp4` → CDN

### 3. Component (`src/components/ProjectCanvas.tsx`)
Receives resolved URL and handles loading/fallback chain:
- Video → Album Art → Animated Gradient

## Adding New Canvas Videos

### 1. Local Development
```bash
# Copy video to public directory
cp my-new-video.mp4 public/canvases/
```

### 2. Update CDN Map
Edit `src/utils/canvas.ts`:
```typescript
const CDN_URLS: Record<string, string> = {
  'my-new-video.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/my-new-video.mp4',
  // ... other videos
};
```

### 3. Use in Project Data
```typescript
{
  id: 'my-project',
  canvas: getCanvasUrl('my-new-video.mp4'),
  // ... other fields
}
```

### 4. Upload to GitHub Releases
```bash
# Create release or use existing
gh release upload v1.0.8 public/canvases/my-new-video.mp4
```

## Why Videos Don't Show Locally (Before This Fix)

**Before**: All canvas URLs hardcoded to GitHub Releases CDN
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

# Canvas videos should load from public/canvases/
# Check browser console - no CORS errors
```

### Production Build
```bash
# Build with production env
npm run build

# Preview built app
npm run preview

# Videos should load from GitHub Releases CDN
```

## Fallback Chain

If canvas video fails to load:
1. **Video** (from local or CDN)
2. **Album Art** (square aspect ratio, from `public/album-art/`)
3. **Animated Gradient** (generated based on project ID)

## File Structure

```
joshify/
├── public/
│   └── canvases/               # Local videos (gitignored)
│       ├── beer-fridge.mp4
│       ├── did-kansas-win.mp4
│       └── ...
├── src/
│   ├── utils/
│   │   └── canvas.ts           # URL resolution logic
│   ├── data/
│   │   └── projects.ts         # Uses getCanvasUrl()
│   └── components/
│       └── ProjectCanvas.tsx   # Renders video/fallback
├── .env.development            # VITE_USE_LOCAL_CANVAS=true
└── .env.production             # VITE_USE_LOCAL_CANVAS=false
```

## Notes

- **Environment files** (`.env.development`, `.env.production`) are committed to repo
- **Canvas videos** (`public/canvases/*.mp4`) are NOT committed (gitignored)
- **Album art** (`public/album-art/*.png`) IS committed (small file size)
- **CDN URLs** are hardcoded in `canvas.ts` for reliability
