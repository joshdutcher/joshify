import type { Project, Playlist } from '../types';

/**
 * Type guard to check if an item is a Project
 */
export function isProject(item: Project | Playlist | any): item is Project {
  return item && typeof item === 'object' && 'id' in item && 'title' in item && 'artist' in item;
}

/**
 * Type guard to check if an item is a Playlist
 */
export function isPlaylist(item: Project | Playlist | any): item is Playlist {
  return item && typeof item === 'object' && 'name' in item && 'projects' in item && 'icon' in item;
}

/**
 * Type guard to check if an item has a type property with 'project' value
 */
export function isProjectType(item: any): boolean {
  return item && item.type === 'project';
}

/**
 * Type guard to check if an item has a type property with 'playlist' value
 */
export function isPlaylistType(item: any): boolean {
  return item && item.type === 'playlist';
}