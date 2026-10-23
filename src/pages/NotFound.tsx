import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('404 · Signal lost')
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-24" aria-labelledby="nf-title">
      <p className="label-mono">Error 404</p>
      <h1 id="nf-title" className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">
        SIGNAL <span className="text-cyan">LOST.</span>
      </h1>
      <p className="mt-5 max-w-md text-mute">
        That page doesn’t exist. It may have been moved, or the link may be mistyped.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Return to base
      </Link>
    </section>
  )
}
