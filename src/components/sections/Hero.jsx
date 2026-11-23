import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, reduceMotion, onIntro } from '../../lib/anim.js'
import { site } from '../../data/site.js'
import RainCanvas from '../fx/RainCanvas.jsx'
import SplitText from '../fx/SplitText.jsx'
import Waves from '../fx/Waves.jsx'

const checks = ['Terrace sealed', 'Walls coated', 'Bathroom treated', 'Tank lined']

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      gsap.set(q('.hero__fade'), { autoAlpha: 0, y: 30 })
      gsap.set(q('.report'), { autoAlpha: 0, y: 40, rotate: 3 })
      gsap.set(q('.report__check'), { autoAlpha: 0, x: -12 })

      const intro = contextSafe(() => {
        const meter = { v: 82 }
        const num = q('.report__num')[0]
        gsap
          .timeline({ delay: 0.5 })
          .to(q('.hero__fade'), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
          .to(q('.report'), { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2, ease: 'power3.out' }, '<0.2')
          .to(meter, {
            v: 4,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => (num.textContent = `${Math.round(meter.v)}%`),
          }, '<0.4')
          .to(q('.report__check'), { autoAlpha: 1, x: 0, stagger: 0.4, duration: 0.5 }, '<0.3')
      })

      // parallax: the content drifts up and fades as you scroll past the hero
      gsap.to(q('.hero__content'), {
        yPercent: -25,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('.report'), {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      return onIntro(intro)
    },
    { scope: root },
  )

  return (
    <section className="hero" ref={root}>
      <RainCanvas shield />
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow eyebrow--light hero__fade">Waterproofing experts · Kothamangalam</span>
          <SplitText as="h1" intro delay={0.3} text="Keep every drop *outside* where it belongs." />
          <p className="hero__lead hero__fade">{site.intro}</p>
          <div className="hero__actions hero__fade">
            <Link to="/contact" className="btn btn--glow">Book a Free Inspection</Link>
            <Link to="/services" className="btn btn--ghost">Explore Services</Link>
          </div>
        </div>

        <aside className="report" aria-label="Example site report">
          <div className="report__head">
            <span>Site report</span>
            <em>Illustrative</em>
          </div>
          <span className="report__label">Moisture level</span>
          <span className="report__num">4%</span>
          <ul>
            {checks.map((c) => (
              <li key={c} className="report__check">
                <span aria-hidden="true">✓</span> {c}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <a href="#story" className="hero__cue hero__fade">
        <span>Scroll to explore</span>
        <i aria-hidden="true" />
      </a>
      <Waves color="#ffffff" />
    </section>
  )
}
