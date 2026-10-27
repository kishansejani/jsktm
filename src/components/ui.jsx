import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { assets, company } from '../data/site.js'

/** Image that falls back to a designed placeholder if the remote file fails. */
export function SmartImg({ src, alt, className = '', fallbackLabel, ...rest }) {
  const [failed, setFailed] = useState(!src)
  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path d="M60 14 92 106H28Z" fill="currentColor" opacity=".9" />
          <path d="M44 62h32M38 78h44M50 46h20" stroke="#070d1f" strokeWidth="5" strokeLinecap="round" />
        </svg>
        {fallbackLabel && <span>{fallbackLabel}</span>}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}

/** Your logo (public/mobilelogo.png) on a white chip so the navy letters stay readable on dark. */
export function Logo() {
  const [failed, setFailed] = useState(false)
  return (
    <span className="logo">
      {!failed ? (
        <img src={assets.logoMobile} alt="JSK Tex Mech Pvt. Ltd." className="logo-img" onError={() => setFailed(true)} />
      ) : (
        <span className="logo-text">
          <b>JSK</b> Tex Mech
        </span>
      )}
    </span>
  )
}

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

export function Counter({ value, suffix = '', plain = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return setN(value)
    const start = performance.now()
    const dur = 1600
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <span ref={ref}>
      {plain ? n : n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <Reveal className={`section-head ${center ? 'center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

export function PageHero({ eyebrow, title, text, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="page-hero-threads" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </nav>
        <motion.span
          className="eyebrow light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7 }}
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  )
}

export function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t}
            <i />
          </span>
        ))}
      </div>
    </div>
  )
}

export const telHref = (p) => `tel:${p.replace(/\s/g, '')}`
export const waHref = (msg = '') =>
  `https://wa.me/${company.phones[0].replace(/\D/g, '')}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
