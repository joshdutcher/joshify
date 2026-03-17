import { AlbumCategory, Skill, RawProject } from '@/types';

export const apiEngineOptimization: RawProject = {
    id: 'api-engine-optimization',
    title: 'API Engine Optimization',
    artist: 'Project - SNT Media',
    album: AlbumCategory.MEDIA_TECHNOLOGY,
    duration: '2 years',
    image: '/assets/images/album-art/api-engine-optimization.png',
    year: '2019',
    impact: '$18K',
    description: 'Executed comprehensive optimization of data-fetching API engine, achieving a 98% reduction in API calls and generating $18,000 in monthly cost savings while simultaneously enhancing data precision. Architected intelligent caching and batching strategies that transformed system efficiency without compromising accuracy. This project demonstrates leadership in both technical innovation and business impact, showing how strategic engineering decisions can deliver significant ROI while improving system performance.',
    skills: [Skill.API_OPTIMIZATION, Skill.COST_REDUCTION, Skill.TEAM_LEADERSHIP, Skill.PERFORMANCE_ENGINEERING],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'api-engine-optimization.mp3',
    projectStory: `We were hemorrhaging money on data provider bills with no clear explanation. The system was blowing past its API limits, firing off wasteful requests around the clock. I dug into the code and the provider's documentation and found obvious inefficiencies and better ways to query the same data. I rewrote the schedule to pull data only during business hours when it actually changed, and added batching so one efficient request replaced hundreds of tiny ones. The result was a 95% drop in API calls and $18,000 saved every month. Same functionality, same accuracy, but lean instead of bloated. Sometimes the best optimization isn't what you add, it's what you stop doing.`,
    sunoLyrics: `(Intro: Four bars of feedback, then a heavy, chugging down-stroke riff)

(Verse 1) You're bleeding out, you're a digital drain Pumping the profit right down the lane! Twenty-four hours of mindless chatter What does it cost? It doesn't matter! A thousand requests like a swarm of fleas Your bank account's down on its bloody knees!

(Chorus) Stop the rot! Kill the bloat! Got the greedy bastards by the throat! Ninety-five percent of nothing at all Watch the digital empire fall! It's vacant! It's rubbish!

(Verse 2) I saw the code, it was plastic and cheap A billion calls while the world's asleep! I pulled the plug, I set the time To stop your wasteful, corporate crime! One big fist instead of a thousand bites I'm turning off your neon lights!

(Outro) Eighteen grand! Every month! Saved from the bin! You're pretty vacant... and I'm the one who's in! NO FUTURE!

(Sudden stop on a ringing, distorted chord)`,
    displayLyrics: `You're bleeding out, you're a digital drain
Pumping the profit right down the lane
Twenty-four hours of mindless chatter
What does it cost? It doesn't matter
A thousand requests like a swarm of fleas
Your bank account's down on its bloody knees

Stop the rot
Kill the bloat
Got the greedy bastards by the throat
Ninety-five percent of nothing at all
Watch the digital empire fall
It's vacant
It's rubbish

I saw the code, it was plastic and cheap
A billion calls while the world's asleep
I pulled the plug, I set the time
To stop your wasteful, corporate crime
One big fist instead of a thousand bites
I'm turning off your neon lights

Stop the rot
Kill the bloat
Got the greedy bastards by the throat
Ninety-five percent of nothing at all
Watch the digital empire fall
It's vacant
It's rubbish

Eighteen grand
Every month
Saved from the bin
You're pretty vacant
And I'm the one who's in
No future
No future

Teat`,
    sunoStyle: `Raw late-1970s British punk rock with aggressive, confrontational energy. Fast to mid-tempo song built on loud, simple power-chord guitar riffs with heavy distortion and minimal effects. Guitars are abrasive and relentlessly strummed. Bass is thick, driving, locked to the guitar. Drums are simple, pounding 4/4 beats with heavy snare and few fills.

Production is loud, compressed, deliberately crude with little polish. Vocals are snarled and shouted with a strong British accent, often barked rather than sung. Lyrics are blunt, repetitive, provocative, focused on nihilism, anti-authority, and class resentment. Chant-like hooks, zero virtuosity, maximum attitude.

1977 UK Punk, snotty nasal British male vocals, Cockney sneer. Thick wall-of-sound guitars, multi-layered power chords, Marshall distortion, heavy down-strokes. Thumping bass, punchy steady 4/4 drums, crisp dry snare. Raw 70s analog production, dry mix, aggressive, anti-establishment, loud.`,
    canvas: 'api-engine-optimization.mp4',
    canvasPoster: 'api-engine-optimization.mp4',
    albumArtBasedOn: 'Nevermind the Bollocks, Here\'s the Sex Pistols by The Sex Pistols'
};
