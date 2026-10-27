import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, MessageCircle, CheckCircle2 } from 'lucide-react'
import { products, company } from '../data/site.js'
import { waHref } from './ui.jsx'

const empty = { name: '', phone: '', email: '', product: '', message: '' }

export function buildMessage(f) {
  return [
    `Enquiry for: ${f.product || 'Yarn winding machinery'}`,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
    f.message ? `\nRequirement:\n${f.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name'
  if (!/^[+\d][\d\s-]{7,}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number'
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email'
  return e
}

export default function QuoteModal({ open, product, onClose }) {
  const [f, setF] = useState(empty)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setF({ ...empty, product })
      setErrors({})
      setDone(false)
    }
  }, [open, product])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const subject = encodeURIComponent(`Quote request — ${f.product || 'Winding machinery'}`)
    const body = encodeURIComponent(buildMessage(f))
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
    setDone(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="icon-btn modal-x" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
            {done ? (
              <div className="modal-done">
                <CheckCircle2 size={48} />
                <h3>Your email app should open now</h3>
                <p>Send the pre-filled message and our team will get back to you. Prefer WhatsApp?</p>
                <a className="btn btn-accent" href={waHref(buildMessage(f))} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> Send on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <span className="eyebrow">Free quotation</span>
                <h3>Let’s convert your idea into reality</h3>
                <div className="grid-2">
                  <label>
                    Name *
                    <input value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
                    {errors.name && <em>{errors.name}</em>}
                  </label>
                  <label>
                    Phone *
                    <input value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
                    {errors.phone && <em>{errors.phone}</em>}
                  </label>
                </div>
                <label>
                  Email
                  <input value={f.email} onChange={set('email')} type="email" autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <em>{errors.email}</em>}
                </label>
                <label>
                  Machine
                  <select value={f.product} onChange={set('product')}>
                    <option value="">Not sure yet</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Your requirement
                  <textarea rows={3} value={f.message} onChange={set('message')} placeholder="Yarn type, count range, package type, number of heads…" />
                </label>
                <button className="btn btn-accent btn-block" type="submit">
                  Send enquiry <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
