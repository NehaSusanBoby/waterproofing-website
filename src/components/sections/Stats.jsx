import { stats } from '../../data/site.js'
import Counter from '../fx/Counter.jsx'
import RainCanvas from '../fx/RainCanvas.jsx'

export default function Stats() {
  return (
    <section className="stats">
      <RainCanvas density={0.35} />
      <div className="container stats__grid" data-reveal="stagger">
        {stats.map((s) => (
          <div key={s.label} className="stats__item">
            <strong><Counter value={s.value} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
