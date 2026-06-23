'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          background: 'var(--accent)',
          transformOrigin: 'left',
          transform: `scaleX(${progress})`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
