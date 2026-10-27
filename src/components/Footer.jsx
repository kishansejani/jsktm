import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { Logo, SmartImg, telHref } from './ui.jsx'
import { company, navLinks, products, assets } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Cost-effective, technologically advanced post-spinning winding machinery — engineered to increase
            productivity and streamline yarn winding.
          </p>
          <div className="socials">
            <a href={company.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href={company.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={company.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Machines</h4>
          <ul>
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`}>{p.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Reach us</h4>
          <ul className="contact-list">
            {company.phones.map((p) => (
              <li key={p}>
                <Phone size={15} /> <a href={telHref(p)}>{p}</a>
              </li>
            ))}
            <li>
              <Mail size={15} /> <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin size={15} /> <span>{company.addresses[0].text}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container certs">
        <span>Empowered by</span>
        {assets.certs.map((c) => (
          <SmartImg key={c.name} src={c.src} alt={c.name} className="cert" fallbackLabel={c.name} />
        ))}
      </div>

      <div className="footer-mark" aria-hidden="true">JSK TEX MECH</div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {company.name} Industries. All rights reserved.</span>
        <span>Shaping yarns for being part of your growth.</span>
      </div>
    </footer>
  )
}
