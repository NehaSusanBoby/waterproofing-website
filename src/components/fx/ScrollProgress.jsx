import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../../lib/anim.js'

// Thin water-coloured bar across the top showing how far down the page you are.
export default function ScrollProgress() {
  const ref = useRef(null)

  useGSAP(() => {
    if (reduceMotion) return
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    )
  })

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}
