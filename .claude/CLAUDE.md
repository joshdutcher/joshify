# CLAUDE.md - Joshify Portfolio Development Guide

## Current Project Status (High-Level)

### ✅ Completed Milestones
- Initial project concept: Spotify-clone portfolio design
- Complete Spotify-authentic UI implementation with all major phases
- TypeScript conversion and comprehensive type safety implementation
- Production-ready code quality with ESLint integration

### 🎯 Current Phase
**Current Phase**: Production-Ready CI/CD Portfolio
**Status**: ✅ **CI/CD PIPELINE COMPLETE** - Enterprise-grade deployment workflow operational
**Recent Achievement**: Complete CI/CD pipeline implemented (September 28, 2025) - TypeScript errors resolved (30+ → 0), GitHub Actions pipeline, branch protection, Railway configuration
**Previous Achievement**: TypeScript conversion completed (September 26, 2025) - Reduced type errors by 15%, added comprehensive interfaces and null safety

### 🛠️ Development Environment Status
- Claude Code project structure established
- Ready for existing codebase integration

## Development Standards and Patterns

### Code Standards
- Modern JavaScript/TypeScript patterns
- Component-based architecture for Spotify-like UI
- Responsive design principles for music streaming interface
- Accessibility standards for portfolio navigation

### File Organization
*See PLANNING.md for detailed package structure and architecture specifications.*

### Implementation Guidelines
*See PLANNING.md for detailed implementation specifications, architecture patterns, and design requirements.*

## Development Environment

### System Requirements
- Modern web browser support
- Node.js for build tools and development server
- Responsive design testing across devices

**Build Commands:**
```bash
npm run dev        # Development server (port 3000)
npm run build      # Production build (includes TypeScript compilation)
npm run preview    # Preview build locally
npm run lint       # Code linting (✅ TypeScript files now linted)
npm run type-check # TypeScript type checking (✅ 0 errors - production ready)
npm run ci         # Full CI pipeline: lint + type-check + build
npm run ci:full    # Complete CI/CD: lint + type-check + build + test
npm run test       # Playwright smoke tests
```

**TypeScript Support:**
- ✅ **Complete TypeScript Conversion**: All major components converted from JS to TS
- ✅ **Type Safety**: Comprehensive interfaces for component props and data structures
- ✅ **ESLint Integration**: TypeScript files now properly linted (was previously ignored)
- ✅ **Null Safety**: Extensive undefined/null checks throughout codebase
- ✅ **Production Ready**: Zero TypeScript errors - enterprise-grade type safety complete

**CI/CD Pipeline:**
- ✅ **GitHub Actions**: Comprehensive 4-stage pipeline (lint, build, test, quality gate)
- ✅ **Branch Protection**: Main branch protected with required CI/CD checks
- ✅ **Railway Integration**: Production deployment configuration and verification
- ✅ **Quality Gates**: Automated testing with Playwright smoke tests
- ✅ **Deployment Ready**: All TypeScript compilation errors resolved

**Testing & Browser Automation:**
- ✅ **Playwright MCP**: Chromium browser installed and functional in WSL2
- Available for E2E testing, visual regression testing, and browser automation
- Can access local development server (localhost:3000) for live testing
- ⚡ **HEADLESS MODE REQUIRED**: Always use headless mode for Claude AI testing (no browser windows)
- Use `--play` flag or Playwright MCP tools for browser-based testing workflows
- 📋 **Documentation**: See `.claude/PLAYWRIGHT_MCP.md` for complete API reference and usage guide
- 🤖 **CI/CD Integration**: GitHub Actions enhanced with Playwright MCP (commit 15a42fa)
  - Automated browser testing capabilities for Claude in CI/CD pipeline
  - Headless Chromium with full dependency support in GitHub Actions
  - Enables automated validation of UI changes through pull requests and issues

**Requirements:**
- Portfolio showcasing projects as "tracks" with album-like rich metadata
- Spotify-authentic user interface and navigation patterns
- Advanced column resizing system matching Spotify behavior
- Comprehensive search functionality with consistent filter patterns
- Project detail views with descriptions, tech stacks, and demos
- Responsive design for all screen sizes
- Canvas fallback animations with color extraction

**Terminology Standards:**
- **User Interface**: "Collections" (not "Playlists"), "Projects" (individual tracks), "My Work" (not "Your Library")
- **Workplace Interface**: "Workplace" label for employer playlists (Campbell Zafar Law, DDx, Ad Hoc)
- **Code/Data**: May retain "albums", "playlists" for historical compatibility
- **Content**: "About this project" descriptions with music critic style (25% less intense, employer-focused)

**Benefits:**
- Spotify-authentic experience with advanced interaction patterns
- Comprehensive search and filtering capabilities
- Resizable interface adapting to user preferences
- Engaging visual presentation with animated fallbacks
- Scalable structure for adding new projects and collections
- Enhanced workplace organization with dedicated employer playlists
- Album art attribution system showing musical inspiration

