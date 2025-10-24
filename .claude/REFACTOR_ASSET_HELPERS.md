# Asset Helpers Refactor - Complete Implementation Plan

**Status**: 🟡 READY FOR IMPLEMENTATION
**Created**: October 24, 2025
**Estimated Time**: 30-45 minutes
**Risk Level**: Low (pure refactor, no breaking changes)

---

## Executive Summary

This refactor eliminates code duplication, simplifies configuration, and organizes assets with consistent local/CDN structure.

### Improvements
- ✅ **60 lines → 35 lines** (42% code reduction via DRY principle)
- ✅ **4 env vars → 2 env vars** (50% configuration reduction)
- ✅ **Consistent structure** (local mirrors CDN paths)
- ✅ **Poster images stay local** (no CDN needed for small files)
- ✅ **Album art & posters treated equally** (both local, both Vite-optimized)

### Key Decisions Made
1. **Consolidate env vars**: `VITE_USE_LOCAL_CANVAS` + `VITE_USE_LOCAL_MUSIC` → `VITE_USE_LOCAL_ASSETS`
2. **Single CDN base URL**: `VITE_CANVAS_CDN_URL` + `VITE_MUSIC_CDN_URL` → `VITE_ASSET_CDN_BASE_URL`
3. **Keep posters local**: Small files don't benefit from CDN, stay local with album art
4. **Reorganize local assets**: Create `public/assets/` parent folder for better organization
5. **DRY implementation**: Generic `getAssetUrl()` function with configuration-driven paths

---

## Phase 1: Code Refactoring

### 1.1 Rename Helper File

**Action**: Rename file
**From**: `src/utils/canvas.ts`
**To**: `src/utils/assetHelpers.ts`

**Reason**: File contains music helpers too, not just canvas. "assetHelpers" is more accurate.

---

### 1.2 Refactor Helper Functions

**File**: `src/utils/assetHelpers.ts`

**Replace entire file contents with**:

```typescript
/**
 * Asset URL resolver - returns local path in dev, CDN URL in production
 * Handles large assets (videos, music) that benefit from CDN delivery
 *
 * Small assets (album art, posters) remain local and don't use these helpers
 */

type AssetType = 'canvas' | 'music';

/**
 * Generic asset URL resolver with environment-aware routing
 * @param filename - Asset filename (e.g., 'beer-fridge.mp4')
 * @param assetType - Type of asset (canvas video or music file)
 * @returns Local path in dev, CDN URL in production, or null if filename is null
 */
const getAssetUrl = (filename: string | null, assetType: AssetType): string | null => {
    if (!filename) return null;

    // Configuration: CDN paths for each asset type
    const assetConfig: Record<AssetType, { path: string }> = {
        canvas: { path: 'assets/canvases' },
        music: { path: 'assets/music' }
    };

    const config = assetConfig[assetType];
    const useLocal = import.meta.env.VITE_USE_LOCAL_ASSETS === 'true';

    if (useLocal) {
        // Development: local public folder
        return `/${config.path}/${filename}`;
    }

    // Production: Cloudflare R2 CDN
    const cdnBaseUrl = import.meta.env.VITE_ASSET_CDN_BASE_URL;

    if (!cdnBaseUrl) {
        console.error('VITE_ASSET_CDN_BASE_URL environment variable is not set');
        return null;
    }

    return `${cdnBaseUrl}/${config.path}/${filename}`;
};

// Public API - maintains existing function names for backward compatibility
export const getCanvasUrl = (filename: string | null): string | null =>
    getAssetUrl(filename, 'canvas');

export const getMusicUrl = (filename: string | null): string | null =>
    getAssetUrl(filename, 'music');

/**
 * Get canvas poster URL - always local (small files don't need CDN)
 * @param filename - Canvas video filename (e.g., 'beer-fridge.mp4')
 * @returns Local poster path or null
 */
export const getCanvasPosterUrl = (filename: string | null): string | null => {
    if (!filename) return null;
    // Remove .mp4 extension and add -poster.webp
    const posterName = filename.replace('.mp4', '-poster.webp');
    return `/assets/images/posters/${posterName}`;
};
```

