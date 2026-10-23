import { lazy, Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { EffectsProvider } from './hooks/useEffects'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Case studies are only needed when a project is opened.
const CaseStudy = lazy(() => import('./pages/CaseStudy'))

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <EffectsProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </EffectsProvider>
  )
}
