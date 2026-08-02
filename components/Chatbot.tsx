'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Terminal palette – always dark, theme-independent ── */
const T = {
  bg:        '#161b17',
  bgHead:    '#0f1410',
  text:      '#c8d0c4',
  green:     '#6ee7a0',
  purple:    '#c084fc',
  blue:      '#93c5fd',
  dim:       '#4a5e4c',
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

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export default function Chatbot() {
  const [open, setOpen]             = useState(false)
  const [minimized, setMinimized]   = useState(false)
  const [maximized, setMaximized]   = useState(false)
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [inputFocused, setFocused]  = useState(false)
  const [isMobile, setIsMobile]     = useState(false)
  const [keyboardOffset, setKbOff]  = useState(0)
  const [messages, setMessages]     = useState<Message[]>([{
    id: 'init',
    role: 'assistant',
    content: "Hi! Ask me anything about Sam's background, projects, or tech stack.",
  }])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)

  /* detect mobile viewport */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* track virtual keyboard height via visualViewport */
  useEffect(() => {
    if (!isMobile) { setKbOff(0); return }
    const vv = window.visualViewport
    if (!vv) return
    const update = () => {
      const diff = window.innerHeight - vv.height
      setKbOff(diff > 60 ? diff : 0)
    }
    vv.addEventListener('resize', update)
    return () => vv.removeEventListener('resize', update)
  }, [isMobile])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220)
    if (!open) { setMinimized(false); setMaximized(false) }
  }, [open])

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

  /* panel bottom: lift above keyboard when it appears */
  const panelBottom = isMobile
    ? (keyboardOffset > 60 ? keyboardOffset + 12 : 72)
    : 84

  const canSend = !!input.trim() && !loading

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

        .term-input { color-scheme: dark; }
        .term-input::placeholder { color: ${T.dim}; font-family: ${MONO}; }
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
          width: 52,
          height: 52,
          borderRadius: 16,
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
          touchAction: 'manipulation',
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
              style={{ fontSize: '0.88rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {'>_'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {/* ── Mobile backdrop – tap to close ── */}
        {open && isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              zIndex: 149,
            }}
          />
        )}

        {/* ── Terminal panel ── */}
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.92, y: isMobile ? 32 : 14 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              ...(isMobile ? {} : {
                width: maximized ? 620 : 420,
                maxHeight: minimized ? 38 : maximized ? 680 : 520,
              }),
            }}
            exit={{ opacity: 0, scale: isMobile ? 1 : 0.92, y: isMobile ? 32 : 14 }}
            transition={{
              duration: 0.22,
              ease: [0.25, 0.46, 0.45, 0.94],
              width:     { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
              maxHeight: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{
              position: 'fixed',
              bottom: panelBottom,
              right: isMobile ? 8 : 24,
              left: isMobile ? 8 : 'auto',
              maxWidth: isMobile ? 'none' : 'calc(100vw - 48px)',
              /* mobile maxHeight via style (not animated), desktop via animate */
              maxHeight: isMobile
                ? (minimized ? 38 : 'min(82dvh, 580px)')
                : undefined,
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: isMobile ? 14 : 10,
              zIndex: 150,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
              transformOrigin: isMobile ? 'bottom center' : 'bottom right',
              /* smooth keyboard-driven repositioning */
              transition: 'bottom 0.18s ease',
            }}
          >

            {/* ── Title bar ── */}
            <div
              style={{
                height: isMobile ? 50 : 38,
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
              {/* Drag handle pill – mobile affordance */}
              {isMobile && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: T.dim,
                  opacity: 0.7,
                }} />
              )}

              {/* Traffic lights / close */}
              <div style={{ display: 'flex', gap: isMobile ? 8 : 6, alignItems: 'center', zIndex: 1 }}>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  title="Close"
                  style={{
                    width: isMobile ? 22 : 12,
                    height: isMobile ? 22 : 12,
                    borderRadius: '50%',
                    background: '#FF5F57',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'block',
                    flexShrink: 0,
                    touchAction: 'manipulation',
                  }}
                />
                {!isMobile && (
                  <>
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
                  </>
                )}
              </div>

              {/* Centered path label */}
              <div style={{
                position: 'absolute', left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: MONO, fontSize: isMobile ? '0.7rem' : '0.64rem', letterSpacing: '0.01em' }}>
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
                padding: isMobile ? '16px 16px 8px' : '14px 16px 6px',
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
                      fontSize: isMobile ? '0.84rem' : '0.775rem',
                      lineHeight: 1.75,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
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
                <div style={{ fontFamily: MONO, fontSize: isMobile ? '0.84rem' : '0.775rem', lineHeight: 1.75 }}>
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
                padding: isMobile ? '12px 14px' : '10px 16px',
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
                  placeholder={inputFocused ? '' : 'type your question…'}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  style={{
                    flex: 1,
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: T.text,
                    fontFamily: MONO,
                    /* 16px on mobile prevents iOS auto-zoom on input focus */
                    fontSize: isMobile ? '1rem' : '0.775rem',
                    lineHeight: 1.5,
                    caretColor: T.green,
                  }}
                />
                {/* Blinking block cursor – only when focused and empty */}
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
                      fontSize: isMobile ? '1rem' : '0.775rem',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    ▋
                  </span>
                )}
              </div>

              {/* ── Send button ──
                  Mobile: always visible (dimmed when disabled)
                  Desktop: fades in only when there's input */}
              <motion.button
                onClick={sendMessage}
                disabled={!canSend}
                aria-label="Send message"
                whileTap={{ scale: 0.88 }}
                animate={{
                  opacity: canSend ? 1 : isMobile ? 0.3 : 0,
                  scale: 1,
                }}
                transition={{ duration: 0.15 }}
                style={{
                  flexShrink: 0,
                  width: isMobile ? 40 : 28,
                  height: isMobile ? 40 : 28,
                  borderRadius: isMobile ? 11 : 7,
                  background: T.green,
                  border: 'none',
                  cursor: canSend ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: T.bgHead,
                  padding: 0,
                  touchAction: 'manipulation',
                  /* keep button in layout even when invisible on desktop */
                  pointerEvents: canSend ? 'auto' : 'none',
                }}
              >
                <SendIcon />
              </motion.button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
