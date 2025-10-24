/**
 * Asset URL resolver - returns local path in dev, CDN URL in production
 * Handles large assets (videos, music) that benefit from CDN delivery
 *
 * Small assets (album art, posters) remain local and don't use these helpers
 */

type AssetType = 'canvas' | 'music';

/**
 * Generic asset URL resolver with environment-aware routing
 * @param filename - Asset filename (e.g., 'beer-fridge.mp4')
 * @param assetType - Type of asset (canvas video or music file)
 * @returns Local path in dev, CDN URL in production, or null if filename is null
 */
const getAssetUrl = (filename: string | null, assetType: AssetType): string | null => {
    if (!filename) return null;

    // Configuration: CDN paths for each asset type
    const assetConfig: Record<AssetType, { path: string }> = {
        canvas: { path: 'assets/canvases' },
        music: { path: 'assets/music' }
    };

    const config = assetConfig[assetType];
    const useLocal = import.meta.env.VITE_USE_LOCAL_ASSETS === 'true';

    if (useLocal) {
        // Development: local public folder
        return `/${config.path}/${filename}`;
    }

    // Production: Cloudflare R2 CDN
    const cdnBaseUrl = import.meta.env.VITE_ASSET_CDN_BASE_URL;

    if (!cdnBaseUrl) {
        console.error('VITE_ASSET_CDN_BASE_URL environment variable is not set');
        return null;
    }

    return `${cdnBaseUrl}/${config.path}/${filename}`;
};

// Public API - maintains existing function names for backward compatibility
export const getCanvasUrl = (filename: string | null): string | null =>
    getAssetUrl(filename, 'canvas');

export const getMusicUrl = (filename: string | null): string | null =>
    getAssetUrl(filename, 'music');

/**
 * Get canvas poster URL - always local (small files don't need CDN)
 * @param filename - Canvas video filename (e.g., 'beer-fridge.mp4')
 * @returns Local poster path or null
 */
export const getCanvasPosterUrl = (filename: string | null): string | null => {
    if (!filename) return null;
    // Remove .mp4 extension and add -poster.webp
    const posterName = filename.replace('.mp4', '-poster.webp');
    return `/assets/images/posters/${posterName}`;
};
