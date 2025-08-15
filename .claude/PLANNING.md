# PLANNING.md - Joshlify Portfolio

## Vision

**Joshlify** is a personal portfolio website that reimagines the traditional developer portfolio as a Spotify-like music streaming interface. Each development project becomes an "album" with rich visual presentation, detailed information, and an engaging browsing experience that leverages familiar UI patterns from music streaming platforms.

**Core Metaphor**: Projects = Albums, Skills = Genres, Experience = Discography

## Architecture

### Design Pattern
- **Component-Based Architecture**: Modular UI components for albums, players, navigation
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Progressive Enhancement**: Core content accessible, enhanced features for capable browsers
- **Performance-First**: Optimized loading and smooth interactions

### Package Structure
```
src/
├── components/           # Reusable UI components
│   ├── Album/           # Album card and detail components
│   ├── Player/          # Portfolio "player" interface
│   ├── Navigation/      # Sidebar and top navigation
│   ├── Grid/            # Album grid and list views
│   └── Common/          # Shared UI elements
├── data/                # Project data and configurations
│   ├── projects.json    # Project/album information
│   └── skills.json      # Skills/genres mapping
├── assets/              # Static assets
│   ├── images/          # Album art, screenshots
│   ├── icons/           # UI icons and logos
│   └── audio/           # Optional sound effects
├── styles/              # Styling and themes
│   ├── spotify-theme/   # Spotify-inspired color schemes
│   └── components/      # Component-specific styles
└── utils/               # Helper functions and utilities
```

### Data Architecture
- **Project Schema**: Album-like data structure with metadata
- **Skill Mapping**: Skills categorized as music genres
- **Experience Timeline**: Chronological project organization
- **Asset Management**: Optimized images and media handling
- **Canvas System**: Visual project backgrounds (video/image, 9:16 aspect ratio)

### Key Abstractions
- **Album**: A completed project with rich metadata
- **Playlist**: Curated collections of related projects
- **Genre**: Skill categories and technology groupings
- **Player**: Portfolio navigation and detail interface

## Tech Stack

### Core Technologies
- **Frontend Framework**: React/Next.js for component architecture and routing
- **Styling**: CSS Modules or Styled Components for component-scoped styles
- **State Management**: React Context or Redux for application state
- **Build Tools**: Vite or Next.js for optimized bundling
- **Asset Optimization**: Image compression and lazy loading

### UI/UX Technologies
- **Animation**: Framer Motion for smooth transitions
- **Icons**: Custom Spotify-inspired iconography
- **Typography**: Modern web fonts optimized for readability
- **Responsive Design**: CSS Grid and Flexbox for layout

### Performance & SEO
- **Static Generation**: Pre-generated pages for fast loading
- **Image Optimization**: WebP format with fallbacks
- **SEO**: Meta tags, Open Graph, and structured data
- **Analytics**: Privacy-focused visitor tracking

### Testing
- **Unit Tests**: Jest for component and utility testing
- **Integration Tests**: Testing Library for user interaction flows
- **Visual Tests**: Screenshot-based regression testing
- **Performance Tests**: Lighthouse and Core Web Vitals monitoring

## Required Tools

### Development Environment
- Node.js 18+ for modern JavaScript features
- Package manager (npm/yarn/pnpm)
- Modern code editor with TypeScript support
- Git for version control

### Design & Assets
- Image editing software for album art creation
- Screenshot tools for project documentation
- Color picker for Spotify theme accuracy
- Icon creation or curation tools

### Deployment & Hosting
- Static site hosting (Netlify, Vercel, GitHub Pages)
- CDN for asset delivery
- Custom domain configuration
- SSL certificate management

### External Services Setup
- Google Analytics or privacy-focused alternative
- Contact form backend service
- Optional: Music API for real Spotify integration
- Social media sharing capabilities

### API Keys & Configuration
- Hosting platform deployment keys
- Analytics tracking codes
- Contact form service credentials
- Optional: Spotify API credentials for enhanced features

## Design Specifications

### Visual Design
- **Color Scheme**: Spotify-inspired dark theme with green accents
- **Layout**: Familiar three-panel layout (sidebar, main content, detail panel)
- **Typography**: Clean, readable fonts for both headers and body text
- **Iconography**: Music-inspired icons adapted for portfolio context

### User Experience
- **Navigation**: Intuitive music app navigation patterns
- **Search**: Quick project/skill filtering and search
- **Detail Views**: Rich project information with screenshots and demos
- **Responsive**: Seamless experience across all device sizes

### Album/Project Presentation
- **Album Art**: Eye-catching visuals representing each project
- **Metadata**: Tech stack, duration, team size, role
- **Track Listing**: Key features and accomplishments
- **Liner Notes**: Detailed project description and learnings

