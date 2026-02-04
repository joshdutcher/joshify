import { AlbumCategory, Skill, RawProject } from '@/types';

export const healthcareEtl: RawProject = {
    id: 'healthcare-etl',
    title: 'Medicare.gov ETL',
    artist: 'Project - Ad Hoc',
    album: AlbumCategory.API_DEVELOPMENT,
    duration: '3.5 years',
    image: '/assets/images/album-art/healthcare-etl.png',
    year: '2023',
    impact: '982K enrolled',
    description: 'Crucial healthcare data infrastructure processing millions of daily health insurance records for Medicare.gov. Engineered high-volume ETL pipelines that maintained 100% uptime during Open Enrollment periods, handling peak loads of 80,000 requests per minute and enabling 982,000 people to sign up for Medicare. Built robust, fault-tolerant systems ensuring seamless access to healthcare information for millions of Americans during critical enrollment windows. This role required deep expertise in government compliance, healthcare data standards, and building systems that never fail when people need them most.',
    skills: [Skill.PYTHON, Skill.ETL_PIPELINES, Skill.API_DEVELOPMENT, Skill.HIGH_AVAILABILITY, Skill.DATA_TRANSFORMATION],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'healthcare-etl.mp3',
    projectStory: 'Every fall, millions of Americans have a narrow window to sign up for Medicare. Miss it, and you might go without health coverage for a year. I spent three and a half years building and maintaining the data pipelines that powered Medicare.gov—the systems that processed every health insurance plan in the country so people could compare their options. During Open Enrollment, we\'d handle 80,000 requests per minute. The system couldn\'t go down. Not for a minute. Not when someone\'s grandmother was trying to find affordable prescriptions. In one seven-week stretch, 982,000 people successfully enrolled through our system. That\'s nearly a million people who got healthcare because our code worked.',
    sunoLyrics: `[Intro, spoken]
Uhh... yeah. Check it, check it. This is for the wheelers and the health data dealers. uhh.

[Verse 1]
Autumn in the borough, commence open enrollment.
Boot up online, with,, no post-ponement.
Data in controlment, commit every component.
Continuous deployment, stable at every moment.

[Verse 2]
Three years deep building the pipeline.
Serving health insurance, digital lifeline.
Eighty thousand hits a minute, we stay runnin.
Don't get it confused, the uptime is stunnin.

[Verse 3]
My peoples need health care, doctors, prescriptions.
I calculate costs within budget restrictions.
Nine hundred eighty two thousand enrolled.
Behind my data pipelines, infrastructure and code.
`,
    displayLyrics: `This is for the wheelers and the health data dealers

Autumn in the borough, commence open enrollment
Boot up online, with,, no post-ponement
Data in controlment, commit every component
Continuous deployment, stable at every moment

Three years deep building the pipeline
Serving health insurance, digital lifeline
Eighty thousand hits a minute, we stay runnin
Don't get it confused, the uptime is stunnin

My peoples need health care, doctors, prescriptions
I calculate costs within budget restrictions
Nine hundred eighty two thousand enrolled
Behind my data pipelines, infrastructure and code`,
    sunoStyle: `A 94 BPM gritty East Coast boom-bap sample-based hip-hop track with some swing to the beat. Features a deep, melodic electric bassline, jazzy horn stabs, and dusty, hard-hitting drum breaks. The vocalist is a commanding male baritone with a deep, gravelly voice. The delivery is a relaxed but precise 'heavy-breathing' flow, utilizing complex internal rhyme schemes and a laid-back rhythmic pocket. Atmospheric ad-libs and a soulful, nocturnal urban vibe.`,
    canvas: 'healthcare-etl.mp4',
    canvasPoster: 'healthcare-etl.mp4',
    albumArtBasedOn: 'Ready to Die by The Notorious B.I.G.'
};
