import type { ReactNode } from 'react'

import { ui } from '@/i18n/ui'
import { useT } from '@/i18n/useT'
import { MissionSection } from '@/ui'

import { useProgress } from '../../progress/useProgress'
import {
  getMission,
  missionAnchor,
  missionNumber,
  rarityColor,
  type MissionCopy,
  type MissionId,
} from '../registry'

type Props = { id: MissionId; copy: MissionCopy; children?: ReactNode }

/** Binds a mission's registry entry, its copy and the progress tracker to the generic MissionSection. */
const Mission = ({ id, copy, children }: Props) => {
  const t = useT()
  const { markSeen } = useProgress()
  const meta = getMission(id)
  return (
    <MissionSection
      id={missionAnchor(id)}
      number={missionNumber(id)}
      title={t(meta.title)}
      lead={t(copy.lead)}
      accent={meta.accent}
      rarityLabel={t(ui.rarity[meta.rarity])}
      rarityColor={rarityColor[meta.rarity]}
      dos={t(copy.dos)}
      donts={t(copy.donts)}
      onSeen={() => markSeen(id)}
    >
      {children}
    </MissionSection>
  )
}

export default Mission
