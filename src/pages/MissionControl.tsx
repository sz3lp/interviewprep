import { Link } from 'react-router-dom'
import {
  departmentList,
  getPlanForDate,
  getTodayIso,
  nextStage,
} from '../content'
import { ReadinessRing } from '../components/ReadinessRing'
import { useProgress } from '../hooks/useProgress'
import { formatCountdown, readinessScore, weakSpots } from '../lib/progress'

export function MissionControl() {
  const { state, togglePlanCheck } = useProgress()
  const today = getTodayIso()
  const plan = getPlanForDate(today) ?? getPlanForDate('2026-10-04')
  const overall = readinessScore(state)
  const spots = weakSpots(state, 5)

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Personal hiring trainer</div>
          <h1>BOARD READY</h1>
          <p className="lede">
            Entry-level oral board prep for Eastside Fire & Rescue and Bellingham
            Fire — screening and speed interviews first, then scored boards and
            chiefs.
          </p>
          <div className="row" style={{ marginTop: '1rem' }}>
            <Link className="btn" to="/scroll?focus=efr&stage=screening">
              Scroll EF&R prep
            </Link>
            <Link className="btn ghost" to="/scroll?focus=bfd&stage=speed">
              Scroll BFD
            </Link>
          </div>
          <p className="muted" style={{ marginTop: '0.65rem', marginBottom: 0 }}>
            Swipe like Shorts — say it aloud, rate it, next card. Weak spots float up first.
          </p>
        </div>
        <ReadinessRing value={overall} label="Overall readiness" />
      </section>

      <section className="section scroll-promo">
        <div className="scroll-promo-inner">
          <div>
            <div className="eyebrow">Addictive micro-drills</div>
            <h2>Prep that feels like scrolling</h2>
            <p>
              One card. One prompt. Speak it. Swipe. EF&R screening feed rotates your
              three questions — why firefighter, what you’ve done to prepare, traits you
              bring — plus values and facts until they’re automatic.
            </p>
          </div>
          <Link className="btn" to="/scroll?focus=efr&stage=screening">
            Start scrolling
          </Link>
        </div>
      </section>

      <div className="track-row">
        {departmentList.map((dept) => {
          const stage = nextStage(dept)
          const score = readinessScore(state, dept.id)
          return (
            <article key={dept.id} className="track">
              <div className="eyebrow">{dept.fullName}</div>
              <h2>{dept.shortName}</h2>
              <div className="countdown">
                {stage ? formatCountdown(stage.startDate) : '—'}
                <span>
                  Next: {stage?.label} · {stage?.windowLabel}
                </span>
              </div>
              <ReadinessRing value={score} label={`${dept.shortName} ready`} />
              <p>{stage?.format}</p>
              <div className="row">
                <Link className="btn" to={`/${dept.id}`}>
                  Dept hub
                </Link>
                <Link
                  className="btn ghost"
                  to={`/simulator?dept=${dept.id}&mode=${stage?.id ?? 'oral'}`}
                >
                  Drill {stage?.label}
                </Link>
              </div>
              <p className="muted" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                Schedule per current public posting — verify your invite.
              </p>
            </article>
          )
        })}
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Today’s focus</h2>
          <Link to="/plan">Full battle plan →</Link>
        </div>
        {plan ? (
          <div className="panel">
            <h3>{plan.focus}</h3>
            <p className="muted">Plan date: {plan.date}</p>
            <ul className="list-check">
              {plan.tasks.map((task, i) => {
                const key = `${plan.date}-${i}`
                return (
                  <li key={key}>
                    <input
                      type="checkbox"
                      checked={!!state.planChecks[key]}
                      onChange={() => togglePlanCheck(key)}
                      aria-label={task}
                    />
                    <span>{task}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <p>No plan row for today — open the Plan page to browse all days.</p>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Weak spots</h2>
          <Link to="/questions">Practice questions →</Link>
        </div>
        <div className="stack">
          {spots.map((s) => (
            <div key={`${s.kind}-${s.id}`} className="panel">
              <div className="row" style={{ marginBottom: '0.35rem' }}>
                <span className="tag">{s.kind}</span>
                {s.department && <span className="tag">{s.department}</span>}
                <span className="tag">conf {s.confidence}</span>
              </div>
              <h3 style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>
                {s.label}
              </h3>
              <div className="row">
                {s.kind === 'fact' && s.department && (
                  <Link className="btn small ghost" to={`/${s.department}`}>
                    Flashcards
                  </Link>
                )}
                {s.kind === 'question' && (
                  <Link className="btn small ghost" to="/questions">
                    Question bank
                  </Link>
                )}
                {s.kind === 'story' && (
                  <Link className="btn small ghost" to="/stories">
                    Story bank
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Quick launches</h2>
        </div>
        <div className="row">
          <Link className="btn" to="/scroll?focus=efr&stage=screening">
            Scroll EF&R
          </Link>
          <Link className="btn" to="/simulator?dept=efr&mode=screening">
            EF&R 7-min screen
          </Link>
          <Link className="btn" to="/simulator?dept=bfd&mode=speed">
            BFD 8-min speed
          </Link>
          <Link className="btn ghost" to="/stories">
            STAR stories
          </Link>
          <Link className="btn ghost" to="/chiefs">
            Chiefs / leadership
          </Link>
        </div>
      </section>

      <p className="footer-note">
        Content seeded from official department pages and public hiring notices.
        Do not treat unpublished oral-board questions as known.
      </p>
    </div>
  )
}
