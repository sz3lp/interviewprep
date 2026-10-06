import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  distillBucketLabels,
  distillProgress,
  distillPrompts,
  type DistillBucket,
} from '../content/distill'
import { screeningDrafts } from '../content/stories'
import { useProgress } from '../hooks/useProgress'

type Phase = 'intake' | 'results'

const buckets: DistillBucket[] = ['why', 'prep', 'traits']

export function Distill() {
  const {
    state,
    setDistillAnswer,
    setDistillDraft,
    applyDistillToQuestions,
  } = useProgress()
  const answers = state.distillAnswers
  const progress = useMemo(() => distillProgress(answers), [answers])

  const firstEmpty = distillPrompts.findIndex((p) => !(answers[p.id] ?? '').trim())
  const [index, setIndex] = useState(firstEmpty >= 0 ? firstEmpty : 0)
  const [phase, setPhase] = useState<Phase>(
    progress.answered >= 6 ? 'results' : 'intake',
  )
  const [savedNote, setSavedNote] = useState('')

  const prompt = distillPrompts[index]
  const value = answers[prompt?.id] ?? ''

  function go(delta: number) {
    setIndex((i) => Math.min(distillPrompts.length - 1, Math.max(0, i + delta)))
  }

  function runDistill() {
    const drafts = {
      why: screeningDrafts.why,
      prep: screeningDrafts.prep,
      traits: screeningDrafts.traits,
    }
    applyDistillToQuestions(drafts)
    setPhase('results')
    setSavedNote('Polished drafts from your life-story bank saved to the question bank.')
  }

  function saveEditedDraftsToBank() {
    applyDistillToQuestions(state.distillDrafts)
    setSavedNote('Updated drafts saved to the question bank.')
  }

  if (phase === 'results') {
    return (
      <div>
        <section className="hero-board">
          <div>
            <div className="eyebrow">Story → screen answers</div>
            <h1>Your three drafts</h1>
            <p className="lede">
              Built from your {progress.answered} of {progress.total} life-story
              answers. Edit until they sound like you — then practice on Scroll or
              the 7-minute sim.
            </p>
          </div>
        </section>

        <div className="panel row" style={{ marginBottom: '1rem' }}>
          <span className="tag">
            {progress.answered}/{progress.total} filled
          </span>
          {buckets.map((b) => (
            <span key={b} className="tag">
              {distillBucketLabels[b]} {progress.byBucket[b].answered}/
              {progress.byBucket[b].total}
            </span>
          ))}
        </div>

        {savedNote && <p className="muted">{savedNote}</p>}

        <div className="stack">
          {buckets.map((bucket) => {
            const draft =
              state.distillDrafts[bucket] ?? screeningDrafts[bucket]
            return (
              <article key={bucket} className="question-block">
                <div className="eyebrow">{distillBucketLabels[bucket]}</div>
                <h3>
                  {bucket === 'why' && 'Why do you want to be a firefighter?'}
                  {bucket === 'prep' && 'What have you done to prepare?'}
                  {bucket === 'traits' && 'What traits do you bring?'}
                </h3>
                <textarea
                  value={draft}
                  onChange={(e) => setDistillDraft(bucket, e.target.value)}
                  aria-label={`Draft for ${distillBucketLabels[bucket]}`}
                />
                <p className="muted" style={{ marginBottom: 0, marginTop: '0.5rem' }}>
                  Aim ~90 seconds aloud. Cut anything that sounds like a résumé.
                </p>
              </article>
            )
          })}
        </div>

        <div className="row" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn" onClick={saveEditedDraftsToBank}>
            Save to question bank
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              const drafts = {
                why: screeningDrafts.why,
                prep: screeningDrafts.prep,
                traits: screeningDrafts.traits,
              }
              applyDistillToQuestions(drafts)
              setSavedNote('Restored polished drafts from stories.ts life-story bank.')
            }}
          >
            Rebuild from story bank
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              setPhase('intake')
              setIndex(firstEmpty >= 0 ? firstEmpty : 0)
            }}
          >
            Edit intake
          </button>
          <Link className="btn ghost" to="/scroll?focus=efr&stage=screening">
            Practice on Scroll
          </Link>
          <Link className="btn ghost" to="/simulator?dept=efr&mode=screening">
            7-min sim
          </Link>
        </div>

        <section className="section">
          <div className="section-head">
            <h2>Source answers</h2>
          </div>
          <div className="stack">
            {distillPrompts.map((p) => {
              const a = (answers[p.id] ?? '').trim()
              if (!a) return null
              return (
                <div key={p.id} className="panel">
                  <div className="eyebrow">
                    {p.number}. {distillBucketLabels[p.bucket]}
                  </div>
                  <h3
                    style={{
                      textTransform: 'none',
                      letterSpacing: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.05rem',
                    }}
                  >
                    {p.prompt}
                  </h3>
                  <p style={{ color: 'var(--ink)', margin: 0 }}>{a}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Life-story intake</div>
          <h1>Build your three answers</h1>
          <p className="lede">
            Answer {distillPrompts.length} short prompts about real moments in your
            life. Then we distill them into your EF&R screening set: why firefighter,
            what you’ve done to prepare, and traits you bring.
          </p>
        </div>
      </section>

      <div className="distill-progress" aria-label="Intake progress">
        <div
          className="distill-progress-bar"
          style={{ width: `${(progress.answered / progress.total) * 100}%` }}
        />
        <div className="distill-progress-meta">
          <span>
            Prompt {index + 1} / {distillPrompts.length}
          </span>
          <span>
            {progress.answered} answered · {distillBucketLabels[prompt.bucket]}
          </span>
        </div>
      </div>

      <div className="row" style={{ marginBottom: '0.85rem' }}>
        {buckets.map((b) => (
          <button
            key={b}
            type="button"
            className={`btn small ghost${prompt.bucket === b ? '' : ''}`}
            style={
              prompt.bucket === b
                ? { borderColor: 'var(--ember)', color: 'var(--ember-bright)' }
                : undefined
            }
            onClick={() => {
              const i = distillPrompts.findIndex((p) => p.bucket === b)
              if (i >= 0) setIndex(i)
            }}
          >
            {distillBucketLabels[b]} ({progress.byBucket[b].answered}/
            {progress.byBucket[b].total})
          </button>
        ))}
      </div>

      <article className="question-block distill-card">
        <div className="eyebrow">
          Question {prompt.number} · {distillBucketLabels[prompt.bucket]}
        </div>
        <h3>{prompt.prompt}</h3>
        <p className="muted">{prompt.hint}</p>
        <textarea
          value={value}
          placeholder={prompt.placeholder}
          onChange={(e) => setDistillAnswer(prompt.id, e.target.value)}
          aria-label={prompt.prompt}
          autoFocus
        />
      </article>

      <div className="row" style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className="btn ghost"
          disabled={index === 0}
          onClick={() => go(-1)}
        >
          Back
        </button>
        {index < distillPrompts.length - 1 ? (
          <button type="button" className="btn" onClick={() => go(1)}>
            Next prompt
          </button>
        ) : (
          <button type="button" className="btn" onClick={runDistill}>
            Distill into 3 answers
          </button>
        )}
        <button
          type="button"
          className="btn ghost"
          onClick={runDistill}
          disabled={progress.answered < 3}
          title={
            progress.answered < 3
              ? 'Answer at least a few prompts first'
              : 'Build drafts now'
          }
        >
          Distill now ({progress.answered})
        </button>
      </div>

      <p className="footer-note">
        Rough notes are fine — the distill step turns them into spoken drafts you can
        edit. Skip any prompt that doesn’t apply; empty ones are left out.
      </p>
    </div>
  )
}
