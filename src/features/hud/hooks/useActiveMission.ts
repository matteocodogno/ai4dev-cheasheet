import { useSyncExternalStore } from 'react'

import { MISSIONS, missionAnchor, type MissionId } from '../../missions/registry'

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/** The mission whose top has passed 40% of the viewport, or null while still in the hero. */
const read = (): MissionId | null =>
  MISSIONS.reduce<MissionId | null>((current, m) => {
    const el = document.getElementById(missionAnchor(m.id))
    return el && el.getBoundingClientRect().top < window.innerHeight * 0.4 ? m.id : current
  }, null)

export const useActiveMission = (): MissionId | null => useSyncExternalStore(subscribe, read, () => null)
