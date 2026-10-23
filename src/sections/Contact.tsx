import { useRef, useState } from 'react'
import { Check, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { getContactLinks, type ContactLink } from '../data/contactLinks'
import { Magnetic, Reveal } from '../components/ui'

const icons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
} as const

export default function Contact() {
  const links = getContactLinks()
  const email = links.find((l) => l.key === 'email')
  const [copied, setCopied] = useState<'idle' | 'ok' | 'error'>('idle')
  const timer = useRef<number>()

  const copyEmail = async () => {
    if (!email?.copy) return
    try {
      await navigator.clipboard.writeText(email.copy)
      setCopied('ok')
    } catch {
      setCopied('error')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied('idle'), 2500)
  }

  const renderLink = (l: ContactLink) => {
    const Icon = icons[l.key]
    const href = l.key === 'email' ? `${l.href}?subject=${encodeURIComponent('Project collaboration')}` : l.href
    return (
      <Magnetic key={l.key}>
        <a
          href={href}
          {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={l.key === 'email' ? 'btn-primary' : 'btn-ghost'}
        >
          <Icon size={15} aria-hidden="true" />
          {l.key === 'email' ? 'Start a conversation' : l.label}
        </a>
      </Magnetic>
    )
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-graphite/40 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="label-mono">05 / ESTABLISH CONNECTION</p>
            <h2
              id="contact-title"
              className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            >
              HAVE A PROBLEM <span className="text-cyan">WORTH SOLVING?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              I’m interested in building useful technology, exploring challenging ideas, and collaborating on
              projects that push beyond the obvious.
            </p>

            {links.length > 0 ? (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {links.map(renderLink)}
                {email?.copy && (
                  <button onClick={copyEmail} className="btn-ghost">
                    {copied === 'ok' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    Copy email
                  </button>
                )}
              </div>
            ) : (
              import.meta.env.DEV && (
                <p className="mx-auto mt-10 max-w-md rounded-lg border border-dashed border-violet/50 p-4 font-mono text-xs text-violet">
                  DEV NOTE: no contact details configured. Add them in src/data/site.ts and the links appear
                  here automatically.
                </p>
              )
            )}

            <p className="sr-only" role="status" aria-live="polite">
              {copied === 'ok' ? 'Email address copied to clipboard' : copied === 'error' ? 'Could not copy the email address' : ''}
            </p>
            {copied === 'ok' && <p className="mt-4 font-mono text-xs text-cyan">Email address copied.</p>}
            {copied === 'error' && (
              <p className="mt-4 font-mono text-xs text-violet">
                Couldn’t copy automatically — the address is available through the email button.
              </p>
            )}

            <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-blink rounded-full bg-cyan align-middle" aria-hidden="true" />
              Session complete · End of transmission
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
