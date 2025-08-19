import React from 'react';
import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';

const GitHubIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

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
    <div className={`group relative bg-spotify-card rounded-lg p-4 hover:bg-spotify-hover transition-all duration-300 cursor-pointer ${
      size === 'large' ? 'flex items-center space-x-4' : ''
    }`}
    onClick={() => onProjectClick && onProjectClick(project)}>
      {/* Album art (no play button overlay for large size) */}
      <div className={`relative ${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16 flex-shrink-0' : 'w-full aspect-square'} ${size === 'large' ? 'mb-0' : 'mb-3'}`}>
        {/* Album art */}
        {project.isAlbum && project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover rounded-md shadow-lg"
            onError={(e) => {
              // Fallback to generated thumbnail if album art fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full bg-gradient-to-br from-spotify-green to-green-700 rounded-md flex items-center justify-center shadow-lg ${
            project.isAlbum && project.image ? 'hidden' : ''
          }`}
        >
          <span className="text-white font-bold text-lg">
            {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </span>
        </div>
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
              <Pause className="w-5 h-5 text-black" /> :
              <Play className="w-5 h-5 text-black ml-0.5" />
            }
          </button>
        )}
      </div>

      {/* Text content */}
      <div className={size === 'large' ? 'flex-1 min-w-0' : ''}>
        <h3 
          className="text-spotify-primary font-semibold truncate mb-1 text-base hover:underline cursor-pointer"
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
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3 text-spotify-secondary text-sm">
              <span>{project.year}</span>
              <span>•</span>
              <span className="hidden sm:inline">{project.duration}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-spotify-green">{project.plays} plays</span>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spotify-secondary hover:text-spotify-green transition-colors"
                title="View Source Code"
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Play/Pause/Equalizer controls for large (horizontal) cards - positioned on the right */}
      {size === 'large' && (
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
          {/* Equalizer - shown when playing and mouse is not hovering */}
          {currentlyPlaying?.id === project.id && isPlaying && (
            <div className="group-hover:opacity-0 transition-opacity duration-200">
              <EqualizerIcon />
            </div>
          )}
          
          {/* Play button - shown on hover when not currently playing this project */}
          {(!currentlyPlaying || currentlyPlaying?.id !== project.id || !isPlaying) && (
            <button
              className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
              <Play className="w-5 h-5 text-black ml-0.5" />
            </button>
          )}
          
          {/* Pause button - shown on hover when currently playing this project */}
          {currentlyPlaying?.id === project.id && isPlaying && (
            <button
              className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlayProject && onPlayProject(project);
              }}
            >
              <Pause className="w-5 h-5 text-black" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;