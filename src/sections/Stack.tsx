import { Link } from 'react-router-dom'
import { stackGroups, usageLabel } from '../data/stack'
import { getProject } from '../data/projects'
import { Reveal, SectionHeader } from '../components/ui'

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="stack-title"
          eyebrow="04 / ENGINEERING STACK"
          title="Tools, in the context they were used."
          intro="This map shows practical exposure, not proficiency. Each technology is tagged by how it appears in my work and linked to the projects that use it."
        />

        <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-mute" aria-label="Legend">
          <li><span className="text-cyan">●</span> {usageLabel.used}</li>
          <li><span className="text-violet">◐</span> {usageLabel.planned}</li>
          <li><span className="text-mute">○</span> {usageLabel.learning}</li>
        </ul>

        <div className="grid gap-6 md:grid-cols-2">
          {stackGroups.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 0.05} className="panel h-full p-6">
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 divide-y divide-line">
                {g.items.map((item) => (
                  <li key={item.name} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm text-frost">{item.name}</span>
                      <span
                        className={`shrink-0 font-mono text-[10px] uppercase tracking-widest ${
                          item.usage === 'used' ? 'text-cyan' : item.usage === 'planned' ? 'text-violet' : 'text-mute'
                        }`}
                      >
                        {item.usage === 'used' ? '● ' : item.usage === 'planned' ? '◐ ' : '○ '}
                        {usageLabel[item.usage]}
                      </span>
                    </div>
                    {item.projects.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`Projects using ${item.name}`}>
                        {item.projects.map((slug) => {
                          const p = getProject(slug)
                          return (
                            p && (
                              <li key={slug}>
                                <Link to={`/projects/${slug}`} className="chip hover:border-cyan/60 hover:text-cyan">
                                  {p.title}
                                </Link>
                              </li>
                            )
                          )
                        })}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
