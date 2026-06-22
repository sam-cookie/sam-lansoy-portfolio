'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ── Types ─────────────────────────────────────────── */
type Project = {
  id: string
  title: string
  description: string
  overview: string
  tech: string[]
  image: string
  github?: string
  type: 'web' | 'mobile' | 'game'
  highlights: string[]
  role: string
  year: string
}

/* ── Data ──────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'platemate',
    title: 'Platemate',
    description: 'A recipe sharing platform for home cooks and foodies.',
    overview:
      'A full-stack recipe sharing platform where users can create, browse, and share their favorite recipes. Built with PHP and SQL with a focus on intuitive design and a seamless cooking community experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
    image: '/project/platemate.png',
    github: 'https://github.com/iskwipi/126-final-project',
    type: 'web',
    highlights: [
      'Full CRUD recipe management system',
      'PHP backend with relational SQL database',
      'Responsive community-driven interface',
    ],
    role: 'Full Stack Developer',
    year: '2024',
  },
  {
    id: 'humana',
    title: 'Humana',
    description: 'Real-time collaborative to-do list with multi-user support.',
    overview:
      'A productivity-focused to-do application supporting real-time collaboration between multiple users. Built as a solo project using Flask and SQLite, emphasizing clean architecture and reliable data persistence.',
    tech: ['Python', 'Flask', 'SQLite'],
    image: '/project/humana.png',
    github: 'https://github.com/sam-cookie/cmsc128-indivProject_Lansoy',
    type: 'web',
    highlights: [
      'Real-time multi-user task collaboration',
      'Flask REST API with SQLite persistence',
      'Built entirely as an individual project',
    ],
    role: 'Solo Developer',
    year: '2024',
  },
  {
    id: 'lostnfound',
    title: 'Lost & Found',
    description: 'Community platform for recovering and reuniting lost items.',
    overview:
      'A community-driven platform connecting people who\'ve lost items with those who\'ve found them. Built on the FERN stack with real-time Firebase updates, photo uploads, and location-based discovery.',
    tech: ['Firebase', 'Express', 'React', 'Node.js'],
    image: '/project/lostnfound.png',
    github: 'https://github.com/juliaconts/CMSC129-Lab1-ContrerasJL_LansoySL',
    type: 'web',
    highlights: [
      'FERN stack architecture',
      'Real-time updates via Firebase',
      'Photo uploads and geolocation features',
    ],
    role: 'Full Stack Developer',
    year: '2024',
  },
  {
    id: 'upvorghub',
    title: 'UPV Org Hub',
    description: 'Student organization discovery and management for UPV.',
    overview:
      'A comprehensive web app for UPV students to explore and manage student organizations. Features Hubby, an AI-powered chatbot that helps users navigate orgs, answer FAQs, and perform operations through natural conversation.',
    tech: ['Laravel', 'Blade', 'PHP', 'PostgreSQL'],
    image: '/project/upvorghub.png',
    github: 'https://github.com/CMSC129-LABS/CMSC129-Lab3-ContrerasJL_LansoySLD',
    type: 'web',
    highlights: [
      'AI chatbot assistant for natural language interaction',
      'Laravel MVC with Blade templating',
      'PostgreSQL with complex relational queries',
    ],
    role: 'Full Stack Developer',
    year: '2025',
  },
  {
    id: 'agap',
    title: 'AGAP',
    description: 'Emergency response app bridging residents and MDRRMO responders.',
    overview:
      'A mobile emergency response app for Miagao, connecting residents in need with MDRRMO personnel. Features real-time incident reporting, responder dispatch, and status tracking for faster emergency response.',
    tech: ['Flutter', 'Dart', 'Supabase'],
    image: '/project/agap.png',
    github: 'https://github.com/AGAP-by-tomBYTES/AGAP',
    type: 'mobile',
    highlights: [
      'Real-time emergency dispatch system',
      'Supabase backend with live status tracking',
      'Role-based access for residents and responders',
    ],
    role: 'Mobile Developer',
    year: '2025',
  },
  {
    id: 'thegradeescape',
    title: 'The Grade Escape',
    description: 'Class records manager with notebook aesthetics and Firebase sync.',
    overview:
      'A Flutter app that helps students manage class records with a unique handwritten notebook aesthetic. Tracks grades with dynamic weighted calculations and real-time Firebase synchronization across devices.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    image: '/project/thegradeescape.png',
    type: 'mobile',
    highlights: [
      'Handwritten notebook-style UI design',
      'Dynamic weighted grade calculation engine',
      'Real-time cross-device sync via Firebase',
    ],
    role: 'Mobile Developer',
    year: '2024',
  },
  {
    id: 'fins',
    title: 'Fins',
    description: 'Cross-platform finance app with AI-assisted decision support.',
    overview:
      'A personal finance app combining expense tracking, budget management, and visual analytics. Includes offline receipt reading via camera and an AI-assisted advisor for smarter financial decisions.',
    tech: ['Flutter', 'Dart', 'SQLite'],
    image: '/project/fins.png',
    github: 'https://github.com/aalaserna/CMSC128_FinTracker',
    type: 'mobile',
    highlights: [
      'Offline receipt scanning and parsing',
      'AI-powered financial decision support',
      'Cross-platform analytics dashboard',
    ],
    role: 'Mobile Developer',
    year: '2024',
  },
  {
    id: 'matchymatchy',
    title: 'Matchy Matchy',
    description: 'Memory card matching game with performance tracking.',
    overview:
      'A classic memory card matching game built with Flutter. Players flip cards to find matching pairs while the app tracks their fastest completion time — all running entirely offline with zero backend dependencies.',
    tech: ['Flutter', 'Dart'],
    image: '/project/matchymatchy.png',
    github: 'https://github.com/juliaconts/156midterms_matchymatchy',
    type: 'game',
    highlights: [
      'Memory card matching with flip animations',
      'Performance tracking with best-time records',
      'Fully offline — zero backend dependency',
    ],
    role: 'Game Developer',
    year: '2024',
  },
  {
    id: 'ctrlbit',
    title: 'CTRL+BIT',
    description: 'Educational maze game teaching Assembly through gameplay.',
    overview:
      'A 2D educational maze game that teaches Assembly language mnemonics through gameplay. Every run generates a unique maze using DFS with backtracking, creating endless replayability while making low-level concepts accessible.',
    tech: ['C', 'RayLib'],
    image: '/project/ctrlbit.png',
    github: 'https://github.com/casjrn/Ctrl-Bit-Game',
    type: 'game',
    highlights: [
      'Procedural maze generation via DFS backtracking',
      'Assembly mnemonics taught through gameplay',
      'Built in C with RayLib graphics library',
    ],
    role: 'Game Developer',
    year: '2024',
  },
]

const TABS = [
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'game', label: 'Games' },
] as const

type TabKey = (typeof TABS)[number]['key']

/* ── Design Tokens ─────────────────────────────────── */
const C = {
  bg: '#FAFAF7',
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

const F = {
  serif: "'Instrument Serif', Georgia, serif",
  body: "'Sora', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

/* ── Main Component ────────────────────────────────── */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<TabKey>('web')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const filtered = PROJECTS.filter((p) => p.type === activeTab)
  const selectedProject = PROJECTS.find((p) => p.id === selectedId) ?? filtered[0] ?? null

  useEffect(() => {
    const first = PROJECTS.filter((p) => p.type === activeTab)[0]
    setSelectedId(first?.id ?? null)
  }, [activeTab])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .projects-split { flex-direction: column !important; }
          .projects-preview { display: none !important; }
          .projects-mobile { display: block !important; }
          .projects-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .projects-mobile { display: none !important; }
        }
      `}</style>

      <section
        id="projects"
        ref={ref}
        style={{ padding: '7rem clamp(1.5rem, 6vw, 5rem)', background: C.bg }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Title */}
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
            Projects
          </motion.h2>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', marginTop: '2rem' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom:
                    activeTab === tab.key
                      ? `2px solid ${C.accent}`
                      : '2px solid transparent',
                  cursor: 'pointer',
                  fontFamily: F.body,
                  fontSize: '0.82rem',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: activeTab === tab.key ? C.accent : C.textMuted,
                  padding: '0.5rem 0',
                  marginRight: '2rem',
                  transition: 'color 0.25s, border-color 0.25s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: C.border }} />

          {/* Desktop: Split layout */}
          <div
            className="projects-split"
            style={{
              display: 'flex',
              gap: '3.5rem',
              alignItems: 'flex-start',
              marginTop: '0.5rem',
            }}
          >
            {/* Left column: project list */}
            <div className="projects-desktop" style={{ flex: '0 0 46%', minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {filtered.map((project, index) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      index={index}
                      isSelected={selectedProject?.id === project.id}
                      onSelect={() => setSelectedId(project.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right column: sticky preview */}
            <div
              className="projects-preview"
              style={{
                flex: 1,
                position: 'sticky',
                top: 96,
                alignSelf: 'flex-start',
                minHeight: 300,
              }}
            >
              {selectedProject && (
                <PreviewPanel project={selectedProject} />
              )}
            </div>
          </div>

          {/* Mobile: accordion list */}
          <div className="projects-mobile" style={{ display: 'none', marginTop: '0.5rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {filtered.map((project, index) => (
                  <MobileAccordionRow
                    key={project.id}
                    project={project}
                    index={index}
                    isExpanded={selectedId === project.id}
                    onToggle={() =>
                      setSelectedId(selectedId === project.id ? null : project.id)
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Project Row (Desktop Left Column) ─────────────── */
function ProjectRow({
  project,
  index,
  isSelected,
  onSelect,
}: {
  project: Project
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const active = isSelected || hovered
  const number = String(index + 1).padStart(2, '0')

  return (
    <div
      onMouseEnter={() => {
        setHovered(true)
        onSelect()
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        position: 'relative',
        padding: '1.6rem 0 1.6rem 1.2rem',
        borderBottom: `1px solid ${C.border}`,
        background: active ? C.accentSoft : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.25s ease',
      }}
    >
      {/* Oversized faded number */}
      <span
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: F.serif,
          fontSize: '5.5rem',
          fontWeight: 400,
          color: C.text,
          opacity: 0.03,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {number}
      </span>

      {/* Left violet accent line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '0.8rem',
          bottom: '0.8rem',
          width: 3,
          background: C.accent,
          borderRadius: 2,
          opacity: active ? 1 : 0,
          transform: active ? 'scaleY(1)' : 'scaleY(0.3)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: F.serif,
              fontSize: '1.25rem',
              fontWeight: 400,
              color: active ? C.text : C.text,
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily: F.mono,
              fontSize: '0.6rem',
              color: C.textMuted,
              letterSpacing: '0.06em',
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: F.body,
            fontSize: '0.78rem',
            color: C.textMuted,
            lineHeight: 1.6,
            marginTop: '0.3rem',
            marginBottom: '0.5rem',
          }}
        >
          {project.description}
        </p>

        {/* Tech */}
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.62rem',
            color: active ? C.accent : C.textMuted,
            letterSpacing: '0.02em',
            transition: 'color 0.25s ease',
          }}
        >
          {project.tech.join(' · ')}
        </span>
      </motion.div>
    </div>
  )
}

/* ── Preview Panel (Desktop Right Column) ──────────── */
function PreviewPanel({ project }: { project: Project }) {
  return (
    <div
      style={{
        borderTop: `3px solid ${C.accent}`,
        background: C.bg,
        borderRadius: '0 0 8px 8px',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ padding: '1.5rem' }}
        >
          <ProjectDetail project={project} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── Project Detail (shared content) ───────────────── */
function ProjectDetail({ project, compact }: { project: Project; compact?: boolean }) {
  const isPhone = project.type === 'mobile' || project.type === 'game'

  return (
    <>
      {/* Device Frame + Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <DeviceFrame type={project.type} image={project.image} title={project.title} />
      </motion.div>

      {/* Header: title + badge + year */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginTop: '1.4rem',
          flexWrap: 'wrap',
        }}
      >
        <h3
          style={{
            fontFamily: F.serif,
            fontSize: compact ? '1.1rem' : '1.35rem',
            fontWeight: 400,
            color: C.text,
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.58rem',
            color: C.accent,
            background: C.accentSoft,
            border: `1px solid ${C.accentBorder}`,
            padding: '0.15rem 0.5rem',
            borderRadius: '2px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {project.type}
        </span>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.6rem',
            color: C.textMuted,
            letterSpacing: '0.04em',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Overview */}
      <p
        style={{
          fontFamily: F.body,
          fontSize: compact ? '0.8rem' : '0.85rem',
          color: C.textMid,
          lineHeight: 1.75,
          marginTop: '0.8rem',
        }}
      >
        {project.overview}
      </p>

      {/* Highlights */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
        }}
      >
        {project.highlights.map((h, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}
            style={{
              fontFamily: F.body,
              fontSize: compact ? '0.75rem' : '0.8rem',
              color: C.textMid,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                color: C.accent,
                fontSize: '0.5rem',
                lineHeight: '1.5',
                marginTop: '0.15em',
                flexShrink: 0,
              }}
            >
              ●
            </span>
            {h}
          </motion.li>
        ))}
      </ul>

      {/* Role */}
      <div style={{ marginTop: '1rem' }}>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.62rem',
            color: C.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Role:
        </span>{' '}
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.62rem',
            color: C.textMid,
            letterSpacing: '0.04em',
          }}
        >
          {project.role}
        </span>
      </div>

      {/* Tech pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          marginTop: '1rem',
        }}
      >
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 + i * 0.03 }}
            style={{
              fontFamily: F.mono,
              fontSize: '0.6rem',
              color: C.accent,
              background: C.accentSoft,
              border: `1px solid ${C.accentBorder}`,
              padding: '0.2rem 0.55rem',
              borderRadius: '2px',
              letterSpacing: '0.03em',
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* GitHub link */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '1.2rem',
            fontFamily: F.mono,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            color: C.accent,
            textDecoration: 'none',
            border: `1px solid ${C.accentBorder}`,
            padding: '0.5rem 1rem',
            borderRadius: '2px',
            background: 'transparent',
            transition: 'all 0.25s ease',
          }}
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
          View on GitHub →
        </a>
      )}
    </>
  )
}

/* ── Device Frame ──────────────────────────────────── */
function DeviceFrame({
  type,
  image,
  title,
}: {
  type: 'web' | 'mobile' | 'game'
  image: string
  title: string
}) {
  if (type === 'web') {
    return (
      <div
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          border: `1px solid ${C.border}`,
          background: '#fff',
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            height: 32,
            background: '#F5F5F3',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 6,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA42' }} />
          <div
            style={{
              flex: 1,
              marginLeft: 10,
              height: 16,
              borderRadius: 4,
              background: 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: '0.55rem',
                color: C.textMuted,
              }}
            >
              {title.toLowerCase().replace(/\s+/g, '')}.app
            </span>
          </div>
        </div>
        {/* Screenshot */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    )
  }

  // Phone frame for mobile / game
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '55%',
          maxWidth: 200,
          borderRadius: 20,
          overflow: 'hidden',
          border: '2px solid rgba(0,0,0,0.08)',
          background: '#1a1a1a',
          padding: 6,
        }}
      >
        {/* Notch */}
        <div
          style={{
            width: 50,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.12)',
            margin: '4px auto 6px',
          }}
        />
        {/* Screenshot */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '9/16',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="200px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        {/* Home bar */}
        <div
          style={{
            width: 36,
            height: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.15)',
            margin: '6px auto 2px',
          }}
        />
      </div>
    </div>
  )
}

/* ── Mobile Accordion Row ──────────────────────────── */
function MobileAccordionRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ borderBottom: `1px solid ${C.border}` }}
    >
      {/* Row header (tap to expand) */}
      <div
        onClick={onToggle}
        style={{
          position: 'relative',
          padding: '1.4rem 0 1.4rem 1rem',
          cursor: 'pointer',
          background: isExpanded ? C.accentSoft : 'transparent',
          transition: 'background 0.25s ease',
        }}
      >
        {/* Left accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '0.6rem',
            bottom: '0.6rem',
            width: 3,
            background: C.accent,
            borderRadius: 2,
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'scaleY(1)' : 'scaleY(0.3)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontFamily: F.mono, fontSize: '0.65rem', color: C.textMuted }}>
            {number}
          </span>
          <span style={{ fontFamily: F.serif, fontSize: '1.15rem', fontWeight: 400, color: C.text }}>
            {project.title}
          </span>
          <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: C.textMuted }}>
            {project.year}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: F.body,
              fontSize: '0.85rem',
              color: C.accent,
              transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
            }}
          >
            +
          </span>
        </div>

        <p
          style={{
            fontFamily: F.body,
            fontSize: '0.75rem',
            color: C.textMuted,
            lineHeight: 1.5,
            marginTop: '0.25rem',
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 0 1.5rem 1rem' }}>
              <ProjectDetail project={project} compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
