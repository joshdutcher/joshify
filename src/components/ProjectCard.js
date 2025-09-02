import React from 'react';
import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';
import ProjectImage from './ProjectImage';


const ProjectCard = ({ 
  project, 
  size = 'medium', 
  showArtist = true, 
  currentlyPlaying, 
  isPlaying, 
  onPlayProject, 
  onProjectClick,
  onNavigateToCompany,
  onNavigateToDomain
}) => {
  const isCurrentlyPlaying = currentlyPlaying?.id === project.id && isPlaying;

  return (
    <div className={`group relative cursor-pointer ${
      size === 'large' 
        ? 'flex items-center bg-white/10 rounded overflow-hidden transition-all duration-300' 
        : 'bg-spotify-card rounded p-2 hover:bg-spotify-hover transition-all duration-300 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]'
    }`}
    onClick={() => onProjectClick && onProjectClick(project)}>
      {/* Album art (no play button overlay for large size) */}
      <div className={`relative ${size === 'large' ? 'mb-0' : 'mb-1'}`}>
        <ProjectImage
          project={project}
          size={size === 'large' ? 'custom' : 'custom'}
          className={`${size === 'large' ? 'w-16 h-16' : 'w-[128px] h-[128px] sm:w-[148px] sm:h-[148px] md:w-[168px] md:h-[168px] lg:w-[188px] lg:h-[188px]'} shadow-lg`}
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
      <div className={size === 'large' ? 'flex-1 min-w-0 px-4 flex flex-col justify-center h-16' : ''}>
        <h3 
          className="text-spotify-primary font-semibold truncate mb-0.5 text-base hover:underline cursor-pointer"
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
                    const company = project.artist.split(' - ')[1];
                    onNavigateToCompany && onNavigateToCompany(company);
                  }}
                >
                  {project.artist.split(' - ')[1]}
                </span>
              </>
            ) : (
              project.artist
            )}
          </p>
        )}
        {size === 'large' && (
          <div className="flex items-center space-x-2 mt-0.5 text-spotify-secondary text-sm">
            <span>{project.year}</span>
            <span>•</span>
            <span className="whitespace-nowrap">{project.duration}</span>
            <span>•</span>
            <span className="text-spotify-green whitespace-nowrap">{project.plays} plays</span>
          </div>
        )}
      </div>

      {/* Play/Pause/Equalizer controls for large (horizontal) cards - positioned on the right */}
      {size === 'large' && (
        <div className="relative w-12 h-16 flex items-center justify-center flex-shrink-0 mr-3">
          {/* Equalizer - shown when playing and mouse is not hovering */}
          {currentlyPlaying?.id === project.id && isPlaying && (
            <div className="group-hover:opacity-0 transition-opacity duration-200">
              <EqualizerIcon />
            </div>
          )}
          
          {/* Play button - shown on hover when not currently playing this project */}
          {(!currentlyPlaying || currentlyPlaying?.id !== project.id || !isPlaying) && (
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
              <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
            </button>
          )}
          
          {/* Pause button - shown on hover when currently playing this project */}
          {currentlyPlaying?.id === project.id && isPlaying && (
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
              <Pause className="w-5 h-5 text-black" fill="currentColor" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;