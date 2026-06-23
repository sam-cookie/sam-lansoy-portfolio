'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315]

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const maskId = useId()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        transition: 'color 0.3s, border-color 0.3s',
        width: '30px',
        height: '30px',
      }}
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{ overflow: 'visible' }}
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <defs>
          <mask id={maskId}>
            <rect x="-4" y="-4" width="32" height="32" fill="white" />
            <motion.circle
              r="7"
              fill="black"
              animate={{
                cx: isDark ? 17 : 30,
                cy: isDark ? 5 : -4,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </mask>
        </defs>

        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          animate={{ r: isDark ? 9 : 5 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        <g>
          {RAYS.map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 12 + 7.5 * Math.cos(rad)
            const y1 = 12 + 7.5 * Math.sin(rad)
            const x2 = 12 + 10.5 * Math.cos(rad)
            const y2 = 12 + 10.5 * Math.sin(rad)
            return (
              <motion.line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={false}
                animate={{
                  opacity: isDark ? 0 : 1,
                  x1: isDark ? 12 : x1,
                  y1: isDark ? 12 : y1,
                  x2: isDark ? 12 : x2,
                  y2: isDark ? 12 : y2,
                }}
                transition={{
                  duration: 0.35,
                  delay: isDark ? 0 : 0.15 + i * 0.025,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            )
          })}
        </g>
      </motion.svg>
    </button>
  )
}
