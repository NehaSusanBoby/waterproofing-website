import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../../lib/anim.js'
import { storySteps } from '../../data/site.js'

// Pinned scroll story. While the section is pinned, scrolling plays a timeline on a
// house cross-section: rain and leaks → inspection scan → coating applied → shield up.
// Without motion (reduced-motion users) the markup shows the finished, protected state.

const STAINS = [
  { cx: 320, cy: 222, rx: 54, ry: 14 }, // ceiling under roof
  { cx: 455, cy: 280, rx: 13, ry: 42 }, // exterior wall
  { cx: 236, cy: 366, rx: 42, ry: 8 }, // bathroom floor
  { cx: 186, cy: 420, rx: 14, ry: 30 }, // basement wall
]

const RAIN = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 53) % 660 - 10,
  y: ((i * 37) % 300) - 20,
  d: (i % 5) * 0.15,
}))

export default function Story() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (reduceMotion) return
      const q = gsap.utils.selector(root)
      const meter = { v: 12 }
      const meterNum = q('.story__meter-num')[0]
      const meterBar = q('.story__meter-bar span')[0]
      const renderMeter = () => {
        meterNum.textContent = `${Math.round(meter.v)}%`
        meterBar.style.transform = `scaleX(${meter.v / 100})`
        meterBar.style.background = meter.v > 40 ? '#ff8a5c' : '#4fd8f5'
      }

      // starting state: before any treatment
      gsap.set(q('.story__step'), { autoAlpha: 0, y: 40 })
      gsap.set(q('.story__step')[0], { autoAlpha: 1, y: 0 })
      gsap.set(q('.stain'), { scale: 0, transformOrigin: '50% 50%', opacity: 1 })
      gsap.set(q('.drip'), { opacity: 0 })
      gsap.set(q('.rain'), { opacity: 0 })
      gsap.set(q('.coat'), { strokeDashoffset: 1 })
      gsap.set(q('.shield'), { strokeDashoffset: 1 })
      gsap.set(q('.shield-fill'), { opacity: 0 })
      gsap.set(q('.scan'), { opacity: 0, y: 0 })
      gsap.set(q('.ping'), { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(q('.badge'), { opacity: 0, y: 20 })
      gsap.set(q('.win'), { fill: '#33507e' })
      gsap.set(q('.pressure'), { opacity: 0 })
      renderMeter()

      const dots = q('.story__dot')
      const setActive = (i) => dots.forEach((d, n) => d.classList.toggle('is-active', n === i))
      setActive(0)

      // old step fully leaves before the new one enters ('>' below), so two steps
      // are never on screen together, even if the visitor stops scrolling mid-change
      const swap = (from, to) => [
        [q('.story__step')[from], { autoAlpha: 0, y: -30, duration: 0.25 }],
        [q('.story__step')[to], { autoAlpha: 1, y: 0, duration: 0.3 }],
      ]

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 0.8,
          // highlight the dot for whichever step's label the timeline has passed
          onUpdate: () => {
            const t = tl.time()
            let step = 0
            if (t >= tl.labels.s1) step = 1
            if (t >= tl.labels.s2) step = 2
            if (t >= tl.labels.s3) step = 3
            setActive(step)
          },
        },
      })

      // 01 — Leak: rain arrives, stains spread, groundwater pushes up
      tl.to(q('.rain'), { opacity: 1, duration: 0.3 })
        .to(q('.stain'), { scale: 1, stagger: 0.15, duration: 0.5 }, '<0.1')
        .to(q('.drip'), { opacity: 1, duration: 0.2 }, '<0.2')
        .to(q('.pressure'), { opacity: 1, duration: 0.3 }, '<')
        .to(meter, { v: 82, duration: 0.7, onUpdate: renderMeter }, 0)

      // 02 — Inspect: scan sweeps down, leak points ping
      tl.addLabel('s1', 1.1)
        .to(...swap(0, 1)[0], 's1')
        .to(...swap(0, 1)[1], '>')
        .to(q('.scan'), { opacity: 1, duration: 0.1 }, '<')
        .to(q('.scan'), { y: 380, duration: 1 }, '<')
        .to(q('.ping'), { scale: 1, stagger: 0.2, duration: 0.3, ease: 'back.out(3)' }, '<0.15')
        .to(q('.scan'), { opacity: 0, duration: 0.1 })

      // 03 — Treat: protective coating is drawn along roof, walls, floors and basement
      tl.addLabel('s2', '+=0.1')
        .to(...swap(1, 2)[0], 's2')
        .to(...swap(1, 2)[1], '>')
        .to(q('.ping'), { scale: 0, duration: 0.2 }, '<')
        .to(q('.coat'), { strokeDashoffset: 0, stagger: 0.18, duration: 0.6 }, '<')
        .to(q('.stain'), { scale: 0, stagger: 0.12, duration: 0.4 }, '<0.4')
        .to(q('.drip'), { opacity: 0, duration: 0.2 }, '<')
        .to(meter, { v: 18, duration: 1, onUpdate: renderMeter }, '<')

      // 04 — Protect: the shield closes over the house, rain is turned away
      tl.addLabel('s3', '+=0.1')
        .to(...swap(2, 3)[0], 's3')
        .to(...swap(2, 3)[1], '>')
        .to(q('.shield'), { strokeDashoffset: 0, duration: 0.8 }, '<')
        .to(q('.shield-fill'), { opacity: 1, duration: 0.5 }, '<0.3')
        .to(q('.pressure'), { opacity: 0, duration: 0.3 }, '<')
        .to(q('.win'), { fill: '#ffd28a', duration: 0.4 }, '<')
        .to(meter, { v: 6, duration: 0.5, onUpdate: renderMeter }, '<')
        .to(q('.badge'), { opacity: 1, y: 0, duration: 0.4 }, '<0.2')
        .to({}, { duration: 0.6 }) // hold the finished frame
    },
    { scope: root },
  )

  return (
    <section className={`story ${reduceMotion ? 'is-static' : ''}`} ref={root} id="story" aria-label="How we waterproof your home">
      <div className="container story__inner">
        <div className="story__text">
          <span className="eyebrow">How it works</span>
          <div className="story__steps">
            {storySteps.map((s, i) => (
              <div className="story__step" key={s.title}>
                <span className="story__num">0{i + 1}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="story__dots" aria-hidden="true">
            {storySteps.map((s, i) => (
              <span key={s.title} className="story__dot">
                0{i + 1} <em>{s.short}</em>
              </span>
            ))}
          </div>
        </div>

        <div className="story__visual">
          <svg viewBox="0 0 640 520" className="story__svg" role="img" aria-label="House cross-section being waterproofed">
            <defs>
              <linearGradient id="earth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a2b52" />
                <stop offset="1" stopColor="#0a1638" />
              </linearGradient>
              <linearGradient id="coatGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4fd8f5" />
                <stop offset="1" stopColor="#1e6fe8" />
              </linearGradient>
              <filter id="blur6"><feGaussianBlur stdDeviation="5" /></filter>
              <filter id="glow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {/* rain */}
            <g className="rain">
              {RAIN.map((r, i) => (
                <line key={i} x1={r.x} y1={r.y} x2={r.x - 6} y2={r.y + 18} style={{ animationDelay: `${r.d}s` }} />
              ))}
            </g>

            {/* ground + groundwater */}
            <rect x="0" y="360" width="640" height="160" fill="url(#earth)" />
            <path className="groundwater" d="M0 478 Q40 468 80 478 T160 478 T240 478 T320 478 T400 478 T480 478 T560 478 T640 478 V520 H0 Z" />
            <g className="pressure">
              {[220, 320, 420].map((x) => (
                <path key={x} d={`M${x} 470 V440 M${x - 8} 450 L${x} 440 L${x + 8} 450`} />
              ))}
            </g>

            {/* basement */}
            <rect x="170" y="360" width="300" height="100" className="basement" />

            {/* house */}
            <rect x="170" y="205" width="300" height="155" className="walls" />
            <polygon points="146,207 320,96 494,207" className="roof" />
            <rect x="190" y="292" width="92" height="68" className="tiles" />
            {[0, 1, 2].map((i) => <line key={`tv${i}`} x1={213 + i * 23} y1="292" x2={213 + i * 23} y2="360" className="tile-line" />)}
            {[0, 1].map((i) => <line key={`th${i}`} x1="190" y1={315 + i * 22} x2="282" y2={315 + i * 22} className="tile-line" />)}
            <rect x="340" y="240" width="72" height="56" rx="4" className="win" />
            <rect x="215" y="235" width="44" height="40" rx="4" className="win" />

            {/* leaks */}
            <g filter="url(#blur6)">
              {STAINS.map((s, i) => <ellipse key={i} className="stain" {...s} />)}
            </g>
            <circle className="drip drip--1" cx="320" cy="232" r="4" />
            <circle className="drip drip--2" cx="455" cy="318" r="3.5" />

            {/* inspection scan */}
            <g className="scan">
              <line x1="120" y1="90" x2="520" y2="90" />
              <rect x="120" y="60" width="400" height="30" className="scan__glow" />
            </g>
            {STAINS.map((s, i) => (
              <g key={i} className="ping">
                <circle cx={s.cx} cy={s.cy} r="16" />
                <circle cx={s.cx} cy={s.cy} r="4" className="ping__dot" />
              </g>
            ))}

            {/* coating */}
            <g filter="url(#glow)">
              <path className="coat" pathLength="1" d="M146 207 L320 96 L494 207" />
              <path className="coat" pathLength="1" d="M470 207 V360" />
              <path className="coat" pathLength="1" d="M190 292 V360 H282" />
              <path className="coat" pathLength="1" d="M170 360 V460 H470 V360" />
            </g>

            {/* shield */}
            <path className="shield-fill" d="M80 360 A240 300 0 0 1 560 360 Z" />
            <path className="shield" pathLength="1" d="M80 360 A240 300 0 0 1 560 360" filter="url(#glow)" />

            <g className="badge">
              <rect x="250" y="20" width="140" height="36" rx="18" />
              <text x="320" y="43" textAnchor="middle">✓ Protected</text>
            </g>
          </svg>

          <div className="story__meter">
            <span className="story__meter-label">Moisture level</span>
            <span className="story__meter-num">6%</span>
            <span className="story__meter-bar"><span /></span>
          </div>
        </div>
      </div>
    </section>
  )
}
