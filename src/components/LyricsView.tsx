import { X } from 'lucide-react';
import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project } from '../types';

interface LyricsViewProps {
    project: Project;
    lyrics: string | null;
    onClose: () => void;
}

const LyricsView = ({ project, lyrics, onClose }: LyricsViewProps) => {
    // Get background gradient from album art
    const { backgroundStyle } = useDynamicBackground(project.image);

    if (!lyrics) {
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

            {/* Lyrics content with padding */}
            <div className="px-12 py-16">
                <div className="text-white text-base md:text-5xl font-bold leading-relaxed whitespace-pre-line">
                    {lyrics}
                </div>
            </div>
        </div>
    );
};

export default LyricsView;
