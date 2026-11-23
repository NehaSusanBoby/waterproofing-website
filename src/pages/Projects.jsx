import { useState } from 'react'
import { projects, services } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

const filters = [{ id: 'all', title: 'All' }, ...services]

export default function Projects() {
  usePageTitle('Projects')
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHeader title="Our Projects" subtitle="A look at some of our recent work." />
      <section className="section">
        <div className="container">
          <div className="filters">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`filter ${active === f.id ? 'is-active' : ''}`}
                onClick={() => setActive(f.id)}
              >
                {f.title}
              </button>
            ))}
          </div>
          <div className="grid">
            {shown.map((p) => (
              <article key={p.id} className="project">
                {/* Replace with a real photo: <img src={...} alt={p.title} /> */}
                <div className="project__img">Photo coming soon</div>
                <div className="project__body">
                  <h3>{p.title}</h3>
                  <p>{p.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
