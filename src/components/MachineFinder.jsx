import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, ArrowRight } from 'lucide-react'
import { products } from '../data/site.js'

const options = [
  { id: 'assembly-cheese-winding-machine', label: 'Combine several yarns into one package', hint: 'Doubling / plying preparation' },
  { id: 'rewinding-cone-winding-machine', label: 'Hard, uniform final cones', hint: 'Ready for weaving or knitting' },
  { id: 'soft-dye-package-winding-machine', label: 'Soft packages for dyeing', hint: 'Perforated tubes or dye springs' },
  { id: 'pre-application-winding-machine', label: 'Something more specialised', hint: 'Pre-application or very large packages' },
]

export default function MachineFinder({ onQuote }) {
  const [pick, setPick] = useState(null)
  const result = pick && products.find((p) => p.slug === pick)

  return (
    <div className="finder">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="q" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <p className="finder-q">What do you need your winding line to produce?</p>
            <div className="finder-opts">
              {options.map((o) => (
                <button key={o.id} onClick={() => setPick(o.id)}>
                  <b>{o.label}</b>
                  <span>{o.hint}</span>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="r" className="finder-res" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="eyebrow light">Our suggestion</span>
            <h3>{result.name}</h3>
            <p>{result.blurb}</p>
            <div className="finder-actions">
              <Link className="btn btn-accent" to={`/products/${result.slug}`}>
                See specifications <ArrowRight size={16} />
              </Link>
              <button className="btn btn-outline-light" onClick={() => onQuote(result.name)}>
                Request a quote
              </button>
              <button className="btn-text" onClick={() => setPick(null)}>
                <RotateCcw size={14} /> Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
