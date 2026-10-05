interface Props {
  value: number
  label?: string
}

export function ReadinessRing({ value, label = 'Ready' }: Props) {
  return (
    <div className="readiness">
      <div className="ring" style={{ ['--p' as string]: value }} aria-hidden>
        <span>{value}%</span>
      </div>
      <div>
        <div className="eyebrow">{label}</div>
        <p className="muted" style={{ margin: 0 }}>
          Facts, stories, questions, and simulator reps.
        </p>
      </div>
    </div>
  )
}
