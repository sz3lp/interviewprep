import { battlePlan, getTodayIso } from '../content'
import { useProgress } from '../hooks/useProgress'

export function Plan() {
  const { state, togglePlanCheck } = useProgress()
  const today = getTodayIso()

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Daily battle plan</div>
          <h1>Countdown plan</h1>
          <p className="lede">
            EF&R screening first, then Bellingham speed, then oral-board depth.
            Check tasks off as you complete them.
          </p>
        </div>
      </section>

      <div className="stack">
        {battlePlan.map((day) => {
          const isToday = day.date === today
          return (
            <article
              key={day.date}
              className="panel"
              style={
                isToday
                  ? { borderColor: 'var(--ember)', boxShadow: '0 0 0 1px var(--ember)' }
                  : undefined
              }
            >
              <div className="row">
                <h3 style={{ margin: 0 }}>{day.date}</h3>
                {isToday && <span className="tag">Today</span>}
              </div>
              <p style={{ color: 'var(--ink)' }}>{day.focus}</p>
              <ul className="list-check">
                {day.tasks.map((task, i) => {
                  const key = `${day.date}-${i}`
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
            </article>
          )
        })}
      </div>
    </div>
  )
}
