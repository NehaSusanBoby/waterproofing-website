import { Link } from 'react-router-dom'

export default function ServiceCard({ id, icon, title, description }) {
  return (
    <article className="card">
      <span className="card__icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/services/${id}`} className="card__link">Learn more →</Link>
    </article>
  )
}
