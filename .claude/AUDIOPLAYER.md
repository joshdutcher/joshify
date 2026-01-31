# Audio Player Implementation Plan

## Overview

Implement a fully functional audio player for Joshify that plays MP3 tracks for each project. The design follows Spotify's mobile and desktop player patterns.

---

## Design Decisions (Finalized)

- **Header text**: "Now Playing" (static)
- **Heart icons**: Remove ALL heart icons site-wide (not just player)
- **Lyrics**: Include scrollable lyrics in full mobile player AND desktop lyrics view
- **Duration display**: Replace project "duration" string with actual audio track length

---

## Design Requirements

### Mobile Player Bar (Bottom of Screen)
Based on Spotify reference (`/designref/images/spotify-home.png`):

- Album art thumbnail (small, left side)
- Track title and artist name
- Play/pause button (right side)
- Progress bar at the very bottom of the bar
- **Interaction**: Tapping anywhere except play opens full player view

### Full Mobile Player View
Based on Spotify reference (`/designref/images/spotify-mobile-player.png`):

**Header Row:**
- Collapse chevron (top left) - dismisses full player
- "Now Playing" (center)

**Main Content:**
- Large album art (prominent, centered)
- Track title (large text)
- Artist name (smaller, muted text)

**Progress Section:**
- Clickable/draggable progress bar with position dot
- Current playback time (left-aligned below bar)
- Total track duration (right-aligned below bar) - **from audio metadata, not project.duration**

**Controls Row:**
- Previous track
- Play/pause (large, centered)
- Next track

**Lyrics Section:**
- Scrollable lyrics display below controls
- Uses `displayLyrics` or falls back to `sunoLyrics`
- Hidden if no lyrics available

### Desktop Player Bar
Based on Spotify reference (`/designref/images/spotify-home.png`):

**Left Section:**
- Album art thumbnail
- Track title and artist

**Center Section:**
- Previous / Play/Pause / Next controls
- Progress bar (clickable/draggable)
- Current time (left) / Total duration (right) - **from audio metadata**

**Right Section:**
- Microphone icon (lyrics button) with "Lyrics" tooltip
  - Shows lyrics in center column when clicked
- Volume slider

### Desktop Lyrics View
Based on Spotify reference (`/designref/images/spotify-desktop-lyrics.png`):

- Takes over entire center column
- Background color derived from album art (gradient)
- Scrollable lyrics text (not time-synced, just scroll)
- Close button or click outside to dismiss
- Lyrics from `displayLyrics` || `sunoLyrics`

### Lyrics Discoverability

**Problem**: Users may not know tracks have lyrics available.

**Approach**: Implement ALL four options, then user will choose which to keep:
1. **Lyrics badge on project cards** - Small "Lyrics" pill on MediaCard when lyrics exist
2. **Pulsing/glowing microphone icon** - Visual indicator when current track has lyrics
3. **Lyrics preview snippet** - First few lines of lyrics in NowPlayingPanel
4. **"View Lyrics" text link** - Clickable link in NowPlayingPanel

---

## Current Infrastructure (Already Built)

### Music Fields in Project Type
```typescript
readonly musicFile: string | null;      // MP3 URL via getMusicUrl()
readonly sunoLyrics: string | null;     // Song lyrics
readonly displayLyrics: string | null;  // UI display lyrics (preferred)
readonly projectStory: string | null;   // First-person narrative
readonly sunoStyle: string | null;      // AI generation style
```

### Asset Helpers (Already Implemented)
- `getMusicUrl(filename)` - Returns local or CDN URL based on environment
- `getCanvasUrl(filename)` - Same pattern for canvas videos
- All 14 projects have `musicFile` populated
- **Local dev**: `VITE_USE_LOCAL_ASSETS=true` → `/assets/music/filename.mp3`
- **Production**: `VITE_USE_LOCAL_ASSETS=false` → `https://cdn.joshify.dev/assets/music/filename.mp3`
- R2 bucket: `joshify-canvas/assets/music/` (same bucket as videos)

### Preloading Strategy
- **Videos**: `<video preload="auto">` + poster images for instant visual
- **Audio**: `<audio preload="auto">` - browser downloads in background
- **No prefetching**: Next track loads on demand when it starts playing

### Player Hook (usePlayer.ts)
- `audioRef` already created (unused)
- `currentlyPlaying`, `isPlaying` state exists
- `playNextTrack()`, `playPreviousTrack()` implemented
- `currentPlaylist`, `currentTrackIndex` for playlist context

---

## Implementation Tasks

### Phase 0: Remove Heart Icons Site-Wide
- [ ] Remove heart icon from `BottomPlayer.tsx` (desktop and mobile)
- [ ] Remove heart icon from `ProjectDetailView.tsx`
- [ ] Remove heart icon from `NowPlayingPanel.tsx` (if present)
- [ ] Search for any other heart/favorite icons and remove

### Phase 1: Audio Engine
- [ ] Add `<audio preload="auto">` element to App.tsx connected to `audioRef`
- [ ] Load music via `getMusicUrl()` (already handles local/CDN routing)
- [ ] Add audio event listeners (timeupdate, loadedmetadata, ended)
- [ ] Track playback state: `currentTime`, `duration` (from audio metadata)
- [ ] Implement play/pause toggle with audio element
- [ ] Auto-advance to next track on song end (no prefetching, load on demand)

