import { useState } from 'react';

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('joshify_favorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const toggleFavorite = (projectId: string) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(projectId) ? next.delete(projectId) : next.add(projectId);
            localStorage.setItem('joshify_favorites', JSON.stringify([...next]));
            return next;
        });
    };

    const isFavorite = (projectId: string) => favorites.has(projectId);

    return { favorites, favoritedIds: [...favorites], toggleFavorite, isFavorite };
};

export default useFavorites;
