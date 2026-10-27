import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ShieldCheck, Gauge, Wrench, Cpu, Check, MousePointer2, Move3d, Phone, Mail, MessageCircle, Users, Factory, CalendarCheck } from 'lucide-react'
import { DepthViewer } from '../components/Viewer3D.jsx'
import ProductCard from '../components/ProductCard.jsx'
import MachineFinder from '../components/MachineFinder.jsx'
import Showroom from '../components/Showroom.jsx'
import Anatomy from '../components/Anatomy.jsx'
import FAQ from '../components/FAQ.jsx'
import { Reveal, Counter, SectionHead, Marquee, SmartImg, telHref, waHref } from '../components/ui.jsx'
import { SplitText, Spot, Magnetic } from '../components/fx.jsx'
import { products, stats, process, assets, company } from '../data/site.js'

const features = [
  { icon: Cpu, title: 'Smart per-head control', text: 'AC co-axial motor, optical sensor and length counting on every spindle.' },
  { icon: Gauge, title: 'Package perfection', text: 'Hard-anodized grooved drum and programmable ribbon braking.' },
  { icon: Wrench, title: 'Low maintenance', text: 'New-generation technology, simple to run, graded-material parts.' },
  { icon: ShieldCheck, title: 'Inspected at every stage', text: 'Engineered solutions, stage-wise inspection, after-sales support.' },
]

