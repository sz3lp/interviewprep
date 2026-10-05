import { efr } from './departments/efr'
import { bfd } from './departments/bfd'
import { questions } from './questions'
import { stories } from './stories'
import type { DepartmentId, StageId } from './types'
import type { Confidence, ProgressState } from '../lib/progress'

export type FeedKind = 'speak' | 'fact' | 'value' | 'story' | 'tip' | 'why'

export interface FeedCard {
  /** Stable content key (used for confidence). */
  contentKey: string
  kind: FeedKind
  eyebrow: string
  prompt: string
  hint?: string
  reveal: string
  actionLabel: string
  progressKind?: 'facts' | 'questions' | 'stories'
  progressId?: string
  department: DepartmentId | 'shared'
  stageBias?: StageId[]
  weightBoost?: number
}

export type FeedFocus = 'efr' | 'bfd' | 'both'

const coachingTips: FeedCard[] = [
  {
    contentKey: 'tip-short-answers',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'Short answers win screening.',
    reveal:
      '7 minutes · 3 questions. Aim ~90 seconds each. Land the point, stop talking, smile.',
    actionLabel: 'Next',
    department: 'efr',
    stageBias: ['screening'],
    weightBoost: 1,
  },
  {
    contentKey: 'tip-values-cold',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'Say the four values without thinking.',
    reveal:
      'Unity · Respect · Determination · Safety. Then pick ONE and prove it with a 20-second story.',
    actionLabel: 'Next',
    department: 'efr',
    stageBias: ['screening', 'oral', 'leadership'],
  },
  {
    contentKey: 'tip-specific-efr',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'Never sound like “any Eastside dept.”',
    reveal:
      'Name the partner model, multi-community service, WUI/tech rescue, or Mobile Integrated Health. Specificity = research.',
    actionLabel: 'Next',
    department: 'efr',
  },
  {
    contentKey: 'tip-ems',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'Most calls are medical. Own it.',
    reveal:
      'Show you want people-care, not movie fires. Dignity + follow-through beats adrenaline talk.',
    actionLabel: 'Next',
    department: 'shared',
  },
  {
    contentKey: 'tip-star',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'STAR is your spine, not a script.',
    reveal:
      'Situation → Task → Action (I verbs) → Result → Lesson. Keep it under 90 seconds aloud.',
    actionLabel: 'Next',
    department: 'shared',
  },
  {
    contentKey: 'tip-panel',
    kind: 'tip',
    eyebrow: 'Coaching',
    prompt: 'Talk to people, not a wall.',
    reveal:
      'Eye contact across the panel. Warm. Human. If you blank: breathe, restate the question, start again.',
    actionLabel: 'Next',
    department: 'shared',
    stageBias: ['screening', 'oral'],
  },
]

function speakFromQuestions(focus: FeedFocus, stage?: StageId): FeedCard[] {
  return questions
    .filter((q) => {
      const deptOk =
        focus === 'both' ||
        q.departments.includes('shared') ||
        q.departments.includes(focus)
      if (!deptOk) return false
      if (!stage) return true
      return q.stages.includes(stage)
    })
    .map((q) => {
      const dept =
        q.departments.find((d): d is DepartmentId => d !== 'shared') ?? 'shared'
      return {
        contentKey: `speak-${q.id}`,
        kind: 'speak' as const,
        eyebrow: 'Say it aloud',
        prompt: q.text,
        hint: 'Answer out loud like the panel is here. Then peek the tip.',
        reveal: q.sampleOutline ? `${q.tip}\n\nOutline: ${q.sampleOutline}` : q.tip,
        actionLabel: 'Reveal tip',
        progressKind: 'questions' as const,
        progressId: q.id,
        department: dept,
        stageBias: q.stages,
        weightBoost: q.stages.includes('screening') && focus === 'efr' ? 2 : 0,
      }
    })
}

function factCards(focus: FeedFocus): FeedCard[] {
  const depts =
    focus === 'both' ? [efr, bfd] : focus === 'efr' ? [efr] : [bfd]
  return depts.flatMap((dept) =>
    dept.facts.map((f) => ({
      contentKey: `fact-${f.id}`,
      kind: 'fact' as const,
      eyebrow: `${dept.shortName} fact`,
      prompt: f.prompt,
      hint: 'Tap to flip. Know it cold.',
      reveal: f.answer,
      actionLabel: 'Reveal answer',
      progressKind: 'facts' as const,
      progressId: f.id,
      department: dept.id,
      weightBoost: 1,
    })),
  )
}

function valueCards(focus: FeedFocus): FeedCard[] {
  const cards: FeedCard[] = []
  if (focus === 'efr' || focus === 'both') {
    cards.push({
      contentKey: 'value-efr-all',
      kind: 'value',
      eyebrow: 'EF&R values',
      prompt: 'Name all four EF&R values — now.',
      hint: 'Say them out loud before you flip.',
      reveal: efr.values.map((v) => `${v.name}: ${v.detail}`).join('\n\n'),
      actionLabel: 'Reveal values',
      progressKind: 'facts',
      progressId: 'efr-values',
      department: 'efr',
      stageBias: ['screening', 'oral', 'leadership'],
      weightBoost: 3,
    })
    for (const v of efr.values) {
      cards.push({
        contentKey: `value-efr-${v.name.toLowerCase()}`,
        kind: 'value',
        eyebrow: 'EF&R value',
        prompt: `What does “${v.name}” mean at EF&R?`,
        hint: 'Explain it in your words, then check.',
        reveal: v.detail,
        actionLabel: 'Reveal',
        department: 'efr',
        weightBoost: 1,
      })
    }
  }
  if (focus === 'bfd' || focus === 'both') {
    cards.push({
      contentKey: 'value-bfd-mission',
      kind: 'value',
      eyebrow: 'BFD mission',
      prompt: 'What is Bellingham’s mission cue?',
      hint: 'Say it, then make it personal.',
      reveal: bfd.mission,
      actionLabel: 'Reveal',
      progressKind: 'facts',
      progressId: 'bfd-mission',
      department: 'bfd',
      weightBoost: 2,
    })
  }
  return cards
}

