'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import Image from 'next/image'

const MIN = 1
const MAX = 5

function ReportPage({ src, label }: { src: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
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
    let dragging = false
    let dragLastX = 0
    let dragLastY = 0
    let pinchStartDist = 0
    let pinchStartS = 1
    let pinchCx = 0
    let pinchCy = 0

    function clampS(v: number) { return Math.min(Math.max(v, MIN), MAX) }

    function clampXY(s: number, x: number, y: number) {
      const w = container.clientWidth
      const h = container.clientHeight
      const iw = w * s
      const ih = h * (1754 / 1240) * s
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

  return (
    <section
      className="flex flex-col bg-[#F2F2F0] overflow-hidden"
      style={{ height: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Toolbar */}
      <div className="shrink-0 px-5 py-2.5 flex items-center justify-between border-b border-border">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted">{label}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => bump(-0.5)} aria-label="Zoom out"
            className="w-7 h-7 flex items-center justify-center rounded-md bg-black/5 text-charcoal/60 hover:bg-black/10 hover:text-charcoal transition-colors cursor-pointer text-base select-none">−</button>
          <span className="font-sans text-xs text-muted w-10 text-center tabular-nums">
            {Math.round(display.s * 100)}%
          </span>
          <button onClick={() => bump(0.5)} aria-label="Zoom in"
            className="w-7 h-7 flex items-center justify-center rounded-md bg-black/5 text-charcoal/60 hover:bg-black/10 hover:text-charcoal transition-colors cursor-pointer text-base select-none">+</button>
          <button onClick={() => commit(1, 0, 0)}
            className="font-sans text-[10px] tracking-wide uppercase text-muted hover:text-charcoal transition-colors cursor-pointer ml-1 select-none">Reset</button>
        </div>
      </div>

      {/* Centred document — explicit dimensions computed from viewport so it never collapses */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-3 md:p-5">
        <div
          ref={containerRef}
          className="relative overflow-hidden select-none bg-white shadow-xl border border-border rounded-sm"
          style={{
            /*
              A4 ratio = 1240:1754 (0.707 w/h).
              Height = min(available-viewport-height, width-constrained-height)
              Width  = min(height-constrained-width, available-viewport-width)
              80px accounts for toolbar (~46px) + vertical padding (~32px)
              32px accounts for horizontal padding
            */
            height: 'min(calc(100dvh - 80px), calc((100vw - 32px) * 1754 / 1240))',
            width:  'min(calc((100dvh - 80px) * 1240 / 1754), calc(100vw - 32px))',
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
    </section>
  )
}

export default function LabPDFSection() {
  return (
    <>
      <ReportPage src="/assets/report_p1.png" label="Lab Report · Page 1 of 2" />
      <ReportPage src="/assets/report_p2.png" label="Lab Report · Page 2 of 2" />
    </>
  )
}
