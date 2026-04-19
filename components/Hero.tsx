'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'UI/UX Designer']

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Ambient blobs */}
      <Blob
        style={{
          width: 480, height: 480,
          top: -120, right: -80,
          animationDuration: '9s',
        }}
      />
      <Blob
        style={{
          width: 340, height: 340,
          bottom: 40, left: -80,
          animationDuration: '12s',
          animationDelay: '2s',
          animationDirection: 'reverse',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '64px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'center',
        }}
      >
        {/* Left — text */}
        <div>
          {/* Greeting */}
          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
              fontWeight: 300,
              color: 'var(--cream-dim)',
            }}
          >
            Hello, I am
          </motion.p>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.45)}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.8rem, 10vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.2,
              margin: '0.08em 0 0.3em',
              background: 'linear-gradient(135deg, #f5f0e8 25%, #c9a96e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sam Lansoy
          </motion.h1>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.6)}
            style={{
              fontSize: '0.9rem',
              color: 'var(--cream-dim)',
              lineHeight: 1.85,
              maxWidth: '460px',
            }}
          >
            a computer science student who loves creating applications, learning new tech stacks, and listening to music.
          </motion.p>

          {/* Roles */}
          <motion.div
            {...fadeUp(0.75)}
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
            }}
          >
            {ROLES.map((role) => (
              <RoleTag key={role} label={role} />
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            {...fadeUp(0.9)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              marginTop: '2.8rem',
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

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: 'clamp(180px, 22vw, 300px)',
            aspectRatio: '3/4',
            flexShrink: 0,
          }}
        >
          {/* Decorative gold border offset */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              translate: '10px 10px',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '4px',
              zIndex: 0,
            }}
          />

          {/* Photo container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(201,169,110,0.04)',
              zIndex: 1,
            }}
          >
            <Image
              src="/project/sam.jpg"
              alt="Sam Lansoy"
              fill
              sizes="(max-width: 768px) 180px, 300px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />       
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #home > div {
            grid-template-columns: 1fr !important;
          }
          #home > div > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Sub-components ─────────────────────────────── */

function Blob({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        animation: 'blobFloat 9s ease-in-out infinite',
        ...style,
      }}
    />
  )
}

function RoleTag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.82rem',
        fontWeight: 400,
        letterSpacing: '0.05em',
        color: 'var(--cream-dim)',
        width: 'fit-content',
        position: 'relative',
        paddingBottom: '4px',
      }}
    >
      {label}
      <span style={{ opacity: 0.45, fontSize: '0.7rem' }}>↗</span>
      <span
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '100%', height: '1px',
          background: 'linear-gradient(90deg, var(--gold), transparent)',
        }}
      />
    </span>
  )
}

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
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.75rem',
        color: 'var(--cream-dim)',
        textDecoration: 'none',
        transition: 'color 0.3s',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--cream-dim)')
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}