**Key Changes**:
- Generic `getAssetUrl()` function eliminates duplication
- Configuration object makes it easy to add new asset types
- Poster helper is simple (no environment logic - always local)
- All existing function signatures preserved (no breaking changes)

---

### 1.3 Update Data File

**File**: `src/data/projects.ts`

**Change 1 - Update import (line 11)**:

**From**:
```typescript
import { getCanvasUrl, getMusicUrl } from '@/utils/canvas';
```

**To**:
```typescript
import { getCanvasUrl, getMusicUrl, getCanvasPosterUrl } from '@/utils/assetHelpers';
```

**Change 2 - Remove local helper function (lines 14-19)**:

**Delete these lines**:
```typescript
// Helper function to get canvas poster URL
const getCanvasPosterUrl = (filename: string | null): string | null => {
    if (!filename) return null;
    // Remove .mp4 extension and add -poster.webp
    const posterName = filename.replace('.mp4', '-poster.webp');
    return `/canvases/posters/${posterName}`;
};
```

**No other changes needed** - all function calls remain the same.

---

### 1.4 Update TypeScript Environment Types

**File**: `src/vite-env.d.ts`

**Find the `ImportMetaEnv` interface and update**:

**From**:
```typescript
interface ImportMetaEnv {
  readonly VITE_USE_LOCAL_CANVAS: string;
  readonly VITE_USE_LOCAL_MUSIC: string;
  readonly VITE_CANVAS_CDN_URL: string;
  readonly VITE_MUSIC_CDN_URL: string;
  // ... other vars
}
```

**To**:
```typescript
interface ImportMetaEnv {
  readonly VITE_USE_LOCAL_ASSETS: string;
  readonly VITE_ASSET_CDN_BASE_URL: string;
  // ... other vars
}
```

---

## Phase 2: Environment Configuration

### 2.1 Update Development Environment

**File**: `.env.development`

**Replace entire file with**:
```env
# Local development environment
# Asset loading - use local files in development
VITE_USE_LOCAL_ASSETS=true
```

---

### 2.2 Update Production Environment

**File**: `.env.production`

**Replace entire file with**:
```env
# Production environment
# Asset loading - use Cloudflare R2 CDN in production
VITE_USE_LOCAL_ASSETS=false

# Cloudflare R2 CDN base URL (no trailing slash)
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```

---

### 2.3 Update Railway Environment Variables

**Action**: Update Railway dashboard environment variables

**Remove**:
- `VITE_USE_LOCAL_CANVAS`
- `VITE_USE_LOCAL_MUSIC`
- `VITE_CANVAS_CDN_URL`
- `VITE_MUSIC_CDN_URL`

**Add**:
- `VITE_USE_LOCAL_ASSETS=false`
- `VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev`

**URL**: Go to Railway project settings → Variables tab

---

## Phase 3: Local File Reorganization

### 3.1 New Directory Structure

**Target Structure**:
```
public/
├── assets/                           # NEW parent folder
│   ├── canvases/                     # MOVED from public/canvases/
│   │   ├── api-engine-optimization.mp4
│   │   ├── beer-fridge.mp4
│   │   └── [... 11 more videos ...]
│   ├── music/                        # MOVED from public/music/
│   │   └── I'm a Jayhawk.mp3
│   └── images/                       # NEW organized images folder
│       ├── album-art/                # MOVED from public/album-art/
│       │   ├── api-engine-optimization.png
│       │   ├── beer-fridge.png
│       │   └── [... 11 more images ...]
│       └── posters/                  # MOVED from public/canvases/posters/
│           ├── api-engine-optimization-poster.webp
│           ├── beer-fridge-poster.webp
│           └── [... 11 more posters ...]
├── favicon.svg                       # UNCHANGED
├── joshify-logo-icon-only.png       # UNCHANGED
├── joshify-logo-icon-only.svg       # UNCHANGED
└── images/                           # UNCHANGED (other images)
```

---

### 3.2 File Move Commands

**Execute these bash commands in order**:

