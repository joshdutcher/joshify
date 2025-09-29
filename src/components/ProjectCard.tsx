
import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';
import ProjectImage from './ProjectImage';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  size?: string;
  showArtist?: boolean;
  currentlyPlaying: Project | null;
  isPlaying: boolean;
  onPlayProject: (_project: Project) => void;
  onProjectClick: (_project: Project) => void;
  onNavigateToCompany?: (_companyName: string) => void;
  onNavigateToDomain?: (_domainName: string) => void;
}


const ProjectCard = ({
    project,
    size = 'medium',
    showArtist = true,
    currentlyPlaying,
    isPlaying,
    onPlayProject,
    onProjectClick,
    onNavigateToCompany
}: ProjectCardProps) => {
    const isCurrentlyPlaying = currentlyPlaying?.id === project.id && isPlaying;

    return (
        <div className={`group relative cursor-pointer ${
      size === 'large'
        ? 'flex items-center bg-white/10 hover:bg-white/15 rounded overflow-hidden transition-all duration-200 h-14'
        : 'bg-spotify-card rounded p-1.5 hover:bg-spotify-hover transition-all duration-300 w-[140px] sm:w-[155px] md:w-[170px] lg:w-[188px]'
    }`}
            onClick={() => onProjectClick && onProjectClick(project)}>
            {/* Album art (no play button overlay for large size) */}
            <div className={`relative ${size === 'large' ? 'mb-0' : 'mb-0.5'}`}>
                <ProjectImage
                    project={project}
                    size={size === 'large' ? 'custom' : 'custom'}
                    className={`${size === 'large' ? 'w-14 h-14' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
                    shape={size === 'large' ? 'square' : 'rounded'}
                    showFallback={size === 'large'} // Only show fallback background for large cards
        />
                {/* Play button for small/medium cards only */}
                {size !== 'large' && (
                <button
                    className={`absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 ${
              isCurrentlyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
            }`}
                    onClick={(e) => {
              e.stopPropagation();
              onPlayProject && onPlayProject(project);
            }}
          >
                    {isCurrentlyPlaying ?
                        <Pause className="w-5 h-5 text-black" fill="currentColor" /> :
                        <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
            }
                </button>
        )}
            </div>

            {/* Text content */}
            <div className={size === 'large' ? 'flex-1 min-w-0 pl-4 pr-2 flex flex-col justify-center' : ''}>
                <h3
                    className={`text-spotify-primary font-bold mb-0 no-underline hover:no-underline cursor-pointer ${
            size === 'large' ? 'text-sm leading-tight line-clamp-2' : 'text-base truncate'
          }`}
                    onClick={(e) => {
            e.stopPropagation();
            onProjectClick && onProjectClick(project);
          }}
        >
                    {project.title}
                </h3>
                {showArtist && project.artist && (
                <p className="text-spotify-secondary text-sm truncate">
                    {project.artist.includes(' - ') ? (
                        <>
                            {project.artist.split(' - ')[0]} - 
                            <span 
                                className="hover:underline cursor-pointer hover:text-spotify-primary"
                                onClick={(e) => {
                    e.stopPropagation();
                    const company = project.artist?.split(' - ')[1];
                    if (company && onNavigateToCompany) {
                      onNavigateToCompany(company);
                    }
                  }}
                >
                                {project.artist?.split(' - ')[1]}
                            </span>
                        </>
            ) : (
              project.artist
            )}
                </p>
        )}
            </div>

            {/* Play/Pause/Equalizer controls for large (horizontal) cards - positioned on the right */}
            {size === 'large' && (
            <div className="relative w-8 h-full flex items-center justify-center flex-shrink-0 mr-2">
                {/* Equalizer - shown when playing and mouse is not hovering */}
                {currentlyPlaying?.id === project.id && isPlaying && (
                <div className="group-hover:opacity-0 transition-opacity duration-200">
                    <EqualizerIcon />
                </div>
          )}
          
                {/* Play button - shown on hover when not currently playing this project */}
                {(!currentlyPlaying || currentlyPlaying?.id !== project.id || !isPlaying) && (
                <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
                    <Play className="w-3 h-3 text-black ml-0.5" fill="currentColor" />
                </button>
          )}

                {/* Pause button - shown on hover when currently playing this project */}
                {currentlyPlaying?.id === project.id && isPlaying && (
                <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
                    <Pause className="w-3 h-3 text-black" fill="currentColor" />
                </button>
          )}
            </div>
      )}
        </div>
    );
};

export default ProjectCard;