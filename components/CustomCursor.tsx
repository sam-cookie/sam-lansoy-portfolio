'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | undefined>(undefined)
  const [isHover, setIsHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      setIsHover(!!el?.closest(INTERACTIVE))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(${targetRef.current.x}px - 50%), calc(${targetRef.current.y}px - 50%))`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isTouch) return null

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHover ? 22 : 8,
          height: isHover ? 22 : 8,
          borderRadius: '50%',
          background: isHover ? 'transparent' : 'var(--accent)',
          border: isHover ? '1.5px solid var(--accent)' : '1.5px solid transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          willChange: 'transform',
          transition: [
            'width 0.22s cubic-bezier(0.25, 0.1, 0.25, 1)',
            'height 0.22s cubic-bezier(0.25, 0.1, 0.25, 1)',
            'background 0.22s ease',
            'border-color 0.22s ease',
            'opacity 0.3s ease',
          ].join(', '),
        }}
      />
    </>
  )
}
