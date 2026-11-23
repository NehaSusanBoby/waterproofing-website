import { Link } from 'react-router-dom'
import { site, navLinks, services } from '../data/site.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <strong className="footer__brand">{site.name}</strong>
          <p>{site.tagline}</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.id}><Link to={`/services/${s.id}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <p className="footer__copy">© {year} {site.name}. All rights reserved.</p>
    </footer>
  )
}
