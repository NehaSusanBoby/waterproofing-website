import { Link, useParams } from 'react-router-dom'
import { services } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'
import NotFound from './NotFound.jsx'

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = services.find((s) => s.id === serviceId)
  usePageTitle(service?.title ?? 'Service not found')

  if (!service) return <NotFound />

  const others = services.filter((s) => s.id !== service.id)

  return (
    <>
      <PageHeader title={service.title} subtitle={service.description} />
      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <h2>Overview</h2>
            <p>{service.details}</p>
            <h3>Benefits</h3>
            <ul className="checklist">
              {service.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn">Get a Free Quote</Link>
          </div>
          <aside className="detail__aside">
            <h3>Other Services</h3>
            <ul>
              {others.map((s) => (
                <li key={s.id}><Link to={`/services/${s.id}`}>{s.title}</Link></li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
