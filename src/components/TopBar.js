import React from 'react';
import { Menu } from 'lucide-react';
import SpotifyLogo from './SpotifyLogo';

const TopBar = ({ 
  currentView, 
  onNavigateToView, 
  onNavigateToProfile, 
  onToggleSidebar 
}) => (
  <div className="flex items-center justify-between p-4 bg-spotify-dark">
    <div className="flex items-center space-x-4">
      <button
        className="md:hidden text-spotify-secondary hover:text-spotify-primary"
        onClick={onToggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>
      <SpotifyLogo />
    </div>
    <div className="flex items-center space-x-4">
      <button
        className="bg-spotify-black bg-opacity-70 rounded-full px-3 py-2 font-semibold hover:bg-opacity-80 transition-colors text-base text-spotify-primary flex items-center space-x-3"
        onClick={onNavigateToProfile}
      >
        <span>Josh Dutcher</span>
        <img 
          src="/images/josh.jpg" 
          alt="Josh Dutcher"
          className="w-7 h-7 rounded-full object-cover border-2 border-spotify-primary"
        />
      </button>
    </div>
  </div>
);

export default TopBar;