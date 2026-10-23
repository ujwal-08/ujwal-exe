import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Command, Menu, Sparkles, X } from 'lucide-react'
import { useGoTo, type SectionId } from '../hooks/useGoTo'
import { useEffects } from '../hooks/useEffects'
import { site } from '../data/site'

const links: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const goTo = useGoTo()
  const { pathname } = useLocation()
  const { effects, toggle } = useEffects()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  // Scroll-spy for the home page.
  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return
    }
    const ids = ['about', 'projects', 'achievements', 'stack', 'contact']
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  const go = (id: SectionId) => {
    setOpen(false)
    goTo(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-void/80 backdrop-blur-md">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => {
            setOpen(false)
            window.scrollTo({ top: 0 })
          }}
          className="font-display text-lg font-bold tracking-tight"
        >
          {site.wordmark.split('.')[0]}
          <span className="text-cyan">.{site.wordmark.split('.')[1]}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={`rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:text-cyan ${
                  active === l.id ? 'text-cyan' : 'text-mute'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span
            className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute lg:inline-flex"
            aria-label="Status: system online"
          >
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan" aria-hidden="true" />
            System online
          </span>

          <button
            onClick={toggle}
            aria-pressed={effects}
            aria-label={`Visual effects ${effects ? 'on' : 'off'}. Toggle visual effects`}
            title="Toggle visual effects"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-mute hover:border-cyan/60 hover:text-cyan"
          >
            <Sparkles size={16} className={effects ? 'text-cyan' : ''} aria-hidden="true" />
          </button>

          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-3 font-mono text-xs text-mute hover:border-cyan/60 hover:text-cyan"
          >
            <Command size={14} aria-hidden="true" />
            <span className="hidden sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</span>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-void md:hidden">
          <ul className="container-x flex flex-col py-2">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="flex min-h-[48px] w-full items-center font-mono text-sm uppercase tracking-[0.16em] text-frost"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
