import { useState, useEffect } from 'react';
import { Play, Pause, ExternalLink, Github, Share2, Mic2, Heart } from 'lucide-react';
import ProjectImage from '../ProjectImage';
import AlbumArtModal from '../AlbumArtModal';
import type { Project } from '../../types';
import { trackEvent } from '../../utils/analytics';

interface ProjectDetailViewProps {
    project: Project;
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    onPlayProject: (_project: Project) => void;
    onClose?: () => void;
    onMobileBack?: () => void;
    hasLyrics?: boolean;
    isLyricsOpen?: boolean;
    onToggleLyrics?: () => void;
    isFavorite?: (_projectId: string) => boolean;
    toggleFavorite?: (_projectId: string) => void;
    onShareCopied?: () => void;
    onOpenMobilePlayer?: () => void;
}

const ProjectDetailView = ({
    project,
    currentlyPlaying,
    isPlaying,
    onPlayProject,
    onClose: _onClose,
    onMobileBack: _onMobileBack,
    hasLyrics = false,
    isLyricsOpen = false,
    onToggleLyrics,
    isFavorite,
    toggleFavorite,
    onShareCopied,
    onOpenMobilePlayer
}: ProjectDetailViewProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // On mobile deep links, auto-play and open the unified mobile player
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            onPlayProject(project);
            onOpenMobilePlayer?.();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.id]);

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/project/${project.id}`;
        navigator.clipboard.writeText(shareUrl);
        onShareCopied?.();
        trackEvent('Share', 'Copy Link', project.id);
    };

    const handleAlbumArtClick = () => {
        if (project?.image && !project.image.includes('/api/placeholder')) {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="relative text-white md:p-6">
            {/* Desktop: Normal layout */}
            <div className="hidden md:block relative z-10">
                <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
                    <div
                        onClick={handleAlbumArtClick}
                        className={`${project?.image && !project.image.includes('/api/placeholder')
                            ? 'cursor-pointer hover:scale-105 transition-transform'
                            : ''
                        }`}
                    >
                        <ProjectImage
                            project={project}
                            size="custom"
                            className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 shadow-2xl"
                            shape="rounded"
                            customStyle={{
                                fontSize: '3rem'
                            }}
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold uppercase">Project</p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">{project.title}</h1>
                        <p className="text-gray-400 mb-2">{project.artist}</p>
                        <p className="text-gray-400">{project.year} • {project.duration}{project.impact ? ` • ${project.impact}` : ''}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-8">
                    <button
                        className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                        onClick={() => onPlayProject(project)}
                    >
                        {currentlyPlaying?.id === project.id && isPlaying ?
                            <Pause className="w-5 h-5 md:w-6 md:h-6 text-black" fill="currentColor" /> :
                            <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-0.5" fill="currentColor" />
                        }
                    </button>
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">View Live</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors"
                        >
                            <Github className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">View Repo</span>
                        </a>
                    )}
                    {toggleFavorite && (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(project.id); }}
                            className="flex items-center space-x-2 text-spotify-secondary hover:text-white transition-colors"
                            aria-label={isFavorite?.(project.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart
                                className="w-4 h-4 md:w-5 md:h-5"
                                fill={isFavorite?.(project.id) ? '#1DB954' : 'none'}
                                color={isFavorite?.(project.id) ? '#1DB954' : 'currentColor'}
                            />
                            <span className={`text-sm md:text-base ${isFavorite?.(project.id) ? 'text-spotify-green' : ''}`}>
                                {isFavorite?.(project.id) ? 'Unlike' : 'Like'}
                            </span>
                        </button>
                    )}
                    {onToggleLyrics && (
                        <button
                            onClick={hasLyrics ? onToggleLyrics : undefined}
                            disabled={!hasLyrics}
                            className={`flex items-center space-x-2 transition-colors ${isLyricsOpen ? 'text-spotify-green' : hasLyrics ? 'text-spotify-secondary hover:text-white' : 'text-gray-600 cursor-not-allowed'}`}
                            aria-label={isLyricsOpen ? 'Close lyrics' : 'Lyrics'}
                        >
                            <Mic2 className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">Lyrics</span>
                        </button>
                    )}
                    <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-spotify-secondary hover:text-white transition-colors"
                        aria-label="Copy link to Song"
                        title="Copy link to Song"
                    >
                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Share</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">About this project</h2>
                        <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">{project.description}</p>

                        <h3 className="text-lg md:text-xl font-bold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill: string) => (
                                <span key={skill} className="px-3 py-1 bg-white text-black rounded-full text-xs md:text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">Project Stats</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-400 text-sm">Duration</p>
                                <p className="text-white font-semibold">{project.duration}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Year</p>
                                <p className="text-white font-semibold">{project.year}</p>
                            </div>
                            {project.impact && (
                                <div>
                                    <p className="text-gray-400 text-sm">Impact</p>
                                    <p className="text-white font-semibold">{project.impact}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-gray-400 text-sm">Album</p>
                                <p className="text-white font-semibold">{project.album}</p>
                            </div>
                            {project.albumArtBasedOn && (
                                <div>
                                    <p className="text-gray-400 text-sm">Music and Album Art based on</p>
                                    <p className="text-white font-semibold">{project.albumArtBasedOn}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Album Art Modal - Desktop only now */}
            <AlbumArtModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={project}
            />

        </div>
    );
};

export default ProjectDetailView;
