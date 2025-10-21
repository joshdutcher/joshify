import { useEffect, useCallback } from 'react';
import type { SelectedPlaylist } from '../types';
import { trackPageView } from '../utils/analytics';

/**
 * History state stored in browser history
 */
interface HistoryState {
    view: string;
    data: SelectedPlaylist;
    searchQuery?: string | undefined;
}

/**
 * Navigation history hook that integrates with browser History API
 * Enables browser back/forward buttons to work with app navigation
 */
export const useNavigationHistory = (
    currentView: string,
    selectedPlaylist: SelectedPlaylist,
    setCurrentView: (_view: string) => void,
    setSelectedPlaylist: (_data: SelectedPlaylist) => void,
    setSearchQuery?: (_query: string) => void
) => {
    /**
     * Generate URL path based on view and data
     */
    const generatePath = useCallback((view: string, data: SelectedPlaylist, searchQuery?: string): string => {
        switch (view) {
            case 'home':
                return '/';
            case 'playlist':
                if (data && typeof data === 'object' && 'name' in data) {
                    const playlistName = data.name.toLowerCase().replace(/\s+/g, '-');
                    return `/playlist/${playlistName}`;
                }
                return '/';
            case 'project':
                if (data && typeof data === 'object' && 'id' in data) {
                    return `/project/${data.id}`;
                }
                return '/';
            case 'company':
                if (data && typeof data === 'object' && 'company' in data) {
                    const companyName = data.company.toLowerCase().replace(/\s+/g, '-');
                    return `/company/${companyName}`;
                }
                return '/';
            case 'domain':
                if (data && typeof data === 'object' && 'domain' in data) {
                    const domainName = data.domain.toLowerCase().replace(/\s+/g, '-');
                    return `/domain/${domainName}`;
                }
                return '/';
            case 'search':
                return searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search';
            case 'profile':
                return '/profile';
            default:
                return '/';
        }
    }, []);

    /**
     * Push a new navigation state to browser history
     */
    const pushNavigation = useCallback((
        view: string,
        data: SelectedPlaylist = null,
        searchQuery?: string
    ) => {
        // Create a serializable version of the data for history state
        // Remove non-serializable properties like React components
        let serializableData = null;
        if (data && typeof data === 'object') {
            const { icon: _icon, ...rest } = data as any;
            serializableData = rest;
        }

        const state: HistoryState = { view, data: serializableData, searchQuery };
        const path = generatePath(view, data, searchQuery);

        // Push new history entry
        window.history.pushState(state, '', path);

        // Track page view in analytics
        trackPageView(path);

        // Update React state with original data (including icon)
        setCurrentView(view);
        setSelectedPlaylist(data);
        if (setSearchQuery && searchQuery !== undefined) {
            setSearchQuery(searchQuery);
        }
    }, [generatePath, setCurrentView, setSelectedPlaylist, setSearchQuery]);

    /**
     * Replace current navigation state in browser history
     * Useful for updating without adding a new history entry
     */
    const replaceNavigation = useCallback((
        view: string,
        data: SelectedPlaylist = null,
        searchQuery?: string
    ) => {
        // Create a serializable version of the data for history state
        // Remove non-serializable properties like React components
        let serializableData = null;
        if (data && typeof data === 'object') {
            const { icon: _icon, ...rest } = data as any;
            serializableData = rest;
        }

        const state: HistoryState = { view, data: serializableData, searchQuery };
        const path = generatePath(view, data, searchQuery);

        // Replace current history entry
        window.history.replaceState(state, '', path);

        // Update React state with original data (including icon)
        setCurrentView(view);
        setSelectedPlaylist(data);
        if (setSearchQuery && searchQuery !== undefined) {
            setSearchQuery(searchQuery);
        }
    }, [generatePath, setCurrentView, setSelectedPlaylist, setSearchQuery]);

    /**
     * Handle browser back/forward button navigation
     */
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            const state = event.state as HistoryState | null;

            if (state) {
                // Restore state from history
                setCurrentView(state.view);
                setSelectedPlaylist(state.data);
                if (setSearchQuery && state.searchQuery !== undefined) {
                    setSearchQuery(state.searchQuery);
                }

                // Track page view for back/forward navigation
                const path = generatePath(state.view, state.data, state.searchQuery);
                trackPageView(path);
            } else {
                // No state (initial page load or external navigation) - go to home
                setCurrentView('home');
                setSelectedPlaylist(null);
                if (setSearchQuery) {
                    setSearchQuery('');
                }

                // Track home page view
                trackPageView('/');
            }
        };

        // Listen for popstate events (back/forward buttons)
        window.addEventListener('popstate', handlePopState);

        // Initialize history state on mount if needed
        if (!window.history.state) {
            // Create a serializable version for history state
            let serializableData = null;
            if (selectedPlaylist && typeof selectedPlaylist === 'object') {
                const { icon: _icon, ...rest } = selectedPlaylist as any;
                serializableData = rest;
            }

            const initialState: HistoryState = {
                view: currentView,
                data: serializableData
            };
            window.history.replaceState(initialState, '', generatePath(currentView, selectedPlaylist));
        }

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [currentView, selectedPlaylist, setCurrentView, setSelectedPlaylist, setSearchQuery, generatePath]);

    return {
        pushNavigation,
        replaceNavigation
    };
};

export default useNavigationHistory;
