import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  answerBeats,
  beatsForQuestion,
  fullDraft,
  memorizeFacts,
  memorizeMethodSteps,
  type AnswerBeat,
  type MemorizeFact,
  type MemorizeTrack,
} from '../content/memorize'
import { ConfidencePicker } from '../components/ConfidencePicker'
import { useProgress } from '../hooks/useProgress'
import type { Confidence } from '../lib/progress'

type Phase = 'study' | 'cover' | 'check'
type Grade = 'again' | 'good'

type AnswerQuestionId = AnswerBeat['questionId']

function shuffle<T>(items: T[], rng = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function weightByConfidence(confidence: Confidence): number {
  return Math.max(1, 5 - confidence)
}

export function Memorize() {
  const { state, setConfidence } = useProgress()
  const [track, setTrack] = useState<MemorizeTrack>('answers')
  const [questionId, setQuestionId] = useState<AnswerQuestionId>('q-why-ff')
  const [mode, setMode] = useState<'beats' | 'ladder' | 'full'>('beats')
  const [phase, setPhase] = useState<Phase>('study')
  const [queue, setQueue] = useState<string[]>(() =>
    weightedAnswerQueue('q-why-ff', state.questions),
  )
  const [qi, setQi] = useState(0)
  const [sessionAgain, setSessionAgain] = useState(0)
  const [sessionGood, setSessionGood] = useState(0)
  const [ladderUpTo, setLadderUpTo] = useState(0)

  const beat = useMemo(
    () => answerBeats.find((b) => b.id === queue[qi]) ?? answerBeats[0],
    [queue, qi],
  )

  const factQueue = useMemo(() => {
    const scored = memorizeFacts.map((f) => ({
      f,
      w: weightByConfidence((state.facts[f.id]?.confidence ?? 0) as Confidence),
    }))
    const bag: MemorizeFact[] = []
    for (const { f, w } of scored) {
      for (let i = 0; i < w; i++) bag.push(f)
    }
    return shuffle(bag).slice(0, Math.max(12, memorizeFacts.length))
  }, [state.facts, track])

  const [factIndex, setFactIndex] = useState(0)
  const [factFlipped, setFactFlipped] = useState(false)
  const fact = factQueue[factIndex % Math.max(1, factQueue.length)]

  const ladderBeats = beatsForQuestion(questionId)
  const ladderText = ladderBeats
    .slice(0, ladderUpTo + 1)
    .map((b) => b.text)
    .join('\n\n')

  function weightedAnswerQueue(
    qid: AnswerQuestionId,
    confMap: typeof state.questions,
  ): string[] {
    const pool = beatsForQuestion(qid)
    const bag: string[] = []
    for (const b of pool) {
      const c = (confMap[b.id]?.confidence ?? 0) as Confidence
      const w = weightByConfidence(c)
      for (let i = 0; i < w; i++) bag.push(b.id)
    }
    return shuffle(bag.length ? bag : pool.map((b) => b.id))
  }

  function startAnswers(qid: AnswerQuestionId, nextMode: typeof mode = mode) {
    setQuestionId(qid)
    setMode(nextMode)
    setPhase('study')
    setLadderUpTo(0)
    setQueue(weightedAnswerQueue(qid, state.questions))
    setQi(0)
  }

  function gradeBeat(g: Grade) {
    const conf: Confidence = g === 'good' ? 3 : 1
    setConfidence('questions', beat.id, conf)
    if (g === 'good') setSessionGood((n) => n + 1)
    else setSessionAgain((n) => n + 1)

    setPhase('study')
    if (g === 'again') {
      setQueue((q) => {
        const next = [...q]
        const id = next[qi]
        next.splice(qi, 1)
        const insertAt = Math.min(next.length, qi + 2)
        next.splice(insertAt, 0, id)
        return next.length ? next : [id]
      })
      return
    }
    setQi((i) => {
      if (i + 1 >= queue.length) {
        setQueue(weightedAnswerQueue(questionId, state.questions))
        return 0
      }
      return i + 1
    })
  }

  function gradeFact(c: Confidence) {
    setConfidence('facts', fact.id, c)
    if (c <= 1) setSessionAgain((n) => n + 1)
    else setSessionGood((n) => n + 1)
    setFactFlipped(false)
    setFactIndex((i) => i + 1)
  }

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Active recall</div>
          <h1>Memorize</h1>
          <p className="lede">
            Scroll is for when you already know it. Memorize builds it: study a
            beat → cover → say it aloud → check. Weak beats and facts come back
            first.
          </p>
        </div>
      </section>

      <div className="panel memorize-method">
        <div className="eyebrow">Method</div>
        <ol className="memorize-steps">
          {memorizeMethodSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="row" style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className={`btn small${track === 'answers' ? '' : ' ghost'}`}
          onClick={() => {
            setTrack('answers')
            startAnswers(questionId, 'beats')
          }}
        >
          Screening answers
        </button>
        <button
          type="button"
          className={`btn small${track === 'facts' ? '' : ' ghost'}`}
          onClick={() => {
            setTrack('facts')
            setFactFlipped(false)
            setFactIndex(0)
          }}
        >
          EF&R facts
        </button>
        <span className="tag">
          session {sessionGood} good · {sessionAgain} again
        </span>
      </div>

      {track === 'answers' ? (
        <>
          <div className="row" style={{ marginBottom: '0.85rem' }}>
            {(
              [
                ['q-why-ff', 'Why FF'],
                ['q-prep', 'Prepare'],
                ['q-efr-traits', 'Traits'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`btn small ghost${questionId === id ? '' : ''}`}
                style={
                  questionId === id
                    ? { borderColor: 'var(--ember)', color: 'var(--ember-bright)' }
                    : undefined
                }
                onClick={() => startAnswers(id)}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className={`btn small ghost${mode === 'beats' ? '' : ''}`}
              style={
                mode === 'beats'
                  ? { borderColor: 'var(--ember)', color: 'var(--ember-bright)' }
                  : undefined
              }
              onClick={() => startAnswers(questionId, 'beats')}
            >
              Beats
            </button>
            <button
              type="button"
              className="btn small ghost"
              style={
                mode === 'ladder'
                  ? { borderColor: 'var(--ember)', color: 'var(--ember-bright)' }
                  : undefined
              }
              onClick={() => startAnswers(questionId, 'ladder')}
            >
              Ladder
            </button>
            <button
              type="button"
              className="btn small ghost"
              style={
                mode === 'full'
                  ? { borderColor: 'var(--ember)', color: 'var(--ember-bright)' }
                  : undefined
              }
              onClick={() => startAnswers(questionId, 'full')}
            >
              Full answer
            </button>
          </div>

          {mode === 'beats' && beat && (
            <article className="question-block memorize-card">
              <div className="eyebrow">
                {beat.questionLabel} · Beat {beat.beatIndex + 1}/{beat.beatTotal}
              </div>
              <h3>{beat.cue}</h3>

              {phase === 'study' && (
                <>
                  <p className="memorize-text">{beat.text}</p>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('cover')}
                    >
                      Cover & say aloud
                    </button>
                  </div>
                </>
              )}

              {phase === 'cover' && (
                <>
                  <div className="memorize-cover" aria-live="polite">
                    <p className="memorize-cover-prompt">
                      Cue only — speak the beat. Don’t peek.
                    </p>
                    <p className="memorize-cover-cue">{beat.cue}</p>
                  </div>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('check')}
                    >
                      Check
                    </button>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => setPhase('study')}
                    >
                      Peek study
                    </button>
                  </div>
                </>
              )}

              {phase === 'check' && (
                <>
                  <p className="memorize-text">{beat.text}</p>
                  <p className="muted">How close was your spoken version?</p>
                  <div className="row">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => gradeBeat('again')}
                    >
                      Again
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => gradeBeat('good')}
                    >
                      Good — next
                    </button>
                  </div>
                </>
              )}
            </article>
          )}

          {mode === 'ladder' && (
            <article className="question-block memorize-card">
              <div className="eyebrow">
                Ladder · through beat {ladderUpTo + 1}/{ladderBeats.length}
              </div>
              <h3>{questionId === 'q-why-ff' ? 'Why firefighter?' : questionId === 'q-prep' ? 'Prepare?' : 'Traits?'}</h3>
              {phase === 'study' && (
                <>
                  <p className="memorize-text">{ladderText}</p>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('cover')}
                    >
                      Cover & say through beat {ladderUpTo + 1}
                    </button>
                  </div>
                </>
              )}
              {phase === 'cover' && (
                <>
                  <div className="memorize-cover">
                    <p className="memorize-cover-prompt">
                      Speak from the top through beat {ladderUpTo + 1}.
                    </p>
                    <ul className="memorize-cue-list">
                      {ladderBeats.slice(0, ladderUpTo + 1).map((b) => (
                        <li key={b.id}>{b.cue}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('check')}
                    >
                      Check
                    </button>
                  </div>
                </>
              )}
              {phase === 'check' && (
                <>
                  <p className="memorize-text">{ladderText}</p>
                  <div className="row">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => setPhase('study')}
                    >
                      Study again
                    </button>
                    {ladderUpTo + 1 < ladderBeats.length ? (
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setLadderUpTo((n) => n + 1)
                          setPhase('study')
                          setSessionGood((n) => n + 1)
                        }}
                      >
                        Add next beat
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setMode('full')
                          setPhase('study')
                          setSessionGood((n) => n + 1)
                        }}
                      >
                        Full answer mode
                      </button>
                    )}
                  </div>
                </>
              )}
            </article>
          )}

          {mode === 'full' && (
            <article className="question-block memorize-card">
              <div className="eyebrow">Full spoken answer · ~2 minutes</div>
              <h3>
                {questionId === 'q-why-ff'
                  ? 'Why do you want to be a firefighter?'
                  : questionId === 'q-prep'
                    ? 'What have you done to prepare?'
                    : 'What traits do you bring?'}
              </h3>
              {phase === 'study' && (
                <>
                  <p className="memorize-text">{fullDraft(questionId)}</p>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('cover')}
                    >
                      Cover & deliver full answer
                    </button>
                  </div>
                </>
              )}
              {phase === 'cover' && (
                <>
                  <div className="memorize-cover">
                    <p className="memorize-cover-prompt">Cue spine only — ~2 minutes aloud.</p>
                    <ul className="memorize-cue-list">
                      {beatsForQuestion(questionId).map((b) => (
                        <li key={b.id}>{b.cue}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="row" style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setPhase('check')}
                    >
                      Check against draft
                    </button>
                  </div>
                </>
              )}
              {phase === 'check' && (
                <>
                  <p className="memorize-text">{fullDraft(questionId)}</p>
                  <div className="eyebrow">Confidence on full answer</div>
                  <ConfidencePicker
                    value={
                      (state.questions[questionId]?.confidence ?? 0) as Confidence
                    }
                    onChange={(c) => {
                      setConfidence('questions', questionId, c)
                      setPhase('study')
                      if (c <= 1) setSessionAgain((n) => n + 1)
                      else setSessionGood((n) => n + 1)
                    }}
                  />
                </>
              )}
            </article>
          )}

          <p className="footer-note">
            Tip: one beat until “Good” twice, then Ladder, then Full. After that,
            use <Link to="/scroll?focus=efr&stage=screening">Scroll</Link> for
            speed reps.
          </p>
        </>
      ) : (
        <article className="question-block memorize-card">
          <div className="eyebrow">
            EF&R fact · {factIndex + 1} · {fact?.tag}
          </div>
          <h3>{fact?.prompt}</h3>
          {!factFlipped ? (
            <div className="row" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="btn"
                onClick={() => setFactFlipped(true)}
              >
                Reveal answer
              </button>
              <p className="muted" style={{ margin: 0 }}>
                Say it aloud first.
              </p>
            </div>
          ) : (
            <>
              <p className="memorize-text">{fact?.answer}</p>
              <div className="eyebrow">How solid?</div>
              <ConfidencePicker
                value={(state.facts[fact.id]?.confidence ?? 0) as Confidence}
                onChange={gradeFact}
              />
            </>
          )}
          <p className="footer-note">
            Weak facts (0–1) resurface more often. Aim for 3+ on screening-critical
            items before interview day.
          </p>
        </article>
      )}
    </div>
  )
}
