import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CornerDownLeft, Search } from 'lucide-react'
import { useGoTo } from '../hooks/useGoTo'
import { useEffects } from '../hooks/useEffects'
import { projects } from '../data/projects'
import { getContactLinks } from '../data/contactLinks'

interface Cmd {
  id: string
  label: string
  hint?: string
  keywords?: string
  run: () => void
}

const isEditable = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean | ((p: boolean) => boolean)) => void
}) {
  const goTo = useGoTo()
  const navigate = useNavigate()
  const { effects, toggle } = useEffects()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [setOpen])

  // Global shortcut: Cmd/Ctrl+K. Ignored while typing in a field outside the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (!open && isEditable(e.target)) return
        e.preventDefault()
        setOpen((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // Focus management.
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  const commands = useMemo<Cmd[]>(() => {
    const list: Cmd[] = [
      { id: 'about', label: 'Go to About', hint: 'Section', keywords: 'engineer profile', run: () => goTo('about') },
      { id: 'projects', label: 'Explore Projects', hint: 'Section', keywords: 'project universe work', run: () => goTo('projects') },
      { id: 'achievements', label: 'View Achievements', hint: 'Section', keywords: 'awards speakathon cipher', run: () => goTo('achievements') },
      { id: 'stack', label: 'View Engineering Stack', hint: 'Section', keywords: 'skills technologies', run: () => goTo('stack') },
      { id: 'contact', label: 'Go to Contact', hint: 'Section', keywords: 'connect email', run: () => goTo('contact') },
      {
        id: 'fx',
        label: effects ? 'Turn visual effects off' : 'Turn visual effects on',
        hint: 'Toggle',
        keywords: 'motion animation 3d reduce',
        run: toggle,
      },
    ]
    projects.forEach((p) =>
      list.push({
        id: `p-${p.slug}`,
        label: `Open case study: ${p.title}`,
        hint: 'Project',
        keywords: `${p.categoryLabel} ${p.tech.join(' ')}`,
        run: () => navigate(`/projects/${p.slug}`),
      }),
    )
    // Contact commands appear only when the real value is configured.
    getContactLinks().forEach((l) =>
      list.push({
        id: `c-${l.key}`,
        label: l.key === 'resume' ? 'Open resume' : l.key === 'email' ? 'Send an email' : `Open ${l.label}`,
        hint: 'Link',
        run: () => {
          if (l.external) window.open(l.href, '_blank', 'noopener,noreferrer')
          else window.location.href = l.href
        },
      }),
    )
    return list
  }, [effects, goTo, navigate, toggle])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => setIndex(0), [query])

  const run = (c?: Cmd) => {
    if (!c) return
    close()
    // Let the dialog close and focus restore before navigating/scrolling.
    setTimeout(() => c.run(), 0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[index])
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus inside the dialog; the input is the only control
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-opt-${index}`)?.scrollIntoView({ block: 'nearest' })
  }, [index])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-void/70 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass w-full max-w-xl overflow-hidden rounded-xl shadow-glow"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-mute" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={results[index] ? `cmd-opt-${index}` : undefined}
                className="h-14 w-full bg-transparent font-mono text-sm text-frost placeholder:text-mute focus:outline-none"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute">Esc</kbd>
            </div>

            <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs text-mute">No matching commands</li>
              )}
              {results.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-opt-${i}`}
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm ${
                    i === index ? 'bg-cyan/10 text-cyan' : 'text-frost'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight size={14} aria-hidden="true" className={i === index ? 'opacity-100' : 'opacity-0'} />
                    {c.label}
                  </span>
                  {c.hint && <span className="font-mono text-[10px] uppercase tracking-widest text-mute">{c.hint}</span>}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10px] text-mute">
              <span>↑↓ navigate</span>
              <span className="inline-flex items-center gap-1">
                <CornerDownLeft size={10} aria-hidden="true" /> select
              </span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
