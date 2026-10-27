import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Move3d, Image as ImageIcon, ArrowUpRight, Pause, Play } from 'lucide-react'
import { Viewer3D } from './Viewer3D.jsx'
import { SmartImg } from './ui.jsx'
import { YARN } from './yarn.js'
import { products } from '../data/site.js'

export default function Showroom({ onQuote, id }) {
  const [idx, setIdx] = useState(1)
  const [mode, setMode] = useState('3d')
  const [color, setColor] = useState(0)
  const [multi, setMulti] = useState(true)
  const [auto, setAuto] = useState(true)
  const [photo, setPhoto] = useState(0)
  const p = products[idx]

  const pick = (i) => {
    setIdx(i)
    setPhoto(0)
  }

  return (
    <div className="showroom" id={id}>
      <div className="show-stage">
        <div className="show-toolbar">
          <div className="seg" role="tablist" aria-label="View mode">
            <button role="tab" aria-selected={mode === '3d'} className={mode === '3d' ? 'on' : ''} onClick={() => setMode('3d')}>
              <Move3d size={15} /> 3D view
            </button>
            <button role="tab" aria-selected={mode === 'photo'} className={mode === 'photo' ? 'on' : ''} onClick={() => setMode('photo')}>
              <ImageIcon size={15} /> Photos
            </button>
          </div>
          {mode === '3d' && (
            <button className="chip-btn" onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
              {auto ? <Pause size={14} /> : <Play size={14} />} {auto ? 'Pause spin' : 'Auto-rotate'}
            </button>
          )}
        </div>

        <div className="show-canvas">
          <AnimatePresence mode="wait">
            <motion.div key={`${mode}-${p.slug}-${photo}`} className="show-fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {mode === '3d' ? (
                <Viewer3D kind={p.kind} heads={p.heads} color={color} multi={multi} autoRotate={auto} zoom />
              ) : (
                <SmartImg src={p.images[photo]} alt={p.name} className="show-photo" fallbackLabel={p.onRequest ? 'Photos on request' : ''} />
              )}
            </motion.div>
          </AnimatePresence>
          {mode === '3d' && <span className="drag-hint">Drag to rotate · scroll to zoom</span>}
        </div>

        {mode === '3d' ? (
          <div className="swatches" aria-label="Yarn colour">
            <span>Yarn colour</span>
            <button className={`sw sw-multi ${multi ? 'on' : ''}`} onClick={() => setMulti(true)} aria-label="Multicolour" />
            {YARN.map((c, i) => (
              <button key={c} className={`sw ${!multi && color === i ? 'on' : ''}`} style={{ background: c }} onClick={() => { setColor(i); setMulti(false) }} aria-label={`Colour ${i + 1}`} />
            ))}
          </div>
        ) : (
          p.images.length > 1 && (
            <div className="swatches">
              {p.images.map((src, i) => (
                <button key={i} className={`thumb-sm ${photo === i ? 'on' : ''}`} onClick={() => setPhoto(i)} aria-label={`Photo ${i + 1}`}>
                  <SmartImg src={src} alt="" />
                </button>
              ))}
            </div>
          )
        )}
      </div>

      <div className="show-side">
        <ul className="show-tabs" role="tablist" aria-label="Machines">
          {products.map((x, i) => (
            <li key={x.slug}>
              <button role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => pick(i)}>
                <small>0{i + 1}</small>
                <span>{x.short}</span>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.div key={p.slug} className="show-info" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <h3>{p.name}</h3>
            <p>{p.blurb}</p>
            <ul className="mini-specs">
              {p.features.slice(0, 4).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="show-actions">
              <button className="btn btn-accent" onClick={() => onQuote(p.name)}>
                Get a quote <ArrowUpRight size={16} />
              </button>
              <Link className="btn btn-outline-light" to={`/products/${p.slug}`}>
                Full details
              </Link>
            </div>
            <p className="show-note">3D models are illustrative representations of each machine type.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
