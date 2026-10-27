import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, MessageCircle, Phone, Move3d, Image as ImageIcon } from 'lucide-react'
import { Viewer3D, DepthViewer } from '../components/Viewer3D.jsx'
import { SmartImg, Reveal, SectionHead, telHref, waHref } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products, company } from '../data/site.js'
import NotFound from './NotFound.jsx'

export default function ProductDetail({ onQuote }) {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState(product?.depth3d ? 'real' : '3d')
  useEffect(() => {
    setMode(product?.depth3d ? 'real' : '3d')
    setActive(0)
  }, [slug])
  if (!product) return <NotFound />

  const related = products.filter((p) => p.slug !== slug).slice(0, 3)
  const imgs = product.images.length ? product.images : [null]

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link to="/products" className="back">
            <ArrowLeft size={16} /> All machines
          </Link>
          <div className="detail-grid">
            <div className="gallery">
              <div className="seg seg-float" role="tablist" aria-label="View mode">
                {product.depth3d && (
                  <button role="tab" aria-selected={mode === 'real'} className={mode === 'real' ? 'on' : ''} onClick={() => setMode('real')}>
                    <Move3d size={15} /> Real 3D
                  </button>
                )}
                <button role="tab" aria-selected={mode === '3d'} className={mode === '3d' ? 'on' : ''} onClick={() => setMode('3d')}>
                  <Move3d size={15} /> {product.depth3d ? 'Model' : '3D view'}
                </button>
                <button role="tab" aria-selected={mode === 'photo'} className={mode === 'photo' ? 'on' : ''} onClick={() => setMode('photo')}>
                  <ImageIcon size={15} /> Photos
                </button>
              </div>
              <div className="gallery-main">
                {mode === 'real' && product.depth3d ? (
                  <>
                    <DepthViewer key={product.depth3d[active] || product.depth3d[0]} src={product.depth3d[active] || product.depth3d[0]} strength={0.1} />
                    <span className="drag-hint">Move or drag to look around</span>
                  </>
                ) : mode === '3d' ? (
                  <>
                    <Viewer3D kind={product.kind} heads={product.heads} />
                  </>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <SmartImg src={imgs[active]} fallbackSrc={product.remoteImages?.[active]} alt={product.name} fallbackLabel={product.onRequest ? 'Specifications on request' : ''} />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
              {mode === 'real' && product.depth3d.length > 1 && (
                <div className="thumbs">
                  {product.depth3d.map((src, i) => (
                    <button key={src} className={`thumb-cut ${i === active ? 'on' : ''}`} onClick={() => setActive(i)} aria-label={`3D view ${i + 1}`}>
                      <img src={`${src}.webp`} alt="" />
                    </button>
                  ))}
                </div>
              )}
              {mode === 'photo' && imgs.length > 1 && (
                <div className="thumbs">
                  {imgs.map((src, i) => (
                    <button key={i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}>
                      <SmartImg src={src} fallbackSrc={product.remoteImages?.[i]} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail-info">
              <span className="eyebrow">{product.category}</span>
              <h1>{product.name}</h1>
              <p className="lead">{product.blurb}</p>
              <div className="tags">
                {product.bestFor.map((b) => (
                  <span key={b}>{b}</span>
                ))}
              </div>
              <div className="detail-cta">
                <button className="btn btn-accent btn-lg" onClick={() => onQuote(product.name)}>
                  Request a quote <ArrowUpRight size={18} />
                </button>
                <a className="btn btn-outline-dark btn-lg" href={waHref(`Hello, I'd like details on the ${product.name}.`)} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
              <a className="call-line" href={telHref(company.phones[0])}>
                <Phone size={15} /> Prefer to talk? {company.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Specifications" title="Key features" />
          <ul className="spec-list">
            {product.features.map((f, i) => (
              <Reveal as="li" key={f} delay={(i % 4) * 0.06}>
                <Check size={18} /> {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Keep exploring" title="Other machines in the range" />
          <div className="grid-products">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={products.indexOf(p)} onQuote={onQuote} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
