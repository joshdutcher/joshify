# PLANNING.md - Joshify Architecture

## Project Vision

**Joshify** is a personal portfolio website that reimagines the developer portfolio as a Spotify-like music streaming interface. Projects become "tracks" with rich visual presentation, leveraging familiar UI patterns from music streaming platforms.

**Core Metaphor**: Projects = Tracks | Collections = Playlists | Skills = Genres | Experience = Discography

---

## Architecture Overview

### Design Patterns
- **Component-Based Architecture**: Modular React components with TypeScript
- **Mobile-First Responsive Design**: Progressive enhancement from 320px to 1920px+
- **Performance-First**: Optimized loading, 60fps animations, efficient rendering
- **Progressive Enhancement**: Core content accessible, enhanced features for capable devices

### Tech Stack

**Frontend**:
- React 18.2 (hooks-based architecture)
- TypeScript 5.9 (strict type checking)
- Tailwind CSS 3.3 (Spotify-authentic theme)
- Vite 5.4 (dev server + production builds)

**Build Pipeline**:
- Vite Plugin Image Optimizer (PNG→WebP conversion)
- TypeScript compiler (pre-build type checking)
- ESLint (code quality enforcement)
- Sharp (image processing)

**Infrastructure**:
- GitHub Actions (CI/CD pipeline)
- Railway (deployment platform)
- Cloudflare R2 (canvas video CDN)
- Matomo (privacy-focused analytics)

---

## Component Architecture

### Core Components

**Layout Components**:
- `App.tsx` - Root component with routing
- `Sidebar.tsx` - Left navigation panel
- `TopBar.tsx` - Header with search
- `BottomPlayer.tsx` - Persistent player bar
- `NowPlayingPanel.tsx` - Right column "now playing" display

**View Components**:
- `HomeView.tsx` - Main landing page
- `ProjectDetailView.tsx` - Individual project pages
- `SearchView.tsx` - Search results page
- `PlaylistView.tsx` - Collection/playlist pages
- `ProfileView.tsx` - About/contact page

**Feature Components**:
- `ProjectCanvas.tsx` - Canvas video/image system with fallbacks
- `ProjectImage.tsx` - Album art with lazy loading
- `ResizeHandle.tsx` - Column resizing functionality
- `SearchBar.tsx` - Search input with filtering
- `MediaCard.tsx` - Reusable project/playlist cards

### Custom Hooks

**State Management**:
- `usePlayer.ts` - Player state (now playing, navigation)
- `useColumnResize.ts` - Column width management
- `useDynamicBackground.ts` - Canvas background state
- `useNavigationHistory.ts` - Browser history integration

### Utilities

**Helper Functions**:
- `canvas.ts` - Environment-aware URL resolution (local vs CDN)
- `colorExtractor.ts` - Album art dominant color extraction
- `typeGuards.ts` - TypeScript type narrowing utilities
- `analytics.ts` - Matomo analytics integration

---

## Data Architecture

### Project Schema
```typescript
interface Project {
  id: string;
  title: string;
  artist: string;           // "Project - Company" format
  album: AlbumCategory;     // Project category enum
  year: string;
  duration: string;         // Project timeline
  image: string;            // Album art path
  canvas?: string;          // Canvas video URL (via getCanvasUrl)
  canvasPoster?: string;    // Poster image for instant feedback
  description: string;      // Music critic-style project description
  skills: Skill[];          // Technology stack (enum array)
  demoUrl?: string;         // Live project URL
  githubUrl?: string;       // Repository URL
  impact?: string;          // Key metric or achievement
  albumArtBasedOn?: string; // Attribution for album art inspiration
}
```

### Collection Schema
```typescript
interface PlaylistCollection {
  id: string;
  name: string;
  type: 'playlist';
  description: string;      // Brief Spotify-style description
  image: string;            // Playlist cover art
  trackIds: string[];       // Project IDs in collection
  company?: string;         // Employer/organization
}
```

---

## File Structure

