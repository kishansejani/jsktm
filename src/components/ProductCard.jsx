import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Move3d } from 'lucide-react'
import { SmartImg } from './ui.jsx'
import { Spot } from './fx.jsx'
import { Viewer3D, DepthViewer } from './Viewer3D.jsx'

export default function ProductCard({ product, index = 0, onQuote }) {
  return (
    <motion.article
      className="pcard-wrap"
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Spot tilt className="pcard">
        <div className={`pcard-top ${product.depth3d ? 'is-real' : ''}`}>
          <div className="pcard-stage" data-cursor>
            <div className="pcard-floor" aria-hidden="true" />
            {product.depth3d ? (
              <DepthViewer src={product.depth3d[0]} fallback="3D preview unavailable" />
            ) : (
              <Viewer3D kind={product.kind} heads={product.heads} color={index} hint={false} camera={[5.4, 3.2, 6.6]} fallback="3D preview unavailable" />
            )}
          </div>
          <span className="pcard-tag">{product.category}</span>
          <span className="pcard-3d">
            <Move3d size={14} /> {product.depth3d ? 'Real 3D' : 'Drag to rotate'}
          </span>
          <span className="pcard-num">0{index + 1}</span>
          {!product.depth3d && (
            <Link to={`/products/${product.slug}`} className="pcard-photo" aria-label={`${product.name} – real photo`}>
            <SmartImg src={product.images[0]} fallbackSrc={product.remoteImages?.[0]} alt={product.name} fallbackLabel="Photo" />
            <small>Real photo</small>
          </Link>
          )}
        </div>
        <div className="pcard-body">
          <h3>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p>{product.blurb}</p>
          <div className="pcard-foot">
            <Link to={`/products/${product.slug}`} className="link-arrow">
              View details <ArrowUpRight size={16} />
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={() => onQuote(product.name)}>
              Quote
            </button>
          </div>
        </div>
      </Spot>
    </motion.article>
  )
}
