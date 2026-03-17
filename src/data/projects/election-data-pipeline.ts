import { AlbumCategory, Skill, RawProject } from '@/types';

export const electionDataPipeline: RawProject = {
    id: 'election-data-pipeline',
    title: 'Election Data Pipeline',
    artist: 'Project - DDx',
    album: AlbumCategory.PRESIDENTIAL_ELECTION_2024,
    duration: '8 months',
    image: '/assets/images/album-art/ddx-election.png',
    year: '2024',
    impact: '20.4M records',
    description: 'Mission-critical data engineering delivering 20.4 million voter engagement records to campaign systems during the final two months of the 2024 presidential election. Built sophisticated Python ETL pipelines that transformed and routed high-volume survey data while logging all transactions in Snowflake for full traceability. Designed a tunable throttling mechanism to manage throughput and ensure reliable, large-scale data transfer under extreme time pressure. The system preserved integrity across millions of daily records, enabling timely voter outreach during a decisive election period, showcasing expertise in high-stakes data engineering and operational problem-solving.',
    skills: [Skill.PYTHON, Skill.SNOWFLAKE, Skill.ETL_PIPELINES, Skill.DATA_TRANSFORMATION, Skill.CAMPAIGN_DATA_SYSTEMS],
    demoUrl: null,
    githubUrl: null,
    musicFile: 'election-data-pipeline.mp3',
    projectStory: 'It was September 2024, two months before the presidential election, and I was responsible for getting voter survey data to the DNC. Over 20 million records had to be delivered accurately and on time. The pressure was immense. If my code failed or the data was wrong, campaign personnel across the Democratic party would be working from bad information. By election day, 20.4 million records had moved through my pipelines. When the election results came in, I was devastated, but knew it would have been even worse without my work.',
    sunoLyrics: `September clocks were ticking loud
Two months out, no room for doubt
Names and numbers, doors and calls
Flowing through the wires and walls

Twenty million moving parts
Every knock a fragile start
If it breaks, the phones go quiet
Bad data turns the noise to static

Count the rows
Watch them go
Overnight the numbers grow
Check again
Still in line
Hundreds of thousands, every time

Morning light, the logs run clean
Pipelines hold, unseen machine
Election day, the final sum
Twenty point four, all accounted, done

The answer came, the screen went dark
The loss still hit, it left a mark
But in the flow, I still can say
It would have been worse
If it failed that day

Count the rows
Watch them go
Overnight the numbers grow
Check again
Still in line
Hundreds of thousands, every time

Count the rows
Watch them go
Overnight the numbers grow
Check again
Still in line
Hundreds of thousands, every time`,
    displayLyrics: null,
    sunoStyle: null,
    canvas: 'election-data-pipeline.mp4',
    canvasPoster: 'election-data-pipeline.mp4',
    albumArtBasedOn: 'Tubular Bells by Mike Oldfield'
};
