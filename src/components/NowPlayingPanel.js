import React from 'react';
import { ExternalLink, Github, Calendar, Code, Users } from 'lucide-react';
import ProjectCanvas from './ProjectCanvas';

const NowPlayingPanel = ({ 
  currentlyPlaying, 
  isPlaying = false,
  className = "",
  width = 320,
  style = {}
}) => {
  if (!currentlyPlaying) {
    return null; // Hide panel when no project is playing
  }

  return (
    <div 
      data-right-panel
      className={`hidden lg:block bg-spotify-card rounded-t-lg ${className}`}
      style={{
        ...style,
        minWidth: '280px',
        maxWidth: '400px'
      }}
    >
      {/* Canvas Background */}
      <div className="relative">
        <ProjectCanvas 
          project={currentlyPlaying}
          isPlaying={isPlaying}
          className="rounded-t-lg"
        />
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Project title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
            {currentlyPlaying.title}
          </h2>
          <p className="text-white/90 text-sm drop-shadow-md">
            {currentlyPlaying.artist}
          </p>
        </div>
      </div>
      
      {/* Project Details */}
      <div className="p-6 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-spotify-secondary">
            <Calendar className="w-4 h-4" />
            <span>{currentlyPlaying.year}</span>
          </div>
          <div className="flex items-center space-x-2 text-spotify-secondary">
            <Users className="w-4 h-4" />
            <span>{currentlyPlaying.duration}</span>
          </div>
        </div>
        
        {/* Description */}
        <div>
          <h3 className="text-spotify-primary font-semibold mb-2">About this project</h3>
          <p className="text-spotify-secondary text-sm leading-relaxed">
            {currentlyPlaying.description}
          </p>
        </div>
        
        {/* Skills/Tech Stack */}
        {currentlyPlaying.skills && (
          <div>
            <h3 className="text-spotify-primary font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {currentlyPlaying.skills.slice(0, 6).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-spotify-hover text-spotify-secondary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {currentlyPlaying.skills.length > 6 && (
                <span className="px-2 py-1 bg-spotify-hover text-spotify-secondary text-xs rounded-full">
                  +{currentlyPlaying.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {currentlyPlaying.demoUrl && (
            <a
              href={currentlyPlaying.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-3 bg-spotify-green text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live Demo</span>
            </a>
          )}
          
          {currentlyPlaying.githubUrl && (
            <a
              href={currentlyPlaying.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-3 border border-spotify-hover text-spotify-primary font-semibold rounded-full hover:bg-spotify-hover transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
        
        {/* Plays counter */}
        <div className="pt-4 border-t border-spotify-hover">
          <div className="flex items-center justify-between text-sm">
            <span className="text-spotify-secondary">Project views</span>
            <span className="text-spotify-green font-semibold">{currentlyPlaying.plays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingPanel;