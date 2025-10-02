import { Clock, Heart, User, Plus } from 'lucide-react';
import {
    Project,
    ProjectCollection,
    PlaylistCollection,
    MadeForYouSection,
    SkillsArray,
    Skill,
    AlbumCategory
} from '@/types';
import { getCanvasUrl } from '@/utils/canvas';

// Project data structure with strict typing
export const projects: readonly Project[] = [
    {
        id: 'election-data-pipeline',
        title: 'Election Data Pipeline',
        artist: 'Project - DDx',
        album: AlbumCategory.PRESIDENTIAL_ELECTION_2024,
        duration: '8 months',
        image: '/album-art/ddx-election.png',
        year: '2024',
        impact: '20.4M records',
        description: 'Mission-critical data engineering delivering 20.4 million voter engagement records to campaign systems during the final two months of the 2024 presidential election. Built sophisticated Python ETL pipelines that transformed and routed high-volume survey data while logging all transactions in Snowflake for full traceability. Designed a tunable throttling mechanism to manage throughput and ensure reliable, large-scale data transfer under extreme time pressure. The system preserved integrity across millions of daily records, enabling timely voter outreach during a decisive election period, showcasing expertise in high-stakes data engineering and operational problem-solving.',
        skills: [Skill.PYTHON, Skill.SNOWFLAKE, Skill.ETL_PIPELINES, Skill.DATA_TRANSFORMATION, Skill.CAMPAIGN_DATA_SYSTEMS],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: 'Tubular Bells by Mike Oldfield'
    },
    {
        id: 'mobile-api-rebuild',
        title: 'Mobile API Rebuild',
        artist: 'Project - BG Products',
        album: AlbumCategory.API_DEVELOPMENT,
        duration: '2 weeks',
        image: '/album-art/mobile-api.png',
        year: '2019',
        impact: '1000% faster',
        description: 'Complete API backend rebuild in 2 weeks delivering a 1000% performance improvement for automotive mobile applications. Replaced legacy systems with modern, scalable architecture while automating vendor data integration through Azure Functions. The new system dramatically improved user experience and operational efficiency, demonstrating expertise in performance optimization and cloud-native development. This project showcases the ability to modernize critical business systems while maintaining data integrity and minimizing downtime.',
        skills: [Skill.API_DEVELOPMENT, Skill.PHP_LUMEN, Skill.PERFORMANCE_OPTIMIZATION],
        demoUrl: null,
        githubUrl: null,
        canvas: getCanvasUrl('mobile-api-rebuild.mp4'),
        albumArtBasedOn: 'Run The Jewels 2 by Run The Jewels'
    },
    {
        id: 'healthcare-etl',
        title: 'Medicare.gov ETL',
        artist: 'Project - Ad Hoc',
        album: AlbumCategory.API_DEVELOPMENT,
        duration: '3.5 years',
        image: '/album-art/healthcare-etl.png',
        year: '2023',
        impact: '982K enrolled',
        description: 'Crucial healthcare data infrastructure processing millions of daily health insurance records for Medicare.gov. Engineered high-volume ETL pipelines that maintained 100% uptime during Open Enrollment periods, handling peak loads of 80,000 requests per minute and enabling 982,000 people to sign up for Medicare. Built robust, fault-tolerant systems ensuring seamless access to healthcare information for millions of Americans during critical enrollment windows. This role required deep expertise in government compliance, healthcare data standards, and building systems that never fail when people need them most.',
        skills: [Skill.PYTHON, Skill.ETL_PIPELINES, Skill.API_DEVELOPMENT, Skill.HIGH_AVAILABILITY, Skill.DATA_TRANSFORMATION],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: 'Ready to Die by The Notorious B.I.G.'
    },
    {
        id: 'democracy-engine',
        title: 'Democracy Engine',
        artist: 'Project - DDx',
        album: AlbumCategory.CLOUD_INFRASTRUCTURE,
        duration: '8 months',
        image: '/album-art/democracy-engine.png',
        year: '2024',
        impact: 'Scalable',
        description: 'Developed and enhanced serverless applications within existing AWS infrastructure supporting high-volume election data operations. Created new Lambda functions and updated existing ones to process voter engagement data, working with DynamoDB for data storage and SNS/SQS messaging systems for reliable data flow. Built robust Python-based serverless functions that automatically handled variable election data loads while maintaining performance and reliability. Leveraged existing IAM policies and cloud architecture to deliver scalable data processing solutions under tight deadlines. This project demonstrates expertise in serverless development and the ability to build efficient applications within established cloud environments.',
        skills: [Skill.AWS_LAMBDA, Skill.PYTHON, Skill.SERVERLESS_DEVELOPMENT, Skill.DYNAMODB, Skill.SNS_SQS_MESSAGING],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: 'Born This Way by Lady Gaga'
    },
    {
        id: 'healthcare-api-extensions',
        title: 'Healthcare API Extensions',
        artist: 'Project - Ad Hoc',
        album: AlbumCategory.GOVERNMENT_HEALTHCARE,
        duration: '3.5 years',
        image: '/album-art/healthcare-api-extensions.png',
        year: '2023',
        impact: 'Healthcare',
        description: 'Extended and automated critical healthcare APIs to meet evolving client requirements while maintaining 100% system reliability. Led rapid response efforts to diagnose and resolve production incidents, ensuring uninterrupted access to healthcare services. Fostered seamless communication between engineering and product teams, translating complex technical concepts for non-technical stakeholders. This role required balancing technical excellence with clear communication, demonstrating the ability to deliver robust solutions while building bridges across organizational boundaries in high-stakes government healthcare systems.',
        skills: [Skill.API_DEVELOPMENT, Skill.HEALTHCARE, Skill.PRODUCTION_SUPPORT, Skill.PROCESS_AUTOMATION, Skill.CROSS_FUNCTIONAL_COLLABORATION],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: 'The Low End Theory by A Tribe Called Quest'
    },
    {
        id: 'medigap-integration',
        title: 'Medigap Integration',
        artist: 'Project - Ad Hoc',
        album: AlbumCategory.GOVERNMENT_HEALTHCARE,
        duration: '8 weeks',
        image: '/album-art/medigap-integration.png',
        year: '2023',
        impact: 'National scale',
        description: 'Designed and delivered end-to-end infrastructure for integrating Medigap health insurance plans into Medicare.gov. Built new ETL pipelines to ingest, transform, and normalize state-specific plan data, mapping inconsistent naming conventions into a unified reference set. Engineered optimized database models and API endpoints to support fast, reliable access for millions of users. Implemented fault isolation and rollback mechanisms so Medigap failures never disrupted the core Medicare ETL, ensuring uninterrupted service during enrollment. This project showcases full-stack ownership, from data modeling and system resilience to delivering accurate, user-facing healthcare information at national scale.',
        skills: [Skill.GO, Skill.ETL_PIPELINES, Skill.API_DEVELOPMENT, Skill.DATA_TRANSFORMATION, Skill.HIGH_AVAILABILITY, Skill.HEALTHCARE],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: null
    },
    {
        id: 'snt-finance-api',
        title: 'API Engine Optimization',
        artist: 'Project - SNT Media',
        album: AlbumCategory.MEDIA_TECHNOLOGY,
        duration: '2 years',
        image: '/album-art/snt-finance-api.png',
        year: '2017',
        impact: '$18K',
        description: 'Executed comprehensive optimization of data-fetching API engine, achieving a 98% reduction in API calls and generating $18,000 in monthly cost savings while simultaneously enhancing data precision. Architected intelligent caching and batching strategies that transformed system efficiency without compromising accuracy. This project demonstrates leadership in both technical innovation and business impact, showing how strategic engineering decisions can deliver significant ROI while improving system performance.',
        skills: [Skill.API_OPTIMIZATION, Skill.COST_REDUCTION, Skill.TEAM_LEADERSHIP, Skill.PERFORMANCE_ENGINEERING],
        demoUrl: null,
        githubUrl: null,
        canvas: null,
        albumArtBasedOn: 'Nevermind the Bollocks, Here\'s the Sex Pistols by The Sex Pistols'
    },
    {
        id: 'beer-fridge',
        title: 'Beer Fridge',
        artist: 'Project',
        album: AlbumCategory.ANDROID_DEVELOPMENT,
        duration: 'In Progress',
        image: '/album-art/beer-fridge.png',
        year: '2025',
        impact: null,
        description: 'Android application for personal collection management currently in development. Features modern Material Design 3 interface built on robust MVVM architecture with Hilt dependency injection. Key highlights include intelligent fuzzy matching for item lookup, smart duplicate detection, and seamless CameraX integration for quick item scanning. Utilizes Room database for efficient local storage with whisper-quiet performance. The app demonstrates expertise in contemporary Android development patterns while delivering an intuitive user experience that rivals Google first-party applications. This project showcases the ability to balance technical sophistication with accessibility, proving that complex functionality can be elegantly simplified.',
        skills: [Skill.AI_ASSISTED_DEVELOPMENT, Skill.CLAUDE_CODE],
        demoUrl: null,
        githubUrl: null,
        canvas: getCanvasUrl('beer-fridge.mp4'),
        albumArtBasedOn: 'Dark Side of the Moon by Pink Floyd'
    },
    {
        id: 'did-kansas-win',
        title: 'Did Kansas Win?',
        artist: 'Project',
        album: AlbumCategory.WEB_DEVELOPMENT,
        duration: '2 weeks',
        image: '/album-art/did-kansas-win.png',
        year: '2024',
        impact: 'Trivial',
        description: 'My first AI-Assisted experiment, this barebones single-purpose web application provides real-time Kansas Jayhawks basketball results. Built with Node.js and Express, featuring live ESPN API integration and responsive design. The project demonstrates clean, focused development principles and API integration skills while solving a specific user need with minimal complexity. Sometimes the best solutions are the simplest ones, and this project showcases the ability to deliver exactly what users want without unnecessary features.',
        skills: [Skill.AI_ASSISTED_DEVELOPMENT, Skill.NODE_JS, Skill.EXPRESS, Skill.RESPONSIVE_DESIGN,],
        demoUrl: 'https://www.didkansaswin.com',
        githubUrl: 'https://github.com/joshdutcher/didkansaswin',
        canvas: getCanvasUrl('did-kansas-win.mp4'),
        albumArtBasedOn: 'Graduation by Kanye West'
    },
    {
        id: 'wichita-radar',
        title: 'Wichita Radar',
        artist: 'Project',
        album: AlbumCategory.GO_DEVELOPMENT,
        duration: 'decades',
        image: '/album-art/wichita-radar.png',
        year: '2024',
        impact: 'Locally popular',
        description: 'Real-time weather monitoring dashboard built with Go, aggregating live radar and satellite imagery specifically for Wichita, KS. Features automatic data refresh, mobile-responsive design using PureCSS, and efficient API integration with weather services. This project showcases Go programming skills and the ability to create practical, location-specific applications that serve real user needs. The clean, performant architecture demonstrates expertise in backend development and responsive web design.',
        skills: [Skill.GO, Skill.HTML_TEMPLATING, Skill.WEATHER_APIS, Skill.PURECSS],
        demoUrl: 'https://wichitaradar.com',
        githubUrl: 'https://github.com/joshdutcher/wichitaradar',
        canvas: getCanvasUrl('wichitaradar.mp4'),
        albumArtBasedOn: 'Discovery by Daft Punk'
    },
    {
        id: 'law-firm-startup-operations',
        title: 'Law Firm Startup Operations',
        artist: 'Project - Campbell Zafar Law',
        album: AlbumCategory.CAMPBELL_ZAFAR_LAW,
        duration: '4 months',
        image: '/album-art/law-firm-startup-operations.png',
        year: '2025',
        impact: 'Coordinated',
        description: 'Orchestrated the complex launch of a boutique law firm through multi-vendor project management and timeline coordination. Served as primary liaison managing photographers, designers, signage vendors, and printing services while ensuring brand assets, signage, and marketing collateral were delivered on schedule for launch day. Successfully coordinated office setup logistics including furniture procurement, equipment installation, and workflow design. This project demonstrates expertise in managing multiple concurrent deliverables with tight interdependencies, ensuring a seamless launch experience that allowed the attorneys to focus on client service from day one.',
        skills: [Skill.PROJECT_MANAGEMENT, Skill.VENDOR_COORDINATION, Skill.TIMELINE_MANAGEMENT, Skill.PROCUREMENT, Skill.LAUNCH_STRATEGY],
        demoUrl: null,
        githubUrl: null,
        canvas: getCanvasUrl('law-firm-startup-operations.mp4'),
        albumArtBasedOn: 'BRAT by Charli xcx'
    },
    {
        id: 'startup-technology-infrastructure',
        title: 'Startup Technology Infrastructure',
        artist: 'Project - Campbell Zafar Law',
        album: AlbumCategory.CAMPBELL_ZAFAR_LAW,
        duration: '5 months',
        image: '/album-art/startup-technology-infrastructure.png',
        year: '2025',
        impact: 'Configured',
        description: 'Architected and implemented comprehensive technology infrastructure for a legal startup from the ground up. Configured Google Workspace with domain-wide settings, user permissions, and security policies while building the firm\'s professional website on Squarespace with integrated SEO strategy. Implemented VoIP phone systems, mesh Wi-Fi networking, and cross-device printer configuration ensuring seamless office connectivity. Led hands-on technical setup of computers, peripherals, and office networking infrastructure. This project showcases the ability to translate business requirements into technical solutions while maintaining security best practices and operational efficiency in a professional services environment.',
        skills: [Skill.GOOGLE_WORKSPACE_ADMINISTRATION, Skill.NETWORK_CONFIGURATION, Skill.VOIP_SYSTEMS, Skill.WEB_DEVELOPMENT, Skill.SEO_STRATEGY, Skill.HARDWARE_SETUP],
        demoUrl: null,
        githubUrl: null,
        canvas: getCanvasUrl('startup-technology-infrastructure.mp4'),
        albumArtBasedOn: 'Computer World by Kraftwerk'
    },
    {
        id: 'joshify',
        title: 'Joshify',
        artist: 'Project',
        album: AlbumCategory.WEB_DEVELOPMENT,
        duration: '6 months',
        image: '/album-art/joshify.png',
        year: '2025',
        impact: 'Meta',
        description: 'Experimental portfolio project exploring AI-assisted development ("vibe coding", but I hate that term) by transforming my traditional developer resume into an immersive Spotify clone, intended to stand out in a crowded field. I used Claude Code almost exclusively for the code, and a combination of AI image and video generating tools for the album art images and canvas videos. I did give Claude Code specific instructions on some of the code architecture and principles. This site features authentic Spotify UI patterns including advanced column resizing, comprehensive search functionality, and canvas video backgrounds. The site presents development projects as "tracks" with rich metadata, playlists for different work categories, and a fully functional "now playing" system. Sadly, the site does not actually play any music. Yet.',
        skills: [Skill.CLAUDE_CODE, Skill.MCP_SERVER_INTEGRATION, Skill.AI_PROMPT_ENGINEERING, Skill.COMPONENT_ARCHITECTURE, Skill.AI_ASSISTED_DEVELOPMENT],
        demoUrl: null,
        githubUrl: 'https://github.com/joshdutcher/joshify',
        canvas: null,
        albumArtBasedOn: 'Computer World by Kraftwerk'
    }
] as const;

