
import { Play, MoreHorizontal } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

interface DomainViewProps {
  domain: string;
  currentlyPlaying: Project | null;
  isPlaying: boolean;
  onPlayProject: (_project: Project, _playlist?: any) => void;
  onNavigateToProject: (_project: Project) => void;
}

const DomainView = ({
    domain,
    currentlyPlaying: _currentlyPlaying,
    isPlaying: _isPlaying,
    onPlayProject,
    onNavigateToProject
}: DomainViewProps) => {
    // Get all projects from the specified domain
    const allProjects = projects;
    const domainProjects = allProjects.filter(project => {
        return project.album === domain;
    });

    if (domainProjects.length === 0) {
        return (
            <div className="text-white p-4 md:p-6">
                <div className="text-center py-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">No projects found</h1>
                    <p className="text-gray-400">No projects found for domain &quot;{domain}&quot;</p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-white p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-3xl md:text-4xl">
                        {domain.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                    </span>
                </div>
                <div className="text-center md:text-left">
                    <p className="text-sm font-semibold uppercase">Domain</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">{domain}</h1>
                    <p className="text-gray-400">Josh Dutcher • {domainProjects.length} projects</p>
                </div>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-8">
                <button 
                    className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => domainProjects[0] && onPlayProject(domainProjects[0], { projects: domainProjects })}
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
                {domainProjects.map((project, _index) => (
                    <div key={project.id} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-gray-800 rounded-lg px-2 group">
                        <div className="col-span-1 text-gray-400 text-sm">
                            <span className="group-hover:hidden">{_index + 1}</span>
                            <Play className="w-4 h-4 hidden group-hover:block cursor-pointer" fill="currentColor" onClick={() => onPlayProject(project, { projects: domainProjects })} />
                        </div>
                        <div className="col-span-5 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                    {project.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                                </span>
                            </div>
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
                                <p className="text-gray-400 text-sm truncate">{project.artist}</p>
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
                {domainProjects.map((project, _index) => (
                    <div key={project.id} className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg" onClick={() => onNavigateToProject(project)}>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                                {project.title.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                            </span>
                        </div>
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
                            <p className="text-gray-400 text-sm truncate">{project.artist}</p>
                        </div>
                        <button onClick={(e) => {
              e.stopPropagation();
              onPlayProject(project, { projects: domainProjects });
            }}>
                            <Play className="w-5 h-5 text-gray-400" fill="currentColor" />
                        </button>
                    </div>
        ))}
            </div>
        </div>
    );
};

export default DomainView;