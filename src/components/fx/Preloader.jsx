import { useEffect, useRef, useState } from 'react'
import { gsap, reduceMotion, finishIntro } from '../../lib/anim.js'
import { site } from '../../data/site.js'

// First-load screen: a percentage counter while water rises to fill the screen,
// then the whole panel lifts away to reveal the page.
export default function Preloader() {
  const [gone, setGone] = useState(reduceMotion)
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (reduceMotion) {
      finishIntro()
      return
    }
    const html = document.documentElement
    html.classList.add('is-loading')
    let cancelled = false
    const state = { p: 0 }

    const render = () => {
      numRef.current.textContent = String(Math.round(state.p)).padStart(2, '0')
      fillRef.current.style.transform = `translateY(${100 - state.p}%)`
    }

    const ctx = gsap.context(() => {})
    const first = new Promise((resolve) => {
      ctx.add(() => gsap.to(state, { p: 88, duration: 1.6, ease: 'power2.out', onUpdate: render, onComplete: resolve }))
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }))
    const ready = Promise.race([Promise.all([fonts, loaded]), new Promise((r) => setTimeout(r, 6000))])

    Promise.all([first, ready]).then(() => {
      if (cancelled) return
      ctx.add(() => {
        gsap
          .timeline()
          .to(state, { p: 100, duration: 0.5, ease: 'power1.inOut', onUpdate: render })
          .add(() => finishIntro(), '+=0.15')
          .to(rootRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power4.inOut' }, '<')
          .add(() => {
            html.classList.remove('is-loading')
            setGone(true)
          })
      })
    })

    return () => {
      cancelled = true
      ctx.revert()
      html.classList.remove('is-loading')
    }
  }, [])

  if (gone) return null

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__fill" ref={fillRef}>
        <svg className="preloader__wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0 30 Q180 0 360 30 T720 30 T1080 30 T1440 30 T1800 30 T2160 30 T2520 30 T2880 30 V60 H0 Z" />
        </svg>
      </div>
      <div className="preloader__content">
        <span className="preloader__brand">{site.name}</span>
        <span className="preloader__count">
          <span ref={numRef}>00</span>%
        </span>
        <span className="preloader__hint">Sealing every drop…</span>
      </div>
    </div>
  )
}
