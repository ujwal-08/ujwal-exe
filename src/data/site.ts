/**
 * SITE CONFIGURATION
 * ------------------
 * Fill in the values below to turn on the matching links.
 * Any value left as an empty string ('') is treated as "not configured":
 * the link/button is hidden everywhere (contact section, footer, command palette).
 *
 * Nothing here is invented — add only real, verified details.
 *
  email     e.g. 'ujwalm.cs25@rvce.edu.in'
 *  github    full profile URL, e.g. 'https://github.com/ujwal-08'
 *  linkedin  full profile URL, e.g. 'https://www.linkedin.com/in/ujwalmanjunath'
 *  resume    path to a file in /public (e.g. '/resume.pdf') or a full URL
 *  siteUrl   your deployed URL (used only for documentation / future metadata)
 */
export const site = {
  name: 'Ujwal Manjunath',
  wordmark: 'UJWAL.EXE',
  role: 'CSDS UNDERGRADUATE · DEVELOPER · BUILDER',
  headline: 'I BUILD THINGS THAT THINK.',
  tagline:
    'Engineering intelligent systems at the intersection of software, AI, and the physical world.',
  contact: {
    email: 'ujwalm.cs25@rvce.edu.in',
    github: 'https://github.com/ujwal-08',
    linkedin: 'https://www.linkedin.com/in/ujwalmanjunath',
    resume: '/Users/ujwalmanjunath/Downloads/ujwal_resume_draft.pdf',
  },
  siteUrl: '',
}

export type ContactKey = keyof typeof site.contact

export const hasValue = (v: string | undefined): v is string =>
  typeof v === 'string' && v.trim().length > 0
