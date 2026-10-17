import { useCallback, useMemo, useState, type ReactNode } from 'react'

import type { MissionId } from '../missions/registry'
import { ProgressContext } from './ProgressContext'

type State = { seen: ReadonlySet<MissionId>; levelUps: number }

const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({ seen: new Set(), levelUps: 0 })

  const markSeen = useCallback(
    (id: MissionId) =>
      setState((s) =>
        s.seen.has(id)
          ? s
          : { seen: new Set([...s.seen, id]), levelUps: s.seen.size > 0 ? s.levelUps + 1 : s.levelUps },
      ),
    [],
  )

  const value = useMemo(() => ({ ...state, markSeen }), [state, markSeen])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export default ProgressProvider
