import { AlbumCategory, Skill, RawProject } from '@/types';

export const didKansasWin: RawProject = {
    id: 'did-kansas-win',
    title: 'Did Kansas Win?',
    artist: 'Project',
    album: AlbumCategory.WEB_DEVELOPMENT,
    duration: '2 weeks',
    image: '/assets/images/album-art/did-kansas-win.png',
    year: '2025',
    impact: 'Trivial',
    description: 'My first AI-Assisted experiment, this barebones single-purpose web application provides real-time Kansas Jayhawks basketball results. Built with Node.js and Express, featuring live ESPN API integration and responsive design. The project demonstrates clean, focused development principles and API integration skills while solving a specific user need with minimal complexity. Sometimes the best solutions are the simplest ones, and this project showcases the ability to deliver exactly what users want without unnecessary features.',
    skills: [Skill.AI_ASSISTED_DEVELOPMENT, Skill.NODE_JS, Skill.EXPRESS, Skill.RESPONSIVE_DESIGN],
    demoUrl: 'https://www.didkansaswin.com',
    githubUrl: 'https://github.com/joshdutcher/didkansaswin',
    musicFile: 'did-kansas-win.mp3',
    projectStory: 'I\'m a Kansas Jayhawk basketball fan. During the season, the first thing I want to know after a game is simple: did we win? I don\'t need highlights or analysis—just yes or no. So I built a website that does exactly that. You go to didkansaswin.com and you get a big green YES or a big red NO. That\'s it. During live games, it shows the score and updates automatically. It was my first project built almost entirely with AI assistance, and I was amazed at how quickly it came together. Sometimes the best product is the one that does exactly one thing perfectly.',
    sunoLyrics: `[Intro - PA announcer in a basketball arena]
Welcome to the campus of the University of Kansas
and to Allen Fieldhouse! Home of the Jayhawks!

[Verse]
Step into the cathedral, the air's getting thin
The Phog is rising up, let the madness begin
From the rules on the wall to the banners in the sky
Where the spirit of the Jayhawk was born to fly
Bill Self on the hardwood, the master of the game
Lawrence, Kansas, put respect on the name
Beware of the Phog, it's a different kind of sound
Rock Chalk Jayhawk, yeah we holding the crown
From the Hill to Mass Street, the energy is real
The original Blue Blood, tell me how it feel!
In the house that Phog built, the tradition is tall
All roads lead to Lawrence, it's the root of it all!

[Chorus]
Red and Blue running deep in my veins
Beware of the Phog where the tradition reigns
In the cathedral of college basketball
All roads lead to Lawrence, it's the root of it all!
Rock Chalk [What!] Jayhawk [Yeah!]
Rock Chalk [What!] Jayhawk [KU!]

[Bridge]
Allen Fieldhouse, it's a different kind of air
Beware of the Phog, you better come prepared
Mass Street jumping, we do this every year
Remember it's ok, everybody loses here!`,
    displayLyrics: `Welcome to the campus of the University of Kansas
and to Allen Fieldhouse! Home of the Jayhawks!

Step into the cathedral, the air's getting thin
The Phog is rising up, let the madness begin
From the rules on the wall to the banners in the sky
Where the spirit of the Jayhawk was born to fly
Bill Self on the hardwood, the master of the game
Lawrence, Kansas, put respect on the name
Beware of the Phog, it's a different kind of sound
Rock Chalk Jayhawk, yeah we holding the crown
From the Hill to Mass Street, the energy is real
The original Blue Blood, tell me how it feel!
In the house that Phog built, the tradition is tall
All roads lead to Lawrence, it's the root of it all!

Red and Blue running deep in my veins
Beware of the Phog where the tradition reigns
In the cathedral of college basketball
All roads lead to Lawrence, it's the root of it all!
Rock Chalk! Jayhawk!
Rock Chalk! Jayhawk!

Allen Fieldhouse, it's a different kind of air
Beware of the Phog, you better come prepared
Mass Street jumping, we do this every year
Remember it's ok, everybody loses here!`,
    sunoStyle: `Midwest Hip-Hop, Basketball Anthem, High Energy, 92 BPM, Cinematic Horns, Heavy Boom Bap Drums, Energetic Male Vocals, Stadium Hype, Allen Fieldhouse Atmosphere`,
    canvas: 'did-kansas-win.mp4',
    canvasPoster: 'did-kansas-win.mp4',
    albumArtBasedOn: 'Graduation by Kanye West'
};