function storyCards(focus: FeedFocus): FeedCard[] {
  return stories.map((s) => {
    const valueLine =
      focus === 'bfd'
        ? s.bfdLookFors.join(' · ')
        : s.efrValues.join(' · ')
    return {
      contentKey: `story-${s.id}`,
      kind: 'story' as const,
      eyebrow: 'Story drill',
      prompt: s.title,
      hint: 'Speak 60–90 seconds. STAR. End on the lesson.',
      reveal: [
        s.spokenVersion.startsWith('[REPLACE]')
          ? 'Still a placeholder — outline the story, then practice the spine aloud.'
          : s.spokenVersion,
        '',
        `S: ${s.situation}`,
        `T: ${s.task}`,
        `A: ${s.action}`,
        `R: ${s.result}`,
        `Lesson: ${s.lesson}`,
        `Hooks: ${valueLine}`,
      ].join('\n'),
      actionLabel: 'Peek outline',
      progressKind: 'stories' as const,
      progressId: s.id,
      department: 'shared',
      weightBoost: s.placeholder ? 2 : 0,
    }
  })
}

function whyCards(focus: FeedFocus): FeedCard[] {
  const cards: FeedCard[] = []
  if (focus === 'efr' || focus === 'both') {
    cards.push({
      contentKey: 'why-efr',
      kind: 'why',
      eyebrow: 'Why EF&R',
      prompt: 'Why Eastside Fire & Rescue — 60 seconds.',
      hint: efr.whyAngle,
      reveal: efr.whyDraft,
      actionLabel: 'Peek draft',
      progressKind: 'questions',
      progressId: 'q-why-efr',
      department: 'efr',
      stageBias: ['screening', 'oral', 'leadership'],
      weightBoost: 4,
    })
  }
  if (focus === 'bfd' || focus === 'both') {
    cards.push({
      contentKey: 'why-bfd',
      kind: 'why',
      eyebrow: 'Why BFD',
      prompt: 'Why Bellingham Fire — 60 seconds.',
      hint: bfd.whyAngle,
      reveal: bfd.whyDraft,
      actionLabel: 'Peek draft',
      progressKind: 'questions',
      progressId: 'q-why-bfd',
      department: 'bfd',
      weightBoost: 3,
    })
  }
  return cards
}

export function buildFeedPool(focus: FeedFocus, stage?: StageId): FeedCard[] {
  const tips =
    focus === 'both'
      ? coachingTips
      : coachingTips.filter(
          (t) => t.department === 'shared' || t.department === focus,
        )

  return [
    ...speakFromQuestions(focus, stage),
    ...factCards(focus),
    ...valueCards(focus),
    ...storyCards(focus),
    ...whyCards(focus),
    ...tips.filter((t) => !stage || !t.stageBias || t.stageBias.includes(stage)),
  ]
}

function confidenceFor(card: FeedCard, state: ProgressState): Confidence {
  if (!card.progressKind || !card.progressId) return 2
  return (state[card.progressKind][card.progressId]?.confidence ?? 0) as Confidence
}

function weight(
  card: FeedCard,
  state: ProgressState,
  stage?: StageId,
): number {
  const conf = confidenceFor(card, state)
  let w = 5 - conf + (card.weightBoost ?? 0)
  if (stage && card.stageBias?.includes(stage)) w += 3
  if (card.kind === 'tip') w = Math.max(1, w - 1)
  return Math.max(1, w)
}

function weightedPick(
  pool: FeedCard[],
  state: ProgressState,
  stage: StageId | undefined,
  avoid: Set<string>,
  rng: () => number,
): FeedCard | undefined {
  const candidates = pool.filter((c) => !avoid.has(c.contentKey))
  const source = candidates.length ? candidates : pool
  if (!source.length) return undefined

  const weights = source.map((c) => weight(c, state, stage))
  const total = weights.reduce((a, b) => a + b, 0)
  let r = rng() * total
  for (let i = 0; i < source.length; i++) {
    r -= weights[i]
    if (r <= 0) return source[i]
  }
  return source[source.length - 1]
}

/** Build an endless-feeling queue biased to weak spots + stage. */
export function buildFeedQueue(
  focus: FeedFocus,
  state: ProgressState,
  opts: { stage?: StageId; length?: number; rng?: () => number } = {},
): FeedCard[] {
  const pool = buildFeedPool(focus, opts.stage)
  const length = opts.length ?? 40
  const rng = opts.rng ?? Math.random
  const recent = new Set<string>()
  const queue: FeedCard[] = []

  for (let i = 0; i < length; i++) {
    const card = weightedPick(pool, state, opts.stage, recent, rng)
    if (!card) break
    queue.push(card)
    recent.add(card.contentKey)
    if (recent.size > 8) {
      const first = recent.values().next().value
      if (first) recent.delete(first)
    }
  }

  return queue
}
