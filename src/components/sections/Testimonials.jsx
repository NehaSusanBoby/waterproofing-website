import { testimonials } from '../../data/site.js'
import SectionHeading from '../SectionHeading.jsx'

export default function Testimonials() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" />
        <div className="grid">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="testimonial">
              <p>“{t.text}”</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
