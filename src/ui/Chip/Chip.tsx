import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Chip.module.css'

export type ChipTone = 'idle' | 'selected' | 'good' | 'bad'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  tone?: ChipTone
  /** Small trailing text, e.g. a token count. */
  meta?: ReactNode
}

const Chip = ({ tone = 'idle', meta, className, children, ...rest }: Props) => (
  <button
    type="button"
    className={clsx(styles.chip, tone !== 'idle' && styles[tone], className)}
    aria-pressed={tone === 'selected' ? true : undefined}
    {...rest}
  >
    {children}
    {meta !== undefined && <small className={styles.meta}>{meta}</small>}
  </button>
)

export default Chip
