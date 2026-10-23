import { useEffect } from 'react'

const BASE = 'UJWAL.EXE — Ujwal Manjunath · Developer Portfolio'

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · UJWAL.EXE` : BASE
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
