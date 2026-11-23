import { site, stats } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

export default function About() {
  usePageTitle('About Us')

  return (
    <>
      <PageHeader title={`About ${site.name}`} subtitle={site.tagline} />
      <section className="section">
        <div className="container detail" data-reveal="stagger">
          <div className="detail__main">
            <h2>Our Story</h2>
            <p>
              Placeholder — tell visitors how the company started, who leads it, and
              what makes your approach different.
            </p>
            <h2>Our Mission</h2>
            <p>Placeholder — a short statement of what you promise every customer.</p>
          </div>
          <aside className="detail__aside">
            <ul className="stat-list">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <WhyChooseUs />
      <CtaBanner />
    </>
  )
}
