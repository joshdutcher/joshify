import React from 'react';
import { Menu, Home } from 'lucide-react';
import SpotifyLogo from './SpotifyLogo';
import SearchBar from './SearchBar';

const TopBar = ({ 
    currentView, 
    onNavigateToView, 
    onNavigateToProfile, 
    onToggleSidebar,
    onSearch,
    onNavigateToSearch 
}) => {
    const handleLogoClick = () => {
        onNavigateToView('home');
    };

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-black">
            <div className="flex items-center space-x-4">
                <button
                    className="md:hidden text-spotify-secondary hover:text-spotify-primary"
                    onClick={onToggleSidebar}
        >
                    <Menu className="w-6 h-6" />
                </button>
                <SpotifyLogo onClick={handleLogoClick} />
            </div>

            {/* Center Search Bar with Home Button - Desktop Only */}
            <div className="hidden md:flex flex-1 justify-center px-8">
                <div className="flex items-center space-x-3 w-full max-w-md">
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-spotify-dark hover:bg-spotify-hover transition-colors text-spotify-secondary hover:text-spotify-primary"
                        title="Home"
          >
                        <Home className="w-5 h-5" />
                    </button>
                    <SearchBar 
                        onSearch={onSearch}
                        onNavigateToSearch={onNavigateToSearch}
                        className="flex-1"
          />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    className="bg-spotify-dark rounded-full px-3 py-2 font-semibold hover:bg-spotify-hover transition-colors text-base text-spotify-primary flex items-center space-x-3"
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
};

export default TopBar;