import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Move3d } from 'lucide-react'
import { SmartImg } from './ui.jsx'

export default function ProductCard({ product, index = 0, onQuote }) {
  return (
    <motion.article
      className="pcard"
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
    >
      <Link to={`/products/${product.slug}`} className="pcard-media" aria-label={product.name}>
        <SmartImg src={product.images[0]} alt={product.name} fallbackLabel={product.onRequest ? 'Specs on request' : ''} />
        <span className="pcard-tag">{product.category}</span>
        <span className="pcard-num">0{index + 1}</span>
        <span className="pcard-3d"><Move3d size={14} /> 3D</span>
      </Link>
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
    </motion.article>
  )
}
