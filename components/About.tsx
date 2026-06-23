'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Skills from './Skills'
import TextScramble from './TextScramble'
import Magnetic from './Magnetic'

/* -- Data ------------------------------------------------ */
const STATS = [
  { value: 2, suffix: '+', label: 'years of experience' },
  { value: 10, suffix: '+', label: 'projects completed' },
  { value: 89, suffix: 'k+', label: 'hours of music' },
]

/* -- Fonts ----------------------------------------------- */
const F = {
  serif: "'Instrument Serif', Georgia, serif",
  body: "'Sora', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

/* -- Component ------------------------------------------- */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="about"
        ref={ref}
        style={{
          padding: '7rem clamp(1.5rem, 6vw, 5rem)',
          background: 'var(--bg-alt)',
          transition: 'background 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <TextScramble
              text="About Me"
              as="h2"
              style={{
                fontFamily: F.serif,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                margin: 0,
              }}
            />
          </motion.div>

          {/* Two-column layout: bio + stats */}
          <div
            className="about-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '4rem',
              marginTop: '3rem',
              alignItems: 'start',
            }}
          >
            {/* LEFT - Bio */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <p style={styles.bio}>
                I'm Sam, a Computer Science student with a passion for crafting
                full-stack applications from the ground up. I love the challenge of
                taking a rough idea and turning it into something real, functional,
                and thoughtfully designed.
              </p>
              <p style={{ ...styles.bio, marginTop: '1rem' }}>
                Whether it's building backend APIs, designing fun and intuitive
                interfaces, or developing mobile apps — I work across the full
                stack, but am more comfortable in frontend, and am always exploring
                what I can build next.
              </p>

              {/* GitHub link */}
              <Magnetic strength={0.2}>
                <a
                  href="https://github.com/sam-cookie"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.ghLink}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'var(--accent-soft)'
                    el.style.borderColor = 'var(--accent)'
                    el.style.boxShadow = '0 0 25px var(--accent-soft)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'var(--accent-border)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  View my GitHub &rarr;
                </a>
              </Magnetic>
            </motion.div>

            {/* RIGHT - Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.15 + i * 0.08 }}
                  style={{
                    borderLeft: '2px solid var(--accent)',
                    paddingLeft: '1.2rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: F.serif,
                      fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                      fontWeight: 400,
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    <CountUp target={s.value} suffix={s.suffix} active={inView} delay={0.15 + i * 0.08} />
                  </div>
                  <div
                    style={{
                      fontFamily: F.mono,
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
              margin: '3rem 0',
            }}
          />

          {/* Tech stack — typewriter style */}
          <Skills />

        </div>
      </section>
    </>
  )
}

/* -- CountUp --------------------------------------------- */
function CountUp({ target, suffix, active, delay }: { target: number; suffix: string; active: boolean; delay: number }) {
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!active || hasRun.current) return
    hasRun.current = true

    const duration = 1800
    const startTime = performance.now() + delay * 1000
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, delay])

  return <>{value}{suffix}</>
}

/* -- Styles ---------------------------------------------- */
const styles: Record<string, React.CSSProperties> = {
  bio: {
    fontFamily: F.body,
    fontSize: '0.9rem',
    color: 'var(--text-mid)',
    lineHeight: 1.85,
    fontWeight: 300,
    margin: 0,
  },
  ghLink: {
    display: 'inline-block',
    marginTop: '1.8rem',
    fontFamily: F.mono,
    fontSize: '0.75rem',
    letterSpacing: '0.06em',
    color: 'var(--accent)',
    textDecoration: 'none',
    border: '1px solid var(--accent-border)',
    padding: '0.5rem 1.1rem',
    borderRadius: '2px',
    background: 'transparent',
    transition: 'all 0.3s',
  },
}
