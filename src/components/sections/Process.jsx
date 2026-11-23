import { processSteps } from '../../data/site.js'
import SectionHeading from '../SectionHeading.jsx'

export default function Process() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="How it works" title="Our Simple 4-Step Process" />
        <ol className="process">
          {processSteps.map((step, i) => (
            <li key={step.title} className="process__step">
              <span className="process__num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
