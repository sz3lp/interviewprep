import { Link } from 'react-router-dom'
import { questionsFor } from '../content'
import { useProgress } from '../hooks/useProgress'

const focusAreas = [
  {
    title: 'Authenticity over polish',
    body: 'Chiefs and leadership panels often care less about perfect scripts and more about whether you are coachable, honest, and someone they want on a crew for decades.',
  },
  {
    title: 'Deeper why-us',
    body: 'Go beyond brochure facts. Connect your values to their published mission and to the actual work (EMS-heavy days, training, station life).',
  },
  {
    title: 'Judgment under ambiguity',
    body: 'Scenario answers: Safety → address the problem → use chain of command → follow up. Never invent policy you do not know — say how you would find out.',
  },
  {
    title: 'Longevity & standards',
    body: 'Fitness, sleep, humility in probation, willingness to be the student. Five-year answers should still sound like firefighter-first.',
  },
]

export function Chiefs() {
  const { state } = useProgress()
  const leadershipQs = questionsFor({ stage: 'leadership' })
  const chiefsQs = questionsFor({ stage: 'chiefs' })
  const reps = state.simulatorReps.filter(
    (r) => r.stage === 'leadership' || r.stage === 'chiefs',
  )

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Next gate</div>
          <h1>Chiefs & leadership</h1>
          <p className="lede">
            Secondary track for EF&R Leadership Interview and Bellingham Chief’s
            Interview after you clear screening/speed and oral boards.
          </p>
          <div className="row">
            <Link className="btn" to="/simulator?dept=efr&mode=leadership">
              EF&R leadership drill
            </Link>
            <Link className="btn" to="/simulator?dept=bfd&mode=chiefs">
              BFD chiefs drill
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Focus areas</h2>
        </div>
        <div className="grid-2">
          {focusAreas.map((f) => (
            <div key={f.title} className="panel">
              <h3>{f.title}</h3>
              <p style={{ margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Leadership / chiefs questions</h2>
          <Link to="/questions">Open full bank →</Link>
        </div>
        <div className="stack">
          {[...leadershipQs, ...chiefsQs]
            .filter(
              (q, i, arr) => arr.findIndex((x) => x.id === q.id) === i,
            )
            .map((q) => (
              <div key={q.id} className="question-block">
                <h3>{q.text}</h3>
                <p className="muted">{q.tip}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Your leadership/chiefs reps</h2>
        </div>
        {reps.length === 0 ? (
          <p className="muted">No leadership/chiefs simulator reps saved yet.</p>
        ) : (
          <div className="stack">
            {reps.map((r) => (
              <div key={r.id} className="panel">
                <div className="row">
                  <span className="tag">{r.department}</span>
                  <span className="tag">{r.mode}</span>
                  <span className="tag">{r.overall ?? '—'}%</span>
                </div>
                <p className="muted" style={{ margin: 0 }}>
                  {new Date(r.at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
