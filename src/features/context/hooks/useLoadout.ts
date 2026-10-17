import { useState } from 'react'

import { shuffle } from '@/shared/utils/shuffle'

import { BUDGET_K, LOADOUT, type LoadoutItem } from '../content'
import { judgeLoadout, loadoutUsageK } from '../judgeLoadout'

/** Loadout game: shuffled cards, selection, budget, and a verdict revealed only on check. */
export const useLoadout = () => {
  const [order, setOrder] = useState<readonly LoadoutItem[]>(() => shuffle(LOADOUT))
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())
  const [checked, setChecked] = useState(false)

  const usageK = loadoutUsageK(selected)
  return {
    items: order,
    selected,
    checked,
    usageK,
    usagePct: Math.min(100, (usageK / BUDGET_K) * 100),
    verdict: checked ? judgeLoadout(selected) : null,
    toggle: (id: string) => {
      if (checked) return
      setSelected((s) => (s.has(id) ? new Set([...s].filter((x) => x !== id)) : new Set([...s, id])))
    },
    check: () => setChecked(true),
    reshuffle: () => {
      setOrder((o) => shuffle(o))
      setSelected(new Set())
      setChecked(false)
    },
  }
}
