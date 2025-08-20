import React from 'react';
import { User } from 'lucide-react';
import ProjectCard from '../ProjectCard';
import HorizontalCardSection from '../HorizontalCardSection';
import { projects, playlists } from '../../data/projects';

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const HomeView = ({ 
  currentlyPlaying, 
  isPlaying, 
  currentPlaylist,
  onPlayProject, 
  onNavigateToProject, 
  onNavigateToPlaylist, 
  onNavigateToProfile,
  onNavigateToCompany,
  onNavigateToDomain
}) => (
  <div className="text-spotify-primary p-6">
    <h1 className="text-3xl font-bold mb-5">{getTimeBasedGreeting()}</h1>

    {/* Recently Played Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-7">
      {projects.recentWork.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          size="large" 
          showArtist={false} 
          currentlyPlaying={currentlyPlaying}
          isPlaying={isPlaying}
          onPlayProject={onPlayProject}
          onProjectClick={onNavigateToProject}
          onNavigateToCompany={onNavigateToCompany}
          onNavigateToDomain={onNavigateToDomain}
        />
      ))}
      <ProjectCard 
        key="did-kansas-win" 
        project={projects.sideProjects.find(p => p.id === 'did-kansas-win')} 
        size="large" 
        showArtist={false} 
        currentlyPlaying={currentlyPlaying}
        isPlaying={isPlaying}
        onPlayProject={onPlayProject}
        onProjectClick={onNavigateToProject}
        onNavigateToCompany={onNavigateToCompany}
        onNavigateToDomain={onNavigateToDomain}
      />
    </div>

    {/* Made for You Section */}
    <section className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Made for you</h2>
        <button 
          className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
          onClick={() => onNavigateToPlaylist({ 
            name: 'Made for You', 
            projects: playlists.slice(0, 10).map(p => p.projects[0]).filter(Boolean), 
            description: 'Curated collections and playlists just for you' 
          })}
        >
          Show all
        </button>
      </div>
      <HorizontalCardSection
        items={playlists.slice(0, 5)}
        type="playlist"
        currentlyPlaying={currentlyPlaying}
        isPlaying={isPlaying}
        currentPlaylist={currentPlaylist}
        onPlay={(playlist) => {
          // Play the first track in the playlist
          if (playlist.projects && playlist.projects.length > 0) {
            onPlayProject(playlist.projects[0], playlist);
          }
        }}
        onClick={onNavigateToPlaylist}
      />
    </section>

    {/* Top Hits Section */}
    <section className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Top hits</h2>
        <button 
          className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
          onClick={() => onNavigateToPlaylist(playlists.find(p => p.name === 'Top Hits'))}
        >
          Show all
        </button>
      </div>
      <HorizontalCardSection
        items={projects.topHits}
        type="project"
        currentlyPlaying={currentlyPlaying}
        isPlaying={isPlaying}
        onPlay={onPlayProject}
        onClick={onNavigateToProject}
      />
    </section>

    {/* Side Projects Section */}
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Side projects</h2>
        <button 
          className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
          onClick={() => onNavigateToPlaylist(playlists.find(p => p.name === 'Side Projects'))}
        >
          Show all
        </button>
      </div>
      <HorizontalCardSection
        items={projects.sideProjects}
        type="project"
        currentlyPlaying={currentlyPlaying}
        isPlaying={isPlaying}
        onPlay={onPlayProject}
        onClick={onNavigateToProject}
      />
    </section>
  </div>
);

export default HomeView;