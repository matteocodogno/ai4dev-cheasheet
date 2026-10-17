import { BASE_K, BUDGET_K, LOADOUT, ROT_THRESHOLD, type LoadoutItem } from './content'

export type Verdict =
  | { kind: 'secret' }
  | { kind: 'rot' }
  | { kind: 'noise'; items: readonly LoadoutItem[] }
  | { kind: 'perfect' }
  | { kind: 'missing'; count: number }

export const loadoutUsageK = (selected: ReadonlySet<string>, items: readonly LoadoutItem[] = LOADOUT) =>
  BASE_K + items.filter((i) => selected.has(i.id)).reduce((sum, i) => sum + i.k, 0)

/** Worst problem first: secrets, then context rot, then noise, then what's missing. */
export const judgeLoadout = (
  selected: ReadonlySet<string>,
  items: readonly LoadoutItem[] = LOADOUT,
): Verdict => {
  const chosen = items.filter((i) => selected.has(i.id))
  if (chosen.some((i) => i.secret)) return { kind: 'secret' }
  if (loadoutUsageK(selected, items) / BUDGET_K > ROT_THRESHOLD) return { kind: 'rot' }
  const noise = chosen.filter((i) => !i.relevant)
  if (noise.length > 0) return { kind: 'noise', items: noise }
  const missing = items.filter((i) => i.relevant && !selected.has(i.id)).length
  return missing === 0 ? { kind: 'perfect' } : { kind: 'missing', count: missing }
}
