# TASKS.md - Development Tasks

## Current Status (October 21, 2025)

**Project State**: Production-Ready ✅
- Zero TypeScript errors
- Full CI/CD pipeline operational
- Automated asset optimization
- Responsive design complete
- Canvas video system functional

---

## Active Tasks

### Mobile UX Fixes (Priority)
- [x] Fix mobile navigation - Add modal/slide-up UI for project detail pages with dismiss functionality
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

## Maintenance Notes

### When Adding New Projects
1. Create album art PNG in `public/album-art/`
2. (Optional) Create canvas video MP4, run optimization scripts
3. (Optional) Generate poster image with `generate-poster-frames.sh`
4. Add project data to `src/data/projects.ts`
5. Upload canvas assets to Cloudflare R2
6. Run `npm run ci` to verify build
7. Commit and push to trigger deployment

### Regular Maintenance
- Run `npm run ci` before pushing changes
- Monitor GitHub Actions for build failures
- Check Railway deployment status after merges
- Review Matomo analytics for user engagement
