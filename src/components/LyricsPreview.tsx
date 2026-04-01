import { useState, useEffect, useRef } from 'react';
import type { SyncedLyric } from '../types';

interface LyricsPreviewProps {
    syncedLyrics: SyncedLyric[] | null;
    currentTime: number;
}

const getActiveLine = (syncedLyrics: SyncedLyric[], currentTime: number): number => {
    for (let i = syncedLyrics.length - 1; i >= 0; i--) {
        const lyric = syncedLyrics[i];
        if (lyric && lyric.text !== '' && currentTime >= lyric.time) return i;
    }
    return -1;
};

const LyricsPreview = ({ syncedLyrics, currentTime }: LyricsPreviewProps) => {
    const [displayedLine, setDisplayedLine] = useState<string | null>(null);
    const [animState, setAnimState] = useState<'visible' | 'exit' | 'enter'>('visible');
    const pendingLine = useRef<string | null>(null);
    const prevActiveIndex = useRef<number>(-1);

    const activeIndex = syncedLyrics ? getActiveLine(syncedLyrics, currentTime) : -1;
    const activeText = activeIndex >= 0 && syncedLyrics ? syncedLyrics[activeIndex]!.text : null;

    useEffect(() => {
        if (activeIndex === prevActiveIndex.current) return;
        prevActiveIndex.current = activeIndex;

        if (!activeText) {
            // No active line — exit current
            if (displayedLine) {
                setAnimState('exit');
                setTimeout(() => {
                    setDisplayedLine(null);
                    setAnimState('visible');
                }, 200);
            }
            return;
        }

        if (!displayedLine) {
            // First line — enter from below
            setDisplayedLine(activeText);
            setAnimState('enter');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimState('visible'));
            });
            return;
        }

        // Transition: exit old, then enter new
        pendingLine.current = activeText;
        setAnimState('exit');
        setTimeout(() => {
            setDisplayedLine(pendingLine.current);
            pendingLine.current = null;
            setAnimState('enter');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimState('visible'));
            });
        }, 200);
    }, [activeIndex, activeText, displayedLine]);

    if (!syncedLyrics || !displayedLine) return null;

    const transformStyles: Record<string, string> = {
        visible: 'translateY(0)',
        exit: 'translateY(-100%)',
        enter: 'translateY(100%)',
    };

    const opacityStyles: Record<string, number> = {
        visible: 1,
        exit: 0,
        enter: 0,
    };

    return (
        <div className="overflow-hidden mb-2" style={{ height: '2.5rem' }}>
            <p
                className="text-white font-semibold text-sm leading-snug drop-shadow-lg"
                style={{
                    letterSpacing: '-0.02em',
                    transform: transformStyles[animState],
                    opacity: opacityStyles[animState],
                    transition: animState === 'enter' ? 'none' : 'transform 0.2s ease-out, opacity 0.2s ease-out',
                }}
            >
                {displayedLine}
            </p>
        </div>
    );
};

export default LyricsPreview;
