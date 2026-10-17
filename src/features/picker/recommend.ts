import {
  OPTIONS,
  type DataClass,
  type Hardware,
  type ModelOption,
  type TaskKind,
  type Volume,
} from './content'

export type Complete = { task: TaskKind; data: DataClass; volume: Volume; hardware: Hardware }

export type Recommendation = { option: ModelOption; score: number; withConditions: boolean }

export type Exclusion = { option: ModelOption; reason: 'data' | 'hardware' }

export type Result = { picks: readonly Recommendation[]; excluded: readonly Exclusion[] }

const MAX_PICKS = 3

/**
 * Data first, then hardware, then task fit and cost:
 * - options the data class forbids, or that need hardware you don't have, are excluded (and explained);
 * - options unsuited to the task are dropped silently;
 * - the rest are scored: task fit weighs most, then cost at your volume, minus a point if they only work with conditions.
 */
export const recommend = (a: Complete, options: readonly ModelOption[] = OPTIONS): Result => {
  const relevant = options.filter((o) => o.fit[a.task] > 0)
  const excluded: Exclusion[] = relevant.flatMap((o): Exclusion[] => {
    if (o.access[a.data] === 'no') return [{ option: o, reason: 'data' }]
    if (o.needs && !o.needs.includes(a.hardware)) return [{ option: o, reason: 'hardware' }]
    return []
  })
  const excludedIds = new Set(excluded.map((e) => e.option.id))
  const picks = relevant
    .filter((o) => !excludedIds.has(o.id))
    .map((o) => {
      const withConditions = o.access[a.data] === 'conditions'
      return {
        option: o,
        withConditions,
        score: o.fit[a.task] * 3 + o.cost[a.volume] - (withConditions ? 1 : 0),
      }
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, MAX_PICKS)
  return { picks, excluded }
}
