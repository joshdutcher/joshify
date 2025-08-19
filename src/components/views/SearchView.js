import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import EqualizerIcon from '../EqualizerIcon';
import { projects, playlists } from '../../data/projects';

const SearchView = ({ 
  searchQuery, 
  currentlyPlaying, 
  isPlaying, 
  onPlayProject, 
  onNavigateToProject 
}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get all projects for searching
  const allProjects = [...projects.recentWork, ...projects.topHits, ...projects.sideProjects];
  
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getInitials = (title) => {
    return title
      ?.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase() || '';
  };

  const renderPlayButton = (item) => {
    const isCurrentlyPlaying = currentlyPlaying?.id === item.id;
    
    return (
      <button
        className="w-12 h-12 rounded-full bg-spotify-green hover:bg-spotify-green-light transition-colors flex items-center justify-center group"
        onClick={() => onPlayProject(item)}
      >
        {isCurrentlyPlaying && isPlaying ? (
          <EqualizerIcon className="w-5 h-5 text-black" />
        ) : (
          <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
        )}
      </button>
    );
  };

  const renderImage = (item) => (
    <div className="w-16 h-16 bg-spotify-lightgray rounded-md overflow-hidden flex-shrink-0">
      {item.image && !item.image.includes('/api/placeholder') ? (
        <img 
          src={item.image} 
          alt={item.title || item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div className={`w-full h-full rounded-md flex items-center justify-center ${
        item.image && !item.image.includes('/api/placeholder') ? 'hidden' : 'flex'
      } bg-spotify-green`}>
        <span className="font-bold text-white text-sm">
          {getInitials(item.title || item.name)}
        </span>
      </div>
    </div>
  );

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
                      onClick={() => onNavigateToProject(topResult)}
                    >
                      {topResult.title || topResult.name}
                    </h3>
                    <p className="text-spotify-secondary text-sm mb-3">
                      {topResult.type === 'collection' 
                        ? `Collection • ${topResult.projects?.length || 0} tracks`
                        : `${topResult.type} • ${topResult.artist || topResult.album}`
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
                    key={`${item.type}-${item.id}-${index}`}
                    className="flex items-center space-x-4 p-2 rounded-md hover:bg-spotify-hover group transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {renderImage(item)}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 
                            className="text-spotify-primary font-medium truncate hover:underline cursor-pointer"
                            onClick={() => onNavigateToProject(item)}
                          >
                            {item.title || item.name}
                          </h3>
                        </div>
                        <p className="text-spotify-secondary text-sm truncate">
                          {item.type === 'collection' 
                            ? `Collection • ${item.projects?.length || 0} tracks`
                            : `${item.artist || item.album}`
                          }
                        </p>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {renderPlayButton(item)}
                      </div>

                      <div className="text-spotify-secondary text-sm">
                        <Clock className="w-4 h-4" />
                      </div>
                      
                      {item.type === 'project' && item.duration && (
                        <div className="text-spotify-secondary text-sm w-12 text-right">
                          {formatDuration(item.duration)}
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