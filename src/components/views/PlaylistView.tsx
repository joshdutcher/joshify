
import { Play, MoreHorizontal } from 'lucide-react';
import ProjectImage from '../ProjectImage';
import PlaylistCoverArt from '../PlaylistCoverArt';
import type { Playlist, Project } from '../../types';

interface PlaylistViewProps {
  playlist: Playlist;
  currentlyPlaying: Project | null;
  isPlaying: boolean;
  onPlayProject: (project: Project) => void;
  onNavigateToProject: (project: Project) => void;
  onNavigateToCompany?: (companyName: string) => void;
  onNavigateToDomain?: (domainName: string) => void;
}

const PlaylistView = ({
    playlist,
    currentlyPlaying: _currentlyPlaying,
    isPlaying: _isPlaying,
    onPlayProject,
    onNavigateToProject,
    onNavigateToCompany,
    onNavigateToDomain: _onNavigateToDomain
}: PlaylistViewProps) => (
    <div className="text-white p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 shadow-2xl">
                <PlaylistCoverArt
                    playlist={playlist}
                    size="custom"
                    className="w-full h-full"
                    shape="rounded"
        />
            </div>
            <div className="text-center md:text-left">
                <p className="text-sm font-semibold uppercase">{playlist.employer ? 'Workplace' : 'Collection'}</p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">{playlist.name}</h1>
                <p className="text-gray-400 mb-2">Josh Dutcher • {playlist.projects.length} projects</p>
                {playlist.description && (
                <p className="text-gray-300 text-sm">{playlist.description}</p>
        )}
            </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-8">
            <button 
                className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => playlist.projects.length > 0 && onPlayProject(playlist.projects[0], playlist)}
      >
                <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-0.5" fill="currentColor" />
            </button>
            <MoreHorizontal className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block space-y-1">
            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-gray-700 pb-2 mb-4">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-3">Role</div>
                <div className="col-span-2">Year</div>
                <div className="col-span-1">Duration</div>
            </div>
            {playlist.projects.map((project, index) => (
                <div key={project.id} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-gray-800 rounded-lg px-2 group">
                    <div className="col-span-1 text-gray-400 text-sm">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Play className="w-4 h-4 hidden group-hover:block cursor-pointer" fill="currentColor" onClick={() => onPlayProject(project, playlist)} />
                    </div>
                    <div className="col-span-5 flex items-center space-x-3">
                        <ProjectImage
                            project={project}
                            size="small"
                            shape="rounded"
            />
                        <div className="min-w-0 flex-1">
                            <p 
                                className="text-white truncate hover:underline cursor-pointer"
                                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToProject && onNavigateToProject(project);
                }}
              >
                                {project.title}
                            </p>
                            <p className="text-gray-400 text-sm truncate">
                                {project.artist && project.artist.includes(' - ') ? (
                                    <>
                                        {project.artist.split(' - ')[0]} - 
                                        <span 
                                            className="hover:underline cursor-pointer hover:text-white"
                                            onClick={(e) => {
                        e.stopPropagation();
                        const company = project.artist.split(' - ')[1];
                        onNavigateToCompany && onNavigateToCompany(company);
                      }}
                    >
                                            {project.artist.split(' - ')[1]}
                                        </span>
                                    </>
                ) : (
                  project.artist
                )}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 text-gray-400 text-sm truncate">{project.album}</div>
                    <div className="col-span-2 text-gray-400 text-sm">{project.year}</div>
                    <div className="col-span-1 text-gray-400 text-sm">{project.duration}</div>
                </div>
      ))}
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-2">
            {playlist.projects.map((project, index) => (
                <div key={project.id} className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg" onClick={() => onNavigateToProject(project)}>
                    <ProjectImage
                        project={project}
                        size="medium"
                        shape="rounded"
          />
                    <div className="flex-1 min-w-0">
                        <p 
                            className="text-white font-medium truncate hover:underline cursor-pointer"
                            onClick={(e) => {
                e.stopPropagation();
                onNavigateToProject && onNavigateToProject(project);
              }}
            >
                            {project.title}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                            {project.artist && project.artist.includes(' - ') ? (
                                <>
                                    {project.artist.split(' - ')[0]} - 
                                    <span 
                                        className="hover:underline cursor-pointer hover:text-white"
                                        onClick={(e) => {
                      e.stopPropagation();
                      const company = project.artist.split(' - ')[1];
                      onNavigateToCompany && onNavigateToCompany(company);
                    }}
                  >
                                        {project.artist.split(' - ')[1]}
                                    </span>
                                </>
              ) : (
                project.artist
              )}
                        </p>
                    </div>
                    <button onClick={(e) => {
            e.stopPropagation();
            onPlayProject(project, playlist);
          }}>
                        <Play className="w-5 h-5 text-gray-400" fill="currentColor" />
                    </button>
                </div>
      ))}
        </div>
    </div>
);

export default PlaylistView;