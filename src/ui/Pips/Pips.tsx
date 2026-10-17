import clsx from 'clsx'

import styles from './Pips.module.css'

export type PipState = 'empty' | 'on' | 'current' | 'good' | 'bad'

type Props = { states: readonly PipState[]; label?: string; className?: string }

/** Row of skewed segments: depth meter, quiz progress. */
const Pips = ({ states, label, className }: Props) => (
  <div className={clsx(styles.pips, className)} role={label ? 'img' : undefined} aria-label={label}>
    {states.map((s, i) => (
      <i key={i} className={clsx(styles.pip, s !== 'empty' && styles[s])} />
    ))}
  </div>
)

export default Pips
