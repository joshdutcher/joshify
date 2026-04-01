# Joshify - Spotify-Inspired Portfolio

**A personal portfolio website reimagined as a music streaming platform**

Joshify transforms my traditional developer portfolio into an engaging Spotify-like experience where development projects become "tracks," skills become "genres," and my career becomes a carefully curated musical journey — complete with AI-generated music for each project.

## ✨ Features

### 🎵 Core Experience
- **Project-as-Track Metaphor**: Each development project presented as a music track with rich metadata, descriptions, and technical details
- **Collection System**: Curated project collections organized like Spotify playlists (workplace, side projects, top hits)
- **Interactive Player**: Real MP3 audio playback with progress bar, seek, volume control, and auto-advance
- **Canvas Backgrounds**: Dynamic visual backgrounds with seamless video/image fallback system
  - Desktop: Immersive canvas in right panel during project playback
  - Mobile: Full-screen canvas backgrounds on project detail pages with readable text overlays

### 🎨 Authentic Spotify Design
- **Pixel-Perfect UI**: Meticulously recreated Spotify interface with authentic styling and color scheme
- **Resizable Columns**: Advanced drag-to-resize functionality matching Spotify behavior with min/max constraints
- **Responsive Design**: Progressive card sizing across all device breakpoints (140px → 188px)
- **Spotify-Style Scrollbars**: Custom styled scrollbars matching authentic Spotify appearance
- **Three-Panel Layout**: Left sidebar, main content area, and right "now playing" panel

### 🔍 Advanced Search & Navigation
- **Dual Search System**: Left column filter search and global top bar search
- **Smart Filtering**: "All," "Collections," "Projects" filters throughout interface
- **Clickable Navigation**: Track names and roles link to detailed project pages
- **Playlist-Aware Controls**: Next/previous navigation respects current collection context
- **Search Results Page**: Comprehensive search results with project metadata

### 📱 Mobile-First Responsive Design
- **Adaptive Layouts**: Optimized experiences across mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Touch-Optimized**: Mobile-specific interactions and navigation patterns
- **Progressive Enhancement**: Desktop features (column resizing, hover states) enhance tablet/desktop experience
- **Mobile Canvas**: Full-screen immersive canvas backgrounds on mobile project detail views

### 🎨 Visual Polish
- **Canvas Fallback System**: Intelligent fallback chain (video → album art → animated gradients)
- **Color Extraction**: Dynamic gradient animations generated from album art dominant colors
- **Album Art Attribution**: Display inspiration sources for album artwork
- **Smooth Transitions**: 60fps animations and polished interaction states

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2**: Modern React with hooks-based architecture
- **TypeScript 5.9**: Enterprise-grade type safety with comprehensive interfaces
- **Vite 5.4**: Lightning-fast development server and optimized production builds

### Styling & Design
- **Tailwind CSS 3.3**: Utility-first CSS framework with custom Spotify-authentic theme
- **Lucide React**: Consistent icon system matching Spotify aesthetic
- **Custom Scrollbars**: CSS-based Spotify-style scrollbar implementation

### Build Optimization
- **Vite Plugin Image Optimizer**: Automated PNG→WebP conversion at build time
- **Sharp**: High-performance image processing (75% file size reduction)
- **TypeScript Compilation**: Pre-build type checking and compilation

### Code Quality & CI/CD
- **ESLint**: React, TypeScript, and hooks linting with strict configuration
- **TypeScript Compiler**: Zero-tolerance type checking (0 errors in production)
- **GitHub Actions**: Automated CI/CD pipeline (lint → type-check → build → deploy)
- **Railway**: Production deployment platform with automatic deploys on main branch

### Development Tools
- **Playwright MCP**: Browser automation for manual testing and validation
- **React DevTools**: Component debugging and performance profiling
- **TypeScript Language Server**: IDE integration for type checking

## 📊 Project Architecture

