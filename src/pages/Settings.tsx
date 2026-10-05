import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'

export function Settings() {
  const { state, exportJson, importJson, reset } = useProgress()
  const [importText, setImportText] = useState('')
  const [message, setMessage] = useState('')

  function download() {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `board-ready-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Progress exported.')
  }

  function doImport() {
    try {
      importJson(importText)
      setMessage('Progress imported.')
      setImportText('')
    } catch {
      setMessage('Import failed — check JSON.')
    }
  }

  return (
    <div>
      <section className="hero-board">
        <div>
          <div className="eyebrow">Settings</div>
          <h1>Progress & data</h1>
          <p className="lede">
            Confidence scores, drafts, plan checks, and simulator reps live in this
            browser’s localStorage. Export backups often. Content (stories, why
            answers, dept intel) is edited in the repo under{' '}
            <code style={{ color: 'var(--copper)' }}>src/content/</code>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Export / import</h2>
        </div>
        <div className="panel stack">
          <p>
            Saved simulator reps: {state.simulatorReps.length}. Fact entries:{' '}
            {Object.keys(state.facts).length}. Question drafts/scores:{' '}
            {Object.keys(state.questions).length}.
          </p>
          <div className="row">
            <button type="button" className="btn" onClick={download}>
              Download JSON
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={async () => {
                await navigator.clipboard.writeText(exportJson())
                setMessage('Copied progress JSON to clipboard.')
              }}
            >
              Copy JSON
            </button>
          </div>
          <label className="eyebrow" htmlFor="import">
            Paste progress JSON to import
          </label>
          <textarea
            id="import"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder='{"version":1,...}'
          />
          <div className="row">
            <button type="button" className="btn" onClick={doImport} disabled={!importText.trim()}>
              Import
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                if (confirm('Reset all local progress?')) {
                  reset()
                  setMessage('Progress reset.')
                }
              }}
            >
              Reset local progress
            </button>
          </div>
          {message && <p style={{ color: 'var(--ok)' }}>{message}</p>}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How to edit content</h2>
        </div>
        <div className="panel">
          <ul>
            <li>
              <code>src/content/departments/efr.ts</code> / <code>bfd.ts</code> —
              intel, why draft, facts, process dates
            </li>
            <li>
              <code>src/content/stories.ts</code> — STAR stories & bio
            </li>
            <li>
              <code>src/content/questions.ts</code> — practice question bank
            </li>
            <li>
              <code>src/content/schedule.ts</code> — daily battle plan
            </li>
          </ul>
          <p className="muted">
            After editing, commit and push; GitHub Actions deploys to GitHub Pages.
          </p>
        </div>
      </section>
    </div>
  )
}
