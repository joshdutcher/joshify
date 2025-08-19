import React from 'react';
import { Play, Pause, Volume2, Shuffle, Repeat, SkipBack, SkipForward } from 'lucide-react';

const BottomPlayer = ({ 
  currentlyPlaying, 
  isPlaying, 
  onTogglePlay,
  onNavigateToProject,
  onNextTrack,
  onPreviousTrack,
  currentPlaylist,
  currentTrackIndex
}) => {
  // Determine if next/previous buttons should be enabled
  const canGoPrevious = currentPlaylist && currentTrackIndex > 0;
  const canGoNext = currentPlaylist && currentTrackIndex < (currentPlaylist.projects?.length - 1);

  return (
  <div className="h-24 bg-black flex items-center px-4">
    {currentlyPlaying ? (
      <>
        {/* Left: Now Playing Info */}
        <div className="flex items-center space-x-4 w-1/4 min-w-0">
          <div className="relative w-14 h-14 flex-shrink-0">
            {/* Album art for albums */}
            {currentlyPlaying.isAlbum && currentlyPlaying.image ? (
              <img 
                src={currentlyPlaying.image} 
                alt={currentlyPlaying.title}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  // Fallback to generated thumbnail if album art fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            {/* Generated thumbnail fallback */}
            <div 
              className={`w-full h-full bg-gradient-to-br from-spotify-green to-green-700 rounded flex items-center justify-center ${
                currentlyPlaying.isAlbum && currentlyPlaying.image ? 'hidden' : ''
              }`}
            >
              <span className="text-white font-bold text-sm">
                {currentlyPlaying.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p 
              className="text-spotify-primary font-semibold text-base truncate hover:underline cursor-pointer"
              onClick={() => onNavigateToProject && onNavigateToProject(currentlyPlaying)}
            >
              {currentlyPlaying.title}
            </p>
            <p className="text-spotify-secondary text-sm truncate">{currentlyPlaying.artist}</p>
          </div>
        </div>

        {/* Center: Player Controls (Desktop Only) */}
        <div className="hidden md:flex flex-col items-center w-1/2 max-w-2xl mx-auto">
          <div className="flex items-center space-x-6 mb-2">
            <Shuffle className="w-4 h-4 text-spotify-secondary hover:text-spotify-primary cursor-pointer" />
            <SkipBack 
              className={`w-4 h-4 cursor-pointer transition-colors ${
                canGoPrevious 
                  ? 'text-spotify-secondary hover:text-spotify-primary' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              onClick={canGoPrevious ? onPreviousTrack : undefined}
            />
            <button
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
            </button>
            <SkipForward 
              className={`w-4 h-4 cursor-pointer transition-colors ${
                canGoNext 
                  ? 'text-spotify-secondary hover:text-spotify-primary' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              onClick={canGoNext ? onNextTrack : undefined}
            />
            <Repeat className="w-4 h-4 text-spotify-secondary hover:text-spotify-primary cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-spotify-secondary">0:00</span>
            <div className="flex-1 h-1 bg-spotify-hover rounded-full">
              <div className="h-1 bg-white rounded-full w-1/3"></div>
            </div>
            <span className="text-xs text-spotify-secondary">{currentlyPlaying.duration}</span>
          </div>
        </div>

        {/* Right: Volume/Mobile Play */}
        <div className="flex items-center justify-end w-1/4">
          {/* Mobile Play Button */}
          <div className="md:hidden">
            <button
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
            </button>
          </div>

          {/* Desktop Volume Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Volume2 className="w-4 h-4 text-spotify-secondary" />
            <div className="w-24 h-1 bg-spotify-hover rounded-full">
              <div className="h-1 bg-white rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center w-full text-spotify-secondary">
        <p className="text-base">Select a project to view details</p>
      </div>
    )}
  </div>
  );
};

export default BottomPlayer;