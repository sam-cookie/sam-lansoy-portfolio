'use client'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1.8rem clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        background: '#FAFAF7',
      }}
    >
      <span
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#18181B',
        }}
      >
        Sam Lansoy
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: '#A1A1AA',
        }}
      >
        &copy; {new Date().getFullYear()} &mdash; built with passion
      </span>
    </footer>
  )
}
