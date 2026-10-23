/**
 * Procedural, clearly-illustrative project visuals.
 * They contain no numbers, readings or results, and every use is captioned as an illustration.
 */
import { useId } from 'react'

const C = '#22d3ee'
const V = '#a78bfa'

/** SVG ids must be unique per rendered instance (the same visual can appear twice in the DOM). */
const useUid = () => useId().replace(/:/g, '')

function Solar() {
  const arcs = [40, 62, 84]
  const uid = useUid()
  return (
    <>
      <defs>
        <radialGradient id={`pv-sun-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#7c2d12" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="100" r="86" fill={`url(#pv-sun-${uid})`} />
      <circle cx="160" cy="100" r="62" fill="none" stroke={C} strokeOpacity="0.35" />
      {arcs.map((r, i) => (
        <path
          key={r}
          d={`M ${160 - r} 100 C ${160 - r} ${100 - r * 1.1}, ${160 + r} ${100 - r * 1.1}, ${160 + r} 100`}
          fill="none"
          stroke={i % 2 ? V : C}
          strokeOpacity="0.8"
          strokeWidth="1.4"
        />
      ))}
      {arcs.map((r, i) => (
        <path
          key={`b${r}`}
          d={`M ${160 - r} 100 C ${160 - r} ${100 + r * 1.1}, ${160 + r} ${100 + r * 1.1}, ${160 + r} 100`}
          fill="none"
          stroke={i % 2 ? C : V}
          strokeOpacity="0.45"
          strokeWidth="1.1"
          strokeDasharray="3 4"
        />
      ))}
    </>
  )
}

function Speech() {
  const heights = [14, 28, 44, 30, 56, 70, 42, 26, 60, 48, 22, 36, 52, 30, 16]
  return (
    <>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={34 + i * 17}
          y={62 - h / 2}
          width="8"
          height={h}
          rx="3"
          fill={C}
          fillOpacity={0.35 + (h / 70) * 0.5}
        />
      ))}
      <path d="M30 118 H290" stroke={V} strokeOpacity="0.7" />
      <path d="M30 138 H290" stroke={C} strokeOpacity="0.5" />
      <rect x="34" y="112" width="96" height="12" rx="3" fill={V} fillOpacity="0.35" />
      <rect x="150" y="132" width="110" height="12" rx="3" fill={C} fillOpacity="0.3" />
      <rect x="34" y="158" width="170" height="8" rx="3" fill="#e6f1ff" fillOpacity="0.15" />
      <rect x="34" y="174" width="120" height="8" rx="3" fill="#e6f1ff" fillOpacity="0.1" />
    </>
  )
}

