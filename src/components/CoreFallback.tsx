/** Static, CSS-driven stand-in for the 3D core (no WebGL, effects off, or reduced motion). */
export default function CoreFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a geometric digital core"
    >
      <defs>
        <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#cf-glow)" />
      <g className="origin-center animate-orbit" style={{ transformOrigin: '200px 200px' }}>
        <polygon
          points="200,40 338,120 338,280 200,360 62,280 62,120"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <circle cx="200" cy="40" r="3" fill="#67e8f9" />
      </g>
      <g className="origin-center animate-orbit-rev" style={{ transformOrigin: '200px 200px' }}>
        <ellipse
          cx="200"
          cy="200"
          rx="150"
          ry="52"
          fill="none"
          stroke="#a78bfa"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
        <circle cx="350" cy="200" r="3" fill="#a78bfa" />
      </g>
      <polygon
        points="200,140 252,170 252,230 200,260 148,230 148,170"
        fill="#0b1b2e"
        stroke="#67e8f9"
        strokeWidth="1.5"
      />
      <path
        d="M200 140v120M148 170l104 60M252 170l-104 60"
        stroke="#22d3ee"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <circle cx="200" cy="200" r="8" fill="#22d3ee" />
    </svg>
  )
}
