import { faqs } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

export default function Faq() {
  usePageTitle('FAQ')

  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <section className="section">
        <div className="container faq">
          {faqs.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBanner title="Still have questions?" text="Call us or send a message — we are happy to help." />
    </>
  )
}
