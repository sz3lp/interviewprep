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
