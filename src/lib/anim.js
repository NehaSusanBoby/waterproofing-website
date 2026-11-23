// Shared animation setup: GSAP + ScrollTrigger, the smooth-scroll instance,
// and an "intro" gate so page animations wait until the preloader has finished.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---- intro gate --------------------------------------------------------
let introDone = false
const introWaiters = []

/** Run fn once the preloader has finished (immediately if it already has). Returns an unsubscribe. */
export function onIntro(fn) {
  if (introDone) {
    fn()
    return () => {}
  }
  introWaiters.push(fn)
  return () => {
    const i = introWaiters.indexOf(fn)
    if (i > -1) introWaiters.splice(i, 1)
  }
}

export function finishIntro() {
  if (introDone) return
  introDone = true
  introWaiters.splice(0).forEach((fn) => fn())
}

// ---- smooth scroll instance (set by useSmoothScroll) ------------------
let lenisInstance = null
export const getLenis = () => lenisInstance
export const setLenis = (l) => {
  lenisInstance = l
}

export { gsap, ScrollTrigger, useGSAP }