### Phase 2: Mobile Player Bar Redesign
- [ ] Remove chevron-up expand indicator
- [ ] Add small album art thumbnail (left)
- [ ] Show track title and artist (center)
- [ ] Add play/pause button (right)
- [ ] Add thin progress bar at bottom of bar
- [ ] Make entire bar clickable (except play) to open full player

### Phase 3: Full Mobile Player View (New Component)
- [ ] Create `MobilePlayerView.tsx` component
- [ ] Implement as slide-up modal/overlay (not navigation)
- [ ] Header: collapse chevron (left), "Now Playing" (center)
- [ ] Large album art display
- [ ] Track title and artist
- [ ] Interactive progress bar with seek functionality
- [ ] Time display (current / total) from audio metadata
- [ ] Previous / Play/Pause / Next controls
- [ ] Scrollable lyrics section (displayLyrics || sunoLyrics)

### Phase 4: Progress Bar Component
- [ ] Create reusable `ProgressBar.tsx` component
- [ ] Support click-to-seek functionality
- [ ] Support drag-to-seek functionality
- [ ] Show position dot/handle
- [ ] Smooth animation during playback
- [ ] Thin variant for mobile bar, full variant for full player

### Phase 5: State Management Updates
- [ ] Add to usePlayer: `currentTime`, `duration`, `seek(time)`
- [ ] Add `isMobilePlayerOpen` state for full player visibility
- [ ] Add `isLyricsOpen` state for desktop lyrics view
- [ ] Handle loading/buffering states
- [ ] Persist volume preference (localStorage)

### Phase 6: Desktop Player Updates
- [ ] Update desktop BottomPlayer with real progress bar
- [ ] Show actual current time / total duration from audio
- [ ] Connect volume slider to audio element
- [ ] Add microphone icon (lyrics button) with tooltip
- [ ] Ensure skip controls work correctly

### Phase 7: Desktop Lyrics View
- [ ] Create `LyricsView.tsx` component
- [ ] Implement as center column takeover
- [ ] Extract dominant color from album art for background gradient
- [ ] Scrollable lyrics display
- [ ] Close mechanism (button or click outside)
- [ ] Toggle via microphone icon in player bar

### Phase 8: Lyrics Discoverability (Implement ALL - User will choose)
- [ ] Add "Lyrics" badge/pill to MediaCard when project has lyrics
- [ ] Add pulsing/glow effect to microphone icon when current track has lyrics
- [ ] Add lyrics preview snippet (first few lines) to NowPlayingPanel
- [ ] Add "View Lyrics" text link to NowPlayingPanel

---

## Component Architecture

```
App.tsx
├── <audio ref={audioRef} /> (hidden)
├── BottomPlayer (always visible)
│   ├── Mobile: Compact bar → opens MobilePlayerView
│   └── Desktop: Full controls + lyrics button
├── MobilePlayerView (modal overlay when open)
│   ├── Header (collapse chevron, "Now Playing")
│   ├── AlbumArt (large)
│   ├── TrackInfo (title, artist)
│   ├── ProgressBar (interactive)
│   ├── Controls (prev, play, next)
│   └── Lyrics (scrollable)
└── LyricsView (center column takeover on desktop)
    ├── Background gradient from album art
    └── Scrollable lyrics
```

---

## Key Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add `<audio>` element, pass audio state to components |
| `src/hooks/usePlayer.ts` | Add time tracking, seek, lyrics state |
| `src/components/BottomPlayer.tsx` | Redesign mobile, add lyrics button desktop |
| `src/components/MobilePlayerView.tsx` | **NEW** - Full mobile player with lyrics |
| `src/components/LyricsView.tsx` | **NEW** - Desktop lyrics center column |
| `src/components/ProgressBar.tsx` | **NEW** - Reusable interactive progress bar |
| `src/components/MediaCard.tsx` | Add lyrics badge |
| `src/components/NowPlayingPanel.tsx` | Add lyrics preview/link, remove heart |
| `src/components/views/ProjectDetailView.tsx` | Remove heart icon |

---

## Testing Checklist

### Audio Playback
- [ ] Audio plays when play button clicked
- [ ] Audio pauses when pause button clicked
- [ ] Progress bar updates during playback
- [ ] Time display shows actual audio duration (not project.duration string)
- [ ] Seeking works (click and drag)
- [ ] Next/previous track buttons work
- [ ] Auto-advances to next track when song ends

### Mobile Player
- [ ] Mobile bar opens full player on tap
- [ ] Full player dismisses on chevron tap
- [ ] Lyrics scroll correctly
- [ ] Progress bar is interactive in full player

### Desktop Lyrics
- [ ] Microphone icon opens lyrics view
- [ ] Lyrics view takes over center column
- [ ] Background gradient matches album art
- [ ] Lyrics can be dismissed

### Lyrics Discoverability (Test all four)
- [ ] "Lyrics" badge appears on MediaCard for projects with lyrics
- [ ] Microphone icon pulses/glows when current track has lyrics
- [ ] Lyrics preview shows in NowPlayingPanel
- [ ] "View Lyrics" link works in NowPlayingPanel

### General
- [ ] Works with all 14 project tracks
- [ ] Graceful handling when musicFile is null
- [ ] Graceful handling when lyrics are null
- [ ] Works in both development and production (CDN)
- [ ] All heart icons removed site-wide
- [ ] Responsive at all breakpoints
