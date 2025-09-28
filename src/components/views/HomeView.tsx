
import ProjectCard from '../ProjectCard';
import HorizontalCardSection from '../HorizontalCardSection';
import AdaptiveCardGrid from '../AdaptiveCardGrid';
import { playlists, recentWork, topHits, sideProjects, defaultNowPlaying, madeForYou } from '../../data/projects';
import { HomeViewProps, Playlist } from '../../types';
import { isProject, isPlaylist } from '../../utils/typeGuards';
import { Music } from 'lucide-react';

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
    onNavigateToCompany,
    onNavigateToDomain
}: HomeViewProps) => (
    <div className="text-spotify-primary p-6">
        <h1 className="text-3xl font-bold mb-5">{getTimeBasedGreeting()}</h1>

        {/* Recently Played Grid - Maximum 2 rows with horizontal scroll fallback */}
        <AdaptiveCardGrid className="mb-5 md:mb-7" maxRows={2} cardWidth={188}>
            {defaultNowPlaying[0] && (
                <ProjectCard
                    key={defaultNowPlaying[0].id}
                    project={defaultNowPlaying[0]}
                    size="large"
                    showArtist={false}
                    currentlyPlaying={currentlyPlaying}
                    isPlaying={isPlaying}
                    onPlayProject={onPlayProject}
                    onProjectClick={onNavigateToProject}
                    onNavigateToCompany={onNavigateToCompany}
                    onNavigateToDomain={onNavigateToDomain}
                />
            )}
            {recentWork.filter(project => project && project.id !== defaultNowPlaying[0]?.id).map((project) => {
                if (!project) return null;
                return (
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
                );
            })}
        </AdaptiveCardGrid>

        {/* Made for You Section */}
        <section className="mb-7">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Made for you</h2>
                <button
                    className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
                    onClick={() => onNavigateToPlaylist({
            name: 'Made for You',
            projects: madeForYou.filter((p): p is Playlist => p !== undefined).flatMap(p => p.projects).slice(0, 20),
            description: 'Curated collections and playlists just for you',
            icon: Music,
            image: null,
            employer: false
          })}
        >
                    Show all
                </button>
            </div>
            <HorizontalCardSection
                items={madeForYou.filter((p): p is Playlist => p !== undefined)}
                type="playlist"
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentPlaylist={currentPlaylist}
                onPlay={(item) => {
            // Play the first track in the playlist
            if (isPlaylist(item) && item.projects && item.projects.length > 0) {
              const firstProject = item.projects[0];
              if (firstProject) {
                onPlayProject(firstProject, item);
              }
            }
        }}
                onClick={(item) => {
          if (isPlaylist(item)) {
            onNavigateToPlaylist(item);
          }
        }}
      />
        </section>

        {/* Top Hits Section */}
        <section className="mb-7">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Top hits</h2>
                <button
                    className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
                    onClick={() => {
            const playlist = playlists.find(p => p.name === 'Top Hits');
            if (playlist) {
              onNavigateToPlaylist(playlist);
            }
          }}
        >
                    Show all
                </button>
            </div>
            <HorizontalCardSection
                items={[...topHits]}
                type="project"
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentPlaylist={currentPlaylist}
                onPlay={(item, playlist) => {
          if (isProject(item)) {
            onPlayProject(item, playlist);
          }
        }}
                onClick={(item) => {
          if (isProject(item)) {
            onNavigateToProject(item);
          }
        }}
      />
        </section>

        {/* Side Projects Section */}
        <section>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Side projects</h2>
                <button
                    className="text-spotify-secondary hover:text-spotify-primary text-sm font-semibold"
                    onClick={() => {
            const playlist = playlists.find(p => p.name === 'Side Projects');
            if (playlist) {
              onNavigateToPlaylist(playlist);
            }
          }}
        >
                    Show all
                </button>
            </div>
            <HorizontalCardSection
                items={[...sideProjects]}
                type="project"
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentPlaylist={currentPlaylist}
                onPlay={(item, playlist) => {
          if (isProject(item)) {
            onPlayProject(item, playlist);
          }
        }}
                onClick={(item) => {
          if (isProject(item)) {
            onNavigateToProject(item);
          }
        }}
      />
        </section>
    </div>
);

export default HomeView;