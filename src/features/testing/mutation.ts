/** A tiny, real mutation-testing engine for the demo: run each test suite against each mutant. */

export type ShippingFn = (total: number, isMember: boolean) => number

export type TestCase = {
  total: number
  isMember: boolean
  /** null = the test calls the code but asserts nothing. */
  expected: number | null
}

export type Mutant = { id: string; label: string; fn: ShippingFn }

export const original: ShippingFn = (total, isMember) => (isMember || total >= 50 ? 0 : 4.9)

export const MUTANTS: readonly Mutant[] = [
  { id: 'M1', label: '>=  →  >', fn: (total, isMember) => (isMember || total > 50 ? 0 : 4.9) },
  { id: 'M2', label: '||  →  &&', fn: (total, isMember) => (isMember && total >= 50 ? 0 : 4.9) },
  {
    id: 'M3',
    label: 'isMember  →  !isMember',
    fn: (total, isMember) => (!isMember || total >= 50 ? 0 : 4.9),
  },
  { id: 'M4', label: '4.9  →  0.0', fn: (total, isMember) => (isMember || total >= 50 ? 0 : 0) },
  { id: 'M5', label: '50.0  →  0.0', fn: (total, isMember) => (isMember || total >= 0 ? 0 : 4.9) },
]

/** A mutant is killed when at least one asserting test sees a different result. */
export const isKilled = (mutant: Mutant, tests: readonly TestCase[]): boolean =>
  tests.some((tc) => tc.expected !== null && mutant.fn(tc.total, tc.isMember) !== tc.expected)

/** Branch coverage of `original`: which of the two outcomes the suite exercises. */
export const branchCoverage = (tests: readonly TestCase[]): number => {
  const outcomes = new Set(tests.map((tc) => original(tc.total, tc.isMember)))
  return Math.round((outcomes.size / 2) * 100)
}

export const mutationScore = (tests: readonly TestCase[], mutants: readonly Mutant[] = MUTANTS): number =>
  Math.round((mutants.filter((m) => isKilled(m, tests)).length / mutants.length) * 100)
