import { Link } from 'react-router-dom'

// Service card: a spotlight follows the cursor, and water fills the card on hover.
const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function ServiceCard({ id, icon, title, description }) {
  return (
    <Link to={`/services/${id}`} className="card" onPointerMove={track}>
      <span className="card__icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card__link">Learn more <span aria-hidden="true">→</span></span>
    </Link>
  )
}
