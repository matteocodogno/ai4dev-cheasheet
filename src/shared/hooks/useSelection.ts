import { useState } from 'react'

/** One selected item out of a list (or none). Used by the scenario pickers and tabbed steps. */
export const useSelection = <T>(items: readonly T[], initial: number | null = null) => {
  const [index, setIndex] = useState<number | null>(initial)
  const item = index === null ? null : (items[index] ?? null)
  return { index, item, select: setIndex }
}
