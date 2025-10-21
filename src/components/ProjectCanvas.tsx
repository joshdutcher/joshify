import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';

interface ProjectCanvasProps {
  project: Project;
  isPlaying?: boolean;
  className?: string;
  showFallback?: boolean;
  posterImage?: string | null;
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
    showFallback = true,
    posterImage = null
}: ProjectCanvasProps) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [albumArtError, setAlbumArtError] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Reset error state and handle video when project changes
    useEffect(() => {
        setHasError(false);
        setIsLoaded(false);
        setIsLoading(false);
        setLoadProgress(0);
        setAlbumArtError(false);

        const video = videoRef.current;
        if (video && project?.canvas) {
            // Proper cleanup sequence
            video.pause();
            video.removeAttribute('src'); // Clear src attribute
            video.load();                  // Reset video element state

            // Small delay to ensure cleanup completes
            setTimeout(() => {
                if (videoRef.current && project?.canvas) {
                    videoRef.current.src = project.canvas;
                    videoRef.current.load();
                }
            }, 10);
        } else if (video) {
            // No canvas video - clear video element
            video.pause();
            video.removeAttribute('src');
            video.load();
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

    const handleVideoLoadStart = () => {
        setIsLoading(true);
        setLoadProgress(0);
    };

    const handleVideoProgress = () => {
        if (videoRef.current) {
            const buffered = videoRef.current.buffered;
            if (buffered.length > 0) {
                const duration = videoRef.current.duration;
                if (duration > 0) {
                    const bufferedEnd = buffered.end(buffered.length - 1);
                    const progress = (bufferedEnd / duration) * 100;
                    setLoadProgress(Math.min(progress, 100));
                }
            }
        }
    };

    const handleVideoLoad = () => {
        setIsLoaded(true);
        setIsLoading(false);
        setLoadProgress(100);
        setHasError(false);
    };

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const target = e.target as HTMLVideoElement;
        const error = target.error;

        // Enhanced error logging
        console.error('🎥 Canvas Video Error:', {
            projectId: project?.id,
            projectTitle: project?.title,
            videoUrl: project?.canvas,
            errorCode: error?.code,
            errorMessage: error?.message,
            networkState: target.networkState,
            readyState: target.readyState,
            currentSrc: target.currentSrc,
            videoExists: !!project?.canvas,
            // Network states: 0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE
            // Ready states: 0=NOTHING, 1=METADATA, 2=CURRENT_DATA, 3=FUTURE_DATA, 4=ENOUGH_DATA
            // Error codes: 1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED
        });

        // Try to fetch the video URL directly to see if it's accessible
        if (project?.canvas) {
            fetch(project.canvas, { method: 'HEAD' })
                .then(response => {
                    console.log('🔍 Video URL HEAD request:', {
                        url: project.canvas,
                        status: response.status,
                        ok: response.ok,
                        headers: {
                            contentType: response.headers.get('content-type'),
                            contentLength: response.headers.get('content-length'),
                            cors: response.headers.get('access-control-allow-origin')
                        }
                    });
                })
                .catch(err => {
                    console.error('❌ Video URL fetch failed:', {
                        url: project.canvas,
                        error: err.message
                    });
                });
        }

        setHasError(true);
        setIsLoaded(false);
        setIsLoading(false);
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
            {/* Video Canvas - keep at full opacity, let poster fade out */}
            {!hasError && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadStart={handleVideoLoadStart}
                    onProgress={handleVideoProgress}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                >
                    <source src={project.canvas} type="video/mp4" />
                </video>
            )}

            {/* Poster Image (shows while video loads, hidden when ready) */}
            {posterImage && !isLoaded && !hasError && (
                <img
                    src={posterImage}
                    alt={`${project.title || 'Project'} canvas`}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
            )}

            {/* Loading Indicator (only show if no poster image available) */}
            {isLoading && !isLoaded && !hasError && !posterImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-spotify-card bg-opacity-50">
                    <div className="text-center">
                        {/* Loading Spinner */}
                        <div className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>

                        {/* Progress Bar */}
                        {loadProgress > 0 && (
                            <div className="w-48 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-spotify-green h-full transition-all duration-300"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                        )}

                        {/* Loading Text */}
                        <p className="text-white text-sm mt-2 opacity-70">
                            Loading canvas...
                        </p>
                    </div>
                </div>
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

            {/* Simple loading overlay (deprecated - replaced by loading indicator above) */}
        </div>
    );
};

export default ProjectCanvas;
