import {
  departmentList,
  questions,
  stories,
  type DepartmentId,
  type StageId,
} from '../content'

const STORAGE_KEY = 'board-ready-progress-v1'

export type Confidence = 0 | 1 | 2 | 3 | 4

export interface ItemProgress {
  confidence: Confidence
  lastPracticed?: string
  notes?: string
  answerDraft?: string
}

export interface SimulatorRep {
  id: string
  at: string
  department: DepartmentId
  mode: string
  stage: StageId
  questionIds: string[]
  scores?: Record<string, number>
  overall?: number
}

export interface ProgressState {
  version: 1
  facts: Record<string, ItemProgress>
  questions: Record<string, ItemProgress>
  stories: Record<string, ItemProgress>
  planChecks: Record<string, boolean>
  simulatorReps: SimulatorRep[]
  flashcardIndex: Record<string, number>
}

function empty(): ProgressState {
  return {
    version: 1,
    facts: {},
    questions: {},
    stories: {},
    planChecks: {},
    simulatorReps: [],
    flashcardIndex: {},
  }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as ProgressState
    if (parsed.version !== 1) return empty()
    return {
      ...empty(),
      ...parsed,
      facts: parsed.facts ?? {},
      questions: parsed.questions ?? {},
      stories: parsed.stories ?? {},
      planChecks: parsed.planChecks ?? {},
      simulatorReps: parsed.simulatorReps ?? [],
      flashcardIndex: parsed.flashcardIndex ?? {},
    }
  } catch {
    return empty()
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function exportProgress(state: ProgressState): string {
  return JSON.stringify(state, null, 2)
}

export function importProgress(json: string): ProgressState {
  const parsed = JSON.parse(json) as ProgressState
  if (parsed.version !== 1) throw new Error('Unsupported progress file version')
  saveProgress(parsed)
  return parsed
}

export function clearProgress(): ProgressState {
  const next = empty()
  saveProgress(next)
  return next
}

function avg(nums: number[]): number {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function itemScore(map: Record<string, ItemProgress>, ids: string[]): number {
  return avg(ids.map((id) => map[id]?.confidence ?? 0)) / 4
}

export function readinessScore(state: ProgressState, deptId?: DepartmentId): number {
  const depts = deptId
    ? departmentList.filter((d) => d.id === deptId)
    : departmentList

  const factIds = depts.flatMap((d) => d.facts.map((f) => f.id))
  const factPart = itemScore(state.facts, factIds)

  const storyIds = stories.map((s) => s.id)
  const storyPart = itemScore(state.stories, storyIds)

  const qPool = questions.filter(
    (q) =>
      !deptId ||
      q.departments.includes('shared') ||
      q.departments.includes(deptId),
  )
  const questionPart = itemScore(
    state.questions,
    qPool.map((q) => q.id),
  )

  const simPart = Math.min(
    1,
    state.simulatorReps.filter((r) => !deptId || r.department === deptId).length /
      4,
  )

  const filledStories =
    stories.filter((s) => !s.placeholder || (state.stories[s.id]?.confidence ?? 0) > 0)
      .length / stories.length

  const score =
    factPart * 0.25 +
    storyPart * 0.25 +
    questionPart * 0.2 +
    simPart * 0.15 +
    filledStories * 0.15

  return Math.round(score * 100)
}

export interface WeakSpot {
  kind: 'fact' | 'question' | 'story'
  id: string
  label: string
  confidence: Confidence
  department?: DepartmentId
}

export function weakSpots(state: ProgressState, limit = 6): WeakSpot[] {
  const spots: WeakSpot[] = []

  for (const dept of departmentList) {
    for (const fact of dept.facts) {
      const c = (state.facts[fact.id]?.confidence ?? 0) as Confidence
      spots.push({
        kind: 'fact',
        id: fact.id,
        label: fact.prompt,
        confidence: c,
        department: dept.id,
      })
    }
  }

  for (const q of questions) {
    const c = (state.questions[q.id]?.confidence ?? 0) as Confidence
    spots.push({
      kind: 'question',
      id: q.id,
      label: q.text,
      confidence: c,
      department: q.departments.find((d): d is DepartmentId => d !== 'shared'),
    })
  }

  for (const s of stories) {
    const c = (state.stories[s.id]?.confidence ?? 0) as Confidence
    spots.push({
      kind: 'story',
      id: s.id,
      label: s.title,
      confidence: c,
    })
  }

  return spots.sort((a, b) => a.confidence - b.confidence).slice(0, limit)
}

export function daysUntil(isoDate: string, now = new Date()): number {
  const target = new Date(`${isoDate}T12:00:00`)
  const start = new Date(now)
  start.setHours(12, 0, 0, 0)
  return Math.ceil((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

export function formatCountdown(isoEnd: string, now = new Date()): string {
  const days = daysUntil(isoEnd, now)
  if (days < 0) return 'Window closed'
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `${days} days`
}
