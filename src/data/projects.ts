import { Clock, Heart, User, Plus } from 'lucide-react';
import {
    Project,
    RawProject,
    ProjectCollection,
    PlaylistCollection,
    MadeForYouSection,
    SkillsArray,
    Skill
} from '@/types';
import { getCanvasUrl, getMusicUrl, getCanvasPosterUrl } from '@/utils/assetHelpers';
import { rawProjects } from './projects/index';

/**
 * Transform a raw project (with filenames) to a full project (with URLs)
 */
const transformProject = (raw: RawProject): Project => ({
    ...raw,
    musicFile: raw.musicFile ? getMusicUrl(raw.musicFile) : null,
    canvas: raw.canvas ? getCanvasUrl(raw.canvas) : null,
    canvasPoster: raw.canvasPoster ? getCanvasPosterUrl(raw.canvasPoster) : null
});

/**
 * All projects including inactive ones (for admin/debugging purposes)
 */
export const allProjects: readonly Project[] = rawProjects.map(transformProject);

/**
 * Active projects only (filtered for display)
 * Projects are active by default unless explicitly set to active: false
 */
export const projects: readonly Project[] = allProjects.filter(p => p.active !== false);

// Helper function to get project objects by IDs with type safety
// Only returns active projects
const getProjectsByIds = (ids: readonly string[]): readonly Project[] =>
    ids.map(id => projects.find(p => p.id === id)).filter((project): project is Project => project !== undefined);

// Typed project collections (automatically filtered to active projects only)
export const campbellZafarProjects: ProjectCollection = getProjectsByIds(['law-firm-startup-operations', 'startup-technology-infrastructure']);
export const ddxProjects: ProjectCollection = getProjectsByIds(['election-data-pipeline', 'democracy-engine']);
export const adHocProjects: ProjectCollection = getProjectsByIds(['healthcare-etl', 'healthcare-api-extensions', 'medigap-integration']);
export const dataEngineeringProjects: ProjectCollection = getProjectsByIds(['election-data-pipeline', 'healthcare-etl', 'healthcare-api-extensions', 'medigap-integration']);
export const recentWork: ProjectCollection = getProjectsByIds(['joshify', 'startup-technology-infrastructure', 'law-firm-startup-operations', 'election-data-pipeline', 'democracy-engine', 'beer-fridge', 'did-kansas-win', 'wichita-radar']);
export const topHits: ProjectCollection = getProjectsByIds(['law-firm-startup-operations', 'election-data-pipeline', 'api-engine-optimization', 'healthcare-etl', 'healthcare-api-extensions', 'mobile-api-rebuild']);
export const sideProjects: ProjectCollection = getProjectsByIds(['joshify', 'beer-fridge', 'did-kansas-win', 'wichita-radar']);
export const defaultNowPlaying: ProjectCollection = getProjectsByIds(['did-kansas-win']);

// Typed playlists
export const playlists: PlaylistCollection = [
    {
        name: 'Recently Played',
        icon: Clock,
        projects: recentWork,
        description: 'Fresh out the studio. Latest work from 2024-2026.',
        image: null,
        employer: false
    },
    {
        name: 'Top Hits',
        icon: Heart,
        projects: topHits,
        description: 'The classics that made the cut. Career-defining work.',
        image: null,
        employer: false
    },
    {
        name: 'Side Projects',
        icon: User,
        projects: sideProjects,
        description: 'After hours creativity. Personal passion projects and experiments.',
        image: null,
        employer: false
    },
    {
        name: 'Campbell Zafar Law',
        icon: Plus,
        projects: campbellZafarProjects,
        description: 'Founding Operations & Technology Manager building startup infrastructure from the ground up.',
        image: '/assets/images/album-art/campbell-zafar.png',
        employer: true
    },
    {
        name: 'DDx',
        icon: Plus,
        projects: ddxProjects,
        description: 'Software Engineer delivering election data infrastructure for 20.4M voters during 2024 presidential cycle.',
        image: '/assets/images/album-art/ddx.png',
        employer: true
    },
    {
        name: 'Ad Hoc',
        icon: Plus,
        projects: adHocProjects,
        description: 'Software Engineer III powering Medicare.gov for millions of Americans. 3.5 years of healthcare tech.',
        image: '/assets/images/album-art/ad-hoc.png',
        employer: true
    },
    {
        name: 'Data Engineering',
        icon: Plus,
        projects: dataEngineeringProjects,
        description: 'Moving millions of records. High-volume pipelines and ETL mastery.',
        image: null,
        employer: false
    }
] as const;

// Made for You section configuration with type safety
export const madeForYou: MadeForYouSection = [
    playlists.find(p => p.name === 'Recently Played'),
    playlists.find(p => p.name === 'Top Hits'),
    playlists.find(p => p.name === 'Side Projects'),
    playlists.find(p => p.name === 'Campbell Zafar Law'),
    playlists.find(p => p.name === 'DDx')
] as const;

// Skills array - consolidated and typed
export const skills: SkillsArray = [
    Skill.PYTHON,
    Skill.GO,
    Skill.JAVASCRIPT,
    'AWS', // Keep some non-enum values for now to maintain compatibility
    Skill.SNOWFLAKE,
    Skill.ETL_PIPELINES,
    Skill.API_DEVELOPMENT,
    Skill.ANDROID_DEVELOPMENT,
    'PHP',
    'Docker',
    'CI/CD'
] as const;
