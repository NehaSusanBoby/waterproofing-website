import { Link } from 'react-router-dom'
import { site, stats } from '../../data/site.js'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>{site.tagline}</h1>
        <p>{site.intro}</p>
        <div className="hero__actions">
          <Link to="/contact" className="btn">Book a Free Inspection</Link>
          <Link to="/services" className="btn btn--outline">Our Services</Link>
        </div>
        <ul className="hero__stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
