import { AlbumCategory, Skill, RawProject } from '@/types';

export const wichitaRadar: RawProject = {
    id: 'wichita-radar',
    title: 'Wichita Radar',
    artist: 'Project',
    album: AlbumCategory.GO_DEVELOPMENT,
    duration: 'decades',
    image: '/assets/images/album-art/wichita-radar.png',
    year: '2024',
    impact: 'Locally popular',
    description: 'Real-time weather monitoring dashboard built with Go, aggregating live radar and satellite imagery specifically for Wichita, KS. Features automatic data refresh, mobile-responsive design using PureCSS, and efficient API integration with weather services. This project showcases Go programming skills and the ability to create practical, location-specific applications that serve real user needs. The clean, performant architecture demonstrates expertise in backend development and responsive web design.',
    skills: [Skill.GO, Skill.HTML_TEMPLATING, Skill.WEATHER_APIS, Skill.PURECSS],
    demoUrl: 'https://wichitaradar.com',
    githubUrl: 'https://github.com/joshdutcher/wichitaradar',
    musicFile: 'wichita-radar.mp3',
    projectStory: 'It started because my satellite dish kept going out during storms. I needed to check the weather radar, but the big weather sites were cluttered with ads and took forever to load. So I built my own. Just the radar images for Wichita, nothing else. Clean, fast, auto-refreshing. I put it online thinking maybe a few friends would use it. That was 2007. Now it\'s one of the top results when you search for Wichita weather radar. People in my hometown use it every day, especially during tornado season. It\'s not fancy, but it works, and it\'s mine.',
    sunoLyrics: `[Short Intro: 2 bars]
[Filtered electronic loop with rising synth arpeggio]

[Verse: Vocoder]
High res map, data streams
Looking for the inflow of my dreams
Dry line comes, CAPE is high
Watch the storm blow up the sky

[Bridge: Talkbox]
Hook echo on the screen.
Rainfall lines of red and green.

[Chorus: Vocoder Harmonies]
Track the core.
Watch it roar.
Track the core.
Watch it roar.

[Chorus]
Track the core.
Watch it roar.
Track the core.
Watch it roar.

[Outro]
[Fast fade]
[Heavy sidechain pumping with a final filter sweep]
[End]`,
    displayLyrics: `High res map, data streams
Looking for the inflow of my dreams
Dry line comes, CAPE is high
Watch the storm blow up the sky

Hook echo on the screen
Rainfall lines of red and green

Track the core
Watch it roar
Track the core
Watch it roar

Track the core
Watch it roar
Track the core
Watch it roar

Track the core

Watch it roar
`,
    sunoStyle: `Immediate vocals, tight arrangement, fast-paced, Male Vocoder, Talkbox Vocals, French House, Electro-house, Synth-pop, Roland TR-909, Driving heavy kick, Distorted TB-303 Acid Bass, Resonant high-pass filter sweeps, Arpeggiated synthesizers, Digital pads, Hard sidechain pumping, Bitcrushed textures, Compressed synth-leads, Discovery-era, Da Funk influence, Futuristic, 126 BPM, Electronic, High-energy.`,
    canvas: 'wichita-radar.mp4',
    canvasPoster: 'wichita-radar.mp4',
    albumArtBasedOn: 'Discovery by Daft Punk'
};
