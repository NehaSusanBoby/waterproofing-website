import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../../lib/anim.js'

// Counts up to a value like "500+" or "100%" when scrolled into view.
export default function Counter({ value }) {
  const ref = useRef(null)
  const match = String(value).match(/^(\D*)(\d+)(.*)$/)

  useGSAP(() => {
    if (!match || reduceMotion) return
    const [, prefix, num, suffix] = match
    const state = { n: 0 }
    ref.current.textContent = `${prefix}0${suffix}`
    gsap.to(state, {
      n: Number(num),
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      onUpdate: () => {
        ref.current.textContent = `${prefix}${Math.round(state.n)}${suffix}`
      },
    })
  })

  return <span ref={ref}>{value}</span>
}
