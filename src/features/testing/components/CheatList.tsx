import { useT } from '@/i18n/useT'
import { Panel, RichText } from '@/ui'

import { CHEATS, testingLabels } from '../content'
import styles from './CheatList.module.css'

const CheatList = () => {
  const t = useT()
  return (
    <Panel tone="paper" title={t(testingLabels.cheatsTitle)}>
      <ul className={styles.list}>
        {CHEATS.map((c) => (
          <li key={c.en}>
            <RichText text={t(c)} />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export default CheatList
