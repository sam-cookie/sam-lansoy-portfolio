'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* -- Data ------------------------------------------------ */
const STATS = [
  { num: '2+', label: 'years of experience' },
  { num: '10+', label: 'projects completed' },
  { num: '89k+', label: 'hours of music' },
]

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

/* -- Colors ---------------------------------------------- */
const C = {
  bgAlt: '#F2F0ED',
  text: '#18181B',
  textMid: '#52525B',
  textMuted: '#A1A1AA',
  accent: '#7C3AED',
  accentHover: '#6D28D9',
  accentSoft: 'rgba(124,58,237,0.06)',
  accentBorder: 'rgba(124,58,237,0.2)',
  border: 'rgba(0,0,0,0.06)',
}

/* -- Fonts ----------------------------------------------- */
const F = {
  serif: "'Instrument Serif', Georgia, serif",
  body: "'Sora', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

/* -- Animation helpers ----------------------------------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay },
})

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
          background: C.bgAlt,
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Section title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: F.serif,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            About Me
          </motion.h2>

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
              <a
                href="https://github.com/sam-cookie"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.ghLink}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = C.accentSoft
                  el.style.borderColor = C.accent
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'transparent'
                  el.style.borderColor = C.accentBorder
                }}
              >
                View my GitHub &rarr;
              </a>
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
                    borderLeft: `2px solid ${C.accent}`,
                    paddingLeft: '1.2rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: F.serif,
                      fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                      fontWeight: 400,
                      color: C.accent,
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: F.mono,
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: C.textMuted,
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
              background: `linear-gradient(90deg, transparent, ${C.border} 20%, ${C.border} 80%, transparent)`,
              margin: '3rem 0',
            }}
          />

          {/* Tech stack */}
          <div>
            {TECH.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.35 + gi * 0.1 }}
                style={{
                  marginBottom: gi < TECH.length - 1 ? '1.5rem' : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: F.mono,
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: C.textMuted,
                    marginBottom: '0.6rem',
                    marginTop: 0,
                  }}
                >
                  {group.category}
                </p>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: '0.85rem',
                    color: C.textMid,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {group.items.join(' · ')}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

/* -- Styles ---------------------------------------------- */
const styles: Record<string, React.CSSProperties> = {
  bio: {
    fontFamily: F.body,
    fontSize: '0.9rem',
    color: C.textMid,
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
    color: C.accent,
    textDecoration: 'none',
    border: `1px solid ${C.accentBorder}`,
    padding: '0.5rem 1.1rem',
    borderRadius: '2px',
    background: 'transparent',
    transition: 'all 0.3s',
  },
}
