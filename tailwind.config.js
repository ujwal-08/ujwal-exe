/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070d',
        ink: '#0a0f1c',
        graphite: '#121a2b',
        line: 'rgba(148, 197, 255, 0.14)',
        cyan: { DEFAULT: '#22d3ee', soft: '#67e8f9', dim: '#0e7490' },
        violet: { DEFAULT: '#a78bfa', dim: '#6d5bd0' },
        frost: '#e6f1ff',
        mute: '#8fa3bf',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.25), 0 0 32px -8px rgba(34,211,238,0.35)',
      },
      keyframes: {
        orbit: { to: { transform: 'rotate(360deg)' } },
        blink: { '50%': { opacity: '0.25' } },
        float: { '50%': { transform: 'translateY(6px)' } },
      },
      animation: {
        orbit: 'orbit 90s linear infinite',
        'orbit-rev': 'orbit 140s linear infinite reverse',
        blink: 'blink 2.4s ease-in-out infinite',
        float: 'float 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
