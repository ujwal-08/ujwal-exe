import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { domains } from '../data/domains'
import { getProject } from '../data/projects'
import { Reveal, SectionHeader } from '../components/ui'

export default function About() {
  const [activeId, setActiveId] = useState(domains[0].id)
  const active = domains.find((d) => d.id === activeId) ?? domains[0]

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader id="about-title" eyebrow="01 / ENGINEER PROFILE" title="The engineer behind the system." />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-frost/90 sm:text-xl">
              I’m Ujwal Manjunath, a CSDS undergraduate interested in building systems that connect
              software, intelligence, and the real world. I enjoy understanding how things work at a
              fundamental level, turning ideas into functional prototypes, and solving problems through
              experimentation.
            </p>
            <p className="mt-5 leading-relaxed text-mute">
              My work spans AI and data pipelines, speech and image processing, embedded hardware, accessibility
              technology and full-stack applications. Select a domain to see what it means in practice and which
              projects it connects to.
            </p>

            {/* Detail panel (always visible, not hover-only) */}
            <div className="panel mt-8 p-6" aria-live="polite">
              <p className="label-mono">Domain</p>
              <h3 className="mt-2 text-xl font-semibold">{active.label}</h3>
              <p className="mt-3 leading-relaxed text-mute">{active.body}</p>
              {active.projects.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {active.projects.map((slug) => {
                    const p = getProject(slug)
                    if (!p) return null
                    return (
                      <li key={slug}>
                        <Link
                          to={`/projects/${slug}`}
                          className="chip hover:border-cyan/60 hover:text-cyan"
                        >
                          {p.title}
                          <ArrowUpRight size={12} className="ml-1" aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </Reveal>

          {/* Mobile: simple list of domains */}
          <ul className="grid gap-2 md:hidden" aria-label="Engineering domains">
            {domains.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => setActiveId(d.id)}
                  aria-pressed={d.id === activeId}
                  className={`flex min-h-[48px] w-full items-center justify-between rounded-lg border px-4 text-left text-sm ${
                    d.id === activeId ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-line text-frost'
                  }`}
                >
                  {d.label}
                  {d.id === activeId && <span className="font-mono text-[10px] uppercase tracking-widest">Selected</span>}
                </button>
              </li>
            ))}
          </ul>

          {/* Tablet/desktop: radial map */}
          <div className="relative mx-auto my-6 hidden aspect-square w-full max-w-[520px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(148,197,255,0.12)" strokeDasharray="1 2" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(148,197,255,0.08)" />
              {domains.map((d) => (
                <line
                  key={d.id}
                  x1="50"
                  y1="50"
                  x2={d.x}
                  y2={d.y}
                  stroke={d.id === activeId ? '#22d3ee' : 'rgba(148,197,255,0.22)'}
                  strokeWidth={d.id === activeId ? 0.5 : 0.3}
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/50 bg-ink text-center shadow-glow">
              <span className="font-display text-sm font-bold leading-tight">
                UJWAL<span className="text-cyan">.EXE</span>
              </span>
            </div>

            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                onMouseEnter={() => setActiveId(d.id)}
                onFocus={() => setActiveId(d.id)}
                aria-pressed={d.id === activeId}
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                className={`absolute w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-2 text-center text-[12px] leading-tight transition-colors ${
                  d.id === activeId
                    ? 'border-cyan/70 bg-cyan/10 text-cyan'
                    : 'border-line bg-ink text-frost hover:border-cyan/40'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
