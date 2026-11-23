import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../lib/anim.js'

// Jumps to the top of the page on every route change.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
