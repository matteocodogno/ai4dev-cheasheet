import clsx from 'clsx'
import type { CSSProperties } from 'react'

import { useT } from '@/i18n/useT'
import { RichText } from '@/ui'

import { incidentLabels, type Shield } from '../content'
import type { ShieldOutcome } from '../hooks/useIncidentSimulator'
import styles from './ShieldCard.module.css'

type Props = { shield: Shield; outcome: ShieldOutcome }

const ShieldCard = ({ shield, outcome }: Props) => {
  const t = useT()
  return (
    <div
      className={clsx(styles.shield, outcome !== 'idle' && styles[outcome])}
      style={{ '--shield': shield.color } as CSSProperties}
    >
      <div className={styles.cap}>
        <i className={styles.capFill} />
      </div>
      {outcome !== 'idle' && (
        <div key={outcome} className={styles.stamp}>
          {t(outcome === 'saves' ? incidentLabels.saved : incidentLabels.useless)}
        </div>
      )}
      <h3 className={styles.name}>{shield.name}</h3>
      <div className={styles.when}>{t(shield.when)}</div>
      <p>{t(shield.body)}</p>
      <div className={styles.keys}>
        {shield.keys.map((k) => (
          <span key={k}>
            <RichText text={k} />
          </span>
        ))}
      </div>
      {shield.caveat && <p className={styles.caveat}>{t(shield.caveat)}</p>}
    </div>
  )
}

export default ShieldCard
