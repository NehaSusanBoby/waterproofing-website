import { services } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

export default function Services() {
  usePageTitle('Services')

  return (
    <>
      <PageHeader title="Our Services" subtitle="Waterproofing solutions for every part of your building." />
      <section className="section">
        <div className="container grid">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
