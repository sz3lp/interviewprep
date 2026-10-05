import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  getDepartment,
  pickQuestions,
  questionsFor,
  rubricDimensions,
  type DepartmentId,
  type Question,
  type StageId,
} from '../content'
import { useProgress } from '../hooks/useProgress'

type Mode = StageId | 'full'

interface ModeConfig {
  label: string
  minutes: number
  count: number
  stage: StageId
  showQuestionsFirst: boolean
  notes: string
}

const modes: Record<DepartmentId, Partial<Record<Mode, ModeConfig>>> = {
  efr: {
    screening: {
      label: 'EF&R Screening (7 min / 3 Q)',
      minutes: 7,
      count: 3,
      stage: 'screening',
      showQuestionsFirst: false,
      notes: 'Get-to-know-you pace. Crisp bio, why fire, why EF&R.',
    },
    oral: {
      label: 'EF&R Oral Board (30 min)',
      minutes: 30,
      count: 8,
      stage: 'oral',
      showQuestionsFirst: true,
      notes: 'Public materials say questions may be viewable beforehand — use prep time.',
    },
    leadership: {
      label: 'EF&R Leadership (30 min)',
      minutes: 30,
      count: 6,
      stage: 'leadership',
      showQuestionsFirst: false,
      notes: 'Fit, judgment, authenticity with senior leaders.',
    },
    full: {
      label: 'Full oral drill',
      minutes: 30,
      count: 8,
      stage: 'oral',
      showQuestionsFirst: false,
      notes: 'General scored oral practice.',
    },
  },
  bfd: {
    speed: {
      label: 'BFD Speed Interview (8 min)',
      minutes: 8,
      count: 4,
      stage: 'speed',
      showQuestionsFirst: false,
      notes: 'Virtual pass/fail energy — warm, clear, human.',
    },
    oral: {
      label: 'BFD Oral Board (30 min)',
      minutes: 30,
      count: 8,
      stage: 'oral',
      showQuestionsFirst: false,
      notes: 'Scored board. ≥60% to pass per public materials.',
    },
    chiefs: {
      label: "BFD Chief's Interview",
      minutes: 30,
      count: 6,
      stage: 'chiefs',
      showQuestionsFirst: false,
      notes: 'Fit and authenticity with chiefs.',
    },
    full: {
      label: 'Full oral drill',
      minutes: 30,
      count: 8,
      stage: 'oral',
      showQuestionsFirst: false,
      notes: 'General scored oral practice.',
    },
  },
}

