import { features } from '../../data/site.js'
import SplitText from '../fx/SplitText.jsx'

export default function WhyChooseUs() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow" data-reveal>Why choose us</span>
          <SplitText text="Done right, *the first time.*" />
        </div>
        <div className="grid grid--4" data-reveal="stagger">
          {features.map((f, i) => (
            <div key={f.title} className="feature">
              <span className="feature__num">0{i + 1}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
