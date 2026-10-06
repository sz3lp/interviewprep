import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  clearProgress,
  exportProgress,
  importProgress,
  loadProgress,
  saveProgress,
  type Confidence,
  type ItemProgress,
  type ProgressState,
  type SimulatorRep,
} from '../lib/progress'
import type { DistillBucket } from '../content/distill'

interface ProgressContextValue {
  state: ProgressState
  setConfidence: (
    kind: 'facts' | 'questions' | 'stories',
    id: string,
    confidence: Confidence,
  ) => void
  patchItem: (
    kind: 'facts' | 'questions' | 'stories',
    id: string,
    patch: Partial<ItemProgress>,
  ) => void
  togglePlanCheck: (key: string) => void
  addSimulatorRep: (rep: Omit<SimulatorRep, 'id' | 'at'>) => void
  setFlashcardIndex: (deptId: string, index: number) => void
  setDistillAnswer: (promptId: string, text: string) => void
  setDistillDraft: (bucket: DistillBucket, text: string) => void
  setDistillDrafts: (drafts: ProgressState['distillDrafts']) => void
  applyDistillToQuestions: (drafts: ProgressState['distillDrafts']) => void
  exportJson: () => string
  importJson: (json: string) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    saveProgress(state)
  }, [state])

  const value: ProgressContextValue = {
    state,
    setConfidence(kind, id, confidence) {
      setState((prev) => ({
        ...prev,
        [kind]: {
          ...prev[kind],
          [id]: {
            ...prev[kind][id],
            confidence,
            lastPracticed: new Date().toISOString(),
          },
        },
      }))
    },
    patchItem(kind, id, patch) {
      setState((prev) => {
        const current = prev[kind][id] ?? { confidence: 0 as const }
        return {
          ...prev,
          [kind]: {
            ...prev[kind],
            [id]: {
              ...current,
              ...patch,
              lastPracticed: new Date().toISOString(),
            },
          },
        }
      })
    },
    togglePlanCheck(key) {
      setState((prev) => ({
        ...prev,
        planChecks: { ...prev.planChecks, [key]: !prev.planChecks[key] },
      }))
    },
    addSimulatorRep(rep) {
      const full: SimulatorRep = {
        ...rep,
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
      }
      setState((prev) => ({
        ...prev,
        simulatorReps: [full, ...prev.simulatorReps].slice(0, 50),
      }))
    },
    setFlashcardIndex(deptId, index) {
      setState((prev) => ({
        ...prev,
        flashcardIndex: { ...prev.flashcardIndex, [deptId]: index },
      }))
    },
    setDistillAnswer(promptId, text) {
      setState((prev) => ({
        ...prev,
        distillAnswers: { ...prev.distillAnswers, [promptId]: text },
      }))
    },
    setDistillDraft(bucket, text) {
      setState((prev) => ({
        ...prev,
        distillDrafts: { ...prev.distillDrafts, [bucket]: text },
      }))
    },
    setDistillDrafts(drafts) {
      setState((prev) => ({
        ...prev,
        distillDrafts: { ...prev.distillDrafts, ...drafts },
      }))
    },
    applyDistillToQuestions(drafts) {
      const map: Record<string, string | undefined> = {
        'q-why-ff': drafts.why,
        'q-prep': drafts.prep,
        'q-efr-traits': drafts.traits,
      }
      setState((prev) => {
        const questions = { ...prev.questions }
        for (const [id, draft] of Object.entries(map)) {
          if (!draft?.trim()) continue
          const current = questions[id] ?? { confidence: 0 as const }
          questions[id] = {
            ...current,
            answerDraft: draft,
            lastPracticed: new Date().toISOString(),
          }
        }
        return { ...prev, questions, distillDrafts: { ...prev.distillDrafts, ...drafts } }
      })
    },
    exportJson() {
      return exportProgress(state)
    },
    importJson(json) {
      setState(importProgress(json))
    },
    reset() {
      setState(clearProgress())
    },
  }

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
