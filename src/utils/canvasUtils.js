/**
 * Dynamic Canvas File Detection Utility
 * 
 * Automatically detects canvas video and image files based on project ID
 * using standardized naming conventions:
 * - Videos: /canvases/{project-id}.mp4
 * - Images: /canvases/{project-id}.jpg
 * - Fallback: Project album art if available
 */

/**
 * Check if a file exists by attempting to load it
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} - True if file exists and loads successfully
 */
const checkFileExists = async (url) => {
    try {
        const response = await fetch(url, { 
            method: 'HEAD',
            cache: 'no-cache'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};

/**
 * Check if an image loads successfully (alternative approach for images)
 * @param {string} url - The image URL to check
 * @returns {Promise<boolean>} - True if image loads successfully
 */
const checkImageExists = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

/**
 * Check if a video can be loaded (alternative approach for videos)
 * @param {string} url - The video URL to check
 * @returns {Promise<boolean>} - True if video can be loaded
 */
const checkVideoExists = (url) => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.onloadedmetadata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = url;
    });
};

/**
 * Generate standardized canvas file paths for a project
 * @param {string} projectId - The project ID
 * @returns {object} - Object containing potential video and image paths
 */
const getCanvasPaths = (projectId) => {
    if (!projectId) return { video: null, image: null };
  
    return {
        video: `/canvases/${projectId}.mp4`,
        image: `/canvases/${projectId}.jpg`
    };
};

/**
 * Dynamically detect available canvas files for a project
 * @param {object} project - The project object containing id and image
 * @returns {Promise<object>} - Canvas configuration with available files
 */
export const detectCanvasFiles = async (project) => {
    if (!project?.id) {
        return {
            video: null,
            image: null,
            fallback: project?.image || null,
            hasCanvas: false
        };
    }

    // First check if project has explicit canvas path
    const explicitVideo = project?.canvas;
    let videoPath = null;
    let hasVideo = false;

    if (explicitVideo) {
        // Use explicit canvas path from project data
        hasVideo = await checkVideoExists(explicitVideo);
        videoPath = hasVideo ? explicitVideo : null;
    }

    // If no explicit path or explicit path failed, try auto-generated path
    if (!hasVideo) {
        const paths = getCanvasPaths(project.id);
        hasVideo = await checkVideoExists(paths.video);
        videoPath = hasVideo ? paths.video : null;
    }

    // Check for canvas image file (always auto-generated for now)
    const paths = getCanvasPaths(project.id);
    const hasCanvasImage = await checkImageExists(paths.image);

    // Determine final configuration
    const config = {
        video: videoPath,
        image: hasCanvasImage ? paths.image : null,
        fallback: project?.image || null,
        hasCanvas: hasVideo || hasCanvasImage
    };

    // Debug logging
    console.log('Dynamic canvas detection:', {
        projectId: project.id,
        projectTitle: project.title,
        explicitCanvas: explicitVideo,
        checkedVideo: videoPath,
        hasVideo,
        checkedImage: paths.image,
        hasCanvasImage,
        finalConfig: config
    });

    return config;
};

/**
 * Cache for canvas detection results to avoid repeated file checks
 */
const canvasCache = new Map();

/**
 * Get canvas configuration with caching
 * @param {object} project - The project object
 * @returns {Promise<object>} - Cached or newly detected canvas configuration
 */
export const getCachedCanvasConfig = async (project) => {
    if (!project?.id) return { video: null, image: null, fallback: null, hasCanvas: false };
  
    const cacheKey = project.id;
  
    if (canvasCache.has(cacheKey)) {
        return canvasCache.get(cacheKey);
    }
  
    const config = await detectCanvasFiles(project);
    canvasCache.set(cacheKey, config);
  
    return config;
};

/**
 * Clear canvas cache (useful when files are added/removed during development)
 */
export const clearCanvasCache = () => {
    canvasCache.clear();
    console.log('Canvas cache cleared');
};

export default {
    detectCanvasFiles,
    getCachedCanvasConfig,
    clearCanvasCache
};