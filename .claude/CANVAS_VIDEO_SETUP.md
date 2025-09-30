# Canvas Video Setup - Implementation Summary

**Date**: September 30, 2025
**Status**: ✅ Complete

## Problem Statement

Canvas videos were hardcoded to GitHub Releases CDN URLs, causing:
- **Local Dev**: CORS errors, videos failed to load
- **Fallback Behavior**: Always fell back to album art → gradient
- **Developer Experience**: Couldn't test canvas videos locally

## Solution

Environment-based URL resolution system that automatically serves:
- **Development**: Local videos from `public/canvases/`
- **Production**: CDN videos from GitHub Releases

## Implementation

### 1. Environment Configuration Files

**`.env.development`**
```bash
VITE_USE_LOCAL_CANVAS=true
```

**`.env.production`**
```bash
VITE_USE_LOCAL_CANVAS=false
```

### 2. TypeScript Type Definitions

**`src/vite-env.d.ts`** - Declares environment variable types
```typescript
interface ImportMetaEnv {
    readonly VITE_USE_LOCAL_CANVAS?: string;
}
```

### 3. Canvas URL Utility

**`src/utils/canvas.ts`** - Core resolution logic
```typescript
export const getCanvasUrl = (filename: string | null): string | null => {
    const useLocal = import.meta.env.VITE_USE_LOCAL_CANVAS === 'true';
    return useLocal ? `/canvases/${filename}` : CDN_URLS[filename];
};
```

### 4. Data Layer Integration

**`src/data/projects.ts`** - Updated all canvas references
```typescript
import { getCanvasUrl } from '@/utils/canvas';

canvas: getCanvasUrl('beer-fridge.mp4')  // Was: hardcoded CDN URL
```

## Files Modified

1. **Created**:
   - `.env.development` - Dev environment config
   - `.env.production` - Production environment config
   - `src/utils/canvas.ts` - URL resolution utility
   - `src/vite-env.d.ts` - TypeScript environment types
   - `README-CANVAS.md` - Developer documentation

2. **Updated**:
   - `src/data/projects.ts` - 6 canvas URL replacements

## Verification

✅ **TypeScript**: Zero errors (`npm run type-check`)
✅ **Linting**: 1 warning (acceptable, unused interface name)
✅ **Build**: Successful production build
✅ **CI Pipeline**: All checks pass

## How It Works

### Local Development
```
npm run dev
→ Vite loads .env.development
→ VITE_USE_LOCAL_CANVAS=true
→ getCanvasUrl('video.mp4') returns '/canvases/video.mp4'
→ Vite serves from public/canvases/
→ Videos load without CORS errors ✅
```

### Production Build
```
npm run build
→ Vite loads .env.production
→ VITE_USE_LOCAL_CANVAS=false
→ getCanvasUrl('video.mp4') returns 'https://github.com/.../video.mp4'
→ Videos load from CDN ✅
```

## Testing Locally

1. **Start dev server**: `npm run dev`
2. **Navigate to project with canvas**: e.g., "Did Kansas Win?"
3. **Expected behavior**:
   - Video loads from local `public/canvases/` directory
   - No CORS errors in console
   - Video plays smoothly

## Adding New Canvas Videos

1. **Add file locally**: `cp video.mp4 public/canvases/`
2. **Update CDN map**: Add to `CDN_URLS` in `src/utils/canvas.ts`
3. **Use in project**: `canvas: getCanvasUrl('video.mp4')`
4. **Upload to GitHub**: `gh release upload v1.0.8 public/canvases/video.mp4`

## Fallback Chain

If canvas video fails (any environment):
1. **Video** (local or CDN)
2. **Album Art** (square aspect ratio)
3. **Animated Gradient** (generated from project ID)

## Notes

- Environment files (`.env.*`) are **committed** to repository
- Canvas videos (`public/canvases/*.mp4`) are **gitignored**
- Album art (`public/album-art/*.png`) is **committed** (smaller files)
- CDN URLs are centralized in `canvas.ts` for easy updates

## Future Enhancements

- [ ] Automatic CDN URL generation based on release version
- [ ] Video optimization pipeline for smaller file sizes
- [ ] Preload optimization for faster canvas display
- [ ] Support for .webm format with better compression
