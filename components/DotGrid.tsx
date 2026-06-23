'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const DOT_SPACING = 32
const DOT_SIZE = 1.2
const BASE_OPACITY = 0.12
const GLOW_RADIUS = 120
const GLOW_STRENGTH = 0.35
const PARALLAX_STRENGTH = 8

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    const cx = rect.width / 2
    const cy = rect.height / 2
    offsetRef.current = {
      x: ((e.clientX - rect.left - cx) / cx) * PARALLAX_STRENGTH,
      y: ((e.clientY - rect.top - cy) / cy) * PARALLAX_STRENGTH,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 }
    offsetRef.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)
    parent.addEventListener('mousemove', handleMouseMove as EventListener)
    parent.addEventListener('mouseleave', handleMouseLeave)

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#A1A1AA'

    const draw = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const ox = offsetRef.current.x
      const oy = offsetRef.current.y

      const cols = Math.ceil(w / DOT_SPACING) + 2
      const rows = Math.ceil(h / DOT_SPACING) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * DOT_SPACING + ox
          const y = row * DOT_SPACING + oy

          let opacity = BASE_OPACITY
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2)
          if (dist < GLOW_RADIUS) {
            const factor = 1 - dist / GLOW_RADIUS
            opacity += factor * GLOW_STRENGTH
          }

          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE, 0, Math.PI * 2)
          ctx.fillStyle = accentColor
          ctx.globalAlpha = opacity
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      parent.removeEventListener('mousemove', handleMouseMove as EventListener)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice, handleMouseMove, handleMouseLeave])

  if (isTouchDevice) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
