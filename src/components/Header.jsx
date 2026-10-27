import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { Logo, telHref } from './ui.jsx'
import { Magnetic } from './fx.jsx'
import { navLinks, company } from '../data/site.js'

export default function Header({ onQuote }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-anim')
    root.setAttribute('data-theme', next)
    setTheme(next)
    try {
      localStorage.setItem('jsk-theme', next)
    } catch {}
    setTimeout(() => root.classList.remove('theme-anim'), 600)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="capsule">
          <Link to="/" aria-label="JSK Tex Mech home">
            <Logo />
          </Link>
          <nav className="nav-desktop" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="icon-btn phone-btn" href={telHref(company.phones[0])} aria-label="Call us">
              <Phone size={18} />
            </a>
            <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span className="nav-cta">
              <Magnetic>
                <button className="btn btn-accent" onClick={onQuote}>
                  Get a quote <ArrowUpRight size={16} />
                </button>
              </Magnetic>
            </span>
            <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ clipPath: 'circle(0% at 90% 5%)' }} animate={{ clipPath: 'circle(150% at 90% 5%)' }} exit={{ clipPath: 'circle(0% at 90% 5%)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <div className="container drawer-top">
              <Logo />
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="container drawer-links" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * i + 0.25 }}>
                  <NavLink to={l.to} end={l.to === '/'}>
                    <small>0{i + 1}</small> {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="drawer-row">
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    setOpen(false)
                    onQuote()
                  }}
                >
                  Get a quote <ArrowUpRight size={16} />
                </button>
                <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
