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
                className="hidden lg:fixed lg:inset-0 lg:flex lg:items-center lg:justify-center z-[65] bg-black/80"
                onClick={onClose}
            >
                <div
                    className="bg-spotify-card rounded-lg p-8 max-w-lg text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-spotify-secondary">No lyrics available for this track.</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="hidden lg:fixed lg:inset-0 lg:flex z-[65]"
            onClick={onClose}
        >
            {/* Full-screen gradient background */}
            <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                    background: backgroundStyle.background,
                }}
            />

            {/* Darker overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content centered in viewport */}
            <div
                className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 py-16"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close lyrics"
                >
                    <X className="w-8 h-8 text-white" />
                </button>

                {/* Track info header */}
                <div className="text-center mb-8">
                    <h2 className="text-white text-3xl font-bold mb-2">{project.title}</h2>
                    <p className="text-white/70 text-lg">{project.artist}</p>
                </div>

                {/* Scrollable lyrics container */}
                <div
                    className="max-w-2xl w-full max-h-[60vh] overflow-y-auto spotify-scrollbar bg-black/30 rounded-lg p-8"
                >
                    <div className="text-white text-lg leading-relaxed whitespace-pre-line text-center">
                        {lyrics}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LyricsView;
