import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Stat.module.css'

type Props = { label: ReactNode; value: ReactNode; className?: string }

/** Small HUD-style readout: a label over a number. */
const Stat = ({ label, value, className }: Props) => (
  <div className={clsx(styles.stat, className)}>
    <small className={styles.label}>{label}</small>
    <span>{value}</span>
  </div>
)

export default Stat
