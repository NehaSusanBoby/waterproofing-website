import { Fragment, useRef } from 'react'
import { gsap, useGSAP, reduceMotion, onIntro } from '../../lib/anim.js'

// Headline that rises into view word by word.
// Wrap a word in *asterisks* to give it the water-gradient accent.
//   intro  → plays when the preloader finishes (use for the first heading on a page)
//   otherwise plays when scrolled into view
export default function SplitText({ as: Tag = 'h2', text, className = '', intro = false, delay = 0 }) {
  const ref = useRef(null)
  const words = text.split(' ')
  const plain = text.replace(/\*/g, '')

  useGSAP(
    (_, contextSafe) => {
      if (reduceMotion) return
      const targets = ref.current.querySelectorAll('.split__w')
      gsap.set(targets, { yPercent: 115 })
      const vars = { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.06, delay }

      if (intro) {
        return onIntro(contextSafe(() => gsap.to(targets, vars)))
      }
      gsap.to(targets, { ...vars, scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={plain}>
      {words.map((w, i) => {
        const accent = w.startsWith('*') && w.replace(/[.,!?]$/, '').endsWith('*')
        // the space must sit outside the clipped word box, or the browser collapses it
        return (
          <Fragment key={i}>
            <span className="split__l" aria-hidden="true">
              <span className={`split__w ${accent ? 'is-accent' : ''}`}>{w.replace(/\*/g, '')}</span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        )
      })}
    </Tag>
  )
}
