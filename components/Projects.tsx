'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import TextScramble from './TextScramble'

/* -- Types ------------------------------------------------ */
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

/* -- Data ------------------------------------------------- */
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
      "A community-driven platform connecting people who've lost items with those who've found them. Built on the FERN stack with real-time Firebase updates, photo uploads, and location-based discovery.",
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

const F = {
  serif: "'Instrument Serif', Georgia, serif",
  body: "'Sora', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

/* -- Coverflow variants ----------------------------------- */
const makeSwingVariants = (angle: number) => ({
  enter: (dir: number) => ({
    opacity: 0,
    rotateY: dir * angle,
    scale: 0.93,
  }),
  center: { opacity: 1, rotateY: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    rotateY: dir * -angle,
    scale: 0.93,
  }),
})

const DESKTOP_VARIANTS = makeSwingVariants(32)
const MOBILE_VARIANTS = makeSwingVariants(16)

/* -- Main Component --------------------------------------- */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<TabKey>('web')
  const [selectedId, setSelectedId] = useState<string>(
    PROJECTS.find((p) => p.type === 'web')?.id ?? ''
  )
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const filtered = PROJECTS.filter((p) => p.type === activeTab)
  const selectedProject = filtered.find((p) => p.id === selectedId) ?? filtered[0]
  const selectedIndex = filtered.findIndex((p) => p.id === selectedProject?.id)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleTabChange = useCallback(
    (tab: TabKey) => {
      const first = PROJECTS.find((p) => p.type === tab)
      setDirection(1)
      setActiveTab(tab)
      setSelectedId(first?.id ?? '')
    },
    [],
  )

  const navigateTo = useCallback(
    (newId: string) => {
      const currentIdx = filtered.findIndex((p) => p.id === selectedId)
      const newIdx = filtered.findIndex((p) => p.id === newId)
      setDirection(newIdx >= currentIdx ? 1 : -1)
      setSelectedId(newId)
    },
    [filtered, selectedId],
  )

  const goNext = useCallback(() => {
    const idx = filtered.findIndex((p) => p.id === selectedProject?.id)
    const next = filtered[(idx + 1) % filtered.length]
    if (next) { setDirection(1); setSelectedId(next.id) }
  }, [filtered, selectedProject])

  const goPrev = useCallback(() => {
    const idx = filtered.findIndex((p) => p.id === selectedProject?.id)
    const prev = filtered[(idx - 1 + filtered.length) % filtered.length]
    if (prev) { setDirection(-1); setSelectedId(prev.id) }
  }, [filtered, selectedProject])

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: '7rem clamp(1.5rem, 6vw, 5rem)',
        background: 'var(--bg)',
        transition: 'background 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <TextScramble
            text="Projects"
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
              onClick={() => handleTabChange(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom:
                  activeTab === tab.key
                    ? '2px solid var(--accent)'
                    : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: F.body,
                fontSize: '0.82rem',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
                padding: '0.5rem 0',
                marginRight: '2rem',
                transition: 'color 0.25s, border-color 0.25s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div style={{ width: '100%', height: 1, background: 'var(--border)' }} />

        {isMobile ? (
          /* ---- Mobile: compact list + swipeable preview below ---- */
          <div style={{ marginTop: '0.5rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {filtered.map((project, index) => (
                  <MobileProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    isSelected={selectedProject?.id === project.id}
                    onSelect={() => navigateTo(project.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {selectedProject && (
              <div style={{ marginTop: '1.5rem' }}>
                <CoverflowPanel
                  project={selectedProject}
                  direction={direction}
                  index={selectedIndex}
                  total={filtered.length}
                  onPrev={goPrev}
                  onNext={goNext}
                  isMobile
                />
              </div>
            )}
          </div>
        ) : (
          /* ---- Desktop: split list + sticky preview ---- */
          <div
            style={{
              display: 'flex',
              gap: '3.5rem',
              alignItems: 'flex-start',
              marginTop: '0.5rem',
            }}
          >
            {/* Left column */}
            <div style={{ flex: '0 0 46%', minWidth: 0 }}>
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
                      onSelect={() => navigateTo(project.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right column: sticky coverflow preview */}
            <div
              style={{
                flex: 1,
                position: 'sticky',
                top: 96,
                alignSelf: 'flex-start',
                minHeight: 300,
              }}
            >
              {selectedProject && (
                <CoverflowPanel
                  project={selectedProject}
                  direction={direction}
                  index={selectedIndex}
                  total={filtered.length}
                  onPrev={goPrev}
                  onNext={goNext}
                  isMobile={false}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* -- Coverflow Preview Panel ----------------------------- */
function CoverflowPanel({
  project,
  direction,
  index,
  total,
  onPrev,
  onNext,
  isMobile,
}: {
  project: Project
  direction: number
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  isMobile: boolean
}) {
  const touchStartX = useRef(0)
  const variants = isMobile ? MOBILE_VARIANTS : DESKTOP_VARIANTS
  const dur = isMobile ? 0.22 : 0.35

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      dx < 0 ? onNext() : onPrev()
    }
  }

  return (
    <div
      style={{
        borderTop: '3px solid var(--accent)',
        background: 'var(--bg)',
        borderRadius: '0 0 8px 8px',
      }}
    >
      {/* Nav bar: arrows + counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1rem 0',
        }}
      >
        <ArrowBtn onClick={onPrev} label="Previous project" direction="left" />
        <span
          style={{
            fontFamily: F.mono,
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <ArrowBtn onClick={onNext} label="Next project" direction="right" />
      </div>

      {/* 3D swing area */}
      <div
        style={{ perspective: '900px', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: dur,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              padding: '1rem 1.2rem 1.5rem',
              maxHeight: isMobile ? 'none' : 'calc(100vh - 180px)',
              overflowY: isMobile ? 'visible' : 'auto',
            }}
          >
            <ProjectDetail project={project} compact={isMobile} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* -- Arrow Button ---------------------------------------- */
function ArrowBtn({
  onClick,
  label,
  direction,
}: {
  onClick: () => void
  label: string
  direction: 'left' | 'right'
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '2px',
        color: 'var(--text-muted)',
        fontFamily: F.mono,
        fontSize: '0.7rem',
        padding: '0.3rem 0.65rem',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget
        b.style.color = 'var(--accent)'
        b.style.borderColor = 'var(--accent-border)'
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget
        b.style.color = 'var(--text-muted)'
        b.style.borderColor = 'var(--border)'
      }}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  )
}

/* -- Desktop Project Row --------------------------------- */
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
      onMouseEnter={() => { setHovered(true); onSelect() }}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        position: 'relative',
        padding: '1.6rem 0 1.6rem 1.2rem',
        borderBottom: '1px solid var(--border)',
        background: active ? 'var(--accent-soft)' : 'transparent',
        cursor: 'pointer',
        zIndex: isSelected ? 2 : 1,
        // Elevation on selected: slight scale + shadow
        transform: isSelected && !hovered ? 'scale(1.012) translateZ(0)' : 'scale(1)',
        boxShadow: isSelected && !hovered
          ? '0 2px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)'
          : 'none',
        transition: 'background 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease',
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
          color: 'var(--text)',
          opacity: 0.03,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {number}
      </span>

      {/* Left accent line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '0.8rem',
          bottom: '0.8rem',
          width: 3,
          background: 'var(--accent)',
          borderRadius: 2,
          opacity: active ? 1 : 0,
          transform: active ? 'scaleY(1)' : 'scaleY(0.3)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span style={{ fontFamily: F.serif, fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)' }}>
            {project.title}
          </span>
          <span style={{ fontFamily: F.mono, fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            {project.year}
          </span>
        </div>
        <p style={{ fontFamily: F.body, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.3rem', marginBottom: '0.5rem' }}>
          {project.description}
        </p>
        <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: active ? 'var(--accent)' : 'var(--text-muted)', letterSpacing: '0.02em', transition: 'color 0.25s ease' }}>
          {project.tech.join(' · ')}
        </span>
      </motion.div>
    </div>
  )
}

/* -- Mobile Compact Row ---------------------------------- */
function MobileProjectRow({
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
  const number = String(index + 1).padStart(2, '0')
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onSelect}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.9rem 0.75rem 0.9rem 1rem',
        borderBottom: '1px solid var(--border)',
        background: isSelected ? 'var(--accent-soft)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
    >
      {/* Left accent */}
      <div style={{
        position: 'absolute', left: 0, top: '0.6rem', bottom: '0.6rem',
        width: 3, background: 'var(--accent)', borderRadius: 2,
        opacity: isSelected ? 1 : 0, transform: isSelected ? 'scaleY(1)' : 'scaleY(0.3)',
        transition: 'opacity 0.2s, transform 0.2s',
      }} />

      <span style={{ fontFamily: F.mono, fontSize: '0.6rem', color: 'var(--text-muted)', flexShrink: 0 }}>
        {number}
      </span>
      <span style={{ fontFamily: F.serif, fontSize: '1.05rem', fontWeight: 400, color: 'var(--text)', flex: 1 }}>
        {project.title}
      </span>
      <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: isSelected ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 0.2s' }}>
        {project.year}
      </span>
    </motion.div>
  )
}

/* -- Project Detail (card content) ----------------------- */
function ProjectDetail({ project, compact }: { project: Project; compact?: boolean }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <DeviceFrame type={project.type} image={project.image} title={project.title} />
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontFamily: F.serif, fontSize: compact ? '1.1rem' : '1.35rem', fontWeight: 400, color: 'var(--text)', margin: 0 }}>
          {project.title}
        </h3>
        <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: 'var(--accent)', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', padding: '0.15rem 0.5rem', borderRadius: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {project.type}
        </span>
        <span style={{ fontFamily: F.mono, fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          {project.year}
        </span>
      </div>

      <p style={{ fontFamily: F.body, fontSize: compact ? '0.8rem' : '0.85rem', color: 'var(--text-mid)', lineHeight: 1.75, marginTop: '0.8rem' }}>
        {project.overview}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {project.highlights.map((h, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}
            style={{ fontFamily: F.body, fontSize: compact ? '0.75rem' : '0.8rem', color: 'var(--text-mid)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '0.5rem', lineHeight: '1.5', marginTop: '0.15em', flexShrink: 0 }}>●</span>
            {h}
          </motion.li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Role:</span>{' '}
        <span style={{ fontFamily: F.mono, fontSize: '0.62rem', color: 'var(--text-mid)', letterSpacing: '0.04em' }}>{project.role}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '1rem' }}>
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 + i * 0.03 }}
            style={{ fontFamily: F.mono, fontSize: '0.6rem', color: 'var(--accent)', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', padding: '0.2rem 0.55rem', borderRadius: '2px', letterSpacing: '0.03em' }}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.2rem', fontFamily: F.mono, fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--accent)', textDecoration: 'none', border: '1px solid var(--accent-border)', padding: '0.5rem 1rem', borderRadius: '2px', background: 'transparent', transition: 'all 0.25s ease' }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'var(--accent-soft)'; el.style.borderColor = 'var(--accent)' }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.borderColor = 'var(--accent-border)' }}
        >
          View on GitHub →
        </a>
      )}
    </>
  )
}

/* -- Device Frame ---------------------------------------- */
function DeviceFrame({ type, image, title }: { type: 'web' | 'mobile' | 'game'; image: string; title: string }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setTilt({
      rx: -((e.clientY - cy) / (rect.height / 2)) * 5,
      ry: ((e.clientX - cx) / (rect.width / 2)) * 5,
    })
  }

  const tiltStyle: React.CSSProperties = {
    transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
    transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.25s ease' : 'transform 0.4s ease-out, box-shadow 0.4s ease',
    boxShadow: isHovered ? `${-tilt.ry * 2}px ${-tilt.rx * 2}px 30px rgba(0,0,0,0.12)` : 'none',
  }

  if (type === 'web') {
    return (
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setIsHovered(false) }}
        style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--card-bg)', ...tiltStyle }}
      >
        <div style={{ height: 32, background: 'var(--card-bar)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, borderBottom: '1px solid var(--border)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--dots-red)' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--dots-yellow)' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--dots-green)' }} />
          <div style={{ flex: 1, marginLeft: 10, height: 16, borderRadius: 4, background: 'var(--card-url-bg)', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
            <span style={{ fontFamily: F.mono, fontSize: '0.55rem', color: 'var(--text-muted)' }}>
              {title.toLowerCase().replace(/\s+/g, '')}.app
            </span>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 500px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setIsHovered(false) }}
        style={{ width: '55%', maxWidth: 200, borderRadius: 20, overflow: 'hidden', border: '2px solid var(--phone-frame-border)', background: 'var(--phone-frame-bg)', padding: 6, ...tiltStyle }}
      >
        <div style={{ width: 50, height: 4, borderRadius: 2, background: 'var(--phone-detail)', margin: '4px auto 6px' }} />
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', borderRadius: 12, overflow: 'hidden' }}>
          <Image src={image} alt={title} fill sizes="200px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'var(--phone-detail)', margin: '6px auto 2px' }} />
      </div>
    </div>
  )
}
