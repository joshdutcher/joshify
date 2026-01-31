import { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../data/projects';
import type { Project, Playlist, SelectedPlaylist, CompanySelection, DomainSelection } from '../types';
import { useNavigationHistory } from './useNavigationHistory';

const usePlayer = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Project | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<string>('home');
    const [selectedPlaylist, setSelectedPlaylist] = useState<SelectedPlaylist>(null);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null); // Track current playlist context
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Track position in playlist
    const [searchQuery, setSearchQuery] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio playback state
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isBuffering, setIsBuffering] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(() => {
        const saved = localStorage.getItem('joshify_volume');
        return saved ? parseFloat(saved) : 0.75;
    });

    // Mobile player state
    const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState<boolean>(false);

    // Desktop lyrics state
    const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

    // Integrate browser history navigation
    const { pushNavigation } = useNavigationHistory(
        currentView,
        selectedPlaylist,
        setCurrentView,
        setSelectedPlaylist,
        setSearchQuery
    );

    // Set "Joshify" as default "now playing" on load
    useEffect(() => {
        const joshify = projects.find(p => p.id === 'joshify');
        if (joshify && !currentlyPlaying) {
            setCurrentlyPlaying(joshify);
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
        pushNavigation(view, data);
        setSidebarOpen(false);
    };

    const navigateToProject = (project: Project) => {
        pushNavigation('project', project);
        setSidebarOpen(false);

        // Automatically set this project as "now playing" when viewing its detail page
        setCurrentlyPlaying(project);
        setIsPlaying(true);
    };

    const navigateToPlaylist = (playlist: Playlist) => {
        pushNavigation('playlist', playlist);
        setSidebarOpen(false);
    };

    const navigateToCompany = (companyName: string) => {
        const companySelection = { company: companyName } as CompanySelection;
        pushNavigation('company', companySelection);
        setSidebarOpen(false);
    };

    const navigateToDomain = (domainName: string) => {
        const domainSelection = { domain: domainName } as DomainSelection;
        pushNavigation('domain', domainSelection);
        setSidebarOpen(false);
    };

    const navigateToSearch = (query: string) => {
        setSearchQuery(query);
        pushNavigation('search', null, query);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Seek to a specific time in the audio
    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    // Update volume and persist to localStorage
    const updateVolume = useCallback((newVolume: number) => {
        setVolume(newVolume);
        localStorage.setItem('joshify_volume', newVolume.toString());
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }, []);

    // Toggle lyrics panel
    const toggleLyrics = useCallback(() => {
        setIsLyricsOpen(prev => !prev);
    }, []);

    // Open/close mobile player
    const openMobilePlayer = useCallback(() => {
        setIsMobilePlayerOpen(true);
    }, []);

    const closeMobilePlayer = useCallback(() => {
        setIsMobilePlayerOpen(false);
    }, []);

    // Audio element event handlers - these are called from App.tsx
    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsBuffering(false);
        }
    }, []);

    const handleEnded = useCallback(() => {
        // Auto-advance to next track
        if (currentPlaylist && currentTrackIndex < currentPlaylist.projects.length - 1) {
            playNextTrack();
        } else {
            setIsPlaying(false);
        }
        // playNextTrack is stable since it only uses state setters
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlaylist, currentTrackIndex]);

    const handleWaiting = useCallback(() => {
        setIsBuffering(true);
    }, []);

    const handleCanPlay = useCallback(() => {
        setIsBuffering(false);
    }, []);

    // Get current music URL - musicFile already contains the full URL from projects.ts
    const currentMusicUrl = currentlyPlaying?.musicFile || null;

    // Check if current track has lyrics
    const hasLyrics = !!(currentlyPlaying?.displayLyrics || currentlyPlaying?.sunoLyrics);

    // Get lyrics for current track
    const currentLyrics = currentlyPlaying?.displayLyrics || currentlyPlaying?.sunoLyrics || null;

    return {
        // State
        currentlyPlaying,
        isPlaying,
        currentView,
        selectedPlaylist,
        sidebarOpen,
        currentPlaylist,
        currentTrackIndex,
        searchQuery,
        audioRef,

        // Audio state
        currentTime,
        duration,
        isBuffering,
        volume,
        currentMusicUrl,
        hasLyrics,
        currentLyrics,

        // Mobile/Lyrics UI state
        isMobilePlayerOpen,
        isLyricsOpen,

        // Actions
        handlePlayProject,
        playNextTrack,
        playPreviousTrack,
        navigateToView,
        navigateToProject,
        navigateToPlaylist,
        navigateToCompany,
        navigateToDomain,
        navigateToSearch,
        toggleSidebar,
        closeSidebar,
        setIsPlaying,
        setCurrentView,
        setSelectedPlaylist,
        setSidebarOpen,
        setSearchQuery,

        // Audio controls
        seek,
        updateVolume,

        // Lyrics controls
        toggleLyrics,

        // Mobile player controls
        openMobilePlayer,
        closeMobilePlayer,

        // Audio event handlers (called from App.tsx)
        handleTimeUpdate,
        handleLoadedMetadata,
        handleEnded,
        handleWaiting,
        handleCanPlay
    };
};

export default usePlayer;