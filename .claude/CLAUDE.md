# CLAUDE.md - Joshify Development Guide

## Project Overview

**Joshify**: Spotify-inspired portfolio showcasing development projects as "tracks" with rich metadata, canvas backgrounds, and authentic Spotify UI patterns.

**Status**: Production-Ready ✅
- Zero TypeScript errors
- Full CI/CD pipeline
- Automated asset optimization
- Deployed on Railway

---

## Quick Start

### Development
```bash
npm run dev        # Start dev server (localhost:3000)
npm run lint       # ESLint validation
npm run type-check # TypeScript check
npm run ci         # Full CI: lint + type + build
```

### Pre-Push Workflow
```bash
# ALWAYS run local CI before pushing
npm run ci

# If all checks pass, push changes
git push origin <branch-name>
```

**Why**: Ensures GitHub Actions CI/CD will pass, avoids wasted CI minutes.

---

## Tech Stack

### Core
- **React 18.2** + **TypeScript 5.9**: Component-based UI with strict type safety
- **Vite 5.4**: Fast dev server, optimized production builds
- **Tailwind CSS 3.3**: Utility-first with Spotify-authentic theme

### Build Pipeline
- **Pre-build**: WebP generation from PNG (90%+ size reduction)
- **Build-time**: TypeScript compilation + PNG/WebP optimization
- **CI/CD**: GitHub Actions → Railway deployment

### Infrastructure
- **GitHub Actions**: Automated lint → type-check → build → deploy
- **Railway**: Production hosting with auto-deploy on main
- **Cloudflare R2**: Canvas video CDN

---

## Key Features

### Spotify-Authentic UI
- Three-panel layout (sidebar, content, now playing)
- Resizable columns with drag handles
- Dual search system (left panel + top bar)
- Custom Spotify-style scrollbars
- Responsive design (320px - 1920px+)

### Canvas System
- **9:16 vertical videos** for immersive backgrounds
- **Environment-aware URLs**: Local dev vs CDN production
- **Fallback chain**: Video → Album Art → Animated Gradient
- **Poster images**: Instant visual feedback while loading

### Project Structure
```
src/
├── components/       # React components
│   └── views/       # Page components
├── data/            # Project metadata
├── hooks/           # Custom React hooks
├── types/           # TypeScript definitions
└── utils/           # Helper functions
```

---

## Development Standards

### Code Quality
- **TypeScript**: Strict mode, zero errors required
- **ESLint**: Max 50 warnings (currently <50)
- **Formatting**: 4-space indentation
- **Components**: Functional components with hooks

### File Naming
- Components: PascalCase (`ProjectCard.tsx`)
- Hooks: camelCase with `use` prefix (`usePlayer.ts`)
- Utils: camelCase (`colorExtractor.ts`)
- Types: PascalCase interfaces (`Project`, `Collection`)

### Import Aliases
```typescript
import Component from '@/components/Component'
import { useHook } from '@/hooks/useHook'
import { helper } from '@/utils/helper'
import type { Type } from '@/types'
```

---

## Asset Management

### Album Art
- **Location**: `public/assets/images/album-art/*.png`
- **Processing**: Auto-converted to WebP at build time
- **Committed**: Yes (small file sizes)

### Canvas Videos
- **Local Dev**: `public/assets/canvases/*.mp4` (gitignored)
- **Production**: Cloudflare R2 CDN (`https://cdn.joshify.dev/assets/canvases/`)
- **Format**: MP4 H.264, 9:16 aspect, <2MB, 30fps
- **Committed**: No (too large for git)

### Canvas Posters
- **Local Only**: `public/assets/images/posters/*.webp` (small files, Vite-optimized)

