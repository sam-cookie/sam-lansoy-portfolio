'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ── Types ─────────────────────────────────────────── */
type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  image: string
  github?: string
  live?: string
  type: 'web' | 'mobile' | 'game'
  frame: 'browser' | 'phone'
}

/* ── Data ──────────────────────────────────────────── */
const PROJECTS: Project[] = [
  // Web
  {
    id: 'platemate',
    title: 'Platemate',
    description:
      'A web application that allows users to share their favorite recipes and discover new ones — for home cooks and foodies alike.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
    image: '/project/platemate.png',
    github: 'https://github.com/iskwipi/126-final-project',
    type: 'web',
    frame: 'browser'
  },
  {
    id: 'humana',
    title: 'Humana',
    description:
      'A to-do list productivity app with real-time collaboration support — add, edit, remove tasks and coordinate with multiple users simultaneously.',
    tech: ['Python', 'Flask', 'SQLite'],
    image: '/project/humana.png',
    github: 'https://github.com/sam-cookie/cmsc128-indivProject_Lansoy',
    type: 'web',
    frame: 'browser'
  },
  {
    id: 'lostnfound',
    title: 'Lost & Found',
    description:
      'A community-driven platform that helps people recover lost items and reunite found ones with their owners via photos, location details, and community posts.',
    tech: ['Firebase', 'Express', 'React', 'Node.js'],
    image: '/project/lostnfound.png',
    github: 'https://github.com/juliaconts/CMSC129-Lab1-ContrerasJL_LansoySL',
    type: 'web',
    frame: 'browser'
  },
  {
    id: 'upvorghub',
    title: 'UPV Org Hub',
    description:
      'A web app for UPV constituents to explore, discover, and manage the various student organizations within the University of the Philippines Visayas.\n Now features Hubby — a friendly chatbot assistant that helps users find orgs, answer FAQs, and help with CRUD operations.',
    tech: ['Laravel', 'Blade', 'PHP ', 'PostgreSQL'],
    image: '/project/upvorghub.png',
    github: 'https://github.com/CMSC129-LABS/CMSC129-Lab3-ContrerasJL_LansoySLD',
    type: 'web',
    frame: 'browser'
  },

  // Mobile
  {
    id: 'agap',
    title: 'AGAP',
    description:
      'A mobile emergency response app for residents and Miagao MDRRMO personnel — bridging the critical gap between residents in need and the responders who serve them.',
    tech: ['Flutter', 'Dart', 'Supabase'],
    image: '/project/agap.png',
    github: 'https://github.com/AGAP-by-tomBYTES/AGAP',
    type: 'mobile',
    frame: 'phone'
  },
  {
    id: 'thegradeescape',
    title: 'The Grade Escape',
    description:
      'A Flutter app that helps students manage class records with a handwritten notebook aesthetic, real-time Firebase sync, and dynamic weighted grade calculation.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    image: '/project/thegradeescape.png',
    type: 'mobile',
    frame: 'phone'
  },
  {
    id: 'fins',
    title: 'Fins',
    description:
      'A cross-platform finance app with expense tracking, budget management, and analytics. Features offline receipt reading and AI-assisted financial decision support.',
    tech: ['Flutter',  'Dart', 'SQLite'],
    image: '/project/fins.png',
    github: 'https://github.com/aalaserna/CMSC128_FinTracker',
    type: 'mobile',
    frame: 'phone'
  },

  // Games
  {
    id: 'matchymatchy',
    title: 'Matchy Matchy',
    description:
      'A memory card matching game that challenges users to flip and match hidden card pairs. Tracks fastest completion time with no internet or database required.',
    tech: ['Flutter', 'Dart'],
    image: '/project/matchymatchy.png',
    github: 'https://github.com/juliaconts/156midterms_matchymatchy',
    type: 'game',
    frame: 'phone'
  },
  {
    id: 'ctrlbit',
    title: 'CTRL+BIT',
    description:
      'A 2D educational maze game that teaches Assembly mnemonics through gameplay. Each run generates a unique maze via DFS with backtracking for endless replayability.',
    tech: ['C', 'RayLib'],
    image: '/project/ctrlbit.png',
    github: 'https://github.com/casjrn/Ctrl-Bit-Game',
    type: 'game',
    frame: 'browser'
  },
]

const TABS = [
  { key: 'web',    label: 'Web-based' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'game',   label: 'Games' },
] as const

type TabKey = typeof TABS[number]['key']

/* ── Main Component ────────────────────────────────── */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<TabKey>('web')

  const filtered = PROJECTS.filter((p) => p.type === activeTab)
  const hasMobile = filtered.some((p) => p.frame === 'phone')

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: '6rem clamp(1.5rem, 6vw, 5rem)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={styles.label}>// my projects</p>
          <h2 style={styles.title}>My Projects</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={styles.tabRow}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.tabBtn,
                color: activeTab === tab.key ? 'var(--gold)' : 'var(--muted)',
                borderBottom: activeTab === tab.key
                  ? '1px solid var(--gold)'
                  : '1px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              ...styles.grid,
              gridTemplateColumns: activeTab === 'web'
                ? 'repeat(2, 1fr)'
                : hasMobile && activeTab !== 'game'
                  ? 'repeat(auto-fill, minmax(220px, 1fr))'
                  : 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isMobile={hasMobile}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ── Project Card ───────────────────────────────────── */
