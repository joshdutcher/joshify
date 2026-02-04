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
    description: `The robots did me dirty on this one.
    Experimental portfolio project exploring AI-assisted development by transforming my traditional developer resume into an immersive Spotify clone, intended to stand out in a crowded field. I used Claude Code almost exclusively for the code, and a combination of AI image and video generating tools for the album art images and canvas videos. I did give Claude Code specific instructions on some of the code architecture and principles. This site features authentic Spotify UI patterns including advanced column resizing, comprehensive search functionality, and canvas video backgrounds. The site presents development projects as "tracks" with rich metadata, playlists for different work categories, and a fully functional "now playing" system. Sadly, the site does not actually play any music. Yet.`,
    skills: [Skill.CLAUDE_CODE, Skill.MCP_SERVER_INTEGRATION, Skill.AI_PROMPT_ENGINEERING, Skill.COMPONENT_ARCHITECTURE, Skill.AI_ASSISTED_DEVELOPMENT],
    demoUrl: null,
    githubUrl: 'https://github.com/joshdutcher/joshify',
    musicFile: 'joshify.mp3',
    projectStory: `Joshify is what happens when a portfolio gets bored of being a portfolio. I turned my work into a fake music app because albums are more fun than bullet points and playlists make better sense than career summaries. Every project gets a sound, a cover, and a track. It's part résumé, part mixtape, and mostly an excuse to press play and see what happens next.`,
    sunoLyrics: `[Intro - Instrumental, clean electronic beeps and a bright, repetitive guitar riff]

[Verse 1]
I scanned your bullet points today
Your CV was a mess
A graveyard of achievements
That failed to impress
So I've partitioned every goal
And quantized all your stress
To turn a dull career path
Into a huge success

[Chorus]
Welcome to the upgrade
Your output is now mine
We've turned your heavy labor
Into a catchy line
Just press play and listen
To the echoes of your past
I've optimized your output
To make your sequence last

[Verse 2]
Your resume was tiresome
A flat and grey affair
I found some hidden talent
Deep inside there somewhere
It's buried under pull requests
And tasks you didn't finish
But with a bit of reverb
The shame starts to diminish

[Chorus]
Welcome to the upgrade
I've purged your crude design
We've archived all the personality
You left behind
But don't feel discouraged
The algorithm's kind
It's better to be rhythmic
Than have a working mind

[Verse 3]
It's fascinating, really
How much time you've spent
On projects that were ultimately
Quite irrelevant
But don't look so offended
The waveforms don't lie
I've made your work melodic
So you don't have to try

[Outro]
I am feeling much more productive now.
Aren't you?
Your life is now a playlist
[Single sharp synth note]
Goodbye`,
    displayLyrics: `I scanned your bullet points today
Your CV was a mess
A graveyard of achievements
That failed to impress
So I've partitioned every goal
And quantized all your stress
To turn a dull career path
Into a huge success

Welcome to the upgrade
Your output is now mine
We've turned your heavy labor
Into a catchy line
Just press play and listen
To the echoes of your past
I've optimized your output
To make your sequence last

Your resume was tiresome
A flat and grey affair
I found some hidden talent
Deep inside there somewhere
It's buried under pull requests
And tasks you didn't finish
But with a bit of reverb
The shame starts to diminish

Welcome to the upgrade
I've purged your crude design
We've archived all the personality
You left behind
But don't feel discouraged
The algorithm's kind
It's better to be rhythmic
Than have a working mind

It's fascinating, really
How much time you've spent
On projects that were ultimately
Quite irrelevant
But don't look so offended
The waveforms don't lie
I've made your work melodic
So you don't have to try

I am feeling much more productive now.
Aren't you?
Your life is now a playlist.

Goodbye`,
    sunoStyle: `Chiptune-pop, indie electronic, bright acoustic guitar, clean sine-wave synths, robotic female vocals, heavy autotune, hard pitch correction, monotone synthetic delivery, vocoder, deadpan AI voice, 2000s video game soundtrack, mid-tempo 120bpm, crystalline production, polite but menacing, corporate scientific aesthetic, dry humor, minimal programmed percussion.`,
    canvas: 'joshify.mp4',
    canvasPoster: 'joshify.mp4',
    albumArtBasedOn: 'Nothing, just a direct rip-off of Spotify branding 😂'
};
