import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import { CircleCheck, CircleDashed, FlaskConical } from 'lucide-react'
import type { StatusKind } from '../data/types'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <header className="mb-10 max-w-3xl sm:mb-14">
      <p className="label-mono">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">{intro}</p>}
    </header>
  )
}

const statusIcon = {
  'in-progress': CircleDashed,
  prototype: FlaskConical,
  developed: CircleCheck,
} as const

/** Status is always conveyed with an icon and text, never colour alone. */
export function StatusBadge({ kind, label }: { kind: StatusKind; label: string }) {
  const Icon = statusIcon[kind]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-frost">
      <Icon size={13} aria-hidden="true" className={kind === 'developed' ? 'text-cyan' : 'text-violet'} />
      {label}
    </span>
  )
}

/** Gentle pointer-attraction wrapper. Disabled for touch/coarse pointers and capped to a few pixels. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-150"
    >
      {children}
    </span>
  )
}
