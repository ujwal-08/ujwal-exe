import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useGoTo } from '../hooks/useGoTo'
import { useEffects } from '../hooks/useEffects'
import { detectWebGL, useInViewport, useMedia } from '../hooks/useMedia'
import ErrorBoundary from '../components/ErrorBoundary'
import CoreFallback from '../components/CoreFallback'
import { Magnetic } from '../components/ui'
import { site } from '../data/site'

// The 3D scene (and three.js) is only downloaded when it will actually be shown.
const HeroCore = lazy(() => import('../components/HeroCore'))

const INTRO_MS = 2600

export default function Hero() {
  const goTo = useGoTo()
  const { effects } = useEffects()
  const desktop = useMedia('(min-width: 1024px)')
  const [webgl] = useState(detectWebGL)
  const { ref, visible } = useInViewport<HTMLElement>()
  const [introRunning, setIntroRunning] = useState(effects)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (!introRunning) return
    const t = setTimeout(() => setIntroRunning(false), INTRO_MS)
    return () => clearTimeout(t)
  }, [introRunning])

  const instant = skipped || !effects
  const use3D = effects && webgl && desktop

  const fade = (delay: number) => ({
    initial: instant ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: instant ? 0 : 0.7, delay: instant ? 0 : delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  })

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Atmosphere */}
      <motion.div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: instant ? 0 : 1 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[120px]"
      />

      {/* Core: WebGL on capable desktops, static SVG elsewhere. Never intercepts input. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-30 sm:opacity-40 lg:w-[58%] lg:opacity-100"
        aria-hidden={!use3D ? undefined : true}
      >
        {use3D ? (
          <ErrorBoundary fallback={<CoreFallback />}>
            <Suspense fallback={null}>
              <HeroCore active={visible} skipIntro={instant} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <div className="aspect-square w-full max-w-[460px]">
              <CoreFallback />
            </div>
          </div>
        )}
      </div>

      <div className="container-x relative z-10 py-16">
        <div className="max-w-2xl">
          <motion.p {...fade(0.5)} className="label-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan" aria-hidden="true" />
            {site.name.toUpperCase()}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.6rem,8.5vw,6.2rem)] font-bold leading-[0.95] tracking-tight"
          >
            <motion.span {...fade(0.7)} className="block">
              I BUILD
            </motion.span>
            <motion.span {...fade(0.85)} className="block">
              THINGS THAT
            </motion.span>
            <motion.span {...fade(1.0)} className="block text-cyan">
              THINK.
            </motion.span>
          </h1>

          <motion.p {...fade(1.2)} className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {site.tagline}
          </motion.p>

          <motion.p {...fade(1.3)} className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-frost/80">
            {site.role}
          </motion.p>

          <motion.div {...fade(1.5)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <button className="btn-primary" onClick={() => goTo('projects')}>
                Explore Projects
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn-ghost" onClick={() => goTo('about')}>
                About Me
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {introRunning && effects && !skipped && (
        <button
          onClick={() => setSkipped(true)}
          className="absolute bottom-6 left-5 z-20 rounded-md border border-line bg-void/70 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-mute hover:text-cyan sm:left-8"
        >
          Skip intro
        </button>
      )}

      <button
        onClick={() => goTo('about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute hover:text-cyan sm:flex"
      >
        Scroll
        <ArrowDown size={14} className="animate-float" aria-hidden="true" />
      </button>
    </section>
  )
}
