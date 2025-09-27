import { useState, useEffect } from 'react';
import ColorExtractor from '../utils/colorExtractor';

interface BackgroundStyle {
    background: string;
    '--primary-color'?: string;
    '--secondary-color'?: string;
}

const useDynamicBackground = (imageUrl: string | null, fallbackImage: string | null = null) => {
    const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
        background: 'linear-gradient(to bottom, rgb(40, 40, 40) 0%, rgb(40, 40, 40) 50%)'
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const extractColors = (url: string | null) => {
            if (!url) {
                // Use default gradient when no image
                setBackgroundStyle({
                    background: 'linear-gradient(to bottom, rgb(40, 40, 40) 0%, rgb(40, 40, 40) 50%)'
                });
                return;
            }

            setIsLoading(true);
      
            ColorExtractor.extractColors(url, (colors) => {
                const newStyle: BackgroundStyle = {
                    background: colors.background
                };
                if (colors['--primary-color']) {
                    newStyle['--primary-color'] = colors['--primary-color'];
                }
                setBackgroundStyle(newStyle);
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