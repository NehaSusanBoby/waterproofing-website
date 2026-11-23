import { useEffect, useRef } from 'react'
import { reduceMotion } from '../../lib/anim.js'

// Canvas rain. With `shield`, a glowing dome protects a little house:
// drops hitting the dome splash off it, and the cursor pushes rain aside.
export default function RainCanvas({ shield = false, density = 1, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let flash = 0
    const drops = []
    const splashes = []
    const pointer = { x: -999, y: -999 }
    const dome = { x: 0, y: 0, r: 0 }
    const wind = -0.9

    const newDrop = (anywhere) => ({
      x: Math.random() * (w + 200),
      y: anywhere ? Math.random() * h : -20 - Math.random() * 100,
      vy: 9 + Math.random() * 7,
      vx: wind,
      len: 12 + Math.random() * 16,
      a: 0.25 + Math.random() * 0.45,
    })

    const layout = () => {
      const mobile = w < 900
      dome.x = mobile ? w * 0.5 : w * 0.74
      dome.y = mobile ? h * 0.97 : h * 0.8
      dome.r = mobile ? Math.min(w * 0.44, 240) : Math.min(w * 0.2, h * 0.42)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layout()
      const target = Math.min(240, Math.round(((w * h) / 7000) * density))
      drops.length = 0
      for (let i = 0; i < target; i++) drops.push(newDrop(true))
    }

    const splash = (x, y, nx, ny, n = 3) => {
      for (let i = 0; i < n; i++) {
        splashes.push({
          x,
          y,
          vx: nx * (1.5 + Math.random() * 2.5) + (Math.random() - 0.5) * 2,
          vy: ny * (1.5 + Math.random() * 2.5) - Math.random() * 2,
          life: 1,
        })
      }
    }

    const drawHouse = () => {
      const { x, y, r } = dome
      const bw = r * 0.95
      const bh = r * 0.42
      const left = x - bw / 2
      const top = y - bh
      ctx.save()
      // body + roof
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.rect(left, top, bw, bh)
      ctx.moveTo(left - bw * 0.08, top)
      ctx.lineTo(x, top - bh * 0.85)
      ctx.lineTo(left + bw * 1.08, top)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      // warm, dry windows
      ctx.fillStyle = 'rgba(255, 210, 130, 0.85)'
      ctx.shadowColor = 'rgba(255, 200, 120, 0.9)'
      ctx.shadowBlur = 18
      const ww = bw * 0.16
      const wh = bh * 0.34
      ctx.fillRect(left + bw * 0.16, top + bh * 0.25, ww, wh)
      ctx.fillRect(left + bw * 0.68, top + bh * 0.25, ww, wh)
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.shadowBlur = 0
      ctx.fillRect(x - ww * 0.5, y - bh * 0.6, ww, bh * 0.6) // door
      ctx.restore()
    }

    const drawDome = () => {
      const { x, y, r } = dome
      ctx.save()
      const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
      g.addColorStop(0, 'rgba(79,216,245,0)')
      g.addColorStop(1, `rgba(79,216,245,${0.1 + flash * 0.08})`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, Math.PI, 0)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = `rgba(120,230,255,${0.55 + flash * 0.4})`
      ctx.lineWidth = 2
      ctx.shadowColor = 'rgba(79,216,245,0.9)'
      ctx.shadowBlur = 20 + flash * 20
      ctx.beginPath()
      ctx.arc(x, y, r, Math.PI, 0)
      ctx.stroke()
      ctx.restore()
      // ground line
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      const ground = shield ? dome.y : h

      // rain
      ctx.lineCap = 'round'
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]
        // cursor pushes rain aside
        const pdx = d.x - pointer.x
        const pdy = d.y - pointer.y
        const pd = pdx * pdx + pdy * pdy
        if (pd < 110 * 110) d.vx += (pdx > 0 ? 1 : -1) * 0.9
        d.vx += (wind - d.vx) * 0.05
        d.x += d.vx
        d.y += d.vy

        let hit = false
        if (shield && d.y < dome.y) {
          const dx = d.x - dome.x
          const dy = d.y - dome.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < dome.r) {
            splash(d.x, d.y, dx / dist, dy / dist)
            flash = Math.min(1, flash + 0.04)
            hit = true
          }
        }
        if (!hit && d.y > ground) {
          splash(d.x, ground, 0, -0.6, 2)
          hit = true
        }
        if (hit || d.x < -50) {
          Object.assign(d, newDrop(false))
          continue
        }
        ctx.strokeStyle = `rgba(170,225,255,${d.a})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.vx * (d.len / d.vy), d.y - d.len)
        ctx.stroke()
      }

      // splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i]
        s.vy += 0.25
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.04
        if (s.life <= 0) {
          splashes.splice(i, 1)
          continue
        }
        ctx.fillStyle = `rgba(190,235,255,${s.life * 0.8})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      if (shield) {
        drawDome()
        drawHouse()
      }
      flash *= 0.94
    }

    const loop = () => {
      if (visible) step()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = pointer.y = -999
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    if (reduceMotion) {
      step() // one still frame
    } else {
      window.addEventListener('pointermove', onMove)
      document.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [shield, density])

  return <canvas ref={ref} className={`rain-canvas ${className}`} aria-hidden="true" />
}
