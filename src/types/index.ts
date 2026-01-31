import { LucideIcon } from 'lucide-react';

/**
 * Consolidated Skills Enum - Standardized skill categories
 * Consolidates similar skills like "API Development" vs "APIs"
 */
/* eslint-disable no-unused-vars */
export enum Skill {
  // Programming Languages
  PYTHON = 'Python',
  JAVASCRIPT = 'JavaScript',
  GO = 'Go',
  PHP_LUMEN = 'PHP Lumen',

  // Development Areas
  API_DEVELOPMENT = 'API Development',
  WEB_DEVELOPMENT = 'Web Development',
  ANDROID_DEVELOPMENT = 'Android Development',
  SERVERLESS_DEVELOPMENT = 'Serverless Development',
  AI_ASSISTED_DEVELOPMENT = 'AI-Assisted Development',

  // Data & Infrastructure
  ETL_PIPELINES = 'ETL Pipelines',
  DATA_TRANSFORMATION = 'Data Transformation',
  SNOWFLAKE = 'Snowflake',
  AWS_LAMBDA = 'AWS Lambda',
  DYNAMODB = 'DynamoDB',
  SNS_SQS_MESSAGING = 'SNS/SQS Messaging',

  // Frameworks & Tools
  NODE_JS = 'Node.js',
  EXPRESS = 'Express',
  MATERIAL_DESIGN_3 = 'Material Design 3',
  PURECSS = 'PureCSS',

  // APIs & Integration
  WEATHER_APIS = 'Weather APIs',
  CAMPAIGN_DATA_SYSTEMS = 'Campaign Data Systems',
  HTML_TEMPLATING = 'HTML Templating',

  // Performance & Optimization
  PERFORMANCE_OPTIMIZATION = 'Performance Optimization',
  PERFORMANCE_ENGINEERING = 'Performance Engineering',
  API_OPTIMIZATION = 'API Optimization',
  COST_REDUCTION = 'Cost Reduction',
  HIGH_AVAILABILITY = 'High Availability',

  // Design & UX
  RESPONSIVE_DESIGN = 'Responsive Design',
  COMPONENT_ARCHITECTURE = 'Component Architecture',
  SEO_STRATEGY = 'SEO Strategy',

  // Healthcare & Compliance
  HEALTHCARE = 'Healthcare',
  PRODUCTION_SUPPORT = 'Production Support',
  PROCESS_AUTOMATION = 'Process Automation',

  // Leadership & Management
  TEAM_LEADERSHIP = 'Team Leadership',
  CROSS_FUNCTIONAL_COLLABORATION = 'Cross-functional Collaboration',
  PROJECT_MANAGEMENT = 'Project Management',
  VENDOR_COORDINATION = 'Vendor Coordination',
  TIMELINE_MANAGEMENT = 'Timeline Management',
  PROCUREMENT = 'Procurement',
  LAUNCH_STRATEGY = 'Launch Strategy',

  // Infrastructure & Admin
  GOOGLE_WORKSPACE_ADMINISTRATION = 'Google Workspace Administration',
  NETWORK_CONFIGURATION = 'Network Configuration',
  VOIP_SYSTEMS = 'VoIP Systems',
  HARDWARE_SETUP = 'Hardware Setup',

  // AI & Emerging Tech
  CLAUDE_CODE = 'Claude Code',
  MCP_SERVER_INTEGRATION = 'MCP Server Integration',
  AI_PROMPT_ENGINEERING = 'AI Prompt Engineering',
}
/* eslint-enable no-unused-vars */

/**
 * Album Categories Enum - Consolidated project categories
 */
/* eslint-disable no-unused-vars */
export enum AlbumCategory {
  API_DEVELOPMENT = 'API Development',
  WEB_DEVELOPMENT = 'Web Development',
  ANDROID_DEVELOPMENT = 'Android Development',
  GO_DEVELOPMENT = 'Go Development',
  CLOUD_INFRASTRUCTURE = 'Cloud Infrastructure',
  GOVERNMENT_HEALTHCARE = 'Government Healthcare',
  MEDIA_TECHNOLOGY = 'Media Technology',
  CAMPBELL_ZAFAR_LAW = 'Campbell Zafar Law',
  PRESIDENTIAL_ELECTION_2024 = '2024 Presidential Election',
}
/* eslint-enable no-unused-vars */

