import { useState, useRef, useEffect } from 'react';
import { projects } from '../data/projects';

const usePlayer = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const audioRef = useRef(null);

  // Set Campbell Zafar as default "now playing" on load
  useEffect(() => {
    const campbellZafar = projects.recentWork.find(project => project.id === 'campbell-zafar');
    if (campbellZafar && !currentlyPlaying) {
      setCurrentlyPlaying(campbellZafar);
      setIsPlaying(true);
    }
  }, [currentlyPlaying]);

  const handlePlayProject = (project) => {
    if (currentlyPlaying?.id === project.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(project);
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
    audioRef,
    
    // Actions
    handlePlayProject,
    navigateToView,
    navigateToProject,
    navigateToPlaylist,
    toggleSidebar,
    closeSidebar,
    setIsPlaying,
    setCurrentView,
    setSelectedPlaylist,
    setSidebarOpen
  };
};

export default usePlayer;