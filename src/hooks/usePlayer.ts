import { useState, useRef, useEffect } from 'react';
import { projects } from '../data/projects';
import type { Project, Playlist, SelectedPlaylist, CompanySelection, DomainSelection } from '../types';

const usePlayer = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Project | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<string>('home');
    const [selectedPlaylist, setSelectedPlaylist] = useState<SelectedPlaylist>(null);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null); // Track current playlist context
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Track position in playlist
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Set "Did Kansas Win?" as default "now playing" on load
    useEffect(() => {
        const didKansasWin = projects.find(p => p.id === 'did-kansas-win');
        if (didKansasWin && !currentlyPlaying) {
            setCurrentlyPlaying(didKansasWin);
            setIsPlaying(true);
        }
    }, [currentlyPlaying]);

    const handlePlayProject = (project: Project, playlist: Playlist | null = null) => {
        if (currentlyPlaying?.id === project.id && isPlaying) {
            setIsPlaying(false);
        } else {
            setCurrentlyPlaying(project);
            setIsPlaying(true);
      
            // Set playlist context if provided
            if (playlist) {
                setCurrentPlaylist(playlist);
                const trackIndex = playlist.projects.findIndex((p: Project) => p.id === project.id);
                setCurrentTrackIndex(trackIndex >= 0 ? trackIndex : 0);
            } else {
                // If no playlist provided, check if the project is part of current playlist
                if (currentPlaylist) {
                    const trackIndex = currentPlaylist.projects.findIndex((p: Project) => p.id === project.id);
                    if (trackIndex >= 0) {
                        setCurrentTrackIndex(trackIndex);
                    } else {
                        // Project not in current playlist, clear playlist context
                        setCurrentPlaylist(null);
                        setCurrentTrackIndex(0);
                    }
                }
            }
        }
    };

    const playNextTrack = () => {
        if (!currentPlaylist || !currentPlaylist.projects) return;
    
        const nextIndex = currentTrackIndex + 1;
        if (nextIndex < currentPlaylist.projects.length) {
            const nextTrack = currentPlaylist.projects[nextIndex];
            if (nextTrack) setCurrentlyPlaying(nextTrack);
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    const playPreviousTrack = () => {
        if (!currentPlaylist || !currentPlaylist.projects) return;
    
        const prevIndex = currentTrackIndex - 1;
        if (prevIndex >= 0) {
            const prevTrack = currentPlaylist.projects[prevIndex];
            if (prevTrack) setCurrentlyPlaying(prevTrack);
            setCurrentTrackIndex(prevIndex);
            setIsPlaying(true);
        }
    };

    const navigateToView = (view: string, data: SelectedPlaylist = null) => {
        setCurrentView(view);
        if (data) {
            setSelectedPlaylist(data);
        }
        setSidebarOpen(false);
    };

    const navigateToProject = (project: Project) => {
        setCurrentView('project');
        setSelectedPlaylist(project);
        setSidebarOpen(false);

        // Automatically set this project as "now playing" when viewing its detail page
        setCurrentlyPlaying(project);
        setIsPlaying(true);
    };

    const navigateToPlaylist = (playlist: Playlist) => {
        setCurrentView('playlist');
        setSelectedPlaylist(playlist);
        setSidebarOpen(false);
    };

    const navigateToCompany = (companyName: string) => {
        setCurrentView('company');
        setSelectedPlaylist({ company: companyName } as CompanySelection);
        setSidebarOpen(false);
    };

    const navigateToDomain = (domainName: string) => {
        setCurrentView('domain');
        setSelectedPlaylist({ domain: domainName } as DomainSelection);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return {
    // State
        currentlyPlaying,
        isPlaying,
        currentView,
        selectedPlaylist,
        sidebarOpen,
        currentPlaylist,
        currentTrackIndex,
        audioRef,
    
        // Actions
        handlePlayProject,
        playNextTrack,
        playPreviousTrack,
        navigateToView,
        navigateToProject,
        navigateToPlaylist,
        navigateToCompany,
        navigateToDomain,
        toggleSidebar,
        closeSidebar,
        setIsPlaying,
        setCurrentView,
        setSelectedPlaylist,
        setSidebarOpen
    };
};

export default usePlayer;