### Environment Variables
```bash
# .env.development
VITE_USE_LOCAL_ASSETS=true

# .env.production
VITE_USE_LOCAL_ASSETS=false
VITE_ASSET_CDN_BASE_URL=https://cdn.joshify.dev
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline validates code quality on every PR:

1. **Lint and Type Check** ✅
   - ESLint validation (max 50 warnings)
   - TypeScript type checking (0 errors required)

2. **Build and Test** ✅
   - Production build via `npm run build`
   - Deployment asset validation
   - Build artifact upload (30-day retention)

3. **PR Validation Complete** ✅
   - Summary of validation results
   - Confirmation PR is ready for review

4. **Quality Gate** ✅
   - Verifies all previous jobs succeeded
   - Final approval checkpoint

### Deployment Strategy

**Railway Auto-Deploy**: Deployment is handled entirely by Railway, not GitHub Actions.

- **Trigger**: Railway watches the `main` branch
- **Process**: When commits land on `main`, Railway automatically builds and deploys
- **Configuration**: Defined in `railway.toml`
- **Build Command**: `npm run build` (via Nixpacks auto-detection)
- **Start Command**: `npm run preview` (serves static files from `dist/`)

**Why Railway handles deployment**:
- Avoids circular dependency (can't deploy via CI/CD that blocks merging)
- Railway provides built-in deployment monitoring and rollback
- Simpler workflow: merge PR → Railway auto-deploys

### Branch Protection Rules

GitHub Ruleset: **"main branch protection"** (ID: 8492517)

**Required Status Checks** (must pass before merge):
- ✅ Lint and Type Check
- ✅ Build and Test
- ✅ Quality Gate

**Additional Rules**:
- Pull request required (no direct pushes to main)
- Dismiss stale reviews on new pushes
- Require conversation resolution before merging
- Linear history required (no merge commits)
- Prevent force pushes and branch deletion

**Note**: Playwright/E2E tests are available for development via MCP but are NOT part of CI/CD pipeline by design.

---

## Common Tasks

### Adding New Projects
1. Create album art: `public/album-art/project-name.png`
2. (Optional) Create canvas video, run `scripts/optimize-canvas-videos.sh`
3. (Optional) Generate poster: `scripts/generate-poster-frames.sh`
4. Add project data to `src/data/projects.ts`
5. Upload canvas to Cloudflare R2 (if created)
6. Run `npm run ci` to verify
7. Commit and push

### Canvas Video Workflow
See `README-CANVAS.md` for detailed canvas setup instructions.
See `scripts/README.md` for video optimization guide.

### Testing Changes
**Manual Testing** (Playwright available):
- Browser automation via Playwright MCP
- Headless mode for non-intrusive testing
- See `PLAYWRIGHT.md` for API reference

**Automated Testing**:
- CI/CD runs on every push
- Local validation: `npm run ci`

---

## Project Terminology

### User-Facing
- **Collections** (not "Playlists")
- **Projects** (individual tracks)
- **My Work** (library section)

### Code/Data
- May use "playlists", "albums" for historical compatibility
- Data structures use technical names
- UI displays user-friendly labels

---

## Documentation

### Project Documentation (.claude/)
- `CLAUDE.md` - This file (development guide)
- `TASKS.md` - Current tasks and future enhancements
- `SESSION.md` - Current session state
- `PLANNING.md` - Architecture and design patterns

### Reference Documentation (.claude/)
- `ANALYTICS.md` - Matomo analytics setup
- `CDN_SETUP.md` - Cloudflare R2 configuration
- `PLAYWRIGHT.md` - Browser automation reference

### Site Documentation (root)
- `README.md` - Main project documentation
- `README-CANVAS.md` - Canvas video system guide
- `scripts/README.md` - Video optimization scripts

---

## Testing Checklist

### Before Push
- [ ] `npm run ci` passes locally
- [ ] Zero TypeScript errors
- [ ] ESLint warnings <50
- [ ] Manual testing in browser (if UI changes)

### UI/UX Testing
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Column resizing behavior
- [ ] Search functionality
- [ ] Canvas video loading
- [ ] Project detail navigation
- [ ] Hover states and transitions

### Performance
- [ ] Fast page loads (<3s)
- [ ] Smooth animations (60fps)
- [ ] Optimized images (WebP)
- [ ] Canvas videos <2MB

---

## Troubleshooting

### TypeScript Errors
```bash
npm run type-check  # See all errors
# Fix errors in reported files
```

### ESLint Warnings
```bash
npm run lint        # See all warnings
# Address warnings or adjust rules in .eslintrc.cjs
```

### Canvas Videos Not Loading
- **Dev**: Check `public/canvases/` has MP4 files
- **Prod**: Verify Cloudflare R2 URLs in `src/utils/canvas.ts`
- **Both**: Check browser console for errors

### Build Failures
```bash
# Clean build and reinstall
rm -rf node_modules dist
npm install
npm run build
```

---

## Resources

- **Live Site**: https://joshify-production.up.railway.app
- **Repository**: GitHub (private)
- **Analytics**: Matomo dashboard
- **CDN**: Cloudflare R2 bucket

**Last Updated**: October 21, 2025
