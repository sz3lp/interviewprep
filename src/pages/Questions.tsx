import { useMemo, useState } from 'react'
import {
  competencyLabels,
  questions,
  type DepartmentId,
  type StageId,
} from '../content'
import { ConfidencePicker } from '../components/ConfidencePicker'
import { useProgress } from '../hooks/useProgress'
import type { Confidence } from '../lib/progress'

export function QuestionsPage() {
  const { state, setConfidence, patchItem } = useProgress()
  const [dept, setDept] = useState<'all' | DepartmentId | 'shared'>('all')
  const [stage, setStage] = useState<'all' | StageId>('all')
  const [onlyWeak, setOnlyWeak] = useState(false)

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const deptOk =
        dept === 'all' ||
        q.departments.includes(dept) ||
        (dept !== 'shared' && q.departments.includes('shared'))
      const stageOk = stage === 'all' || q.stages.includes(stage)
      const conf = state.questions[q.id]?.confidence ?? 0
      const weakOk = !onlyWeak || conf <= 1
      return deptOk && stageOk && weakOk
    })
  }, [dept, stage, onlyWeak, state.questions])

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Question bank</div>
          <h1>Practice bank</h1>
          <p className="lede">
            Industry-standard entry firefighter categories plus department-specific
            prompts. These are practice questions — not claimed secret board sheets.
          </p>
        </div>
      </section>

      <div className="panel row" style={{ marginBottom: '1rem' }}>
        <label>
          Dept{' '}
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value as typeof dept)}
          >
            <option value="all">All</option>
            <option value="efr">EF&R</option>
            <option value="bfd">Bellingham</option>
            <option value="shared">Shared only</option>
          </select>
        </label>
        <label>
          Stage{' '}
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as typeof stage)}
          >
            <option value="all">All</option>
            <option value="screening">Screening</option>
            <option value="speed">Speed</option>
            <option value="oral">Oral</option>
            <option value="leadership">Leadership</option>
            <option value="chiefs">Chiefs</option>
          </select>
        </label>
        <label className="row">
          <input
            type="checkbox"
            checked={onlyWeak}
            onChange={(e) => setOnlyWeak(e.target.checked)}
          />
          Weak only (0–1)
        </label>
      </div>

      <div className="stack">
        {filtered.map((q) => {
          const conf = (state.questions[q.id]?.confidence ?? 0) as Confidence
          const draft = state.questions[q.id]?.answerDraft ?? ''
          return (
            <article key={q.id} className="question-block">
              <h3>{q.text}</h3>
              <div className="row" style={{ marginBottom: '0.5rem' }}>
                {q.departments.map((d) => (
                  <span key={d} className="tag">
                    {d}
                  </span>
                ))}
                {q.stages.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
                {q.competencies.map((c) => (
                  <span key={c} className="tag">
                    {competencyLabels[c] ?? c}
                  </span>
                ))}
              </div>
              <p>
                <strong style={{ color: 'var(--ink)' }}>Tip:</strong> {q.tip}
              </p>
              {q.sampleOutline && (
                <p className="muted">Outline: {q.sampleOutline}</p>
              )}
              <label className="eyebrow" htmlFor={`draft-${q.id}`}>
                Your draft answer
              </label>
              <textarea
                id={`draft-${q.id}`}
                value={draft}
                placeholder="Outline or full spoken answer…"
                onChange={(e) =>
                  patchItem('questions', q.id, { answerDraft: e.target.value })
                }
              />
              <div style={{ marginTop: '0.65rem' }}>
                <div className="eyebrow">Confidence</div>
                <ConfidencePicker
                  value={conf}
                  onChange={(c) => setConfidence('questions', q.id, c)}
                />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
