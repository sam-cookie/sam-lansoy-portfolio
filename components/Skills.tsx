'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TECH = [
  {
    category: 'languages',
    items: ['Python', 'C', 'Java', 'JavaScript', 'TypeScript', 'Assembly', 'SQL', 'Dart', 'PHP'],
  },
  {
    category: 'frameworks & libraries',
    items: ['Flutter', 'React', 'Node.js', 'Express', 'Flask', 'RayLib', 'Laravel / Blade'],
  },
  {
    category: 'tools & platforms',
    items: ['Git', 'GitHub', 'Firebase', 'Supabase', 'VSCode', 'Figma', 'Canva', 'Balsamiq'],
  },
]

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const F = {
  mono: "'JetBrains Mono', monospace",
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Paper container */}
      <div
        style={{
          position: 'relative',
          background: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 27px,
            var(--paper-line) 27px,
            var(--paper-line) 28px
          ), var(--paper-bg)`,
          borderRadius: '3px',
          padding: '2rem 2.2rem',
          overflow: 'hidden',
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: NOISE_SVG,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            opacity: 'var(--paper-noise-opacity)',
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Red margin line */}
        <div
          style={{
            position: 'absolute',
            left: '2rem',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(200, 120, 100, 0.15)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', paddingLeft: '1.2rem' }}>
          {TECH.map((group, gi) => (
            <TypewriterLine
              key={group.category}
              category={group.category}
              items={group.items}
              index={gi}
              inView={inView}
              isLast={gi === TECH.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TypewriterLine({
  category,
  items,
  index,
  inView,
  isLast,
}: {
  category: string
  items: string[]
  index: number
  inView: boolean
  isLast: boolean
}) {
  const [hoveredLine, setHoveredLine] = useState(false)

  return (
    <div style={{ marginBottom: isLast ? 0 : '1.8rem' }}>
      {/* Category heading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 + index * 0.35 }}
        style={{
          fontFamily: F.mono,
          fontSize: '0.6rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'var(--typewriter-prefix)',
          margin: '0 0 0.5rem 0',
          userSelect: 'none',
        }}
      >
        {category}
      </motion.p>

      {/* Typed line */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{
          duration: 0.9,
          delay: 0.25 + index * 0.35,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onMouseEnter={() => setHoveredLine(true)}
        onMouseLeave={() => setHoveredLine(false)}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '0',
          lineHeight: 1.9,
        }}
      >
        {/* > prefix */}
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.78rem',
            color: 'var(--typewriter-prefix)',
            marginRight: '0.6rem',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          &gt;
        </span>

        {/* Tech items */}
        {items.map((item, i) => (
          <span key={item} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <SkillItem name={item} />
            {i < items.length - 1 && (
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: '0.72rem',
                  color: 'var(--typewriter-prefix)',
                  margin: '0 0.45rem',
                  userSelect: 'none',
                }}
              >
                ·
              </span>
            )}
          </span>
        ))}

        {/* Blinking cursor on hover */}
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.82rem',
            color: 'var(--typewriter-text)',
            marginLeft: '2px',
            opacity: hoveredLine ? 1 : 0,
            animation: hoveredLine ? 'typewriterBlink 0.8s step-end infinite' : 'none',
            transition: 'opacity 0.15s',
            userSelect: 'none',
          }}
        >
          ▋
        </span>
      </motion.div>
    </div>
  )
}

function SkillItem({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: F.mono,
        fontSize: '0.82rem',
        letterSpacing: '0.01em',
        color: hovered ? 'var(--text)' : 'var(--typewriter-text)',
        transform: hovered ? 'translateY(-1.5px)' : 'translateY(0)',
        transition: 'color 0.2s ease, transform 0.2s ease',
        cursor: 'default',
        display: 'inline-block',
      }}
    >
      {name}
    </span>
  )
}