### Component Structure
```
src/
├── components/
│   ├── views/
│   │   ├── HomeView.tsx              # Main portfolio landing page
│   │   ├── ProjectDetailView.tsx     # Individual project detail pages
│   │   └── SearchResultsView.tsx     # Global search results
│   ├── AlbumArtModal.tsx             # Full-screen album art viewer
│   ├── BottomPlayer.tsx              # "Now playing" player bar
│   ├── LyricsView.tsx                # Desktop lyrics overlay
│   ├── MediaCard.tsx                 # Reusable project/playlist cards
│   ├── MobilePlayerView.tsx          # Full-screen mobile player
│   ├── NowPlayingPanel.tsx           # Right column with canvas + metadata
│   ├── ProgressBar.tsx               # Seekable audio progress bar
│   ├── ProjectCanvas.tsx             # Canvas video/image system
│   ├── ProjectImage.tsx              # Album art with fallbacks
│   ├── ShareModal.tsx                # Copy-link / native share
│   ├── Sidebar.tsx                   # Left navigation column
│   ├── TopBar.tsx                    # Header with search
│   └── WelcomeModal.tsx              # First-visit onboarding
├── data/
│   ├── projects/                     # Per-project data files
│   │   ├── index.ts                  # Re-exports all projects
│   │   └── *.ts                      # One file per project
│   └── projects.ts                   # Aggregates + applies URL helpers
├── hooks/
│   ├── usePlayer.ts                  # Audio engine + player state
│   ├── useColumnResize.ts            # Column resizing logic
│   ├── useDynamicBackground.ts       # Canvas background color
│   └── useNavigationHistory.ts       # Browser history integration
└── types/
    └── index.ts                      # TypeScript type definitions
```

### Data Schema
Each project follows a consistent track/album structure:
```typescript
interface Project {
  id: string;
  title: string;
  artist: string;             // Role/Company
  album: AlbumCategory;       // Project category enum
  year: string;
  duration: string;           // Project timeline
  image: string;              // Album art path
  impact: string | null;      // Project impact metric
  description: string;        // Music critic style description
  skills: Skill[];            // Technologies used (enum array)
  demoUrl: string | null;     // Live project link
  githubUrl: string | null;   // Repository link
  musicFile: string | null;   // URL to AI-generated MP3
  projectStory: string | null;  // First-person narrative for lyrics
  sunoLyrics: string | null;  // AI-generated song lyrics
  displayLyrics: string | null; // Lyrics for UI display
  sunoStyle: string | null;   // Suno AI style prompt
  canvas: string | null;      // 9:16 canvas video URL
  canvasPoster: string | null;  // Poster image for video
  albumArtBasedOn: string | null; // Attribution for album art
}
```

## 🎨 Design System

### Color Palette (Spotify-Authentic)
- **Background**: `#000000` (Pure black)
- **Surface**: `#121212`, `#181818`, `#282828` (Elevated surfaces)
- **Primary Text**: `#ffffff` (White)
- **Secondary Text**: `#b3b3b3` (Muted gray)
- **Accent**: `#1db954` (Spotify green)
- **Hover States**: `#1ed760` (Bright green)

### Typography
- **Font Family**: Nunito Sans (Google Fonts)
- **Font Weights**: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **Responsive Sizing**: Mobile-first approach with `text-sm`, `md:text-base`, `lg:text-lg`

### Responsive Breakpoints
- **Mobile**: 320px - 640px (compact cards, single column)
- **Tablet**: 640px - 1024px (medium cards, two-column layouts)
- **Desktop**: 1024px+ (full-size cards, three-panel layout, column resizing)

### Card Sizing (Progressive)
- Mobile: `140px` → Small: `155px` → Medium: `170px` → Large: `188px`
- Album art scales proportionally: `108px` → `123px` → `138px` → `156px`

## 🚀 Development & Deployment

### CI/CD Pipeline
Automated pipeline runs on every PR / push to main:
1. **Lint**: ESLint validation (max 50 warnings)
2. **Type Check**: TypeScript compilation check (0 errors required)
3. **Build**: Production build with image optimization
4. **Quality Gate**: Ensure all checks pass

