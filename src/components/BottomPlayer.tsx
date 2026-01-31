import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Shuffle, Repeat, SkipBack, SkipForward, Mic2 } from 'lucide-react';
import ProjectImage from './ProjectImage';
import ProgressBar from './ProgressBar';
import type { Project, Playlist } from '../types';

interface BottomPlayerProps {
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onNavigateToProject: (_project: Project) => void;
    onNextTrack: () => void;
    onPreviousTrack: () => void;
    currentPlaylist: Playlist | null;
    currentTrackIndex: number;
    // Audio state
    currentTime: number;
    duration: number;
    volume: number;
    hasLyrics: boolean;
    isLyricsOpen: boolean;
    // Audio controls
    onSeek: (_time: number) => void;
    onVolumeChange: (_volume: number) => void;
    onToggleLyrics: () => void;
    // Mobile player
    onOpenMobilePlayer: () => void;
}

const BottomPlayer = ({
    currentlyPlaying,
    isPlaying,
    onTogglePlay,
    onNavigateToProject,
    onNextTrack,
    onPreviousTrack,
    currentPlaylist,
    currentTrackIndex,
    currentTime,
    duration,
    volume,
    hasLyrics,
    isLyricsOpen,
    onSeek,
    onVolumeChange,
    onToggleLyrics,
    onOpenMobilePlayer
}: BottomPlayerProps) => {
    // Determine if next/previous buttons should be enabled
    const canGoPrevious = currentPlaylist && currentTrackIndex > 0;
    const canGoNext = currentPlaylist && currentTrackIndex < (currentPlaylist.projects?.length - 1);

    // Volume slider drag state
    const volumeRef = useRef<HTMLDivElement>(null);
    const [isVolumeDragging, setIsVolumeDragging] = useState(false);

    const calculateVolume = useCallback((clientX: number): number => {
        if (!volumeRef.current) return volume;
        const rect = volumeRef.current.getBoundingClientRect();
        const newVolume = (clientX - rect.left) / rect.width;
        return Math.max(0, Math.min(1, newVolume));
    }, [volume]);

    const handleVolumeMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsVolumeDragging(true);
        onVolumeChange(calculateVolume(e.clientX));
    }, [calculateVolume, onVolumeChange]);

    const handleVolumeMouseMove = useCallback((e: MouseEvent) => {
        if (isVolumeDragging) {
            onVolumeChange(calculateVolume(e.clientX));
        }
    }, [isVolumeDragging, calculateVolume, onVolumeChange]);

    const handleVolumeMouseUp = useCallback(() => {
        setIsVolumeDragging(false);
    }, []);

    useEffect(() => {
        if (isVolumeDragging) {
            window.addEventListener('mousemove', handleVolumeMouseMove);
            window.addEventListener('mouseup', handleVolumeMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleVolumeMouseMove);
                window.removeEventListener('mouseup', handleVolumeMouseUp);
            };
        }
        return undefined;
    }, [isVolumeDragging, handleVolumeMouseMove, handleVolumeMouseUp]);

    const toggleMute = () => {
        onVolumeChange(volume > 0 ? 0 : 0.75);
    };

    if (!currentlyPlaying) {
        return (
            <div className="h-20 md:h-24 bg-black flex items-center px-4 relative z-[60]">
                <div className="flex items-center justify-center w-full text-spotify-secondary">
                    <p className="text-base">Select a project to view details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black relative z-[60]">
            {/* Mobile Player Bar */}
            <div className="md:hidden">
                {/* Clickable area (excludes play button) */}
                <div
                    className="flex items-center px-3 py-2 cursor-pointer"
                    onClick={onOpenMobilePlayer}
                >
                    {/* Album Art */}
                    <ProjectImage
                        project={currentlyPlaying}
                        size="custom"
                        className="w-12 h-12 flex-shrink-0"
                        shape="rounded"
                    />

                    {/* Track Info */}
                    <div className="flex-1 min-w-0 mx-3">
                        <p className="text-white font-semibold text-sm truncate">
                            {currentlyPlaying.title}
                        </p>
                        <p className="text-spotify-secondary text-xs truncate">
                            {currentlyPlaying.artist}
                        </p>
                    </div>

                    {/* Play Button */}
                    <button
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTogglePlay();
                        }}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 text-black" fill="currentColor" />
                        ) : (
                            <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                        )}
                    </button>
                </div>

                {/* Mobile Progress Bar - thin at bottom */}
                <div className="px-3 pb-2">
                    <ProgressBar
                        currentTime={currentTime}
                        duration={duration}
                        onSeek={onSeek}
                        variant="thin"
                    />
                </div>
            </div>

            {/* Desktop Player Bar */}
            <div className="hidden md:flex h-24 items-center px-4">
                {/* Left: Now Playing Info */}
                <div className="flex items-center space-x-4 w-1/4 min-w-0">
                    <ProjectImage
                        project={currentlyPlaying}
                        size="custom"
                        className="w-14 h-14"
                        shape="rounded"
                    />
                    <div className="min-w-0 flex-1">
                        <p
                            className="text-spotify-primary font-semibold text-base truncate hover:underline cursor-pointer"
                            onClick={() => onNavigateToProject(currentlyPlaying)}
                        >
                            {currentlyPlaying.title}
                        </p>
                        <p className="text-spotify-secondary text-sm truncate">
                            {currentlyPlaying.artist}
                        </p>
                    </div>
                </div>

                {/* Center: Player Controls */}
                <div className="flex flex-col items-center w-1/2 max-w-2xl mx-auto">
                    {/* Control Buttons */}
                    <div className="flex items-center space-x-6 mb-2">
                        <Shuffle className="w-4 h-4 text-spotify-secondary hover:text-spotify-primary cursor-pointer transition-colors" />
                        <button
                            onClick={canGoPrevious ? onPreviousTrack : undefined}
                            disabled={!canGoPrevious}
                            className={`transition-colors ${
                                canGoPrevious
                                    ? 'text-spotify-secondary hover:text-spotify-primary cursor-pointer'
                                    : 'text-gray-600 cursor-not-allowed'
                            }`}
                            aria-label="Previous track"
                        >
                            <SkipBack className="w-4 h-4" />
                        </button>
                        <button
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                            onClick={onTogglePlay}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-black" fill="currentColor" />
                            ) : (
                                <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                            )}
                        </button>
                        <button
                            onClick={canGoNext ? onNextTrack : undefined}
                            disabled={!canGoNext}
                            className={`transition-colors ${
                                canGoNext
                                    ? 'text-spotify-secondary hover:text-spotify-primary cursor-pointer'
                                    : 'text-gray-600 cursor-not-allowed'
                            }`}
                            aria-label="Next track"
                        >
                            <SkipForward className="w-4 h-4" />
                        </button>
                        <Repeat className="w-4 h-4 text-spotify-secondary hover:text-spotify-primary cursor-pointer transition-colors" />
                    </div>

                    {/* Progress Bar with Times */}
                    <div className="w-full max-w-md">
                        <ProgressBar
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={onSeek}
                            variant="full"
                            showTimes={true}
                        />
                    </div>
                </div>

                {/* Right: Lyrics & Volume */}
                <div className="flex items-center justify-end space-x-4 w-1/4">
                    {/* Lyrics Button */}
                    <div className="relative group">
                        <button
                            onClick={onToggleLyrics}
                            className={`p-2 rounded-full transition-all ${
                                isLyricsOpen
                                    ? 'text-spotify-green'
                                    : hasLyrics
                                        ? 'text-spotify-secondary hover:text-spotify-primary hover:bg-white/10'
                                        : 'text-gray-600 cursor-not-allowed'
                            } ${hasLyrics && !isLyricsOpen ? 'animate-pulse-subtle' : ''}`}
                            disabled={!hasLyrics}
                            aria-label={isLyricsOpen ? 'Close lyrics' : 'View lyrics'}
                        >
                            <Mic2 className="w-4 h-4" />
                        </button>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-spotify-card text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {isLyricsOpen ? 'Close lyrics' : hasLyrics ? 'Lyrics' : 'No lyrics available'}
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleMute}
                            className="text-spotify-secondary hover:text-spotify-primary transition-colors"
                            aria-label={volume > 0 ? 'Mute' : 'Unmute'}
                        >
                            {volume > 0 ? (
                                <Volume2 className="w-4 h-4" />
                            ) : (
                                <VolumeX className="w-4 h-4" />
                            )}
                        </button>
                        <div
                            ref={volumeRef}
                            className="w-24 h-3 flex items-center cursor-pointer group relative"
                            onMouseDown={handleVolumeMouseDown}
                        >
                            <div className="w-full h-1 bg-spotify-hover rounded-full relative">
                                <div
                                    className={`h-1 rounded-full transition-colors ${isVolumeDragging ? 'bg-spotify-green' : 'bg-white group-hover:bg-spotify-green'}`}
                                    style={{ width: `${volume * 100}%` }}
                                />
                            </div>
                            {/* Volume dot - always visible when dragging */}
                            <div
                                className={`absolute w-3 h-3 bg-white rounded-full transition-opacity ${isVolumeDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                style={{ left: `calc(${volume * 100}% - 6px)` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomPlayer;
