import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  buildFeedQueue,
  type FeedCard,
  type FeedFocus,
} from '../content/feed'
import { getDepartment, type StageId } from '../content'
import { ConfidencePicker } from '../components/ConfidencePicker'
import { useProgress } from '../hooks/useProgress'
import type { Confidence } from '../lib/progress'

const SWIPE_THRESHOLD = 56

function focusFromParams(raw: string | null): FeedFocus {
  if (raw === 'bfd' || raw === 'both') return raw
  return 'efr'
}

function stageFromParams(raw: string | null): StageId | undefined {
  if (
    raw === 'screening' ||
    raw === 'speed' ||
    raw === 'oral' ||
    raw === 'leadership' ||
    raw === 'chiefs'
  ) {
    return raw
  }
  return undefined
}

/** True when the event started/targets inside the long reveal text box. */
function isInsideRevealPanel(target: EventTarget | null): boolean {
  return target instanceof Element && !!target.closest('.scroll-reveal-panel')
}

/** Panel still has room to scroll in the wheel direction. */
function revealPanelCanScroll(panel: Element, deltaY: number): boolean {
  const el = panel as HTMLElement
  const max = el.scrollHeight - el.clientHeight
  if (max <= 1) return false
  if (deltaY > 0) return el.scrollTop < max - 1
  if (deltaY < 0) return el.scrollTop > 1
  return false
}

export function Scroll() {
  const [params, setParams] = useSearchParams()
  const focus = focusFromParams(params.get('focus'))
  const stage = stageFromParams(params.get('stage')) ?? (focus === 'efr' ? 'screening' : undefined)
  const { state, setConfidence } = useProgress()

  const [queue, setQueue] = useState<FeedCard[]>(() =>
    buildFeedQueue(focus, state, { stage, length: 48 }),
  )
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [streak, setStreak] = useState(0)
  const [sessionDone, setSessionDone] = useState(0)
  const [flash, setFlash] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [animating, setAnimating] = useState<'up' | 'down' | null>(null)

  const touchStart = useRef<{ y: number; t: number; inReveal: boolean } | null>(
    null,
  )
  const lock = useRef(false)

  const card = queue[index]
  const deptLabel =
    focus === 'both'
      ? 'Both depts'
      : getDepartment(focus === 'bfd' ? 'bfd' : 'efr').shortName

  const conf: Confidence | null = useMemo(() => {
    if (!card?.progressKind || !card.progressId) return null
    return (state[card.progressKind][card.progressId]?.confidence ?? 0) as Confidence
  }, [card, state])

  const revealText = useMemo(() => {
    if (!card) return ''
    if (card.kind === 'speak' && card.progressId) {
      const draft = state.questions[card.progressId]?.answerDraft?.trim()
      if (draft) return `Your draft:\n${draft}\n\nCoaching tip:\n${card.reveal}`
    }
    return card.reveal
  }, [card, state.questions])

  const refillIfNeeded = useCallback(
    (nextIndex: number, current: FeedCard[]) => {
      if (nextIndex < current.length - 8) return current
      const more = buildFeedQueue(focus, state, { stage, length: 32 })
      return [...current, ...more]
    },
    [focus, stage, state],
  )

  const go = useCallback(
    (delta: 1 | -1) => {
      if (lock.current || animating) return
      if (delta < 0 && index === 0) {
        setDragY(0)
        return
      }

      lock.current = true
      setAnimating(delta > 0 ? 'up' : 'down')
      setDragY(0)

      window.setTimeout(() => {
        setIndex((i) => {
          const next = Math.max(0, i + delta)
          setQueue((q) => refillIfNeeded(next, q))
          return next
        })
        setRevealed(false)
        setAnimating(null)
        lock.current = false
      }, 220)
    },
    [animating, index, refillIfNeeded],
  )

  const completeCard = useCallback(() => {
    setStreak((s) => s + 1)
    setSessionDone((n) => n + 1)
    setFlash(true)
    window.setTimeout(() => setFlash(false), 350)
    window.setTimeout(() => go(1), 280)
  }, [go])

  function onRate(c: Confidence) {
    if (!card?.progressKind || !card.progressId) {
      completeCard()
      return
    }
    setConfidence(card.progressKind, card.progressId, c)
    completeCard()
  }

  function rebuild(nextFocus: FeedFocus, nextStage?: StageId) {
    const q = buildFeedQueue(nextFocus, state, {
      stage: nextStage,
      length: 48,
    })
    setQueue(q)
    setIndex(0)
    setRevealed(false)
    setStreak(0)
    const sp = new URLSearchParams()
    sp.set('focus', nextFocus)
    if (nextStage) sp.set('stage', nextStage)
    setParams(sp, { replace: true })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        go(-1)
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!revealed) setRevealed(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, revealed])

  useEffect(() => {
    const stageEl = document.querySelector('.scroll-stage')
    if (!stageEl) return
    const onWheel = (e: Event) => {
      const we = e as WheelEvent
      if (Math.abs(we.deltaY) < 18) return

      const panel =
        we.target instanceof Element
          ? we.target.closest('.scroll-reveal-panel')
          : null

      // Nested scroll: keep wheel inside the reveal box while it can scroll,
      // and never steal the gesture mid-read.
      if (panel) {
        if (revealPanelCanScroll(panel, we.deltaY)) {
          return
        }
        // At the edge of the panel — still don't auto-advance; use Next/Prev.
        we.preventDefault()
        return
      }

      we.preventDefault()
      go(we.deltaY > 0 ? 1 : -1)
    }
    stageEl.addEventListener('wheel', onWheel, { passive: false })
    return () => stageEl.removeEventListener('wheel', onWheel)
  }, [go])

  function onTouchStart(e: TouchEvent) {
    const t = e.touches[0]
    touchStart.current = {
      y: t.clientY,
      t: Date.now(),
      inReveal: isInsideRevealPanel(e.target),
    }
  }

  function onTouchMove(e: TouchEvent) {
    if (!touchStart.current || touchStart.current.inReveal) return
    const y = e.touches[0].clientY
    setDragY(y - touchStart.current.y)
  }

  function onTouchEnd() {
    if (!touchStart.current) return
    const { inReveal } = touchStart.current
    const dy = dragY
    touchStart.current = null
    if (inReveal) {
      setDragY(0)
      return
    }
    if (dy < -SWIPE_THRESHOLD) go(1)
    else if (dy > SWIPE_THRESHOLD) go(-1)
    else setDragY(0)
  }

  if (!card) {
    return (
      <div className="scroll-shell">
        <p>No cards in this feed.</p>
        <Link to="/">Back</Link>
      </div>
    )
  }

  const slideStyle: CSSProperties = {
    transform: animating
      ? `translateY(${animating === 'up' ? '-108%' : '108%'})`
      : `translateY(${dragY * 0.35}px)`,
    opacity: animating ? 0.35 : 1 - Math.min(0.35, Math.abs(dragY) / 400),
    transition: animating || dragY === 0 ? 'transform 0.22s ease, opacity 0.22s ease' : 'none',
  }

  return (
    <div
      className={`scroll-shell${flash ? ' scroll-flash' : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <header className="scroll-top">
        <Link to="/" className="scroll-exit" aria-label="Exit scroll">
          ← Exit
        </Link>
        <div className="scroll-meta">
          <span className="scroll-brand">SCROLL PREP</span>
          <span className="scroll-dept">{deptLabel}</span>
        </div>
        <div className="scroll-stats" aria-live="polite">
          <span className="scroll-streak">{streak} streak</span>
          <span className="scroll-done">{sessionDone} done</span>
        </div>
      </header>

      <div className="scroll-filters" role="group" aria-label="Feed focus">
        <button
          type="button"
          className={focus === 'efr' ? 'on' : ''}
          onClick={() => rebuild('efr', 'screening')}
        >
          EF&R
        </button>
        <button
          type="button"
          className={focus === 'bfd' ? 'on' : ''}
          onClick={() => rebuild('bfd', 'speed')}
        >
          BFD
        </button>
        <button
          type="button"
          className={focus === 'both' ? 'on' : ''}
          onClick={() => rebuild('both')}
        >
          Mix
        </button>
      </div>

      <div className="scroll-stage">
        <article
          className={`scroll-card kind-${card.kind}`}
          style={slideStyle}
          key={`${card.contentKey}-${index}`}
        >
          <div className="scroll-card-glow" aria-hidden />
          <div className="eyebrow">{card.eyebrow}</div>
          <h1 className="scroll-prompt">{card.prompt}</h1>
          {card.hint && !revealed && <p className="scroll-hint">{card.hint}</p>}

          {!revealed ? (
            <button
              type="button"
              className="btn scroll-reveal"
              onClick={() => setRevealed(true)}
            >
              {card.actionLabel}
            </button>
          ) : (
            <div
              className="scroll-reveal-panel"
              onWheel={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <p className="scroll-answer">{revealText}</p>
            </div>
          )}

          <div className="scroll-actions">
            {!revealed ? (
              <p className="scroll-hint" style={{ margin: 0 }}>
                Speak first. Reveal when ready. Rate to keep the streak.
              </p>
            ) : card.progressKind && card.progressId ? (
              <div>
                <div className="eyebrow">How solid?</div>
                <ConfidencePicker
                  value={conf ?? 0}
                  onChange={onRate}
                />
              </div>
            ) : (
              <button type="button" className="btn" onClick={completeCard}>
                Keep scrolling
              </button>
            )}
          </div>
        </article>
      </div>

      <footer className="scroll-bottom">
        <button
          type="button"
          className="btn ghost small"
          onClick={() => go(-1)}
          disabled={index === 0}
        >
          Prev
        </button>
        <div className="scroll-nudge">
          <span className="scroll-chevron" aria-hidden>
            ⌃
          </span>
          Swipe up · space to reveal
        </div>
        <button type="button" className="btn small" onClick={() => go(1)}>
          Next
        </button>
      </footer>
    </div>
  )
}
