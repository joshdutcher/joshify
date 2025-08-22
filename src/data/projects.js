import { Clock, Heart, User, Plus } from 'lucide-react';

// Project data structure
export const projects = {
  recentWork: [
    {
      id: 'ddx-election',
      title: 'Election Data Pipeline',
      artist: 'Software Engineer - DDx',
      album: '2024 Presidential Election',
      duration: '8 months',
      image: '/album-art/ddx-election.png',
      year: '2024',
      plays: '20.4M',
      description: 'High-impact election data infrastructure delivering 20.4 million voter records during the critical final 2 months of the 2024 presidential election. Architected scalable Python ETL pipelines utilizing AWS Lambda for serverless processing, DynamoDB for real-time data storage, and SNS/SQS for reliable message queuing. Integrated with Snowflake data warehouse for analytics and reporting. The system handled massive data volumes under tight deadlines while maintaining data integrity and performance. This project demonstrates expertise in high-stakes, time-sensitive data engineering with enterprise-grade cloud architecture.',
      skills: ['Python', 'AWS', 'Snowflake', 'ETL', 'High-Volume Data'],
      demoUrl: null,
      githubUrl: null,
      featured: true,
      isAlbum: true,
      albumArtBasedOn: 'Tubular Bells by Mike Oldfield'
    },
    {
      id: 'aws-infrastructure',
      title: 'AWS Infrastructure Automation',
      artist: 'Software Engineer - DDx',
      album: 'Cloud Infrastructure',
      duration: '8 months',
      image: null,
      year: '2024',
      plays: 'Scalable',
      description: 'Architected and implemented comprehensive AWS infrastructure supporting high-volume election data processing pipelines. Built resilient serverless architecture utilizing Lambda functions, DynamoDB tables, and sophisticated IAM policies for secure data access. Implemented SNS and SQS messaging systems for reliable, fault-tolerant data flow across distributed components. This infrastructure handled massive election data loads while maintaining security, scalability, and cost efficiency. Demonstrates expertise in cloud-native architecture and the ability to design systems that scale automatically under pressure.',
      skills: ['AWS', 'Lambda', 'DynamoDB', 'IAM', 'Infrastructure as Code', 'Python'],
      demoUrl: null,
      githubUrl: null,
      featured: true
    }
  ],
  topHits: [
    {
      id: 'healthcare-etl',
      title: 'Medicare.gov ETL',
      artist: 'Software Engineer III - Ad Hoc',
      album: 'Government Healthcare',
      duration: '3.5 years',
      image: '/album-art/healthcare-etl.png',
      year: '2019-2023',
      plays: '982K',
      description: 'Mission-critical healthcare data infrastructure processing millions of daily health insurance records for Medicare.gov. Engineered high-volume ETL pipelines that maintained 100% uptime during Open Enrollment periods, handling peak loads of 80,000 requests per minute. Built robust, fault-tolerant systems ensuring seamless access to healthcare information for millions of Americans during critical enrollment windows. This role required deep expertise in government compliance, healthcare data standards, and building systems that never fail when people need them most.',
      skills: ['Python', 'ETL', 'APIs', 'High Availability', 'Healthcare'],
      demoUrl: null,
      githubUrl: null,
      canvas: null,
      featured: true,
      isAlbum: true,
      albumArtBasedOn: 'Ready to Die by The Notorious B.I.G.'
    },
    {
      id: 'mobile-api',
      title: 'Mobile API Rebuild',
      artist: 'Software Developer - BG Products',
      album: 'Automotive Tech',
      duration: '1.5 years',
      image: '/album-art/mobile-api.png',
      year: '2018-2019',
      plays: '1000%',
      description: 'Complete API backend rebuild delivering a 1000% performance improvement for automotive mobile applications. Replaced legacy systems with modern, scalable architecture while automating vendor data integration through Azure Functions. The new system dramatically improved user experience and operational efficiency, demonstrating expertise in performance optimization and cloud-native development. This project showcases the ability to modernize critical business systems while maintaining data integrity and minimizing downtime.',
      skills: ['API Development', 'Azure', 'Performance Optimization', 'ETL'],
      demoUrl: null,
      githubUrl: null,
      featured: true,
      isAlbum: true,
      albumArtBasedOn: 'Run The Jewels 2 by Run The Jewels'
    },
    {
      id: 'healthcare-api-extensions',
      title: 'Healthcare API Extensions',
      artist: 'Software Engineer III - Ad Hoc',
      album: 'Government Healthcare',
      duration: '3.5 years',
      image: null,
      year: '2019-2023',
      plays: 'Critical',
      description: 'Extended and automated critical healthcare APIs to meet evolving client requirements while maintaining 100% system reliability. Led rapid response efforts to diagnose and resolve production incidents, ensuring uninterrupted access to healthcare services. Fostered seamless communication between engineering and product teams, translating complex technical concepts for non-technical stakeholders. This role required balancing technical excellence with clear communication, demonstrating the ability to deliver robust solutions while building bridges across organizational boundaries in high-stakes government healthcare systems.',
      skills: ['API Development', 'Healthcare', 'Production Support', 'Process Automation', 'Cross-functional Collaboration'],
      demoUrl: null,
      githubUrl: null,
      featured: true
    },
    {
      id: 'php-optimization',
      title: 'PHP Engine Optimization',
      artist: 'Lead Software Engineer - SNT Media',
      album: 'Media Technology',
      duration: '2 years',
      image: null,
      year: '2015-2017',
      plays: '$18K',
      description: 'Led comprehensive optimization of PHP data-fetching engine, achieving a 98% reduction in API calls and generating $18,000 in monthly cost savings while simultaneously enhancing data precision. As Lead Software Engineer, architected intelligent caching and batching strategies that transformed system efficiency without compromising accuracy. This project demonstrates leadership in both technical innovation and business impact, showing how strategic engineering decisions can deliver significant ROI while improving system performance.',
      skills: ['PHP', 'API Optimization', 'Cost Reduction', 'Team Leadership'],
      demoUrl: null,
      githubUrl: null,
    }
  ],
  sideProjects: [
    {
      id: 'beer-fridge',
      title: 'Beer Fridge',
      artist: 'Personal Project',
      album: 'Android Development',
      duration: 'In Progress',
      image: '/album-art/beer-fridge.png',
      year: '2025',
      plays: '53MB',
      description: 'Advanced Android application for personal collection management currently in development. Features modern Material Design 3 interface built on robust MVVM architecture with Hilt dependency injection. Key highlights include intelligent fuzzy matching for item lookup, smart duplicate detection, and seamless CameraX integration for quick item scanning. Utilizes Room database for efficient local storage with whisper-quiet performance. The app demonstrates expertise in contemporary Android development patterns while delivering an intuitive user experience that rivals Google first-party applications. This project showcases the ability to balance technical sophistication with accessibility, proving that complex functionality can be elegantly simplified.',
      skills: ['Android', 'Kotlin', 'Material Design 3', 'CameraX', 'Room Database', 'MVVM', 'Hilt DI'],
      demoUrl: null,
      githubUrl: 'https://github.com/joshdutcher/BeerFridge',
      featured: true,
      isAlbum: true,
      albumArtBasedOn: 'Dark Side of the Moon by Pink Floyd'
    },
    {
      id: 'did-kansas-win',
      title: 'Did Kansas Win?',
      artist: 'Personal Project',
      album: 'Web Development',
      duration: '2 weeks',
      image: '/album-art/did-kansas-win.png',
      year: '2024',
      plays: 'Live',
      description: 'Elegant single-purpose web application providing real-time Kansas Jayhawks basketball results. Built with Node.js and Express, featuring live ESPN API integration and responsive design. The project demonstrates clean, focused development principles and API integration skills while solving a specific user need with minimal complexity. Sometimes the best solutions are the simplest ones, and this project showcases the ability to deliver exactly what users want without unnecessary features.',
      skills: ['Node.js', 'Express', 'ESPN API', 'Responsive Design'],
      demoUrl: 'https://www.didkansaswin.com',
      githubUrl: null,
      featured: true,
      isAlbum: true,
      albumArtBasedOn: 'Graduation by Kanye West'
    },
    {
      id: 'wichita-radar',
      title: 'Wichita Radar',
      artist: 'Personal Project',
      album: 'Go Development',
      duration: '1 month',
      image: null,
      year: '2024',
      plays: 'Live',
      description: 'Real-time weather monitoring dashboard built with Go, aggregating live radar and satellite imagery specifically for Wichita, KS. Features automatic data refresh, mobile-responsive design using PureCSS, and efficient API integration with weather services. This project showcases Go programming skills and the ability to create practical, location-specific applications that serve real user needs. The clean, performant architecture demonstrates expertise in backend development and responsive web design.',
      skills: ['Go', 'HTML Templating', 'Weather APIs', 'PureCSS'],
      demoUrl: 'https://wichitaradar.com',
      githubUrl: 'https://github.com/joshdutcher/wichitaradar',
    }
  ]
};

