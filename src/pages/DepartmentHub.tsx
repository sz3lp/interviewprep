import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getDepartment, getEfrScreeningQuestions, type DepartmentId } from '../content'
import { ConfidencePicker } from '../components/ConfidencePicker'
import { ReadinessRing } from '../components/ReadinessRing'
import { useProgress } from '../hooks/useProgress'
import { formatCountdown, readinessScore, type Confidence } from '../lib/progress'

function resolveDeptId(pathname: string, param?: string): DepartmentId {
  if (param === 'bfd' || param === 'efr') return param
  if (pathname.includes('/bfd')) return 'bfd'
  return 'efr'
}

export function DepartmentHub() {
  const { deptId } = useParams()
  const { pathname } = useLocation()
  const id = resolveDeptId(pathname, deptId)

  const dept = getDepartment(id)
  const { state, setConfidence, setFlashcardIndex } = useProgress()
  const [flipped, setFlipped] = useState(false)
  const index = state.flashcardIndex[id] ?? 0
  const fact = dept.facts[index % dept.facts.length]
  const score = readinessScore(state, id)

  const nextMilestone = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return dept.process.find((s) => s.endDate >= today) ?? dept.process[0]
  }, [dept])

  function go(delta: number) {
    setFlipped(false)
    setFlashcardIndex(id, (index + delta + dept.facts.length) % dept.facts.length)
  }

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Department hub</div>
          <h1>{dept.shortName}</h1>
          <p className="lede">{dept.fullName}</p>
          <p>
            <strong style={{ color: 'var(--ink)' }}>Mission:</strong> {dept.mission}
          </p>
          <p>{dept.vision}</p>
        </div>
        <div>
          <ReadinessRing value={score} label={`${dept.shortName} readiness`} />
          <div className="countdown" style={{ marginTop: '0.75rem' }}>
            {formatCountdown(nextMilestone.startDate)}
            <span>
              {nextMilestone.label} · {nextMilestone.windowLabel}
            </span>
          </div>
          <div className="row" style={{ marginTop: '0.75rem' }}>
            <Link
              className="btn"
              to={`/scroll?focus=${id}&stage=${nextMilestone.id === 'speed' || nextMilestone.id === 'screening' || nextMilestone.id === 'oral' || nextMilestone.id === 'leadership' || nextMilestone.id === 'chiefs' ? nextMilestone.id : 'oral'}`}
            >
              Scroll prep
            </Link>
            <Link
              className="btn ghost"
              to={`/simulator?dept=${id}&mode=${nextMilestone.id}`}
            >
              Run {nextMilestone.label}
            </Link>
            <Link className="btn ghost" to="/stories">
              Stories
            </Link>
          </div>
        </div>
      </section>

      {id === 'efr' && (
        <section className="section">
          <div className="section-head">
            <h2>Screening questions</h2>
            <Link to="/scroll?focus=efr&stage=screening">Scroll drill →</Link>
          </div>
          <div className="panel">
            <p className="muted" style={{ marginTop: 0 }}>
              Your reported 7-minute screen set — drill these until they feel natural.
            </p>
            <ol>
              {getEfrScreeningQuestions().map((q) => (
                <li key={q.id} style={{ color: 'var(--ink)', marginBottom: '0.35rem' }}>
                  {q.text}
                </li>
              ))}
            </ol>
            <div className="row" style={{ marginTop: '0.75rem' }}>
              <Link className="btn" to="/distill">
                Distill my stories
              </Link>
              <Link className="btn ghost" to="/scroll?focus=efr&stage=screening">
                Scroll the three
              </Link>
              <Link className="btn ghost" to="/simulator?dept=efr&mode=screening">
                7-min sim
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h2>Values / look-fors</h2>
        </div>
        <div className="grid-2">
          <div className="stack">
            {dept.values.map((v) => (
              <div key={v.name} className="panel">
                <h3>{v.name}</h3>
                <p style={{ margin: 0 }}>{v.detail}</p>
              </div>
            ))}
          </div>
          <div className="panel">
            <h3>What they reward</h3>
            <ul>
              {dept.lookFors.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <h3>Interview angle</h3>
            <p>{dept.whyAngle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Why {dept.shortName}</h2>
          <span className="muted">Edit in src/content/departments/{id}.ts</span>
        </div>
        <div className="panel">
          <p style={{ color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{dept.whyDraft}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Process</h2>
        </div>
        <div className="stack">
          {dept.process.map((stage) => (
            <div key={stage.id} className="panel">
              <div className="row">
                <h3 style={{ margin: 0 }}>{stage.label}</h3>
                <span className="tag">{stage.windowLabel}</span>
                <span className="tag">{formatCountdown(stage.startDate)}</span>
              </div>
              <p>{stage.format}</p>
              <p className="muted">{stage.notes}</p>
              <Link className="btn small" to={`/simulator?dept=${id}&mode=${stage.id}`}>
                Practice this format
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Coverage & stations</h2>
        </div>
        <div className="grid-2">
          <div className="panel">
            <h3>Org model</h3>
            <p>{dept.orgModel}</p>
            <h3>Coverage</h3>
            <p>{dept.coverage}</p>
            <h3>Specialties / themes</h3>
            <ul>
              {dept.specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Stations</h3>
            <ul>
              {dept.stations.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3>Talking points</h3>
            <ul>
              {dept.talkingPoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Fact flashcards</h2>
          <span className="muted">
            {index + 1} / {dept.facts.length}
          </span>
        </div>
        <button
          type="button"
          className="flashcard"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Hide answer' : 'Reveal answer'}
        >
          {!flipped ? (
            <div className="prompt">{fact.prompt}</div>
          ) : (
            <div className="answer">{fact.answer}</div>
          )}
        </button>
        <div className="row" style={{ marginTop: '0.85rem' }}>
          <button type="button" className="btn ghost" onClick={() => go(-1)}>
            Prev
          </button>
          <button type="button" className="btn ghost" onClick={() => go(1)}>
            Next
          </button>
          <button type="button" className="btn ghost" onClick={() => setFlipped((f) => !f)}>
            {flipped ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <div className="panel" style={{ marginTop: '0.85rem' }}>
          <div className="eyebrow">Confidence</div>
          <ConfidencePicker
            value={(state.facts[fact.id]?.confidence ?? 0) as Confidence}
            onChange={(c) => setConfidence('facts', fact.id, c)}
          />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Logistics checklist</h2>
        </div>
        <ul>
          {dept.logistics.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Sources</h2>
        </div>
        <ul>
          {dept.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
