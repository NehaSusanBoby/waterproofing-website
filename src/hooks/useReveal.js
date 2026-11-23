import { gsap, useGSAP, reduceMotion } from '../lib/anim.js'

// Scroll-reveal for any element marked in the markup:
//   data-reveal           → the element fades/slides up when it enters the screen
//   data-reveal="stagger" → its children animate in one after another
// Re-runs on every route change (pass the pathname as `key`).
export default function useReveal(key) {
  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const targets = el.dataset.reveal === 'stagger' ? el.children : el
        gsap.from(targets, {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'transform', // hand control back to CSS hover effects
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { dependencies: [key], revertOnUpdate: true },
  )
}
