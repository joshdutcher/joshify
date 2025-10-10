import { useState, useCallback, useEffect } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

const useColumnResize = () => {
    // Left column sizing state
    const [leftColumnWidth, setLeftColumnWidth] = useState(309); // Default to match Spotify (309px)
    const [isLeftResizing, setIsLeftResizing] = useState(false);
    const [leftColumnMode, setLeftColumnMode] = useState('normal'); // 'normal', 'icon-only'
  
    // Right column sizing state  
    const [rightColumnWidth, setRightColumnWidth] = useState(320); // 20rem = 320px default
    const [isRightResizing, setIsRightResizing] = useState(false);
  
    // Constants for column constraints (matching Spotify values)
    const LEFT_MIN_WIDTH = 280; // Minimum normal mode width (increased to match Spotify)
    const LEFT_MAX_WIDTH = 420; // Maximum left column width
    const LEFT_ICON_WIDTH = 72; // Fixed icon mode width
    const LEFT_SNAP_THRESHOLD = 96; // X position threshold for snap trigger
  
    const RIGHT_MIN_WIDTH = 280; // Minimum right panel width  
    const RIGHT_MAX_WIDTH = 400; // Maximum right panel width

    // Left column resize handlers
    const startLeftResize = useCallback((_e: ReactMouseEvent) => {
        setIsLeftResizing(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        let currentMode = leftColumnMode; // Track mode within this drag session
    
        // Find the sidebar element for direct manipulation and capture its initial left position
        const sidebarElement = document.querySelector('[data-sidebar]') as HTMLElement;
        const sidebarInitialLeft = sidebarElement?.getBoundingClientRect().left || 0;
    
        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
      
            let actualWidth;
            let newMode;
      
            // Determine what the current mouse position should result in
            if (mouseX <= LEFT_SNAP_THRESHOLD) {
                // Mouse is in icon zone - force icon mode
                actualWidth = LEFT_ICON_WIDTH;
                newMode = 'icon-only';
            } else {
                // Mouse is in normal zone - calculate width from initial sidebar position
                // Use the captured initial left position, not the current dynamic position
                const mouseBasedWidth = mouseX - sidebarInitialLeft;
        
                // When transitioning from icon mode, allow following the mouse even below minimum
                // This ensures smooth mouse-following behavior when exiting icon mode
                if (currentMode === 'icon-only') {
                    // Just exited icon mode - follow mouse exactly, constrain only by max
                    actualWidth = Math.min(LEFT_MAX_WIDTH, mouseBasedWidth);
                } else {
                    // Normal resizing - apply both min and max constraints
                    actualWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, mouseBasedWidth));
                }
                newMode = 'normal';
            }
      
            // Update mode state only when it actually changes to avoid unnecessary re-renders
            if (newMode !== currentMode) {
                currentMode = newMode;
                // Defer React state update to avoid blocking the drag performance
                // Use requestAnimationFrame to batch the update with the next render cycle
                requestAnimationFrame(() => {
                    setLeftColumnMode(newMode);
                });
            }
      
            // Update DOM directly for smooth performance
            if (sidebarElement) {
                sidebarElement.style.width = `${actualWidth}px`;
            }
      
            // Also update CSS custom property for system-wide consistency
            document.documentElement.style.setProperty('--left-sidebar-width', `${actualWidth}px`);
        };
    
        const handleMouseUp = (e: MouseEvent) => {
            setIsLeftResizing(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
      
            // Final calculation using the same logic as mousemove
            const mouseX = e.clientX;
      
            let finalWidth;
            let finalMode;
      
            if (mouseX <= LEFT_SNAP_THRESHOLD) {
                // Mouse ended in icon zone
                finalWidth = LEFT_ICON_WIDTH;
                finalMode = 'icon-only';
            } else {
                // Mouse ended in normal zone - use same calculation as mousemove
                // Use the same initial left position, not current dynamic position
                const mouseBasedWidth = mouseX - sidebarInitialLeft;
        
                // Apply minimum width constraint on mouse release (not during drag)
                finalWidth = Math.max(LEFT_MIN_WIDTH, Math.min(LEFT_MAX_WIDTH, mouseBasedWidth));
                finalMode = 'normal';
            }
      
            // Update React state with final values
            setLeftColumnWidth(finalWidth);
            setLeftColumnMode(finalMode);
      
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [leftColumnMode]);

    // Right column resize handlers
    const startRightResize = useCallback((e: ReactMouseEvent) => {
        setIsRightResizing(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    
        const startX = e.clientX;
        const startWidth = rightColumnWidth;
    
        // Find the right panel element for direct manipulation
        const rightPanelElement = document.querySelector('[data-right-panel]') as HTMLElement;
    
        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = startX - e.clientX; // Reverse direction for right column
            const newWidth = Math.max(RIGHT_MIN_WIDTH, Math.min(RIGHT_MAX_WIDTH, startWidth + deltaX));
      
            // Update DOM directly for smooth performance
            if (rightPanelElement) {
                rightPanelElement.style.width = `${newWidth}px`;
            }
      
            // Also update CSS custom property for system-wide consistency
            document.documentElement.style.setProperty('--right-sidebar-width', `${newWidth}px`);
        };
    
        const handleMouseUp = (e: MouseEvent) => {
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
        setLeftColumnWidth(309);
        setRightColumnWidth(320);
        setLeftColumnMode('normal');
    }, []);

    // Programmatically set left column to icon mode
    const toggleLeftColumnMode = useCallback(() => {
        if (leftColumnMode === 'icon-only') {
            setLeftColumnWidth(309);
            setLeftColumnMode('normal');
        } else {
            setLeftColumnWidth(LEFT_ICON_WIDTH);
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