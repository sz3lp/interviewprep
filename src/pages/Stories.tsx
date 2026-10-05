import { competencyLabels, stories } from '../content'
import { ConfidencePicker } from '../components/ConfidencePicker'
import { useProgress } from '../hooks/useProgress'
import type { Confidence } from '../lib/progress'

export function Stories() {
  const { state, setConfidence } = useProgress()
  const filled = stories.filter(
    (s) => !s.placeholder || (state.stories[s.id]?.confidence ?? 0) > 0,
  ).length

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">STAR story bank</div>
          <h1>Your proof</h1>
          <p className="lede">
            Fill every placeholder in{' '}
            <code style={{ color: 'var(--copper)' }}>src/content/stories.ts</code>{' '}
            with real stories. Practice the spoken version out loud until it is
            natural — not robotic.
          </p>
          <p>
            {filled} / {stories.length} tracked with confidence &gt; 0 or completed.
          </p>
        </div>
      </section>

      <div className="stack">
        {stories.map((story) => {
          const conf = (state.stories[story.id]?.confidence ?? 0) as Confidence
          return (
            <article key={story.id} className="panel">
              <div className="row" style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{story.title}</h3>
                {story.placeholder && <span className="tag">Needs your story</span>}
              </div>
              <div className="row" style={{ marginBottom: '0.65rem' }}>
                {story.competencies.map((c) => (
                  <span key={c} className="tag">
                    {competencyLabels[c] ?? c}
                  </span>
                ))}
                {story.efrValues.map((v) => (
                  <span key={v} className="tag">
                    EF&R · {v}
                  </span>
                ))}
                {story.bfdLookFors.map((v) => (
                  <span key={v} className="tag">
                    BFD · {v}
                  </span>
                ))}
              </div>
              <div className="grid-2">
                <div>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Situation:</strong>{' '}
                    {story.situation}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Task:</strong>{' '}
                    {story.task}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Action:</strong>{' '}
                    {story.action}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Result:</strong>{' '}
                    {story.result}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Lesson for a crew:</strong>{' '}
                    {story.lesson}
                  </p>
                </div>
                <div>
                  <div className="eyebrow">Spoken version (60–90s)</div>
                  <p style={{ color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
                    {story.spokenVersion}
                  </p>
                  <div className="eyebrow">Confidence after practicing aloud</div>
                  <ConfidencePicker
                    value={conf}
                    onChange={(c) => setConfidence('stories', story.id, c)}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