type Phase = 'setup' | 'prep' | 'live' | 'score'

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Simulator() {
  const [params, setParams] = useSearchParams()
  const dept = (params.get('dept') === 'bfd' ? 'bfd' : 'efr') as DepartmentId
  const modeParam = (params.get('mode') as Mode) || (dept === 'bfd' ? 'speed' : 'screening')
  const deptModes = modes[dept]
  const modeKey = (deptModes[modeParam] ? modeParam : Object.keys(deptModes)[0]) as Mode
  const config = deptModes[modeKey]!
  const { addSimulatorRep } = useProgress()

  const [phase, setPhase] = useState<Phase>('setup')
  const [selected, setSelected] = useState<Question[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(config.minutes * 60)
  const [running, setRunning] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  const department = getDepartment(dept)

  useEffect(() => {
    setPhase('setup')
    setSelected([])
    setQIndex(0)
    setSecondsLeft(config.minutes * 60)
    setRunning(false)
    setScores({})
  }, [dept, modeKey, config.minutes])

  useEffect(() => {
    if (!running || phase !== 'live') return
    if (secondsLeft <= 0) {
      setRunning(false)
      return
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [running, secondsLeft, phase])

  const overall = useMemo(() => {
    const vals = Object.values(scores)
    if (!vals.length) return 0
    return Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 5)) * 100)
  }, [scores])

  function start() {
    const pool = questionsFor({ department: dept, stage: config.stage })
    const picked = pickQuestions(pool, config.count)
    setSelected(picked)
    setQIndex(0)
    setSecondsLeft(config.minutes * 60)
    setScores({})
    if (config.showQuestionsFirst) {
      setPhase('prep')
      setRunning(false)
    } else {
      setPhase('live')
      setRunning(true)
    }
  }

  function beginLive() {
    setPhase('live')
    setRunning(true)
  }

  function finish() {
    setRunning(false)
    setPhase('score')
  }

  function saveRep() {
    addSimulatorRep({
      department: dept,
      mode: modeKey,
      stage: config.stage,
      questionIds: selected.map((q) => q.id),
      scores,
      overall,
    })
  }

  const urgent = phase === 'live' && secondsLeft <= 60

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Process simulator</div>
          <h1>Timed drill</h1>
          <p className="lede">
            Formats match public {department.shortName} process details. Practice
            questions are representative — not leaked board sheets.
          </p>
        </div>
      </section>

      {phase === 'setup' && (
        <div className="panel stack">
          <div className="row">
            <label>
              Department{' '}
              <select
                value={dept}
                onChange={(e) => {
                  const d = e.target.value as DepartmentId
                  const defaultMode = d === 'bfd' ? 'speed' : 'screening'
                  setParams({ dept: d, mode: defaultMode })
                }}
              >
                <option value="efr">Eastside Fire & Rescue</option>
                <option value="bfd">Bellingham Fire</option>
              </select>
            </label>
            <label>
              Mode{' '}
              <select
                value={modeKey}
                onChange={(e) => setParams({ dept, mode: e.target.value })}
              >
                {Object.entries(deptModes).map(([key, cfg]) => (
                  <option key={key} value={key}>
                    {cfg!.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p>{config.notes}</p>
          <p className="muted">
            {config.minutes} minutes · ~{config.count} questions
            {config.showQuestionsFirst ? ' · advance prep enabled' : ''}
          </p>
          <div className="row">
            <button type="button" className="btn" onClick={start}>
              Start {config.label}
            </button>
            <Link className="btn ghost" to={`/${dept}`}>
              Review dept intel
            </Link>
          </div>
        </div>
      )}

      {phase === 'prep' && (
        <div className="section">
          <div className="section-head">
            <h2>Advance prep</h2>
            <span className="tag">Questions visible before timer</span>
          </div>
          <p>
            Skim and choose STAR stories. When ready, start the timed delivery.
          </p>
          <div className="stack">
            {selected.map((q, i) => (
              <div key={q.id} className="question-block">
                <div className="eyebrow">Q{i + 1}</div>
                <h3>{q.text}</h3>
                <p className="muted">{q.tip}</p>
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn" onClick={beginLive}>
              Start timed delivery
            </button>
            <button type="button" className="btn ghost" onClick={() => setPhase('setup')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {phase === 'live' && selected[qIndex] && (
        <div className="section">
          <div className="section-head">
            <h2>
              Question {qIndex + 1} / {selected.length}
            </h2>
            <div className={`timer${urgent ? ' urgent' : ''}`}>{formatTime(secondsLeft)}</div>
          </div>
          <div className="question-block">
            <h3>{selected[qIndex].text}</h3>
            <p>{selected[qIndex].tip}</p>
          </div>
          <div className="row" style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setRunning((r) => !r)}
            >
              {running ? 'Pause' : 'Resume'}
            </button>
            <button
              type="button"
              className="btn ghost"
              disabled={qIndex === 0}
              onClick={() => setQIndex((i) => Math.max(0, i - 1))}
            >
              Prev Q
            </button>
            <button
              type="button"
              className="btn ghost"
              disabled={qIndex >= selected.length - 1}
              onClick={() => setQIndex((i) => Math.min(selected.length - 1, i + 1))}
            >
              Next Q
            </button>
            <button type="button" className="btn" onClick={finish}>
              Finish & score
            </button>
          </div>
          {secondsLeft <= 0 && (
            <p style={{ color: 'var(--danger)' }}>Time. Finish your thought and score the round.</p>
          )}
        </div>
      )}

      {phase === 'score' && (
        <div className="section">
          <div className="section-head">
            <h2>Self-score rubric</h2>
            <span className="tag">{overall}% overall</span>
          </div>
          <p>Rate each dimension 1–5 based on this round.</p>
          <div className="score-grid panel">
            {rubricDimensions.map((dim) => (
              <div key={dim.id} className="score-row">
                <div>
                  <strong style={{ color: 'var(--ink)' }}>{dim.label}</strong>
                  <p className="muted" style={{ margin: 0 }}>
                    {dim.description}
                  </p>
                </div>
                <select
                  value={scores[dim.id] ?? ''}
                  onChange={(e) =>
                    setScores((prev) => ({
                      ...prev,
                      [dim.id]: Number(e.target.value),
                    }))
                  }
                  aria-label={dim.label}
                >
                  <option value="">—</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="panel" style={{ marginTop: '1rem' }}>
            <h3>Questions in this round</h3>
            <ol>
              {selected.map((q) => (
                <li key={q.id}>{q.text}</li>
              ))}
            </ol>
          </div>
          <div className="row" style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                saveRep()
                setPhase('setup')
              }}
              disabled={Object.keys(scores).length < rubricDimensions.length}
            >
              Save rep & return
            </button>
            <button type="button" className="btn ghost" onClick={start}>
              Run again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
