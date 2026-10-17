import { createContext } from 'react'

import type { MissionId } from '../missions/registry'

export type ProgressContextValue = {
  seen: ReadonlySet<MissionId>
  /** Increments on every new mission reached after the first: drives the LEVEL UP toast. */
  levelUps: number
  markSeen: (id: MissionId) => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)
