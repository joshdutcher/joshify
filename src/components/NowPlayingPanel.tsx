import { ExternalLink, Github, Share2, Mic2, Heart } from 'lucide-react';
import ProjectCanvas from './ProjectCanvas';
import LyricsPreview from './LyricsPreview';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project, SyncedLyric } from '../types';
import { trackEvent } from '../utils/analytics';

interface NowPlayingPanelProps {
    currentlyPlaying: Project | null;
    isPlaying?: boolean;
    className?: string;
    style?: Record<string, any>;
    onNavigateToProject: (_project: Project) => void;
    width?: number;
    syncedLyrics?: SyncedLyric[] | null;
    currentTime?: number;
    hasLyrics?: boolean;
    isLyricsOpen?: boolean;
    onToggleLyrics?: () => void;
    isFavorite?: (_projectId: string) => boolean;
    toggleFavorite?: (_projectId: string) => void;
    onShareCopied?: () => void;
}

const NowPlayingPanel = ({
    currentlyPlaying,
    isPlaying = false,
    className = "",
    style = {},
    onNavigateToProject,
    syncedLyrics = null,
    currentTime = 0,
    hasLyrics = false,
    isLyricsOpen = false,
    onToggleLyrics,
    isFavorite,
    toggleFavorite,
    onShareCopied
}: NowPlayingPanelProps) => {
    const handleShare = () => {
        if (!currentlyPlaying) return;
        const shareUrl = `${window.location.origin}/project/${currentlyPlaying.id}`;
        navigator.clipboard.writeText(shareUrl);
        onShareCopied?.();
        trackEvent('Share', 'Copy Link', currentlyPlaying.id);
    };

    // Get dynamic background color from album art
    const { backgroundStyle: _backgroundStyle } = useDynamicBackground(currentlyPlaying?.image || null);

    if (!currentlyPlaying) {
        return null; // Hide panel when no project is playing
    }

    return (
        <div
            data-right-panel
            className={`hidden lg:block rounded-t-lg overflow-hidden ${className}`}
            style={{
                ...style,
                minWidth: '280px',
                maxWidth: '400px'
            }}
        >
            <div className="overflow-y-auto spotify-scrollbar h-full">
                {/* Canvas Background */}
                <div className="relative">
                    <ProjectCanvas
                        project={currentlyPlaying}
                        isPlaying={isPlaying}
                        className="rounded-t-lg"
                        posterImage={currentlyPlaying.canvasPoster}
                    />

                    {/* Overlay gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Lyrics preview + Project title overlay */}
                    <div className="absolute bottom-2 left-4 right-4">
                        <LyricsPreview syncedLyrics={syncedLyrics} currentTime={currentTime} />
                        <h2
                            className="text-white font-bold text-xl leading-tight drop-shadow-lg hover:underline cursor-pointer"
                            onClick={() => onNavigateToProject && onNavigateToProject(currentlyPlaying)}
                        >
                            {currentlyPlaying.title}
                        </h2>
                        <p className="text-white/90 text-sm leading-tight drop-shadow-md">
                            {currentlyPlaying.artist}
                        </p>
                    </div>
                </div>

                {/* Project Details */}
                <div className="p-4 space-y-3">
                    {/* Row 1: Like, Lyrics, Share */}
                    <div className="flex items-center space-x-4">
                        {toggleFavorite && (
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(currentlyPlaying.id); }}
                                className="flex items-center space-x-1.5 text-spotify-secondary hover:text-white transition-colors"
                                aria-label={isFavorite?.(currentlyPlaying.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <Heart
                                    className="w-4 h-4"
                                    fill={isFavorite?.(currentlyPlaying.id) ? '#1DB954' : 'none'}
                                    color={isFavorite?.(currentlyPlaying.id) ? '#1DB954' : 'currentColor'}
                                />
                                <span className={`text-sm ${isFavorite?.(currentlyPlaying.id) ? 'text-spotify-green' : ''}`}>
                                    {isFavorite?.(currentlyPlaying.id) ? 'Unlike' : 'Like'}
                                </span>
                            </button>
                        )}
                        {onToggleLyrics && (
                            <button
                                onClick={onToggleLyrics}
                                disabled={!hasLyrics}
                                className={`flex items-center space-x-1.5 transition-colors ${
                                    isLyricsOpen
                                        ? 'text-spotify-green'
                                        : hasLyrics
                                            ? 'text-spotify-secondary hover:text-white'
                                            : 'text-gray-600 cursor-not-allowed'
                                }`}
                                aria-label={isLyricsOpen ? 'Close lyrics' : hasLyrics ? 'Lyrics' : 'No lyrics available'}
                                title={isLyricsOpen ? 'Close Lyrics' : hasLyrics ? 'Lyrics' : 'No lyrics available'}
                            >
                                <div className="flex flex-col items-center">
                                    <Mic2 className="w-4 h-4" />
                                    {isLyricsOpen && <div className="w-1 h-1 rounded-full bg-spotify-green mt-0.5" />}
                                </div>
                                <span className="text-sm">Lyrics</span>
                            </button>
                        )}
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-1.5 text-spotify-secondary hover:text-white transition-colors"
                            aria-label="Copy link to Song"
                            title="Copy link to Song"
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                        </button>
                    </div>

                    {/* Row 2: External links (conditional) */}
                    {(currentlyPlaying.demoUrl || currentlyPlaying.githubUrl) && (
                        <div className="flex items-center space-x-4">
                            {currentlyPlaying.demoUrl && (
                                <a
                                    href={currentlyPlaying.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1.5 text-spotify-secondary hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="text-sm">View Live Site</span>
                                </a>
                            )}
                            {currentlyPlaying.githubUrl && (
                                <a
                                    href={currentlyPlaying.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1.5 text-spotify-secondary hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    <span className="text-sm">View Source Code</span>
                                </a>
                            )}
                        </div>
                    )}

                    {/* Project Details Block */}
                    <div className="rounded-lg bg-black/60 p-4 space-y-4">
                        {/* Description */}
                        <div>
                            <h3 className="text-spotify-primary font-semibold mb-2">About this project</h3>
                            <p className="text-spotify-secondary text-sm leading-relaxed">
                                {currentlyPlaying.description}
                            </p>
                        </div>

                        {/* Skills/Tech Stack */}
                        {currentlyPlaying.skills && (
                            <div>
                                <h3 className="text-spotify-primary font-semibold mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {currentlyPlaying.skills.slice(0, 6).map((skill: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-white/10 text-spotify-secondary text-xs rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {currentlyPlaying.skills.length > 6 && (
                                        <span className="px-2 py-1 bg-white/10 text-spotify-secondary text-xs rounded-full">
                                            +{currentlyPlaying.skills.length - 6} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Plays counter */}
                        <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-spotify-secondary">Project views</span>
                                <span className="text-spotify-green font-semibold">{currentlyPlaying.impact}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NowPlayingPanel;