## Performance Targets

### Loading Performance
- **Initial Load**: < 3 seconds on 3G networks
- **Navigation**: < 500ms between page transitions
- **Image Loading**: Progressive loading with placeholders
- **Bundle Size**: < 500KB initial, < 2MB total

### User Experience Metrics
- **Interaction Response**: < 100ms for UI feedback
- **Animation Performance**: 60fps on modern devices
- **Mobile Performance**: Optimized for touch interactions
- **Accessibility**: WCAG 2.1 AA compliance

## Security & Privacy

### Data Privacy
- **Minimal Tracking**: Only essential analytics
- **No Personal Data**: Portfolio content only
- **Cookie Policy**: Clear disclosure of any tracking
- **Contact Security**: Secure form handling

### Technical Security
- **HTTPS**: Secure delivery for all content
- **Content Security Policy**: XSS protection
- **Asset Integrity**: Subresource integrity for external assets
- **Regular Updates**: Keep dependencies current

## Implementation Status
*For current project status and active development progress, see CLAUDE.md and SESSION.md*

### Architecture Status
- **Planning Phase**: ✅ Complete
- **Setup Phase**: 🔄 In Progress (Claude configuration)
- **Development Phase**: ⏳ Pending (existing codebase integration)
- **Polish Phase**: ⏳ Future
- **Deployment Phase**: ⏳ Future

## Future Considerations

### Enhanced Features
- **Real Spotify Integration**: Connect with actual Spotify account
- **Music Player**: Background music while browsing portfolio
- **Social Features**: Sharing capabilities and visitor engagement
- **Interactive Elements**: Playable demos and live code examples

### Advanced Functionality
- **Dynamic Content**: CMS integration for easy project updates
- **Performance Monitoring**: Real-time performance analytics
- **A/B Testing**: Experiment with different presentation styles
- **Internationalization**: Multi-language support

## Current Issues to Fix (Phase 2)

### Layout & UI Fixes Required
1. **TopBar Issue**: TopBar not spanning full screen width like authentic Spotify
2. **Auto-Play on Load**: Set Campbell Zafar as default "now playing" on first load
3. **Logo Simplification**: Remove "Spotify" text, keep only circular logo + "Joshlify"
4. **Bottom Player Position**: Move "now playing" bar to bottom of screen (desktop only)
5. **Scroll Issue**: Middle column not responding to mouse scroll wheel
6. **Dynamic Greeting**: Change "Good Morning" based on time of day

### Priority Order
- **High**: TopBar layout, Bottom player positioning, Auto-play setup
- **Medium**: Logo fix, Scroll functionality
- **Low**: Dynamic greeting

## Canvas Feature Specification

### Canvas System Requirements
**Purpose**: Immersive visual backgrounds for project presentations, inspired by Spotify Canvas

**Technical Specifications**:
- **Aspect Ratio**: 9:16 (vertical orientation, mobile-first)
- **Video Format**: MP4, H.264 codec recommended
- **Video Duration**: 3-8 seconds, seamless loop
- **Image Format**: JPG/PNG fallback for static canvases
- **Resolution**: 720x1280 minimum, 1080x1920 preferred
- **File Size**: <2MB for videos, <500KB for images

**Implementation Details**:
- Auto-play looping videos when project is "currently playing"
- Fade transition between canvases when switching projects
- Lazy loading for performance optimization
- Fallback to static images when videos unavailable
- Muted playback (visual only, no audio)

**Data Integration**:
```json
{
  "id": "project-id",
  "title": "Project Name",
  "canvas": {
    "video": "/canvases/project-id.mp4",
    "image": "/canvases/project-id.jpg",
    "fallback": "/canvases/default.jpg"
  }
}
```

**UI Integration**:
- Display in right panel when project is "currently playing"
- Blur/dim effect behind project details text
- Responsive: hide on mobile, show on desktop (>768px)
- Canvas container maintains 9:16 aspect ratio with overflow hidden

### Previously Identified Features
- **Dark/Light Theme Toggle**: While maintaining Spotify aesthetic
- **Advanced Filtering**: Multiple criteria project filtering
- **Project Timeline**: Interactive career progression view
- **Skill Visualization**: Creative representation of technical skills

### Additional Future Enhancement Ideas
*Brainstorming notes for potential far-future development:*
- **Virtual DJ Interface**: Creative presentation of coding skills
- **Collaborative Playlists**: Showcase team projects differently
- **Live Coding Sessions**: Stream development work like live music
- **Portfolio Analytics**: Detailed visitor engagement insights
- **Interactive Canvas**: Click-through to project demos from canvas area