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
  const LEFT_MIN_WIDTH = 200; // Minimum normal mode width
  const LEFT_MAX_WIDTH = 420; // Maximum left column width
  const LEFT_ICON_WIDTH = 72; // Fixed icon mode width
  const LEFT_SNAP_THRESHOLD = 96; // X position threshold for snap trigger
  
  const RIGHT_MIN_WIDTH = 280; // Minimum right panel width
  const RIGHT_MAX_WIDTH = 400; // Maximum right panel width

  // Left column resize handlers
  const startLeftResize = useCallback((e) => {
    setIsLeftResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const startX = e.clientX;
    const startWidth = leftColumnWidth;
    let currentMode = leftColumnMode; // Track mode within this drag session
    
    // Find the sidebar element for direct manipulation
    const sidebarElement = document.querySelector('[data-sidebar]');
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const targetWidth = startWidth + deltaX;
      
      let actualWidth;
      let newMode;
      
      if (currentMode === 'normal') {
        // In normal mode: resize fluidly until snap threshold
        if (targetWidth <= LEFT_SNAP_THRESHOLD) {
          // Snap to icon mode
          actualWidth = LEFT_ICON_WIDTH;
          newMode = 'icon-only';
          currentMode = 'icon-only'; // Update current mode for this drag session
        } else {
          // Normal fluid resizing
          actualWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, targetWidth));
          newMode = 'normal';
        }
      } else {
        // In icon mode: stay fixed until snap threshold crossed
        if (targetWidth > LEFT_SNAP_THRESHOLD) {
          // Snap back to normal mode - use mouse position as direct width
          // Get sidebar's left position and calculate width from mouse position
          const sidebarRect = sidebarElement?.getBoundingClientRect();
          const mouseBasedWidth = sidebarRect ? e.clientX - sidebarRect.left : targetWidth;
          console.log('Icon→Normal: targetWidth:', targetWidth, 'mouseBasedWidth:', mouseBasedWidth, 'e.clientX:', e.clientX);
          // During drag, follow mouse exactly - only apply max constraint
          actualWidth = Math.min(LEFT_MAX_WIDTH, mouseBasedWidth);
          newMode = 'normal';
          currentMode = 'normal'; // Update current mode for this drag session
        } else {
          // Stay in icon mode at fixed width
          actualWidth = LEFT_ICON_WIDTH;
          newMode = 'icon-only';
        }
      }
      
      // Update DOM directly for smooth performance
      if (sidebarElement) {
        sidebarElement.style.width = `${actualWidth}px`;
      }
      
      // Update mode state when it changes
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
      const targetWidth = startWidth + deltaX;
      
      let finalWidth;
      let finalMode;
      
      if (leftColumnMode === 'normal') {
        if (targetWidth <= LEFT_SNAP_THRESHOLD) {
          finalWidth = LEFT_ICON_WIDTH;
          finalMode = 'icon-only';
        } else {
          finalWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, targetWidth));
          finalMode = 'normal';
        }
      } else {
        if (targetWidth > LEFT_SNAP_THRESHOLD) {
          // Same logic as mousemove - use mouse position as direct width
          const sidebarElement = document.querySelector('[data-sidebar]');
          const sidebarRect = sidebarElement?.getBoundingClientRect();
          const mouseBasedWidth = sidebarRect ? e.clientX - sidebarRect.left : targetWidth;
          finalWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, mouseBasedWidth));
          finalMode = 'normal';
        } else {
          finalWidth = LEFT_ICON_WIDTH;
          finalMode = 'icon-only';
        }
      }
      
      // Update React state with final values
      setLeftColumnWidth(finalWidth);
      setLeftColumnMode(finalMode);
      
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