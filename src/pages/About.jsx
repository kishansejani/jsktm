import { Link } from 'react-router-dom'
import { Spot } from '../components/fx.jsx'
import { Target, Check, ArrowRight } from 'lucide-react'
import { PageHero, Reveal, SectionHead, Counter, SmartImg } from '../components/ui.jsx'
import { pillars, vision, whyUs, stats, assets, company, process } from '../data/site.js'

export default function About({ onQuote }) {
  return (
    <>
      <PageHero
        eyebrow="About us"
        crumbs={['Home', 'About']}
        title="Your trusted winding partner."
        text="A yarn winding machinery and spares manufacturer, serving the textile industry since 2012."
      />

      <section className="section">
        <div className="container split split-center">
          <Reveal className="photo-stack">
            <Spot tilt className="photo-frame">
              <SmartImg src={assets.vab} alt="Engineering drawings and measuring tools" />
            </Spot>
            <Spot tilt className="photo-frame photo-2">
              <SmartImg src={assets.thread} alt="Coloured yarn cones" />
            </Spot>
          </Reveal>
          <div>
            <SectionHead
              eyebrow="Who we are"
              title="Customers sit at the centre of our product life cycle"
              text="We keep updating our methods to meet industry demands. Our new-generation machines combine technology with simplicity of use and low maintenance — grown from a local manufacturer into a supplier for global demand."
            />
            <ul className="why-list">
              {whyUs.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 0.07}>
                  <Check size={18} /> {w}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="What we stand for" title="Quality, trust and infrastructure" center />
          <div className="systems">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="system">
                <span className="system-n">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section vision">
        <div className="container vision-in">
          <Reveal>
            <Target size={40} />
            <span className="eyebrow light">Our vision</span>
            <blockquote>{vision}</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stat-strip stat-strip-light">
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

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Our process" title="How an idea becomes a machine" center />
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

      <section className="cta-band">
        <div className="container cta-in">
          <Reveal>
            <h2>Let’s build your next winding line.</h2>
            <p>{company.name} — shaping yarns for being part of your growth.</p>
          </Reveal>
          <Reveal delay={0.1} className="cta-actions">
            <button className="btn btn-dark btn-lg" onClick={() => onQuote()}>
              Get a quote
            </button>
            <Link to="/products" className="btn btn-outline-dark btn-lg">
              See machines <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
