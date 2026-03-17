import { AlbumCategory, Skill, RawProject } from '@/types';

export const medigapIntegration: RawProject = {
    id: 'medigap-integration',
    title: 'Medigap Integration',
    artist: 'Project - Ad Hoc',
    album: AlbumCategory.GOVERNMENT_HEALTHCARE,
    duration: '8 weeks',
    image: '/assets/images/album-art/medigap-integration.png',
    year: '2023',
    impact: 'National scale',
    description: 'Designed and delivered end-to-end infrastructure for integrating Medigap health insurance plans into Medicare.gov. Built new ETL pipelines to ingest, transform, and normalize state-specific plan data, mapping inconsistent naming conventions into a unified reference set. Engineered optimized database models and API endpoints to support fast, reliable access for millions of users. Implemented fault isolation and rollback mechanisms so Medigap failures never disrupted the core Medicare ETL, ensuring uninterrupted service during enrollment. This project showcases full-stack ownership, from data modeling and system resilience to delivering accurate, user-facing healthcare information at national scale.',
    skills: [Skill.GO, Skill.ETL_PIPELINES, Skill.API_DEVELOPMENT, Skill.DATA_TRANSFORMATION, Skill.HIGH_AVAILABILITY, Skill.HEALTHCARE],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'medigap-integration.mp3',
    projectStory: 'Medigap plans—the supplemental insurance that fills the gaps in Medicare—had never been on Medicare.gov before. I was tasked with adding them. The challenge was that every state had different plans with different names, and none of it was standardized. I built pipelines to ingest all that messy data, normalize it into a consistent format, and serve it through APIs that could handle millions of users. The hardest part was making sure that if anything went wrong with Medigap, it couldn\'t take down the core Medicare system. I built fault isolation so failures stayed contained. By the end, millions of Americans could compare supplemental insurance options they\'d never had easy access to before.',
    sunoLyrics: `[Intro] [Heavy Minimoog bass "stomp" hook] [Lead: "Ow! Check the response times!"]

[Verse 1] Fifty states of messy data, screaming on the line Different plans, different names, wasting all my time! I built the pipeline, baby, keep the traffic clean Serving millions on the hottest API you ever seen! (Overlapping Background Vocals, spoken: "SLAs? No problem.")

[Chorus] We're closing the Gap! (Yeah!) Filling in the holes in the master plan. We're closing the Gap! (Get down!) Medicare's moving to a brand new jam!

[Bridge] [Aggressive, "squelchy" Synth-Bass Solo] Millions in the queue, but the ride is smooth and sweet I'm a Wichita man with a digital beat! I'm serving up the choices, yeah I'm bringing the heat The cleanest integration that you're ever gonna meet!

[Outro] From the messy files to the clean machine The smoothest integration that you ever seen! (Lead): "We opened up the door! Ow! Check it out!" [Big gated-reverb drum "Stomp" finish]`,
    displayLyrics: `Fifty states of messy data, screaming on the line
Different plans, different names, wasting all my time
I built the pipeline, baby, keep the traffic clean
Serving millions on the hottest API you ever seen

We're closing the Gap (Yeah)
Filling in the holes in the master plan
We're closing the Gap (Get down)
Medicare's moving to a brand new jam
We're closing the Gap
But the ride is smooth and sweet
I'm a Wichita man with a digital beat

I'm serving up the choices, yeah I'm bringing the heat
The cleanest integration that you're ever gonna meet

From the messy files to the clean machine
The smoothest integration that you ever seen
We opened up the door! Ow! Check it out

We're closing the Gap
We're closing the Gap
We're closing the Gap
We're closing the Gap
`,
    sunoStyle: `Mid-80s American funk with a slick, dance-floor focus. Medium-up tempo, locked-in but human drum groove with tight kick-snare interplay and crisp hi-hats. Bass is dominant and elastic, melodic and funky without showing off. Clean rhythm guitars play short, choppy sixteenth-note stabs and muted scratches. Synths are glossy and analog, brassy hits, rubbery leads, warm pads, used for hooks and accents. Horns punch the groove.

Songs are hook-driven with simple verses, big repetitive choruses, and call-and-response breakdowns. Vocals feature a gritty, soulful male lead with swagger, half-sung, half-spoken phrasing, plus playful ad-libs and group chants. Lyrics are flirtatious, confident, and fun, focused on vibe over narrative. Polished, sweaty, body-moving funk.

1980s Funk, Boogie, P-Funk, Heavy Synth Bass, Minimoog, Linndrum, Gated Reverb Snare, Bright Brass Stabs, Talkbox, Gritty Baritone Male Vocals, Percussive Phrasing, 110 BPM, Bombastic, Celebratory, Urban Rodeo`,
    canvas: 'medigap-integration.mp4',
    canvasPoster: 'medigap-integration.mp4',
    albumArtBasedOn: 'Gap Band VI by The Gap Band'
};
