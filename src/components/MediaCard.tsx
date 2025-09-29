import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';
import ProjectImage from './ProjectImage';
import PlaylistCoverArt from './PlaylistCoverArt';
import type { Project, Playlist } from '../types';
import { isProject, isPlaylist } from '../utils/typeGuards';


interface MediaCardProps {
    item: Project | Playlist;
    type?: 'project' | 'playlist';
    size?: 'small' | 'medium' | 'large';
    showArtist?: boolean;
    cardWidth?: number;
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    currentPlaylist: Playlist | null;
    onPlay: (_item: Project | Playlist, _playlist?: Playlist) => void;
    onClick?: (_item: Project | Playlist) => void;
    onNavigateToCompany?: (_companyName: string) => void;
}

const MediaCard = ({
    item,
    type = 'project',
    size = 'medium',
    showArtist = true,
    cardWidth,
    currentlyPlaying,
    isPlaying,
    currentPlaylist,
    onPlay,
    onClick,
    onNavigateToCompany
}: MediaCardProps) => {
    // Determine if this item is currently playing
    const isCurrentlyPlaying = type === 'project' && isProject(item)
        ? (currentlyPlaying?.id === item.id && isPlaying)
        : (type === 'playlist' && isPlaylist(item) && item.projects.some((project: Project) => currentlyPlaying?.id === project.id) && isPlaying && currentPlaylist?.name === item.name);

    // For playlist cards in horizontal scroll, we want a fixed width
    const cardStyle = cardWidth ? { width: cardWidth } : {};

    return (
        <div 
            className={`group relative bg-transparent rounded-lg p-1.5 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
        size === 'large' ? 'flex items-center space-x-4' : 'w-[140px] sm:w-[155px] md:w-[170px] lg:w-[188px]'
      }`}
            style={cardStyle}
            onClick={() => onClick && onClick(item)}
    >
            {/* Cover Art */}
            <div className={`relative ${size === 'large' ? 'mb-0' : 'mb-0.5'}`}>
                {type === 'playlist' && isPlaylist(item) ? (
                    <PlaylistCoverArt
                        playlist={item as Playlist}
                        size="custom"
                        className={`${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
                        shape="rounded"
          />
        ) : isProject(item) ? (
            <ProjectImage
                project={item as Project}
                size="custom"
                className={`${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
                shape="rounded"
                showFallback={size === 'large'} // Only show fallback background for large cards
          />
        ) : null}
        
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
                    className="text-spotify-primary font-semibold truncate mb-0 text-base cursor-pointer"
                    onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(item);
          }}
        >
                    {type === 'playlist' && isPlaylist(item) ? item.name : isProject(item) ? item.title : 'Unknown'}
                </h3>
        
                {showArtist && (
                <p className="text-spotify-secondary text-sm truncate">
                    {type === 'playlist' && isPlaylist(item) ? (
              // For playlists, show track count
              `${item.projects.length} track${item.projects.length !== 1 ? 's' : ''}`
            ) : isProject(item) ? (
              // For projects, show artist with clickable company names
              (item.artist && item.artist.includes(' - ')) ? (
                  <>
                      {item.artist.split(' - ')[0]} -
                      <span
                          className="hover:underline cursor-pointer hover:text-spotify-primary"
                          onClick={(e) => {
                      e.stopPropagation();
                      const company = item.artist.split(' - ')[1];
                      if (company && onNavigateToCompany) {
                        onNavigateToCompany(company);
                      }
                    }}
                  >
                          {item.artist.split(' - ')[1]}
                      </span>
                  </>
              ) : (
                item.artist
              )
            ) : 'Unknown'}
                </p>
        )}
        
                {/* Additional content for large cards */}
                {size === 'large' && type === 'playlist' && isPlaylist(item) && item.description && (
                <p className="text-spotify-secondary text-xs mt-0.5 truncate">
                    {item.description}
                </p>
        )}
        
                {size === 'large' && type === 'project' && (
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-3 text-spotify-secondary text-sm">
                        <span>{'year' in item ? item.year : ''}</span>
                        <span>•</span>
                        <span className="hidden sm:inline">{'duration' in item ? item.duration : ''}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-spotify-green">{'impact' in item ? item.impact : 0}</span>
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