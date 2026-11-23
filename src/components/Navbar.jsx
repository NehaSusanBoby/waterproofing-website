import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/anim.js'
import { site, navLinks } from '../data/site.js'

// Transparent over the dark hero; turns solid after scrolling,
// hides when scrolling down and comes back when scrolling up.
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setScrolled(y > 40)
        setHidden(self.direction === 1 && y > 400)
      },
    })
    return () => st.kill()
  }, [pathname])

  const cls = ['navbar', scrolled || open ? 'is-solid' : '', hidden && !open ? 'is-hidden' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <span className="navbar__mark" aria-hidden="true">💧</span>
          {site.name}
        </Link>
        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn--small btn--glow" onClick={close}>
            Free Inspection
          </Link>
        </nav>
      </div>
    </header>
  )
}
