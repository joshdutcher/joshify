import React, { useState, useRef } from 'react';
import { Library, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { playlists, projects } from '../data/projects';

const Sidebar = ({ 
  currentView, 
  sidebarOpen, 
  onNavigateToView, 
  onNavigateToPlaylist, 
  onCloseSidebar 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  // Get all projects for filtering
  const allProjects = [...projects.recentWork, ...projects.topHits, ...projects.sideProjects];
  
  // Filter content based on search query and active filter
  const getFilteredContent = () => {
    let content = [];
    
    if (activeFilter === 'All' || activeFilter === 'Collections') {
      content = content.concat(playlists.map(playlist => ({ ...playlist, type: 'collection' })));
    }
    
    if (activeFilter === 'All' || activeFilter === 'Projects') {
      content = content.concat(allProjects.map(project => ({ ...project, type: 'project' })));
    }
    
    if (searchQuery.trim() && userHasTyped) {
      const query = searchQuery.toLowerCase();
      content = content.filter(item => 
        item.name?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.artist?.toLowerCase().includes(query) ||
        item.album?.toLowerCase().includes(query) ||
        item.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return content;
  };

  const filteredContent = getFilteredContent();

  const handleItemClick = (item) => {
    if (item.type === 'collection') {
      onNavigateToPlaylist(item);
    } else {
      // Navigate to project detail
      onNavigateToView('project', item);
    }
  };

  const getInitials = (title) => {
    if (!title) return '';
    return title
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= 100;
      setTimeout(checkScrollButtons, 100);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += 100;
      setTimeout(checkScrollButtons, 100);
    }
  };

  // Check scroll buttons when activeFilter changes
  React.useEffect(() => {
    setTimeout(checkScrollButtons, 100);
  }, [activeFilter]);

  return (
  <div className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-spotify-dark p-4 md:p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0`}>
    <div className="flex items-center justify-end mb-6 md:mb-8 md:hidden">
      <button
        className="text-spotify-secondary hover:text-spotify-primary"
        onClick={onCloseSidebar}
      >
        <X className="w-6 h-6" />
      </button>
    </div>


    {/* My Work Section */}
    <div className="mb-4">
      <div className="px-3 py-2 mb-4">
        <h2 className="font-bold text-spotify-primary text-base">My Work</h2>
      </div>
      
      {/* Search - Progressive States */}
      <div className="mb-4 px-3">
        {!searchExpanded ? (
          /* Search Icon State */
          <div className="relative">
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                searchHovered ? 'bg-spotify-hover' : 'bg-transparent'
              }`}
              onClick={() => setSearchExpanded(true)}
              onMouseEnter={() => setSearchHovered(true)}
              onMouseLeave={() => setSearchHovered(false)}
              title="Search My Work"
            >
              <Search className="w-4 h-4 text-spotify-secondary" />
            </button>
          </div>
        ) : (
          /* Expanded Search Bar State */
          <div className="relative bg-spotify-hover rounded-md transition-all duration-200">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-spotify-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!userHasTyped && e.target.value.length > 0) {
                  setUserHasTyped(true);
                }
              }}
              onFocus={(e) => {
                e.target.setSelectionRange(0, 0); // Set cursor to start
              }}
              onBlur={() => {
                if (!searchQuery.trim()) {
                  setSearchExpanded(false);
                  setUserHasTyped(false);
                }
              }}
              className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-spotify-primary focus:outline-none"
              autoFocus
            />
            {/* Placeholder text overlay */}
            {!userHasTyped && searchQuery === '' && (
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-sm text-spotify-secondary pointer-events-none">
                Search My Work
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Filter Buttons */}
      <div className="px-3 mb-4">
        <div className="flex items-center space-x-2">
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="w-6 h-6 rounded-full bg-spotify-hover hover:bg-spotify-lightgray flex items-center justify-center transition-colors flex-shrink-0"
              title="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-spotify-secondary hover:text-spotify-primary" />
            </button>
          )}
          
          {/* Clear Filter Button - only show when not 'All' */}
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="w-6 h-6 rounded-full bg-spotify-lightgray hover:bg-white flex items-center justify-center transition-colors flex-shrink-0 group"
              title="Clear filters"
              aria-label="Clear filters"
            >
              <svg 
                role="img" 
                aria-hidden="true" 
                viewBox="0 0 16 16" 
                className="w-3 h-3 fill-current text-spotify-secondary group-hover:text-spotify-secondary transition-colors"
              >
                <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06"></path>
              </svg>
            </button>
          )}
          
          {/* Scrollable Filter Buttons Container */}
          <div className="flex-1 overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-1.5 overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
              onScroll={checkScrollButtons}
            >
              {['All', 'Collections', 'Projects'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
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
          
          {/* Right Scroll Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="w-6 h-6 rounded-full bg-spotify-hover hover:bg-spotify-lightgray flex items-center justify-center transition-colors flex-shrink-0"
              title="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 text-spotify-secondary hover:text-spotify-primary" />
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Filtered Content List */}
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1">
        {filteredContent.length > 0 ? (
          filteredContent.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-md hover:bg-spotify-hover transition-colors group"
              onClick={() => handleItemClick(item)}
            >
              {item.type === 'collection' ? (
                <div className="w-8 h-8 bg-spotify-green rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {getInitials(item.name)}
                  </span>
                </div>
              ) : (
                <div className="w-8 h-8 bg-spotify-lightgray rounded flex-shrink-0 overflow-hidden relative">
                  {item.image && !item.image.includes('/api/placeholder') ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full rounded flex items-center justify-center absolute inset-0 ${
                    item.image && !item.image.includes('/api/placeholder') ? 'hidden' : 'flex'
                  } bg-spotify-green`}>
                    <span className="text-xs font-bold text-white">
                      {getInitials(item.title)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-spotify-primary truncate group-hover:text-spotify-primary">
                  {item.name || item.title}
                </div>
                {item.type === 'project' && (
                  <div className="text-xs text-spotify-secondary truncate">
                    {item.artist}
                  </div>
                )}
                {item.type === 'collection' && (
                  <div className="text-xs text-spotify-secondary">
                    Collection • {item.projects.length} track{item.projects.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="px-3 py-4 text-center">
            <div className="text-spotify-secondary text-sm">
              {searchQuery ? 'No results found' : 'No items to display'}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Sidebar;