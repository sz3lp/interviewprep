import { efr } from './departments/efr'
import { screeningDrafts } from './stories'

export type MemorizeTrack = 'answers' | 'facts'

export interface AnswerBeat {
  id: string
  questionId: 'q-why-ff' | 'q-prep' | 'q-efr-traits'
  questionLabel: string
  beatIndex: number
  beatTotal: number
  cue: string
  text: string
}

export interface MemorizeFact {
  id: string
  prompt: string
  answer: string
  tag: string
}

const questionMeta = [
  {
    id: 'q-why-ff' as const,
    label: 'Why firefighter?',
    draft: screeningDrafts.why,
    cues: [
      'Dad’s femur morning — never the bystander',
      'Craft + crew + uncontrolled scene (not hospital-only)',
      'EF&R partner model — why NOT any city dept',
      'MIH + medical calls + URDS close',
      'Not shopping agencies — earn this seat',
    ],
  },
  {
    id: 'q-prep' as const,
    label: 'What have you done to prepare?',
    draft: screeningDrafts.prep,
    cues: [
      'Useful inside EF&R’s system — not generic “fire ready”',
      'KCEMS EMT + Overlake — your medical language',
      'Snoqualmie Pass habits + fitness for EF&R seat',
      'Partner homework + MIH + URDS — only works here',
      'Close: taught your standards, not a paste résumé',
    ],
  },
  {
    id: 'q-efr-traits' as const,
    label: 'What traits do you bring?',
    draft: screeningDrafts.traits,
    cues: [
      'Steady / self-directed / intentional under URDS',
      'Steady — Overlake neuro + EMS-heavy EF&R',
      'Self-directed — Pass bay + rain callback',
      'Intentional — Connor correction + Skip',
      'Unity/Safety ladder stop',
      'Recruit close — learn EF&R’s way',
    ],
  },
]

function splitBeats(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export const answerBeats: AnswerBeat[] = questionMeta.flatMap((q) => {
  const parts = splitBeats(q.draft)
  return parts.map((text, i) => ({
    id: `${q.id}-beat-${i}`,
    questionId: q.id,
    questionLabel: q.label,
    beatIndex: i,
    beatTotal: parts.length,
    cue: q.cues[i] ?? `Beat ${i + 1}`,
    text,
  }))
})

export function beatsForQuestion(
  questionId: AnswerBeat['questionId'],
): AnswerBeat[] {
  return answerBeats.filter((b) => b.questionId === questionId)
}

export function fullDraft(questionId: AnswerBeat['questionId']): string {
  return screeningDrafts[
    questionId === 'q-why-ff' ? 'why' : questionId === 'q-prep' ? 'prep' : 'traits'
  ]
}

/** High-yield EF&R facts for active recall (screening-relevant). */
export const memorizeFacts: MemorizeFact[] = [
  ...efr.facts.map((f) => ({
    id: f.id,
    prompt: f.prompt,
    answer: f.answer,
    tag: f.tags[0] ?? 'fact',
  })),
  {
    id: 'mem-partners',
    prompt: 'Name EF&R’s partner jurisdictions (not contracts).',
    answer:
      'Issaquah, Sammamish, North Bend, King County Fire Districts 10 & 38.',
    tag: 'org',
  },
  {
    id: 'mem-urds',
    prompt: 'What does URDS stand for?',
    answer: 'Unity, Respect, Determination, Safety.',
    tag: 'values',
  },
  {
    id: 'mem-mih',
    prompt: 'Why mention Mobile Integrated Health in an EF&R answer?',
    answer:
      'Shows research beyond fires — follow-up care / community partnership past the 911 call; ties to dignity after the crisis.',
    tag: 'themes',
  },
  {
    id: 'mem-call-mix',
    prompt: 'Name 4 call environments EF&R’s footprint creates.',
    answer:
      'Suburban EMS (e.g. Sammamish/Issaquah), I-90 corridor trauma/extrication, WUI (Tiger/Squak/Cougar), technical/wilderness rescue (and water).',
    tag: 'coverage',
  },
  {
    id: 'mem-screen-q',
    prompt: 'What are the three EF&R screening questions — in order?',
    answer:
      '1) Why do you want to be a firefighter? 2) What have you done to prepare? 3) What traits do you bring?',
    tag: 'process',
  },
  {
    id: 'mem-not-city',
    prompt: 'In one sentence: what is EF&R organizationally?',
    answer:
      'A joint / partner fire agency under an interlocal agreement — not a single-city department.',
    tag: 'org',
  },
]

export const memorizeMethodSteps = [
  'Read the beat once (study).',
  'Cover it — say it aloud from the cue only.',
  'Check yourself against the text.',
  'Mark Again / Good. Weak items come back first.',
] as const
