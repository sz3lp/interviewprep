import type { Department } from '../types'

export const efr: Department = {
  id: 'efr',
  shortName: 'EF&R',
  fullName: 'Eastside Fire & Rescue',
  mission: 'Excellence in Service – Dedication to Community',
  vision:
    'Lead with excellence in selfless and professional service, distinguished by integrity, compassion, and expertise.',
  values: [
    {
      name: 'Unity',
      detail:
        'A supportive fire family where everyone belongs and diversity is embraced so every community gets the best service.',
    },
    {
      name: 'Respect',
      detail:
        'With compassion, see, hear, and value each other and the communities served.',
    },
    {
      name: 'Determination',
      detail:
        'Take pride in the privilege and responsibility entrusted to you; hold yourself accountable.',
    },
    {
      name: 'Safety',
      detail:
        'Highest standards of professional and personal safety; a culture of trust and well-being.',
    },
  ],
  lookFors: [
    'Values alignment (Unity, Respect, Determination, Safety)',
    'Interest in a regional partner agency — not just “any Eastside dept”',
    'Comfort with EMS + fire + diverse call types',
    'Team player who can live and train with a crew',
    'Honesty, composure, and specific examples',
  ],
  coverage:
    'Regional footprint across East King County — urban, suburban, rural, and wildland-urban interface communities. Public materials cite a large multi-battalion response area with roughly mid-to-high teens of thousands of calls per year (verify current NTN/dept figures).',
  orgModel:
    'Joint fire agency formed in 1999 under an interlocal agreement — not a single city department. Founding principle: better together as Partners. Partners include King County Fire Districts 10 & 38 and the cities of Issaquah, North Bend, and Sammamish. Contract customers publicly listed include Mercer Island, Woodinville Fire & Rescue, KCFD 45 (Duvall), and the Snoqualmie Indian Tribe.',
  stations: [
    'Issaquah: HQ; St. 71 Sunset Way; St. 72 Maple Street; St. 73 Issaquah Highlands',
    'May Valley: St. 78',
    'Sammamish: St. 81 Pine Lake; St. 82 Sahalee; St. 83 Klahanie',
    'Carnation: St. 85',
    'Duvall: St. 66 Downtown; St. 67 Cherry Valley',
    'North Bend: St. 87',
    'Mercer Island: St. 91 North; St. 92 South',
    'Woodinville: St. 31 Downtown; St. 33 Bear Creek; St. 35 Cottage Lake',
  ],
  specialties: [
    'Fire suppression & EMS',
    'Technical rescue (rope, structural collapse, confined space, trench)',
    'Swiftwater / boat',
    'Hazmat',
    'Wildland / WUI',
    'Mobile Integrated Health / CORE Connect (FD CARES partnership themes)',
    'Emergency management & public education',
  ],
  talkingPoints: [
    'Multi-community partner model — one employer serving many communities with shared standards.',
    'Terrain diversity: suburban cores, rural valleys, WUI, trails, and water.',
    'Growth/consolidation themes: Mercer Island integration; KCFD 45/Duvall contract.',
    'Integrated health follow-up beyond the 911 call (CORE / MIH).',
    'Academy path via South King County Fire Training Consortium (~20 weeks); EMT obtained in academy — not required pre-hire per public Path-to-EFR materials.',
  ],
  whyAngle:
    'Sound like someone who wants a growing regional partner agency — multi-community service, consolidation professionalism, WUI/tech rescue, and integrated health — not “I want any busy Eastside department.”',
  whyDraft: `I've done my homework on Eastside Fire & Rescue, and what stands out to me is your unique regional partnership model, your operational diversity, and your proactive approach to community care. EF&R isn't a typical single-city agency—by uniting Issaquah, Sammamish, North Bend, and Districts 10 and 38 under an interlocal model, you protect nearly 190 square miles and over 140,000 people with high fiscal efficiency and regional collaboration. Covering this district demands versatility: suburban medicals, I-90 extrications, technical rescue on Tiger Mountain, or WUI threat in a single shift. Coming from Overlake's cardiac and stroke floor and volunteering at Snoqualmie Pass, that dynamic environment is where I want to train. Your commitment to Mobile Integrated Health shows a department dedicated to long-term patient dignity, and Unity, Respect, Determination, and Safety match how I already live—supporting family through chronic illness and showing up for crew on the drill ground. I don't want to be a firefighter anywhere; I want to invest a career into the agency protecting the Eastside communities I call home.`,
  process: [
    {
      id: 'screening',
      label: 'Screening Interview',
      windowLabel: 'Oct 5–9, 2026',
      startDate: '2026-10-05',
      endDate: '2026-10-09',
      durationMinutes: 7,
      questionCount: 3,
      format: '7 minutes · 2–3 person panel · 3 questions · get-to-know-you',
      notes:
        'Your reported screening set: (1) Why do you want to be a firefighter? (2) What have you done to prepare? (3) What traits do you bring? Verify invite time via email.',
    },
    {
      id: 'oral',
      label: 'Oral Board',
      windowLabel: 'Oct 12–16, 2026',
      startDate: '2026-10-12',
      endDate: '2026-10-16',
      durationMinutes: 30,
      format: '30 minutes · 4-person panel · questions viewable beforehand',
      notes:
        'Public materials state questions can be viewed before the interview — use advance-prep mode in the simulator.',
    },
    {
      id: 'leadership',
      label: 'Leadership Interview',
      windowLabel: 'Oct 19–23, 2026',
      startDate: '2026-10-19',
      endDate: '2026-10-23',
      durationMinutes: 30,
      format: '30 minutes with BCs / Deputy Chiefs / Deputy Directors',
      notes:
        'CPAT and veterans docs timing per Path-to-EFR. Focus on fit, judgment, and authenticity.',
    },
  ],
  facts: [
    {
      id: 'efr-mission',
      prompt: 'What is EF&R’s mission cue?',
      answer: 'Excellence in Service – Dedication to Community',
      tags: ['mission'],
    },
    {
      id: 'efr-values',
      prompt: 'Name EF&R’s four values.',
      answer: 'Unity, Respect, Determination, Safety',
      tags: ['values'],
    },
    {
      id: 'efr-org',
      prompt: 'What kind of organization is EF&R?',
      answer:
        'A joint fire agency formed in 1999 under an interlocal agreement — partners stronger together, not a single city department.',
      tags: ['org'],
    },
    {
      id: 'efr-partners',
      prompt: 'Name key partner / contract communities.',
      answer:
        'Partners: KCFD 10 & 38, Issaquah, North Bend, Sammamish. Contracts publicly listed: Mercer Island, Woodinville, KCFD 45/Duvall, Snoqualmie Tribe.',
      tags: ['coverage'],
    },
    {
      id: 'efr-hq',
      prompt: 'Where is EF&R headquarters?',
      answer: '175 Newport Way NW, Issaquah, WA 98027',
      tags: ['logistics'],
    },
    {
      id: 'efr-academy',
      prompt: 'Where do recruits train, and is EMT required before hire?',
      answer:
        'South King County Fire Training Consortium (~20 weeks). EMT not required pre-hire per public Path-to-EFR — obtained in academy.',
      tags: ['academy'],
    },
    {
      id: 'efr-screen',
      prompt: 'Describe the screening interview format.',
      answer: 'About 7 minutes, 2–3 person panel, 3 get-to-know-you questions.',
      tags: ['process'],
    },
    {
      id: 'efr-screen-questions',
      prompt: 'What are the three EF&R screening questions?',
      answer:
        'Why do you want to be a firefighter? · What have you done to prepare? · What traits do you bring?',
      tags: ['process'],
    },
    {
      id: 'efr-oral',
      prompt: 'Describe the oral board format.',
      answer:
        'About 30 minutes, 4-person panel; public materials say questions are viewable beforehand.',
      tags: ['process'],
    },
    {
      id: 'efr-mih',
      prompt: 'What is a non-fire talking point that shows you researched EF&R?',
      answer:
        'Mobile Integrated Health / CORE Connect — follow-up care and community partnership beyond the initial 911 response.',
      tags: ['themes'],
    },
    {
      id: 'efr-wui',
      prompt: 'What response environments should you mention?',
      answer:
        'Urban/suburban EMS and fire, rural areas, wildland-urban interface, trails, and water/swiftwater capability.',
      tags: ['coverage'],
    },
  ],
  sources: [
    {
      label: 'Mission, Vision, Values',
      url: 'https://eastsidefire-rescue.org/162/Mission-Vision-Values-Strategic-Plan',
    },
    {
      label: 'About EF&R',
      url: 'https://www.eastsidefire-rescue.org/27/About-EFR',
    },
    {
      label: 'Fire Stations',
      url: 'https://www.eastsidefire-rescue.org/161/Fire-Stations',
    },
    {
      label: 'Firefighter Information',
      url: 'https://eastsidefire-rescue.org/232/Firefighter-Information',
    },
    {
      label: 'Path to EF&R (PDF)',
      url: 'https://www.eastsidefire-rescue.org/DocumentCenter/View/1428/Path-to-EFR',
    },
  ],
  logistics: [
    'Verify invite times in email (check spam).',
    'Arrive early; professional attire.',
    'Have PHQ / application details ready to discuss.',
    'CPAT timing per Path-to-EFR (by leadership stage).',
    'Know Unity / Respect / Determination / Safety cold.',
  ],
}
