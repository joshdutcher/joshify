
import { Play, Pause } from 'lucide-react';
import EqualizerIcon from './EqualizerIcon';
import PlaylistCoverArt from './PlaylistCoverArt';
import type { Playlist, Project } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  size?: string;
  showArtist?: boolean;
  currentlyPlaying: Project | null;
  isPlaying: boolean;
  currentPlaylist: Playlist | null;
  onPlayPlaylist: (playlist: Playlist) => void;
  onPlaylistClick: (playlist: Playlist) => void;
}

const PlaylistCard = ({
    playlist,
    size = 'medium',
    showArtist = true,
    currentlyPlaying,
    isPlaying,
    currentPlaylist,
    onPlayPlaylist,
    onPlaylistClick
}: PlaylistCardProps) => {
    // Check if any track in the playlist is currently playing AND it's playing from this specific playlist
    const isCurrentlyPlayingFromPlaylist = playlist.projects && 
    playlist.projects.some((project: Project) => currentlyPlaying?.id === project.id) && 
    isPlaying && 
    currentPlaylist?.name === playlist.name;

    // For small/medium cards, we want a fixed width container based on cover art + padding
    // Progressive responsive width handled by className, no inline style needed for small/medium cards
    const cardStyle = size === 'large' ? {} : {};

    return (
        <div 
            className={`group relative bg-transparent rounded-lg p-1.5 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
        size === 'large' ? 'flex items-center space-x-4' : 'w-[140px] sm:w-[155px] md:w-[170px] lg:w-[188px]'
      }`}
            style={cardStyle}
            onClick={() => onPlaylistClick && onPlaylistClick(playlist)}
    >
            {/* Playlist cover art (no play button overlay for large size) */}
            <div className={`relative ${size === 'large' ? 'mb-0' : 'mb-0.5'}`}>
                <PlaylistCoverArt
                    playlist={playlist}
                    size="custom"
                    className={`${size === 'large' ? 'w-12 h-12 md:w-16 md:h-16' : 'w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px]'} shadow-lg`}
                    shape="rounded"
        />
        
                {/* Play button for small/medium cards only - positioned within cover art area */}
                {size !== 'large' && (
                <button
                    className={`absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 ${
              isCurrentlyPlayingFromPlaylist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
            }`}
                    onClick={(e) => {
              e.stopPropagation();
              onPlayPlaylist && onPlayPlaylist(playlist);
            }}
          >
                    {isCurrentlyPlayingFromPlaylist ?
                        <Pause className="w-5 h-5 text-black" fill="currentColor" /> :
                        <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
            }
                </button>
        )}
            </div>

            {/* Text content - constrained to card width */}
            <div className={size === 'large' ? 'flex-1 min-w-0' : 'w-full'}>
                <h3
                    className="text-spotify-primary font-semibold truncate mb-0 text-base cursor-pointer"
                    onClick={(e) => {
            e.stopPropagation();
            onPlaylistClick && onPlaylistClick(playlist);
          }}
        >
                    {playlist.name}
                </h3>
                {showArtist && (
                <p className="text-spotify-secondary text-sm truncate">
                    {playlist.projects ? `${playlist.projects.length} track${playlist.projects.length !== 1 ? 's' : ''}` : 'Collection'}
                </p>
        )}
                {size === 'large' && playlist.description && (
                <p className="text-spotify-secondary text-xs mt-0.5 truncate">
                    {playlist.description}
                </p>
        )}
            </div>

            {/* Play/Pause/Equalizer controls for large (horizontal) cards - positioned on the right */}
            {size === 'large' && (
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                {/* Equalizer - shown when playing and mouse is not hovering */}
                {isCurrentlyPlayingFromPlaylist && (
                <div className="group-hover:opacity-0 transition-opacity duration-200">
                    <EqualizerIcon />
                </div>
          )}
          
                {/* Play button - shown on hover when not currently playing from this playlist */}
                {!isCurrentlyPlayingFromPlaylist && (
                <button
                    className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                e.stopPropagation();
                onPlayPlaylist && onPlayPlaylist(playlist);
              }}
            >
                    <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                </button>
          )}
          
                {/* Pause button - shown on hover when currently playing from this playlist */}
                {isCurrentlyPlayingFromPlaylist && (
                <button
                    className="absolute inset-0 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ease-out hover:scale-105 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                e.stopPropagation();
                onPlayPlaylist && onPlayPlaylist(playlist);
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

export default PlaylistCard;