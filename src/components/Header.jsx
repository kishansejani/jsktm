import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'
import { Logo, telHref } from './ui.jsx'
import { navLinks, company } from '../data/site.js'

export default function Header({ onQuote }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar-in">
          <span>Yarn winding machinery &amp; spares · Made in Gujarat, India</span>
          <a href={telHref(company.phones[0])}>
            <Phone size={13} /> {company.phones[0]}
          </a>
        </div>
      </div>
      <div className="container nav-in">
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
          <button className="btn btn-accent nav-cta" onClick={onQuote}>
            Get a quote <ArrowUpRight size={16} />
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container drawer-top">
              <Logo />
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="container drawer-links" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <NavLink to={l.to} end={l.to === '/'}>
                    <small>0{i + 1}</small> {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <button
                className="btn btn-accent"
                onClick={() => {
                  setOpen(false)
                  onQuote()
                }}
              >
                Get a quote <ArrowUpRight size={16} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
