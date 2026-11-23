import { site } from '../data/site.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>{site.name}</strong>
          <p>{site.tagline}</p>
        </div>
        <div>
          <p>{site.phone}</p>
          <p>{site.email}</p>
          <p>{site.address}</p>
        </div>
      </div>
      <p className="footer__copy">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}
