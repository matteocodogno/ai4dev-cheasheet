import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { Columns, Panel, RichText } from '@/ui'

import Mission from '../../missions/components/Mission'
import { agentsMdCopy, LEVELS, neverCopy, treeCopy } from '../content'
import { useLevelFocus } from '../hooks/useLevelFocus'
import styles from './AgentsMdMission.module.css'
import FileTree from './FileTree'

const AgentsMdMission = () => {
  const t = useT()
  const { pulse, register, focus } = useLevelFocus()
  return (
    <Mission id="agentsmd" copy={agentsMdCopy}>
      <Columns>
        <div>
          <FileTree onPick={focus} />
          <span className={styles.note}>{t(treeCopy.hint)}</span>
        </div>
        <Panel tone="paper" title={t(neverCopy.title)}>
          <ul>
            {t(neverCopy.items).map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Panel>
      </Columns>
      <div className={styles.levels}>
        {LEVELS.map((level) => (
          <div
            key={pulse?.id === level.id ? `${level.id}-${pulse.n}` : level.id}
            ref={register(level.id)}
            className={clsx(styles.level, pulse?.id === level.id && styles.pulse)}
            style={{ background: level.color }}
          >
            <h3 className={styles.levelTitle}>{t(level.title)}</h3>
            <div className={styles.path}>{t(level.path)}</div>
            <ul>
              {t(level.items).map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Mission>
  )
}

export default AgentsMdMission
