import { useState, useEffect } from 'react';
import ColorExtractor from '../utils/colorExtractor';

const useDynamicBackground = (imageUrl, fallbackImage = null) => {
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: 'linear-gradient(to bottom, rgb(40, 40, 40) 0%, rgb(40, 40, 40) 50%)'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const extractColors = (url) => {
      if (!url) {
        // Use default gradient when no image
        setBackgroundStyle({
          background: 'linear-gradient(to bottom, rgb(40, 40, 40) 0%, rgb(40, 40, 40) 50%)'
        });
        return;
      }

      setIsLoading(true);
      
      ColorExtractor.extractColors(url, (colors) => {
        setBackgroundStyle({
          background: colors.gradient,
          '--primary-color': colors.primary,
          '--secondary-color': colors.secondary
        });
        setIsLoading(false);
      });
    };

    // Try primary image first, then fallback
    if (imageUrl) {
      extractColors(imageUrl);
    } else if (fallbackImage) {
      extractColors(fallbackImage);
    } else {
      extractColors(null);
    }
  }, [imageUrl, fallbackImage]);

  return {
    backgroundStyle,
    isLoading
  };
};

export default useDynamicBackground;