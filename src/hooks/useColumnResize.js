import { useState, useCallback, useEffect } from 'react';

const useColumnResize = () => {
  // Left column sizing state
  const [leftColumnWidth, setLeftColumnWidth] = useState(256); // 16rem = 256px default
  const [isLeftResizing, setIsLeftResizing] = useState(false);
  const [leftColumnMode, setLeftColumnMode] = useState('normal'); // 'normal', 'icon-only'
  
  // Right column sizing state  
  const [rightColumnWidth, setRightColumnWidth] = useState(320); // 20rem = 320px default
  const [isRightResizing, setIsRightResizing] = useState(false);
  
  // Constants for column constraints
  const LEFT_MIN_WIDTH = 72; // Icon-only mode threshold
  const LEFT_MAX_WIDTH = 420; // Maximum left column width
  const LEFT_SNAP_THRESHOLD = 96; // Width below which it snaps to icon mode
  
  const RIGHT_MIN_WIDTH = 280; // Minimum right panel width
  const RIGHT_MAX_WIDTH = 400; // Maximum right panel width

  // Left column resize handlers
  const startLeftResize = useCallback((e) => {
    setIsLeftResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const startX = e.clientX;
    const startWidth = leftColumnWidth;
    
    // Find the sidebar element for direct manipulation
    const sidebarElement = document.querySelector('[data-sidebar]');
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, startWidth + deltaX));
      
      // Update DOM directly for smooth performance
      if (sidebarElement) {
        sidebarElement.style.width = `${newWidth}px`;
      }
      
      // Only update mode state, not width (to avoid re-renders)
      const newMode = newWidth <= LEFT_SNAP_THRESHOLD ? 'icon-only' : 'normal';
      if (newMode !== leftColumnMode) {
        setLeftColumnMode(newMode);
      }
    };
    
    const handleMouseUp = (e) => {
      setIsLeftResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Final width calculation
      const deltaX = e.clientX - startX;
      const finalWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, startWidth + deltaX));
      
      // Update React state with final value
      setLeftColumnWidth(finalWidth);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [leftColumnWidth, leftColumnMode]);

  // Right column resize handlers
  const startRightResize = useCallback((e) => {
    setIsRightResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const startX = e.clientX;
    const startWidth = rightColumnWidth;
    
    // Find the right panel element for direct manipulation
    const rightPanelElement = document.querySelector('[data-right-panel]');
    
    const handleMouseMove = (e) => {
      const deltaX = startX - e.clientX; // Reverse direction for right column
      const newWidth = Math.max(RIGHT_MIN_WIDTH, Math.min(RIGHT_MAX_WIDTH, startWidth + deltaX));
      
      // Update DOM directly for smooth performance
      if (rightPanelElement) {
        rightPanelElement.style.width = `${newWidth}px`;
      }
    };
    
    const handleMouseUp = (e) => {
      setIsRightResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Final width calculation
      const deltaX = startX - e.clientX;
      const finalWidth = Math.max(RIGHT_MIN_WIDTH, Math.min(RIGHT_MAX_WIDTH, startWidth + deltaX));
      
      // Update React state with final value
      setRightColumnWidth(finalWidth);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [rightColumnWidth]);

  // Reset to default widths
  const resetColumnWidths = useCallback(() => {
    setLeftColumnWidth(256);
    setRightColumnWidth(320);
    setLeftColumnMode('normal');
  }, []);

  // Programmatically set left column to icon mode
  const toggleLeftColumnMode = useCallback(() => {
    if (leftColumnMode === 'icon-only') {
      setLeftColumnWidth(256);
      setLeftColumnMode('normal');
    } else {
      setLeftColumnWidth(LEFT_MIN_WIDTH);
      setLeftColumnMode('icon-only');
    }
  }, [leftColumnMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  return {
    // Left column
    leftColumnWidth,
    leftColumnMode,
    isLeftResizing,
    startLeftResize,
    toggleLeftColumnMode,
    
    // Right column
    rightColumnWidth,
    isRightResizing,
    startRightResize,
    
    // Utilities
    resetColumnWidths,
    
    // Constants for components to use
    LEFT_MIN_WIDTH,
    LEFT_MAX_WIDTH,
    RIGHT_MIN_WIDTH,
    RIGHT_MAX_WIDTH,
  };
};

export default useColumnResize;