/**
 * Canvas video URL resolver
 * Returns local path in dev, CDN path in production
 */

// Map of canvas filenames to their GitHub Release CDN URLs
const CDN_URLS: Record<string, string> = {
    'mobile-api-rebuild.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/mobile-api-rebuild.mp4',
    'beer-fridge.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/beer-fridge.mp4',
    'did-kansas-win.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/did-kansas-win.mp4',
    'wichitaradar.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/wichitaradar.mp4',
    'law-firm-startup-operations.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/law-firm-startup-operations.mp4',
    'startup-technology-infrastructure.mp4': 'https://github.com/joshdutcher/joshify/releases/download/v1.0.8/startup-technology-infrastructure.mp4',
};

/**
 * Get the appropriate canvas video URL based on environment
 * @param filename - Canvas video filename (e.g., 'beer-fridge.mp4')
 * @returns Local path in dev, CDN URL in production, or null if filename not found
 */
export const getCanvasUrl = (filename: string | null): string | null => {
    if (!filename) return null;

    // Check if we should use local canvas videos
    const useLocal = import.meta.env.VITE_USE_LOCAL_CANVAS === 'true';

    if (useLocal) {
    // Development: use local public folder
        return `/canvases/${filename}`;
    }

    // Production: use GitHub Releases CDN
    const cdnUrl = CDN_URLS[filename];
    return cdnUrl !== undefined ? cdnUrl : null;
};

/**
 * Extract filename from a full CDN URL
 * @param cdnUrl - Full CDN URL
 * @returns Filename only, or null if invalid
 */
export const extractFilename = (cdnUrl: string | null): string | null => {
    if (!cdnUrl) return null;
    const match = cdnUrl.match(/\/([^/]+\.mp4)$/);
    return match ? match[1] || null : null;
};
