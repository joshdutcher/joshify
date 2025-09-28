import { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import EqualizerIcon from '../EqualizerIcon';
import ProjectImage from '../ProjectImage';
import PlaylistCoverArt from '../PlaylistCoverArt';
import { projects, playlists } from '../../data/projects';
import { isProject, isPlaylist } from '../../utils/typeGuards';
import type { Project, Playlist } from '../../types';

interface SearchViewProps {
    searchQuery: string;
    currentlyPlaying: Project | null;
    isPlaying: boolean;
    onPlayProject: (project: Project, playlist?: Playlist | null) => void;
    onNavigateToProject: (project: Project) => void;
}

const SearchView = ({
    searchQuery,
    currentlyPlaying,
    isPlaying,
    onPlayProject,
    onNavigateToProject
}: SearchViewProps) => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Get all projects for searching
    const allProjects = projects;
  
    // Filter content based on search query and active filter
    const getSearchResults = () => {
        let results = [];
    
        if (activeFilter === 'All' || activeFilter === 'Collections') {
            const matchingCollections = playlists.filter(playlist =>
                playlist.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            results.push(...matchingCollections.map(item => ({ ...item, type: 'collection' })));
        }
    
        if (activeFilter === 'All' || activeFilter === 'Projects') {
            const matchingProjects = allProjects.filter(project =>
                project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.album?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            results.push(...matchingProjects.map(item => ({ ...item, type: 'project' })));
        }
    
        return results;
    };

    const searchResults = getSearchResults();
    const topResult = searchResults[0];
    const otherResults = searchResults.slice(1);



    const renderPlayButton = (item: Project | Playlist) => {
        const isCurrentlyPlaying = isProject(item) && currentlyPlaying?.id === item.id;

        return (
            <button
                className="w-12 h-12 rounded-full bg-spotify-green hover:bg-spotify-green-light transition-colors flex items-center justify-center group"
                onClick={() => {
          if (isProject(item)) {
            onPlayProject(item);
          }
        }}
      >
                {isCurrentlyPlaying && isPlaying ? (
                    <EqualizerIcon className="w-5 h-5 text-black" />
        ) : (
            <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
        )}
            </button>
        );
    };

    const renderImage = (item: Project | Playlist) => {
        if (isPlaylist(item)) {
            return (
                <PlaylistCoverArt
                    playlist={item}
                    size="custom"
                    className="w-16 h-16"
                    shape="rounded"
        />
            );
        }
        if (isProject(item)) {
            return (
                <ProjectImage
                    project={item}
                    size="large"
                    shape="rounded"
          />
            );
        }
        return null;
    };

    if (!searchQuery?.trim()) {
        return (
            <div className="p-6 text-center">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-spotify-primary mb-2">
                        Search Joshify
                    </h1>
                    <p className="text-spotify-secondary">
                        Find your favorite projects and collections
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Search Results Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-spotify-primary mb-4">
                    Search results for "{searchQuery}"
                </h1>
        
                {/* Filter Buttons */}
                <div className="flex space-x-2">
                    {['All', 'Collections', 'Projects'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-black'
                  : 'bg-spotify-hover text-spotify-secondary hover:bg-spotify-lightgray hover:text-spotify-primary'
              }`}
            >
                            {filter}
                        </button>
          ))}
                </div>
            </div>

            {searchResults.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-spotify-secondary">
                        <p className="text-lg mb-2">No results found for "{searchQuery}"</p>
                        <p className="text-sm">Please make sure your words are spelled correctly, or use different keywords.</p>
                    </div>
                </div>
      ) : (
          <div className="space-y-8">
              {/* Top Result */}
              {topResult && (
              <div>
                  <h2 className="text-xl font-bold text-spotify-primary mb-4">Top result</h2>
                  <div className="bg-spotify-hover p-4 rounded-lg max-w-md hover:bg-spotify-lightgray transition-colors group cursor-pointer">
                      <div className="flex items-start space-x-4">
                          {renderImage(topResult)}
                          <div className="flex-1 min-w-0">
                              <h3 
                                  className="text-2xl font-bold text-spotify-primary mb-1 truncate hover:underline cursor-pointer"
                                  onClick={() => {
                                      if (isProject(topResult)) {
                                          onNavigateToProject(topResult);
                                      }
                                  }}
                    >
                                  {isProject(topResult) ? topResult.title : topResult.name}
                              </h3>
                              <p className="text-spotify-secondary text-sm mb-3">
                                  {isPlaylist(topResult)
                        ? `${topResult.employer ? 'Workplace' : 'Collection'} • ${topResult.projects?.length || 0} tracks`
                        : isProject(topResult)
                        ? `${topResult.type} • ${topResult.artist || topResult.album}`
                        : ''
                      }
                              </p>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  {renderPlayButton(topResult)}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

              {/* Other Results */}
              {otherResults.length > 0 && (
              <div>
                  <h2 className="text-xl font-bold text-spotify-primary mb-4">
                      {activeFilter === 'All' ? 'More results' : activeFilter}
                  </h2>
                  <div className="space-y-2">
                      {otherResults.map((item, index) => (
                          <div
                              key={`${item.type}-${isProject(item) ? item.id : item.name}-${index}`}
                              className="flex items-center space-x-4 p-2 rounded-md hover:bg-spotify-hover group transition-colors"
                  >
                              <div className="flex items-center space-x-4 flex-1 min-w-0">
                                  {renderImage(item)}
                      
                                  <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2">
                                          <h3
                                              className="text-spotify-primary font-medium truncate hover:underline cursor-pointer"
                                              onClick={() => {
                                                  if (isProject(item)) {
                                                      onNavigateToProject(item);
                                                  }
                                              }}
                          >
                                              {isProject(item) ? item.title : item.name}
                                          </h3>
                                      </div>
                                      <p className="text-spotify-secondary text-sm truncate">
                                          {isPlaylist(item)
                            ? `${item.employer ? 'Workplace' : 'Collection'} • ${item.projects?.length || 0} tracks`
                            : isProject(item)
                            ? `${item.artist || item.album}`
                            : ''
                          }
                                      </p>
                                  </div>

                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                      {renderPlayButton(item)}
                                  </div>

                                  <div className="text-spotify-secondary text-sm">
                                      <Clock className="w-4 h-4" />
                                  </div>
                      
                                  {isProject(item) && item.duration && (
                                  <div className="text-spotify-secondary text-sm w-12 text-right">
                                      {item.duration}
                                  </div>
                      )}
                              </div>
                          </div>
                ))}
                  </div>
              </div>
          )}
          </div>
      )}
        </div>
    );
};

export default SearchView;