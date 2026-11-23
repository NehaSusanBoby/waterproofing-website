import RainCanvas from './fx/RainCanvas.jsx'
import SplitText from './fx/SplitText.jsx'
import Waves from './fx/Waves.jsx'

// Dark banner with light rain at the top of inner pages.
export default function PageHeader({ title, subtitle }) {
  return (
    <section className="page-header">
      <RainCanvas density={0.5} />
      <div className="container page-header__inner">
        <SplitText as="h1" intro text={title} />
        {subtitle && <p data-reveal>{subtitle}</p>}
      </div>
      <Waves color="#ffffff" />
    </section>
  )
}
