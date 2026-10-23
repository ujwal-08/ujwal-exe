import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const positions = new Map<string, number>()

/**
 * Restores scroll on back/forward, scrolls to #hash targets, and resets to top on new pages.
 * (BrowserRouter has no built-in scroll restoration.)
 */
export default function ScrollManager() {
  const { key, hash } = useLocation()
  const type = useNavigationType()
  const currentKey = useRef(key)

  useEffect(() => {
    const onScroll = () => positions.set(currentKey.current, window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    currentKey.current = key
    const saved = positions.get(key)

    if (type === 'POP' && saved !== undefined) {
      requestAnimationFrame(() => window.scrollTo(0, saved))
      return
    }
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
      return
    }
    window.scrollTo(0, 0)
  }, [key, hash, type])

  return null
}
