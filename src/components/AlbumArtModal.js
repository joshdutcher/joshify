import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const AlbumArtModal = ({ isOpen, onClose, project }) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Load image to get original dimensions
  useEffect(() => {
    if (isOpen && project?.image && !project.image.includes('/api/placeholder')) {
      setImageLoaded(false);
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setImageLoaded(true);
      };
      img.src = project.image;
    }
  }, [isOpen, project]);

  // Calculate display dimensions based on viewport and original image size
  const getDisplayDimensions = () => {
    if (!imageLoaded || !imageDimensions.width || !imageDimensions.height) {
      return { maxWidth: '75vw', maxHeight: '75vh' };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < 768; // md breakpoint
    
    if (isMobile) {
      // Mobile: 90% viewport WIDTH (not height) or original width, whichever is smaller
      const maxWidth = Math.min(viewportWidth * 0.9, imageDimensions.width);
      const scaleFactor = maxWidth / imageDimensions.width;
      const scaledHeight = imageDimensions.height * scaleFactor;
      
      // Ensure the scaled height doesn't exceed a reasonable portion of viewport
      const maxAllowedHeight = viewportHeight * 0.8; // Leave space for close button and context
      const finalHeight = Math.min(scaledHeight, maxAllowedHeight);
      const finalScaleFactor = finalHeight / imageDimensions.height;
      const finalWidth = imageDimensions.width * finalScaleFactor;
      
      return {
        width: `${finalWidth}px`,
        height: `${finalHeight}px`,
        maxWidth: `${imageDimensions.width}px`,
        maxHeight: `${imageDimensions.height}px`
      };
    } else {
      // Desktop: 75% viewport dimensions or original dimensions, whichever is smaller
      const maxWidth = Math.min(viewportWidth * 0.75, imageDimensions.width);
      const maxHeight = Math.min(viewportHeight * 0.75, imageDimensions.height);
      
      return {
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`
      };
    }
  };

  const displayStyle = getDisplayDimensions();

  if (!isOpen || !project) return null;

  const hasValidImage = project?.isAlbum && 
                       project?.image && 
                       !project.image.includes('/api/placeholder');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 mx-4 flex flex-col items-center justify-center min-h-screen py-8 md:py-0">
        {/* Album Art */}
        {hasValidImage ? (
          <div className="relative">
            {/* Close Button - Overlaying top-right corner of image */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors z-30"
              aria-label="Close album art modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={project.image}
              alt={`${project.title} album art`}
              className="object-contain rounded-lg shadow-2xl"
              style={displayStyle}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>
        ) : (
          <div 
            className="bg-gradient-to-br from-spotify-green to-green-700 rounded-lg flex items-center justify-center"
            style={displayStyle}
          >
            <span className="text-white font-bold text-6xl">
              {project.title?.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumArtModal;