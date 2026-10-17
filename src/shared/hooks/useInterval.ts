import { useEffect, useRef } from 'react'

/** Runs `callback` every `delayMs` while `delayMs` is not null. Always calls the latest callback. */
export const useInterval = (callback: () => void, delayMs: number | null) => {
  const saved = useRef(callback)

  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delayMs === null) return
    const id = window.setInterval(() => saved.current(), delayMs)
    return () => window.clearInterval(id)
  }, [delayMs])
}
