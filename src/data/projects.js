import { Clock, Heart, User, Plus } from 'lucide-react';

// Project data structure
export const projects = {
  recentWork: [
    {
      id: 'campbell-zafar',
      title: 'Campbell Zafar Law',
      artist: 'Founding Operations & Technology Manager',
      album: 'Legal Tech Startup',
      duration: '8 months',
      image: '/api/placeholder/300/300',
      year: '2025',
      plays: '∞',
      description: 'Complete business launch: Google Workspace setup, Squarespace website, VoIP systems, vendor coordination, and operational documentation.',
      skills: ['Business Operations', 'Google Workspace', 'Squarespace', 'Project Management'],
      demoUrl: null,
      githubUrl: null,
      canvas: {
        video: null,
        image: '/canvases/campbell-zafar.jpg',
        fallback: '/canvases/default.jpg'
      },
      featured: true
    },
    {
      id: 'ddx-election',
      title: 'Election Data Pipeline',
      artist: 'Software Engineer - DDx',
      album: '2024 Presidential Election',
      duration: '8 months',
      image: '/api/placeholder/300/300',
      year: '2024',
      plays: '20.4M',
      description: 'Delivered 20.4M voter records in final 2 months. Built Python ETL pipelines with AWS Lambda, DynamoDB, SNS, SQS, and Snowflake.',
      skills: ['Python', 'AWS', 'Snowflake', 'ETL', 'High-Volume Data'],
      demoUrl: null,
      githubUrl: null,
      canvas: {
        video: '/canvases/ddx-election.mp4',
        image: '/canvases/ddx-election.jpg',
        fallback: '/canvases/default.jpg'
      },
      featured: true
    }
  ],
  topHits: [
    {
      id: 'healthcare-etl',
      title: 'Healthcare.gov ETL',
      artist: 'Software Engineer III - Ad Hoc',
      album: 'Government Healthcare',
      duration: '3.5 years',
      image: '/api/placeholder/300/300',
      year: '2019-2023',
      plays: '982K',
      description: 'Built high-volume ETL pipelines processing millions of daily health insurance records. 100% uptime during Open Enrollment (80K requests/min).',
      skills: ['Python', 'ETL', 'APIs', 'High Availability', 'Healthcare'],
      demoUrl: null,
      githubUrl: null,
      canvas: {
        video: '/canvases/healthcare-etl.mp4',
        image: '/canvases/healthcare-etl.jpg',
        fallback: '/canvases/default.jpg'
      },
      featured: true
    },
    {
      id: 'mobile-api',
      title: 'Mobile API Rebuild',
      artist: 'Software Developer - BG Products',
      album: 'Automotive Tech',
      duration: '1.5 years',
      image: '/api/placeholder/300/300',
      year: '2018-2019',
      plays: '1000%',
      description: 'Built replacement API backend achieving 1000% speed increase. Automated vendor data ETL via Azure functions.',
      skills: ['API Development', 'Azure', 'Performance Optimization', 'ETL'],
      demoUrl: null,
      githubUrl: null,
      canvas: {
        video: null,
        image: '/canvases/mobile-api.jpg',
        fallback: '/canvases/default.jpg'
      }
    },
    {
      id: 'php-optimization',
      title: 'PHP Engine Optimization',
      artist: 'Lead Software Engineer - SNT Media',
      album: 'Media Technology',
      duration: '2 years',
      image: '/api/placeholder/300/300',
      year: '2015-2017',
      plays: '$18K',
      description: 'Revamped PHP data-fetching engine, reducing API calls by 98% and saving $18,000 monthly while enhancing data precision.',
      skills: ['PHP', 'API Optimization', 'Cost Reduction', 'Team Leadership'],
      demoUrl: null,
      githubUrl: null,
      canvas: {
        video: null,
        image: '/canvases/php-optimization.jpg',
        fallback: '/canvases/default.jpg'
      }
    }
  ],
  sideProjects: [
    {
      id: 'beer-fridge',
      title: 'Dark Side of the Brew',
      artist: 'Personal Project',
      album: 'Android Development',
      duration: 'In Progress',
      image: '/album-art/dark-side-of-the-brew.png',
      year: '2025',
      plays: '53MB',
      description: 'A masterfully crafted Android opus currently in studio production, refracting the mundane task of collection management through a prismatic lens of technical excellence. This ambitious 53MB composition layers Material Design 3 harmonics over a robust MVVM architecture, creating an experience that feels as polished as a Google first-party release. The standout track "Intelligent Beer Lookup" showcases sophisticated fuzzy matching algorithms, while "Smart Duplicate Detection" demonstrates the artist\'s maturity in UX design. Like Pink Floyd\'s original masterpiece, this work reveals new depths with each interaction—from the seamless CameraX integration to the whisper-quiet Room database performance. A rare gem that proves mobile development can be both technically ambitious and beautifully accessible.',
      skills: ['Android', 'Kotlin', 'Material Design 3', 'CameraX', 'Room Database', 'MVVM', 'Hilt DI'],
      demoUrl: null,
      githubUrl: 'https://github.com/username/beer-fridge-app',
      canvas: {
        video: '/canvases/dark-side-of-the-brew.mp4',
        image: '/album-art/dark-side-of-the-brew.png',
        fallback: '/album-art/dark-side-of-the-brew.png'
      },
      featured: true,
      isAlbum: true
    },
    {
      id: 'did-kansas-win',
      title: 'Did Kansas Win?',
      artist: 'Personal Project',
      album: 'Web Development',
      duration: '2 weeks',
      image: '/api/placeholder/300/300',
      year: '2024',
      plays: 'Live',
      description: 'Minimalist web app answering one question: "Did Kansas Win?" for Jayhawks basketball. Real-time ESPN API integration with live game monitoring.',
      skills: ['Node.js', 'Express', 'ESPN API', 'Responsive Design'],
      demoUrl: 'https://www.didkansaswin.com',
      githubUrl: 'https://github.com/username/did-kansas-win',
      canvas: {
        video: '/canvases/did-kansas-win.mp4',
        image: '/canvases/did-kansas-win.jpg',
        fallback: '/canvases/default.jpg'
      },
      featured: true
    },
    {
      id: 'wichita-radar',
      title: 'Wichita Radar',
      artist: 'Personal Project',
      album: 'Go Development',
      duration: '1 month',
      image: '/api/placeholder/300/300',
      year: '2024',
      plays: 'Live',
      description: 'Go-based weather monitoring dashboard aggregating real-time radar and satellite imagery for Wichita, KS. Features auto-refresh and mobile-responsive design.',
      skills: ['Go', 'HTML Templating', 'Weather APIs', 'PureCSS'],
      demoUrl: 'https://wichitaradar.com',
      githubUrl: 'https://github.com/username/wichita-radar',
      canvas: {
        video: '/canvases/wichita-radar.mp4',
        image: '/canvases/wichita-radar.jpg',
        fallback: '/canvases/default.jpg'
      }
    }
  ]
};

export const playlists = [
  { name: 'Recently Played', icon: Clock, projects: projects.recentWork },
  { name: 'Top Hits', icon: Heart, projects: projects.topHits },
  { name: 'Side Projects', icon: User, projects: projects.sideProjects },
  { name: 'Full Stack Development', icon: Plus, projects: [...projects.topHits, ...projects.sideProjects.slice(0, 2)] },
  { name: 'Data Engineering', icon: Plus, projects: [projects.recentWork[1], projects.topHits[0]] }
];

export const skills = [
  'Python', 'Go', 'JavaScript', 'AWS', 'Snowflake', 'ETL Pipelines',
  'API Development', 'Android/Kotlin', 'PHP', 'Docker', 'CI/CD'
];