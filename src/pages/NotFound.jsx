import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <>
      <PageHeader title="Page not found" subtitle="The page you are looking for does not exist." />
      <section className="section">
        <div className="container center">
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </section>
    </>
  )
}
