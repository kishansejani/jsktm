import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AnatomyViewer } from './Viewer3D.jsx'
import { anatomy } from '../data/site.js'

export default function Anatomy() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const step = anatomy[active]

  return (
    <div className="anatomy">
      <div className="anatomy-steps">
        {anatomy.map((s, i) => (
          <motion.article
            key={s.title}
            ref={(el) => (refs.current[i] = el)}
            data-i={i}
            className={`astep ${active === i ? 'on' : ''}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: active === i ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <span className="astep-n">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.article>
        ))}
      </div>
      <div className="anatomy-sticky">
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
