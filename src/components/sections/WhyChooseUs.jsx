import { features } from '../../data/site.js'
import SectionHeading from '../SectionHeading.jsx'

export default function WhyChooseUs() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Why choose us" title="Done right, the first time" />
        <div className="grid grid--4">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <span className="feature__check" aria-hidden="true">✓</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
