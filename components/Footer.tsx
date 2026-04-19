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
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--cream-dim)',
        }}
      >
        Sam Lansoy
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--muted)',
        }}
      >
        © {new Date().getFullYear()} — fueled by with passion
      </span>
    </footer>
  )
}