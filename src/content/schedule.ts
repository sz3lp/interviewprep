import type { BattlePlanDay } from './types'

/** Countdown-aware daily plan. Edit freely. */
export const battlePlan: BattlePlanDay[] = [
  {
    date: '2026-10-04',
    focus: 'Build the foundation — bio + Why EF&R + values',
    tasks: [
      'Fill Tell-me-about-yourself spoken bio in stories.ts',
      'Memorize EF&R values: Unity, Respect, Determination, Safety',
      'Draft Why EF&R (3 specific facts minimum)',
      'Run one 7-minute EF&R screening simulator',
    ],
  },
  {
    date: '2026-10-05',
    focus: 'EF&R screening window opens — sharpen the short game',
    tasks: [
      'Drill Tell me about yourself aloud ×5',
      'Drill Why firefighting + Why EF&R aloud ×5',
      'Flashcard all EF&R facts to confidence 3+',
      'Two full 7-minute screening sims; score yourself honestly',
    ],
  },
  {
    date: '2026-10-06',
    focus: 'Your three EF&R screening questions — on repeat',
    tasks: [
      'Distill: answer life-story prompts → build the 3 drafts',
      'Scroll Prep: why firefighter · prepare · traits',
      'Run one 7-min sim with the exact three-question set',
      'Map traits answer to URDS (Unity, Respect, Determination, Safety)',
    ],
  },
  {
    date: '2026-10-07',
    focus: 'EF&R interview day energy — your target date',
    tasks: [
      'Light review only: values, Why EF&R, bio',
      'One calm 7-minute sim — then stop drilling',
      'Logistics: clothes, route, water, arrive early plan',
      'Sleep and reset — no cramming new material',
    ],
  },
  {
    date: '2026-10-08',
    focus: 'Debrief EF&R screen · start Bellingham mission language',
    tasks: [
      'Write what went well / what to improve from EF&R',
      'Memorize Helping People Every Day + What We Look For themes',
      'Draft Why Bellingham + personal meaning of the mission',
      'Flashcard BFD facts',
    ],
  },
  {
    date: '2026-10-09',
    focus: 'Close EF&R screening window · build BFD speed answers',
    tasks: [
      'If still in EF&R window: light values review',
      'Build 8-minute BFD speed answer pack (bio, why FF, why BFD, mission)',
      'Practice virtual setup: camera, lighting, quiet background',
      'One 8-minute speed sim',
    ],
  },
  {
    date: '2026-10-10',
    focus: 'STAR depth for oral boards ahead',
    tasks: [
      'Finish remaining STAR placeholders with real stories',
      'Conflict + mistake stories practiced aloud',
      'Scenario skeleton drill: Safety → problem → chain of command → follow-up',
      'Weak Spot mode — fix lowest confidence items',
    ],
  },
  {
    date: '2026-10-11',
    focus: 'BFD speed sprint weekend',
    tasks: [
      'Three 8-minute speed sims',
      'Explain Helping People Every Day three different ways (same truth)',
      'EMS-reality answer: show you want medical/people work',
      'Review BFD stations / boat / tobacco & swim logistics',
    ],
  },
  {
    date: '2026-10-12',
    focus: 'BFD speed window opens · EF&R oral window opens',
    tasks: [
      'Priority: whichever invite you have next',
      'EF&R oral: use advance-question prep mode if questions released',
      'BFD: keep speed answers crisp and warm on camera',
      'Log simulator reps and confidence updates',
    ],
  },
  {
    date: '2026-10-13',
    focus: 'Dual-track discipline',
    tasks: [
      'One EF&R 30-minute oral practice (or advance-prep if questions known)',
      'One BFD 8-minute speed sim',
      'Integrity + unsafe-order scenario practice',
      'Sleep, fitness, voice rest',
    ],
  },
  {
    date: '2026-10-14',
    focus: 'Bellingham target date — speed interview energy',
    tasks: [
      'Light review: mission, Why BFD, bio, top 3 stories',
      'One calm speed sim — then stop',
      'Virtual logistics check 30 minutes early',
      'Be human on camera — connection over perfection',
    ],
  },
  {
    date: '2026-10-15',
    focus: 'Post-speed debrief · oral board depth',
    tasks: [
      'Debrief BFD speed',
      'Full oral board simulator with rubric scoring',
      'EF&R leadership themes if still advancing',
      'Fill any remaining story placeholders',
    ],
  },
  {
    date: '2026-10-16',
    focus: 'Close short-interview windows · shift to scored orals',
    tasks: [
      'Department fact mastery check (both agencies)',
      'Long-form oral practice: structure + specificity',
      'Chiefs/leadership question set preview',
      'Export progress backup from Settings',
    ],
  },
]

export function getPlanForDate(isoDate: string): BattlePlanDay | undefined {
  return battlePlan.find((d) => d.date === isoDate)
}

export function getTodayIso(now = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
