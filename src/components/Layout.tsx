import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Mission', end: true },
  { to: '/memorize', label: 'Memorize' },
  { to: '/distill', label: 'Distill' },
  { to: '/scroll?focus=efr&stage=screening', label: 'Scroll' },
  { to: '/efr', label: 'EF&R' },
  { to: '/bfd', label: 'Bellingham' },
  { to: '/stories', label: 'Stories' },
  { to: '/questions', label: 'Questions' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/plan', label: 'Plan' },
  { to: '/chiefs', label: 'Chiefs' },
  { to: '/settings', label: 'Settings' },
]

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topnav">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">BOARD READY</span>
          <span className="brand-sub">Oral board mission control</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
