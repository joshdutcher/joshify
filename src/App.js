import React from 'react';
import usePlayer from './hooks/usePlayer';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BottomPlayer from './components/BottomPlayer';
import NowPlayingPanel from './components/NowPlayingPanel';
import HomeView from './components/views/HomeView';
import ProfileView from './components/views/ProfileView';
import PlaylistView from './components/views/PlaylistView';
import ProjectDetailView from './components/views/ProjectDetailView';

const SpotifyResume = () => {
  const {
    currentlyPlaying,
    isPlaying,
    currentView,
    selectedPlaylist,
    sidebarOpen,
    handlePlayProject,
    navigateToView,
    navigateToProject,
    navigateToPlaylist,
    toggleSidebar,
    closeSidebar,
    setIsPlaying
  } = usePlayer();

  const handleNavigateToProfile = () => {
    navigateToView('profile');
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col h-screen bg-spotify-black text-spotify-primary overflow-hidden">
      {/* Top Bar - Full Width */}
      <TopBar
        currentView={currentView}
        onNavigateToView={navigateToView}
        onNavigateToProfile={handleNavigateToProfile}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          sidebarOpen={sidebarOpen}
          onNavigateToView={navigateToView}
          onNavigateToPlaylist={navigateToPlaylist}
          onCloseSidebar={closeSidebar}
        />

        {/* Content Area with Right Panel */}
        <div className="flex flex-1 min-w-0">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-spotify-dark to-spotify-black" style={{scrollBehavior: 'smooth'}}>
            {currentView === 'home' && (
              <HomeView
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
                onNavigateToProject={navigateToProject}
                onNavigateToPlaylist={navigateToPlaylist}
                onNavigateToProfile={handleNavigateToProfile}
              />
            )}
            {currentView === 'playlist' && selectedPlaylist && (
              <PlaylistView
                playlist={selectedPlaylist}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                onPlayProject={handlePlayProject}
                onNavigateToProject={navigateToProject}
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
          </div>

          {/* Right: Now Playing Panel */}
          <NowPlayingPanel
            currentlyPlaying={currentlyPlaying}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      {/* Bottom Player - Full Width */}
      <BottomPlayer
        currentlyPlaying={currentlyPlaying}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />
    </div>
  );
};

export default SpotifyResume;