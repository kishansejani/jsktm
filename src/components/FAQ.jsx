import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/site.js'

const rx = /(\+91[\d ]{10,14}|[\w.+-]+@[\w-]+\.[\w.]+)/g
const linkify = (t) =>
  t.split(rx).map((x, i) => (i % 2 ? <a key={i} href={x.includes('@') ? `mailto:${x}` : `tel:${x.replace(/\s/g, '')}`}>{x}</a> : x))

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {faqs.map((f, i) => {
        const on = open === i
        return (
          <div key={f.q} className={`faq-item ${on ? 'on' : ''}`}>
            <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
              <span>{f.q}</span>
              <Plus size={20} />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="faq-a">
                  <p>{linkify(f.a)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
