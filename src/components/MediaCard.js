import React from 'react';
import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';
import ProjectImage from './ProjectImage';
import PlaylistCoverArt from './PlaylistCoverArt';


const MediaCard = ({ 
  // Content props
  item, // Can be a project or playlist
  type = 'project', // 'project' or 'playlist'
  
  // Display props
  size = 'medium', // 'small', 'medium', 'large' 
  showArtist = true,
  cardWidth, // Optional fixed width for horizontal scrolling cards
  
  // State props
  currentlyPlaying, 
  isPlaying, 
  currentPlaylist, // Added to track playlist context
  
  // Handlers
  onPlay, // onPlayProject or onPlayPlaylist
  onClick, // onProjectClick or onPlaylistClick
  onNavigateToCompany,
  onNavigateToDomain
}) => {
  // Determine if this item is currently playing
  const isCurrentlyPlaying = type === 'project' 
    ? (currentlyPlaying?.id === item.id && isPlaying)
    : (item.projects && item.projects.some(project => currentlyPlaying?.id === project.id) && isPlaying && currentPlaylist?.name === item.name);

  // For playlist cards in horizontal scroll, we want a fixed width
  const cardStyle = cardWidth ? { width: cardWidth } : {};

  return (
    <div 
      className={`group relative bg-transparent rounded-lg p-2 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
        size === 'large' ? 'flex items-center space-x-4' : 'w-[140px] sm:w-[155px] md:w-[170px] lg:w-[188px]'
      }`}
      style={cardStyle}
      onClick={() => onClick && onClick(item)}
    >
      {/* Cover Art */}
      <div className={`relative ${size === 'large' ? 'mb-0' : 'mb-1'}`}>
        {type === 'playlist' ? (
          <PlaylistCoverArt
            playlist={item}
            size="custom"
            className={`${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
            shape="rounded"
          />
        ) : (
          <ProjectImage
            project={item}
            size="custom"
            className={`${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
            shape="rounded"
            showFallback={size === 'large'} // Only show fallback background for large cards
          />
        )}
        
        {/* Play button for small/medium cards only - positioned within cover art area */}
        {size !== 'large' && (
          <button
            className={`absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 ${
              isCurrentlyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay && onPlay(item);
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
      <div className={`${size === 'large' ? 'flex-1 min-w-0' : 'w-full'}`}>
        <h3 
          className="text-spotify-primary font-semibold truncate mb-0.5 text-base hover:underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(item);
          }}
        >
          {type === 'playlist' ? item.name : item.title}
        </h3>
        
        {showArtist && (
          <p className="text-spotify-secondary text-sm truncate">
            {type === 'playlist' ? (
              // For playlists, show track count
              item.projects ? `${item.projects.length} track${item.projects.length !== 1 ? 's' : ''}` : 'Collection'
            ) : (
              // For projects, show artist with clickable company names
              item.artist && item.artist.includes(' - ') ? (
                <>
                  {item.artist.split(' - ')[0]} - 
                  <span 
                    className="hover:underline cursor-pointer hover:text-spotify-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      const company = item.artist.split(' - ')[1];
                      onNavigateToCompany && onNavigateToCompany(company);
                    }}
                  >
                    {item.artist.split(' - ')[1]}
                  </span>
                </>
              ) : (
                item.artist
              )
            )}
          </p>
        )}
        
        {/* Additional content for large cards */}
        {size === 'large' && type === 'playlist' && item.description && (
          <p className="text-spotify-secondary text-xs mt-0.5 truncate">
            {item.description}
          </p>
        )}
        
        {size === 'large' && type === 'project' && (
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center space-x-3 text-spotify-secondary text-sm">
              <span>{item.year}</span>
              <span>•</span>
              <span className="hidden sm:inline">{item.duration}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-spotify-green">{item.plays} plays</span>
            </div>
          </div>
        )}
      </div>

      {/* Play/Pause/Equalizer controls for large (horizontal) cards - positioned on the right */}
      {size === 'large' && (
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
          {/* Equalizer - shown when playing and mouse is not hovering */}
          {isCurrentlyPlaying && (
            <div className="group-hover:opacity-0 transition-opacity duration-200">
              <EqualizerIcon />
            </div>
          )}
          
          {/* Play button - shown on hover when not currently playing */}
          {!isCurrentlyPlaying && (
            <button
              className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlay && onPlay(item);
              }}
            >
              <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
            </button>
          )}
          
          {/* Pause button - shown on hover when currently playing */}
          {isCurrentlyPlaying && (
            <button
              className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onPlay && onPlay(item);
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

export default MediaCard;