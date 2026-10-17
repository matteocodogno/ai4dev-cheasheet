import { useState } from 'react'

import { useInterval } from './useInterval'
import { useReducedMotion } from './useReducedMotion'

/**
 * Index that advances by itself every `periodMs` while `active`, until the user picks one.
 * Used to walk through a diagram (agent loop, SDD pipeline) as a demo. Off with reduced motion.
 */
export const useAutoCycle = (count: number, active: boolean, periodMs: number) => {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [manual, setManual] = useState(false)

  useInterval(() => setIndex((i) => (i + 1) % count), active && !manual && !reduced ? periodMs : null)

  return {
    index,
    pick: (i: number) => {
      setManual(true)
      setIndex(i)
    },
  }
}
