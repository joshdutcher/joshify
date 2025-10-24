# TASKS.md - Development Tasks

## Current Status (October 23, 2025)

**Project State**: Production-Ready ✅
- Zero TypeScript errors
- Full CI/CD pipeline operational
- Automated asset optimization
- Responsive design complete
- Canvas video system functional
- Music infrastructure prepared (backend only, no UI changes)

---

## Active Tasks

### CI/CD Configuration (October 24, 2025)
- [x] Investigate PR #25 merge blocker - Identified missing E2E test requirement
- [x] Remove E2E test requirement from GitHub branch protection ruleset
- [x] Remove circular deployment jobs from GitHub Actions workflow
- [x] Update CI/CD documentation to reflect Railway auto-deploy strategy

### Mobile UX Fixes (Priority)
- [x] Fix mobile navigation - Add modal/slide-up UI for project detail pages with dismiss functionality
- [x] Improve mobile navigation back behavior - Implemented browser history back navigation for mobile project details, returns to previous view (collection/playlist) naturally. Desktop keeps current inline view behavior.
- [ ] Fix mobile player positioning - Bottom player cut off below viewport on mobile devices

### Performance Optimizations
- [ ] Implement lazy loading for canvas videos
- [ ] Add preload hints for critical assets
- [ ] Investigate Service Worker for offline support
- [ ] Optimize Core Web Vitals scores

### Content Updates
- [ ] Add new projects as completed
- [ ] Update existing project descriptions
- [ ] Refresh album art as needed
- [ ] Create new canvas videos for projects

### Technical Debt
- Monitor ESLint warnings (currently <50, target <10)
- Review and update dependencies quarterly
- Audit bundle size and optimize if needed

---

## Future Features

### Music Integration System
**Status**: Infrastructure prepared, no UI implementation yet

**What's Done**:
- ✅ Added `music` field to Project interface (nullable string)
- ✅ Created `getMusicUrl()` helper function (mirrors `getCanvasUrl()` pattern)
- ✅ Added `public/music/` directory with sample MP3 file
- ✅ Updated `.gitignore` to exclude `public/music/` from repository
- ✅ Environment variable support (`VITE_USE_LOCAL_MUSIC`, `VITE_MUSIC_CDN_URL`)
- ✅ All projects have `music` property assigned (using placeholder file)
- ✅ TypeScript types updated and validated (zero errors)
- ✅ Build pipeline passes with music infrastructure

**Architecture**:
- Development: Serves music from `public/music/` (gitignored)
- Production: Serves music from Cloudflare R2 CDN (`https://cdn.joshify.dev/`)
- Mirrors canvas video delivery pattern exactly

**Future Implementation**:
- Create audio player component (Spotify-style controls)
- Integrate music playback with bottom player bar
- Add audio visualization or waveform display
- Implement playlist/queue functionality
- Create unique music tracks for each project
- Upload music files to Cloudflare R2
- Add music controls to mobile interface

---

## Maintenance Notes

### When Adding New Projects
1. Create album art PNG in `public/album-art/`
2. (Optional) Create canvas video MP4, run optimization scripts
3. (Optional) Generate poster image with `generate-poster-frames.sh`
4. (Optional) Create music track MP3 for `public/music/`
5. Add project data to `src/data/projects.ts`
6. Upload canvas/music assets to Cloudflare R2
7. Run `npm run ci` to verify build
8. Commit and push to trigger deployment

### Regular Maintenance
- Run `npm run ci` before pushing changes
- Monitor GitHub Actions for build failures
- Check Railway deployment status after merges
- Review Matomo analytics for user engagement
