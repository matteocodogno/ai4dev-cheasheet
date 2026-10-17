import { useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

const read = () => {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  return max > 0 ? Math.round((h.scrollTop / max) * 1000) / 10 : 0
}

/** Page scroll progress in percent (0-100), rounded to one decimal to limit re-renders. */
export const useScrollProgress = (): number => useSyncExternalStore(subscribe, read, () => 0)
