import type { CSSProperties } from 'react'

import { useT } from '@/i18n/useT'
import { Panel, RichText } from '@/ui'

import { adrLabels, LIFECYCLE } from '../content'
import styles from './AdrLifecycle.module.css'

const AdrLifecycle = () => {
  const t = useT()
  return (
    <Panel className="spaced" title={t(adrLabels.lifecycle)}>
      <ol className={styles.steps}>
        {LIFECYCLE.map((step, i) => (
          <li key={i} className={styles.step} style={{ '--step': step.color } as CSSProperties}>
            <span className={styles.who}>{t(step.who)}</span>
            <RichText text={t(step.what)} />
          </li>
        ))}
      </ol>
    </Panel>
  )
}

export default AdrLifecycle
