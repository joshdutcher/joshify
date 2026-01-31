import { AlbumCategory, Skill, RawProject } from '@/types';

export const beerFridge: RawProject = {
    id: 'beer-fridge',
    title: 'Beer Fridge',
    artist: 'Project',
    album: AlbumCategory.ANDROID_DEVELOPMENT,
    duration: 'In Progress',
    image: '/assets/images/album-art/beer-fridge.png',
    year: '2025',
    impact: null,
    description: 'Android application for personal collection management currently in development. Features modern Material Design 3 interface built on robust MVVM architecture with Hilt dependency injection. Key highlights include intelligent fuzzy matching for item lookup, smart duplicate detection, and seamless CameraX integration for quick item scanning. Utilizes Room database for efficient local storage with whisper-quiet performance. The app demonstrates expertise in contemporary Android development patterns while delivering an intuitive user experience that rivals Google first-party applications. This project showcases the ability to balance technical sophistication with accessibility, proving that complex functionality can be elegantly simplified.',
    skills: [Skill.AI_ASSISTED_DEVELOPMENT, Skill.CLAUDE_CODE],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'beer-fridge.mp3',
    projectStory: 'I collect Sam Adams limited edition bottles. Not to drink—to display in my basement beer fridge. The problem was keeping track of what I had. I\'d be at a store, see a bottle, and wonder: do I already own this one? So I decided to build an Android app. But here\'s the twist—I barely wrote any of the code myself. I used Claude, an AI assistant, to help me build it. I described what I wanted, reviewed what it wrote, and guided it when it went off track. The result is a polished app with camera integration, fuzzy search, and a Material Design interface that looks like Google made it. It\'s my experiment in a new way of building software.',
    sunoLyrics: null,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'beer-fridge.mp4',
    canvasPoster: 'beer-fridge.mp4',
    albumArtBasedOn: 'Dark Side of the Moon by Pink Floyd',
    active: false // Deactivated - project incomplete
};
