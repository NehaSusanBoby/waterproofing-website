import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from '../../lib/anim.js'

// Endless scrolling band of words that speeds up as you scroll.
export default function Marquee({ items }) {
  const trackRef = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    const loop = gsap.to(trackRef.current, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5)
        gsap.to(loop, { timeScale: boost * self.direction, duration: 0.2, overwrite: true })
        gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2, overwrite: false })
      },
    })
    return () => st.kill()
  })

  const row = items.map((item, i) => (
    <span key={i} className={`marquee__item ${i % 2 ? 'is-outline' : ''}`}>
      {item}
      <span className="marquee__drop" aria-hidden="true">💧</span>
    </span>
  ))

  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <div className="marquee__track" ref={trackRef} aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  )
}