function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: Project
  index: number
  isMobile: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const cardContent = (
    <>
      {project.frame === 'phone'
        ? <PhoneFrame image={project.image} title={project.title} />
        : <BrowserFrame image={project.image} title={project.title} />
      }

      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{project.title}</h3>
        <p style={styles.cardDesc}>{project.description}</p>

        <div style={styles.pillRow}>
          {project.tech.map((t) => (
            <span key={t} style={styles.pill}>{t}</span>
          ))}
        </div>

        {project.github && (
          <div style={styles.linkRow}>
            <span style={styles.cardLink}>GitHub ↗</span>
          </div>
        )}
      </div>
    </>
  )

  const cardStyle = {
    ...styles.card,
    borderColor: hovered ? 'rgba(201,169,110,0.25)' : 'var(--border)',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    textDecoration: 'none',
    display: 'block',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: project.github ? 'pointer' : 'default' }}
    >
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={cardStyle}
        >
          {cardContent}
        </a>
      ) : (
        <div style={{ ...styles.card, borderColor: hovered ? 'rgba(201,169,110,0.25)' : 'var(--border)', transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}>
          {cardContent}
        </div>
      )}
    </motion.div>
  )
}

/* ── Image with Fallback ────────────────────────────── */
function ImageWithFallback({ src, title }: { src: string; title: string }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div style={styles.placeholder}>
        <span style={styles.placeholderText}>{title}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
      loading="eager"
      style={{ objectFit: 'cover', objectPosition: 'top' }}
      onError={() => setErrored(true)}
    />
  )
}

/* ── Browser Frame ──────────────────────────────────── */
function BrowserFrame({ image, title }: { image: string; title: string }) {
  return (
    <div style={styles.browserOuter}>
      <div style={styles.browserBar}>
        <span style={{ ...styles.trafficDot, background: '#ff5f57' }} />
        <span style={{ ...styles.trafficDot, background: '#febc2e' }} />
        <span style={{ ...styles.trafficDot, background: '#28c840' }} />
        <div style={styles.urlBar}>
          <span style={styles.urlText}>{title.toLowerCase().replace(/\s+/g, '')}.app</span>
        </div>
      </div>
      <div style={styles.browserScreen}>
        <ImageWithFallback src={image} title={title} />
      </div>
    </div>
  )
}

/* ── Phone Frame ────────────────────────────────────── */
function PhoneFrame({ image, title }: { image: string; title: string }) {
  return (
    <div style={styles.phoneOuter}>
      <div style={styles.phoneNotch} />
      <div style={styles.phoneScreen}>
        <ImageWithFallback src={image} title={title} />
      </div>
      <div style={styles.phoneHomeBar} />
    </div>
  )
}

/* ── Card Link ──────────────────────────────────────── */
function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.cardLink}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')
      }
    >
      {label}
    </a>
  )
}

/* ── Styles ─────────────────────────────────────────── */
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
  tabRow: {
    display: 'flex',
    gap: '0',
    marginTop: '2.2rem',
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid transparent',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 400,
    letterSpacing: '0.06em',
    padding: '0.5rem 1.4rem 0.5rem 0',
    marginRight: '1.5rem',
    transition: 'color 0.25s, border-color 0.25s',
  },
  divider: {
    width: '100%',
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
    margin: '0 0 2.5rem',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
    cursor: 'default',
  },
  cardBody: {
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.25rem',
    fontWeight: 400,
    fontStyle: 'italic',
    color: 'var(--white)',
  },
  cardDesc: {
    fontSize: '0.78rem',
    color: 'var(--cream-dim)',
    lineHeight: 1.75,
  },
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
    marginTop: '0.2rem',
  },
  pill: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.62rem',
    color: 'var(--gold)',
    background: 'rgba(201,169,110,0.1)',
    border: '1px solid rgba(201,169,110,0.2)',
    padding: '0.2rem 0.55rem',
    borderRadius: '2px',
    letterSpacing: '0.04em',
  },
  linkRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.3rem',
  },
  cardLink: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.68rem',
    color: 'var(--muted)',
    textDecoration: 'none',
    transition: 'color 0.25s',
    letterSpacing: '0.04em',
  },
  browserOuter: {
    background: '#1a1a18',
    borderBottom: '1px solid var(--border)',
    borderRadius: '6px 6px 0 0',
    overflow: 'hidden',
  },
  browserBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 10px',
    background: '#1e1e1c',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  trafficDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'block',
  },
  urlBar: {
    flex: 1,
    marginLeft: '8px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '3px',
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
  },
  urlText: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.6rem',
    color: 'var(--muted)',
    letterSpacing: '0.03em',
  },
  browserScreen: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
  },
  phoneOuter: {
    background: '#1e1e1c',
    borderRadius: '24px 24px 0 0',
    margin: '1rem auto 0',
    width: '80%',
    maxWidth: '220px',
    border: '2px solid rgba(255,255,255,0.08)',
    borderBottom: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '8px',
  },
  phoneNotch: {
    width: '60px',
    height: '6px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '0 0 6px 6px',
    margin: '6px auto 4px',
    flexShrink: 0,
  },
  phoneScreen: {
    position: 'relative',
    width: '100%',
    aspectRatio: '9/16',
    overflow: 'hidden',
    background: '#0c0c0b',
  },
  phoneHomeBar: {
    width: '40px',
    height: '3px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '2px',
    margin: '6px auto 0',
    flexShrink: 0,
  },
  placeholder: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #171715 0%, #1e1e1a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  placeholderText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
    fontSize: '0.9rem',
    color: 'rgba(201,169,110,0.3)',
    letterSpacing: '0.05em',
  },
}