import { services } from '../data/site.js'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Services() {
  return (
    <section className="section container">
      <h1>Our Services</h1>
      <div className="grid">
        {services.map((s) => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>
    </section>
  )
}
