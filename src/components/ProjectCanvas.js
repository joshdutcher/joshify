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

  // Reset error state when project changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [project?.id]);

  const canvas = project?.canvas;
  
  // Debug logging
  useEffect(() => {
    if (project) {
      console.log('ProjectCanvas Debug:', {
        projectTitle: project.title,
        hasCanvas: !!canvas,
        videoUrl: canvas?.video,
        imageUrl: canvas?.image,
        isPlaying,
        hasError,
        isLoaded,
        shouldShowVideo: !!(canvas?.video && !hasError),
        shouldShowImage: !!((canvas?.image && hasError) || (!canvas?.video && canvas?.image))
      });
    }
  }, [project, canvas, isPlaying, hasError, isLoaded]);
  
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

  const handleVideoError = (e) => {
    const error = e.target.error;
    console.error('Video loading error details:', {
      errorCode: error?.code,
      errorMessage: error?.message,
      networkState: e.target.networkState,
      readyState: e.target.readyState,
      videoUrl: canvas?.video
    });
    setHasError(true);
    setIsLoaded(false);
  };

  const handleImageError = (e) => {
    console.error('Image fallback error:', e.target.src);
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
          onLoadStart={() => console.log('Video loading started:', canvas.video)}
          onCanPlay={() => console.log('Video can play:', canvas.video)}
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
          onLoad={() => console.log('Image loaded successfully:', canvas.image)}
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