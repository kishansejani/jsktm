import { useState } from 'react'
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2, Facebook, Instagram, Youtube } from 'lucide-react'
import { PageHero, Reveal, telHref, waHref } from '../components/ui.jsx'
import { buildMessage, validate } from '../components/QuoteModal.jsx'
import { company, products } from '../data/site.js'
import { sendEnquiry } from '../lib/sendEnquiry.js'

const empty = { name: '', phone: '', email: '', product: '', message: '' }

export default function Contact() {
  const [f, setF] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSending(true)
    setFailed(false)
    try {
      await sendEnquiry(f, `Website enquiry — ${f.product || 'JSK Tex Mech'}`)
      setSent(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        crumbs={['Home', 'Contact']}
        title="Let’s talk winding."
        text="Share your yarn and package requirement — our team will get back with the right machine and a quotation."
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-cards">
            {company.phones.map((p) => (
              <a key={p} className="ccard" href={telHref(p)}>
                <Phone size={22} />
                <span>Call us</span>
                <b>{p}</b>
              </a>
            ))}
            <a className="ccard" href={`mailto:${company.email}`}>
              <Mail size={22} />
              <span>Email</span>
              <b>{company.email}</b>
            </a>
            <a className="ccard ccard-wa" href={waHref('Hello JSK Tex Mech!')} target="_blank" rel="noreferrer">
              <MessageCircle size={22} />
              <span>WhatsApp</span>
              <b>Chat with us</b>
            </a>
            {company.addresses.map((a) => (
              <div key={a.label} className="ccard">
                <MapPin size={22} />
                <span>{a.label}</span>
                <b>{a.text}</b>
              </div>
            ))}
            <div className="ccard-social">
              <a href={company.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={company.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={company.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="form-card">
            {sent ? (
              <div className="modal-done">
                <CheckCircle2 size={48} />
                <h3>Message sent — thank you!</h3>
                <p>Our team has received your enquiry and will respond shortly. Need it faster? Reach us instantly on WhatsApp.</p>
                <a className="btn btn-accent" href={waHref(buildMessage(f))} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> Send on WhatsApp
                </a>
                <button className="btn-text" onClick={() => { setSent(false); setF(empty) }}>Write another message</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2>Send us a message</h2>
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
                <div className="grid-2">
                  <label>
                    Email
                    <input value={f.email} onChange={set('email')} type="email" autoComplete="email" aria-invalid={!!errors.email} />
                    {errors.email && <em>{errors.email}</em>}
                  </label>
                  <label>
                    Machine of interest
                    <select value={f.product} onChange={set('product')}>
                      <option value="">Not sure yet</option>
                      {products.map((p) => (
                        <option key={p.slug} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Message
                  <textarea rows={5} value={f.message} onChange={set('message')} placeholder="Yarn type, count range, package type, number of heads…" />
                </label>
                {failed && (
                  <p className="form-error" role="alert">
                    Couldn’t send right now. Please try again, or <a href={`mailto:${company.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(buildMessage(f))}`}>email us</a> / <a href={waHref(buildMessage(f))} target="_blank" rel="noreferrer">WhatsApp us</a>.
                  </p>
                )}
                <button className="btn btn-accent btn-lg" type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'} <Send size={16} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="map-section">
        <iframe title="JSK Tex Mech location — Kathwada GIDC, Ahmedabad" src={company.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </section>
    </>
  )
}
