# Joshify - Spotify-Inspired Portfolio

**A personal portfolio website reimagined as a music streaming platform**

Joshify transforms the traditional developer portfolio into an engaging Spotify-like experience where development projects become "tracks," skills become "genres," and your career becomes a carefully curated musical journey.

## ✨ Features

### 🎵 Core Experience
- **Project-as-Track Metaphor**: Each development project presented as a music track with rich metadata
- **Collection System**: Curated project collections organized like Spotify playlists
- **Interactive Player**: Portfolio navigation with familiar music player controls
- **Canvas Backgrounds**: Dynamic visual backgrounds (videos/images) for immersive project presentation

### 🎨 Authentic Spotify Design
- **Pixel-Perfect UI**: Meticulously recreated Spotify interface with authentic styling
- **Resizable Columns**: Advanced drag-to-resize functionality matching Spotify behavior
- **Hover-to-Appear Scrollbars**: Authentic scrollbar behavior with fade transitions
- **Responsive Design**: Progressive card sizing across all device breakpoints (140px → 188px)

### 🔍 Advanced Search & Navigation
- **Global Search**: Comprehensive search across projects, collections, and metadata
- **Smart Filtering**: "All," "Collections," "Projects" filters throughout interface
- **Clickable Navigation**: Track names and roles link to detailed project pages
- **Playlist-Aware Controls**: Next/previous navigation respects current collection context

### 📱 Modern Development Stack
- **React + Vite**: Fast development with modern tooling
- **Tailwind CSS**: Utility-first styling with responsive design system
- **Lucide Icons**: Consistent iconography matching Spotify aesthetic
- **Playwright Testing**: Automated UI validation and cross-browser testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/joshdutcher/joshify.git
cd joshify

# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📋 Current Status

### ✅ Completed (August-September 2025)
- **6-Phase Spotify-Authentic Redesign**: Complete UI overhaul achieving authentic Spotify patterns
- **Responsive Enhancement Project**: Progressive card sizing and mobile optimization
- **Card Height Optimization (Issue #2)**: Both small and large horizontal cards optimized for authentic Spotify proportions
- **Advanced Features**: Column resizing, global search, canvas system, hover behaviors

### 🎯 Current State: Ready for New Development
**Latest Achievement**: All card optimizations completed (September 22, 2025)
- ✅ Small horizontal cards: Optimized padding and spacing
- ✅ Large horizontal cards: Achieved authentic 40px height with proper proportions
- ✅ Comprehensive responsive testing: Validated across all breakpoints (320px-1920px)

### 🔮 Future Enhancement Opportunities
**Potential Next Steps**: Open for new development priorities
- Enhanced scrollbar behavior (hover-to-appear with fade transitions)
- Horizontal navigation improvements (right-arrow navigation)
- Content and asset management expansion

### 🔮 Future Enhancements
- **Content & Asset Management**: Complete cover art and canvas video coverage
- **Real Spotify Integration**: Connect with actual Spotify API
- **Performance Optimization**: Advanced caching and CDN integration
- **Accessibility Enhancement**: WCAG 2.1 AAA compliance

## 📊 Project Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── views/           # Page-level view components
│   ├── HorizontalCardSection.js  # Card grid layouts
│   ├── Sidebar.js       # Left navigation column
│   ├── TopBar.js        # Header with search and navigation
│   ├── BottomPlayer.js  # Now playing interface
│   └── ...              # Other UI components
├── data/                # Project data and configuration
│   └── projects.js      # All project metadata
├── hooks/               # Custom React hooks
│   ├── usePlayer.js     # Player state management
│   ├── useColumnResize.js  # Column resizing logic
│   └── ...              # Other custom hooks
└── utils/               # Helper functions and utilities
```

### Data Schema
Each project follows a consistent album-like structure:
```javascript
{
  id: "project-id",
  title: "Project Name",
  artist: "Role/Company",
  albumArt: "/album-art/project-id.png",
  canvas: {
    video: "/canvases/project-id.mp4",
    image: "/canvases/project-id.png"
  },
  // ... additional metadata
}
```

## 🧪 Testing & Validation

### Development Testing
- **Playwright MCP Integration**: Automated browser testing with headless validation
- **Cross-Device Testing**: 320px, 375px, 768px, 1440px viewport validation
- **Interactive Testing**: Hover states, scrolling, navigation, and resizing behavior
- **Performance Testing**: 60fps animations, smooth transitions, fast loading

### Quality Assurance
- **ESLint Configuration**: React + JSX linting (40 warnings, 0 errors)
- **Visual Regression**: Screenshot-based testing for UI consistency
- **Accessibility**: Keyboard navigation and screen reader compatibility
- **Cross-Browser**: Chrome, Firefox, Safari compatibility testing

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile (320px-640px)**: Compact cards, touch-optimized navigation
- **Tablet (640px-1024px)**: Medium cards, hybrid interaction patterns
- **Desktop (1024px+)**: Full-size cards, hover states, column resizing

### Card Sizing (Progressive)
- `140px` (mobile) → `155px` (sm) → `170px` (md) → `188px` (lg+)
- Cover art scales proportionally: `108px` → `123px` → `138px` → `156px`

## 🎨 Design System

### Colors (Spotify-Authentic)
- **Background**: `#000000` (Pure black)
- **Surface**: `#121212`, `#2a2a2a`, `#333333` (Graduated grays)
- **Primary**: `#ffffff` (White text)
- **Secondary**: `#b3b3b3` (Muted text)
- **Accent**: `#1db954` (Spotify green)

### Typography
- **Font**: Nunito Sans (web font)
- **Sizes**: Responsive text sizing with mobile-first approach
- **Hierarchy**: Clear distinction between titles, subtitles, and body text

## 🔧 Development Configuration

### Environment Setup
```bash
# Required tools
node --version  # v18+
npm --version   # Latest stable

# Project commands
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run lint    # Code quality check
npm run preview # Test production build
```

### Canvas Video Hosting
- **Development**: Videos in `public/canvases/` (gitignored)
- **Production**: GitHub Releases CDN hosting strategy
- **Format**: MP4 H.264, 9:16 aspect ratio, <2MB, 3-8s loops

## 📖 Documentation

### Project Documentation (`.claude/` directory)
- **PLANNING.md**: Architecture, design specifications, implementation status
- **TASKS.md**: Current development priorities and completed milestones
- **CLAUDE.md**: Development guide, standards, and environment setup
- **SESSION.md**: Current session state and immediate context

### Usage & Development
- **Development Standards**: Modern JavaScript/TypeScript patterns
- **Code Organization**: Component-based architecture with clear separation
- **Testing Strategy**: Automated validation with Playwright MCP
- **Deployment**: Ready for static hosting (Vercel, Netlify, Railway)

## 🤝 Contributing

This is a personal portfolio project showcasing a Spotify-inspired design system. While primarily for personal use, the codebase demonstrates:

- **Advanced React Patterns**: Modern hooks, component composition, state management
- **Authentic UI Recreation**: Pixel-perfect Spotify interface implementation
- **Responsive Design Mastery**: Progressive enhancement across all devices
- **Performance Optimization**: Smooth interactions and fast loading
- **Accessibility Compliance**: Keyboard navigation and screen reader support

## 📄 License

This project is intended for portfolio demonstration purposes. Spotify's design patterns are used for educational/personal portfolio purposes under fair use.

---

**Live Demo**: [Coming Soon - Deployment Pending]
**Developer**: Josh Dutcher
**Last Updated**: September 22, 2025