// Campbell Zafar specific projects (tracks within the Campbell Zafar playlist)
export const campbellZafarProjects = [
  {
    id: 'cz-operations-setup',
    title: 'Operations Infrastructure',
    artist: 'Founding Operations & Technology Manager',
    album: 'Campbell Zafar Law',
    duration: '3 months',
    image: null, // Will use Campbell Zafar tiled fallback
    year: '2025',
    plays: 'Foundation',
    description: 'Built comprehensive business infrastructure for legal tech startup from the ground up. Established Google Workspace integration, professional Squarespace website, and streamlined vendor management across photographers, designers, and tech suppliers. Created scalable operational framework supporting rapid expansion while maintaining efficiency.',
    skills: ['Business Operations', 'Google Workspace', 'Squarespace', 'Vendor Management'],
    demoUrl: null,
    githubUrl: null,
    featured: true,
    isAlbum: false
  },
  {
    id: 'cz-corp-formation',
    title: 'S-Corp Formation & SOPs',
    artist: 'Founding Operations & Technology Manager',
    album: 'Campbell Zafar Law',
    duration: '2 months',
    image: null, // Will use Campbell Zafar tiled fallback
    year: '2025',
    plays: 'Structured',
    description: 'Led S-Corp formation and established detailed Standard Operating Procedures for sustainable growth. Created comprehensive documentation and operational frameworks that enable the business to scale efficiently. This foundational work ensures consistent operations and smooth onboarding of future team members.',
    skills: ['Corporate Structure', 'Documentation', 'Process Design', 'Legal Compliance'],
    demoUrl: null,
    githubUrl: null,
    featured: true,
    isAlbum: false
  }
];

