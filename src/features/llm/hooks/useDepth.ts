import { useState } from 'react'

/** How many layers of the LLM explanation are open (1..max). */
export const useDepth = (max: number) => {
  const [depth, setDepth] = useState(1)
  return {
    depth,
    canDig: depth < max,
    canGoUp: depth > 1,
    dig: () => setDepth((d) => Math.min(max, d + 1)),
    goUp: () => setDepth((d) => Math.max(1, d - 1)),
  }
}
