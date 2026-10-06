import { questions } from './questions'
import type { Question } from './types'

/** Reported EF&R Fall 2026 screening set (7 min · 3 questions). */
export const EFR_SCREENING_QUESTION_IDS = [
  'q-why-ff',
  'q-prep',
  'q-efr-traits',
] as const

export const EFR_SCREENING_QUESTION_TEXTS = [
  'Why do you want to be a firefighter?',
  'What have you done to prepare?',
  'What traits do you bring?',
] as const

export function getEfrScreeningQuestions(): Question[] {
  return EFR_SCREENING_QUESTION_IDS.map((id) => {
    const q = questions.find((item) => item.id === id)
    if (!q) throw new Error(`Missing EF&R screening question: ${id}`)
    return q
  })
}
