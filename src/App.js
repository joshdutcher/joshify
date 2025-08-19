import React, { useState } from 'react';
import usePlayer from './hooks/usePlayer';
import useColumnResize from './hooks/useColumnResize';
import useDynamicBackground from './hooks/useDynamicBackground';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BottomPlayer from './components/BottomPlayer';
import NowPlayingPanel from './components/NowPlayingPanel';
import ResizeHandle from './components/ResizeHandle';
import HomeView from './components/views/HomeView';
import ProfileView from './components/views/ProfileView';
import PlaylistView from './components/views/PlaylistView';
import ProjectDetailView from './components/views/ProjectDetailView';
import SearchView from './components/views/SearchView';
import CompanyView from './components/views/CompanyView';
import DomainView from './components/views/DomainView';
import { projects } from './data/projects';

const SpotifyResume = () => {
  const {
    currentlyPlaying,
    isPlaying,
    currentView,
    selectedPlaylist,
    sidebarOpen,
    currentPlaylist,
    currentTrackIndex,
    handlePlayProject,
    playNextTrack,
    playPreviousTrack,
    navigateToView,
    navigateToProject,
    navigateToPlaylist,
    navigateToCompany,
    navigateToDomain,
    toggleSidebar,
    closeSidebar,
    setIsPlaying
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
    // Priority: Currently playing > Selected playlist/project > First recent work
    if (currentlyPlaying?.image) {
      return currentlyPlaying.image;
    }
    if (selectedPlaylist?.image) {
      return selectedPlaylist.image;
    }
    // Default to first recent work project
    return projects.recentWork[0]?.image || null;
  };

  const { backgroundStyle } = useDynamicBackground(getBackgroundImage());

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigateToProfile = () => {
    navigateToView('profile');
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNavigateToSearch = (query) => {
    setSearchQuery(query);
    navigateToView('search');
  };

  return (
    <div 
      className="flex flex-col h-screen bg-spotify-black text-spotify-primary overflow-hidden"
      style={{
        '--left-sidebar-width': `${leftColumnWidth}px`,
        '--right-sidebar-width': `${rightColumnWidth}px`
      }}
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
            onCloseSidebar={closeSidebar}
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
            className="flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg" 
            style={{
              scrollBehavior: 'smooth',
              background: backgroundStyle.background,
              transition: 'background 0.8s ease-in-out'
            }}
          >
            {currentView === 'home' && (
              <HomeView
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
                onNavigateToProject={navigateToProject}
                onNavigateToPlaylist={navigateToPlaylist}
                onNavigateToProfile={handleNavigateToProfile}
                onNavigateToCompany={navigateToCompany}
                onNavigateToDomain={navigateToDomain}
              />
            )}
            {currentView === 'playlist' && selectedPlaylist && (
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
            {currentView === 'project' && selectedPlaylist && (
              <ProjectDetailView
                project={selectedPlaylist}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
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
            {currentView === 'company' && selectedPlaylist?.company && (
              <CompanyView
                company={selectedPlaylist.company}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
                onNavigateToProject={navigateToProject}
              />
            )}
            {currentView === 'domain' && selectedPlaylist?.domain && (
              <DomainView
                domain={selectedPlaylist.domain}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
                onNavigateToProject={navigateToProject}
              />
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
      />
    </div>
  );
};

export default SpotifyResume;