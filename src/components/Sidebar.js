import React, { useState, useRef } from 'react';
import { Library, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { playlists, projects } from '../data/projects';
import PlaylistCoverArt from './PlaylistCoverArt';
import ProjectImage from './ProjectImage';

const Sidebar = ({ 
  currentView, 
  sidebarOpen, 
  onNavigateToView, 
  onNavigateToPlaylist, 
  onCloseSidebar,
  width = 256,
  mode = 'normal',
  style = {}
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  // Get all projects for filtering
  const allProjects = [...projects.recentWork, ...projects.topHits, ...projects.sideProjects];
  
  // Filter content based on active filter
  const getFilteredContent = () => {
    let content = [];
    
    if (activeFilter === 'All' || activeFilter === 'Collections') {
      content = content.concat(playlists.map(playlist => ({ ...playlist, type: 'collection' })));
    }
    
    if (activeFilter === 'All' || activeFilter === 'Projects') {
      content = content.concat(allProjects.map(project => ({ ...project, type: 'project' })));
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

  // In icon-only mode, hide text-based elements  
  const isIconMode = mode === 'icon-only';

  return (
  <div 
    data-sidebar
    className={`fixed md:relative inset-y-0 left-0 z-50 bg-spotify-dark ${isIconMode ? 'pl-1 pr-0 py-2 md:pl-2 md:pr-0 md:py-3' : 'pl-1 pr-0 py-2 md:pl-1.5 md:pr-0 md:py-3'} flex flex-col transform transition-all duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 md:rounded-t-lg md:h-full`}
    style={{
      ...style,
      minWidth: isIconMode ? '72px' : '200px',
      // No padding transition to prevent scrollbar animation
    }}
  >
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
      {/* Header - Hidden in icon mode */}
      {!isIconMode && (
        <div className="px-2 py-2 mb-3">
          <h2 className="font-bold text-spotify-primary text-lg">My Work</h2>
        </div>
      )}
      
      {/* Filter Buttons - Hidden in icon mode */}
      {!isIconMode && (
        <div className="px-2 mb-4">
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
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeFilter === filter
                        ? 'bg-white text-black'
                        : 'bg-[#2a2a2a] text-spotify-primary hover:bg-[#333333]'
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
      )}
    </div>

    {/* Filtered Content List */}
    <div className="flex-1 overflow-y-auto spotify-scrollbar">
      <div className={isIconMode ? 'space-y-1' : 'space-y-1'}>
        {filteredContent.length > 0 ? (
          filteredContent.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              className={`flex items-center w-full text-left rounded-md hover:bg-spotify-hover transition-colors group ${
                isIconMode ? 'justify-center py-3 px-1' : 'space-x-3 py-2 px-2'
              }`}
              onClick={() => handleItemClick(item)}
              title={isIconMode ? (item.name || item.title) : undefined}
            >
              {item.type === 'collection' ? (
                <PlaylistCoverArt
                  playlist={item}
                  size="custom"
                  className={isIconMode ? 'w-12 h-12' : 'w-12 h-12'}
                  shape="rounded"
                />
              ) : (
                <ProjectImage
                  project={item}
                  size="custom"
                  className={isIconMode ? 'w-12 h-12' : 'w-12 h-12'}
                  shape="rounded"
                  showFallback={true}
                />
              )}
              {!isIconMode && (
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-spotify-primary truncate group-hover:text-spotify-primary">
                    {item.name || item.title}
                  </div>
                  {item.type === 'project' && (
                    <div className="text-sm text-spotify-secondary truncate">
                      {item.artist}
                    </div>
                  )}
                  {item.type === 'collection' && (
                    <div className="text-sm text-spotify-secondary">
                      Collection • {item.projects.length} track{item.projects.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))
        ) : (
          !isIconMode && (
            <div className="px-2 py-4 text-center">
              <div className="text-spotify-secondary text-base">
                No items to display
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
  );
};

export default Sidebar;