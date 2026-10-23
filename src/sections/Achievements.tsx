import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/achievements'
import { getProject } from '../data/projects'
import { Reveal, SectionHeader } from '../components/ui'

/** Trophy-like geometric insignia (purely decorative). */
function TrophyMark() {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
      <polygon points="60,8 104,34 104,86 60,112 16,86 16,34" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <polygon points="60,26 88,42 88,78 60,94 32,78 32,42" fill="#a78bfa" fillOpacity="0.12" stroke="#22d3ee" strokeWidth="1.2" />
      <path d="M44 44 H76 V58 a16 16 0 0 1 -32 0 Z" fill="none" stroke="#e6f1ff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 48 H36 a6 6 0 0 0 6 14 M76 48 H84 a6 6 0 0 1 -6 14" fill="none" stroke="#e6f1ff" strokeWidth="1.6" />
      <path d="M60 74 V84 M50 86 H70" stroke="#e6f1ff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Cipher-wheel style pattern: one alphabet row shifted against another. */
function CipherMark() {
  const top = 'ABCDEFGHIJ'.split('')
  const bottom = 'DEFGHIJKLM'.split('')
  return (
    <svg viewBox="0 0 220 96" className="h-24 w-full max-w-[260px]" aria-hidden="true">
      {top.map((ch, i) => (
        <g key={i}>
          <rect x={6 + i * 21} y="10" width="18" height="24" rx="3" fill="none" stroke="#22d3ee" strokeOpacity="0.6" />
          <text x={15 + i * 21} y="27" textAnchor="middle" fill="#22d3ee" fontSize="12" fontFamily="monospace">
            {ch}
          </text>
          <path d={`M${15 + i * 21} 36 V58`} stroke="#a78bfa" strokeOpacity="0.5" strokeDasharray="2 3" />
          <rect x={6 + i * 21} y="60" width="18" height="24" rx="3" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.7" />
          <text x={15 + i * 21} y="77" textAnchor="middle" fill="#e6f1ff" fontSize="12" fontFamily="monospace">
            {bottom[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="ach-title"
          eyebrow="03 / VERIFIED SIGNALS"
          title="Recognition, on the record."
          intro="Two milestones so far — listed exactly as they happened."
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {achievements.map((a, i) => {
            const project = a.projectSlug ? getProject(a.projectSlug) : undefined
            return (
              <li key={a.id}>
                <Reveal delay={i * 0.08} className="panel flex h-full flex-col gap-6 p-7">
                  <div className="flex items-center">{a.id === 'speakathon' ? <TrophyMark /> : <CipherMark />}</div>

                  <div>
                    <p className="label-mono">{a.rank}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{a.title}</h3>
                    <p className="mt-3 leading-relaxed text-mute">{a.body}</p>
                  </div>

                  {a.image && (
                    <img
                      src={a.image}
                      alt={a.imageAlt ?? `${a.title} — ${a.rank}`}
                      loading="lazy"
                      className="w-full rounded-lg border border-line"
                    />
                  )}

                  {project && (
                    <Link
                      to={`/projects/${project.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-cyan hover:underline"
                    >
                      View the project <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
