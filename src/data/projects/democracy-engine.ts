import { AlbumCategory, Skill, RawProject } from '@/types';

export const democracyEngine: RawProject = {
    id: 'democracy-engine',
    title: 'Democracy Engine',
    artist: 'Project - DDx',
    album: AlbumCategory.CLOUD_INFRASTRUCTURE,
    duration: '8 months',
    image: '/assets/images/album-art/democracy-engine.png',
    year: '2024',
    impact: 'Scalable',
    description: 'Developed and enhanced serverless applications within existing AWS infrastructure supporting high-volume election data operations. Created new Lambda functions and updated existing ones to process voter engagement data, working with DynamoDB for data storage and SNS/SQS messaging systems for reliable data flow. Built robust Python-based serverless functions that automatically handled variable election data loads while maintaining performance and reliability. Leveraged existing IAM policies and cloud architecture to deliver scalable data processing solutions under tight deadlines. This project demonstrates expertise in serverless development and the ability to build efficient applications within established cloud environments.',
    skills: [Skill.AWS_LAMBDA, Skill.PYTHON, Skill.SERVERLESS_DEVELOPMENT, Skill.DYNAMODB, Skill.SNS_SQS_MESSAGING],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'democracy-engine.mp3',
    projectStory: 'Election data doesn\'t arrive in a steady stream—it comes in waves. A thousand records one hour, a hundred thousand the next. I built serverless systems that could scale automatically, spinning up resources when the flood came and scaling back down when it passed. Lambda functions that processed voter engagement data, DynamoDB tables that stored it, message queues that kept everything flowing smoothly. The infrastructure was invisible when it worked, which was the point. Nobody thinks about the pipes until the water stops flowing. My job was to make sure it never did.',
    sunoLyrics: `Verse
Data don't trickle, it crashes in waves
Quiet for hours, then it's everything all at once
I flip the switch when the pressure breaks
Built it to bend, never built it to stop

Pre-Chorus
When the surge hits hard, I don't even blink
Already scaled before you think

Chorus
I was built for the surge, built to stay alive
When the numbers run wild, yeah, the system survives
You don't see the work when it's running clean
That's the power of the engine in between
If the pipes stay quiet, flowing all day
That's how you know I did my job okay

Bridge
Functions ignite, tables hold the truth
Messages move like they've got nothing to prove
No spotlight, no fame, just uptime divine
If nothing breaks, then the work shines

Final Chorus
Built for the surge, built to never stall
When the flood comes fast, I handle it all
You won't think about it, and that's the sign
Everything's moving right on time`,
    displayLyrics: `Data don't trickle, it crashes in waves
Quiet for hours, then it's everything all at once
I flip the switch when the pressure breaks
Built it to bend, never built it to stop

When the surge hits hard, I don't even blink
Already scaled before you think

I was built for the surge, built to stay alive
When the numbers run wild, yeah, the system survives
You don't see the work when it's running clean
That's the power of the engine in between

If the pipes stay quiet, flowing all day
That's how you know I did my job okay

Functions ignite, tables hold the truth
Messages move like they've got nothing to prove
No spotlight, no fame, just uptime divine
If nothing breaks, then the work shines

Built for the surge, built to never stall
When the flood comes fast, I handle it all
You won't think about it, and that's the sign
Everything's moving right on time`,
    sunoStyle: `Up-tempo, four-on-the-floor dance-pop built for arenas and Pride parades. Bright, glossy electro-synths with a slightly gritty edge, pounding kick, snapping claps, and a simple, chant-ready chord progression. The groove is relentless and uplifting, leaning on classic house rhythms filtered through modern pop maximalism. Melodies are bold and declarative, designed to be shouted by a crowd rather than crooned.

Vocals are theatrical and fearless, delivered with a preacher-meets-club-MC attitude. Verses feel spoken-sung and confrontational; the chorus explodes into a huge, anthemic hook with layered harmonies and stacked vocals. The performance sells confidence, defiance, and radical self-acceptance. Lyrics read like a manifesto, blunt, repetitive, intentionally slogan-like. Overall vibe: unapologetic empowerment wrapped in glossy, high-energy dance music that prioritizes impact over subtlety.`,
    canvas: 'democracy-engine.mp4',
    canvasPoster: 'democracy-engine.mp4',
    albumArtBasedOn: 'Born This Way by Lady Gaga'
};
