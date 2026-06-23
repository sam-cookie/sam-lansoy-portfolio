'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}=+*^?#________'

export default function TextScramble({
  text,
  as: Tag = 'span',
  style,
  className,
}: {
  text: string
  as?: 'span' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(text)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    let frame = 0
    const totalFrames = text.length + 12
    let rafId: number

    const update = () => {
      let output = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' '
        } else if (frame - 3 > i) {
          output += text[i]
        } else if (frame > i) {
          output += CHARS[Math.floor(Math.random() * CHARS.length)]
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(output)
      frame++
      if (frame <= totalFrames) {
        rafId = requestAnimationFrame(update)
      } else {
        setDisplay(text)
      }
    }

    const startDelay = setTimeout(() => {
      rafId = requestAnimationFrame(update)
    }, 100)

    return () => {
      clearTimeout(startDelay)
      cancelAnimationFrame(rafId)
    }
  }, [inView, text])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className={className}
    >
      {display}
    </Tag>
  )
}
