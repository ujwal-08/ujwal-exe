import type { Achievement } from './types'

/**
 * Only verified details are included. Dates, participant counts, certificate IDs,
 * prize money and organiser details are intentionally NOT listed.
 * To show a real certificate or photo later, drop the file in /public/certificates
 * and set `image` + `imageAlt`.
 */
export const achievements: Achievement[] = [
  {
    id: 'speakathon',
    title: 'Speakathon',
    rank: 'Winner',
    body: 'Recognised for the Kannada Speech Diagnostic Engine project.',
    projectSlug: 'kannada-speech-diagnostic-engine',
  },
  {
    id: 'cipher',
    title: 'Cipher Decoding Competition',
    rank: 'Third Place',
    body: 'Secured third place in a cipher decoding competition held at Christ University.',
  },
]
