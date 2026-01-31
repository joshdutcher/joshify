import { ExternalLink, Github, Mic2 } from 'lucide-react';
import ProjectCanvas from './ProjectCanvas';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project } from '../types';

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
}

// Get first few lines of lyrics for preview
const getLyricsPreview = (lyrics: string | null, lines: number = 3): string | null => {
    if (!lyrics) return null;
    const lyricsLines = lyrics.split('\n').filter(line => line.trim());
    return lyricsLines.slice(0, lines).join('\n');
};

const NowPlayingPanel = ({
    currentlyPlaying,
    isPlaying = false,
    className = "",
    style = {},
    onNavigateToProject,
    hasLyrics = false,
    lyrics = null,
    isLyricsOpen = false,
    onToggleLyrics
}: NowPlayingPanelProps) => {
    // Get dynamic background color from album art
    const { backgroundStyle } = useDynamicBackground(currentlyPlaying?.image || null);

    if (!currentlyPlaying) {
        return null; // Hide panel when no project is playing
    }

    const lyricsPreview = getLyricsPreview(lyrics, 6);

    // Extract primary color for solid lyrics background
    const primaryColor = backgroundStyle['--primary-color'] || 'rgb(83, 83, 83)';

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
            {/* Full-height canvas background container */}
            <div className="relative h-full">
                {/* Canvas extends full height */}
                <div className="absolute inset-0">
                    <ProjectCanvas
                        project={currentlyPlaying}
                        isPlaying={isPlaying}
                        className="w-full h-full rounded-t-lg"
                        posterImage={currentlyPlaying.canvasPoster}
                    />
                    {/* Gradient overlay for readability - stronger at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Scrollable content over canvas */}
                <div className="relative h-full overflow-y-auto spotify-scrollbar">
                    {/* Top area with title overlay */}
                    <div className="aspect-[9/16] max-h-[400px] relative">
                        {/* Project title overlay at bottom of canvas area */}
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

                    {/* Content blocks */}
                    <div className="p-3 space-y-3">
                        {/* Lyrics Block */}
                        {hasLyrics && lyricsPreview && (
                            <div
                                className="rounded-lg p-4"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {/* Header: Lyrics label + mic icon (matching BottomPlayer style) */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-semibold text-sm">Lyrics</span>
                                    {onToggleLyrics && (
                                        <button
                                            onClick={onToggleLyrics}
                                            className={`p-2 rounded-full transition-all ${
                                                isLyricsOpen
                                                    ? 'text-spotify-green bg-black/30'
                                                    : 'text-white bg-black/30 hover:bg-black/40'
                                            } ${!isLyricsOpen ? 'animate-pulse-subtle' : ''}`}
                                            aria-label={isLyricsOpen ? 'Close lyrics' : 'View lyrics'}
                                        >
                                            <Mic2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                {/* Lyrics text */}
                                <p className="text-white text-base font-bold leading-relaxed whitespace-pre-line line-clamp-6">
                                    {lyricsPreview}
                                </p>
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

                            {/* Action Buttons */}
                            <div className="space-y-2 pt-2">
                                {currentlyPlaying.demoUrl && (
                                    <a
                                        href={currentlyPlaying.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 w-full py-3 bg-spotify-green text-black font-semibold rounded-full hover:scale-105 transition-transform"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Live Site</span>
                                    </a>
                                )}

                                {currentlyPlaying.githubUrl && (
                                    <a
                                        href={currentlyPlaying.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 w-full py-3 border border-white/20 text-spotify-primary font-semibold rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>View Source Code</span>
                                    </a>
                                )}
                            </div>

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
        </div>
    );
};

export default NowPlayingPanel;
