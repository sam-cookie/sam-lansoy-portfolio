'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)
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

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
