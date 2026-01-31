import { AlbumCategory, Skill, RawProject } from '@/types';

export const joshify: RawProject = {
    id: 'joshify',
    title: 'Joshify',
    artist: 'Project',
    album: AlbumCategory.WEB_DEVELOPMENT,
    duration: '3 months',
    image: '/assets/images/album-art/joshify.png',
    year: '2025',
    impact: 'Self Promotion',
    description: 'Experimental portfolio project exploring AI-assisted development by transforming my traditional developer resume into an immersive Spotify clone, intended to stand out in a crowded field. I used Claude Code almost exclusively for the code, and a combination of AI image and video generating tools for the album art images and canvas videos. I did give Claude Code specific instructions on some of the code architecture and principles. This site features authentic Spotify UI patterns including advanced column resizing, comprehensive search functionality, and canvas video backgrounds. The site presents development projects as "tracks" with rich metadata, playlists for different work categories, and a fully functional "now playing" system. Sadly, the site does not actually play any music. Yet.',
    skills: [Skill.CLAUDE_CODE, Skill.MCP_SERVER_INTEGRATION, Skill.AI_PROMPT_ENGINEERING, Skill.COMPONENT_ARCHITECTURE, Skill.AI_ASSISTED_DEVELOPMENT],
    demoUrl: null,
    githubUrl: 'https://github.com/joshdutcher/joshify',
    musicFile: 'joshify.mp3',
    projectStory: 'I wanted my portfolio to stand out. The job market is brutal, and everyone has the same boring resume website. So I thought: what if my resume looked like Spotify? Projects as tracks, employers as playlists, skills as genres. I used AI to build almost all of it—Claude wrote the React code while I directed the architecture and made design decisions. I generated album art with AI image tools and canvas videos with AI video generators. The result is this website you\'re looking at right now. It\'s playful, it\'s different, and it shows what I can build when I embrace new tools. Plus, it actually plays music now.',
    sunoLyrics: null,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'joshify.mp4',
    canvasPoster: 'joshify.mp4',
    albumArtBasedOn: 'Nothing, just a direct rip-off of Spotify branding 😂'
};
