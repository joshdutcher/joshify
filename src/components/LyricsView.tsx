import useDynamicBackground from '../hooks/useDynamicBackground';
import type { Project } from '../types';

interface LyricsViewProps {
    project: Project;
    lyrics: string | null;
}

const LyricsView = ({ project, lyrics }: LyricsViewProps) => {
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
            className="h-full overflow-y-auto spotify-scrollbar"
            style={{
                background: backgroundStyle.background,
                transition: 'background 0.8s ease-in-out'
            }}
        >
            {/* Lyrics content with padding */}
            <div className="px-12 py-16">
                <div className="text-white text-3xl font-bold leading-relaxed whitespace-pre-line">
                    {lyrics}
                </div>
            </div>
        </div>
    );
};

export default LyricsView;
