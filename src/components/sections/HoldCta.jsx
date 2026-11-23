import { useNavigate } from 'react-router-dom'
import { site } from '../../data/site.js'
import HoldButton from '../fx/HoldButton.jsx'
import SplitText from '../fx/SplitText.jsx'
import Waves from '../fx/Waves.jsx'

export default function HoldCta() {
  const navigate = useNavigate()

  return (
    <section className="hold-cta">
      <Waves color="#ffffff" flip />
      <div className="container hold-cta__inner">
        <span className="eyebrow eyebrow--light" data-reveal>Ready when you are</span>
        <SplitText text="Seeing a leak or *damp patch?*" />
        <p data-reveal>Book a free inspection — no obligation, clear quote.</p>
        <div data-reveal>
          <HoldButton
            label="Hold to book a free inspection"
            doneLabel="Great! Taking you there…"
            onComplete={() => navigate('/contact')}
          />
          <p className="hold-cta__hint">Press and hold, or hold Space</p>
        </div>
        <p className="hold-cta__alt" data-reveal>
          or call <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
        </p>
      </div>
    </section>
  )
}
