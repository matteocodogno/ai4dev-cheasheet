import clsx from 'clsx'
import type { CSSProperties } from 'react'

import { ui } from '@/i18n/ui'
import { useT } from '@/i18n/useT'

import { useProgress } from '../../progress/useProgress'
import { MISSIONS, missionAnchor, rarityColor } from '../registry'
import styles from './MissionSelect.module.css'

const MissionSelect = () => {
  const t = useT()
  const { seen } = useProgress()
  return (
    <nav className={styles.select} id="select" aria-labelledby="select-title">
      <h2 className={styles.heading} id="select-title">
        {t(ui.chooseMission)}
      </h2>
      <ol className={styles.grid}>
        {MISSIONS.map((m, i) => (
          <li key={m.id}>
            <a
              className={clsx(styles.card, seen.has(m.id) && styles.seen)}
              href={`#${missionAnchor(m.id)}`}
              style={{ '--r': rarityColor[m.rarity] } as CSSProperties}
            >
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <small className={styles.rarity}>{t(ui.rarity[m.rarity])}</small>
              <b className={styles.name}>{t(m.nav)}</b>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default MissionSelect
