import { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../data/projects';
import type { Project, Playlist, SelectedPlaylist, CompanySelection, DomainSelection } from '../types';
import { useNavigationHistory } from './useNavigationHistory';
import {
    trackPageView,
    trackAudioPlay,
    trackAudioPause,
    trackAudioCompleted,
    trackAudioDuration,
    trackAudioMilestone,
    trackLyricsOpen,
    trackLyricsDuration,
} from '../utils/analytics';

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

    // Analytics tracking refs
    const listenStartRef = useRef<number | null>(null);
    const lyricsStartRef = useRef<number | null>(null);
    const milestonesRef = useRef<Set<number>>(new Set());

    const flushListenDuration = useCallback((projectId: string) => {
        if (listenStartRef.current !== null) {
            const seconds = (Date.now() - listenStartRef.current) / 1000;
            if (seconds >= 1) trackAudioDuration(projectId, seconds);
            listenStartRef.current = null;
        }
    }, []);

    const flushLyricsDuration = useCallback((projectId: string) => {
        if (lyricsStartRef.current !== null) {
            const seconds = (Date.now() - lyricsStartRef.current) / 1000;
            if (seconds >= 1) trackLyricsDuration(projectId, seconds);
            lyricsStartRef.current = null;
        }
    }, []);

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

    // Close lyrics on any navigation — flush duration first
    useEffect(() => {
        if (isLyricsOpen && currentlyPlaying) {
            flushLyricsDuration(currentlyPlaying.id);
        }
        setIsLyricsOpen(false);
        // flushLyricsDuration is stable; isLyricsOpen intentionally excluded to avoid loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentView, selectedPlaylist]);

    // Parse URL on initial load for deep linking
    useEffect(() => {
        const path = window.location.pathname;
        const projectMatch = path.match(/^\/project\/(.+)$/);
        if (projectMatch) {
            const project = projects.find(p => p.id === projectMatch[1]);
            if (project) {
                setCurrentView('project');
                setSelectedPlaylist(project);
                setCurrentlyPlaying(project);
                window.history.replaceState({ view: 'project', data: project }, '', path);
            }
        }
        if (path !== '/') {
            trackPageView(path);
        }
    }, []);

    // Integrate browser history navigation
    const { pushNavigation } = useNavigationHistory(
        currentView,
        selectedPlaylist,
        setCurrentView,
        setSelectedPlaylist,
        setSearchQuery
    );

    // Set "Joshify" as default "now playing" on load (skip if deep linking to a project)
    useEffect(() => {
        const isProjectUrl = /^\/project\/.+$/.test(window.location.pathname);
        if (!isProjectUrl) {
            const joshify = projects.find(p => p.id === 'joshify');
            if (joshify && !currentlyPlaying) {
                setCurrentlyPlaying(joshify);
            }
        }
    }, [currentlyPlaying]);

    const handlePlayProject = (project: Project, playlist: Playlist | null = null) => {
        if (currentlyPlaying?.id === project.id && isPlaying) {
            // Pausing the current track
            flushListenDuration(project.id);
            trackAudioPause(project.id);
            setIsPlaying(false);
        } else {
            // Switching tracks — flush duration for the outgoing track
            if (currentlyPlaying && currentlyPlaying.id !== project.id && isPlaying) {
                flushListenDuration(currentlyPlaying.id);
            }

            setCurrentlyPlaying(project);
            setIsPlaying(true);
            listenStartRef.current = Date.now();
            milestonesRef.current = new Set();
            if (project.musicFile) trackAudioPlay(project.id);

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
            if (currentlyPlaying && isPlaying) flushListenDuration(currentlyPlaying.id);
            const nextTrack = currentPlaylist.projects[nextIndex];
            if (nextTrack) {
                setCurrentlyPlaying(nextTrack);
                listenStartRef.current = Date.now();
                milestonesRef.current = new Set();
                if (nextTrack.musicFile) trackAudioPlay(nextTrack.id);
            }
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    const playPreviousTrack = () => {
        if (!currentPlaylist || !currentPlaylist.projects) return;

        const prevIndex = currentTrackIndex - 1;
        if (prevIndex >= 0) {
            if (currentlyPlaying && isPlaying) flushListenDuration(currentlyPlaying.id);
            const prevTrack = currentPlaylist.projects[prevIndex];
            if (prevTrack) {
                setCurrentlyPlaying(prevTrack);
                listenStartRef.current = Date.now();
                milestonesRef.current = new Set();
                if (prevTrack.musicFile) trackAudioPlay(prevTrack.id);
            }
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

    const navigateToLikedSongs = () => {
        pushNavigation('liked-songs', null);
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
        setIsLyricsOpen(prev => {
            if (!prev) {
                // Opening
                if (currentlyPlaying) {
                    lyricsStartRef.current = Date.now();
                    trackLyricsOpen(currentlyPlaying.id);
                }
            } else {
                // Closing
                if (currentlyPlaying) flushLyricsDuration(currentlyPlaying.id);
            }
            return !prev;
        });
    }, [currentlyPlaying, flushLyricsDuration]);

    // Open/close mobile player
    const openMobilePlayer = useCallback(() => {
        setIsMobilePlayerOpen(true);
    }, []);

    const closeMobilePlayer = useCallback(() => {
        setIsMobilePlayerOpen(false);
    }, []);

    // Audio element event handlers - these are called from App.tsx
    const handleTimeUpdate = useCallback(() => {
        if (!audioRef.current) return;
        const time = audioRef.current.currentTime;
        setCurrentTime(time);

        // Fire progress milestones
        if (currentlyPlaying?.musicFile && duration > 0) {
            const pct = (time / duration) * 100;
            for (const milestone of [25, 50, 75, 100] as const) {
                if (pct >= milestone && !milestonesRef.current.has(milestone)) {
                    milestonesRef.current.add(milestone);
                    trackAudioMilestone(currentlyPlaying.id, milestone);
                }
            }
        }
    }, [currentlyPlaying, duration]);

    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsBuffering(false);
        }
    }, []);

    const handleEnded = useCallback(() => {
        if (currentlyPlaying) {
            flushListenDuration(currentlyPlaying.id);
            trackAudioCompleted(currentlyPlaying.id);
        }
        // Auto-advance to next track
        if (currentPlaylist && currentTrackIndex < currentPlaylist.projects.length - 1) {
            playNextTrack();
        } else {
            setIsPlaying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentlyPlaying, currentPlaylist, currentTrackIndex, flushListenDuration]);

    const handleWaiting = useCallback(() => {
        setIsBuffering(true);
    }, []);

    const handleCanPlay = useCallback(() => {
        setIsBuffering(false);
    }, []);

    // Flush tracking data when user leaves the site
    useEffect(() => {
        const handleExit = () => {
            if (currentlyPlaying && isPlaying) flushListenDuration(currentlyPlaying.id);
            if (currentlyPlaying && isLyricsOpen) flushLyricsDuration(currentlyPlaying.id);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') handleExit();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handleExit);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handleExit);
        };
    }, [currentlyPlaying, isPlaying, isLyricsOpen, flushListenDuration, flushLyricsDuration]);

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
        navigateToLikedSongs,
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