// Helper function to get project objects by IDs with type safety
const getProjectsByIds = (ids: readonly string[]): readonly Project[] =>
    ids.map(id => projects.find(p => p.id === id)).filter((project): project is Project => project !== undefined);

// Typed project collections
export const campbellZafarProjects: ProjectCollection = getProjectsByIds(['law-firm-startup-operations', 'startup-technology-infrastructure']);
export const ddxProjects: ProjectCollection = getProjectsByIds(['election-data-pipeline', 'democracy-engine']);
export const adHocProjects: ProjectCollection = getProjectsByIds(['healthcare-etl', 'healthcare-api-extensions', 'medigap-integration']);
export const dataEngineeringProjects: ProjectCollection = getProjectsByIds(['election-data-pipeline', 'healthcare-etl', 'healthcare-api-extensions', 'medigap-integration']);
export const recentWork: ProjectCollection = getProjectsByIds(['joshify', 'startup-technology-infrastructure', 'law-firm-startup-operations', 'election-data-pipeline', 'democracy-engine', 'beer-fridge', 'did-kansas-win', 'wichita-radar']);
export const topHits: ProjectCollection = getProjectsByIds(['law-firm-startup-operations', 'election-data-pipeline', 'snt-finance-api', 'healthcare-etl', 'healthcare-api-extensions', 'mobile-api-rebuild']);
export const sideProjects: ProjectCollection = getProjectsByIds(['joshify', 'beer-fridge', 'did-kansas-win', 'wichita-radar']);
export const defaultNowPlaying: ProjectCollection = getProjectsByIds(['did-kansas-win']);

// Typed playlists
export const playlists: PlaylistCollection = [
    {
        name: 'Recently Played',
        icon: Clock,
        projects: recentWork,
        description: 'Fresh out the studio. Latest work from 2024-2025.',
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
        image: '/album-art/campbell-zafar.png',
        employer: true
    },
    {
        name: 'DDx',
        icon: Plus,
        projects: ddxProjects,
        description: 'Software Engineer delivering election data infrastructure for 20.4M voters during 2024 presidential cycle.',
        image: '/album-art/ddx.png',
        employer: true
    },
    {
        name: 'Ad Hoc',
        icon: Plus,
        projects: adHocProjects,
        description: 'Software Engineer III powering Medicare.gov for millions of Americans. 3.5 years of healthcare tech.',
        image: '/album-art/ad-hoc.png',
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