function Braille() {
  const filled = [true, false, true, true, false, false]
  const uid = useUid()
  return (
    <>
      <g fill="#e6f1ff" fillOpacity="0.16">
        {[40, 62, 84, 106, 128].map((y) => (
          <rect key={y} x="30" y={y} width={y % 44 === 0 ? 92 : 112} height="8" rx="3" />
        ))}
      </g>
      <path d="M140 100 H176" stroke={C} strokeWidth="1.5" markerEnd={`url(#pv-arrow-${uid})`} />
      <defs>
        <marker id={`pv-arrow-${uid}`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={C} />
        </marker>
      </defs>
      <rect x="196" y="50" width="86" height="104" rx="14" fill="#0a0f1c" stroke={C} strokeOpacity="0.5" />
      {filled.map((on, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        return (
          <circle
            key={i}
            cx={225 + col * 32}
            cy={80 + row * 28}
            r="9"
            fill={on ? C : 'none'}
            stroke={C}
            strokeOpacity={on ? 1 : 0.45}
            strokeWidth="1.5"
          />
        )
      })}
    </>
  )
}

function Nilm() {
  return (
    <>
      <path d="M30 100 H110" stroke={C} strokeWidth="1.6" />
      <rect x="110" y="76" width="60" height="48" rx="8" fill="#0a0f1c" stroke={C} />
      <text x="140" y="104" textAnchor="middle" fill={C} fontSize="10" fontFamily="monospace">
        ESP32
      </text>
      <path d="M170 90 H210 V56 H240" fill="none" stroke={V} strokeWidth="1.6" />
      <path d="M170 110 H210 V146 H240" fill="none" stroke={V} strokeWidth="1.6" />
      <rect x="240" y="40" width="58" height="32" rx="6" fill="#0a0f1c" stroke={V} strokeOpacity="0.7" />
      <rect x="240" y="130" width="58" height="32" rx="6" fill="#0a0f1c" stroke={V} strokeOpacity="0.7" />
      <text x="269" y="60" textAnchor="middle" fill="#e6f1ff" fontSize="8" fontFamily="monospace">
        IRON BOX
      </text>
      <text x="269" y="150" textAnchor="middle" fill="#e6f1ff" fontSize="8" fontFamily="monospace">
        KETTLE
      </text>
      <path
        d="M30 160 q10 -22 20 0 t20 0 t20 0 t20 0"
        fill="none"
        stroke={C}
        strokeOpacity="0.55"
      />
    </>
  )
}

function Wander() {
  return (
    <>
      {[40, 66, 92, 118, 144].map((y, i) => (
        <path
          key={y}
          d={`M20 ${y} C 90 ${y - 24 + i * 6}, 160 ${y + 24 - i * 5}, 300 ${y - 8}`}
          fill="none"
          stroke={C}
          strokeOpacity="0.16"
        />
      ))}
      <path
        d="M50 150 C 110 150, 120 90, 180 90 S 250 60, 274 50"
        fill="none"
        stroke={V}
        strokeWidth="1.6"
        strokeDasharray="5 5"
      />
      <circle cx="50" cy="150" r="5" fill={V} />
      <path d="M274 28 a14 14 0 0 1 14 14 c0 12 -14 26 -14 26 s-14 -14 -14 -26 a14 14 0 0 1 14 -14z" fill={C} />
      <circle cx="274" cy="42" r="5" fill="#05070d" />
    </>
  )
}

function Shelf() {
  const rows = [
    [30, 44, 36, 52, 40, 48, 34, 46],
    [42, 34, 50, 38, 46, 32, 52, 40],
    [36, 50, 40, 44, 34, 48, 38, 42],
  ]
  return (
    <>
      {rows.map((row, r) => {
        let x = 36
        return (
          <g key={r}>
            {row.map((h, i) => {
              const el = (
                <rect
                  key={i}
                  x={x}
                  y={52 + r * 50 - h * 0.7}
                  width="20"
                  height={h * 0.7}
                  rx="2"
                  fill={(i + r) % 3 === 0 ? V : C}
                  fillOpacity={0.35 + ((i * 7 + r * 3) % 5) * 0.1}
                />
              )
              x += 29
              return el
            })}
            <path d={`M28 ${54 + r * 50} H292`} stroke="#e6f1ff" strokeOpacity="0.3" />
          </g>
        )
      })}
    </>
  )
}

function Medi() {
  return (
    <>
      <rect x="30" y="32" width="70" height="70" rx="10" fill="#0a0f1c" stroke={C} strokeOpacity="0.5" />
      <path d="M65 48 V86 M46 67 H84" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <rect x="116" y="32" width="174" height="30" rx="6" fill="#e6f1ff" fillOpacity="0.07" />
      <rect x="116" y="72" width="174" height="30" rx="6" fill="#e6f1ff" fillOpacity="0.07" />
      <rect x="124" y="42" width="56" height="10" rx="3" fill={V} fillOpacity="0.6" />
      <rect x="124" y="82" width="86" height="10" rx="3" fill={C} fillOpacity="0.5" />
      <path
        d="M30 150 H80 L92 128 L110 172 L124 144 L136 150 H290"
        fill="none"
        stroke={C}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
    </>
  )
}

const visuals: Record<string, () => JSX.Element> = {
  'solar-flare-forecasting': Solar,
  'kannada-speech-diagnostic-engine': Speech,
  'smart-braille-reading-system': Braille,
  'esp32-nilm-energy-meter': Nilm,
  'wandersync-tourism-platform': Wander,
  'smartshelf-library-management': Shelf,
  'medicore-hospital-management': Medi,
}

export default function ProjectVisual({
  slug,
  caption,
  className = '',
}: {
  slug: string
  caption?: string
  className?: string
}) {
  const Visual = visuals[slug]
  if (!Visual) return null
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 320 200"
        className="w-full rounded-lg border border-line bg-ink"
        role="img"
        aria-label={caption ?? 'Illustration'}
      >
        <rect width="320" height="200" fill="#070b14" />
        <Visual />
      </svg>
      {caption && (
        <figcaption className="mt-2 font-mono text-[11px] text-mute">{caption}</figcaption>
      )}
    </figure>
  )
}
