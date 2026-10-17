import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

import { useProgress } from '../../progress/useProgress'

const DURATION_MS = 1400

/** Returns a key that changes on every level up (to restart the CSS animation), or null when idle. */
export const useLevelUpToast = (): number | null => {
  const { levelUps } = useProgress()
  const reduced = useReducedMotion()
  const [expired, setExpired] = useState(0)

  useEffect(() => {
    if (levelUps === 0) return
    const t = window.setTimeout(() => setExpired(levelUps), DURATION_MS)
    return () => window.clearTimeout(t)
  }, [levelUps])

  return levelUps > 0 && !reduced && expired !== levelUps ? levelUps : null
}
