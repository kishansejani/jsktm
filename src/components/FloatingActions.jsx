import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { waHref } from './ui.jsx'

export default function FloatingActions() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className="fab-wrap">
      <AnimatePresence>
        {show && (
          <motion.button
            className="fab fab-up"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        className="fab fab-wa"
        href={waHref('Hello JSK Tex Mech, I would like to know more about your winding machines.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  )
}