```bash
# Navigate to project root
cd /home/josh/www/projects/joshify

# Create new structure
mkdir -p public/assets/images

# Move directories (IMPORTANT: These commands are exact, do not modify)
mv public/canvases public/assets/
mv public/music public/assets/
mv public/album-art public/assets/images/
mv public/assets/canvases/posters public/assets/images/

# Clean up old backup directories (safe to delete)
rm -rf public/canvases-backup
rm -rf public/canvases-optimized

# Verify new structure
ls -la public/assets/
ls -la public/assets/canvases/
ls -la public/assets/music/
ls -la public/assets/images/
ls -la public/assets/images/album-art/
ls -la public/assets/images/posters/
```

**Expected Result**:
- All 13 canvas videos in `public/assets/canvases/`
- Music file in `public/assets/music/`
- All 12 album art PNGs in `public/assets/images/album-art/`
- All 13 poster WebP files in `public/assets/images/posters/`

---

### 3.3 Update .gitignore

**File**: `.gitignore`

**Find and replace these sections**:

**FROM**:
```gitignore
# Canvas videos (hosted on Cloudflare R2)
public/canvases/*.mp4
public/canvases/*.webm
public/canvases/*.mov
public/canvases/*.avi

public/canvases-optimized/
public/canvases-backup/

# Music files
public/music/
```

**TO**:
```gitignore
# Canvas videos (hosted on Cloudflare R2)
public/assets/canvases/*.mp4
public/assets/canvases/*.webm
public/assets/canvases/*.mov
public/assets/canvases/*.avi

# Music files (hosted on Cloudflare R2)
public/assets/music/
```

---

## Phase 4: Cloudflare R2 Migration

### 4.1 Authentication

**Option A: Interactive Login (Recommended)**:
```bash
wrangler login
# Opens browser to authenticate with Cloudflare
```

**Option B: API Token**:
```bash
export CLOUDFLARE_API_TOKEN="your_token_here"
# Get token from: https://dash.cloudflare.com/profile/api-tokens
# Required permissions: Account.R2 Storage Read & Write
```

---

### 4.2 Verify Current State

**Check what's currently in the bucket**:
```bash
wrangler r2 object list joshify-canvas
```

**Expected output**: 13 video files at root level:
- api-engine-optimization.mp4
- beer-fridge.mp4
- democracy-engine.mp4
- did-kansas-win.mp4
- election-data-pipeline.mp4
- healthcare-api-extensions.mp4
- healthcare-etl.mp4
- joshify.mp4
- law-firm-startup-operations.mp4
- medigap-integration.mp4
- mobile-api-rebuild.mp4
- startup-technology-infrastructure.mp4
- wichitaradar.mp4

---

### 4.3 Target CDN Structure

**New Organization**:
```
cdn.joshify.dev/
└── assets/
    ├── canvases/
    │   ├── api-engine-optimization.mp4
    │   ├── beer-fridge.mp4
    │   ├── democracy-engine.mp4
    │   ├── did-kansas-win.mp4
    │   ├── election-data-pipeline.mp4
    │   ├── healthcare-api-extensions.mp4
    │   ├── healthcare-etl.mp4
    │   ├── joshify.mp4
    │   ├── law-firm-startup-operations.mp4
    │   ├── medigap-integration.mp4
    │   ├── mobile-api-rebuild.mp4
    │   ├── startup-technology-infrastructure.mp4
    │   └── wichitaradar.mp4
    └── music/
        └── (ready for future music files)
```

**URL Examples**:
- Before: `https://cdn.joshify.dev/beer-fridge.mp4`
- After: `https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4`

---

### 4.4 Manual Migration via Cloudflare Web UI

**IMPORTANT**: Complete these steps in order. Do not deploy code changes until AFTER R2 migration is complete and verified.

---

**Step 1: Access Cloudflare R2 Dashboard**

1. Navigate to the Cloudflare dashboard: https://dash.cloudflare.com
2. Log in with your Cloudflare account credentials
3. In the left sidebar, click **R2** (under "Storage")
4. Click on the **joshify-canvas** bucket to open it
5. You should see 13 MP4 video files at the root level (no folders)

---

**Step 2: Download All Videos as Backup**

