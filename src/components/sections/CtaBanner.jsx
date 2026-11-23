import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'

export default function CtaBanner({
  title = 'Seeing a leak or damp patch?',
  text = 'Book a free inspection and get a clear, no-obligation quote.',
}) {
  return (
    <section className="cta">
      <div className="container cta__inner" data-reveal>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn--light">Book Inspection</Link>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn--ghost">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