**Deployment**: Railway watches `main` and auto-deploys on merge (not triggered by GitHub Actions).

### Canvas Video Hosting
- **Development**: Videos stored in `public/assets/canvases/` (gitignored)
- **Production**: Hosted via Cloudflare R2 CDN
- **Format**: MP4 H.264, 9:16 vertical aspect ratio, <2MB, 3-8s seamless loops
- **Fallback**: Automatic fallback to static album art or animated gradients

### Image Optimization
- **Automated**: Build-time PNG→WebP conversion via Vite plugin
- **Quality**: 90% quality setting for visual fidelity
- **Caching**: Intelligent caching system for faster subsequent builds
- **Savings**: 75% average file size reduction

## 📋 Project Status

### ✅ Completed Features (2025-2026)
- **Audio Player**: Real MP3 playback, progress bar, seek, volume, auto-advance (March 2026)
- **Lyrics System**: Desktop center-column overlay, mobile full-screen, per-project lyrics data (March 2026)
- **Share Modal**: Copy-link and native share from NowPlaying panel (March 2026)
- **NowPlaying Redesign**: Dynamic background color from album art, expanded metadata (March 2026)
- **Project Data Refactor**: Per-project files under `src/data/projects/` (January 2026)
- **Music & Lyrics Infrastructure**: Full data model for AI-generated music, lyrics, and style prompts (January 2026)
- **First-Visit Welcome Modal**: Onboarding experience for new visitors (November 2025)
- **TypeScript Conversion**: Complete type safety with 0 compilation errors (September 2025)
- **Vite 5 Upgrade**: Modern build tooling with automated image optimization (October 2025)
- **Mobile Canvas Backgrounds**: Full-screen immersive canvas on mobile detail pages (October 2025)
- **CI/CD Pipeline**: Consolidated GitHub Actions workflow with Railway deployment (October 2025)
- **Spotify-Authentic Redesign**: 6-phase comprehensive UI overhaul (August 2025)
- **Column Resizing System**: Advanced drag-to-resize with Spotify behavior (August 2025)
- **Global Search**: Comprehensive search with dedicated results page (August 2025)
- **Canvas Fallback System**: Video → image → animated gradient fallbacks (August 2025)

### 🎯 Production Ready
- Zero TypeScript errors
- ESLint compliant (under 50 warnings threshold)
- Automated CI/CD deployment to Railway
- Comprehensive responsive design (320px - 1920px)
- Cross-browser compatibility (Chrome, Firefox, Safari)

## 🎯 What This Project Demonstrates

### Technical Skills
- **Modern React Patterns**: Hooks, context, component composition, state management
- **TypeScript Mastery**: Comprehensive type definitions and interfaces
- **Responsive Design**: Mobile-first progressive enhancement across all devices
- **Performance Optimization**: 60fps animations, optimized builds, efficient rendering
- **CI/CD Best Practices**: Automated testing, linting, and deployment pipelines

### Design Skills
- **UI Recreation**: Pixel-perfect implementation of complex UI patterns
- **Design Systems**: Consistent color, typography, and component systems
- **User Experience**: Intuitive navigation and familiar interaction patterns
- **Accessibility**: Keyboard navigation and semantic HTML

### Engineering Practices
- **Clean Code**: Well-organized component architecture with clear separation of concerns
- **Type Safety**: Enterprise-grade TypeScript implementation
- **Version Control**: Professional git workflow with meaningful commits
- **Documentation**: Comprehensive inline documentation and README

## Acknowledgments

- **[LRC Maker](https://github.com/magic-akari/lrc-maker)** by magic-akari — Used to create time-synced lyrics for each track. An excellent browser-based tool for synchronizing lyrics to audio by tapping along to the song.

## 📄 License

This project is intended for portfolio demonstration purposes. Spotify's design patterns are used for educational/personal portfolio purposes under fair use.

---

**Developer**: Josh Dutcher
**Last Updated**: March 17, 2026
**Status**: Production Ready
