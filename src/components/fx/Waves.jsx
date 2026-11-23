// Layered, endlessly rolling waves. Place at the bottom (or top, with `flip`) of a section.
// `color` is the colour of the section the waves flow into.
const PATH =
  'M0 40 Q180 0 360 40 T720 40 T1080 40 T1440 40 T1800 40 T2160 40 T2520 40 T2880 40 V120 H0 Z'

export default function Waves({ color = '#ffffff', flip = false, className = '' }) {
  return (
    <div className={`waves ${flip ? 'waves--flip' : ''} ${className}`} aria-hidden="true">
      {[0.25, 0.5, 1].map((opacity, i) => (
        <svg key={i} className={`waves__layer waves__layer--${i + 1}`} viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path d={PATH} fill={color} fillOpacity={opacity} />
        </svg>
      ))}
    </div>
  )
}
