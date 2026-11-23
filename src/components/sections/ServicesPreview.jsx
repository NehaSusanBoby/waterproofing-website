import { Link } from 'react-router-dom'
import { services } from '../../data/site.js'
import ServiceCard from '../ServiceCard.jsx'
import SectionHeading from '../SectionHeading.jsx'

export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="Waterproofing Solutions"
          text="Complete protection for every part of your building."
        />
        <div className="grid">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
        <div className="center mt">
          <Link to="/services" className="btn">View All Services</Link>
        </div>
      </div>
    </section>
  )
}
