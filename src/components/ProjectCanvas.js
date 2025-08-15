import React, { useState, useRef, useEffect } from 'react';

const ProjectCanvas = ({ 
  project, 
  isPlaying = false, 
  className = "",
  showFallback = true 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  const canvas = project?.canvas;
  
  useEffect(() => {
    if (videoRef.current && isPlaying && isLoaded) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, that's okay
      });
    } else if (videoRef.current && !isPlaying) {
      videoRef.current.pause();
    }
  }, [isPlaying, isLoaded]);

  const handleVideoLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  // If no canvas data, show fallback or nothing
  if (!canvas) {
    return showFallback ? (
      <div className={`aspect-canvas bg-gradient-to-br from-spotify-green to-green-700 flex items-center justify-center ${className}`}>
        <span className="text-white font-bold text-6xl opacity-20">
          {project?.title?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??'}
        </span>
      </div>
    ) : null;
  }

  return (
    <div className={`relative aspect-canvas overflow-hidden bg-spotify-card ${className}`}>
      {/* Video Canvas */}
      {canvas.video && !hasError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={canvas.video} type="video/mp4" />
        </video>
      )}
      
      {/* Image Canvas (fallback or primary) */}
      {((canvas.image && hasError) || (!canvas.video && canvas.image)) && (
        <img
          src={canvas.image}
          alt={`${project.title} canvas`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleImageError}
        />
      )}
      
      {/* Final fallback */}
      {hasError && showFallback && (
        <div className="absolute inset-0 bg-gradient-to-br from-spotify-green to-green-700 flex items-center justify-center">
          <span className="text-white font-bold text-6xl opacity-30">
            {project?.title?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??'}
          </span>
        </div>
      )}
      
      {/* Loading overlay */}
      {!isLoaded && canvas.video && !hasError && (
        <div className="absolute inset-0 bg-spotify-card animate-pulse" />
      )}
    </div>
  );
};

export default ProjectCanvas;