import React from 'react';
import { Home, Search, Library, Plus, X } from 'lucide-react';
import { playlists } from '../data/projects';

const Sidebar = ({ 
  currentView, 
  sidebarOpen, 
  onNavigateToView, 
  onNavigateToPlaylist, 
  onCloseSidebar 
}) => (
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

    <nav className="space-y-1 mb-6">
      <button
        className={`flex items-center space-x-3 text-spotify-secondary hover:text-spotify-primary w-full text-left py-3 px-3 rounded-md transition-colors ${currentView === 'home' ? 'text-spotify-primary bg-spotify-hover' : 'hover:bg-spotify-hover'}`}
        onClick={() => onNavigateToView('home')}
      >
        <Home className="w-6 h-6" />
        <span className="font-bold">Home</span>
      </button>
      <button
        className={`flex items-center space-x-3 text-spotify-secondary hover:text-spotify-primary w-full text-left py-3 px-3 rounded-md transition-colors ${currentView === 'search' ? 'text-spotify-primary bg-spotify-hover' : 'hover:bg-spotify-hover'}`}
        onClick={() => onNavigateToView('search')}
      >
        <Search className="w-6 h-6" />
        <span className="font-bold">Search</span>
      </button>
      <button
        className={`flex items-center space-x-3 text-spotify-secondary hover:text-spotify-primary w-full text-left py-3 px-3 rounded-md transition-colors ${currentView === 'library' ? 'text-spotify-primary bg-spotify-hover' : 'hover:bg-spotify-hover'}`}
        onClick={() => onNavigateToView('library')}
      >
        <Library className="w-6 h-6" />
        <span className="font-bold">My Work</span>
      </button>
    </nav>

    <div className="mb-6">
      <button className="flex items-center space-x-3 text-spotify-secondary hover:text-spotify-primary w-full text-left py-3 px-3 rounded-md transition-colors hover:bg-spotify-hover">
        <Plus className="w-6 h-6" />
        <span className="font-bold">Create Collection</span>
      </button>
    </div>

    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1">
        {playlists.map((playlist, index) => (
          <button
            key={index}
            className="block w-full text-left text-spotify-secondary hover:text-spotify-primary py-2 px-3 text-sm truncate rounded-md hover:bg-spotify-hover transition-colors"
            onClick={() => onNavigateToPlaylist(playlist)}
          >
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;