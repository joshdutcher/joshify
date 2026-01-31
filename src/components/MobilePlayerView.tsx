import { useState } from 'react';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Maximize2 } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProjectCanvas from './ProjectCanvas';
import ProgressBar from './ProgressBar';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project } from '../types';

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
    lyrics: string | null;
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
    lyrics
}: MobilePlayerViewProps) => {
    const [lyricsExpanded, setLyricsExpanded] = useState(false);

    // Get dynamic background color from album art
    const { backgroundStyle } = useDynamicBackground(currentlyPlaying?.image || null);

    if (!isOpen || !currentlyPlaying) return null;

    // Extract primary color for solid lyrics background
    const primaryColor = backgroundStyle['--primary-color'] || 'rgb(83, 83, 83)';

    // Expanded Lyrics View (full-screen takeover)
    if (lyricsExpanded && lyrics) {
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
                    <div className="absolute inset-0 overflow-y-auto px-6 pb-16 spotify-scrollbar">
                        <div className="text-white text-2xl font-bold leading-loose whitespace-pre-line">
                            {lyrics}
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
                <div className="flex-1 overflow-y-auto px-6 pb-8">
                    {/* Album Art */}
                    <div className="flex justify-center mt-4 mb-8">
                        <ProjectImage
                            project={currentlyPlaying}
                            size="custom"
                            className="w-64 h-64 sm:w-72 sm:h-72 shadow-2xl"
                            shape="rounded"
                        />
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
                    {lyrics && (
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
                            {/* Lyrics text */}
                            <div
                                className="text-white text-xl font-bold leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto spotify-scrollbar"
                            >
                                {lyrics}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobilePlayerView;
