import { useState } from 'react'
import { site } from '../data/site.js'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to a backend or form service (e.g. Formspree, EmailJS, or your own API)
    setSent(true)
  }

  return (
    <section className="section container">
      <h1>Contact Us</h1>
      <p>Call {site.phone} or email {site.email}, or send us a message below.</p>
      {sent ? (
        <p className="notice">Thanks! We will get back to you shortly.</p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Your name" required />
          <input name="phone" type="tel" placeholder="Phone number" required />
          <input name="location" placeholder="Location" />
          <textarea name="message" rows="4" placeholder="Describe the leak or problem" />
          <button className="btn" type="submit">Request Inspection</button>
        </form>
      )}
    </section>
  )
}
