'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Terminal palette – always dark, theme-independent ── */
const T = {
  bg:        '#161b17',
  bgHead:    '#0f1410',
  text:      '#c8d0c4',   // message body: warm light gray/cream
  green:     '#6ee7a0',   // visitor prefix + $ prompt
  purple:    '#c084fc',   // sam@ai prefix + typing cursor
  blue:      '#93c5fd',   // ~/chat path segment (terminal convention)
  dim:       '#4a5e4c',   // muted / secondary text
  border:    'rgba(255, 255, 255, 0.07)',
  scrollbar: '#2a3d2e',
}

const MONO = "'JetBrains Mono', monospace"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const genId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export default function Chatbot() {
  const [open, setOpen]               = useState(false)
  const [minimized, setMinimized]     = useState(false)
  const [maximized, setMaximized]     = useState(false)
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [inputFocused, setFocused]    = useState(false)
  const [messages, setMessages]       = useState<Message[]>(() => [{
    id: 'init',
    role: 'assistant',
    content: "Hi! Ask me anything about Sam's background, projects, or tech stack.",
  }])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220)
    if (!open) { setMinimized(false); setMaximized(false) }
  }, [open])

  // Re-focus input when restoring from minimized
  useEffect(() => {
    if (!minimized && open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [minimized, open])

  const handleMinimize = () => { setMaximized(false); setMinimized(v => !v) }
  const handleMaximize = () => { setMinimized(false); setMaximized(v => !v) }

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { id: genId(), role: 'user', content: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
        .filter(m => m.id !== 'init')
        .map(({ role, content }) => ({ role, content }))

      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()

      const content = !res.ok
        ? (data.error === 'rate_limit'
            ? 'Rate limit reached. Please try again in a moment.'
            : 'Connection error. Reach Sam at sdlansoy@up.edu.ph.')
        : data.content

      setMessages(prev => [...prev, { id: genId(), role: 'assistant', content }])
    } catch {
      setMessages(prev => [...prev, {
        id: genId(),
        role: 'assistant',
        content: 'Connection failed. Try again or email sdlansoy@up.edu.ph.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      <style>{`
        @keyframes termBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .term-cursor { animation: termBlink 1.1s step-end infinite; }

        .term-messages::-webkit-scrollbar       { width: 4px; }
        .term-messages::-webkit-scrollbar-track { background: transparent; }
        .term-messages::-webkit-scrollbar-thumb { background: ${T.scrollbar}; border-radius: 2px; }

        .term-input                { color-scheme: dark; }
        .term-input::placeholder   { color: ${T.dim}; font-family: ${MONO}; font-size: 0.775rem; }

        @media (max-width: 640px) {
          .chatbot-panel {
            right: 12px !important;
            left: 12px !important;
            width: auto !important;
            bottom: 80px !important;
            max-height: 72vh !important;
          }
        }
      `}</style>

      {/* ── FAB: squircle >_ button ── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close terminal' : 'Open terminal chat'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: 16,           /* squircle */
          background: 'var(--accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 151,
          boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
          color: '#fff',
          fontFamily: MONO,
          transition: 'background 0.4s ease',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit   ={{ rotate:  90, opacity: 0 }}
              transition={{ duration: 0.14 }}
              style={{ fontSize: '0.9rem', lineHeight: 1 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="term"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0,  opacity: 1 }}
              exit   ={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.14 }}
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {'>_'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Terminal panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: maximized ? 620 : 420,
              maxHeight: minimized ? 38 : maximized ? 680 : 520,
            }}
            exit   ={{ opacity: 0, scale: 0.92, y: 14 }}
            transition={{
              duration: 0.22,
              ease: [0.25, 0.46, 0.45, 0.94],
              width:     { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
              maxHeight: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{
              position: 'fixed',
              bottom: 84,
              right: 24,
              maxWidth: 'calc(100vw - 48px)',
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              zIndex: 150,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
              transformOrigin: 'bottom right',
            }}
          >

            {/* ── Title bar ── */}
            <div
              style={{
                height: 38,
                background: T.bgHead,
                borderBottom: `1px solid ${T.border}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                flexShrink: 0,
                userSelect: 'none',
                position: 'relative',
              }}
            >
              {/* macOS traffic lights */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', zIndex: 1 }}>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  title="Close"
                  style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
                />
                <button
                  onClick={handleMinimize}
                  aria-label={minimized ? 'Restore' : 'Minimize'}
                  title={minimized ? 'Restore' : 'Minimize'}
                  style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
                />
                <button
                  onClick={handleMaximize}
                  aria-label={maximized ? 'Restore' : 'Maximize'}
                  title={maximized ? 'Restore' : 'Maximize'}
                  style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA42', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
                />
              </div>

              {/* Centered path label */}
              <div style={{
                position: 'absolute', left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.01em' }}>
                  <span style={{ color: T.green }}>sam</span>
                  <span style={{ color: T.dim }}>@portfolio</span>
                  <span style={{ color: T.dim, opacity: 0.55 }}>: </span>
                  <span style={{ color: T.blue }}>~/chat</span>
                </span>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              className="term-messages"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 16px 6px',
                display: 'flex',
                flexDirection: 'column',
                scrollbarWidth: 'thin',
                scrollbarColor: `${T.scrollbar} transparent`,
              }}
            >
              {messages.map((msg, i) => {
                const isLastMsg = i === messages.length - 1
                return (
                  <div
                    key={msg.id}
                    style={{
                      fontFamily: MONO,
                      fontSize: '0.775rem',
                      lineHeight: 1.75,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      /* blank line after each assistant turn, except the very last message */
                      marginBottom: msg.role === 'assistant' && !isLastMsg ? '0.9rem' : '0.05rem',
                    }}
                  >
                    {msg.role === 'user' ? (
                      <>
                        <span style={{ color: T.green }}>visitor@you:~$</span>
                        {' '}
                        <span style={{ color: T.text }}>{msg.content}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: T.purple }}>sam@ai:</span>
                        {' '}
                        <span style={{ color: T.text }}>{msg.content}</span>
                      </>
                    )}
                  </div>
                )
              })}

              {/* Typing indicator */}
              {loading && (
                <div style={{ fontFamily: MONO, fontSize: '0.775rem', lineHeight: 1.75 }}>
                  <span style={{ color: T.purple }}>sam@ai:</span>
                  {' '}
                  <span className="term-cursor" style={{ color: T.purple }}>▋</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input prompt ── */}
            <div
              style={{
                borderTop: `1px solid ${T.border}`,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
                background: T.bgHead,
              }}
            >
              {/* $ prompt glyph */}
              <span style={{
                fontFamily: MONO,
                fontSize: '0.775rem',
                color: T.green,
                flexShrink: 0,
                lineHeight: 1,
                userSelect: 'none',
              }}>
                $
              </span>

              {/* Input + block cursor overlay */}
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  className="term-input"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={loading}
                  /* hide placeholder while focused so the blinking cursor reads cleanly */
                  placeholder={inputFocused ? '' : 'type your question…'}
                  style={{
                    flex: 1,
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: T.text,
                    fontFamily: MONO,
                    fontSize: '0.775rem',
                    lineHeight: 1.5,
                    /* green caret for when user is mid-word */
                    caretColor: T.green,
                  }}
                />
                {/* Blinking block cursor — visible when focused and nothing typed yet */}
                {inputFocused && !input && (
                  <span
                    className="term-cursor"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: T.green,
                      fontFamily: MONO,
                      fontSize: '0.775rem',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    ▋
                  </span>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
