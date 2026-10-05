import type { Department } from '../types'

export const bfd: Department = {
  id: 'bfd',
  shortName: 'Bellingham',
  fullName: 'Bellingham Fire Department',
  mission: 'Helping People Every Day',
  vision:
    'Focus on the value and safety of people while striving for excellence in service to neighborhoods and community.',
  values: [
    {
      name: 'Cultural understanding',
      detail: 'Embrace cultural understanding and acceptance of each other.',
    },
    {
      name: 'Ethical accountability',
      detail: 'Be an organization that promotes ethical accountability.',
    },
    {
      name: 'Heard and seen',
      detail: 'Provide a safe environment for all members to be heard and seen.',
    },
    {
      name: 'Communication',
      detail: 'Promote positive and productive communication.',
    },
    {
      name: 'Grace while learning',
      detail: 'Support members and give grace while learning is taking place.',
    },
    {
      name: 'Be a resource',
      detail: 'Be a resource for members of the department.',
    },
    {
      name: 'Continuous learning',
      detail: 'Continue to learn and evolve throughout a public service career.',
    },
  ],
  lookFors: [
    'Desire to Serve',
    'Teamwork and Cooperation',
    'Results / standard of excellence',
    'Standards — physical, mental, emotional readiness',
    'Diversity, communication, ethics',
    'Ability to explain “Helping People Every Day” in your own words',
  ],
  coverage:
    'Municipal all-career city department (since 1904), also serving Whatcom County Fire District #8. Public materials describe roughly 100,000+ population served, multiple city stations plus facilities outside the city, and a heavy EMS call load (~85% medical).',
  orgModel:
    'City of Bellingham Fire Department with county ALS reach. Companies typically include Captain + Engineer + Firefighter; cross-staffed engine + BLS aid; ladder and Salish Star fire boat; Battalion 1 as command. Shift publicly described as 24/48/24/96 (0800–0800).',
  stations: [
    'Station 1 — 1800 Broadway',
    'Station 2 — 1590 Harris Ave',
    'Station 3 — 1111 Billy Frank Jr. St',
    'Station 4 — 2306 Yew St',
    'Station 5 — 3314 Northwest Ave',
    'Station 6 — 4060 Deemer Rd',
    'Satellite Medic 10 — 858 E. Smith Rd',
    'Station 31 — 752 Marine Dr',
    'Station 34 — 2600 McKenzie Rd',
  ],
  specialties: [
    'Fire operations & EMS (majority of calls medical)',
    'ALS / medic units serving city + broader Whatcom County',
    'Salish Star fire boat / waterfront readiness',
    'Community paramedicine / behavioral health co-response themes',
    'Hazmat, truck, SWAT medic tracks after hire (internal)',
  ],
  talkingPoints: [
    'Mission phrase is short — you must make it personal and concrete.',
    '~85% EMS: show you want people work, not just fires.',
    'College/port/city environment + county ALS identity.',
    'Crew living, communication, and grace while learning matter.',
    'Swim test and tobacco-free requirement are distinctive logistics.',
  ],
  whyAngle:
    'Sound like someone who wants people-first EMS culture in a college/port/city environment, comfort with behavioral-health complexity, crew living, and waterfront readiness — and can explain the mission in your own words.',
  whyDraft: `I want Bellingham Fire because the mission — Helping People Every Day — matches why I am pursuing this career. Most of the work is helping people on medical calls, in neighborhoods, and in hard moments, not just fighting fire. I am drawn to a department that publishes clear expectations around teamwork, ethical accountability, communication, and supporting people while they learn. Bellingham’s mix of city response, county ALS reach, and waterfront readiness tells me the job is real and varied. I want to earn trust on a crew that takes care of the community and each other.`,
  process: [
    {
      id: 'speed',
      label: 'Speed Interview',
      windowLabel: 'Oct 12–16, 2026',
      startDate: '2026-10-12',
      endDate: '2026-10-16',
      durationMinutes: 8,
      format: '8 minutes · virtual · pass/fail · panel of BFD members',
      notes:
        'Per public city / NTN Fall 2026 materials. Tentative window — verify invite.',
    },
    {
      id: 'oral',
      label: 'Oral Board',
      windowLabel: 'Nov 9–18, 2026',
      startDate: '2026-11-09',
      endDate: '2026-11-18',
      durationMinutes: 30,
      format: 'In-person scored oral board · ≥60% to pass',
      notes:
        'Ranking publicly weighted Written 25% + Oral 75% (+ veterans preference).',
    },
    {
      id: 'chiefs',
      label: "Chief's Interview",
      windowLabel: 'Week of Nov 30, 2026',
      startDate: '2026-11-30',
      endDate: '2026-12-04',
      durationMinutes: 30,
      format: 'In-person with BFD fire chiefs',
      notes:
        'Fit and authenticity. Conditional offers follow for most qualified candidates.',
    },
  ],
  facts: [
    {
      id: 'bfd-mission',
      prompt: 'What is Bellingham Fire’s mission?',
      answer: 'Helping People Every Day',
      tags: ['mission'],
    },
    {
      id: 'bfd-ems',
      prompt: 'About what share of emergency calls are medical?',
      answer: 'Public materials cite roughly 85% medical.',
      tags: ['coverage'],
    },
    {
      id: 'bfd-org',
      prompt: 'What kind of department is BFD?',
      answer:
        'A municipal all-career city department that also serves Whatcom County Fire District #8.',
      tags: ['org'],
    },
    {
      id: 'bfd-boat',
      prompt: 'What is a distinctive waterfront resource?',
      answer: 'The Salish Star fire boat (plus a required swim test for candidates).',
      tags: ['specialties'],
    },
    {
      id: 'bfd-speed',
      prompt: 'Describe the speed interview.',
      answer: 'About 8 minutes, virtual, pass/fail, conducted by BFD members.',
      tags: ['process'],
    },
    {
      id: 'bfd-oral',
      prompt: 'What is the oral board pass mark and ranking weight?',
      answer:
        '≥60% to pass the oral; ranking publicly Written 25% + Oral 75% (+ veterans preference).',
      tags: ['process'],
    },
    {
      id: 'bfd-lookfors',
      prompt: 'Name BFD “What We Look For” themes.',
      answer:
        'Desire to Serve, Teamwork/Cooperation, Results, Standards, Diversity.',
      tags: ['values'],
    },
    {
      id: 'bfd-tobacco',
      prompt: 'What tobacco rule is published for applicants?',
      answer:
        'No tobacco products for 24 months prior to application (per public materials).',
      tags: ['logistics'],
    },
    {
      id: 'bfd-faq',
      prompt: 'What three reflections does BFD’s FAQ emphasize?',
      answer:
        'Why you’d be a great firefighter; why Bellingham; what “Helping People Every Day” means to you.',
      tags: ['process'],
    },
    {
      id: 'bfd-office',
      prompt: 'Where is the main fire office listed?',
      answer: '1800 Broadway, Bellingham, WA 98225',
      tags: ['logistics'],
    },
  ],
  sources: [
    {
      label: 'About the Fire Department',
      url: 'https://cob.org/gov/dept/fire/about-fire',
    },
    {
      label: 'Why Bellingham Fire',
      url: 'https://cob.org/gov/dept/fire/join-fire/why-bellingham-fire-department',
    },
    {
      label: 'What We Look For',
      url: 'https://cob.org/gov/dept/fire/join-fire/what-we-look-for',
    },
    {
      label: 'About the Process',
      url: 'https://cob.org/gov/dept/fire/join-fire/about-the-process',
    },
    {
      label: 'Hiring FAQ',
      url: 'https://cob.org/gov/dept/fire/join-fire/frequently-asked-questions',
    },
    {
      label: 'Stations',
      url: 'https://cob.org/services/safety/fire-safety/stations',
    },
  ],
  logistics: [
    'Speed interview is virtual — test camera/mic/background.',
    'Practice aloud; know your life story in writing (BFD FAQ tip).',
    'Swim test and medical screenings come later in the process.',
    '24-month tobacco-free requirement per public materials.',
    'Can explain Helping People Every Day without sounding scripted.',
  ],
}