/**
 * Project interface with strict typing
 */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly album: AlbumCategory;
  readonly duration: string;
  readonly image: string;
  readonly year: string;
  readonly impact: string | number | null;
  readonly description: string;
  readonly skills: readonly Skill[];
  readonly demoUrl: string | null;
  readonly githubUrl: string | null;
  readonly musicFile: string | null; // URL to the song MP3 file
  readonly projectStory: string | null; // First-person story used to generate song lyrics
  readonly sunoLyrics: string | null; // Song lyrics with newlines preserved (use white-space: pre-line to render)
  readonly displayLyrics: string | null; // Lyrics to display in the UI (may differ from sunoLyrics)
  readonly sunoStyle: string | null; // Style prompt for Suno AI music generation
  readonly canvas: string | null;
  readonly canvasPoster: string | null; // Poster image for canvas video
  readonly albumArtBasedOn: string | null;
  readonly active?: boolean; // Whether to show this project (defaults to true if not specified)
}

/**
 * Raw project data before helper functions are applied
 * Used in individual project files - musicFile, canvas, canvasPoster are just filenames
 */
export interface RawProject {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly album: AlbumCategory;
  readonly duration: string;
  readonly image: string;
  readonly year: string;
  readonly impact: string | number | null;
  readonly description: string;
  readonly skills: readonly Skill[];
  readonly demoUrl: string | null;
  readonly githubUrl: string | null;
  readonly musicFile: string | null; // Just the filename (e.g., 'project.mp3')
  readonly projectStory: string | null;
  readonly sunoLyrics: string | null;
  readonly displayLyrics: string | null;
  readonly sunoStyle: string | null;
  readonly canvas: string | null; // Just the filename (e.g., 'project.mp4')
  readonly canvasPoster: string | null; // Just the filename (e.g., 'project.mp4')
  readonly albumArtBasedOn: string | null;
  readonly active?: boolean;
}

/**
 * Playlist interface with strict typing
 */
export interface Playlist {
  readonly name: string;
  readonly icon: LucideIcon;
  readonly projects: readonly Project[];
  readonly description: string;
  readonly image: string | null;
  readonly employer: boolean;
}

/**
 * Type for project collections - helper arrays of projects
 */
export type ProjectCollection = readonly Project[];

/**
 * Type for playlist collections
 */
export type PlaylistCollection = readonly Playlist[];

/**
 * Made for You section type
 */
export type MadeForYouSection = readonly (Playlist | undefined)[];

/**
 * Skills array type
 */
export type SkillsArray = readonly string[];

/**
 * Union type for valid skill values (for validation)
 */
export type ValidSkill = `${Skill}`;

/**
 * Union type for valid album category values (for validation)
 */
export type ValidAlbumCategory = `${AlbumCategory}`;

/**
 * Special selection types for navigation states
 */
export interface CompanySelection {
  company: string;
}

export interface DomainSelection {
  domain: string;
}

/**
 * Union type for selectedPlaylist state
 */
export type SelectedPlaylist = Project | Playlist | CompanySelection | DomainSelection | null;

/**
 * Component prop interfaces
 */

// Navigation props interface
export interface NavigationProps {
  currentlyPlaying: Project | null;
  isPlaying: boolean;
  currentPlaylist: Playlist | null;
  onPlayProject: (_project: Project, _playlist?: Playlist | null) => void;
  onNavigateToProject: (_project: Project) => void;
  onNavigateToPlaylist: (_playlist: Playlist) => void;
  onNavigateToCompany: (_companyName: string) => void;
  onNavigateToDomain: (_domainName: string) => void;
  onNavigateToProfile: () => void;
}

// Card component props
export interface CardItemProps {
  item: Project | Playlist;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  isPlaying?: boolean;
}

// Home view props
export interface HomeViewProps extends NavigationProps {}

// Project canvas props
export interface ProjectCanvasProps {
  project: Project;
  isPlaying: boolean;
}

// Color extraction result
export interface ColorExtractionResult {
  background: string;
  '--primary-color'?: string;
}