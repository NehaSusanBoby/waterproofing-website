import usePageTitle from '../hooks/usePageTitle.js'
import Hero from '../components/sections/Hero.jsx'
import ServicesPreview from '../components/sections/ServicesPreview.jsx'
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx'
import Process from '../components/sections/Process.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import CtaBanner from '../components/sections/CtaBanner.jsx'

export default function Home() {
  usePageTitle()

  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
