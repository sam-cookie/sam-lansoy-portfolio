'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Data ──────────────────────────────────────────── */
const STATS = [
  { num: '2+',     label: 'years of\nexperience' },
  { num: '10+',    label: 'projects\ncompleted' },
  { num: '89k+',   label: 'hours of\nmusic' },
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

/* ── Animation helpers ─────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay },
})

/* ── Component ─────────────────────────────────────── */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '6rem clamp(1.5rem, 6vw, 5rem)',
        background: 'var(--bg2)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section label + title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={styles.label}>// about me</p>
          <h2 style={styles.title}>About Me</h2>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={styles.statsRow}
        >
          {STATS.map((s, i) => (
            <div key={i} style={styles.stat}>
              <span style={styles.statNum}>{s.num}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <Divider />

        {/* ── Main grid: bio | tech ── */}
        <div style={styles.grid}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            <p style={styles.bio}>
              I'm Sam, a Computer Science student with a passion for crafting
              full-stack applications from the ground up. I love the challenge of
              taking a rough idea and turning it into something real, functional,
              and thoughtfully designed.
            </p>
            <p style={{ ...styles.bio, marginTop: '1rem' }}>
              Whether it's building backend APIs, designing fun and intuitive interfaces,
              or developing mobile apps — I work across the full stack, but is more comfortable in frontend, and am
              always exploring what I can build next.
            </p>
            <a
              href="https://github.com/sam-cookie"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.cta}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'var(--gold-dim)'
                el.style.borderColor = 'var(--gold)'
                el.style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(201,169,110,0.3)'
                el.style.color = 'var(--gold)'
              }}
            >
              view my github ↗
            </a>
          </motion.div>

          {/* Tech stack */}
          <div>
            {TECH.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 + gi * 0.1 }}
                style={{ marginBottom: gi < TECH.length - 1 ? '2rem' : 0 }}
              >
                <p style={styles.techCat}>{group.category}</p>
                <div style={styles.tagRow}>
                  {group.items.map((item) => (
                    <TechTag key={item} label={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-components ─────────────────────────────────── */

function TechTag({ label }: { label: string }) {
  return (
    <span
      style={styles.tag}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.borderColor = 'rgba(201,169,110,0.45)'
        el.style.color = 'var(--gold)'
        el.style.background = 'var(--gold-dim)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLSpanElement
        el.style.borderColor = 'var(--border)'
        el.style.color = 'var(--cream-dim)'
        el.style.background = 'var(--surface)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {label}
    </span>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: '100%',
        height: '1px',
        background:
          'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
        margin: '2.5rem 0',
      }}
    />
  )
}

/* ── Styles object ─────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.68rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '0.6rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 300,
    color: 'var(--white)',
    lineHeight: 1.1,
  },
  statsRow: {
    display: 'flex',
    gap: '0',
    marginTop: '2.5rem',
    flexWrap: 'wrap' as const,
  },
  stat: {
    flex: '1 1 120px',
    padding: '0 2rem',
    borderLeft: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 4vw, 2rem)',
    fontWeight: 300,
    color: 'var(--gold)',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '1rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    whiteSpace: 'pre-line' as const,
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '4rem',
    alignItems: 'start',
  },
  bio: {
    fontSize: '0.88rem',
    color: 'var(--cream-dim)',
    lineHeight: 1.9,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginTop: '1.8rem',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    letterSpacing: '0.06em',
    color: 'var(--gold)',
    textDecoration: 'none',
    border: '1px solid rgba(201,169,110,0.3)',
    padding: '0.5rem 1.1rem',
    borderRadius: '2px',
    background: 'transparent',
    transition: 'all 0.3s',
  },
  techCat: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.64rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--border)',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.45rem',
  },
  tag: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    color: 'var(--cream-dim)',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    padding: '0.28rem 0.7rem',
    borderRadius: '2px',
    cursor: 'default',
    transition: 'all 0.25s ease',
  },
}