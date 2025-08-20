import { useState, useRef, useEffect } from 'react';
import { projects, campbellZafarProjects } from '../data/projects';

const usePlayer = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null); // Track current playlist context
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Track position in playlist
  const audioRef = useRef(null);

  // Set first Campbell Zafar project as default "now playing" on load
  useEffect(() => {
    if (campbellZafarProjects.length > 0 && !currentlyPlaying) {
      setCurrentlyPlaying(campbellZafarProjects[0]);
      setIsPlaying(true);
    }
  }, [currentlyPlaying]);

  const handlePlayProject = (project, playlist = null) => {
    if (currentlyPlaying?.id === project.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(project);
      setIsPlaying(true);
      
      // Set playlist context if provided
      if (playlist) {
        setCurrentPlaylist(playlist);
        const trackIndex = playlist.projects.findIndex(p => p.id === project.id);
        setCurrentTrackIndex(trackIndex >= 0 ? trackIndex : 0);
      } else {
        // If no playlist provided, check if the project is part of current playlist
        if (currentPlaylist) {
          const trackIndex = currentPlaylist.projects.findIndex(p => p.id === project.id);
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
      setCurrentlyPlaying(nextTrack);
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPreviousTrack = () => {
    if (!currentPlaylist || !currentPlaylist.projects) return;
    
    const prevIndex = currentTrackIndex - 1;
    if (prevIndex >= 0) {
      const prevTrack = currentPlaylist.projects[prevIndex];
      setCurrentlyPlaying(prevTrack);
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  const navigateToView = (view, data = null) => {
    setCurrentView(view);
    if (data) {
      setSelectedPlaylist(data);
    }
    setSidebarOpen(false);
  };

  const navigateToProject = (project) => {
    setCurrentView('project');
    setSelectedPlaylist(project);
    setSidebarOpen(false);
  };

  const navigateToPlaylist = (playlist) => {
    setCurrentView('playlist');
    setSelectedPlaylist(playlist);
    setSidebarOpen(false);
  };

  const navigateToCompany = (companyName) => {
    setCurrentView('company');
    setSelectedPlaylist({ company: companyName });
    setSidebarOpen(false);
  };

  const navigateToDomain = (domainName) => {
    setCurrentView('domain');
    setSelectedPlaylist({ domain: domainName });
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