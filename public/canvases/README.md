# Project Canvas Files

This directory contains visual backgrounds for portfolio projects, inspired by Spotify Canvas.

## 🎥 Video Hosting Strategy

**Important**: Canvas video files are **NOT committed to this repository** due to file size constraints.

**Local Development**: Videos stored in this directory for testing  
**Production**: Videos hosted via GitHub Releases CDN  
**Fallback System**: Automatic fallback to album art when videos unavailable

If you're viewing this on GitHub, the directory will appear empty except for this README.

## File Structure
- `{project-id}.mp4` - Video canvas (preferred, 3-8 seconds loop)

**Note**: Static image fallbacks are stored in `/public/album-art/` and referenced via the canvas configuration in projects.js. The canvas system automatically falls back to album art when videos are unavailable.

## Specifications
- **Aspect Ratio**: 9:16 (vertical, mobile-first)
- **Video**: MP4, H.264, <2MB, 3-8 seconds, seamless loop
- **Image**: JPG/PNG, <500KB
- **Resolution**: 720x1280 minimum, 1080x1920 preferred

## Current Canvas Videos
- `campbell-zafar.mp4` - Campbell Zafar Law project canvas
- `dark-side-of-the-brew.mp4` - Beer Fridge Android app canvas

## Canvas Configuration
Canvas fallbacks are configured in `/src/data/projects.js`:
```javascript
canvas: {
  video: '/canvases/project-id.mp4',        // Video canvas (this directory)
  image: '/album-art/project-id.png',       // Image fallback (album art)
  fallback: '/album-art/project-id.png'     // Final fallback (album art)
}
```

## Usage

### For Local Development
1. Add video files to this directory with naming pattern: `{project-id}.mp4`
2. Update canvas configuration in `/src/data/projects.js`
3. Videos will be gitignored and not committed

### For Production Deployment
1. Upload videos to GitHub Releases
2. Update video URLs in projects.js to point to release CDN URLs
3. Deploy application with updated configuration

### File Naming
Match project IDs from `/src/data/projects.js` (e.g., `campbell-zafar.mp4`, `dark-side-of-the-brew.mp4`)