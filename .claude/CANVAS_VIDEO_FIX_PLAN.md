# Canvas Video State Management Fix - Implementation Plan

**Date**: October 14, 2025
**Issue**: Canvas videos not loading on re-navigation and poster images not displaying correctly

---

## Current Behavior Context

### Expected "Now Playing" Behavior
1. **Initial Load**: "Did Kansas Win?" is default now playing project
2. **Project Detail Navigation**: When user navigates to ANY project detail page, that project becomes "now playing" and its canvas video should play
3. **Non-Detail Navigation**: When navigating to non-project pages (home, playlists, search), right column remains unchanged
4. **Play Button**: Clicking play on any project or playlist changes "now playing"

### Current Implementation
- `usePlayer.ts` line 92-99: `navigateToProject()` automatically sets project as now playing ✅
- `ProjectDetailView.tsx` line 36: Canvas always receives `isPlaying={true}` ✅
- `ProjectCanvas.tsx`: Video element uses `key` attribute causing remount issues ❌

---

## Root Cause Analysis

### Issue #1: Videos Fail on Re-Navigation
**Root Cause**: `ProjectCanvas.tsx` line 220 - `key` attribute forces video remount

**Problem**:
- Key forces React to completely remount video element when project changes
- useEffect (lines 56-70) attempts cleanup but runs AFTER remount
- Browser cache + stale video src causes load failures
- Video element retains previous project's error state

**Evidence**: Navigation pattern: Project A → Project B → Back to Project A = fallback art displays

---

### Issue #2: "Canvas Loading" Flash (No Poster)
**Root Cause**: Loading indicator shows instead of poster image during initial load

**Problem**:
- Poster image is set as video `poster` attribute (line 215)
- But video starts with `opacity-0` (line 210)
- So poster attribute is hidden
- Loading indicator (lines 227-249) displays instead
- Creates jarring flash of loading text before video appears

**Evidence**: Brief "Loading canvas..." text visible on all initial project loads

---

### Issue #3: State Management Race Conditions
**Root Cause**: Multiple useEffect hooks competing during navigation

**Problem**:
- useEffect #1 (lines 56-70): Resets state on project change
- useEffect #2 (lines 72-80): Handles play/pause
- `key` attribute forces remount between these effects
- Race condition: Error state from previous project persists
- New project video fails to load properly

---

## Implementation Plan

### Phase 1: Remove Video Element Remounting
**File**: `ProjectCanvas.tsx`

**Change 1** - Remove `key` attribute (line 220):
```tsx
// BEFORE:
<video
    ref={videoRef}
    // ... other props
    key={`video-${project?.id}`}  // ❌ REMOVE THIS
>

// AFTER:
<video
    ref={videoRef}
    // ... other props
    // No key attribute - let React reuse element
>
```

**Rationale**:
- Let React reuse single video element across navigation
- Manual src management in useEffect more reliable than remounting
- Prevents browser caching issues from stale DOM elements

---

### Phase 2: Fix Video Source Management
**File**: `ProjectCanvas.tsx` (lines 56-70)

**Enhanced useEffect**:
```tsx
useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    setIsLoading(false);
    setLoadProgress(0);
    setAlbumArtError(false);

    const video = videoRef.current;
    if (video && project?.canvas) {
        // Proper cleanup sequence
        video.pause();
        video.removeAttribute('src'); // Clear src attribute
        video.load();                  // Reset video element state

        // Small delay to ensure cleanup completes
        setTimeout(() => {
            if (videoRef.current && project?.canvas) {
                videoRef.current.src = project.canvas;
                videoRef.current.load();
            }
        }, 10);
    } else if (video) {
        // No canvas video - clear video element
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
}, [project?.id, project?.canvas]);
```

**Rationale**:
- Explicit src removal prevents browser cache issues
- setTimeout ensures state reset completes before new video loads
- Handles both video and non-video projects properly

---

### Phase 3: Fix Poster Image Display
**File**: `ProjectCanvas.tsx`

**Change 1** - Update poster image container (lines 198-204):
```tsx
// BEFORE:
{posterImage && (!isLoaded || hasError) && (
    <img
        src={posterImage}
        alt={`${project.title || 'Project'} canvas`}
        className="absolute inset-0 w-full h-full object-cover"
    />
)}

// AFTER:
{posterImage && !isLoaded && !hasError && (
    <img
        src={posterImage}
        alt={`${project.title || 'Project'} canvas`}
        className="absolute inset-0 w-full h-full object-cover z-10"
    />
)}
```

**Change 2** - Update loading indicator condition (line 227):
```tsx
// BEFORE:
{isLoading && !isLoaded && !hasError && (

// AFTER:
{isLoading && !isLoaded && !hasError && !posterImage && (
```

**Rationale**:
- Poster shows during loading phase (not error phase)
- z-10 ensures poster appears above video's opacity-0 state
- Loading indicator only shows when no poster available
- Eliminates "Loading canvas..." flash

---

### Phase 4: Maintain Proper Behavior with "Now Playing"
**No Changes Required** - Current implementation already correct:

✅ `usePlayer.ts` line 96-98: Sets project as now playing on detail page navigation
✅ `ProjectDetailView.tsx` line 36: Always passes `isPlaying={true}` to canvas
✅ Navigation logic preserves now playing state across non-detail pages

**Verified Behavior**:
1. Navigate to project detail → Project becomes now playing, video plays
2. Navigate away (home, playlist, search) → Now playing unchanged, video continues
3. Navigate back to same project detail → Video should reload and play (THIS IS THE FIX)
4. Click different project → New project becomes now playing, new video plays

---

## Testing Strategy

### Test Case 1: Re-Navigation to Same Project
**Steps**:
1. Visit didkansaswin detail page (default now playing)
2. Navigate to home
3. Navigate back to didkansaswin detail page

**Expected**: Video loads and plays immediately
**Currently**: Shows fallback album art ❌
**After Fix**: Video plays ✅

---

### Test Case 2: Poster Image Display
**Steps**:
1. Navigate to any project with canvas video
2. Observe initial load

**Expected**: Poster image visible immediately, smooth transition to video
**Currently**: "Loading canvas..." text flash ❌
**After Fix**: Poster image → video (smooth) ✅

---

### Test Case 3: Cross-Project Navigation
**Steps**:
1. Navigate to Project A detail page
2. Navigate to Project B detail page
3. Navigate to Project C detail page
4. Navigate back to Project A

**Expected**: Each project's video loads and plays
**Currently**: Project A shows fallback on return ❌
**After Fix**: All videos load properly ✅

---

### Test Case 4: Playlist Context Preservation
**Steps**:
1. Click play on project from playlist
2. Navigate to home
3. Click next/previous track

**Expected**: Playlist context maintained, tracks advance properly
**Currently**: Works correctly ✅
**After Fix**: Still works correctly ✅

---

## Files Modified

1. **ProjectCanvas.tsx** (4 changes):
   - Line 220: Remove `key` attribute
   - Lines 56-70: Enhanced video source management with cleanup
   - Lines 198-204: Poster image z-index and conditional logic
   - Line 227: Loading indicator conditional (add `!posterImage`)

---

## Validation Checklist

- [ ] TypeScript compilation passes (0 errors)
- [ ] ESLint validation passes (within thresholds)
- [ ] Test Case 1: Re-navigation video loading works
- [ ] Test Case 2: Poster images display properly
- [ ] Test Case 3: Multi-project navigation works
- [ ] Test Case 4: Playlist context preserved
- [ ] No regression in existing canvas functionality
- [ ] Fallback chain still works (video → art → gradient)

---

## CDN Video Investigation (Separate Task)

**Projects Not Loading**: law-firm-startup-operations, startup-technology-infrastructure

**Deferred**: User will investigate CDN separately
- Check Backblaze B2 bucket for file existence
- Verify exact filename matching (case-sensitive)
- Confirm CORS headers
- Test direct CDN URLs

---

## Implementation Execution

**Ready to proceed** with ProjectCanvas.tsx fixes following this plan.
