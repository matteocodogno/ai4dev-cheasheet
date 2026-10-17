import { ui } from '@/i18n/ui'
import { useT } from '@/i18n/useT'
import { useScrollProgress } from '@/shared/hooks/useScrollProgress'

import { getMission, MISSIONS } from '../../missions/registry'
import { useProgress } from '../../progress/useProgress'
import { useActiveMission } from '../hooks/useActiveMission'
import styles from './Hud.module.css'
import LangSwitch from './LangSwitch'
import LevelUpToast from './LevelUpToast'

/** Fixed top bar: level counter (missions reached), XP bar (scroll), current mission, language. */
const Hud = () => {
  const t = useT()
  const { seen } = useProgress()
  const progress = useScrollProgress()
  const active = useActiveMission()

  return (
    <>
      <header className={styles.hud}>
        <div className={styles.lv} aria-label={`Level ${seen.size} of ${MISSIONS.length}`}>
          LV {seen.size}/{MISSIONS.length}
        </div>
        <div className={styles.xp} aria-hidden="true">
          <i className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.current}>{active ? t(getMission(active).nav) : t(ui.newGame)}</div>
        <LangSwitch />
      </header>
      <LevelUpToast />
    </>
  )
}

export default Hud
