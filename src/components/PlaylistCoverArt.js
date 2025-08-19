import React from 'react';
import ProjectImage from './ProjectImage';

const PlaylistCoverArt = ({ 
  playlist, 
  size = 'custom', 
  className = '',
  shape = 'rounded' 
}) => {
  // Get the first 4 tracks from the playlist
  const coverTracks = playlist.projects ? playlist.projects.slice(0, 4) : [];
  
  // Base size classes for different sizes
  const sizeClasses = {
    'tiny': 'w-8 h-8',
    'small': 'w-16 h-16', 
    'medium': 'w-24 h-24',
    'large': 'w-32 h-32',
    'custom': className || 'w-32 h-32'
  };
  
  const containerSize = size === 'custom' ? className : sizeClasses[size];
  
  // Individual tile size (half of container size)
  const getTileSize = () => {
    if (size === 'custom') {
      // Extract dimensions from className if possible, otherwise default
      return 'w-16 h-16'; // Half of default 32 (w-32 h-32)
    }
    
    const tileSizes = {
      'tiny': 'w-4 h-4',
      'small': 'w-8 h-8',
      'medium': 'w-12 h-12', 
      'large': 'w-16 h-16'
    };
    
    return tileSizes[size];
  };
  
  const tileSize = getTileSize();
  
  return (
    <div className={`${containerSize} ${shape === 'rounded' ? 'rounded-lg' : shape === 'circle' ? 'rounded-full' : ''} overflow-hidden bg-spotify-dark relative`}>
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0">
        {/* Top Left */}
        <div className="relative overflow-hidden">
          {coverTracks[0] ? (
            <ProjectImage
              project={coverTracks[0]}
              size="custom"
              className="w-full h-full"
              shape="square"
              showFallback={true}
            />
          ) : (
            <div className="w-full h-full bg-spotify-card"></div>
          )}
        </div>
        
        {/* Top Right */}
        <div className="relative overflow-hidden">
          {coverTracks[1] ? (
            <ProjectImage
              project={coverTracks[1]}
              size="custom"
              className="w-full h-full"
              shape="square"
              showFallback={true}
            />
          ) : (
            <div className="w-full h-full bg-spotify-card"></div>
          )}
        </div>
        
        {/* Bottom Left */}
        <div className="relative overflow-hidden">
          {coverTracks[2] ? (
            <ProjectImage
              project={coverTracks[2]}
              size="custom"
              className="w-full h-full"
              shape="square"
              showFallback={true}
            />
          ) : (
            <div className="w-full h-full bg-spotify-card"></div>
          )}
        </div>
        
        {/* Bottom Right */}
        <div className="relative overflow-hidden">
          {coverTracks[3] ? (
            <ProjectImage
              project={coverTracks[3]}
              size="custom"
              className="w-full h-full"
              shape="square"
              showFallback={true}
            />
          ) : (
            <div className="w-full h-full bg-spotify-card"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCoverArt;