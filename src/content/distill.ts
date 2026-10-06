export type DistillBucket = 'why' | 'prep' | 'traits'

export interface DistillPrompt {
  id: string
  bucket: DistillBucket
  number: number
  prompt: string
  hint: string
  placeholder: string
}

/** 18 life-story prompts that feed the 3 EF&R screening answers. */
export const distillPrompts: DistillPrompt[] = [
  {
    id: 'd-spark',
    bucket: 'why',
    number: 1,
    prompt: 'When did the idea of becoming a firefighter first stick with you?',
    hint: 'A moment, person, or season — not a whole autobiography.',
    placeholder: 'e.g. After volunteering at… / Watching how my uncle… / A call I witnessed…',
  },
  {
    id: 'd-service-model',
    bucket: 'why',
    number: 2,
    prompt: 'Who in your life models service, and what did you learn from them?',
    hint: 'Family, coach, mentor, coworker — name the behavior you absorbed.',
    placeholder: 'e.g. My mom always… and I learned that…',
  },
  {
    id: 'd-helped-someone',
    bucket: 'why',
    number: 3,
    prompt:
      'Describe a time you helped someone who was scared, hurt, overwhelmed, or alone.',
    hint: 'What you did, how they felt after, what it taught you about people-care.',
    placeholder: 'Situation → what you did → how it landed…',
  },
  {
    id: 'd-people-care-now',
    bucket: 'why',
    number: 4,
    prompt: 'What does helping people look like in your life right now?',
    hint: 'Job, family, volunteering, coaching — concrete, present-tense.',
    placeholder: 'Day to day I…',
  },
  {
    id: 'd-why-fire-not-other',
    bucket: 'why',
    number: 5,
    prompt: 'Why fire / EMS instead of another helping career?',
    hint: 'Team + craft + emergency service. Skip “adrenaline” and movie-fire talk.',
    placeholder: 'I want the combination of…',
  },
  {
    id: 'd-ems-reality',
    bucket: 'why',
    number: 6,
    prompt: 'Most calls are medical. How do you feel about that — honestly?',
    hint: 'Show you want people-care, not only structure fires.',
    placeholder: 'I’m drawn to that because…',
  },
  {
    id: 'd-fitness',
    bucket: 'prep',
    number: 7,
    prompt: 'What are you doing for fitness right now?',
    hint: 'Frequency, focus (cardio, strength, CPAT-style), honesty about the plan.',
    placeholder: 'I train … days a week…',
  },
  {
    id: 'd-certs',
    bucket: 'prep',
    number: 8,
    prompt: 'What certifications, classes, or training have you completed or started?',
    hint: 'EMT plans, First Aid/CPR, academy research, degrees, relevant licenses.',
    placeholder: 'I’ve completed / I’m working on…',
  },
  {
    id: 'd-exposure',
    bucket: 'prep',
    number: 9,
    prompt:
      'Have you done ride-alongs, station visits, volunteering, or community service? What stuck?',
    hint: 'Even one visit counts — name what you observed about crew life.',
    placeholder: 'I visited / volunteered… and what stuck was…',
  },
  {
    id: 'd-efr-research',
    bucket: 'prep',
    number: 10,
    prompt: 'What have you researched about Eastside Fire & Rescue specifically?',
    hint: 'Partner model, communities, URDS values, MIH, WUI/tech — show homework.',
    placeholder: 'I know EF&R is… and that matters to me because…',
  },
  {
    id: 'd-hard-training',
    bucket: 'prep',
    number: 11,
    prompt: 'Tell a short story of the hardest thing you’ve trained through — physical or academic.',
    hint: 'Shows Determination. What you changed after.',
    placeholder: 'I struggled with… so I… and the result was…',
  },
  {
    id: 'd-stress-prep',
    bucket: 'prep',
    number: 12,
    prompt: 'How do you prepare yourself for stress, long days, or interrupted sleep?',
    hint: 'Habits: sleep, recovery, mental reset, asking for help.',
    placeholder: 'My habits are…',
  },
  {
    id: 'd-trait-labels',
    bucket: 'traits',
    number: 13,
    prompt: 'What 2–3 traits would people who know you well use to describe you?',
    hint: 'Words you’ll own on the panel. Be specific, not generic “hard worker.”',
    placeholder: 'Reliable, calm under pressure, humble teammate…',
  },
  {
    id: 'd-reliability',
    bucket: 'traits',
    number: 14,
    prompt: 'Story: a time you showed up when it was inconvenient — and it mattered.',
    hint: 'Reliability / Determination. Keep it 45–60 seconds spoken.',
    placeholder: 'Situation → what you did → result…',
  },
  {
    id: 'd-calm',
    bucket: 'traits',
    number: 15,
    prompt: 'Story: a time you stayed calm when things went sideways.',
    hint: 'Composure under stress. What you prioritized.',
    placeholder: 'Situation → how you slowed down → what you did…',
  },
  {
    id: 'd-team',
    bucket: 'traits',
    number: 16,
    prompt: 'Story: a time you put the team ahead of your ego.',
    hint: 'Unity. Firehouses live together — prove you get that.',
    placeholder: 'I wanted X, but the team needed Y, so I…',
  },
  {
    id: 'd-integrity',
    bucket: 'traits',
    number: 17,
    prompt: 'Story: a time your integrity was tested (even when no one was watching).',
    hint: 'Honesty that cost you convenience. Result that protected trust.',
    placeholder: 'I could have… but I… because…',
  },
  {
    id: 'd-value-hook',
    bucket: 'traits',
    number: 18,
    prompt:
      'Which EF&R value fits you most — Unity, Respect, Determination, or Safety — and what story proves it?',
    hint: 'Pick one. Bridge the story to crew life.',
    placeholder: 'I connect most with … because… For example…',
  },
]

export const distillBucketLabels: Record<DistillBucket, string> = {
  why: 'Why firefighter',
  prep: 'What you’ve done to prepare',
  traits: 'Traits you bring',
}

export const distillBucketQuestionIds: Record<DistillBucket, string> = {
  why: 'q-why-ff',
  prep: 'q-prep',
  traits: 'q-efr-traits',
}

export function promptsForBucket(bucket: DistillBucket): DistillPrompt[] {
  return distillPrompts.filter((p) => p.bucket === bucket)
}

function clean(text: string | undefined): string {
  return (text ?? '').trim().replace(/\s+/g, ' ')
}

function sentences(parts: string[]): string {
  return parts
    .map((p) => {
      const t = clean(p)
      if (!t) return ''
      return /[.!?]$/.test(t) ? t : `${t}.`
    })
    .filter(Boolean)
    .join(' ')
}

function filled(
  answers: Record<string, string>,
  ids: string[],
): string[] {
  return ids.map((id) => clean(answers[id])).filter(Boolean)
}

function asClause(text: string): string {
  return clean(text).replace(/^[Bb]ecause\s+/, '').replace(/[.!?]+$/, '')
}

function asFollowOn(text: string): string {
  const t = clean(text)
  if (/^[Ii]\s/.test(t)) return t
  return t.charAt(0).toLowerCase() + t.slice(1)
}

/** Weave life-story answers into a spoken draft for one screening question. */
export function distillBucketDraft(
  bucket: DistillBucket,
  answers: Record<string, string>,
): string {
  if (bucket === 'why') {
    const [spark, model, helped, now, whyFire, ems] = filled(answers, [
      'd-spark',
      'd-service-model',
      'd-helped-someone',
      'd-people-care-now',
      'd-why-fire-not-other',
      'd-ems-reality',
    ])
    const parts: string[] = []
    if (spark) {
      if (/^I want to be a firefighter/i.test(spark)) parts.push(spark)
      else if (/^I /i.test(spark)) {
        parts.push('I want to be a firefighter')
        parts.push(spark)
      } else {
        parts.push(`I want to be a firefighter because ${asClause(spark)}`)
      }
    } else {
      parts.push(
        'I want to be a firefighter because service and teamwork are how I want to spend my working life',
      )
    }
    if (model) parts.push(`People around me shaped that — ${asFollowOn(model)}`)
    if (helped) parts.push(`A concrete example: ${asFollowOn(helped)}`)
    if (now) parts.push(`That still shows up in how I live: ${asFollowOn(now)}`)
    if (whyFire) {
      parts.push(
        `I chose fire and EMS over other paths because ${asClause(whyFire)}`,
      )
    }
    if (ems) parts.push(`I know most calls are medical, and ${asClause(ems)}`)
    parts.push(
      'I am ready to bring that same steady care to a crew and the communities they protect',
    )
    return sentences(parts)
  }

  if (bucket === 'prep') {
    const [fitness, certs, exposure, efr, hard, stress] = filled(answers, [
      'd-fitness',
      'd-certs',
      'd-exposure',
      'd-efr-research',
      'd-hard-training',
      'd-stress-prep',
    ])
    const parts: string[] = ['I have been preparing in a few concrete ways']
    if (fitness) parts.push(`Physically, ${asFollowOn(fitness)}`)
    if (certs) parts.push(`For training and credentials, ${asFollowOn(certs)}`)
    if (exposure) parts.push(`For real exposure to the work, ${asFollowOn(exposure)}`)
    if (efr) parts.push(`Specifically for Eastside Fire & Rescue, ${asFollowOn(efr)}`)
    if (hard) parts.push(`When preparation got hard, ${asFollowOn(hard)}`)
    if (stress) parts.push(`I also prepare for the mental side: ${asFollowOn(stress)}`)
    if (parts.length === 1) {
      return 'I am still filling in my preparation details — complete the intake prompts so this draft uses your real evidence.'
    }
    parts.push(
      'I am not done learning, but I am building the habits a probationary firefighter needs',
    )
    return sentences(parts)
  }

  const [labels, reliability, calm, team, integrity, value] = filled(answers, [
    'd-trait-labels',
    'd-reliability',
    'd-calm',
    'd-team',
    'd-integrity',
    'd-value-hook',
  ])
  const parts: string[] = []
  if (labels) {
    const traitList = labels.replace(/^I (am|bring) /i, '').replace(/^The traits I bring are /i, '')
    parts.push(`The traits I bring are ${traitList}`)
  } else {
    parts.push('The traits I bring are reliability, composure, and being a teammate first')
  }
  if (reliability) parts.push(`For reliability: ${asFollowOn(reliability)}`)
  if (calm) parts.push(`For composure: ${asFollowOn(calm)}`)
  if (team) parts.push(`For teamwork: ${asFollowOn(team)}`)
  if (integrity) parts.push(`For integrity: ${asFollowOn(integrity)}`)
  if (value) parts.push(`Tied to EF&R’s values, ${asFollowOn(value)}`)
  parts.push(
    'On a crew those traits mean I show up ready, I communicate early, and I protect trust',
  )
  return sentences(parts)
}

export function distillAllDrafts(answers: Record<string, string>): Record<
  DistillBucket,
  string
> {
  return {
    why: distillBucketDraft('why', answers),
    prep: distillBucketDraft('prep', answers),
    traits: distillBucketDraft('traits', answers),
  }
}

export function distillProgress(answers: Record<string, string>): {
  answered: number
  total: number
  byBucket: Record<DistillBucket, { answered: number; total: number }>
} {
  const byBucket = {
    why: { answered: 0, total: 0 },
    prep: { answered: 0, total: 0 },
    traits: { answered: 0, total: 0 },
  }
  let answered = 0
  for (const p of distillPrompts) {
    byBucket[p.bucket].total += 1
    if (clean(answers[p.id])) {
      byBucket[p.bucket].answered += 1
      answered += 1
    }
  }
  return { answered, total: distillPrompts.length, byBucket }
}
