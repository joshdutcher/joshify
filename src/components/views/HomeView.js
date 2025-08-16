import React from 'react';
import { User } from 'lucide-react';
import ProjectCard from '../ProjectCard';
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
  onPlayProject, 
  onNavigateToProject, 
  onNavigateToPlaylist, 
  onNavigateToProfile 
}) => (
  <div className="text-spotify-primary p-6">
    <h1 className="text-3xl font-bold mb-6">{getTimeBasedGreeting()}</h1>

    {/* Recently Played Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
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
      />
    </div>

    {/* Made for You Section */}
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Made for you</h2>
        <button className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold">Show all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {playlists.slice(0, 5).map((playlist, index) => (
          <div key={index} className="cursor-pointer" onClick={() => onNavigateToPlaylist(playlist)}>
            <ProjectCard
              project={{
                id: `playlist-${index}`,
                title: playlist.name,
                artist: `${playlist.projects.length} projects`,
                album: 'Playlist'
              }}
              showArtist={true}
              currentlyPlaying={currentlyPlaying}
              isPlaying={isPlaying}
              onPlayProject={onPlayProject}
            />
          </div>
        ))}
      </div>
    </section>

    {/* Top Hits Section */}
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Top hits</h2>
        <button className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold">Show all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {projects.topHits.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            currentlyPlaying={currentlyPlaying}
            isPlaying={isPlaying}
            onPlayProject={onPlayProject}
            onProjectClick={onNavigateToProject}
          />
        ))}
      </div>
    </section>

    {/* Side Projects Section */}
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Side projects</h2>
        <button className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold">Show all</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {projects.sideProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            currentlyPlaying={currentlyPlaying}
            isPlaying={isPlaying}
            onPlayProject={onPlayProject}
            onProjectClick={onNavigateToProject}
          />
        ))}
      </div>
    </section>
  </div>
);

export default HomeView;