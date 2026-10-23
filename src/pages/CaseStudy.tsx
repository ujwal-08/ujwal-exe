import { Fragment, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Trophy } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProjectVisual from '../components/ProjectVisual'
import { StatusBadge } from '../components/ui'
import NotFound from './NotFound'

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-10" aria-labelledby={`cs-${n}`}>
      <p className="label-mono">{n}</p>
      <h2 id={`cs-${n}`} className="mt-2 text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function StatusList({ title, items, mark }: { title: string; items: string[]; mark: string }) {
  if (items.length === 0) return null
  return (
    <div className="panel p-5">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-frost">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mute">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span aria-hidden="true" className="text-cyan">{mark}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project?.title, project?.summary)

  if (!project) return <NotFound />

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const { status } = project
  const hasLinks = Boolean(project.links?.repo?.trim() || project.links?.demo?.trim())

  return (
    <article className="container-x pb-24 pt-28 sm:pt-32">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-mute hover:text-cyan"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="label-mono">Case study · {project.categoryLabel}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{project.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StatusBadge kind={project.statusKind} label={project.statusLabel} />
          {project.achievement && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-violet/40 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-violet">
              <Trophy size={12} aria-hidden="true" />
              {project.achievement}
            </span>
          )}
        </div>
        <p className="mt-6 text-lg leading-relaxed text-mute">{project.summary}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="max-w-3xl">
          <Block n="01" title="Project overview">
            <p className="leading-relaxed text-frost/90">{project.overview}</p>
          </Block>

          <Block n="02" title="Problem being addressed">
            <p className="leading-relaxed text-frost/90">{project.problem}</p>
          </Block>

          <Block n="03" title="Proposed approach">
            <p className="leading-relaxed text-frost/90">{project.approach}</p>
          </Block>

          <Block n="04" title="Workflow">
            <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
              {project.flow.map((step, i) => (
                <Fragment key={step.label}>
                  <li
                    className={`flex-1 rounded-lg border px-4 py-3 md:min-w-[150px] ${
                      step.planned ? 'border-dashed border-violet/60' : 'border-line bg-graphite/50'
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
                      Step {i + 1}
                      {step.planned ? ' · planned' : ''}
                    </p>
                    <p className="mt-1 text-sm font-medium text-frost">{step.label}</p>
                    {step.note && <p className="mt-0.5 text-xs text-mute">{step.note}</p>}
                  </li>
                  {i < project.flow.length - 1 && (
                    <li aria-hidden="true" className="flex items-center justify-center text-cyan">
                      <ChevronRight size={16} className="rotate-90 md:rotate-0" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </Block>

          <Block n="05" title="Technologies used">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          <Block n="06" title="My contribution">
            <p className="leading-relaxed text-frost/90">{project.contribution}</p>
          </Block>

          <Block n="07" title="Current implementation status">
            {status.caveats.length > 0 && (
              <div className="mb-5 rounded-lg border border-violet/40 bg-violet/5 p-4" role="note">
                <p className="font-mono text-[11px] uppercase tracking-widest text-violet">Read this first</p>
                <ul className="mt-2 space-y-1.5 text-sm text-frost/90">
                  {status.caveats.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-3">
              <StatusList title="Implemented" items={status.implemented} mark="✓" />
              <StatusList title="In progress" items={status.inProgress} mark="◐" />
              <StatusList title="Planned" items={status.planned} mark="○" />
            </div>
            {status.implemented.length + status.inProgress.length + status.planned.length === 0 && (
              <p className="text-sm text-mute">No component-level status has been listed yet.</p>
            )}
          </Block>

          <Block n="08" title="Challenges & engineering decisions">
            <ul className="space-y-5">
              {project.challenges.map((c) => (
                <li key={c.title}>
                  <h3 className="font-semibold text-frost">{c.title}</h3>
                  <p className="mt-1 leading-relaxed text-mute">{c.body}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block n="09" title="Future improvements">
            <ul className="list-disc space-y-2 pl-5 text-frost/90 marker:text-cyan">
              {project.future.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Block>

          {hasLinks && (
            <Block n="10" title="Links">
              <div className="flex flex-wrap gap-3">
                {project.links?.repo?.trim() && (
                  <a className="btn-ghost" href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    Repository <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {project.links?.demo?.trim() && (
                  <a className="btn-ghost" href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    Live demo <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </Block>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Project illustration">
          <ProjectVisual slug={project.slug} caption={project.visualCaption} />
        </aside>
      </div>

      <nav aria-label="Other projects" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="panel group p-5 hover:border-cyan/50">
          <p className="font-mono text-[11px] uppercase tracking-widest text-mute">
            <ArrowLeft size={12} className="mr-1 inline" aria-hidden="true" />
            Previous
          </p>
          <p className="mt-1 font-semibold group-hover:text-cyan">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="panel group p-5 text-right hover:border-cyan/50">
          <p className="font-mono text-[11px] uppercase tracking-widest text-mute">
            Next
            <ArrowRight size={12} className="ml-1 inline" aria-hidden="true" />
          </p>
          <p className="mt-1 font-semibold group-hover:text-cyan">{next.title}</p>
        </Link>
      </nav>
    </article>
  )
}
