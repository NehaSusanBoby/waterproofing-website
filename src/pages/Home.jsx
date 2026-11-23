import { Link } from 'react-router-dom'
import { site, services } from '../data/site.js'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{site.tagline}</h1>
          <p>
            Professional waterproofing for homes and commercial buildings — roofs,
            basements, bathrooms, walls and tanks.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="btn">Book a Free Inspection</Link>
            <Link to="/services" className="btn btn--outline">Our Services</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2>What We Do</h2>
        <div className="grid">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}
