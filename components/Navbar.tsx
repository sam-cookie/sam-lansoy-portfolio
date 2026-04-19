'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'home',        href: '#home' },
  { label: 'about me',    href: '#about' },
  { label: 'my projects', href: '#projects' },
  { label: 'contact me',  href: '#contact' },
]

export default function Navbar() {
  const [active, setActive]   = useState('home')
  const [menuOpen, setMenu]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // If at (or near) the bottom of the page, force 'contact' active
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
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        background: scrolled
          ? 'rgba(12,12,11,0.85)'
          : 'rgba(12,12,11,0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); handleNav('#home') }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.05rem',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'var(--cream)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Sam Lansoy
      </a>

      {/* Desktop links */}
      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
        }}
        className="desktop-nav"
      >
        {NAV_LINKS.map((link) => {
          const id = link.href.replace('#', '')
          const isActive = active === id
          return (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: ';lowercase',
                  color: isActive ? 'var(--gold)' : 'var(--cream-dim)',
                  padding: '2px 0',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    height: '1px',
                    width: isActive ? '100%' : '0%',
                    background: 'var(--gold)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenu(!menuOpen)}
        className="mobile-toggle"
        aria-label="Toggle menu"
        style={{
          display: 'none',
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
              background: 'var(--cream-dim)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0, right: 0,
            background: 'rgba(12,12,11,0.97)',
            backdropFilter: 'blur(20px)',
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: active === id ? 'var(--gold)' : 'var(--cream-dim)',
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
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}