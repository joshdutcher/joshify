# SESSION.md - Current Session State

## Current Session - April 1, 2026
**Status**: Complete
**Focus**: Time-synced lyrics system overhaul

### Session Context
Working on `feat/time-synced-lyrics` branch. Rebuilt the lyrics system around synced JSON files as single source of truth.

### Accomplishments
1. **Time-Synced Lyrics System**:
   - LyricsPreview component with scroll-up animation in NowPlaying sidebar
   - Stanza breaks encoded as empty-text entries in lyrics JSON
   - 🎵 emoji with pulse animation for instrumental breaks
   - Tighter letter-spacing on all lyrics text
   - Scroll-to-top on track change in desktop lyrics view

2. **Lyrics Data Cleanup**:
   - Removed `displayLyrics` from rendering pipeline (kept as reference data in project files)
   - Removed `sunoLyrics` fallback — synced lyrics are sole display source
   - Removed unused `end` field from SyncedLyric type
   - Deleted .lrc source files — JSON is canonical format
   - Re-synced all timestamps via LRC Maker tool

3. **Player Enhancements**:
   - Left/right arrow keyboard seek (±5s)
   - Previous track button restarts song if past 5 seconds
   - All Projects playlist added to sidebar
   - Deep linking for /playlist/ URLs

4. **Mobile Lyrics**:
   - Synced lyrics in mobile player preview with auto-scroll
   - Full highlight and stanza break support

5. **Misc**:
   - Acknowledged LRC Maker in README
   - Deleted Zone.Identifier files
