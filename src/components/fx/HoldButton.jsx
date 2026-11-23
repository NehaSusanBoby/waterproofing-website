import { useRef, useState } from 'react'
import { gsap } from '../../lib/anim.js'

// Press-and-hold button: water fills it while held; when full, onComplete fires.
// Keyboard: hold Space. Enter activates straight away.
export default function HoldButton({ label, doneLabel = 'Done!', duration = 1.3, onComplete }) {
  const ref = useRef(null)
  const state = useRef({ p: 0, tween: null, done: false })
  const [done, setDone] = useState(false)

  const setP = () => ref.current?.style.setProperty('--p', state.current.p)

  const finish = () => {
    if (state.current.done) return
    state.current.done = true
    setDone(true)
    navigator.vibrate?.(40)
    setTimeout(() => onComplete?.(), 600)
  }

  const start = () => {
    if (state.current.done) return
    state.current.tween?.kill()
    state.current.tween = gsap.to(state.current, {
      p: 1,
      duration: duration * (1 - state.current.p),
      ease: 'none',
      onUpdate: setP,
      onComplete: finish,
    })
  }

  const cancel = () => {
    if (state.current.done) return
    state.current.tween?.kill()
    state.current.tween = gsap.to(state.current, { p: 0, duration: 0.5, ease: 'power2.out', onUpdate: setP })
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`hold-btn ${done ? 'is-done' : ''}`}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === ' ' && !e.repeat) {
          e.preventDefault()
          start()
        }
        if (e.key === 'Enter') finish()
      }}
      onKeyUp={(e) => e.key === ' ' && cancel()}
    >
      <span className="hold-btn__fill" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0 20 Q180 0 360 20 T720 20 T1080 20 T1440 20 T1800 20 T2160 20 T2520 20 T2880 20 V40 H0 Z" />
        </svg>
      </span>
      <span className="hold-btn__label">{done ? doneLabel : label}</span>
    </button>
  )
}
