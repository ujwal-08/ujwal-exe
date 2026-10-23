import type { StackGroup } from './types'

/**
 * `usage` describes practical exposure, not proficiency:
 *  - used     → appears in at least one project listed
 *  - planned  → intended for a project that is still in progress
 *  - learning → core CS / language exposure not tied to a listed project
 */
export const stackGroups: StackGroup[] = [
  {
    id: 'core',
    title: 'Programming & core CS',
    items: [
      { name: 'C', usage: 'used', projects: ['smartshelf-library-management', 'medicore-hospital-management'] },
      { name: 'C++', usage: 'learning', projects: [] },
      { name: 'Java', usage: 'learning', projects: [] },
      { name: 'Data structures & algorithms', usage: 'learning', projects: ['smartshelf-library-management'] },
      { name: 'Object-oriented programming', usage: 'learning', projects: [] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & data',
    items: [
      {
        name: 'Python',
        usage: 'used',
        projects: ['solar-flare-forecasting', 'kannada-speech-diagnostic-engine'],
      },
      { name: 'PyTorch', usage: 'planned', projects: ['solar-flare-forecasting'] },
      { name: 'FastAPI', usage: 'used', projects: ['kannada-speech-diagnostic-engine'] },
      {
        name: 'Computer vision & speech processing',
        usage: 'used',
        projects: ['solar-flare-forecasting', 'kannada-speech-diagnostic-engine', 'smart-braille-reading-system'],
      },
      {
        name: 'Data preprocessing',
        usage: 'used',
        projects: ['solar-flare-forecasting', 'kannada-speech-diagnostic-engine'],
      },
    ],
  },
  {
    id: 'web',
    title: 'Web development',
    items: [
      { name: 'React', usage: 'used', projects: ['wandersync-tourism-platform'] },
      { name: 'TypeScript', usage: 'learning', projects: [] },
      { name: 'Vite', usage: 'used', projects: ['wandersync-tourism-platform'] },
      { name: 'Tailwind CSS', usage: 'learning', projects: [] },
      {
        name: 'Supabase',
        usage: 'used',
        projects: ['solar-flare-forecasting', 'wandersync-tourism-platform'],
      },
      { name: 'PostgreSQL', usage: 'used', projects: ['solar-flare-forecasting'] },
      { name: 'Node.js / Express', usage: 'used', projects: ['smartshelf-library-management'] },
    ],
  },
  {
    id: 'embedded',
    title: 'Embedded & hardware',
    items: [
      { name: 'ESP32', usage: 'used', projects: ['esp32-nilm-energy-meter'] },
      { name: 'Raspberry Pi', usage: 'used', projects: ['smart-braille-reading-system'] },
      {
        name: 'Sensor integration',
        usage: 'used',
        projects: ['esp32-nilm-energy-meter'],
      },
      { name: 'Servo control', usage: 'used', projects: ['smart-braille-reading-system'] },
      {
        name: 'OCR & Braille conversion',
        usage: 'used',
        projects: ['smart-braille-reading-system'],
      },
    ],
  },
]

export const usageLabel = {
  used: 'Used in projects',
  planned: 'Planned',
  learning: 'Core / learning',
} as const
