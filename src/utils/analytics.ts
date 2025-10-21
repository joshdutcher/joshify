/**
 * Analytics tracking utility for Matomo
 * Provides page view tracking for single-page application navigation
 */

/**
 * TypeScript declaration for Matomo's global _paq array
 * This extends the Window interface to include the Matomo tracker
 */
declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        _paq?: Array<Array<string | number | Record<string, unknown>>>;
    }
}

/**
 * Track a page view in Matomo analytics
 *
 * This function should be called whenever the user navigates to a new view
 * in the single-page application. It tells Matomo to record a new page view
 * with the specified path.
 *
 * @param path - The URL path to track (e.g., '/project/did-kansas-win')
 *
 * @example
 * ```typescript
 * // Track navigation to a project detail page
 * trackPageView('/project/did-kansas-win');
 *
 * // Track navigation to a playlist
 * trackPageView('/playlist/campbell-zafar-law');
 *
 * // Track search results
 * trackPageView('/search?q=react');
 * ```
 */
export const trackPageView = (path: string): void => {
    // Check if Matomo's _paq array exists
    if (window._paq) {
        // Set the custom URL for this page view
        window._paq.push(['setCustomUrl', path]);

        // Track the page view
        window._paq.push(['trackPageView']);

        // Optional: Log in development for debugging
        if (import.meta.env.DEV) {
            console.log('[Analytics] Page view tracked:', path);
        }
    } else {
        // Warn if Matomo isn't loaded (shouldn't happen in production)
        console.warn('[Analytics] Matomo tracking not available. Page view not tracked:', path);
    }
};

/**
 * Track a custom event in Matomo analytics
 *
 * This can be used for tracking user interactions beyond page views,
 * such as button clicks, downloads, or other engagement metrics.
 *
 * @param category - The event category (e.g., 'Video', 'Download')
 * @param action - The event action (e.g., 'Play', 'Click')
 * @param name - Optional event name (e.g., 'Canvas Video')
 * @param value - Optional numeric value associated with the event
 *
 * @example
 * ```typescript
 * // Track a canvas video play event
 * trackEvent('Video', 'Play', 'did-kansas-win-canvas');
 *
 * // Track a demo link click
 * trackEvent('Link', 'Click', 'External Demo');
 * ```
 */
export const trackEvent = (
    category: string,
    action: string,
    name?: string,
    value?: number
): void => {
    if (window._paq) {
        // Build event data array, filtering out undefined values
        const eventData: Array<string | number> = ['trackEvent', category, action];
        if (name !== undefined) {
            eventData.push(name);
        }
        if (value !== undefined) {
            eventData.push(value);
        }

        window._paq.push(eventData);

        if (import.meta.env.DEV) {
            console.log('[Analytics] Event tracked:', { category, action, name, value });
        }
    } else {
        console.warn('[Analytics] Matomo tracking not available. Event not tracked:', { category, action, name, value });
    }
};
