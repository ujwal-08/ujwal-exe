export type CategoryId = 'ai' | 'software' | 'iot' | 'accessibility'

export type StatusKind = 'in-progress' | 'prototype' | 'developed'

export interface Project {
  slug: string
  title: string
  /** Short label shown on cards, e.g. "AI / Machine Learning / Space Science" */
  categoryLabel: string
  /** Used by the project explorer filters. */
  categories: CategoryId[]
  featured: boolean
  statusKind: StatusKind
  statusLabel: string
  /** Optional achievement attached to the project. */
  achievement?: string
  summary: string
  tech: string[]
  /** One-line text shown under the illustration so it is never mistaken for real data. */
  visualCaption: string

  overview: string
  problem: string
  approach: string
  /** Ordered workflow steps rendered as a diagram. */
  flow: { label: string; note?: string; planned?: boolean }[]
  contribution: string
  status: {
    implemented: string[]
    inProgress: string[]
    planned: string[]
    /** Honest caveats shown prominently on the case study. */
    caveats: string[]
  }
  challenges: { title: string; body: string }[]
  future: string[]
  /** Only set when a real, verified URL exists. Empty/undefined hides the link. */
  links?: { repo?: string; demo?: string }
}

export interface Achievement {
  id: 'speakathon' | 'cipher'
  title: string
  rank: string
  body: string
  projectSlug?: string
  /** Optional real certificate/photo, e.g. '/certificates/speakathon.jpg'. Hidden when empty. */
  image?: string
  imageAlt?: string
}

export type Usage = 'used' | 'planned' | 'learning'

export interface StackItem {
  name: string
  usage: Usage
  /** Project slugs where this technology is actually used (or planned). */
  projects: string[]
}

export interface StackGroup {
  id: string
  title: string
  items: StackItem[]
}

export interface Domain {
  id: string
  label: string
  body: string
  projects: string[]
  /** Position on the radial map (percent, desktop). */
  x: number
  y: number
}
