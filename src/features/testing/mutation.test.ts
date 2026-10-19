import { describe, expect, it } from 'vitest'

import { SUITES } from './content'
import { branchCoverage, isKilled, MUTANTS, mutationScore, original } from './mutation'

const suite = (id: string) => {
  const s = SUITES.find((x) => x.id === id)
  if (!s) throw new Error(id)
  return s.tests
}

describe('mutation lab', () => {
  it('every suite passes against the original code', () => {
    for (const s of SUITES) {
      for (const tc of s.tests) {
        if (tc.expected !== null) expect(original(tc.total, tc.isMember)).toBe(tc.expected)
      }
    }
  })

  it('all suites reach full branch coverage', () => {
    for (const s of SUITES) expect(branchCoverage(s.tests)).toBe(100)
  })

  it('mutation score separates the suites', () => {
    expect(mutationScore(suite('noassert'))).toBe(0)
    expect(mutationScore(suite('happy'))).toBe(60)
    expect(mutationScore(suite('edges'))).toBe(100)
  })

  it('the boundary mutant survives the happy path', () => {
    const boundary = MUTANTS.find((m) => m.id === 'M1')
    expect(boundary && isKilled(boundary, suite('happy'))).toBe(false)
  })
})
