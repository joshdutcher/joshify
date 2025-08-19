import React, { useState, useRef, useEffect } from 'react';

// Animated gradient color sets for fallbacks
const gradientSets = [
  ['#1DB954', '#0f7a31'], // Spotify green variations
  ['#1e3a8a', '#1e40af'], // Deep blue variations
  ['#374151', '#4b5563'], // Charcoal gray variations
  ['#0f766e', '#134e4a'], // Dark teal variations
  ['#7c2d12', '#991b1b'], // Dark red variations
  ['#581c87', '#6b21a8'], // Dark purple variations
];

// Get a consistent gradient set for a project based on its ID
const getProjectGradient = (projectId) => {
  if (!projectId) return gradientSets[0];
  const index = projectId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradientSets.length;
  return gradientSets[index];
};

// Create animated gradient CSS for fallbacks
const createAnimatedGradient = (colors, isPlaying = false) => {
  const [color1, color2] = colors;
  const animationSpeed = isPlaying ? '3s' : '6s';
  
  return {
    background: `linear-gradient(-45deg, ${color1}, ${color2}, ${color1}40, ${color2}60)`,
    backgroundSize: '400% 400%',
    animation: `gradientShift ${animationSpeed} ease-in-out infinite`
  };
};

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
    
    // Clear previous video when project changes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      // Force reload by resetting src
      videoRef.current.load();
    }
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

  // If no canvas data, show animated fallback or nothing
  if (!canvas) {
    const gradientColors = getProjectGradient(project?.id);
    const gradientStyle = createAnimatedGradient(gradientColors, isPlaying);
    
    return showFallback ? (
      <div 
        className={`aspect-canvas flex items-center justify-center ${className}`}
        style={gradientStyle}
      >
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
          key={`video-${project?.id}`} // Force remount when project changes
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
          key={`image-${project?.id}`} // Force remount when project changes
        />
      )}
      
      {/* Final fallback with animated gradient */}
      {hasError && showFallback && (() => {
        const gradientColors = getProjectGradient(project?.id);
        const gradientStyle = createAnimatedGradient(gradientColors, isPlaying);
        
        return (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={gradientStyle}
          >
            <span className="text-white font-bold text-6xl opacity-30">
              {project?.title?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??'}
            </span>
          </div>
        );
      })()}
      
      {/* Loading overlay */}
      {!isLoaded && canvas.video && !hasError && (
        <div className="absolute inset-0 bg-spotify-card animate-pulse" />
      )}
    </div>
  );
};

export default ProjectCanvas;