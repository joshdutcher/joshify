import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';

interface ProjectCanvasProps {
  project: Project;
  isPlaying?: boolean;
  className?: string;
  showFallback?: boolean;
}

// Animated gradient color sets for fallbacks
const gradientSets: string[][] = [
    ['#1DB954', '#0f7a31'], // Spotify green variations
    ['#1e3a8a', '#1e40af'], // Deep blue variations
    ['#374151', '#4b5563'], // Charcoal gray variations
    ['#0f766e', '#134e4a'], // Dark teal variations
    ['#7c2d12', '#991b1b'], // Dark red variations
    ['#581c87', '#6b21a8'], // Dark purple variations
];

// Get a consistent gradient set for a project based on its ID
const getProjectGradient = (projectId: string): string[] => {
    if (!projectId) return gradientSets[0] || ['#1DB954', '#0f7a31'];
    const index = projectId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) % gradientSets.length;
    return gradientSets[index] || ['#1DB954', '#0f7a31'];
};

// Create animated gradient CSS for fallbacks
const createAnimatedGradient = (colors: string[] | undefined, isPlaying = false) => {
    const [color1, color2] = colors || ['#1DB954', '#0f7a31'];
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
}: ProjectCanvasProps) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [albumArtError, setAlbumArtError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Reset error state and handle video when project changes
    useEffect(() => {
        setHasError(false);
        setIsLoaded(false);
        setAlbumArtError(false);

        // Clear previous video when project changes
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            // Force reload by resetting src
            videoRef.current.load();
        }
    }, [project?.id, project?.canvas]);

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

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const target = e.target as HTMLVideoElement;
        const error = target.error;
        console.error('Video loading error details:', {
            errorCode: error?.code,
            errorMessage: error?.message,
            networkState: target.networkState,
            readyState: target.readyState,
            videoUrl: project?.canvas
        });
        setHasError(true);
        setIsLoaded(false);
    };

    // If no canvas video configured, check for album art (use square aspect ratio)
    if (!project?.canvas) {
        // If album art exists, show that instead of animated gradient
        if (project?.image && !albumArtError) {
            return showFallback ? (
                <div className={`relative aspect-square overflow-hidden bg-spotify-card ${className}`}>
                    <img
                        src={project.image}
                        alt={project.title || 'Project cover art'}
                        className="w-full h-full object-cover"
                        onError={() => {
                            setAlbumArtError(true);
                        }}
                    />
                </div>
            ) : null;
        }

        // No canvas video and (no album art OR album art failed) - show animated gradient fallback
        const gradientColors = getProjectGradient(project?.id || '');
        const gradientStyle = createAnimatedGradient(gradientColors, isPlaying);

        return showFallback ? (
            <div
                className={`aspect-square flex items-center justify-center ${className}`}
                style={gradientStyle}
            >
                <span className="text-white font-bold text-6xl opacity-20">
                    {project?.title ? project.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2) : '??'}
                </span>
            </div>
        ) : null;
    }

    // Canvas video configured - decide aspect ratio based on whether video loaded successfully
    // If video fails and we have album art, use square (1:1), otherwise use 9:16 for video
    const useSquareAspect = hasError && project?.image && !albumArtError;
    const aspectClass = useSquareAspect ? 'aspect-square' : 'aspect-canvas';

    return (
        <div className={`relative ${aspectClass} overflow-hidden bg-spotify-card ${className}`}>
            {/* Video Canvas */}
            {!hasError && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    key={`video-${project?.id}`} // Force remount when project changes
                >
                    <source src={project.canvas} type="video/mp4" />
                </video>
            )}

            {/* Fallback: album art when video fails (in square container) */}
            {hasError && showFallback && (() => {
                // If album art exists and hasn't failed, show it
                if (project?.image && !albumArtError) {
                    return (
                        <img
                            src={project.image}
                            alt={project.title || 'Project cover art'}
                            className="w-full h-full object-cover"
                            onError={() => {
                                setAlbumArtError(true);
                            }}
                        />
                    );
                }

                // No album art available or album art failed, show animated gradient
                const gradientColors = getProjectGradient(project?.id || '');
                const gradientStyle = createAnimatedGradient(gradientColors, isPlaying);

                return (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={gradientStyle}
                    >
                        <span className="text-white font-bold text-6xl opacity-30">
                            {project?.title ? project.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2) : '??'}
                        </span>
                    </div>
                );
            })()}

            {/* Loading overlay */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-spotify-card animate-pulse" />
            )}
        </div>
    );
};

export default ProjectCanvas;
