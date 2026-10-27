import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PageHero, SectionHead, Reveal } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Showroom from '../components/Showroom.jsx'
import { products, workingSystems } from '../data/site.js'

const filters = [
  { id: 'all', label: 'All machines' },
  { id: 'doubling', label: 'Assembly & doubling' },
  { id: 'final', label: 'Final packages' },
  { id: 'dyeing', label: 'Dyeing' },
]

export default function Products({ onQuote }) {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (filter === 'all' || p.stage === filter) &&
          (p.name + p.blurb + p.category).toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [filter, q],
  )

  return (
    <>
      <PageHero
        eyebrow="Products"
        crumbs={['Home', 'Products']}
        title="Yarn winding machinery & spares."
        text="Cost-effective, technologically advanced post-spinning winding machinery for textile manufacturers."
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="3D showroom" title="Rotate every machine" text="Click and drag to spin, switch yarn colours or flip to real photographs." />
          <Showroom onQuote={onQuote} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="tablist" aria-label="Filter machines">
              {filters.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={16} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search machines…" aria-label="Search machines" />
            </label>
          </div>

          <motion.div layout className="grid-products">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={products.indexOf(p)} onQuote={onQuote} />
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <p className="empty">No machines match your search. Try another term, or <button className="btn-text" onClick={() => { setQ(''); setFilter('all') }}>clear filters</button>.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Common to the range" title="General working systems" center />
          <div className="systems">
            {workingSystems.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1} className="system">
                <span className="system-n">0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
