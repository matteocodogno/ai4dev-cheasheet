import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Columns.module.css'

type Props = { children: ReactNode; spaced?: boolean; className?: string }

/** Responsive auto-fit grid: two or three columns on desktop, one on phones. */
const Columns = ({ children, spaced = false, className }: Props) => (
  <div className={clsx(styles.cols, spaced && styles.spaced, className)}>{children}</div>
)

export default Columns