```
src/
├── components/
│   ├── views/              # Page-level components
│   │   ├── HomeView.tsx
│   │   ├── ProjectDetailView.tsx
│   │   ├── SearchView.tsx
│   │   ├── PlaylistView.tsx
│   │   └── ProfileView.tsx
│   ├── AlbumArtModal.tsx
│   ├── BottomPlayer.tsx
│   ├── MediaCard.tsx
│   ├── NowPlayingPanel.tsx
│   ├── ProjectCanvas.tsx
│   ├── ProjectImage.tsx
│   ├── ResizeHandle.tsx
│   ├── SearchBar.tsx
│   ├── Sidebar.tsx
│   └── TopBar.tsx
├── data/
│   └── projects.ts         # Centralized project and collection data
├── hooks/
│   ├── usePlayer.ts
│   ├── useColumnResize.ts
│   ├── useDynamicBackground.ts
│   └── useNavigationHistory.ts
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── analytics.ts
│   ├── canvas.ts
│   ├── colorExtractor.ts
│   └── typeGuards.ts
├── App.tsx                 # Root component
├── main.tsx               # Entry point
└── index.css              # Global styles (Tailwind)
```

---

## Design System

### Spotify-Authentic Color Palette
```css
--bg-black: #000000        /* Pure black background */
--bg-dark: #121212         /* Elevated surface */
--bg-card: #181818         /* Card backgrounds */
--bg-hover: #282828        /* Hover states */
--text-primary: #ffffff    /* Primary text */
--text-secondary: #b3b3b3  /* Muted text */
--accent-green: #1db954    /* Spotify green */
--accent-hover: #1ed760    /* Bright green hover */
```

### Responsive Breakpoints
- **Mobile**: 320px - 640px (single column, compact)
- **Tablet**: 640px - 1024px (two columns, medium cards)
- **Desktop**: 1024px+ (three panels, full features)

### Typography
- **Font**: Nunito Sans (Google Fonts)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **Scale**: Mobile-first with responsive sizing (`text-sm md:text-base lg:text-lg`)

---

## Asset Strategy

### Album Art
- **Format**: PNG (committed to repo)
- **Location**: `public/album-art/`
- **Processing**: Auto-converted to WebP at build time
- **Optimization**: Quality 90, ~75% size reduction

### Canvas Videos
- **Format**: MP4 H.264, 9:16 aspect ratio
- **Target Size**: <2MB per video
- **Local Dev**: Served from `public/canvases/` (gitignored)
- **Production**: Hosted on Cloudflare R2 CDN
- **Fallback**: Video → Album Art → Animated Gradient

### Environment-Based URLs
```typescript
// Development: VITE_USE_LOCAL_CANVAS=true
// Returns: /canvases/video.mp4 (served by Vite)

// Production: VITE_USE_LOCAL_CANVAS=false
// Returns: https://cdn.joshify.dev/video.mp4 (Cloudflare R2)
```

---

## Performance Strategy

### Build Optimizations
- Pre-build TypeScript compilation check
- Automated WebP generation from PNG sources
- Build-time PNG/WebP optimization
- Tree shaking and code splitting
- Source maps for debugging

### Runtime Optimizations
- Lazy loading for canvas videos
- Intersection Observer for image loading
- Debounced resize handlers
- Memoized color extraction
- Efficient re-render prevention

### Delivery Optimizations
- CDN for large video assets
- FastStart MP4 encoding for streaming
- Poster images for instant visual feedback
- Optimized image formats (WebP)
- Railway edge deployment

---

## Development Workflow

### Local Development
```bash
npm run dev        # Start Vite dev server (port 3000)
npm run lint       # ESLint validation
npm run type-check # TypeScript validation
npm run ci         # Full CI pipeline (lint + type + build)
```

### Pre-Commit Checklist
1. Run `npm run ci` to verify all checks pass
2. Ensure zero TypeScript errors
3. Keep ESLint warnings under 50
4. Test responsive behavior (mobile/tablet/desktop)
5. Verify canvas videos load properly

### Deployment Pipeline
**Automatic on push to main**:
1. GitHub Actions: Lint → Type Check → Build → Quality Gate
2. Railway: Deploy production build
3. Cloudflare R2: Serve canvas assets

---

## Future Considerations

### Potential Enhancements
- Service Worker for offline support
- Preload strategies for faster navigation
- Lazy loading optimization
- Core Web Vitals monitoring
- A/B testing framework

### Scalability
- Current architecture supports 50+ projects
- Canvas CDN handles high traffic
- Component architecture scales well
- Type safety prevents regression bugs
