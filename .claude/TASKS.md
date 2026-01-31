# TASKS.md - Development Tasks

## Current Status (January 31, 2026)

**Project State**: Production-Ready ✅
- Zero TypeScript errors
- Full CI/CD pipeline operational
- Automated asset optimization
- Responsive design complete
- Canvas video system functional
- **Audio player implementation in progress** (feature/audio-player branch)

---

## Active Tasks

### Audio Player Implementation (In Progress - feature/audio-player branch)

**Completed**:
- [x] Remove heart icons site-wide
- [x] Audio engine in usePlayer.ts (currentTime, duration, seek, volume, event handlers)
- [x] Audio element in App.tsx with play/pause control
- [x] ProgressBar component with click-to-seek and drag-to-seek
- [x] Mobile player bar redesign (thumbnail | title | play button, thin progress bar)
- [x] MobilePlayerView component (slide-up modal with lyrics)
- [x] Desktop player updates (real progress bar, actual audio times, volume slider, mic icon)
- [x] LyricsView component (desktop center column takeover with gradient background)
- [x] Lyrics discoverability (badge on cards, pulsing mic, preview in NowPlayingPanel, View Lyrics link)
- [x] Mic icon turns green when lyrics are showing
- [x] Fixed double-path bug in audio URL generation
- [x] Fixed volume slider to support smooth dragging
- [x] Fixed first-play race condition (audio effects consolidated to prevent play() before src is set)

**Remaining**:
- [ ] Test all features thoroughly across devices
- [ ] Handle projects without musicFile gracefully (some projects don't have audio yet)
- [ ] Merge feature branch to main after testing
- [ ] Implement expand button functionality in mobile lyrics view (full-screen lyrics)

**Known Issues**:
- Not all projects have audio files yet (e.g., joshify.mp3 doesn't exist)
- Projects without audio will show 0:00 duration

---

### CI/CD Configuration (October 24, 2025)
- [x] Investigate PR #25 merge blocker - Identified missing E2E test requirement
- [x] Remove E2E test requirement from GitHub branch protection ruleset
- [x] Remove circular deployment jobs from GitHub Actions workflow
- [x] Update CI/CD documentation to reflect Railway auto-deploy strategy

### Mobile UX Fixes (Completed)
- [x] Fix mobile navigation - Add modal/slide-up UI for project detail pages with dismiss functionality
- [x] Improve mobile navigation back behavior - Implemented browser history back navigation for mobile project details, returns to previous view (collection/playlist) naturally. Desktop keeps current inline view behavior.
- [x] Fix mobile player positioning - Bottom player cut off below viewport on mobile devices (Fixed z-index stacking issue in PR #32)

### UX Enhancements
- [x] Modal popup welcome window for first-time visitors (PR #35, #36)

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
- [ ] Add missing audio files (joshify.mp3, others)

### Technical Debt
- Monitor ESLint warnings (currently <50, target <10)
- Review and update dependencies quarterly
- Audit bundle size and optimize if needed

### Data Architecture
- [x] **Split projects.ts into separate files** - Each project in its own file under `src/data/projects/`, with `projects.ts` aggregating/exporting. Files export raw data only (no helper calls), `projects.ts` applies `getMusicUrl()`, `getCanvasUrl()`, etc. ✅ Completed January 2026

### Project Management
- [x] **Deactivate Beer Fridge project** - Added `active?: boolean` field to Project type. Set Beer Fridge to `active: false`. Code filters to only show projects where `active !== false`. ✅ Completed January 2026

### Search & Filter Enhancements
- [ ] **Improve skills UI and search filtering** - Better visual display of skills, ability to filter search results by skill. Details TBD.

---

## Completed Features

### Music Integration System (January 2026)
**Status**: UI Implementation Complete ✅

**What's Done**:
- ✅ Added `musicFile` field to Project interface (nullable string URL)
- ✅ Added `projectStory` field for first-person project narratives
- ✅ Added `sunoLyrics` field for AI-generated song lyrics (Suno input)
- ✅ Added `displayLyrics` field for UI display (may differ from Suno input)
- ✅ Added `sunoStyle` field for Suno AI music generation style prompts
- ✅ Created `getMusicUrl()` helper function (mirrors `getCanvasUrl()` pattern)
- ✅ Added `public/assets/music/` directory with MP3 files
- ✅ Environment variable support (`VITE_USE_LOCAL_ASSETS`, `VITE_ASSET_CDN_BASE_URL`)
- ✅ Audio player UI with play/pause, seeking, progress bar
- ✅ Mobile full-screen player with lyrics
- ✅ Desktop lyrics view with gradient background
- ✅ Volume control with smooth dragging
- ✅ Auto-advance to next track on song end
- ✅ Lyrics discoverability features

**Architecture**:
- Development: Serves music from `public/assets/music/` (gitignored)
- Production: Serves music from Cloudflare R2 CDN (`https://cdn.joshify.dev/assets/music/`)
- Mirrors canvas video delivery pattern exactly

**New Components**:
- `src/components/ProgressBar.tsx` - Reusable progress bar with seek
- `src/components/MobilePlayerView.tsx` - Full mobile player with lyrics
- `src/components/LyricsView.tsx` - Desktop lyrics overlay

---

## Maintenance Notes

### When Adding New Projects
1. Create album art PNG in `public/assets/images/album-art/`
2. (Optional) Create canvas video MP4, run optimization scripts
3. (Optional) Generate poster image with `generate-poster-frames.sh`
4. (Optional) Create music track MP3 for `public/assets/music/`
5. Add project data to `src/data/projects.ts`
6. Upload canvas/music assets to Cloudflare R2
7. Run `npm run ci` to verify build
8. Commit and push to trigger deployment

### Regular Maintenance
- Run `npm run ci` before pushing changes
- Monitor GitHub Actions for build failures
- Check Railway deployment status after merges
- Review Matomo analytics for user engagement
