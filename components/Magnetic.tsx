'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

export default function Magnetic({
  children,
  strength = 0.3,
  style,
  className,
}: {
  children: React.ReactNode
  strength?: number
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || isTouchDevice) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`
    },
    [strength, isTouchDevice],
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transition: 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'transform',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  )
}
