'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
})

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        paddingTop: '80px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Greeting */}
        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'var(--text-mid)',
            marginBottom: '0.5rem',
          }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.35)}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: 0,
          }}
        >
          Sam
          <br />
          Lansoy
          <span
            style={{
              display: 'inline-block',
              width: '4px',
              height: '0.7em',
              background: 'var(--accent)',
              borderRadius: '2px',
              marginLeft: '0.08em',
              verticalAlign: 'baseline',
              animation: 'cursorPulse 1.1s step-end infinite',
            }}
          />
        </motion.h1>

        {/* Roles */}
        <motion.p
          {...fadeUp(0.5)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.03em',
            marginTop: '1.2rem',
          }}
        >
          Full Stack Developer &middot; Mobile Developer &middot; UI/UX Designer
        </motion.p>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.6)}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'var(--text-mid)',
            lineHeight: 1.8,
            maxWidth: '480px',
            marginTop: '1.5rem',
          }}
        >
          A computer science student who loves creating applications, learning
          new tech stacks, and listening to music.
        </motion.p>

        {/* Links */}
        <motion.div
          {...fadeUp(0.75)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '2.5rem',
          }}
        >
          <HeroLink
            href="https://github.com/sam-cookie"
            icon={<GithubIcon />}
            label="github.com/sam-cookie"
          />
          <HeroLink
            href="mailto:sdlansoy@up.edu.ph"
            icon={<MailIcon />}
            label="sdlansoy@up.edu.ph"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Sub-components ─────────────────────────────── */

function HeroLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        transition: 'color 0.3s',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color =
          'var(--text-muted)')
      }
    >
      {icon}
      {label}
    </a>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}
