import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

const KEY = 'ujwal-exe:effects'

interface EffectsCtx {
  /** True when visual effects (3D scene, ambient animation) are enabled. */
  effects: boolean
  toggle: () => void
}

const Ctx = createContext<EffectsCtx>({ effects: true, toggle: () => {} })

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function readInitial(): boolean {
  if (prefersReducedMotion()) return false
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'off') return false
  } catch {
    /* storage unavailable — default to on */
  }
  return true
}

export function EffectsProvider({ children }: { children: ReactNode }) {
  const [effects, setEffects] = useState<boolean>(readInitial)

  const toggle = useCallback(() => {
    setEffects((prev) => {
      const next = !prev
      try {
        localStorage.setItem(KEY, next ? 'on' : 'off')
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('no-effects', !effects)
  }, [effects])

  const value = useMemo(() => ({ effects, toggle }), [effects, toggle])

  return (
    <Ctx.Provider value={value}>
      <MotionConfig
        reducedMotion="user"
        transition={effects ? undefined : { duration: 0 }}
      >
        {children}
      </MotionConfig>
    </Ctx.Provider>
  )
}

export const useEffects = () => useContext(Ctx)
