import { confidenceLabels } from '../content'
import type { Confidence } from '../lib/progress'

interface Props {
  value: Confidence
  onChange: (c: Confidence) => void
}

export function ConfidencePicker({ value, onChange }: Props) {
  return (
    <div className="confidence" role="group" aria-label="Confidence">
      {([0, 1, 2, 3, 4] as Confidence[]).map((n) => (
        <button
          key={n}
          type="button"
          className={value === n ? 'on' : ''}
          title={confidenceLabels[n]}
          aria-pressed={value === n}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