## Testing Checklist

### UI/UX Testing
**Available Tools**: ✅ Playwright MCP (Chromium browser) for automated testing
- [ ] Spotify-authentic navigation and layout with proper terminology
- [ ] Left column resizing behavior (min/max/icon-only modes)
- [ ] Right column resizing functionality
- [ ] Search functionality in both left column and top bar
- [ ] Filter consistency ("All", "Collections", "Projects")
- [ ] Track grid displays correctly with "Role" column
- [ ] Project detail pages load properly with enhanced navigation
- [ ] Canvas fallback animations with color extraction
- [ ] Clickable track names and role text throughout interface
- [ ] Playlist-aware next/previous functionality
- [ ] Responsive behavior on mobile/tablet/desktop
- [ ] Loading states and transitions
- [ ] Spotify-style scrollbars (hover to appear, fade after)

### Content Testing
- [ ] All project information displays correctly with new "Role" column
- [ ] Cover art and project screenshots load properly
- [ ] Canvas videos load with proper fallback chain (video → art → gradient)
- [ ] External links to live demos and repositories work
- [ ] Track descriptions maintain music critic style with employer appeal
- [ ] Playlist descriptions are brief and Spotify-style
- [ ] Contact information and social links function

### Performance Testing
- [ ] Fast loading times for portfolio browsing
- [ ] Column resizing maintains 60fps performance
- [ ] Search functionality responds quickly to user input
- [ ] Canvas gradient animations run smoothly
- [ ] Optimized images and assets
- [ ] Smooth transitions between all interface states

## Common Pitfalls to Avoid

### Portfolio-Specific Issues
- Overcomplicating the music metaphor at expense of clarity
- Inconsistent terminology between UI labels and internal code
- Making column resizing behavior feel janky or unresponsive
- Search results that don't match user expectations
- Canvas animations that are distracting rather than engaging
- Forgetting mobile responsiveness for touch interactions
- Loading too many heavy assets on initial page load

### Technical Issues
- Column resize handles that don't provide proper visual feedback
- Search functionality that doesn't handle edge cases properly
- Color extraction that fails gracefully when cover art is corrupted
- Complex animations that hurt performance on slower devices
- Breaking accessibility with custom UI components
- Not providing fallbacks for failed asset loads
- Drag events that conflict with other browser behaviors

### Implementation-Specific Risks
- Not testing column resizing across different browsers
- Search filters that become out of sync between locations
- Canvas gradient animations that consume too much CPU
- Resize boundaries that don't snap consistently
- Navigation state that gets confused during rapid transitions

## Reference Information

### Canvas Video Hosting Strategy
**IMPORTANT**: Canvas videos (9:16 MP4 files) are NOT stored in git repository due to file size.
- **Local Development**: Videos stored in `public/canvases/` for testing
- **Production**: Videos hosted via GitHub Releases CDN
- **Deployment Process**: Upload videos to GitHub Releases, update URLs in code
- **Gitignore**: `public/canvases/*.mp4` excluded from repository
- **Fallback System**: Automatic fallback to album art if video unavailable

### Key Dependencies
*See PLANNING.md for complete dependency list and version specifications.*

### Project Context
**Portfolio Concept**: Personal portfolio website designed as a Spotify clone
**Album = Project Metaphor**: Each development project is presented as an "album" with:
- Album art (project screenshot/logo)
- Track listing (key features/technologies)
- Artist info (role, duration, team size)
- Album description (project overview and impact)

**Target Audience**: 
- Potential employers and collaborators
- Fellow developers
- Anyone interested in technical projects

## Claude AI Testing Guidelines

### ⚡ Headless Browser Testing Requirements
**CRITICAL**: When Claude AI performs UI testing or browser automation:

1. **Always Use Headless Mode**: Never spawn visible browser windows
   - Use `--headless` flag in all Playwright MCP operations
   - Configure MCP server with headless arguments
   - Prevents interruption of user's desktop environment

2. **Testing Workflow**:
   ```
   Step 1: Start dev server (if needed): npm run dev
   Step 2: Use headless Playwright MCP for all browser operations
   Step 3: Capture screenshots/snapshots for validation
   Step 4: Report results without opening browser windows
   ```

3. **Headless Testing Benefits**:
   - Non-intrusive testing during development
   - Better performance and resource usage
   - Maintains full functionality (screenshots, interactions, validation)
   - Professional development workflow

### Automated Testing Protocols
- UI component validation via headless browser snapshots
- Column resizing behavior testing without visual disruption
- Search functionality verification through accessibility tree
- Responsive design testing across viewport sizes
- Performance monitoring via network/console analysis

## Questions to Ask User
- What projects should be included as initial "albums"?
- Do you have album art/screenshots prepared for projects?
- What's the preferred tech stack for the frontend?
- Should there be a "currently playing" feature for active projects?
- How should visitors contact you or view live demos?