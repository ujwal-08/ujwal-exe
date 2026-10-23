import { useGoTo } from '../hooks/useGoTo'
import { getContactLinks } from '../data/contactLinks'
import { site } from '../data/site'

export default function Footer() {
  const goTo = useGoTo()
  const links = getContactLinks()

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-bold">
            UJWAL<span className="text-cyan">.EXE</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-mute">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-mute">
          <button onClick={() => goTo('about')} className="hover:text-cyan">About</button>
          <button onClick={() => goTo('projects')} className="hover:text-cyan">Projects</button>
          <button onClick={() => goTo('achievements')} className="hover:text-cyan">Achievements</button>
          <button onClick={() => goTo('contact')} className="hover:text-cyan">Contact</button>
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
