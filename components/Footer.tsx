'use client'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1.8rem clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        background: 'var(--bg)',
        transition: 'background 0.4s ease',
      }}
    >
      <span
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--text)',
        }}
      >
        Sam Lansoy
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
        }}
      >
        &copy; {new Date().getFullYear()} &mdash; built with passion
      </span>
    </footer>
  )
}
