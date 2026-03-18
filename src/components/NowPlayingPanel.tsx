import { useState } from 'react';
import { ExternalLink, Github, Share2, Check, Mic2, Heart, X } from 'lucide-react';
import ProjectCanvas from './ProjectCanvas';
import ShareModal from './ShareModal';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project } from '../types';
import { trackEvent } from '../utils/analytics';

interface NowPlayingPanelProps {
    currentlyPlaying: Project | null;
    isPlaying?: boolean;
    className?: string;
    style?: Record<string, any>;
    onNavigateToProject: (_project: Project) => void;
    width?: number;
    hasLyrics?: boolean;
    lyrics?: string | null;
    isLyricsOpen?: boolean;
    onToggleLyrics?: () => void;
    isFavorite?: (_projectId: string) => boolean;
    toggleFavorite?: (_projectId: string) => void;
}

const NowPlayingPanel = ({
    currentlyPlaying,
    isPlaying = false,
    className = "",
    style = {},
    onNavigateToProject,
    hasLyrics = false,
    lyrics: _lyrics = null,
    isLyricsOpen = false,
    onToggleLyrics,
    isFavorite,
    toggleFavorite
}: NowPlayingPanelProps) => {
    const [copied, setCopied] = useState(false);
    const [shareAnchor, setShareAnchor] = useState<DOMRect | null>(null);

    const shareUrl = currentlyPlaying
        ? `${window.location.origin}/project/${currentlyPlaying.id}`
        : '';

    const handleShareCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setShareAnchor(null);
        setTimeout(() => setCopied(false), 1500);
        if (currentlyPlaying) trackEvent('Share', 'Copy Link', currentlyPlaying.id);
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

                    {/* Project title overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <h2
                            className="text-white font-bold text-xl mb-1 drop-shadow-lg hover:underline cursor-pointer"
                            onClick={() => onNavigateToProject && onNavigateToProject(currentlyPlaying)}
                        >
                            {currentlyPlaying.title}
                        </h2>
                        <p className="text-white/90 text-sm drop-shadow-md">
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
                                    fill={isFavorite?.(currentlyPlaying.id) ? 'currentColor' : 'none'}
                                    color={isFavorite?.(currentlyPlaying.id) ? '#1DB954' : 'currentColor'}
                                />
                                <span className="text-sm">{isFavorite?.(currentlyPlaying.id) ? 'Unlike' : 'Like'}</span>
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
                                aria-label={isLyricsOpen ? 'Close lyrics' : 'View lyrics'}
                            >
                                {isLyricsOpen ? <X className="w-4 h-4" /> : <Mic2 className="w-4 h-4" />}
                                <span className="text-sm">{isLyricsOpen ? 'Close Lyrics' : 'Lyrics'}</span>
                            </button>
                        )}
                        <button
                            onClick={(e) => setShareAnchor(e.currentTarget.getBoundingClientRect())}
                            className="flex items-center space-x-1.5 text-spotify-secondary hover:text-white transition-colors"
                            aria-label="Share"
                        >
                            {copied
                                ? <Check className="w-4 h-4 text-spotify-green" />
                                : <Share2 className="w-4 h-4" />
                            }
                            <span className={`text-sm ${copied ? 'text-spotify-green' : ''}`}>
                                {copied ? 'Copied!' : 'Share'}
                            </span>
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
            {shareAnchor && (
                <ShareModal
                    url={shareUrl}
                    copied={copied}
                    anchorRect={shareAnchor}
                    onCopy={handleShareCopy}
                    onClose={() => setShareAnchor(null)}
                />
            )}
        </div>
    );
};

export default NowPlayingPanel;
