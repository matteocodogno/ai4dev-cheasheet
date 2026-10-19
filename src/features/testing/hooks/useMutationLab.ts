import { useState } from 'react'

import { SUITES, type SuiteId } from '../content'
import { branchCoverage, isKilled, MUTANTS, mutationScore } from '../mutation'

/** Selected suite plus the coverage, mutation score and per-mutant verdicts it produces. */
export const useMutationLab = () => {
  const [suiteId, setSuiteId] = useState<SuiteId>('noassert')
  const suite = SUITES.find((s) => s.id === suiteId)
  if (!suite) throw new Error(`Unknown suite ${suiteId}`)
  return {
    suite,
    select: setSuiteId,
    coverage: branchCoverage(suite.tests),
    score: mutationScore(suite.tests),
    mutants: MUTANTS.map((m) => ({ id: m.id, label: m.label, killed: isKilled(m, suite.tests) })),
  }
}
