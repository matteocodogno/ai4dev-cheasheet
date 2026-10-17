import { useRef, useState } from 'react'

import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

import type { LevelId } from '../content'

/** Clicking a file in the tree scrolls to its level card and makes it pulse. */
export const useLevelFocus = () => {
  const reduced = useReducedMotion()
  const refs = useRef<Partial<Record<LevelId, HTMLElement | null>>>({})
  const [pulse, setPulse] = useState<{ id: LevelId; n: number } | null>(null)

  return {
    pulse,
    register: (id: LevelId) => (el: HTMLElement | null) => {
      refs.current[id] = el
    },
    focus: (id: LevelId) => {
      refs.current[id]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
      setPulse((p) => ({ id, n: (p?.n ?? 0) + 1 }))
    },
  }
}
