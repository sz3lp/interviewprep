import { efr } from './departments/efr'
import { bfd } from './departments/bfd'
import { questions } from './questions'
import { stories, competencyLabels, lifeStoryAnswers, screeningDrafts } from './stories'
import { battlePlan, getPlanForDate, getTodayIso } from './schedule'
import { rubricDimensions, confidenceLabels } from './rubric'
import type { Department, DepartmentId, ProcessStage, Question, StageId } from './types'

export const departments = { efr, bfd } as const
export const departmentList: Department[] = [efr, bfd]

export {
  questions,
  stories,
  lifeStoryAnswers,
  screeningDrafts,
  competencyLabels,
  battlePlan,
  getPlanForDate,
  getTodayIso,
  rubricDimensions,
  confidenceLabels,
}

export function getDepartment(id: DepartmentId): Department {
  return departments[id]
}

export function nextStage(dept: Department, now = new Date()): ProcessStage | undefined {
  const today = getTodayIso(now)
  return (
    dept.process.find((s) => s.endDate >= today) ??
    dept.process[dept.process.length - 1]
  )
}

export function questionsFor(opts: {
  department?: DepartmentId | 'shared'
  stage?: StageId
}): Question[] {
  return questions.filter((q) => {
    const deptOk =
      !opts.department ||
      q.departments.includes('shared') ||
      q.departments.includes(opts.department as DepartmentId) ||
      (opts.department === 'shared' && q.departments.includes('shared'))
    const stageOk = !opts.stage || q.stages.includes(opts.stage)
    return deptOk && stageOk
  })
}

export { getEfrScreeningQuestions, EFR_SCREENING_QUESTION_IDS } from './efrScreening'

export function pickQuestions(
  pool: Question[],
  count: number,
  rng = Math.random,
): Question[] {
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(count, copy.length))
}

export type {
  Department,
  DepartmentId,
  ProcessStage,
  Question,
  StageId,
  StarStory,
  FactCard,
  Competency,
  BattlePlanDay,
} from './types'
