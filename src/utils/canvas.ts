/**
 * Canvas video URL resolver
 * Serves videos from local public folder (same domain) to avoid CORS issues
 */

/**
 * Get the canvas video URL
 * @param filename - Canvas video filename (e.g., 'beer-fridge.mp4')
 * @returns Local path to canvas video, or null if filename not provided
 *
 * NOTE: Previously used GitHub Releases CDN, but switched to serving from public folder
 * because GitHub doesn't set CORS headers, causing video loading failures in production
 */
export const getCanvasUrl = (filename: string | null): string | null => {
    if (!filename) return null;
    return `/canvases/${filename}`;
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
