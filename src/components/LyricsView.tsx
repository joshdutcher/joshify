import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project, SyncedLyric } from '../types';

interface LyricsViewProps {
    project: Project;
    lyrics: string | null;
    syncedLyrics: SyncedLyric[] | null;
    currentTime: number;
    onClose: () => void;
}

const getActiveLine = (syncedLyrics: SyncedLyric[], currentTime: number): number => {
    for (let i = syncedLyrics.length - 1; i >= 0; i--) {
        const lyric = syncedLyrics[i];
        if (lyric && currentTime >= lyric.time) return i;
    }
    return -1;
};

const LyricsView = ({ project, lyrics, syncedLyrics, currentTime, onClose }: LyricsViewProps) => {
    const { backgroundStyle } = useDynamicBackground(project.image);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const lastScrolledLine = useRef<number>(-1);

    const activeLine = syncedLyrics ? getActiveLine(syncedLyrics, currentTime) : -1;

    const setLineRef = useCallback((index: number) => (el: HTMLParagraphElement | null) => {
        lineRefs.current[index] = el;
    }, []);

    // Auto-scroll to active line
    useEffect(() => {
        if (activeLine < 0 || activeLine === lastScrolledLine.current) return;
        lastScrolledLine.current = activeLine;

        const lineEl = lineRefs.current[activeLine];
        const container = containerRef.current;
        if (!lineEl || !container) return;

        const containerRect = container.getBoundingClientRect();
        const lineRect = lineEl.getBoundingClientRect();

        // Scroll so active line is roughly 1/3 from the top
        const targetOffset = containerRect.height * 0.33;
        const currentOffset = lineRect.top - containerRect.top;
        const scrollDelta = currentOffset - targetOffset;

        container.scrollBy({ top: scrollDelta, behavior: 'smooth' });
    }, [activeLine]);

    if (!lyrics && !syncedLyrics) {
        return (
            <div
                className="h-full flex items-center justify-center"
                style={{
                    background: backgroundStyle.background,
                }}
            >
                <p className="text-white/60 text-2xl">No lyrics available for this track.</p>
            </div>
        );
    }

    // Synced lyrics mode
    if (syncedLyrics) {
        return (
            <div
                ref={containerRef}
                className="h-full overflow-y-auto spotify-scrollbar relative"
                style={{
                    background: backgroundStyle.background,
                    transition: 'background 0.8s ease-in-out'
                }}
            >
                <button
                    onClick={onClose}
                    className="sticky top-4 left-full float-right mr-4 mt-4 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors z-10"
                    aria-label="Close lyrics"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="px-12 py-16">
                    {syncedLyrics.map((line, index) => {
                        const isActive = index === activeLine;
                        const isPast = index < activeLine;

                        return (
                            <p
                                key={index}
                                ref={setLineRef(index)}
                                className={`
                                    text-base md:text-5xl font-bold leading-relaxed
                                    transition-all duration-300 ease-out
                                    py-1 md:py-2
                                    ${isActive
                                        ? 'text-white scale-100'
                                        : isPast
                                            ? 'text-white/40'
                                            : 'text-white/40'
                                    }
                                `}
                            >
                                {line.text}
                            </p>
                        );
                    })}
                    {/* Bottom padding so last lines can scroll to center */}
                    <div className="h-[50vh]" />
                </div>
            </div>
        );
    }

    // Fallback: static lyrics
    return (
        <div
            className="h-full overflow-y-auto spotify-scrollbar relative"
            style={{
                background: backgroundStyle.background,
                transition: 'background 0.8s ease-in-out'
            }}
        >
            <button
                onClick={onClose}
                className="sticky top-4 left-full float-right mr-4 mt-4 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                aria-label="Close lyrics"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="px-12 py-16">
                <div className="text-white text-base md:text-5xl font-bold leading-relaxed whitespace-pre-line">
                    {lyrics}
                </div>
            </div>
        </div>
    );
};

export default LyricsView;
