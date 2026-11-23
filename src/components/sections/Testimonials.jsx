import { testimonials } from '../../data/site.js'
import SplitText from '../fx/SplitText.jsx'

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow" data-reveal>Testimonials</span>
          <SplitText text="Dry homes, *happy customers.*" />
        </div>
        <div className="grid" data-reveal="stagger">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="testimonial">
              <span className="testimonial__mark" aria-hidden="true">“</span>
              <p>{t.text}</p>
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
