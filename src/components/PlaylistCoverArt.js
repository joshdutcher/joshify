import React from 'react';
import ProjectImage from './ProjectImage';

const PlaylistCoverArt = ({ 
  playlist, 
  size = 'custom', 
  className = '',
  shape = 'rounded' 
}) => {
  // Check if playlist has custom cover art
  const hasCustomCoverArt = playlist.image;
  
  // Get the first 4 tracks from the playlist for tiled fallback
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
  
  // If playlist has custom cover art, display it instead of tiled layout
  if (hasCustomCoverArt) {
    return (
      <div className={`${containerSize} ${shape === 'rounded' ? 'rounded' : shape === 'circle' ? 'rounded-full' : ''} overflow-hidden bg-spotify-dark relative`}>
        <img 
          src={playlist.image}
          alt={`${playlist.name} cover art`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If custom image fails to load, hide this image and let tiled fallback show
            e.target.style.display = 'none';
            e.target.parentElement.querySelector('.tiled-fallback').style.display = 'block';
          }}
        />
        {/* Tiled fallback (hidden by default, shown if custom image fails) */}
        <div className="tiled-fallback w-full h-full grid grid-cols-2 grid-rows-2 gap-0 absolute inset-0" style={{ display: 'none' }}>
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
  }
  
  // Default tiled layout when no custom cover art
  return (
    <div className={`${containerSize} ${shape === 'rounded' ? 'rounded' : shape === 'circle' ? 'rounded-full' : ''} overflow-hidden bg-spotify-dark relative`}>
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