import React, { useState, useEffect, useRef } from 'react';
import usePlayer from '@/hooks/usePlayer';
import useColumnResize from '@/hooks/useColumnResize';
import useDynamicBackground from '@/hooks/useDynamicBackground';
import { isPlaylist, isProject } from '@/utils/typeGuards';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import BottomPlayer from '@/components/BottomPlayer';
import NowPlayingPanel from '@/components/NowPlayingPanel';
import ResizeHandle from '@/components/ResizeHandle';
import HomeView from '@/components/views/HomeView';
import ProfileView from '@/components/views/ProfileView';
import PlaylistView from '@/components/views/PlaylistView';
import ProjectDetailView from '@/components/views/ProjectDetailView';
import SearchView from '@/components/views/SearchView';
import CompanyView from '@/components/views/CompanyView';
import DomainView from '@/components/views/DomainView';
import WelcomeModal from '@/components/WelcomeModal';
import MobilePlayerView from '@/components/MobilePlayerView';
import LyricsView from '@/components/LyricsView';

const SpotifyResume = () => {
    // Welcome modal state - show on first visit
    const [showWelcome, setShowWelcome] = useState(() => {
        return !localStorage.getItem('joshify_welcome_seen');
    });

    const handleWelcomeClose = () => {
        setShowWelcome(false);
        localStorage.setItem('joshify_welcome_seen', 'true');
    };

    const handleShowWelcome = () => {
        setShowWelcome(true);
    };
    const {
        currentlyPlaying,
        isPlaying,
        currentView,
        selectedPlaylist,
        sidebarOpen,
        currentPlaylist,
        currentTrackIndex,
        searchQuery,
        audioRef,
        // Audio state
        currentTime,
        duration,
        volume,
        currentMusicUrl,
        hasLyrics,
        currentLyrics,
        // Mobile/Lyrics UI state
        isMobilePlayerOpen,
        isLyricsOpen,
        // Actions
        handlePlayProject,
        playNextTrack,
        playPreviousTrack,
        navigateToView,
        navigateToProject,
        navigateToPlaylist,
        navigateToCompany,
        navigateToDomain,
        navigateToSearch,
        toggleSidebar,
        closeSidebar,
        setIsPlaying,
        setSearchQuery,
        // Audio controls
        seek,
        updateVolume,
        // Lyrics controls
        toggleLyrics,
        // Mobile player controls
        openMobilePlayer,
        closeMobilePlayer,
        // Audio event handlers
        handleTimeUpdate,
        handleLoadedMetadata,
        handleEnded,
        handleWaiting,
        handleCanPlay
    } = usePlayer();

    const {
        leftColumnWidth,
        leftColumnMode,
        isLeftResizing,
        startLeftResize,
        rightColumnWidth,
        isRightResizing,
        startRightResize,
    } = useColumnResize();

    // Determine the image to use for color extraction
    const getBackgroundImage = () => {
    // Priority: Currently playing > Selected playlist/project > No gradient
        if (currentlyPlaying) {
            // If there's a canvas image, use that; otherwise use the project's main image
            if (currentlyPlaying.canvas) {
                return currentlyPlaying.canvas;
            } else if (currentlyPlaying.image) {
                return currentlyPlaying.image;
            }
        }
        if (selectedPlaylist && 'image' in selectedPlaylist && selectedPlaylist.image) {
            return selectedPlaylist.image;
        }
        // No gradient when nothing is playing
        return null;
    };

    const { backgroundStyle } = useDynamicBackground(getBackgroundImage());

    const handleNavigateToProfile = () => {
        navigateToView('profile');
    };

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleNavigateToSearch = (query: string) => {
        navigateToSearch(query);
    };

    // Track previous music URL to differentiate between track change vs play/pause toggle
    const prevMusicUrlRef = useRef<string | null>(null);

    // Control audio playback - handles both track changes and play/pause toggles
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const prevUrl = prevMusicUrlRef.current;
        const urlChanged = currentMusicUrl !== prevUrl;

        if (urlChanged) {
            // Track changed - load new source first, then play if needed
            prevMusicUrlRef.current = currentMusicUrl;

            if (currentMusicUrl) {
                audio.src = currentMusicUrl;
                audio.load();
                if (isPlaying) {
                    audio.play().catch(() => {
                        setIsPlaying(false);
                    });
                }
            } else {
                // No music URL - pause and clear
                audio.pause();
            }
        } else {
            // Same track - just toggle play/pause
            if (isPlaying && currentMusicUrl) {
                audio.play().catch(() => {
                    setIsPlaying(false);
                });
            } else {
                audio.pause();
            }
        }
    }, [isPlaying, currentMusicUrl, setIsPlaying, audioRef]);

    // Set initial volume
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
        }
    }, [volume, audioRef]);

    return (
        <div
            className="flex flex-col bg-spotify-black text-spotify-primary overflow-hidden"
            style={{
        '--left-sidebar-width': `${leftColumnWidth}px`,
        '--right-sidebar-width': `${rightColumnWidth}px`,
        height: '100dvh'
      } as React.CSSProperties}
    >
            {/* Top Bar - Full Width */}
            <TopBar
                currentView={currentView}
                onNavigateToView={navigateToView}
                onNavigateToProfile={handleNavigateToProfile}
                onToggleSidebar={toggleSidebar}
                onSearch={handleSearch}
                onNavigateToSearch={handleNavigateToSearch}
      />

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-0 bg-black pt-1" style={{paddingLeft: '2px', paddingRight: '2px'}}>
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
          />
        )}

                {/* Sidebar */}
                <div className="flex">
                    <Sidebar
                        currentView={currentView}
                        sidebarOpen={sidebarOpen}
                        onNavigateToView={navigateToView}
                        onNavigateToPlaylist={navigateToPlaylist}
                        onNavigateToProject={navigateToProject}
                        onCloseSidebar={closeSidebar}
                        onShowWelcome={handleShowWelcome}
                        width={leftColumnWidth}
                        mode={leftColumnMode}
                        style={isLeftResizing ? {} : { width: `${leftColumnWidth}px` }}
          />

                    {/* Left Resize Handle - Desktop Only */}
                    <div className="hidden md:block">
                        <ResizeHandle
                            orientation="vertical"
                            onMouseDown={startLeftResize}
                            isDragging={isLeftResizing}
            />
                    </div>
                </div>

                {/* Content Area with Right Panel */}
                <div className="flex flex-1 min-w-0">
                    {/* Main Content */}
                    <div
                        className="flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg spotify-scrollbar"
                        style={{
                            scrollBehavior: 'smooth',
                            // Only apply background when lyrics aren't showing (LyricsView has its own)
                            ...(!(isLyricsOpen && currentlyPlaying) && {
                                background: backgroundStyle.background,
                                transition: 'background 0.8s ease-in-out'
                            })
                        }}
                    >
                        {/* Desktop Lyrics View - replaces center column content */}
                        {isLyricsOpen && currentlyPlaying ? (
                            <LyricsView
                                project={currentlyPlaying}
                                lyrics={currentLyrics}
                            />
                        ) : (
                            <>
                                {currentView === 'home' && (
                                    <HomeView
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        currentPlaylist={currentPlaylist}
                                        onPlayProject={handlePlayProject}
                                        onNavigateToProject={navigateToProject}
                                        onNavigateToPlaylist={navigateToPlaylist}
                                        onNavigateToProfile={handleNavigateToProfile}
                                        onNavigateToCompany={navigateToCompany}
                                        onNavigateToDomain={navigateToDomain}
                                    />
                                )}
                                {currentView === 'playlist' && selectedPlaylist && isPlaylist(selectedPlaylist) && (
                                    <PlaylistView
                                        playlist={selectedPlaylist}
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        onPlayProject={handlePlayProject}
                                        onNavigateToProject={navigateToProject}
                                        onNavigateToCompany={navigateToCompany}
                                        onNavigateToDomain={navigateToDomain}
                                    />
                                )}
                                {currentView === 'project' && selectedPlaylist && isProject(selectedPlaylist) && (
                                    <ProjectDetailView
                                        project={selectedPlaylist}
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        onPlayProject={handlePlayProject}
                                        onClose={() => navigateToView('home')}
                                        onMobileBack={() => window.history.back()}
                                    />
                                )}
                                {currentView === 'profile' && <ProfileView />}
                                {currentView === 'search' && (
                                    <SearchView
                                        searchQuery={searchQuery}
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        onPlayProject={handlePlayProject}
                                        onNavigateToProject={navigateToProject}
                                    />
                                )}
                                {currentView === 'company' && selectedPlaylist && 'company' in selectedPlaylist && (
                                    <CompanyView
                                        company={selectedPlaylist.company}
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        onPlayProject={handlePlayProject}
                                        onNavigateToProject={navigateToProject}
                                    />
                                )}
                                {currentView === 'domain' && selectedPlaylist && 'domain' in selectedPlaylist && (
                                    <DomainView
                                        domain={selectedPlaylist.domain}
                                        currentlyPlaying={currentlyPlaying}
                                        isPlaying={isPlaying}
                                        onPlayProject={handlePlayProject}
                                        onNavigateToProject={navigateToProject}
                                    />
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Resize Handle - Desktop Only */}
                    <div className="hidden lg:block">
                        <ResizeHandle
                            orientation="vertical"
                            onMouseDown={startRightResize}
                            isDragging={isRightResizing}
            />
                    </div>

                    {/* Right: Now Playing Panel */}
                    <NowPlayingPanel
                        currentlyPlaying={currentlyPlaying}
                        isPlaying={isPlaying}
                        width={rightColumnWidth}
                        onNavigateToProject={navigateToProject}
                        style={isRightResizing ? {} : { width: `${rightColumnWidth}px` }}
                        hasLyrics={hasLyrics}
                        lyrics={currentLyrics}
                        onViewLyrics={toggleLyrics}
                    />
                </div>
            </div>

            {/* Bottom Player - Full Width */}
            <BottomPlayer
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onNavigateToProject={navigateToProject}
                onNextTrack={playNextTrack}
                onPreviousTrack={playPreviousTrack}
                currentPlaylist={currentPlaylist}
                currentTrackIndex={currentTrackIndex}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                hasLyrics={hasLyrics}
                isLyricsOpen={isLyricsOpen}
                onSeek={seek}
                onVolumeChange={updateVolume}
                onToggleLyrics={toggleLyrics}
                onOpenMobilePlayer={openMobilePlayer}
            />

            {/* Welcome Modal */}
            <WelcomeModal
                isOpen={showWelcome}
                onClose={handleWelcomeClose}
            />

            {/* Mobile Player View */}
            <MobilePlayerView
                isOpen={isMobilePlayerOpen}
                onClose={closeMobilePlayer}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onTogglePlay={handleTogglePlay}
                onSeek={seek}
                onPreviousTrack={playPreviousTrack}
                onNextTrack={playNextTrack}
                canGoPrevious={!!(currentPlaylist && currentTrackIndex > 0)}
                canGoNext={!!(currentPlaylist && currentTrackIndex < (currentPlaylist.projects?.length - 1))}
                lyrics={currentLyrics}
            />

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onWaiting={handleWaiting}
                onCanPlay={handleCanPlay}
            />
        </div>
    );
};

export default SpotifyResume;