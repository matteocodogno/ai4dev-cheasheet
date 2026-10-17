import clsx from 'clsx'
import type { CSSProperties } from 'react'

import { useT } from '@/i18n/useT'
import { Badge, RichText } from '@/ui'

import { pickerLabels } from '../content'
import type { Recommendation } from '../recommend'
import styles from './ResultCard.module.css'

type Props = { pick: Recommendation; rank: number }

const COLORS = ['var(--orange)', 'var(--purple)', 'var(--blue)'] as const

/** One recommended option, styled like a loot drop (first = legendary orange). */
const ResultCard = ({ pick, rank }: Props) => {
  const t = useT()
  const color = COLORS[rank] ?? 'var(--blue)'
  const { option } = pick
  return (
    <article className={styles.card} style={{ '--pick': color } as CSSProperties}>
      <div className={styles.head}>
        <Badge color={color}>{t(rank === 0 ? pickerLabels.best : pickerLabels.alt)}</Badge>
        <h4 className={styles.name}>{t(option.name)}</h4>
      </div>
      <p className={styles.examples}>
        {t(pickerLabels.examples)}: {t(option.examples)}
      </p>
      <p className={clsx(styles.block, styles.why)}>
        <span className={styles.label}>{t(pickerLabels.why)}</span>
        {t(option.why)}
      </p>
      <p className={clsx(styles.block, styles.cond)}>
        <span className={styles.label}>
          {t(pick.withConditions ? pickerLabels.conditions : pickerLabels.caveat)}
        </span>
        {t(option.conditions)}
      </p>
      <p className={clsx(styles.block, styles.how)}>
        <span className={styles.label}>{t(pickerLabels.how)}</span>
        <RichText text={t(option.howTo)} />
      </p>
    </article>
  )
}

export default ResultCard
