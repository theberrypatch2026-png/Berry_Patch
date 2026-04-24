'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

const PAGES = [
  { src: '/assets/report_p1.png', label: 'Page 1' },
  { src: '/assets/report_p2.png', label: 'Page 2' },
]

const MIN = 1
const MAX = 5

function ReportPage({ src, label }: { src: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Keep live transform in a ref so event handlers always read fresh values
  const t = useRef({ s: 1, x: 0, y: 0 })
  const [display, setDisplay] = useState({ s: 1, x: 0, y: 0 })

  const commit = useCallback((s: number, x: number, y: number) => {
    t.current = { s, x, y }
    setDisplay({ s, x, y })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current!

    const ptrs = new Map<number, PointerEvent>()

    // â”€â”€ drag state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let dragging = false
    let dragLastX = 0
    let dragLastY = 0

    // â”€â”€ pinch state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let pinchStartDist = 0
    let pinchStartS = 1
    let pinchCx = 0   // midpoint relative to container
    let pinchCy = 0

    function clampS(v: number) { return Math.min(Math.max(v, MIN), MAX) }

    function clampXY(s: number, x: number, y: number) {
      const w = container.clientWidth
      const h = container.clientHeight
      // image rendered size at this scale (transform-origin: 0 0)
      const iw = w * s
      const ih = h * (1754 / 1240) * s   // intrinsic aspect ratio A4
      const minX = s <= 1 ? 0 : Math.min(0, w - iw)
      const minY = s <= 1 ? 0 : Math.min(0, h - ih)
      return {
        x: Math.min(0, Math.max(minX, x)),
        y: Math.min(0, Math.max(minY, y)),
      }
    }

    function zoomToward(cx: number, cy: number, newS: number) {
      const { s: oldS, x, y } = t.current
      const ratio = newS / oldS
      const nx = cx + (x - cx) * ratio
      const ny = cy + (y - cy) * ratio
      const clamped = clampXY(newS, nx, ny)
      commit(newS, clamped.x, clamped.y)
    }

    // â”€â”€ pointer events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function onDown(e: PointerEvent) {
      container.setPointerCapture(e.pointerId)
      ptrs.set(e.pointerId, e)

      if (ptrs.size === 1) {
        dragging = true
        dragLastX = e.clientX
        dragLastY = e.clientY
      } else if (ptrs.size === 2) {
        dragging = false
        const [a, b] = [...ptrs.values()]
        pinchStartDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
        pinchStartS = t.current.s
        const rect = container.getBoundingClientRect()
        pinchCx = (a.clientX + b.clientX) / 2 - rect.left
        pinchCy = (a.clientY + b.clientY) / 2 - rect.top
      }
    }

    function onMove(e: PointerEvent) {
      ptrs.set(e.pointerId, e)

      if (ptrs.size === 1 && dragging) {
        const dx = e.clientX - dragLastX
        const dy = e.clientY - dragLastY
        dragLastX = e.clientX
        dragLastY = e.clientY
        const { s, x, y } = t.current
        const clamped = clampXY(s, x + dx, y + dy)
        commit(s, clamped.x, clamped.y)

      } else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()]
        const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
        const newS = clampS(pinchStartS * (d / pinchStartDist))
        zoomToward(pinchCx, pinchCy, newS)
      }
    }

    function onUp(e: PointerEvent) {
      ptrs.delete(e.pointerId)
      if (ptrs.size < 2) { dragging = ptrs.size === 1 }
      if (ptrs.size === 0) dragging = false
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = container.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const newS = clampS(t.current.s * (e.deltaY < 0 ? 1.13 : 0.9))
      zoomToward(cx, cy, newS)
    }

    container.addEventListener('pointerdown', onDown)
    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerup', onUp)
    container.addEventListener('pointercancel', onUp)
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('pointerdown', onDown)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerup', onUp)
      container.removeEventListener('pointercancel', onUp)
      container.removeEventListener('wheel', onWheel)
    }
  }, [commit])

  function bump(delta: number) {
    const el = containerRef.current
    if (!el) return
    const cx = el.clientWidth / 2
    const cy = el.clientHeight / 2
    const newS = Math.min(Math.max(t.current.s + delta, MIN), MAX)
    const ratio = newS / t.current.s
    const nx = cx + (t.current.x - cx) * ratio
    const ny = cy + (t.current.y - cy) * ratio
    commit(newS, nx, ny)
  }

  function reset() { commit(1, 0, 0) }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/4">
      {/* Toolbar */}
      <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-cream/40">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => bump(-0.5)}
            aria-label="Zoom out"
            className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-md bg-white/8 text-cream/60 hover:bg-white/20 hover:text-cream transition-colors cursor-pointer text-lg md:text-base select-none"
          >-</button>
          <span className="font-sans text-xs text-cream/40 w-10 text-center tabular-nums">
            {Math.round(display.s * 100)}%
          </span>
          <button
            onClick={() => bump(0.5)}
            aria-label="Zoom in"
            className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-md bg-white/8 text-cream/60 hover:bg-white/20 hover:text-cream transition-colors cursor-pointer text-lg md:text-base select-none"
          >+</button>
          <button
            onClick={reset}
            className="font-sans text-sm md:text-[10px] tracking-wide uppercase text-cream/30 hover:text-cream/60 transition-colors cursor-pointer ml-1 select-none"
          >Reset</button>
        </div>
      </div>

      {/* Fixed viewport â€” overflow hidden, no scroll */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none bg-white"
        style={{
          height: '68vh',
          touchAction: 'none',
          cursor: display.s > 1 ? 'grab' : 'default',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(${display.x}px, ${display.y}px) scale(${display.s})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          <Image
            src={src}
            alt={label}
            width={1240}
            height={1754}
            className="w-full h-auto block"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default function PDFViewer() {
  return (
    <div className="flex flex-col gap-5">
      {PAGES.map((p) => (
        <ReportPage key={p.src} src={p.src} label={p.label} />
      ))}
      <div className="flex justify-center pt-2">
        <a
          href="/assets/lab-report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm text-cream/50 border border-white/10 px-5 py-2.5 rounded-full hover:border-white/30 hover:text-cream/80 transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
          </svg>
          Download Full Report
        </a>
      </div>
    </div>
  )
}

