'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Magnetic from './Magnetic'

const NAV_LINKS = [
  { label: 'home',        href: '#home' },
  { label: 'about me',    href: '#about' },
  { label: 'my projects', href: '#projects' },
  { label: 'contact me',  href: '#contact' },
]

export default function Navbar() {
  const [active, setActive]     = useState('home')
  const [menuOpen, setMenu]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10

      if (atBottom) {
        setActive('contact')
        return
      }

      let current = 'home'
      sections.forEach((sec) => {
        if (window.scrollY >= (sec as HTMLElement).offsetTop - 100) {
          current = sec.getAttribute('id') ?? 'home'
        }
      })
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenu(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Logo / Name */}
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); handleNav('#home') }}
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: '1.05rem',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'var(--text)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Sam Lansoy
      </a>

      {/* Desktop links + toggle */}
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.href}>
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => handleNav(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      textTransform: 'lowercase',
                      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                      padding: '2px 0',
                      position: 'relative',
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.label}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1px',
                        width: isActive ? '100%' : '0%',
                        background: 'var(--accent)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </button>
                </Magnetic>
              </li>
            )
          })}
        </ul>

        <ThemeToggle />
      </div>

      {/* Mobile: toggle + hamburger */}
      <div
        className="mobile-controls"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <ThemeToggle />
        <button
          onClick={() => setMenu(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'var(--hamburger)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'var(--nav-bg-solid)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem clamp(1.5rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'lowercase',
                  color: active === id ? 'var(--accent)' : 'var(--text-muted)',
                  textAlign: 'left',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </button>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
