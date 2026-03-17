import React, { useRef, useState, useCallback, useEffect } from 'react';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (_time: number) => void;
    variant?: 'thin' | 'full';
    showTimes?: boolean;
    className?: string;
}

const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar = ({
    currentTime,
    duration,
    onSeek,
    variant = 'full',
    showTimes = false,
    className = ''
}: ProgressBarProps) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const calculateTimeFromPosition = useCallback((clientX: number): number => {
        if (!progressRef.current || !duration) return 0;
        const rect = progressRef.current.getBoundingClientRect();
        const position = (clientX - rect.left) / rect.width;
        return Math.max(0, Math.min(duration, position * duration));
    }, [duration]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        const time = calculateTimeFromPosition(e.clientX);
        onSeek(time);
    }, [calculateTimeFromPosition, onSeek]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        const time = calculateTimeFromPosition(e.clientX);
        onSeek(time);
    }, [calculateTimeFromPosition, onSeek]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const time = calculateTimeFromPosition(e.clientX);
            onSeek(time);
        }
    }, [isDragging, calculateTimeFromPosition, onSeek]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleHover = useCallback((e: React.MouseEvent) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const position = ((e.clientX - rect.left) / rect.width) * 100;
        setHoverPosition(Math.max(0, Math.min(100, position)));
    }, []);

    const handleHoverLeave = useCallback(() => {
        setHoverPosition(null);
    }, []);

    // Touch event handlers for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        if (touch) {
            const time = calculateTimeFromPosition(touch.clientX);
            onSeek(time);
        }
    }, [calculateTimeFromPosition, onSeek]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (isDragging) {
            const touch = e.touches[0];
            if (touch) {
                const time = calculateTimeFromPosition(touch.clientX);
                onSeek(time);
            }
        }
    }, [isDragging, calculateTimeFromPosition, onSeek]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
        return undefined;
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const isThin = variant === 'thin';
    const barHeight = isThin ? 'h-1' : 'h-1 group-hover:h-1.5';
    const dotSize = isThin ? 'w-0 h-0' : 'w-3 h-3';

    return (
        <div className={`${showTimes ? 'flex items-center space-x-2' : ''} ${className}`}>
            {showTimes && (
                <span className="text-xs text-spotify-secondary min-w-[35px] text-right">
                    {formatTime(currentTime)}
                </span>
            )}

            <div
                ref={progressRef}
                className={`group relative flex-1 ${isThin ? 'h-1' : 'h-3'} flex items-center cursor-pointer`}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleHover}
                onMouseLeave={handleHoverLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Background track */}
                <div className={`absolute inset-x-0 ${barHeight} bg-spotify-hover rounded-full transition-all duration-150`}>
                    {/* Filled portion */}
                    <div
                        className={`${barHeight} ${isDragging || hoverPosition !== null ? 'bg-spotify-green' : 'bg-white'} rounded-full transition-all duration-150`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Position dot - only show on hover or while dragging for full variant */}
                {!isThin && (
                    <div
                        className={`absolute ${dotSize} bg-white rounded-full shadow-md transition-opacity duration-150 ${
                            isDragging || hoverPosition !== null ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{
                            left: `calc(${progress}% - 6px)`,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    />
                )}
            </div>

            {showTimes && (
                <span className="text-xs text-spotify-secondary min-w-[35px]">
                    {formatTime(duration)}
                </span>
            )}
        </div>
    );
};

export default ProgressBar;
