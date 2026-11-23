import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section container">
      <h1>Page not found</h1>
      <Link to="/" className="btn">Back to Home</Link>
    </section>
  )
}
