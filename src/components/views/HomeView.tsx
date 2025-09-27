
import ProjectCard from '../ProjectCard';
import HorizontalCardSection from '../HorizontalCardSection';
import AdaptiveCardGrid from '../AdaptiveCardGrid';
import { playlists, recentWork, topHits, sideProjects, defaultNowPlaying, madeForYou } from '../../data/projects';
import { HomeViewProps } from '../../types';

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
            projects: madeForYou.flatMap(p => p.projects).slice(0, 20),
            description: 'Curated collections and playlists just for you'
          })}
        >
                    Show all
                </button>
            </div>
            <HorizontalCardSection
                items={[...madeForYou]}
                type="playlist"
                currentlyPlaying={currentlyPlaying}
                isPlaying={isPlaying}
                currentPlaylist={currentPlaylist}
                onPlay={(playlist) => {
          // Play the first track in the playlist
          if ('projects' in playlist && playlist.projects && playlist.projects.length > 0) {
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
                items={[...topHits]}
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
                items={[...sideProjects]}
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