import { useState } from 'react'
import { site, services } from '../data/site.js'
import usePageTitle from '../hooks/usePageTitle.js'
import PageHeader from '../components/PageHeader.jsx'

export default function Contact() {
  usePageTitle('Contact')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to a backend or form service (e.g. Formspree, EmailJS, or your own API)
    setSent(true)
  }

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Book a free inspection or ask us anything." />
      <section className="section">
        <div className="container contact" data-reveal="stagger">
          <div className="contact__info">
            <h2>Get in touch</h2>
            <ul>
              <li><strong>Phone:</strong> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li><strong>Contact person:</strong> {site.owner}</li>
              {site.email && (
                <li><strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></li>
              )}
              <li><strong>Address:</strong> {site.address}</li>
              <li><strong>Hours:</strong> {site.hours}</li>
            </ul>
            {/* TODO: embed a Google Map of your location here */}
          </div>

          {sent ? (
            <p className="notice">Thanks! We will get back to you shortly.</p>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Your name" required />
              <input name="phone" type="tel" placeholder="Phone number" required />
              <input name="location" placeholder="Location" />
              <select name="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
                <option value="other">Not sure / Other</option>
              </select>
              <textarea name="message" rows="4" placeholder="Describe the leak or problem" />
              <button className="btn" type="submit">Request Inspection</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
