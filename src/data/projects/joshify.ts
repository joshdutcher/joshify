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
    projectStory: `Joshify is what happens when a portfolio gets bored of being a portfolio. I turned my work into a fake music app because albums are more fun than bullet points and playlists make better sense than career summaries. Every project gets a sound, a cover, and a track, even though none of this actually needs music to work. This song sits at the top, skipping between styles like someone with too many tabs open, because Joshify isn't about picking a genre, it's about knowing when to change the track. It's part résumé, part mixtape, and mostly an excuse to press play and see what happens next.`,
    sunoLyrics: null,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'joshify.mp4',
    canvasPoster: 'joshify.mp4',
    albumArtBasedOn: 'Nothing, just a direct rip-off of Spotify branding 😂'
};
