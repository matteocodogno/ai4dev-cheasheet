import { useState } from 'react'

import { INCIDENTS, type ShieldId } from '../content'

export type ShieldOutcome = 'idle' | 'saves' | 'useless'

/** Selected incident and, for each shield, whether it saves you. */
export const useIncidentSimulator = () => {
  const [index, setIndex] = useState<number | null>(null)
  const incident = index === null ? null : (INCIDENTS[index] ?? null)
  return {
    index,
    incident,
    select: setIndex,
    outcome: (id: ShieldId): ShieldOutcome =>
      incident ? (incident.savedBy.includes(id) ? 'saves' : 'useless') : 'idle',
  }
}
