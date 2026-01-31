import { AlbumCategory, Skill, RawProject } from '@/types';

export const didKansasWin: RawProject = {
    id: 'did-kansas-win',
    title: 'Did Kansas Win?',
    artist: 'Project',
    album: AlbumCategory.WEB_DEVELOPMENT,
    duration: '2 weeks',
    image: '/assets/images/album-art/did-kansas-win.png',
    year: '2024',
    impact: 'Trivial',
    description: 'My first AI-Assisted experiment, this barebones single-purpose web application provides real-time Kansas Jayhawks basketball results. Built with Node.js and Express, featuring live ESPN API integration and responsive design. The project demonstrates clean, focused development principles and API integration skills while solving a specific user need with minimal complexity. Sometimes the best solutions are the simplest ones, and this project showcases the ability to deliver exactly what users want without unnecessary features.',
    skills: [Skill.AI_ASSISTED_DEVELOPMENT, Skill.NODE_JS, Skill.EXPRESS, Skill.RESPONSIVE_DESIGN],
    demoUrl: 'https://www.didkansaswin.com',
    githubUrl: 'https://github.com/joshdutcher/didkansaswin',
    musicFile: 'I\'m a Jayhawk.mp3',
    projectStory: 'I\'m a Kansas Jayhawk basketball fan. During the season, the first thing I want to know after a game is simple: did we win? I don\'t need highlights or analysis—just yes or no. So I built a website that does exactly that. You go to didkansaswin.com and you get a big green YES or a big red NO. That\'s it. During live games, it shows the score and updates automatically. It was my first project built almost entirely with AI assistance, and I was amazed at how quickly it came together. Sometimes the best product is the one that does exactly one thing perfectly.',
    sunoLyrics: null,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'did-kansas-win.mp4',
    canvasPoster: 'did-kansas-win.mp4',
    albumArtBasedOn: 'Graduation by Kanye West'
};
