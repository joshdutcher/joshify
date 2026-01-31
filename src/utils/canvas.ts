/**
 * Canvas video URL resolver
 * Returns local path in dev, Cloudflare R2 CDN URL in production
 */

/**
 * Get the appropriate canvas video URL based on environment
 * @param filename - Canvas video filename (e.g., 'beer-fridge.mp4')
 * @returns Local path in dev, Cloudflare R2 CDN URL in production, or null if filename not found
 */
export const getCanvasUrl = (filename: string | null): string | null => {
    if (!filename) return null;

    // Check if we should use local canvas videos (development)
    const useLocal = import.meta.env.VITE_USE_LOCAL_CANVAS === 'true';

    if (useLocal) {
        // Development: use local public folder
        return `/canvases/${filename}`;
    }

    // Production: use Backblaze B2 CDN
    const cdnBaseUrl = import.meta.env.VITE_CANVAS_CDN_URL;

    if (!cdnBaseUrl) {
        console.error('VITE_CANVAS_CDN_URL environment variable is not set');
        return null;
    }

    return `${cdnBaseUrl}/${filename}`;
};

/**
 * Get the appropriate music file URL based on environment
 * @param filename - Music filename (e.g., 'song.mp3')
 * @returns Local path in dev, Cloudflare R2 CDN URL in production, or null if filename not found
 */
export const getMusicUrl = (filename: string | null): string | null => {
    if (!filename) return null;

    // Check if we should use local music files (development)
    const useLocal = import.meta.env.VITE_USE_LOCAL_MUSIC === 'true';

    if (useLocal) {
        // Development: use local public folder
        return `/music/${filename}`;
    }

    // Production: use CDN
    const cdnBaseUrl = import.meta.env.VITE_MUSIC_CDN_URL;

    if (!cdnBaseUrl) {
        console.error('VITE_MUSIC_CDN_URL environment variable is not set');
        return null;
    }

    return `${cdnBaseUrl}/${filename}`;
};

/**
 * Get the best image source for color extraction
 * Prioritizes canvas poster (from video frame) over album art
 * @param canvasPoster - Canvas poster image URL (extracted from video)
 * @param albumArt - Album art image URL
 * @returns Best available image URL for color extraction, or null if none available
 */
export const getColorSourceImage = (
    canvasPoster: string | null | undefined,
    albumArt: string | null | undefined
): string | null => {
    // Prefer canvas poster (video frame) for more dynamic colors
    if (canvasPoster) return canvasPoster;
    // Fall back to album art
    if (albumArt) return albumArt;
    return null;
};