export default function Home({ onQuote }) {
  const heroRef = useRef(null)
  const bandRef = useRef(null)
  const lineRef = useRef(null)
  const { scrollYProgress: band } = useScroll({ target: bandRef, offset: ['start end', 'end start'] })
  const bandY = useTransform(band, [0, 1], ['-14%', '14%'])
  const bandScale = useTransform(band, [0, 0.5, 1], [1.15, 1.05, 1.15])
  const { scrollYProgress: line } = useScroll({ target: lineRef, offset: ['start 75%', 'end 65%'] })

  const onHeroMove = (e) => {
    const r = heroRef.current.getBoundingClientRect()
    heroRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    heroRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroRef} onPointerMove={onHeroMove}>
        <div className="hero-bg" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
          <span className="grid-lines" />
          <span className="hero-spot" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.span className="pill" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <i /> Yarn winding machinery &amp; spares
            </motion.span>
            <SplitText as="h1" text="Let’s convert your idea into *reality.*" delay={0.15} />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
              Cost-effective, technologically advanced post-spinning winding machines — shaping yarns for being part of your growth.
            </motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Magnetic>
                <button className="btn btn-accent btn-lg" onClick={() => onQuote()}>
                  Get a quote <ArrowUpRight size={18} />
                </button>
              </Magnetic>
              <Magnetic>
                <a href="#showroom" className="btn btn-outline btn-lg">
                  <Move3d size={18} /> Explore in 3D
                </a>
              </Magnetic>
            </motion.div>
            <motion.ul className="hero-points" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
              <li><Check size={16} /> Made in Gujarat</li>
              <li><Check size={16} /> ISO &amp; MSME certified</li>
              <li><Check size={16} /> After-sales support</li>
            </motion.ul>
          </div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <DepthViewer src="/3d/hero" strength={0.1} fallback="3D view is not supported on this device." />
            <span className="drag-hint hint-hero"><MousePointer2 size={14} /> Move or drag to look around</span>
            <div className="float-chip fc-a">
              <strong><Counter value={752} suffix="+" /></strong>
              <span>Happy customers</span>
            </div>
            <div className="float-chip fc-b">
              <strong><Counter value={362} suffix="+" /></strong>
              <span>Installations</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee items={['Assembly winding', 'Cone winding', 'Soft dye packages', 'Jumbo packages', 'Pre-application', 'Winding spares']} />

      {/* 3D SHOWROOM */}
      <section className="section" id="showroom">
        <div className="container">
          <SectionHead
            eyebrow="3D showroom"
            title="Turn our machines around in your *hands*"
            text="Pick a machine, spin it, zoom in and change the yarn colour — then switch to real photographs."
          />
          <Reveal>
            <Showroom onQuote={onQuote} />
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="The range" title="Winding machines built around your *yarn*" text="From assembly and cone winding to soft-dye packages — one manufacturer, one standard of engineering." />
          <div className="grid-products">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} onQuote={onQuote} />
            ))}
          </div>
          <Reveal className="center-cta">
            <Magnetic>
              <Link to="/products" className="btn btn-outline">
                Explore all machines <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* BENTO */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why JSK" title="Technology that stays *simple* to run" text="We keep updating our methods to meet industry demands — with customers central to every product's life cycle." />
          <div className="bento">
            <Reveal className="bento-cell b-photo">
              <Spot className="tile tile-photo">
                <SmartImg src={assets.vab} alt="Engineering drawings and measuring tools" />
                <div className="tile-over">
                  <span className="tag">Engineered</span>
                  <h3>Inspected at every stage of production</h3>
                  <p>Innovation, engineered solutions and after-sales support make us a trusted, preferred machinery manufacturer.</p>
                </div>
              </Spot>
            </Reveal>
            {[
              { s: stats[0], Icon: Users, note: 'Textile units served', d: 'M0 34 L25 28 L50 30 L75 18 L100 20 L125 8 L150 4' },
              { s: stats[1], Icon: Factory, note: 'Machines commissioned', d: 'M0 36 L25 32 L50 24 L75 26 L100 14 L125 10 L150 3' },
            ].map(({ s, Icon, note, d }, i) => (
              <Reveal key={s.label} delay={0.08 * (i + 1)} className={`bento-cell b-stat b-stat-${i}`}>
                <Spot className="tile kpi">
                  <div className="kpi-top">
                    <span className="kpi-ico"><Icon size={20} /></span>
                    <span className="kpi-note">{note}</span>
                  </div>
                  <strong className="kpi-num">
                    <Counter value={s.value} suffix={s.suffix} />
                  </strong>
                  <span className="kpi-label">{s.label}</span>
                  <svg className="kpi-spark" viewBox="0 0 150 40" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id={`kg${i}`} x1="0" x2="1"><stop offset="0" stopColor="#2f6bff" /><stop offset="1" stopColor="#38d6c4" /></linearGradient>
                    </defs>
                    <path d={d} fill="none" stroke={`url(#kg${i})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </Spot>
              </Reveal>
            ))}
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.06 * i} className="bento-cell b-feat">
                <Spot tilt className="tile tile-feat">
                  <span className="ico"><f.icon size={22} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </Spot>
              </Reveal>
            ))}
            <Reveal className="bento-cell b-certs">
              <Spot className="tile tile-certs">
                <h3>Empowered by</h3>
                <div className="cert-row">
                  {assets.certs.map((c) => (
                    <span className="cert-chip" key={c.name}>
                      <SmartImg src={c.src} alt={c.name} fallbackLabel={c.name} />
                    </span>
                  ))}
                </div>
              </Spot>
            </Reveal>
            <Reveal delay={0.1} className="bento-cell b-since">
              <Spot className="tile kpi kpi-since">
                <div className="kpi-top">
                  <span className="kpi-ico"><CalendarCheck size={20} /></span>
                  <span className="kpi-note">Established</span>
                </div>
                <strong className="kpi-num">
                  <Counter value={company.since} plain />
                </strong>
                <span className="kpi-label">{stats[2].value}+ domestic markets served</span>
              </Spot>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARALLAX BAND */}
      <section className="band dark-zone" ref={bandRef}>
        <motion.div className="band-img" style={{ y: bandY, scale: bandScale }}>
          <SmartImg src={assets.thread} alt="Rows of coloured yarn cones" />
        </motion.div>
        <div className="band-shade" />
        <div className="container band-in">
          <Reveal>
            <span className="eyebrow">Our promise</span>
          </Reveal>
          <SplitText as="h2" inView text="Shaping yarns for being part of your *growth.*" />
        </div>
      </section>

      {/* ANATOMY */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Anatomy of a winder" title="Scroll to look *inside* a winding head" text="Every head carries its own motor, sensor and counter — here is how the parts work together." />
          <Anatomy />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="From your idea to a *running* machine" center />
          <div className="process-wrap" ref={lineRef}>
            <div className="process-line" aria-hidden="true">
              <motion.i style={{ scaleX: line }} />
            </div>
            <ol className="process">
              {process.map((p, i) => (
                <Reveal as="li" key={p.n} delay={i * 0.12}>
                  <span>{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section className="section finder-section">
        <div className="container split split-center">
          <Reveal>
            <span className="eyebrow">Machine finder</span>
            <h2>Not sure which winder fits?</h2>
            <p className="on-dark-p">Answer one question and we’ll point you to the right machine in our range.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <MachineFinder onQuote={onQuote} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container split faq-split">
          <div className="faq-side">
            <SectionHead stack eyebrow="FAQ" title="Questions, *answered*" text="Can’t find what you need? Call or message us — we’ll respond personally." />
            <Reveal delay={0.1}>
              <Spot className="help-card">
                <h3>Still have a question?</h3>
                <p>Talk to our team directly — we reply personally.</p>
                <a className="help-line" href={telHref(company.phones[0])}>
                  <Phone size={18} /> {company.phones[0]}
                </a>
                <a className="help-line" href={`mailto:${company.email}`}>
                  <Mail size={18} /> {company.email}
                </a>
                <div className="help-actions">
                  <button className="btn btn-accent" onClick={() => onQuote()}>
                    Get a quote <ArrowUpRight size={16} />
                  </button>
                  <a className="btn btn-outline" href={waHref('Hello JSK Tex Mech!')} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </Spot>
            </Reveal>
          </div>
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-wrap">
        <div className="container">
          <Reveal className="cta-card">
            <div className="cta-deco" aria-hidden="true">
              {['#0fb5ab', '#e84030', '#902888', '#2078b8', '#f09838', '#38b0d8'].map((c, i) => (
                <span key={c} className={`spool sp-${i}`} style={{ '--c': c }} />
              ))}
            </div>
            <div className="cta-in">
              <div className="cta-copy">
                <span className="eyebrow">Let’s talk</span>
                <h2>Ready to wind better?</h2>
                <p>Tell us your yarn and package requirement — we’ll respond with a tailored quotation.</p>
                <ul className="cta-points">
                  <li><Check size={16} /> Free quotation</li>
                  <li><Check size={16} /> Built to your yarn</li>
                  <li><Check size={16} /> After-sales support</li>
                </ul>
              </div>
              <div className="cta-side">
                <div className="cta-actions">
                  <Magnetic>
                    <button className="btn btn-white btn-lg" onClick={() => onQuote()}>
                      Request a quote <ArrowUpRight size={18} />
                    </button>
                  </Magnetic>
                  <Link to="/contact" className="btn btn-outline-light btn-lg">
                    Contact us
                  </Link>
                </div>
                <a className="cta-call" href={telHref(company.phones[0])}>
                  <span><Phone size={18} /></span>
                  <div>
                    <small>Call us directly</small>
                    <b>{company.phones[0]}</b>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