**⚠️ CRITICAL**: Create local backups before making any changes to R2.

1. Create a backup folder on your computer (e.g., Desktop/r2-migration-backup)
2. For each of the 13 videos, download them one by one:
   - Click the **•••** (three dots) menu next to each file
   - Select **Download**
   - Save to your backup folder

**Videos to download** (verify you have all 13):
- api-engine-optimization.mp4
- beer-fridge.mp4
- democracy-engine.mp4
- did-kansas-win.mp4
- election-data-pipeline.mp4
- healthcare-api-extensions.mp4
- healthcare-etl.mp4
- joshify.mp4
- law-firm-startup-operations.mp4
- medigap-integration.mp4
- mobile-api-rebuild.mp4
- startup-technology-infrastructure.mp4
- wichitaradar.mp4

**Verification**: Your backup folder should contain 13 MP4 files totaling approximately 17MB.

---

**Step 3: Upload Videos to New Folder Structure**

Now we'll upload the same videos to the new `assets/canvases/` folder path.

1. In the R2 bucket view, click the **Upload** button (top right)
2. In the upload dialog:
   - **Destination Path**: Enter `assets/canvases/` (include trailing slash)
   - **Files**: Click "Select from computer" and select all 13 MP4 files from your backup folder
   - Verify the preview shows: `assets/canvases/video-name.mp4` for each file
3. Click **Upload** to start the upload
4. Wait for all 13 files to finish uploading (progress bar will show completion)
5. Click **Close** when done

**Note**: R2 will create the `assets/canvases/` "folder" automatically as a path prefix.

---

**Step 4: Verify New Structure Exists**

