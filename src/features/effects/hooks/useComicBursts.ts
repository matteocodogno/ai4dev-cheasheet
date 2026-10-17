import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

export type Burst = { id: number; x: number; y: number; word: string }

const WORDS = ['POW!', 'BOOM!', 'CRIT!', 'ZAP!', 'BAM!', 'LOOT!'] as const
/** Elements whose clicks produce a burst. Add data-no-burst to opt out. */
const TARGETS = 'button, [role="button"]'
const LIFETIME_MS = 650

/** Comic onomatopoeia that pops where interactive elements are clicked. */
export const useComicBursts = (): readonly Burst[] => {
  const reduced = useReducedMotion()
  const [bursts, setBursts] = useState<readonly Burst[]>([])

  useEffect(() => {
    if (reduced) return
    let next = 0
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null
      if (!target?.closest(TARGETS) || target.closest('[data-no-burst]')) return
      const burst: Burst = {
        id: next++,
        x: e.clientX,
        y: e.clientY,
        word: WORDS[Math.floor(Math.random() * WORDS.length)] ?? 'POW!',
      }
      setBursts((b) => [...b, burst])
      window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== burst.id)), LIFETIME_MS)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduced])

  return bursts
}
