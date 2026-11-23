import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import Preloader from './fx/Preloader.jsx'
import ScrollProgress from './fx/ScrollProgress.jsx'
import useSmoothScroll from '../hooks/useSmoothScroll.js'
import useReveal from '../hooks/useReveal.js'
import { ScrollTrigger } from '../lib/anim.js'

export default function Layout() {
  const { pathname } = useLocation()
  useSmoothScroll()
  useReveal(pathname)

  // recalculate scroll positions once the new page (and its fonts) have settled
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <>
      <Preloader />
      <ScrollToTop />
      <ScrollProgress key={pathname} />
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
