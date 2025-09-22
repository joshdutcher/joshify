import React, { useState, useRef, useEffect } from 'react';
import { getCachedCanvasConfig } from '../utils/canvasUtils';

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
    const [canvasConfig, setCanvasConfig] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);

    // Dynamically detect canvas files when project changes
    useEffect(() => {
        const loadCanvasConfig = async () => {
            if (!project) {
                setCanvasConfig(null);
                return;
            }

            try {
                const config = await getCachedCanvasConfig(project);
                setCanvasConfig(config);
                setHasError(false);
                setIsLoaded(false);
        
                console.log('Canvas config loaded:', {
                    projectId: project.id,
                    projectTitle: project.title,
                    config
                });
            } catch (error) {
                console.error('Error loading canvas config:', error);
                setCanvasConfig({ video: null, image: null, fallback: project?.image || null, hasCanvas: false });
            }
        };

        loadCanvasConfig();
    }, [project?.id]);

    // Reset error state and handle video when project changes
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
    }, [project?.id, canvasConfig]);
  
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
            videoUrl: canvasConfig?.video
        });
        setHasError(true);
        setIsLoaded(false);
    };

    const handleImageError = (e) => {
        console.error('Image fallback error:', e.target.src);
        setHasError(true);
    };

    // Loading state while detecting canvas files
    if (!canvasConfig) {
        return (
            <div className={`relative overflow-hidden bg-spotify-card rounded-lg ${className}`}>
                <div className="aspect-square flex items-center justify-center animate-pulse">
                    <span className="text-white font-bold text-6xl opacity-20">
                        {project?.title?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??'}
                    </span>
                </div>
            </div>
        );
    }

    // If no canvas files detected, show project image or animated gradient
    if (!canvasConfig.hasCanvas) {
        if (canvasConfig.fallback) {
            return (
                <div className={`relative overflow-hidden bg-spotify-card rounded-lg ${className}`}>
                    <img
                        src={canvasConfig.fallback}
                        alt={`${project.title} canvas`}
                        className="w-full h-auto object-contain"
                        onError={(e) => {
              console.error('Project image fallback error:', e.target.src);
              setHasError(true);
            }}
                        onLoad={() => console.log('Project image loaded successfully:', canvasConfig.fallback)}
                        key={`project-image-${project?.id}`}
          />
                </div>
            );
        }
    
        // Final fallback to animated gradient
        const gradientColors = getProjectGradient(project?.id);
        const gradientStyle = createAnimatedGradient(gradientColors, isPlaying);
    
        return showFallback ? (
            <div 
                className={`aspect-square flex items-center justify-center rounded-lg ${className}`}
                style={gradientStyle}
      >
                <span className="text-white font-bold text-6xl opacity-20">
                    {project?.title?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??'}
                </span>
            </div>
        ) : null;
    }

    // Canvas files detected - use 9:16 aspect ratio container
    return (
        <div className={`relative aspect-canvas overflow-hidden bg-spotify-card ${className}`}>
            {/* Video Canvas */}
            {canvasConfig.video && !hasError && (
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onLoadStart={() => console.log('Video loading started:', canvasConfig.video)}
                onCanPlay={() => console.log('Video can play:', canvasConfig.video)}
                key={`video-${project?.id}`} // Force remount when project changes
        >
                <source src={canvasConfig.video} type="video/mp4" />
            </video>
      )}
      
            {/* Image Canvas (only show if no video or video has error) */}
            {(!canvasConfig.video || hasError) && canvasConfig.image && (
            <img
                src={canvasConfig.image}
                alt={`${project.title} canvas`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={handleImageError}
                onLoad={() => console.log('Canvas image loaded successfully:', canvasConfig.image)}
                key={`image-${project?.id}`} // Force remount when project changes
        />
      )}
      
            {/* Final fallback with animated gradient (only if both video and image fail) */}
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
            {!isLoaded && canvasConfig.video && !hasError && (
            <div className="absolute inset-0 bg-spotify-card animate-pulse" />
      )}
        </div>
    );
};

export default ProjectCanvas;