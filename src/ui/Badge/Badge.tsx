import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'

import styles from './Badge.module.css'

type Props = { color?: string; size?: 'md' | 'sm'; children: ReactNode; className?: string }

/** Skewed sticker label: rarity, node kind, BUFF / DEBUFF. */
const Badge = ({ color, size = 'md', children, className }: Props) => (
  <span
    className={clsx(styles.badge, size === 'sm' && styles.sm, className)}
    style={{ '--badge-color': color } as CSSProperties}
  >
    {children}
  </span>
)

export default Badge
