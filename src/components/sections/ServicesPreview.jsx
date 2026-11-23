import { Link } from 'react-router-dom'
import { services } from '../../data/site.js'
import ServiceCard from '../ServiceCard.jsx'
import SplitText from '../fx/SplitText.jsx'

export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow" data-reveal>What we do</span>
          <SplitText text="Complete protection, *top to bottom.*" />
          <p data-reveal>From the terrace to the foundation — one team for every leak, crack and damp patch.</p>
        </div>
        <div className="grid" data-reveal="stagger">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
        <div className="center mt" data-reveal>
          <Link to="/services" className="btn">View All Services</Link>
        </div>
      </div>
    </section>
  )
}
