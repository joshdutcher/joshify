import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Maximize2, ExternalLink, Github, Heart, Share2 } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProjectCanvas from './ProjectCanvas';
import ProgressBar from './ProgressBar';
import AlbumArtModal from './AlbumArtModal';
import useDynamicBackground from '../hooks/useDynamicBackground';
import { trackEvent } from '../utils/analytics';
import type { Project, SyncedLyric } from '../types';

interface MobilePlayerViewProps {
    isOpen: boolean;
    onClose: () => void;
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onTogglePlay: () => void;
    onSeek: (_time: number) => void;
    onPreviousTrack: () => void;
    onNextTrack: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
    syncedLyrics: SyncedLyric[] | null;
    isFavorite?: (_projectId: string) => boolean;
    toggleFavorite?: (_projectId: string) => void;
    onShareCopied?: () => void;
}

const MobilePlayerView = ({
    isOpen,
    onClose,
    currentlyPlaying,
    isPlaying,
    currentTime,
    duration,
    onTogglePlay,
    onSeek,
    onPreviousTrack,
    onNextTrack,
    canGoPrevious,
    canGoNext,
    syncedLyrics,
    isFavorite,
    toggleFavorite,
    onShareCopied
}: MobilePlayerViewProps) => {
    const [lyricsExpanded, setLyricsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mobileLineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const lastMobileScrolledLine = useRef<number>(-1);
    const previewLineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const lastPreviewScrolledLine = useRef<number>(-1);
    const scrollableRef = useRef<HTMLDivElement>(null);

    const getActiveLine = (synced: SyncedLyric[], time: number): number => {
        for (let i = synced.length - 1; i >= 0; i--) {
            const lyric = synced[i];
            if (lyric && lyric.text !== '' && time >= lyric.time) return i;
        }
        return -1;
    };

    const activeLine = syncedLyrics ? getActiveLine(syncedLyrics, currentTime) : -1;

    const setMobileLineRef = useCallback((index: number) => (el: HTMLParagraphElement | null) => {
        mobileLineRefs.current[index] = el;
    }, []);

    const setPreviewLineRef = useCallback((index: number) => (el: HTMLParagraphElement | null) => {
        previewLineRefs.current[index] = el;
    }, []);

    // Auto-scroll for mobile expanded lyrics
    useEffect(() => {
        if (!lyricsExpanded || activeLine < 0 || activeLine === lastMobileScrolledLine.current) return;
        lastMobileScrolledLine.current = activeLine;

        const lineEl = mobileLineRefs.current[activeLine];
        const container = mobileContainerRef.current;
        if (!lineEl || !container) return;

        const containerRect = container.getBoundingClientRect();
        const lineRect = lineEl.getBoundingClientRect();
        const targetOffset = containerRect.height * 0.33;
        const currentOffset = lineRect.top - containerRect.top;
        const scrollDelta = currentOffset - targetOffset;

        container.scrollBy({ top: scrollDelta, behavior: 'smooth' });
    }, [activeLine, lyricsExpanded]);

    // Auto-scroll for lyrics preview (non-expanded)
    useEffect(() => {
        if (lyricsExpanded || activeLine < 0 || activeLine === lastPreviewScrolledLine.current) return;
        lastPreviewScrolledLine.current = activeLine;

        const lineEl = previewLineRefs.current[activeLine];
        const container = previewContainerRef.current;
        if (!lineEl || !container) return;

        const containerRect = container.getBoundingClientRect();
        const lineRect = lineEl.getBoundingClientRect();
        const targetOffset = containerRect.height * 0.33;
        const currentOffset = lineRect.top - containerRect.top;
        const scrollDelta = currentOffset - targetOffset;

        container.scrollBy({ top: scrollDelta, behavior: 'smooth' });
    }, [activeLine, lyricsExpanded]);

    // Scroll to top when track changes
    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = 0;
        }
    }, [currentlyPlaying?.id]);

    // Get dynamic background color from album art
    const { backgroundStyle } = useDynamicBackground(currentlyPlaying?.image || null);

    if (!isOpen || !currentlyPlaying) return null;

    // Extract primary color for solid lyrics background
    const primaryColor = backgroundStyle['--primary-color'] || 'rgb(83, 83, 83)';

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/project/${currentlyPlaying.id}`;
        navigator.clipboard.writeText(shareUrl);
        onShareCopied?.();
        trackEvent('Share', 'Copy Link', currentlyPlaying.id);
    };

    const handleAlbumArtClick = () => {
        if (currentlyPlaying?.image && !currentlyPlaying.image.includes('/api/placeholder')) {
            setIsModalOpen(true);
        }
    };

    // Expanded Lyrics View (full-screen takeover)
    if (lyricsExpanded && syncedLyrics) {
        return (
            <div
                className="fixed inset-0 z-[80] md:hidden flex flex-col"
                style={{ backgroundColor: primaryColor }}
            >
                {/* Header */}
                <div className="flex items-center px-4 pt-4 pb-2">
                    <button
                        onClick={() => setLyricsExpanded(false)}
                        className="p-2 -ml-2 hover:bg-black/10 rounded-full transition-colors"
                        aria-label="Close expanded lyrics"
                    >
                        <ChevronDown className="w-7 h-7 text-white" />
                    </button>
                    <div className="flex-1 text-center pr-9">
                        <h2 className="text-white font-bold text-base truncate">
                            {currentlyPlaying.title}
                        </h2>
                        <p className="text-white/80 text-sm truncate">
                            {currentlyPlaying.artist}
                        </p>
                    </div>
                </div>

                {/* Lyrics - scrollable with fade effect */}
                <div className="flex-1 relative overflow-hidden">
                    <div ref={mobileContainerRef} className="absolute inset-0 overflow-y-auto px-6 pb-16 spotify-scrollbar">
                        <div>
                            {syncedLyrics.map((line, index) => {
                                if (line.text === '') {
                                    return <div key={index} className="h-6" />;
                                }

                                const isActive = index === activeLine;
                                const isPast = index < activeLine;
                                return (
                                    <p
                                        key={index}
                                        ref={setMobileLineRef(index)}
                                        className={`
                                            text-2xl font-bold leading-loose
                                            transition-all duration-500 ease-out origin-left
                                            ${isActive ? 'text-white scale-[1.3]' : isPast ? 'text-white/40 scale-100' : 'text-white/40 scale-100'}
                                        `}
                                        style={{ letterSpacing: '-0.02em' }}
                                    >
                                        {isActive && line.text === '🎵' ? <span className="lyrics-note-pulse">{line.text}</span> : line.text}
                                    </p>
                                );
                            })}
                            <div className="h-[50vh]" />
                        </div>
                    </div>
                    {/* Bottom fade gradient */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                        style={{
                            background: `linear-gradient(to top, ${primaryColor}, transparent)`
                        }}
                    />
                </div>

                {/* Bottom Controls */}
                <div className="px-6 pb-8 pt-2">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <ProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={onSeek}
                            variant="full"
                            showTimes={true}
                        />
                    </div>

                    {/* Play Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onTogglePlay}
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-black" fill="currentColor" />
                            ) : (
                                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[70] md:hidden">
            {/* Canvas Background */}
            <div className="absolute inset-0 z-0">
                <ProjectCanvas
                    project={currentlyPlaying}
                    isPlaying={isPlaying}
                    className="w-full h-full"
                    posterImage={currentlyPlaying.canvasPoster}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-center py-4 px-4">
                    <button
                        onClick={onClose}
                        className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close player"
                    >
                        <ChevronDown className="w-8 h-8 text-white" />
                    </button>
                    <span className="text-white font-semibold text-sm uppercase tracking-wider">
                        Now Playing
                    </span>
                </div>

                {/* Main Content - Scrollable */}
                <div ref={scrollableRef} className="flex-1 overflow-y-auto px-6 pb-8">
                    {/* Album Art */}
                    <div className="flex justify-center mt-4 mb-8">
                        <div
                            onClick={handleAlbumArtClick}
                            className={`${currentlyPlaying?.image && !currentlyPlaying.image.includes('/api/placeholder')
                                ? 'cursor-pointer hover:scale-105 transition-transform'
                                : ''
                            }`}
                        >
                            <ProjectImage
                                project={currentlyPlaying}
                                size="custom"
                                className="w-64 h-64 sm:w-72 sm:h-72 shadow-2xl"
                                shape="rounded"
                            />
                        </div>
                    </div>

                    {/* Track Info */}
                    <div className="text-center mb-8">
                        <h2 className="text-white text-2xl font-bold mb-1 truncate">
                            {currentlyPlaying.title}
                        </h2>
                        <p className="text-white/70 text-base truncate">
                            {currentlyPlaying.artist}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <ProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={onSeek}
                            variant="full"
                            showTimes={true}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center space-x-8 mb-8">
                        <button
                            onClick={onPreviousTrack}
                            disabled={!canGoPrevious}
                            className={`p-2 transition-colors ${
                                canGoPrevious
                                    ? 'text-white hover:text-white/80'
                                    : 'text-white/30 cursor-not-allowed'
                            }`}
                            aria-label="Previous track"
                        >
                            <SkipBack className="w-8 h-8" fill="currentColor" />
                        </button>

                        <button
                            onClick={onTogglePlay}
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-black" fill="currentColor" />
                            ) : (
                                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                            )}
                        </button>

                        <button
                            onClick={onNextTrack}
                            disabled={!canGoNext}
                            className={`p-2 transition-colors ${
                                canGoNext
                                    ? 'text-white hover:text-white/80'
                                    : 'text-white/30 cursor-not-allowed'
                            }`}
                            aria-label="Next track"
                        >
                            <SkipForward className="w-8 h-8" fill="currentColor" />
                        </button>
                    </div>

                    {/* Lyrics Section */}
                    {syncedLyrics && (
                        <div
                            className="mt-8 rounded-lg p-5"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {/* Header: Lyrics label + expand icon */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white font-semibold text-sm">Lyrics</span>
                                <button
                                    onClick={() => setLyricsExpanded(true)}
                                    className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors"
                                    aria-label="Expand lyrics"
                                >
                                    <Maximize2 className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            {/* Synced lyrics preview */}
                            <div
                                ref={previewContainerRef}
                                className="max-h-64 overflow-y-auto spotify-scrollbar"
                            >
                                {syncedLyrics.map((line, index) => {
                                    if (line.text === '') {
                                        return <div key={index} className="h-4" />;
                                    }
                                    const isActive = index === activeLine;
                                    const isPast = index < activeLine;
                                    return (
                                        <p
                                            key={index}
                                            ref={setPreviewLineRef(index)}
                                            className={`
                                                text-xl font-bold leading-relaxed
                                                transition-all duration-500 ease-out origin-left
                                                ${isActive ? 'text-white scale-[1.3]' : isPast ? 'text-white/40 scale-100' : 'text-white/40 scale-100'}
                                            `}
                                            style={{ letterSpacing: '-0.02em' }}
                                        >
                                            {isActive && line.text === '🎵' ? <span className="lyrics-note-pulse">{line.text}</span> : line.text}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-6 mt-8 mb-6">
                        {currentlyPlaying.demoUrl && (
                            <a
                                href={currentlyPlaying.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {currentlyPlaying.githubUrl && (
                            <a
                                href={currentlyPlaying.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {toggleFavorite && (
                            <button
                                onClick={() => toggleFavorite(currentlyPlaying.id)}
                                className="text-spotify-secondary hover:text-white transition-colors"
                                aria-label={isFavorite?.(currentlyPlaying.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <Heart
                                    className="w-5 h-5"
                                    fill={isFavorite?.(currentlyPlaying.id) ? '#1DB954' : 'none'}
                                    color={isFavorite?.(currentlyPlaying.id) ? '#1DB954' : 'currentColor'}
                                />
                            </button>
                        )}
                        <button
                            onClick={handleShare}
                            className="text-spotify-secondary hover:text-white transition-colors"
                            aria-label="Copy link to Song"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* About This Project */}
                    <div className="mt-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">About this project</h2>
                            <p className="text-gray-300 mb-6 text-sm leading-relaxed">{currentlyPlaying.description}</p>

                            <h3 className="text-lg font-bold text-white mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {currentlyPlaying.skills.map((skill: string) => (
                                    <span key={skill} className="px-3 py-1 bg-white text-black rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Project Stats</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-400 text-sm">Duration</p>
                                    <p className="text-white font-semibold">{currentlyPlaying.duration}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Year</p>
                                    <p className="text-white font-semibold">{currentlyPlaying.year}</p>
                                </div>
                                {currentlyPlaying.impact && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Impact</p>
                                        <p className="text-white font-semibold">{currentlyPlaying.impact}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-gray-400 text-sm">Album</p>
                                    <p className="text-white font-semibold">{currentlyPlaying.album}</p>
                                </div>
                                {currentlyPlaying.albumArtBasedOn && (
                                    <div>
                                        <p className="text-gray-400 text-sm">Music and Album Art based on</p>
                                        <p className="text-white font-semibold">{currentlyPlaying.albumArtBasedOn}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Album Art Modal */}
            <AlbumArtModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={currentlyPlaying}
            />
        </div>
    );
};

export default MobilePlayerView;
