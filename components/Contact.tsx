'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import TextScramble from './TextScramble'
import Magnetic from './Magnetic'

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
    borderBottom: `1px solid ${focusedField === name ? 'var(--accent)' : 'var(--border)'}`,
    color: 'var(--text)',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.88rem',
    padding: '0.75rem 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
    caretColor: 'var(--accent)',
  })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem clamp(1.5rem, 6vw, 5rem)',
        background: 'var(--bg-alt)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '35% 65%',
            gap: 'clamp(3rem, 8vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <TextScramble
              text="Let's talk."
              as="h2"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            />
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              Have a project in mind, a question, or just want to say hi?
              Send me a message and I&apos;ll get back to you.
            </p>
            <a
              href="mailto:sdlansoy@up.edu.ph"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                paddingBottom: '2px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent'
              }}
            >
              sdlansoy@up.edu.ph
            </a>
          </motion.div>

          {/* Right — Form */}
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
                style={{
                  padding: '3rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.6rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--accent)',
                  }}
                >
                  Message sent.
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  Thanks for reaching out! I&apos;ll get back to you as soon as I can.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textDecoration: 'underline',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {/* Name + Email */}
                <div
                  className="contact-name-email"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
                >
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      required
                      style={fieldStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      required
                      style={fieldStyle('email')}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="What's this about?"
                    required
                    style={fieldStyle('subject')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
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
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: '#e07070',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <div>
                  <Magnetic strength={0.2}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        background: 'none',
                        border: '1px solid var(--accent-border)',
                        color: 'var(--accent)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0.75rem 2rem',
                        cursor: 'pointer',
                        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                        borderRadius: '2px',
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement
                        btn.style.background = 'var(--accent-soft)'
                        btn.style.borderColor = 'var(--accent)'
                        btn.style.boxShadow = '0 0 25px var(--accent-soft)'
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement
                        btn.style.background = 'none'
                        btn.style.borderColor = 'var(--accent-border)'
                        btn.style.boxShadow = 'none'
                      }}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message →'}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        #contact input::placeholder,
        #contact textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.5;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
        }
        #contact input,
        #contact textarea {
          color-scheme: var(--input-color-scheme);
        }
        @media (max-width: 700px) {
          #contact .contact-grid {
            grid-template-columns: 1fr !important;
          }
          #contact .contact-name-email {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.62rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem',
}