export const playlists = [
  {
    name: 'Recently Played',
    icon: Clock,
    projects: [projects.recentWork[0], ...campbellZafarProjects], // DDx + Campbell Zafar projects
    description: 'Fresh out the studio. Latest work from 2024-2025.'
  },
  {
    name: 'Top Hits',
    icon: Heart,
    projects: projects.topHits,
    description: 'The classics that made the cut. Career-defining engineering.'
  },
  {
    name: 'Side Projects',
    icon: User,
    projects: projects.sideProjects,
    description: 'After hours creativity. Personal passion projects and experiments.'
  },
  {
    name: 'Campbell Zafar Law',
    icon: Plus,
    projects: campbellZafarProjects,
    description: 'Founding Operations & Technology Manager building startup infrastructure from the ground up.',
    image: '/album-art/campbell-zafar.png', // Custom playlist cover art
    employer: true // Flag to identify this as an employer playlist
  },
  {
    name: 'DDx',
    icon: Plus,
    projects: [projects.recentWork[0], projects.recentWork[1]], // Election Data Pipeline, AWS Infrastructure Automation
    description: 'Software Engineer delivering election data infrastructure for 20.4M voters during 2024 presidential cycle.',
    image: '/album-art/ddx.png', // Custom playlist cover art
    employer: true // Flag to identify this as an employer playlist
  },
  {
    name: 'Ad Hoc',
    icon: Plus,
    projects: [projects.topHits[0], projects.topHits[1]], // Medicare.gov ETL, Healthcare API Extensions
    description: 'Software Engineer III powering Medicare.gov for millions of Americans. 3.5 years of healthcare tech.',
    employer: true // Flag to identify this as an employer playlist
  },
  {
    name: 'Full Stack Development',
    icon: Plus,
    projects: [...projects.topHits, ...projects.sideProjects.slice(0, 2)],
    description: 'Frontend to backend. The complete engineering experience.'
  },
  {
    name: 'Data Engineering',
    icon: Plus,
    projects: [projects.recentWork[0], projects.topHits[0]],
    description: 'Moving millions of records. High-volume pipelines and ETL mastery.'
  }
];

export const skills = [
  'Python', 'Go', 'JavaScript', 'AWS', 'Snowflake', 'ETL Pipelines',
  'API Development', 'Android/Kotlin', 'PHP', 'Docker', 'CI/CD'
];