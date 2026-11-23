import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduceMotion, onIntro, setLenis } from '../lib/anim.js'

// Buttery smooth scrolling (Lenis) kept in sync with GSAP ScrollTrigger.
export default function useSmoothScroll() {
  useEffect(() => {
    if (reduceMotion) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // no scrolling while the preloader is on screen
    lenis.stop()
    const off = onIntro(() => lenis.start())

    return () => {
      off()
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
