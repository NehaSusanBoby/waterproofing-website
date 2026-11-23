import { site } from '../data/site.js'

export default function About() {
  return (
    <section className="section container">
      <h1>About {site.name}</h1>
      <p>
        Placeholder — add your company story, years of experience, certifications
        and warranty details here.
      </p>
    </section>
  )
}
