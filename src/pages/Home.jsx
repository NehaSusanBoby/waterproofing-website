import usePageTitle from '../hooks/usePageTitle.js'
import { marqueeItems } from '../data/site.js'
import Hero from '../components/sections/Hero.jsx'
import Story from '../components/sections/Story.jsx'
import Marquee from '../components/fx/Marquee.jsx'
import ServicesPreview from '../components/sections/ServicesPreview.jsx'
import Stats from '../components/sections/Stats.jsx'
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import HoldCta from '../components/sections/HoldCta.jsx'

export default function Home() {
  usePageTitle()

  return (
    <>
      <Hero />
      <Story />
      <Marquee items={marqueeItems} />
      <ServicesPreview />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <HoldCta />
    </>
  )
}
