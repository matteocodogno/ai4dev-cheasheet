import clsx from 'clsx'
import type { ReactNode } from 'react'

import CopyButton from '../CopyButton/CopyButton'
import styles from './Terminal.module.css'

type Props = {
  title: string
  /** When set, shows a copy button that puts this text on the clipboard. */
  copyText?: string
  /** Wrap long lines (for prose-like content such as a spec). */
  wrap?: boolean
  className?: string
  children: ReactNode
}

/** Terminal / editor window frame. Children render inside a <pre>; use .p .c .k .s spans for colour. */
const Terminal = ({ title, copyText, wrap = false, className, children }: Props) => (
  <div className={clsx(styles.term, className)}>
    <div className={styles.bar}>
      <i className={styles.dot} />
      <i className={styles.dot} />
      <i className={styles.dot} />
      <span className={styles.title}>{title}</span>
      {copyText !== undefined && <CopyButton text={copyText} className={styles.copy} />}
    </div>
    <pre className={clsx(styles.body, wrap && styles.wrap)}>{children}</pre>
  </div>
)

export default Terminal
