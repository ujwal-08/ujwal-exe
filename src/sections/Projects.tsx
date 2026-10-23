import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Trophy } from 'lucide-react'
import { categories, projects } from '../data/projects'
import type { CategoryId, Project } from '../data/types'
import ProjectVisual from '../components/ProjectVisual'
import { Reveal, SectionHeader, StatusBadge } from '../components/ui'

function ProjectBody({ p, headingLevel = 3 }: { p: Project; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <>
      <ProjectVisual slug={p.slug} caption={p.visualCaption} />
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <StatusBadge kind={p.statusKind} label={p.statusLabel} />
        {p.achievement && (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-violet/40 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-violet">
            <Trophy size={12} aria-hidden="true" />
            {p.achievement}
          </span>
        )}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-mute">{p.categoryLabel}</p>
      <H className="mt-1 text-2xl font-semibold leading-tight">{p.title}</H>
      <p className="mt-3 leading-relaxed text-mute">{p.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {p.tech.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
      <Link to={`/projects/${p.slug}`} className="btn-primary mt-6">
        View Case Study <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </>
  )
}

export default function Projects() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')
  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug)

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )
  const selected = filtered.find((p) => p.slug === selectedSlug) ?? filtered[0]

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="projects-title"
          eyebrow="02 / PROJECT UNIVERSE"
          title="Each project is a different experiment."
          intro="Work across AI, speech, embedded systems, accessibility and full-stack development. Status is stated plainly on every project — what is built, what is in progress, and what is only planned."
        />

        {/* Filters */}
        <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`min-h-[40px] rounded-lg border px-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                filter === c.id
                  ? 'border-cyan bg-cyan/10 text-cyan'
                  : 'border-line text-mute hover:border-cyan/40 hover:text-frost'
              }`}
            >
              {c.label}
            </button>
          ))}
          <p className="sr-only" aria-live="polite">
            Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Desktop: orbital explorer + detail */}
        <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(148,197,255,0.12)" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(148,197,255,0.08)" strokeDasharray="1 2" />
              <g className="animate-orbit" style={{ transformOrigin: '50px 50px' }}>
                <circle cx="50" cy="10" r="0.9" fill="#22d3ee" />
              </g>
              <g className="animate-orbit-rev" style={{ transformOrigin: '50px 50px' }}>
                <circle cx="76" cy="50" r="0.7" fill="#a78bfa" />
              </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="label-mono">Project index</p>
              <p className="mt-1 font-mono text-xs text-mute">
                {filtered.length} {filtered.length === 1 ? 'module' : 'modules'}
              </p>
            </div>

            <ul aria-label="Projects">
              {filtered.map((p, i) => {
                const angle = (i / filtered.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + Math.cos(angle) * 40
                const y = 50 + Math.sin(angle) * 40
                const isSel = selected?.slug === p.slug
                return (
                  <li
                    key={p.slug}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <button
                      onMouseEnter={() => setSelectedSlug(p.slug)}
                      onFocus={() => setSelectedSlug(p.slug)}
                      onClick={() => navigate(`/projects/${p.slug}`)}
                      aria-label={`${p.title}. ${p.statusLabel}. Open case study`}
                      className={`flex w-[104px] flex-col items-center gap-1.5 rounded-xl p-1 text-center transition-transform ${
                        isSel ? 'scale-105' : ''
                      }`}
                    >
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm ${
                          isSel
                            ? 'border-cyan bg-cyan/15 text-cyan shadow-glow'
                            : 'border-line bg-ink text-mute'
                        }`}
                      >
                        {String(projects.indexOf(p) + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[11px] leading-tight ${isSel ? 'text-frost' : 'text-mute'}`}>
                        {p.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="panel min-h-[560px] p-6" aria-live="polite">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectBody p={selected} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: readable vertical list */}
        <ul className="grid gap-6 md:grid-cols-2 lg:hidden">
          {filtered.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.03} className="panel h-full p-5">
                <ProjectBody p={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
