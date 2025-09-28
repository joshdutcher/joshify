import { Play, Pause } from 'lucide-react';
import ProjectImage from './ProjectImage';
import PlaylistCoverArt from './PlaylistCoverArt';
import type { Project, Playlist } from '../types';
import { isProject, isPlaylist } from '../utils/typeGuards';

interface HorizontalCardProps {
    item: Project | Playlist;
    type: 'project' | 'playlist';
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    currentPlaylist: Playlist | null;
    onPlay: (item: Project | Playlist, playlist?: Playlist) => void;
    onClick?: (item: Project | Playlist) => void;
}

const HorizontalCard = ({
    item,
    type,
    currentlyPlaying,
    isPlaying,
    currentPlaylist,
    onPlay,
    onClick
}: HorizontalCardProps) => {
    // Check if this item is currently playing
    const isCurrentlyPlaying = type === 'playlist' && isPlaylist(item)
        ? (item.projects.some((project: Project) => currentlyPlaying?.id === project.id) && isPlaying && currentPlaylist?.name === item.name)
        : (isProject(item) && currentlyPlaying?.id === item.id && isPlaying);

    return (
        <div
            className="group relative bg-transparent rounded p-1.5 hover:bg-white/5 transition-all duration-200 cursor-pointer w-[140px] sm:w-[155px] md:w-[170px] lg:w-[188px]"
            onClick={() => onClick && onClick(item)}
    >
            {/* Cover Art */}
            <div className="relative mb-0.5">
                {type === 'playlist' && isPlaylist(item) ? (
                    <PlaylistCoverArt
                        playlist={item as Playlist}
                        size="custom"
                        className="w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px] shadow-lg"
                        shape="rounded"
          />
        ) : isProject(item) ? (
            <ProjectImage
                project={item as Project}
                size="custom"
                className="w-[108px] h-[108px] sm:w-[123px] sm:h-[123px] md:w-[138px] md:h-[138px] lg:w-[156px] lg:h-[156px] shadow-lg"
                shape="rounded"
                showFallback={true}
          />
        ) : null}
        
                {/* Play button positioned within cover art area */}
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
            </div>

            {/* Text content - constrained to card width */}
            <div className="w-full">
                <h3
                    className="text-spotify-primary font-semibold truncate mb-0 text-base cursor-pointer no-underline hover:no-underline"
                    onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(item);
          }}
        >
                    {type === 'playlist' && isPlaylist(item) ? item.name : isProject(item) ? item.title : 'Unknown'}
                </h3>
                <p className="text-spotify-secondary text-sm truncate">
                    {type === 'playlist' && isPlaylist(item) ? (
            `${item.projects.length} track${item.projects.length !== 1 ? 's' : ''}`
          ) : isProject(item) ? (
            item.artist
          ) : 'Unknown'}
                </p>
            </div>
        </div>
    );
};

interface HorizontalCardSectionProps {
    items?: (Project | Playlist)[];
    type?: 'project' | 'playlist';
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    currentPlaylist: Playlist | null;
    onPlay: (item: Project | Playlist, playlist?: Playlist) => void;
    onClick: (item: Project | Playlist) => void;
}

const HorizontalCardSection = ({
    items = [],
    type = 'playlist',
    currentlyPlaying,
    isPlaying,
    currentPlaylist,
    onPlay,
    onClick
}: HorizontalCardSectionProps) => {
    if (!items || items.length === 0) {
        return <div className="text-spotify-secondary">No items to display</div>;
    }

    return (
        <div className="flex overflow-x-auto -ml-4">
            {items.map((item, index) => {
        if (!item) return null;
        
        return (
            <HorizontalCard
                key={type === 'playlist' ? `playlist-${index}` : `project-${isProject(item) ? item.id : index}`}
                item={item}
                type={type}
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentPlaylist={currentPlaylist}
                onPlay={onPlay}
                onClick={onClick}
          />
        );
      })}
        </div>
    );
};

export default HorizontalCardSection;