import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type SectionId = 'top' | 'about' | 'projects' | 'achievements' | 'stack' | 'contact'

/** Scrolls to a home-page section, navigating to "/" first when on another route. */
export function useGoTo() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id: SectionId) => {
      const target = id === 'top' ? '/' : `/#${id}`
      if (pathname === '/') {
        // Already home: scroll immediately, and keep the URL hash in sync through the router.
        if (id === 'top') window.scrollTo({ top: 0 })
        else document.getElementById(id)?.scrollIntoView()
        navigate(target, { replace: true })
      } else {
        navigate(target)
      }
    },
    [navigate, pathname],
  )
}