1. In the R2 bucket view, you should now see:
   - The original 13 MP4 files at the root level (to be deleted later)
   - A new **assets/** folder/prefix
2. Click on **assets/** to open it
3. You should see a **canvases/** subfolder
4. Click on **canvases/** to open it
5. Verify all 13 MP4 files are present in this location

**Expected structure**:
```
joshify-canvas/
├── assets/
│   └── canvases/
│       ├── api-engine-optimization.mp4
│       ├── beer-fridge.mp4
│       ├── [... 11 more videos ...]
│       └── wichitaradar.mp4
└── [13 old root-level MP4 files - to be deleted]
```

---

**Step 5: Test New CDN URLs Work**

Before deleting the old files, verify the new URLs are accessible.

**Open Terminal/Command Prompt and run these commands**:
```bash
# Test a few videos load from new paths
curl -I https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4
curl -I https://cdn.joshify.dev/assets/canvases/joshify.mp4
curl -I https://cdn.joshify.dev/assets/canvases/did-kansas-win.mp4

# Each should return:
# - HTTP/2 200
# - server: cloudflare
# - cf-cache-status: MISS (first request) or HIT (cached)
```

**Alternative browser test** (if you don't have curl):
1. Open a new browser tab
2. Navigate to: `https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4`
3. The video should start playing (or download)
4. Repeat for 2-3 other videos to confirm

**⚠️ DO NOT PROCEED** if any of these URLs return 404 or fail to load!

---

**Step 6: Delete Old Root-Level Files**

**⚠️ DANGER ZONE**: Only proceed after Step 5 verification is 100% successful!

1. In the R2 bucket view, navigate back to the root level (click "joshify-canvas" in breadcrumb)
2. You'll see the old 13 MP4 files at root level (no folder prefix)
3. For each of the 13 root-level videos:
   - Click the checkbox next to the file
   - After selecting all 13 root-level videos, click **Delete** button (top right)
   - In the confirmation dialog, type the bucket name: `joshify-canvas`
   - Click **Delete** to confirm

**Alternative** (delete one by one if bulk delete isn't available):
- Click **•••** menu next to each root-level video
- Select **Delete**
- Confirm deletion

**Verification**: After deletion, the bucket should ONLY show the `assets/` folder. No MP4 files should appear at the root level.

---

**Step 7: Create Music Folder Placeholder (Optional)**

R2 doesn't have true folders, but you can create a placeholder file to make the `assets/music/` path visible.

1. On your computer, create a small text file named `.gitkeep` containing the text: `placeholder`
2. In the R2 bucket view, click **Upload**
3. In the upload dialog:
   - **Destination Path**: Enter `assets/music/`
   - **Files**: Select your `.gitkeep` file
   - Verify preview shows: `assets/music/.gitkeep`
4. Click **Upload**

**Why**: This creates the `assets/music/` folder structure, making it ready for future music files.

---

**Step 8: Verify Final Bucket State**

1. In the R2 bucket view (root level), you should see:
   - **assets/** folder (ONLY this should be visible)
   - NO root-level MP4 files

2. Navigate into **assets/** → you should see:
   - **canvases/** folder (13 videos)
   - **music/** folder (.gitkeep placeholder)

3. Count the files in **assets/canvases/**:
   - Should be exactly 13 MP4 files

**Test old URLs return 404** (confirming deletion worked):
```bash
# Should return 404 errors
curl -I https://cdn.joshify.dev/beer-fridge.mp4
curl -I https://cdn.joshify.dev/joshify.mp4
```

---

**Step 9: Keep Backups Temporarily**

**DO NOT delete your local backup folder yet!**

- Keep the backup folder on your computer for at least 24 hours after deployment
- Only delete backups after production site is verified working correctly
- Location: The folder you created in Step 2 with all 13 MP4 files

**Backup retention**: Keep until production verification is complete (see Phase 6.4)

---

## Phase 5: Documentation Updates

### 5.1 Update CLAUDE.md

**File**: `.claude/CLAUDE.md`

**Find and replace**:

**Section: "Environment Variables" (around line 122)**

**FROM**:
````markdown
### Environment Variables
```bash
# .env.development
VITE_USE_LOCAL_CANVAS=true

# .env.production
VITE_USE_LOCAL_CANVAS=false
VITE_CANVAS_CDN_URL=https://cdn.joshify.dev
```
````

**TO**:
````markdown
### Environment Variables
```bash
# .env.development
VITE_USE_LOCAL_ASSETS=true

# .env.production
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```
````

**Section: "Asset Management" (around line 108)**

**FROM**:
````markdown
### Canvas Videos
- **Local Dev**: `public/canvases/*.mp4` (gitignored)
- **Production**: Cloudflare R2 CDN (`https://cdn.joshify.dev/`)
````

**TO**:
````markdown
### Canvas Videos
- **Local Dev**: `public/assets/canvases/*.mp4` (gitignored)
- **Production**: Cloudflare R2 CDN (`https://cdn.joshify.dev/assets/canvases/`)

### Canvas Posters
- **Local Only**: `public/assets/images/posters/*.webp` (small files, Vite-optimized)

### Album Art
- **Local Only**: `public/assets/images/album-art/*.png` (converted to WebP at build)
````

---

### 5.2 Update PLANNING.md

**File**: `.claude/PLANNING.md`

**Find section: "Asset Strategy" (around line 189)**

**Replace entire section with**:

```markdown
## Asset Strategy

### Asset Classification

**Local (Vite-optimized, served by Railway)**:
- **Album Art**: `public/assets/images/album-art/*.png`
  - Auto-converted to WebP at build time
  - ~50-150KB each after optimization
  - Content-hashed filenames for cache busting
- **Canvas Posters**: `public/assets/images/posters/*.webp`
  - Generated by `scripts/generate-poster-frames.sh`
  - ~50-200KB each
  - First frame of canvas video for instant visual feedback

**CDN (Cloudflare R2)**:
- **Canvas Videos**: `assets/canvases/*.mp4`
  - 600KB - 1.7MB each
  - 9:16 vertical format
  - H.264 encoding, FastStart enabled
- **Music Files**: `assets/music/*.mp3` (future)
  - 2-5MB each (estimated)
  - MP3 format, 320kbps

### Environment-Based URLs

**Development** (`VITE_USE_LOCAL_ASSETS=true`):
```typescript
getCanvasUrl('video.mp4')        → '/assets/canvases/video.mp4'
getMusicUrl('song.mp3')          → '/assets/music/song.mp3'
getCanvasPosterUrl('video.mp4')  → '/assets/images/posters/video-poster.webp'
```

**Production** (`VITE_USE_LOCAL_ASSETS=false`, `VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev`):
```typescript
getCanvasUrl('video.mp4')        → 'https://cdn.joshify.dev/assets/canvases/video.mp4'
getMusicUrl('song.mp3')          → 'https://cdn.joshify.dev/assets/music/song.mp3'
getCanvasPosterUrl('video.mp4')  → '/assets/images/posters/video-poster.webp' (always local)
```
```

---

### 5.3 Update CDN_SETUP.md

**File**: `.claude/CDN_SETUP.md`

**Find section: "Uploaded Videos" (around line 84)**

**Replace with**:
````markdown
### Current R2 Structure

**Bucket**: `joshify-canvas`
**CDN Domain**: `https://cdn.joshify.dev`

**Folder Organization**:
```
cdn.joshify.dev/
└── assets/
    ├── canvases/          # 13 videos (17MB total)
    │   ├── api-engine-optimization.mp4
    │   ├── beer-fridge.mp4
    │   ├── democracy-engine.mp4
    │   ├── did-kansas-win.mp4
    │   ├── election-data-pipeline.mp4
    │   ├── healthcare-api-extensions.mp4
    │   ├── healthcare-etl.mp4
    │   ├── joshify.mp4
    │   ├── law-firm-startup-operations.mp4
    │   ├── medigap-integration.mp4
    │   ├── mobile-api-rebuild.mp4
    │   ├── startup-technology-infrastructure.mp4
    │   └── wichitaradar.mp4
    └── music/             # Ready for future music files
        └── .gitkeep
```

**Access Pattern**: `https://cdn.joshify.dev/assets/canvases/{filename}`
````

**Find section: "Environment Variables" (around line 63)**

**Replace with**:
````markdown
### Environment Variables

**Development** (`.env.development`):
```bash
VITE_USE_LOCAL_ASSETS=true
```
- All assets load from `public/assets/` folder
- No CORS issues
- Fast local development

**Production** (`.env.production`):
```bash
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```

**Railway** (Environment Variables):
```bash
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```
````

---

### 5.4 Update README-CANVAS.md

**File**: `README-CANVAS.md`

**Find all references to paths and update**:

**Find**: `public/canvases/`
**Replace with**: `public/assets/canvases/`

**Find**: `public/canvases/posters/`
**Replace with**: `public/assets/images/posters/`

**Find**: `VITE_USE_LOCAL_CANVAS`
**Replace with**: `VITE_USE_LOCAL_ASSETS`

**Find**: `VITE_CANVAS_CDN_URL`
**Replace with**: `VITE_ASSET_CDN_BASE_URL`

---

## Phase 6: Validation & Testing

### 6.1 Pre-Deployment Validation

**Run these checks BEFORE deploying**:

```bash
# 1. TypeScript validation (MUST be 0 errors)
npm run type-check

# 2. ESLint validation (MUST be <50 warnings)
npm run lint

# 3. Build validation (MUST succeed)
npm run build

# 4. Verify output
ls -la dist/

# 5. Check for 404s in build
grep -r "public/canvases" dist/ || echo "✅ No old paths found"
grep -r "public/album-art" dist/ || echo "✅ No old paths found"
```

**Expected Results**:
- ✅ `npm run type-check`: "Found 0 errors"
- ✅ `npm run lint`: Warnings < 50
- ✅ `npm run build`: "✓ built in XXXXms"
- ✅ No references to old paths in `dist/`

---

### 6.2 Local Development Testing

**Start dev server**:
```bash
npm run dev
```

**Test Checklist**:
- [ ] Navigate to http://localhost:3000
- [ ] Check browser console (should be no errors)
- [ ] Click on "Did Kansas Win?" project
- [ ] Verify canvas video loads from `/assets/canvases/did-kansas-win.mp4`
- [ ] Verify poster loads from `/assets/images/posters/did-kansas-win-poster.webp`
- [ ] Navigate to home page
- [ ] Verify album art loads from `/assets/images/album-art/*.png`
- [ ] Open Network tab, filter by "assets"
- [ ] Confirm all asset paths use new structure

**If any 404 errors**: DO NOT PROCEED - debug file structure

---

### 6.3 Production Deployment Testing

**After deploying to Railway**:

```bash
# Test canvas video CDN URLs
curl -I https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4
curl -I https://cdn.joshify.dev/assets/canvases/joshify.mp4
curl -I https://cdn.joshify.dev/assets/canvases/did-kansas-win.mp4

# Each should return:
# - HTTP/2 200
# - server: cloudflare
# - content-type: video/mp4
# - cf-cache-status: HIT or MISS
```

**Browser Testing**:
1. Visit production site: `https://joshify-production.up.railway.app`
2. Open DevTools → Network tab
3. Navigate to any project with canvas video
4. Verify video loads from: `https://cdn.joshify.dev/assets/canvases/`
5. Check for any 404 errors
6. Test multiple projects
7. Verify posters load from local server (not CDN)
8. Verify album art loads from local server (not CDN)

**Performance Check**:
- First video load: ~1-2 seconds (cache MISS)
- Subsequent loads: <100ms (cache HIT)
- Poster images: <100ms (local, Vite-optimized)
- Album art: <100ms (local, Vite-optimized, WebP)

---

### 6.4 Post-Deployment Verification

**After 24 hours of production running**:

```bash
# Check Cloudflare cache hit rate
curl -I https://cdn.joshify.dev/assets/canvases/beer-fridge.mp4 | grep cf-cache-status
# Should show: cf-cache-status: HIT

# Verify old URLs are gone (should 404)
curl -I https://cdn.joshify.dev/beer-fridge.mp4
# Should return: HTTP/2 404

# Final backup cleanup (safe to delete after 24h verification)
rm -rf /tmp/r2-migration-backup
```

---

## Phase 7: Final Cleanup & Commit

### 7.1 Git Operations

**Check status**:
```bash
git status

# Should show:
# - Modified: src/utils/assetHelpers.ts (renamed from canvas.ts)
# - Modified: src/data/projects.ts
# - Modified: src/vite-env.d.ts
# - Modified: .env.development
# - Modified: .env.production
# - Modified: .gitignore
# - Modified: .claude/CLAUDE.md
# - Modified: .claude/PLANNING.md
# - Modified: .claude/CDN_SETUP.md
# - Modified: README-CANVAS.md
# - Deleted: public/canvases/ (directory)
# - Deleted: public/music/ (directory)
# - Deleted: public/album-art/ (directory)
# - Added: public/assets/ (directory with all files)
```

**Commit changes**:
```bash
git add -A

git commit -m "refactor: consolidate asset helpers and reorganize file structure

- DRY: Consolidate 3 helper functions into 1 generic implementation (42% code reduction)
- Config: Reduce from 4 env vars to 2 (50% simplification)
- Structure: Organize assets under public/assets/ parent folder
- Optimization: Keep posters & album art local (no CDN for small files)
- CDN: Update R2 bucket to use assets/canvases/ subfolder structure
- Docs: Update all documentation with new paths and structure

Breaking Changes: None (all function signatures preserved)
Migration: Requires R2 bucket reorganization (see .claude/REFACTOR_ASSET_HELPERS.md)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Push to remote**:
```bash
git push origin main
```

---

## Rollback Plan

### If Code Issues Occur

**Revert code changes**:
```bash
git revert HEAD
git push origin main
```

### If R2 Issues Occur

**R2 files still exist at old paths** (until you run Step 5 delete commands).

**Temporary rollback**:
1. Update `.env.production`:
   ```bash
   VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
   # Old paths still work since files aren't deleted yet
   ```
2. Revert code: `git revert HEAD`
3. Re-deploy to Railway

**Full rollback if needed**:
```bash
# Restore from backup
cd /tmp/r2-migration-backup

# Upload back to root level
wrangler r2 object put joshify-canvas/beer-fridge.mp4 --file=beer-fridge.mp4
# ... repeat for all 13 files

# Delete new structure
wrangler r2 object delete joshify-canvas/assets/canvases/beer-fridge.mp4
# ... repeat for all 13 files
```

---

## Success Metrics

### Code Quality
- ✅ Zero TypeScript errors
- ✅ ESLint warnings <50
- ✅ 60 lines → 35 lines (42% reduction)
- ✅ No breaking changes (all function signatures preserved)

### Configuration
- ✅ 4 environment variables → 2 variables (50% reduction)
- ✅ Single source of truth for CDN location
- ✅ Consistent local/production structure

### File Organization
- ✅ Logical grouping under `public/assets/` parent
- ✅ Small files (posters, album art) stay local
- ✅ Large files (videos, music) use CDN
- ✅ Mirrored local/CDN folder structures

### Performance
- ✅ Local dev: All assets load <100ms
- ✅ Production: CDN cache hit rate >95%
- ✅ First video load: ~1-2 seconds
- ✅ Cached video load: <100ms

### CDN Organization
- ✅ R2 bucket organized with subfolder structure
- ✅ Ready for future asset types (music, thumbnails, etc.)
- ✅ Clear separation of asset types

---

## Timeline Estimate

| Phase | Time | Notes |
|-------|------|-------|
| Code Refactoring | 10 min | Straightforward file edits |
| Environment Config | 2 min | Simple env var updates |
| Local File Reorganization | 5 min | Moving directories |
| R2 Migration | 15-20 min | Download, upload, verify, delete |
| Documentation Updates | 5 min | Find/replace in 4 files |
| Validation & Testing | 10 min | Build checks, local test, production test |
| **Total** | **45-50 min** | Includes buffer for issues |

---

## Notes & Warnings

### ⚠️ CRITICAL WARNINGS

1. **DO NOT deploy code changes before R2 migration is complete**
   - Code expects files at `assets/canvases/`
   - If R2 still has files at root level, videos will 404
   - Complete Phase 4 BEFORE deploying Phase 1-3 changes

2. **DO NOT delete old R2 files until new URLs are verified working**
   - Keep old files until Step 4 verification passes
   - Test production site thoroughly before running Step 5 deletes

3. **DO NOT run R2 delete commands unless you have backups**
   - Step 1 creates backups in `/tmp/r2-migration-backup`
   - Verify backups exist before running deletes
   - Keep backups for 24 hours after deployment

### 💡 TIPS

1. **Test locally first**: Run full dev server test before deploying
2. **Deploy during low-traffic hours**: Minimize user impact during migration
3. **Monitor production**: Watch for 404 errors after deployment
4. **Keep old env vars temporarily**: Can help with quick rollback if needed
5. **Document Railway changes**: Take screenshots of old env vars before changing

### 🔍 VERIFICATION CHECKLIST

Before marking complete, verify ALL of these:

- [ ] `npm run type-check` passes with 0 errors
- [ ] `npm run lint` passes with <50 warnings
- [ ] `npm run build` succeeds
- [ ] Local dev server shows no console errors
- [ ] All canvas videos load in dev mode
- [ ] All posters load in dev mode
- [ ] All album art loads in dev mode
- [ ] R2 backup exists in `/tmp/r2-migration-backup/`
- [ ] New R2 paths verified with curl
- [ ] Production site loads without errors
- [ ] Canvas videos load from CDN in production
- [ ] Posters load from local server in production
- [ ] Album art loads from local server in production
- [ ] No 404 errors in production
- [ ] Cloudflare cache working (cf-cache-status: HIT)
- [ ] Old R2 root-level files deleted
- [ ] All documentation updated
- [ ] Changes committed and pushed
- [ ] Railway env vars updated

---

## Contact & References

**Implementation Date**: TBD
**Implemented By**: TBD
**Reviewed By**: TBD

**Related Documentation**:
- `.claude/CLAUDE.md` - Project development guide
- `.claude/PLANNING.md` - Architecture documentation
- `.claude/CDN_SETUP.md` - Cloudflare R2 configuration
- `README-CANVAS.md` - Canvas video system guide

**Cloudflare Resources**:
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- R2 Docs: https://developers.cloudflare.com/r2/
- API Token Setup: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/

---

**END OF DOCUMENT**
