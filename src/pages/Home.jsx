import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ShieldCheck, Gauge, Wrench, Cpu, Check, MousePointer2 } from 'lucide-react'
import ThreadHero from '../components/ThreadHero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import MachineFinder from '../components/MachineFinder.jsx'
import Showroom from '../components/Showroom.jsx'
import Anatomy from '../components/Anatomy.jsx'
import FAQ from '../components/FAQ.jsx'
import { Reveal, Counter, SectionHead, Marquee, SmartImg } from '../components/ui.jsx'
import { products, stats, process, assets, whyUs, company } from '../data/site.js'

const features = [
  { icon: Cpu, title: 'Smart per-head control', text: 'AC co-axial motor, optical yarn sensor and length counting on every spindle.' },
  { icon: Gauge, title: 'Package perfection', text: 'Hard-anodized grooved drum and programmable ribbon braking for consistent packages.' },
  { icon: Wrench, title: 'Low maintenance', text: 'New-generation technology with simplicity of use and graded-material components.' },
  { icon: ShieldCheck, title: 'Inspected at every stage', text: 'Engineered solutions, stage-wise inspection and dedicated after-sales support.' },
]

export default function Home({ onQuote }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="grid-lines" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.span className="pill" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <i /> Yarn winding machinery &amp; spares
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
              Let’s convert your idea into <em>reality.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}>
              Cost-effective, technologically advanced post-spinning winding machines — shaping yarns for being part of your growth.
            </motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <button className="btn btn-accent btn-lg" onClick={() => onQuote()}>
                Get a quote <ArrowUpRight size={18} />
              </button>
              <a href="#showroom" className="btn btn-outline-light btn-lg">
                Explore in 3D <ArrowRight size={18} />
              </a>
            </motion.div>
            <motion.ul className="hero-points" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <li><Check size={16} /> Made in Gujarat</li>
              <li><Check size={16} /> ISO &amp; MSME certified</li>
              <li><Check size={16} /> After-sales support</li>
            </motion.ul>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }}>
            <ThreadHero />
            <span className="drag-hint hint-hero"><MousePointer2 size={14} /> Drag to rotate</span>
          </motion.div>
        </div>

        <div className="container">
          <div className="stat-strip">
            {stats.map((s) => (
              <div key={s.label}>
                <strong>
                  <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={['Assembly winding', 'Cone winding', 'Soft dye packages', 'Jumbo packages', 'Pre-application winding', 'Winding spares']} />

      {/* 3D SHOWROOM */}
      <section className="section" id="showroom">
        <div className="container">
          <SectionHead
            eyebrow="3D showroom"
            title="Turn our machines around in your hands"
            text="Pick a machine, spin it, zoom in and change the yarn colour — then switch to real photographs."
          />
          <Reveal>
            <Showroom onQuote={onQuote} />
          </Reveal>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Anatomy of a winder" title="Scroll to look inside a winding head" text="Every head carries its own motor, sensor and counter — here is how the parts work together." />
          <Anatomy />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="The range"
            title="Winding machines built around your yarn"
            text="From assembly and cone winding to soft-dye packages — one manufacturer, one standard of engineering."
          />
          <div className="grid-products">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} onQuote={onQuote} />
            ))}
          </div>
          <Reveal className="center-cta">
            <Link to="/products" className="btn btn-outline-light">
              Explore all machines <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="section section-alt">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Why JSK"
              title="Technology that stays simple to run"
              text="We keep updating our methods to meet industry demands — with customers central to every product's life cycle."
            />
            <ul className="why-list">
              {whyUs.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 0.07}>
                  <Check size={18} /> {w}
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="feature">
                <f.icon size={26} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
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

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="From your idea to a running machine" center />
          <ol className="process">
            {process.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.1}>
                <span>{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section section-alt">
        <div className="container split split-center">
          <Reveal className="photo-frame">
            <SmartImg src={assets.thread} alt="Yarn on a winding machine" />
            <div className="photo-badge">
              <strong>Since {company.since}</strong>
              <span>Trusted winding partner</span>
            </div>
          </Reveal>
          <div>
            <SectionHead
              eyebrow="About us"
              title="Empowering customers while building better business"
              text="JSK Tex Mech is a yarn winding machinery and spares manufacturer serving the textile industry since 2012 — combining new-generation technology with simplicity of use and low maintenance."
            />
            <Reveal>
              <Link to="/about" className="btn btn-outline-light">
                Our story <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section className="certs-section">
        <div className="container">
          <SectionHead eyebrow="Recognition" title="Empowered by" center />
          <Reveal className="cert-row">
            {assets.certs.map((c) => (
              <span className="cert-chip" key={c.name}>
                <SmartImg src={c.src} alt={c.name} fallbackLabel={c.name} />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container split">
          <SectionHead eyebrow="FAQ" title="Questions, answered" text="Can’t find what you need? Call or message us — we’ll respond personally." />
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-in">
          <Reveal>
            <h2>Ready to wind better?</h2>
            <p>Tell us your yarn and package requirement — we’ll respond with a tailored quotation.</p>
          </Reveal>
          <Reveal delay={0.1} className="cta-actions">
            <button className="btn btn-white btn-lg" onClick={() => onQuote()}>
              Request a quote <ArrowUpRight size={18} />
            </button>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
