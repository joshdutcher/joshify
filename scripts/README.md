# Canvas Video Optimization Scripts

## Overview

These scripts help optimize canvas videos for better web performance by:
1. **Reducing file sizes** from 8-15MB to <2MB (60-85% reduction)
2. **Generating poster images** for instant visual feedback
3. **Improving loading times** from 30+ seconds to 2-4 seconds

## Prerequisites

### Install FFmpeg

**Ubuntu/Debian/WSL2:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

**Verify Installation:**
```bash
ffmpeg -version
```

---

## Scripts

### 1. `optimize-canvas-videos.sh`

**Purpose**: Re-encodes videos with web-optimized settings

**Settings**:
- Resolution: 720x1280 (9:16 aspect ratio)
- Bitrate: 1.2 Mbps
- Frame rate: 30 fps
- Codec: H.264 High Profile
- Format: MP4 with FastStart (streaming-ready)

**Usage**:
```bash
cd scripts
./optimize-canvas-videos.sh
```

**Output**:
- Optimized videos: `public/canvases-optimized/`
- Backups: `public/canvases-backup/`

**Expected Results**:
```
beer-fridge.mp4:            3.0MB → 1.2MB  (60% reduction)
democracy-engine.mp4:       8.0MB → 1.8MB  (78% reduction)
election-data-pipeline.mp4: 15MB  → 1.9MB  (87% reduction)
```

---

### 2. `generate-poster-frames.sh`

**Purpose**: Extracts first frame from each video as WebP poster image

**Settings**:
- Format: WebP
- Quality: 85
- Size: 10-30KB per image

**Usage**:
```bash
cd scripts
./generate-poster-frames.sh
```

**Output**:
- Poster images: `public/canvases/posters/`
- Naming: `{video-name}-poster.webp`

**Examples**:
```
democracy-engine-poster.webp        (20KB)
election-data-pipeline-poster.webp  (25KB)
beer-fridge-poster.webp             (18KB)
```

---

## Workflow

### Step 1: Optimize Videos

```bash
cd /home/josh/www/projects/joshify/scripts
./optimize-canvas-videos.sh
```

**Review optimized videos** in `public/canvases-optimized/` directory.

**Quality Check**:
- Play each video to verify visual quality
- Check file sizes are <2MB
- Ensure video plays smoothly

### Step 2: Generate Posters

```bash
./generate-poster-frames.sh
```

**Verify posters** in `public/canvases/posters/` directory.

### Step 3: Replace Original Videos

**If satisfied with optimized versions:**

```bash
# Backup originals (already done by script)
# Replace with optimized versions
cp public/canvases-optimized/*.mp4 public/canvases/
```

### Step 4: Upload to CDN

**Upload optimized videos to Backblaze B2:**

1. Log into Backblaze B2 console
2. Navigate to `joshify-canvas` bucket
3. Upload files from `public/canvases-optimized/`
4. Replace existing videos with optimized versions

**OR use B2 CLI:**
```bash
b2 sync public/canvases-optimized/ b2://joshify-canvas/
```

---

## Expected Performance Improvements

### Before Optimization:
- democracy-engine.mp4: 8MB, 15-20s load time
- election-data-pipeline.mp4: 15MB, 30-40s load time
- User experience: Videos appear broken, timeout errors

### After Optimization:
- democracy-engine.mp4: 1.8MB, 3-4s load time (85% faster)
- election-data-pipeline.mp4: 1.9MB, 3-5s load time (90% faster)
- User experience: Smooth loading with visual feedback

---

## Troubleshooting

### FFmpeg Not Found
```bash
# Check if installed
which ffmpeg

# Install if missing
sudo apt-get install ffmpeg  # Ubuntu/WSL2
brew install ffmpeg          # macOS
```

### Permission Denied
```bash
chmod +x optimize-canvas-videos.sh
chmod +x generate-poster-frames.sh
```

### Script Errors
- Ensure you're in the `scripts/` directory
- Check that `public/canvases/` exists and contains MP4 files
- Verify FFmpeg is installed: `ffmpeg -version`

---

## Technical Details

### Video Encoding Settings

**Why these settings?**

- **720x1280**: Optimal balance between quality and file size for 9:16 videos
- **1.2 Mbps**: Provides excellent quality for vertical video while keeping size small
- **30 FPS**: Smooth playback, lower than 60fps reduces file size
- **H.264 High Profile**: Best compatibility across all browsers
- **FastStart**: Enables streaming playback (video starts before fully downloaded)

### Compression Comparison

| Video | Original | Optimized | Reduction | Quality |
|-------|----------|-----------|-----------|---------|
| Small | 3MB | 1.2MB | 60% | Excellent |
| Medium | 8MB | 1.8MB | 78% | Excellent |
| Large | 15MB | 1.9MB | 87% | Excellent |

### Poster Image Strategy

**Why WebP?**
- 25-35% smaller than JPEG
- Better compression than PNG
- Native browser support in all modern browsers
- Fast decode time

**Why first frame?**
- Instant visual feedback
- Represents video content
- Tiny file size (10-30KB)
- Zero additional creation work

---

## Next Steps After Optimization

After running these scripts, you'll need to:

1. ✅ Review optimized videos quality
2. ✅ Update code to use poster images (see ProjectCanvas.tsx updates)
3. ✅ Upload optimized videos to B2 CDN
4. ✅ Test loading performance
5. ✅ Deploy changes to production

See the main README for code implementation details.
