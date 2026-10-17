import clsx from 'clsx'
import { Fragment, type CSSProperties } from 'react'

import { useT } from '@/i18n/useT'

import { gearLabels, type Gear } from '../content'
import styles from './GearCard.module.css'

type Props = { gear: Gear }

/** Weapon-card style summary of one agent building block. */
const GearCard = ({ gear }: Props) => {
  const t = useT()
  const statNames = t(gearLabels.stats)
  return (
    <article className={styles.card} style={{ '--gear': gear.color } as CSSProperties}>
      <h3 className={styles.name}>{gear.name}</h3>
      <div className={styles.what}>{t(gear.what)}</div>
      <div className={styles.stats}>
        {gear.stats.map((v, i) => (
          <Fragment key={i}>
            <span>{statNames[i]}</span>
            <i
              className={styles.bar}
              style={{ '--v': `${v}%` } as CSSProperties}
              role="meter"
              aria-label={statNames[i]}
              aria-valuenow={v}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Fragment>
        ))}
      </div>
      <div className={clsx(styles.lbl, styles.use)}>{t(gearLabels.useFor)}</div>
      <p className={styles.text}>{t(gear.useFor)}</p>
      <div className={clsx(styles.lbl, styles.not)}>{t(gearLabels.notFor)}</div>
      <p className={styles.text}>{t(gear.notFor)}</p>
    </article>
  )
}

export default GearCard
