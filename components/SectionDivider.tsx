'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent-border) 20%, var(--accent-border) 80%, transparent)',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}
