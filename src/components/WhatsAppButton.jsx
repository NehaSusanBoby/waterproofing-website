import { site } from '../data/site.js'

// Floating "chat with us" button, fixed to the bottom-right corner.
export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-btn"
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      💬
    </a>
  )
}
