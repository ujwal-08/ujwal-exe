import type { Domain } from './types'

export const domains: Domain[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    body: 'Building data pipelines and model-driven systems, from solar-imaging preprocessing for a planned PyTorch model to speech analysis.',
    projects: ['solar-flare-forecasting', 'kannada-speech-diagnostic-engine'],
    x: 50,
    y: 6,
  },
  {
    id: 'cv-speech',
    label: 'Computer Vision & Speech',
    body: 'Working with images and audio: FITS magnetogram processing, camera-based OCR, speaker diarization and acoustic analysis.',
    projects: [
      'solar-flare-forecasting',
      'smart-braille-reading-system',
      'kannada-speech-diagnostic-engine',
    ],
    x: 84,
    y: 28,
  },
  {
    id: 'software',
    label: 'Software & Full-Stack',
    body: 'Designing complete applications with backends, data models and web interfaces, in both C-based and React-based stacks.',
    projects: ['wandersync-tourism-platform', 'smartshelf-library-management', 'medicore-hospital-management'],
    x: 84,
    y: 72,
  },
  {
    id: 'embedded',
    label: 'Embedded Systems & IoT',
    body: 'Connecting code to hardware: sensor reading on an ESP32, and servo-driven output on a Raspberry Pi Zero 2 W.',
    projects: ['esp32-nilm-energy-meter', 'smart-braille-reading-system'],
    x: 50,
    y: 94,
  },
  {
    id: 'accessibility',
    label: 'Accessibility Technology',
    body: 'Exploring how technology can make printed information available through touch, as in the Braille reading prototype.',
    projects: ['smart-braille-reading-system'],
    x: 16,
    y: 72,
  },
  {
    id: 'dsa',
    label: 'Algorithms & Problem-Solving',
    body: 'Data structures, algorithms and low-level programming in C, plus competitive problem-solving such as cipher decoding.',
    projects: ['smartshelf-library-management'],
    x: 16,
    y: 28,
  },
]
