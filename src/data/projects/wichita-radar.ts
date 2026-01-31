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
    sunoLyrics: `[Intro]
[Short filtered disco loop, slowly opening with a low-pass filter sweep]

[Verse]
High res map, data streams
Looking for the inflow of my dreams
Dry line comes, CAPE is high
Watch the storm blow up the sky

[Bridge]
Hook echo on the screen.
Rainfall lines of red and green.

[Chorus]
Track the core.
Watch it roar.
Track the core.
Watch it roar.

[Guitar Solo, very short]
[High-energy funk guitar with heavy phaser and wah-wah]

[Chorus]
Track the core.
Watch it roar.
Track the core.
Watch it roar.`,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'wichitaradar.mp4',
    canvasPoster: 'wichitaradar.mp4',
    albumArtBasedOn: 'Discovery by Daft Punk'
};
