import type { RubricDimension } from './types'

export const rubricDimensions: RubricDimension[] = [
  {
    id: 'specificity',
    label: 'Specificity',
    description: 'Concrete facts, names of values, real examples — not vague claims.',
  },
  {
    id: 'values',
    label: 'Values alignment',
    description: 'Answer clearly connects to the department’s published values / look-fors.',
  },
  {
    id: 'structure',
    label: 'Structure',
    description: 'STAR or clear beginning–middle–end. Easy for a rater to follow.',
  },
  {
    id: 'composure',
    label: 'Composure',
    description: 'Calm pace, steady voice, recovers from stumbles without spiraling.',
  },
  {
    id: 'dept',
    label: 'Department knowledge',
    description: 'Accurate, relevant research — not Wikipedia dumps or wrong facts.',
  },
  {
    id: 'close',
    label: 'Close / impact',
    description: 'Ends with lesson for a fire crew or a clear why-hire-me landing.',
  },
]

export const confidenceLabels = ['Unseen', 'Shaky', 'Okay', 'Solid', 'Automatic'] as const
