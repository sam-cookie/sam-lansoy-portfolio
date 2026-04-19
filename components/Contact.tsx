'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return

    setStatus('sending')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'sdlansoy@up.edu.ph',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focusedField === name ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`,
    color: 'var(--white)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    padding: '0.75rem 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    letterSpacing: '0.02em',
    boxSizing: 'border-box',
  })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem clamp(1.5rem, 6vw, 5rem)',
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(200px, 35%, 380px) 1fr',
            gap: 'clamp(3rem, 8vw, 8rem)',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p style={styles.label}>// contact me</p>
            <h2 style={styles.title}>Let&apos;s talk.</h2>
            <p style={styles.blurb}>
              Have a project in mind, a question, or just want to say hi?
              Send me a message and I&apos;ll get back to you.
            </p>
            <a
              href="mailto:sdlansoy@up.edu.ph"
              style={styles.emailLink}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.3)')
              }
            >
              sdlansoy@up.edu.ph
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <p style={styles.sentHeading}>Message sent.</p>
                <p style={styles.sentSub}>
                  Thanks for reaching out! I&apos;ll get back to you as soon as I can.
                </p>
                <button onClick={() => setStatus('idle')} style={styles.sendAnother}>
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={styles.fieldLabel}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      required
                      style={{ ...fieldStyle('name'), caretColor: 'var(--gold)' }}
                    />
                  </div>
                  <div>
                    <label style={styles.fieldLabel}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      required
                      style={{ ...fieldStyle('email'), caretColor: 'var(--gold)' }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={styles.fieldLabel}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="What's this about?"
                    required
                    style={{ ...fieldStyle('subject'), caretColor: 'var(--gold)' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={styles.fieldLabel}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="What's on your mind?"
                    required
                    rows={5}
                    style={{
                      ...fieldStyle('message'),
                      resize: 'none',
                      display: 'block',
                      caretColor: 'var(--gold)',
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.68rem',
                    color: '#e07070',
                    letterSpacing: '0.04em',
                  }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={styles.submitBtn}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement
                      btn.style.background = 'rgba(201,169,110,0.1)'
                      btn.style.borderColor = 'var(--gold)'
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement
                      btn.style.background = 'none'
                      btn.style.borderColor = 'rgba(201,169,110,0.4)'
                    }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        #contact input::placeholder,
        #contact textarea::placeholder {
          color: rgba(255,255,255,0.18);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
        }
        #contact input,
        #contact textarea {
          color-scheme: dark;
        }
        @media (max-width: 700px) {
          #contact .name-email-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

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
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: 300,
    color: 'var(--white)',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
  },
  blurb: {
    fontSize: '0.78rem',
    color: 'var(--muted)',
    fontFamily: "'DM Mono', monospace",
    lineHeight: 1.8,
    marginBottom: '2rem',
  },
  emailLink: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.7rem',
    color: 'var(--gold)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    borderBottom: '1px solid rgba(201,169,110,0.3)',
    paddingBottom: '2px',
    transition: 'border-color 0.3s',
  },
  fieldLabel: {
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: '0.5rem',
    opacity: 0.7,
  },
  submitBtn: {
    background: 'none',
    border: '1px solid rgba(201,169,110,0.4)',
    color: 'var(--gold)',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '0.75rem 2rem',
    cursor: 'pointer',
    transition: 'background 0.3s, border-color 0.3s',
    borderRadius: '2px',
  },
  sentHeading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'var(--gold)',
  },
  sentSub: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    color: 'var(--muted)',
    lineHeight: 1.7,
  },
  sendAnother: {
    marginTop: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.68rem',
    color: 'var(--muted)',
    letterSpacing: '0.06em',
    textDecoration: 'underline',
    padding: 0,
    textAlign: 'left',
  },
}