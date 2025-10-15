import { useState } from 'react';
import { Play, Pause, Heart, ExternalLink, Github } from 'lucide-react';
import ProjectImage from '../ProjectImage';
import AlbumArtModal from '../AlbumArtModal';
import ProjectCanvas from '../ProjectCanvas';
import type { Project } from '../../types';

interface ProjectDetailViewProps {
    project: Project;
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    onPlayProject: (_project: Project) => void;
}

const ProjectDetailView = ({
    project,
    currentlyPlaying,
    isPlaying,
    onPlayProject
}: ProjectDetailViewProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAlbumArtClick = () => {
    // Only open modal if the project has valid album art
        if (project?.image && !project.image.includes('/api/placeholder')) {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="relative text-white p-4 md:p-6">
            {/* Mobile Canvas Background - Full screen behind content */}
            <div className="fixed inset-0 md:hidden z-0">
                <ProjectCanvas
                    project={project}
                    isPlaying={true}
                    className="w-full h-full"
                    posterImage={project.canvasPoster}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content - positioned above canvas on mobile */}
            <div className="relative z-10">
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
            fontSize: '3rem' // Override the text size for large display
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
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-white cursor-pointer" />
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
                                <p className="text-gray-400 text-sm">Album Art based on</p>
                                <p className="text-white font-semibold">{project.albumArtBasedOn}</p>
                            </div>
          )}
                        </div>
                    </div>
                </div>

                {/* Album Art Modal */}
                <AlbumArtModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={project}
            />
            </div>
        </div>
    );
};

export default ProjectDetailView;