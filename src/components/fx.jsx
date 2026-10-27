import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Words slide up from a mask. Wrap a word in *asterisks* for the gradient highlight. */
export function SplitText({ text, as = 'h1', className = '', delay = 0, stagger = 0.055, inView = false }) {
  const words = []
  text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .forEach((p) => {
      const em = p.startsWith('*')
      const t = em ? p.slice(1, -1) : p
      t.split(' ')
        .filter(Boolean)
        .forEach((w) => words.push({ w, em }))
    })
  const Tag = motion[as]
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } } : { animate: 'show' }
  return (
    <Tag
      className={className}
      aria-label={text.replace(/\*/g, '')}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((x, i) => (
        <span key={i}>
          <span className="stw" aria-hidden="true">
            <motion.span
              className={x.em ? 'stw-in stw-em' : 'stw-in'}
              variants={{ hidden: { y: '115%', rotate: 5 }, show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            >
              {x.w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}

/** Mouse-following spotlight (+ optional 3D tilt) on hover. */
export function Spot({ as: Tag = 'div', tilt = false, className = '', children, ...rest }) {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt) {
      el.style.setProperty('--rx', `${(y / r.height - 0.5) * -9}deg`)
      el.style.setProperty('--ry', `${(x / r.width - 0.5) * 9}deg`)
    }
  }
  const leave = () => {
    const el = ref.current
    if (!el || !tilt) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  return (
    <Tag ref={ref} className={`spot ${tilt ? 'tilt' : ''} ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  )
}

/** Element gently pulls toward the cursor. */
export function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType === 'touch') return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

/** Custom cursor ring (desktop / fine pointers only). */
export function Cursor() {
  const [on, setOn] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setOn(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => setHover(!!e.target.closest?.('a, button, [data-cursor], input, select, textarea, canvas, summary'))
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  if (!on) return null
  return <motion.div className={`cursor ${hover ? 'hover' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true" />
}
