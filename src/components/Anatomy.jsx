import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnatomyViewer } from './Viewer3D.jsx'
import { anatomy } from '../data/site.js'

/** Click a step to move the camera to that part on desktop. Static on mobile without huge cards. */
export default function Anatomy() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 860 : false))
  const step = anatomy[active]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const handler = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="anatomy">
      <div className="anatomy-steps" role={isMobile ? undefined : 'tablist'} aria-label="Machine anatomy">
        {isMobile
          ? anatomy.map((s, i) => (
              <div key={s.title} className="astep astep-static">
                <span className="astep-n">0{i + 1}</span>
                <span className="astep-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </span>
              </div>
            ))
          : anatomy.map((s, i) => (
              <button key={s.title} role="tab" aria-selected={active === i} className={`astep ${active === i ? 'on' : ''}`} onClick={() => setActive(i)}>
                <span className="astep-n">0{i + 1}</span>
                <span className="astep-body">
                  <h3>{s.title}</h3>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        {s.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            ))}
      </div>
      <div className="anatomy-canvas-wrap">
        <div className="anatomy-canvas">
          <AnatomyViewer focus={step.focus} preset={step} />
          <div className="anatomy-index" aria-hidden="true">
            {anatomy.map((_, i) => (
              <i key={i} className={i === active ? 'on' : ''} />
            ))}
            <span>
              {active + 1} / {anatomy.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
