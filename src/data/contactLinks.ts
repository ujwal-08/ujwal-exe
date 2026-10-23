import { hasValue, site } from './site'

export interface ContactLink {
  key: 'email' | 'github' | 'linkedin' | 'resume'
  label: string
  href: string
  /** Text to copy for the "copy" action (email only). */
  copy?: string
  external: boolean
}

/** Only links with real configured values are returned; everything else stays hidden. */
export function getContactLinks(): ContactLink[] {
  const c = site.contact
  const out: ContactLink[] = []
  if (hasValue(c.email))
    out.push({ key: 'email', label: 'Email', href: `mailto:${c.email.trim()}`, copy: c.email.trim(), external: false })
  if (hasValue(c.github)) out.push({ key: 'github', label: 'GitHub', href: c.github.trim(), external: true })
  if (hasValue(c.linkedin)) out.push({ key: 'linkedin', label: 'LinkedIn', href: c.linkedin.trim(), external: true })
  if (hasValue(c.resume)) out.push({ key: 'resume', label: 'Resume', href: c.resume.trim(), external: true })
  return out
}
